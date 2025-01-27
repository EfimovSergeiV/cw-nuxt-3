<script setup>
  const ctx = useNuxtApp()
  const config = useRuntimeConfig()
  const router = useRouter()

  const productsStore = useProductsStore()
  const clientStore = useClientStore()  
  const notificationsStore = useNotificationsStore()
  const shopStore = useShopStore()


  const fields = [
      { keyword:"legaladress", placeholder:"Россия, Москва, 117312, ул. Вавилова, д. 123", title:"Юридический адрес"},
      { keyword:"company", placeholder:"ООО Полное название компании", title:"Полное наименование"},
      { keyword:"inn", placeholder:"3664069397", title:"ИНН" },
      { keyword:"kpp", placeholder:"12356789", title:"КПП" },
      { keyword:"okpo", placeholder:"12345678", title:"ОКПО (необязательно)" },
      { keyword:"bankname", placeholder:"ПАО Сбербанк", title:"Наименование банка" },
      { keyword:"currentacc", placeholder:"12312123112341234567", title:"Расчетный счет (необязательно)" },
      { keyword:"corresponding", placeholder:"12312123112341234567", title:"Корреспондентский счет (необязательно)" },
      { keyword:"bic", placeholder:"123456789", title:"БИК (необязательно)" },
  ]

  const phoneValidate = computed(() => {
    const re = /^(?:\+7|7|8)[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/
    if (clientStore.client.phone) {
      return clientStore.client.phone.search(re) !== -1
    } else {
      return false
    }
  })
  
  const emailValidate = computed(() => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (clientStore.client.email) {
      return clientStore.client.email.search(re) !== -1
    } else {
      return false
    }
  })

  const order = ref(null)
  const errorMsg = ref(null)
  const selectedShop = ref(null)
  const responseMethod = ref(" ")


  // Ecommerce

  const removeProduct = (product) => {

    let ecommerceData = {
      "event": "ecommerce",
      "ecommerce": {
      "currencyCode": "RUB",    
      "remove": {
        "products": [
            {
              "id": product.id,
              "name" : product.name,
              "price": product.only_price,
              "brand": product.brand.brand,
              "category": product.category,
              "quantity": product.quantity,
            }
          ]
        }
      }
    }

    window.dataLayer.push(ecommerceData)
  }

  const impressList = (products, order_id) => {      
    const ecommerceData = {
      "event": "ecommerce",
      "ecommerce": {
        "currencyCode": "RUB",
        "purchase": {
          "actionField": {
            "id" : order_id,
          },
          "products": []
        },
      }
    }

    products.forEach((product, pk) => {
      ecommerceData.ecommerce.purchase.products.push({
        "id": product.id,
        "name" : product.name,
        "price": product.only_price,
        "brand": product.brand.brand,
        "category": product.category,          
        "quantity": product.quantity,
        "position": pk + 1
      })
    })

    window.dataLayer.push(ecommerceData)
  }
  

  const sendOrder = async () => {
    if ((phoneValidate.value || emailValidate.value) && (selectedShop.value || clientStore.client.delivery_adress) ) {
      
      /// HotFix
      if(clientStore.client.delivery) {
        selectedShop.value = shopStore.shops[3]
      }
      
      const { data: response } = await useFetch(`${ config.public.baseURL }o/order/`, {
        method: 'POST',
        body: {
          shop_id: clientStore.client.id,
          region_code: selectedShop.value.region_code,
          person: clientStore.client.person,
          phone: `${responseMethod.value} ${clientStore.client.phone}`,
          email: clientStore.client.email,
          comment: `${clientStore.client.comment}`,
          delivery: clientStore.client.delivery,
          delivery_adress: clientStore.client.delivery_adress,
          promocode: null,
          adress: selectedShop.value.adress,

          // entity: clientStore.client.entity,
          // company: clientStore.client.company,
          // legaladress: clientStore.client.legaladress,
          // inn: clientStore.client.inn,
          // kpp: clientStore.client.kpp,
          // okpo: clientStore.client.okpo,
          // bankname: clientStore.client.bankname,
          // currentacc: clientStore.client.currentacc,
          // corresponding: clientStore.client.corresponding,
          // bic: clientStore.client.bic,

          client_product: productsStore.cart,
        }
        
      });


      if ( productsStore.cartTotalPrice > 30000 ) {
        
        clientStore.order = response.value.order
        if (process.client) {
          ctx.$metrika.reachGoal('EXPENSIVE_ORDER')
        }
        
      } else {
        await router.push({ name: 'order', hash: `#${ response.value.order }` })
        if (process.client) {
          ctx.$metrika.reachGoal('SEND_ORDER')
        }
      }
      
      // Ecommerce call
      impressList(productsStore.cart, response.value.order)

      productsStore.clearCartProducts()

    } else {
      errorMsg.value = 'Ошибка: Укажите как с вами связаться и выберите магазин.'
      notificationsStore.pushToast({ id: 1, type: 'error', text: 'Ошибка: Проверте правильно ли заполнены обязательные поля.' })
    }
  }


  // FROM SIMPLE CART !!
  const sendData = () => {
    if (clientStore.client.contact) {
      $fetch(`${ config.public.baseURL }o/oneclick/`, {
        method: 'POST',
        body: {
          "name": clientStore.client.person,
          "contact": `${responseMethod.value} ${clientStore.client.contact}`,
          "comment": clientStore.client.comment,
          "city": "Псков",
          "shop": 'пос. Неёлово, ул.Юбилейная д. 5ж',
          "prods": productsStore.simpleCart,
        }
      }).then((res) => {
        productsStore.simpleCart = []

        if ( productsStore.cartTotalPrice > 30000 ) {
          
          clientStore.order = res.order

          if (process.client) {
            ctx.$metrika.reachGoal('EXPENSIVE_ORDER')
          }

        } else {
          
          clientStore.order = res.order
          if (process.client) {
            ctx.$metrika.reachGoal('SEND_ORDER')
          }
        }


      })

    } else {

      errorMsg.value = true
      notificationsStore.pushToast({ id: 1, type: 'error', text: 'Ошибка: Укажите как с вами связаться и выберите магазин.' })

    }
  }

