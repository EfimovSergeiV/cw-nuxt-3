<script setup>
  const ctx = useNuxtApp()
  const route = useRoute()
  const router = useRouter()
  const config = useRuntimeConfig()
  const clientStore = useClientStore()
  const productsStore = useProductsStore()
  const notificationsStore = useNotificationsStore()

  const { data: prod } = await useFetch(`${ config.public.baseURL }c/ext/${route.params.id}/`)

  if (prod.value) {
    useSeoMeta({
      title: `${prod.value.name} есть наличии г.${prod.value.city}. ${prod.value.shop} - купить в магазине Главный Сварщик`,
      description: `Главный сварщик г.${prod.value.city} ${prod.value.shop}, ${prod.value.name}, сварочное оборудование, оборудование для сварки, купить электроды, купить проволоку, купить источник, купить сварочный инвертор`,
      keywords: `Главный сварщик г.${prod.value.city} ${prod.value.shop}, ${prod.value.name}, сварочное оборудование, оборудование для сварки, купить электроды, купить проволоку, купить источник, купить сварочный инвертор`,
    })    
  }


  const responseMethod = ref(" ")
  const errorMsg = ref(false)

  const sendData = () => {
    if (clientStore.client.contact) {
      $fetch(`${ config.public.baseURL }o/oneclick/`, {
        method: 'POST',
        body: {
          "name": clientStore.client.person,
          "contact": clientStore.client.contact,
          "comment": clientStore.client.comment,
          "msger": responseMethod.value,
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
      notificationsStore.pushToast({ id: 1, type: 'error', text: 'Ошибка: Проверте правильно ли заполнены обязательные поля.' })

    }
  }


</script>


<template>

  <div class="">
    <AppHeader />

    <div v-if="prod" class="">

      <div class="container mx-auto px-4 max-w-6xl lg:px-8 py-2">
        <nav class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-md bg-white dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="hidden md:inline-flex items-center">
              <nuxt-link :to="{ name: 'index' }" class="inline-flex items-center text-xs text-center font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                Главная
              </nuxt-link>
            </li>
            <li class="">
              <div class="flex items-center">
                <svg class=" hidden md:block w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                <nuxt-link :to="{ name: 'ext-search'}" class="ml-1 text-xs text-center font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-300 dark:hover:text-gray-100">Расширенный поиск</nuxt-link>
              </div>
            </li>
            <li class="">
              <div class="flex items-center">
                <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                <p class="ml-1 text-xs text-center font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-300 dark:hover:text-gray-100">{{  prod.name }}</p>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      
      
      <div class="container mx-auto px-4 max-w-6xl lg:px-8 py-2">

        <div class="grid grid-cols-1 gap-4">
          <div class="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 px-4 py-2">

            <div class="grid grid-cols-1 gap-2 py-2">
              <h1 class="text-xl text-right">{{ prod.name }}</h1>
              <div class="">
                <h2 class="text-xs text-right">{{ prod.city }}. {{ prod.shop }}</h2>            
              </div>
            </div>
            
            <p class="">Форма быстрого заказа</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="">
                <div class="grid grid-cols-1 gap-2">
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



                </div>
              </div>
              <div class="grid grid-cols-1 content-between gap-4">

                <div class="">
                  <label for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Комментарий к заказу (необязательно)</label>
                  <textarea v-model="clientStore.client.comment" id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Напишите что-нибудь..."></textarea>
                </div>

                <div class="">
                  <div class="border border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 bg-gray-100 dark:bg-gray-700 transition-all rounded-md shadow-md shadow-black/20 px-2 py-2">
                
                    <div class="grid grid-cols-1 gap-4 content-between">

                      <div class="flex items-center justify-between">

                        <div class="grid grid-cols-1 gap-2">
                          <p class="text-xl">Стоимость: <span class="text-3xl font-semibold pl-2">{{ prod.price }}</span> руб.</p>
                          <p class="">В наличии: <span>{{ prod.quantity }}</span></p>
                          <div class="grid grid-cols-1 gap-2 md:flex mt-4">
                            <p class="text-xs md:text-sm">Последнее обновление:</p>
                            <p class="text-xs md:text-base">{{ prod.last_update.slice(0, 10) }}</p>
                          </div>
                        </div>

                        <div class="grid grid-cols-1 gap-4">
                          <div class="flex items-center justify-center">
                            
                            <div class="min-h-[32px]">
                              <Transition name="fade">
                                <div v-if="productsStore.productInSimpleCart(prod.id)" class="flex items-center justify-between gap-4 select-none w-[80px]">
                                  <div class="cursor-pointer">
                                    <button v-if="productsStore.productInSimpleCart(prod.id).quantity > 1" @click="productsStore.quantitySimpleProduct({ 'prod_type': 'ext', 'id': prod.id, 'name': prod.name, 'price': prod.price, 'quantity': productsStore.productInSimpleCart(prod.id).quantity }, 'ext', 'del' )" class="text-2xl font-semibold">-</button>
                                    <button v-else class="text-2xl font-semibold">-</button>
                                  </div>
                                  <p class="text-xl">{{ productsStore.productInSimpleCart(prod.id).quantity }}</p>
                                  <div class="cursor-pointer">
                                    <button v-if="productsStore.productInSimpleCart(prod.id).quantity < prod.quantity" @click="productsStore.quantitySimpleProduct({ 'prod_type': 'ext', 'id': prod.id, 'name': prod.name, 'price': prod.price, 'quantity': productsStore.productInSimpleCart(prod.id).quantity }, 'ext', 'add' )" class="text-2xl font-semibold">+</button>
                                    <button v-else disabled class="text-2xl font-semibold">+</button>
                                  </div>
                                </div>                               
                              </Transition>
                            </div>

                          </div>

                          <button v-if="productsStore.productInSimpleCart(prod.id)" @click="sendData" class="">
                            <div class=" text-sm text-gray-100 rounded-lg bg-blue-600 hover:bg-blue-700 border border-gray-300/50 dark:border-gray-500/50 transition-all duration-1000">
                              <div class=" bg-gradient-to-br from-gray-100/20 to-gray-900/40 rounded-lg">
                                <div>
                                  <p class="text-white text-sm w-36 md:w-32 py-1.5">Быстрый заказ</p>
                                </div>
                              </div>
                            </div>
                          </button>

                          <button v-else @click="notificationsStore.pushToast({id: 1, type: 'success', text:'Товар добавлен в корзину'}); productsStore.addSimpleProduct({'prod_type': 'ext', 'id': prod.id, 'name': prod.name, 'price': prod.price, 'quantity': 1 })" class="">
                            <div class=" text-sm text-gray-100 rounded-lg bg-blue-600 hover:bg-blue-700 border border-gray-300/50 dark:border-gray-500/50 transition-all duration-1000">
                              <div class=" bg-gradient-to-br from-gray-100/20 to-gray-900/40 rounded-lg">
                                <div>
                                  <p class="text-white text-sm w-36 md:w-32 py-1.5">В корзину</p>
                                </div>
                              </div>
                            </div>
                          </button>


                        </div>

                      </div>


                    

                    </div>



                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>


      </div>

    </div>


    <ExtSearch />

    <AppFooter />
  </div>

</template>