</script>


<template>

  <div class="container mx-auto px-4 py-2 max-w-6xl lg:px-8">

    <div v-if="(productsStore.simpleCart.length > 0)" class="bg-white border-gray-200 border dark:border-gray-700 dark:bg-gray-800 rounded-md p-1">

      <div class="px-4 py-2">

        <div class="overflow-x-auto w-full border-b border-gray-400 dark:border-gray-600">
          <div class="">
            <div class="grid gap-2 px-2 py-4">
              <div class="flex lg:items-center lg:gap-2">
                <div class="flex justify-center w-1/2"><p class="text-sm">Наименование</p></div>
                <div class="flex justify-center w-32"><p class="text-sm">Количество</p></div>
                <div class="flex justify-center w-32"><p class="text-sm">Наличие</p></div>
                <div class="flex justify-center w-32"><p class="text-sm">Стоимость</p></div>
                <div class="flex justify-center w-20"><p class="text-sm">Удалить</p></div>
              </div>
            </div>
          </div>
        </div>


        <transition-group name="left-emergence" tag="div">
          <div v-for="prod in productsStore.simpleCart" :key="prod.id" class="">
            <div class="overflow-x-auto w-full">
              <div class="">
                <div class="grid gap-2 px-2 py-4">
                  <div class="flex lg:items-center lg:gap-2">
                    <div class="flex justify-center w-1/2"><p class="text-sm">{{ prod.name }}</p></div>
                    <div class="flex justify-center w-32">
                      <div class="text-gray-700 dark:text-gray-300">
                        <div v-if="productsStore.productInSimpleCart(prod.id)" class="flex items-center justify-between gap-4 select-none w-[80px]">
                          <div class="cursor-pointer">
                            <button v-if="productsStore.productInSimpleCart(prod.id).quantity > 1" @click="productsStore.quantitySimpleProduct({ 'prod_type': 'ext', 'id': prod.id, 'name': prod.name, 'price': prod.price, 'quantity': productsStore.productInSimpleCart(prod.id).quantity }, 'ext', 'del' )" class="text-2xl font-semibold">-</button>
                            <button v-else class="text-2xl font-semibold">-</button>
                          </div>
                          <p class="text-xl">{{ productsStore.productInSimpleCart(prod.id).quantity }}</p>
                          <div class="cursor-pointer">
                            <button @click="productsStore.quantitySimpleProduct({ 'prod_type': 'ext', 'id': prod.id, 'name': prod.name, 'price': prod.price, 'quantity': productsStore.productInSimpleCart(prod.id).quantity }, 'ext', 'add' )" class="text-2xl font-semibold">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-center w-32"><p class="text-sm">в наличии</p></div>
                    <div class="flex justify-center w-32"><p class="text-sm">{{ prod.price }} руб.</p></div>
                    <div class="flex justify-center w-20">
                      <button @click="productsStore.deleteSimpleProduct(prod)" class="text-sm">Удалить</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition-group>



      </div>
    </div>


    <div v-if="(productsStore.simpleCart.length > 0)" class="mt-4 bg-white border-gray-200 border dark:border-gray-700 dark:bg-gray-800 rounded-md p-1">
      <div class="px-4 py-2">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="">
            <div class="">
              <label for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Имя (необязательно)</label>
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none">
                  <p class="mdi mdi-24px mdi-account"></p>
                </div>
                <input v-model="clientStore.client.person" type="text" id="person" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Иван Иванов">
              </div>
            </div>
          </div>
          <div class="">
            <div class="">
              
              <div class="">
                <label v-if="errorMsg" for="message" class="block animate-bounce mt-2 mb-1 text-xs font-medium text-red-500 dark:text-red-500">Как с вами связаться?</label>
                <label v-else for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Как с вами связаться?</label>
              </div>
              
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none">
                  <p class="mdi mdi-24px mdi-cellphone-message"></p>
                </div>
                <input v-model="clientStore.client.contact" type="text" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+7 (987) 654 32 10 или example@email.com">
              </div> 
            </div>
          </div>


          <div class="text-xs text-gray-700 dark:text-gray-300 pb-4 border border-black/10 dark:border-white/10 p-4 rounded-md">
            <div class="grid grid-cols-1 gap-3">
              <p class="">Где вам удобнее?</p>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex items-center">
                  <input id="responseMethodDefault" type="radio" name="responseMethodDefault" v-model="responseMethod" value=" " class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600">
                  <label for="responseMethodDefault" class="block ms-2 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300">
                    На телефон или e-mail
                  </label>
                </div>
                <div class="flex items-center">
                  <input id="responseMethodWhatsApp" type="radio" name="responseMethodWhatsApp" v-model="responseMethod" value="WhatsApp" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600">
                  <label for="responseMethodWhatsApp" class="block ms-2 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300">
                    В WhatsApp
                  </label>
                </div>
                <div class="flex items-center">
                  <input id="responseMethodViber" type="radio" name="responseMethodViber" v-model="responseMethod" value="Viber" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600">
                  <label for="responseMethodViber" class="block ms-2 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300">
                    В Viber
                  </label>
                </div>
                <div class="flex items-center">
                  <input id="responseMethodTG" type="radio" name="responseMethodTG" v-model="responseMethod" value="Телеграмм" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600">
                  <label for="responseMethodTG" class="block ms-2 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300">
                    В Телеграмм
                  </label>
                </div>
              </div>
            </div>
          </div>


          <div class="">
            <label for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Комментарий к заказу (необязательно)</label>
            <textarea v-model="clientStore.client.comment" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Напишите что-нибудь..."></textarea>
          </div>

        </div>

        <div class="flex items-center justify-end py-4">
          <button @click="sendData" class="">
            <div class=" text-sm text-gray-100 rounded-lg bg-blue-600 hover:bg-blue-700 border border-gray-300/50 dark:border-gray-500/50 transition-all duration-1000">
              <div class=" bg-gradient-to-br from-gray-100/20 to-gray-900/40 rounded-lg">
                <div>
                  <p class="text-white text-sm w-36 md:w-32 py-1.5">Отправить</p>
                </div>
              </div>
            </div>
          </button>          
        </div>


      </div>    
    
    
    </div>

    

    <div v-else class="">
      <div id="cart-set" class="">
        
        <div v-if="(productsStore.cart.length > 0)" class="bg-white border-gray-200 border dark:border-gray-700 dark:bg-gray-800 rounded-md p-1">
          <div class="overflow-x-auto w-full">
            <div class="">
              <div class="grid gap-2 px-2 py-4 border-b border-gray-400 dark:border-gray-600">
                <div class="flex lg:items-center lg:gap-2">
                  <div class="flex justify-center w-24"><p class="text-sm">Изображение</p></div>
                  <div class="flex justify-center w-1/2"><p class="text-sm">Наименование</p></div>
                  <div class="flex justify-center w-32"><p class="text-sm">Количество</p></div>
                  <div class="flex justify-center w-32"><p class="text-sm">Наличие</p></div>
                  <div class="flex justify-center w-32"><p class="text-sm">Стоимость</p></div>
                  <div class="flex justify-center w-20"><p class="text-sm">Удалить</p></div>
                </div>
              </div>
              <div class="grid gap-2 px-1">
                <transition-group tag="div" name="left-emergence">
                  <div v-for="product in productsStore.cart" :key="product.id" class="my-4">
                    <div class="flex items-center gap-2">
                      <div class="flex justify-center items-center w-24 bg-white rounded-md">
                        <img :src="product.preview_image" class="rounded-md w-20" />
                      </div>
                      <div class="flex justify-center w-1/2">
                        <p class="text-sm">{{ product.name }}</p>
                      </div>
                      <div class="flex justify-center w-32">
                        <button  @click="productsStore.changeQuantity(product, 'del')" class="mdi mdi-minus cursor-pointer"></button>
                        <div class="mx-2"><p>{{ product.quantity }}</p></div>
                        <button @click="productsStore.changeQuantity(product, 'add')" class="mdi mdi-plus cursor-pointer"></button>
                      </div>
                      <div class="flex justify-center w-32">
                        <p v-if="product.status === 'order'" class="text-sm text-right font-medium text-gray-900 dark:text-gray-200">под заказ</p>
                        <p v-else class="text-sm text-right font-medium text-gray-900 dark:text-gray-200">в наличии</p>
                      </div>
                      <div class="flex justify-center w-32"><p class="text-sm">{{ product.only_price.toLocaleString() }} руб.</p></div>
                      <div class="flex justify-center w-20">
                        <button @click="productsStore.addProduct('cart', product); removeProduct(product)" class="mdi mdi-24px mdi-close cursor-pointer"></button>
                      </div>
                    </div>
                  </div>
                </transition-group>
              </div>
            </div>         
          </div>
          <div class="py-2 px-2">
            <p class="">Итог: <span class="font-semibold pl-2">{{ productsStore.cartTotalPrice.toLocaleString() }}</span> <span>руб.</span></p>
          </div>
        </div>


        <div v-else class="flex justify-center bg-white border-gray-200 border dark:border-gray-700 dark:bg-gray-800 rounded-md">
          <div class="py-8 hidden">
            <div class="flex items-center gap-8">
              <div class="grid gap-2 grid-cols-1">
                <div class="mx-4 text-center">
                  <p class="text-xl">Ваша корзина пуста</p>
                </div>
                <div class="border-b border-gray-700 dark:border-gray-300"></div>
                <div class="mx-4 text-center">
                  <nuxt-link :to="{ name: 'cts' }" class="text-sm hover:underline hover:text-gray-900 dark:hover:text-gray-100 ">Перейти в каталог</nuxt-link>
                </div>
              </div>
              <div>
                <p class="mdi mdi-close-outline mdi-36px"></p>
              </div>          
            </div>          
          </div>
          <div class="flex items-center justify-center min-h-[50vh]">
            <p class="text-xl"> Ваша корзина пуста</p>
          </div>
        </div>
      </div>


      <div id="client-info" class="">
        <div class="mt-4">
          <div class="bg-white border-gray-200 border dark:border-gray-700 dark:bg-gray-800 p-4 rounded-md">
            <div class="flex items-center justify-between">
              <div class="">
                1. Данные покупателя
              </div>
              <div class="flex justify-end gap-4">
                <ul class="grid gap-6 w-full md:grid-cols-2">
                  <li>
                    <input type="radio" id="hosting-small" name="person" v-model="clientStore.client.entity" :value="false" class="hidden peer" required>
                    <label for="hosting-small" class="text-gray-700 dark:text-gray-300 peer-checked:text-gray-900 dark:peer-checked:text-gray-100 peer-checked:border-b-2 border-blue-500 select-none text-sm cursor-pointer inline-flex justify-between items-center px-2 py-1 w-full transition-all ease-in duration-75">                           
                      <div class="block">
                        <div class="w-full">Физическое лицо</div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="hosting-big" name="person" v-model="clientStore.client.entity" :value="true" class="hidden peer">
                    <label for="hosting-big" class="text-gray-700 dark:text-gray-300 peer-checked:text-gray-900 dark:peer-checked:text-gray-100 peer-checked:border-b-2 border-blue-500 select-none text-sm cursor-pointer inline-flex justify-between items-center px-2 py-1 w-full transition-all ease-in duration-75">
                      <div class="block">
                        <div class="w-full">Юридическое лицо</div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="">
                <label for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Имя (необязательно)</label>
                <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <p class="mdi mdi-account"></p>
                  </div>
                  <input v-model="clientStore.client.person" type="text" id="person" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Иван Иванов">
                </div>
              </div>
              <div class="">
                <label for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Электронная почта (необязательно)</label>
                <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <p class="mdi mdi-email"></p>
                  </div>
                  <input v-model="clientStore.client.email" type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@domen.com">
                </div>
              </div>
              <div class="">
                <label for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Номер телефона</label>
                <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <p class="mdi mdi-phone"></p>
                  </div>
                  <input v-model="clientStore.client.phone" type="text" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+7 (987) 654 32 10">
                </div> 
              </div>

              <div class="text-xs text-gray-700 dark:text-gray-300 pb-4 border border-black/10 dark:border-white/10 p-4 rounded-md">
                <div class="grid grid-cols-1 gap-3">
                  <p class="">Мы с вами свяжемся. Где вам удобнее?</p>
                  <div class="grid grid-cols-2 gap-2">
                    <div class="flex items-center">
                      <input id="responseMethodDefault" type="radio" name="responseMethodDefault" v-model="responseMethod" value=" "  class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600">
                      <label for="responseMethodDefault" class="block ms-2 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300">
                        На телефон или e-mail
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="responseMethodWhatsApp" type="radio" name="responseMethodWhatsApp" v-model="responseMethod" value="WhatsApp" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600">
                      <label for="responseMethodWhatsApp" class="block ms-2 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300">
                        В WhatsApp
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="responseMethodViber" type="radio" name="responseMethodViber" v-model="responseMethod" value="Viber" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600">
                      <label for="responseMethodViber" class="block ms-2 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300">
                        В Viber
                      </label>
                    </div>
                    <div class="flex items-center">
                      <input id="responseMethodTG" type="radio" name="responseMethodTG" v-model="responseMethod" value="Телеграмм" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600">
                      <label for="responseMethodTG" class="block ms-2 text-xs md:text-sm font-medium text-gray-900 dark:text-gray-300">
                        В Телеграмм
                      </label>
                    </div>
                  </div>                    
                </div>

              </div>

            </div>
          </div>
        </div>

        <div v-if="clientStore.client.entity" class="mt-4">
          <div class="bg-white border-gray-200 border dark:border-gray-700 dark:bg-gray-800 p-4 rounded-md transition-all duration-300">
            <p class="">Файл с реквизитами (необязательно)</p>

            <div class="py-4">
              <div class=" cursor-pointer">
                <input id="newfile" type="file" multiple
                  class="block w-full text-sm text-white
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-600 file:text-white
                  hover:file:bg-blue-600 transition-all duration-700"
                  @change="uploadFiles"
                />
              </div>
            </div>

            <!-- <div class="grid md:grid-cols-3 gap-4">
              <div v-for="(field, pk) in fields" :key="pk" class="">
                <label for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">{{ field.title }}</label>
                <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <p class="mdi mdi-phone"></p>
                  </div>
                  <input v-model="clientStore.client[field.keyword]" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" :placeholder="field.placeholder">
                </div> 
              </div>
            </div> -->
          </div>
        </div>
      </div>


      <div id="selected-shop" class="">
        <div class="mt-4">
          <div class="bg-white border-gray-200 border dark:border-gray-700 dark:bg-gray-800 p-4 rounded-md">
            <div class="flex items-center justify-between">
              <div class="">
                2. Способ получения
              </div>
              <div class="flex justify-end gap-4">
                <ul class="flex justify-end items-center gap-4 w-full md:grid-cols-2">
                  <li>
                    <input type="radio" id="pickup" name="delivery" v-model="clientStore.client.delivery" :value="false" class="hidden peer" required>
                    <label for="pickup" class="text-gray-700 dark:text-gray-300 peer-checked:text-gray-900 dark:peer-checked:text-gray-100 peer-checked:border-b-2 border-blue-500 select-none text-sm cursor-pointer inline-flex justify-between items-center px-2 py-1 w-full transition-all ease-in duration-75">                           
                      <div class="block">
                        <div class="w-full">Самовывоз из магазина</div>
                      </div>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="delivery" name="delivery" v-model="clientStore.client.delivery" :value="true" class="hidden peer">
                    <label for="delivery" class="text-gray-700 dark:text-gray-300 peer-checked:text-gray-900 dark:peer-checked:text-gray-100 peer-checked:border-b-2 border-blue-500 select-none text-sm cursor-pointer inline-flex justify-between items-center px-2 py-1 w-full transition-all ease-in duration-75">
                      <div class="block">
                        <div class="w-full">Доставка ТК</div>
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
            </div>


            <div v-if="clientStore.client.delivery" class="">
              <div class="">
                <label for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Адрес доставки</label>
                <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <p class="mdi mdi-phone"></p>
                  </div>
                  <input v-model="clientStore.client.delivery_adress" type="text" id="delivery-adress" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Московская обл., г. Зеленоград, ул. Панфилова, 28Б">
                </div> 
              </div>
            </div>

            <div v-else class="">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-1 py-2">
                <div class="">
                  <div class="justify-self-center mx-2 my-2" v-if="selectedShop">
                    <div class="flex items-center">
                      <div class="border-r">
                        <a class="text-base md:text-2xl mx-2" :href="'tel:' + selectedShop.phone.replace(/[^+\d]/g, '')">{{ selectedShop.phone }}</a>
                      </div>
                      <div class="mx-2">
                        <p class="text-xs font-bold mt-1">{{ selectedShop.wday }}</p>
                        <p class="text-xs font-bold">{{ selectedShop.wend }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="">
                  <select v-model="selectedShop" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option disabled value="null">Выберие магазин</option>
                    <option v-for="shop in shopStore.shops" :key="shop.id" :value="shop">{{ shop.adress }}</option>
                  </select>                    
                </div>            
              </div>
              <div class="border dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700">
                <div class="h-[350px]">
                  <div v-if="selectedShop" class="">
                    <iframe :src="selectedShop.google_maps" width="100%" height="350" frameborder="0" loading="lazy" class="rounded-md"></iframe>
                  </div>
                  <div v-else class="flex items-center justify-center h-full relative">
                    <img src="/mapshops.webp" class="rounded-md object-cover min-h-[350px]" />
                    <div class="absolute inset-0 bg-white/50 hover:bg-white/60 dark:bg-black/50 dark:hover:bg-black/60 transition-all duration-700 flex items-center justify-center rounded-md">
                      <p class="text-center text-sm text-gray-700 dark:text-gray-100">Для отображения карты выберите магазин</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <label for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Комментарий к заказу (необязательно)</label>
            <textarea v-model="clientStore.client.comment" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Напишите что-нибудь..."></textarea>

            <div class="flex justify-end items-center my-2">
              <p class="text-xs text-red-600 dark:text-red-500">{{ errorMsg }}</p>
            </div>

            <div class="flex justify-end items-center my-4">
              <button @click="sendOrder" class="">
                <div class=" text-sm text-gray-100 rounded-lg bg-blue-600 hover:bg-blue-700 border border-gray-300/50 dark:border-gray-500/50 transition-all duration-1000">
                  <div class=" bg-gradient-to-br from-gray-100/20 to-gray-900/40 rounded-lg">
                    <p class="text-white text-base w-52 py-1.5">Сделать заказ</p>
                  </div>
                </div>
              </button>              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>