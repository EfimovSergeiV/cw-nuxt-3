<script setup>
  import debounce from "lodash.debounce";

  const config = useRuntimeConfig()
  const productsStore = useProductsStore()
  const notificationsStore = useNotificationsStore()

  const products = ref([])
  const search = ref(null)
  const current = ref(1)

  const selCity = ref('all')
  const selShop = ref('all')
  // const selOrder = ref('low')

  const loading = ref(false)
  const emptySearch = ref(false)
  const resultSlicer = ref(20)


  const debouncedHandler = debounce(async query => {
    emptySearch.value = false
    loading.value = true
    resultSlicer.value = 20

    const { data: prods }  = await useFetch(`${ config.public.baseURL }c/ext/search/`, {
      method: 'POST',
      body: {
        name: search.value,
        city: selCity.value,
        shop: selShop.value
      }
    })

    if (prods.value.length === 0) {
      emptySearch.value = true
    }

    products.value = ( await prods.value )
    loading.value = false

  }, 300);

  watch(search, (searchRequest) => {
    debouncedHandler()
  })

  watch(selCity, () => {
    selShop.value = 'all'
    debouncedHandler()
  })

  watch(selShop, () => {
    debouncedHandler()
  })




</script>

<template>
  <div class="">

    <div class="container mx-auto px-4 max-w-6xl lg:px-8 py-2">
      <div class="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 px-4 py-2 relative">
        <div class="grid grid-cols-1 gap-4">
          <div class="">
            <p class="text-base md:text-xl">Поиск по товарам в наличии в магазинах</p>
          </div>
          <div class=" md:w-3/4">
            <div class="grid grid-cols-1 gap-2">

              <div class="grid grid-cols-1 md:flex items-center gap-2">
                
                <div class="">
                  <select v-model="selCity" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500/0 focus:border-blue-500/0 block w-full pr-10 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500/0 dark:focus:border-blue-500/0">
                    <option value="all">Во всех горадах</option>
                    <option value="Псков">Псков</option>
                    <option value="Великие Луки">Великие Луки</option>
                    <option value="Смоленск">Смоленск</option>
                    <option value="Петрозаводск">Петрозаводск</option>
                  </select>
                </div>

                <div class="">
                  <select v-model="selShop" id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500/0 focus:border-blue-500/0 block w-full pr-4 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500/0 dark:focus:border-blue-500/0">
                    <option value="all" >Во всех магазинах</option>
                    <option value="пос. Неёлово, ул.Юбилейная д. 5ж">пос. Неёлово, ул.Юбилейная д. 5ж</option>
                    <option value="ул.Леона Поземского, 92, Павильон 28 (рынок на Алмазной)">ул.Леона Поземского, 92, Павильон 28 (рынок на Алмазной)</option>
                    <option value="ул.Шоссейная д.3а">ул.Шоссейная д.3а</option>
                    <option value="проспект Ленина д.57">	проспект Ленина д.57</option>
                    <option value="ул. Заводская, д. 2">	ул. Заводская, д. 2</option>
                    <option :value='`ул. Посёлок Тихвинка 69, ТК "Город Мастеров" павильон №73`'>	ул. Посёлок Тихвинка 69, ТК "Город Мастеров" павильон №73</option>
                  </select>
                </div>
                
              </div>

              <div class="bg-white border border-gray-300 rounded-md">
                <div class="flex items-center gap-0.5">
                  <div class=" pl-4 mdi mdi-24px mdi-magnify text-gray-600"></div>
                  <input 
                    v-model="search" 
                    type='search'
                    id="search-form"
                    placeholder="Вводите название товара"
                    class="bg-white border border-white/0 text-gray-700 dark:text-gray-700 text-lg 
                    rounded-md focus:ring-gray-300/0 focus:border-white/0 block 
                    w-full dark:bg-white dark:border-white/0 dark:placeholder-gray-500
                    ring-0 dark:focus:ring-gray-600/0 dark:focus:border-white/0" 
                  >                      
                </div>
              </div>

            </div>
            <!-- СПРАВА ОСТАВЛЯЕМ ПУСТО -->
            <div class="">
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="container mx-auto px-4 max-w-6xl lg:px-8 py-2 hidden">
      <div class="grid grid-cols-1 gap-4 md:flex items-center justify-between">
        <div v-if="true" class="">
          <ul class="flex items-center gap-0.5 font-semibold">
            <li>
              <nuxt-link :to="'/'" class="w-8 h-8 flex items-center justify-center text-gray-500 bg-white rounded-l-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                &lt;
              </nuxt-link>
            </li>
            <li v-for="(page, pk) in [1,2,3,4,5,]" :key="pk">
              <nuxt-link :to="'/'">
                <div v-if="Number(current) === Number(page)" class="w-8 h-8 flex items-center justify-center text-gray-700 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{{ page }}</div>
                <div v-else class="w-8 h-8 flex items-center justify-center text-gray-500 bg-white rounded-r-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ page }}</div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="'/'" class="w-8 h-8 flex items-center justify-center text-gray-500 bg-white rounded-r-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                &gt;
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="flex items-center justify-start md:justify-end gap-4">
          <p class="">Дешевле</p>
          <p class="">Дороже</p>
          <p class="">Кол-во на странице: 20</p>
        </div>
      </div>
    </div>




    <transition name="fade">
      <div v-if="products.length > 0" class="container mx-auto px-4 max-w-6xl lg:px-8 py-2">
        <div class="grid grid-cols-1 gap-2">
          <div v-for="product in products.slice(0, resultSlicer)" :key="product.id" class="">
            <div class="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 relative">

              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 px-2 py-1">

                <div class="flex items-center md:px-4">
                  <div class="">
                    <nuxt-link :to="{ name: 'ext-id', params: { id: product.id }}" class="text-sm md:text-base">{{ product.name }}</nuxt-link>
                  </div>
                </div>

                <div class="">
                  <div class="flex items-center justify-start md:justify-end h-full gap-2">

                    <div class="grid grid-cols-1 content-center border border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-700 transition-all px-4 py-0.5 h-full rounded-md shadow-md shadow-black/20">
                      <p class="hidden md:block text-xs">{{ product.city }}</p>
                      <p class="text-xs">{{ product.shop }}</p>
                    </div>

                    <div class="w-[200px] grid grid-cols-1 content-center border border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-700 transition-all px-1 md:px-4 py-0.5 h-full rounded-md shadow-md shadow-black/20">
                      <div class="flex items-center justify-end">
                        <div class="">
                          <p class="text-xs md:text-base font-semibold text-right">{{ product.price }}<span class="text-sm px-1 font-normal"> руб.</span></p>
                          <p class="text-xs text-right">в наличии: <span class="text-xs md:text-sm font-semibold px-2"> {{ product.quantity }}</span></p>                           
                        </div>
                
                      </div>
                    </div>

                    <div class="w-[60px] flex items-center justify-center border border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 bg-gray-100 dark:bg-gray-700 transition-all px-4 py-0.5 h-full rounded-md shadow-md shadow-black/20">

                      <div v-if="productsStore.productInSimpleCart(product.id)" class="">
                        <nuxt-link :to="{ name: 'ext-id', params: { id: product.id }}" class="mdi mdi-24px mdi-check text-gray-600 dark:text-gray-300"></nuxt-link>
                      </div>
                      
                      <div v-else>
                        <button @click="notificationsStore.pushToast({id: 1, type: 'success', text:'Товар добавлен в корзину'}); productsStore.addSimpleProduct({'prod_type': 'ext', 'id': product.id, 'name': product.name, 'price': product.price, 'quantity': 1 })" class="mdi mdi-24px mdi-cart-arrow-down text-gray-600 dark:text-gray-300"></button>
                      </div>


                    </div>

                  </div>
                  

                </div>
                
              </div>


            </div>
          </div>
        </div>

        <div v-if="products.length > resultSlicer" class=" flex items-center justify-center">
          <button @click="resultSlicer += 20" class="w-full md:w-[320px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 mt-2">Показать еще</button>
        </div>


      </div>

    </transition>

    <transition name="fade">
      <div v-if="loading || emptySearch" class="container mx-auto px-4 max-w-6xl lg:px-8 py-2">
        <div class="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 px-4 py-2 relative">
          <div class="grid grid-cols-1 gap-4">
            <div v-if="emptySearch" class="">
              <p class="text-xl">По вашему запросу ничего не найдено</p>
            </div>
            <div v-else class="flex items-center justify-center">
              <p class="mdi mdi-24px mdi-spin mdi-chart-donut"></p>
              <p class="text-xl px-4">Ищем...</p>
            </div>
          </div>
        </div>
      </div>
    </transition>

    




    <div class="hidden container mx-auto px-4 max-w-6xl lg:px-8 py-2">
      <div class="flex items-center justify-end">
        <div v-if="true" class="">
          <ul class="flex items-center gap-0.5 font-semibold">
            <li>
              <nuxt-link :to="'/'" class="w-8 h-8 flex items-center justify-center text-gray-500 bg-white rounded-l-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                &lt;
              </nuxt-link>
            </li>
            <li v-for="(page, pk) in [1,2,3,4,5,]" :key="pk">
              <nuxt-link :to="'/'">
                <div v-if="Number(current) === Number(page)" class="w-8 h-8 flex items-center justify-center text-gray-700 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{{ page }}</div>
                <div v-else class="w-8 h-8 flex items-center justify-center text-gray-500 bg-white rounded-r-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{{ page }}</div>
              </nuxt-link>
            </li>
            <li>
              <nuxt-link :to="'/'" class="w-8 h-8 flex items-center justify-center text-gray-500 bg-white rounded-r-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                &gt;
              </nuxt-link>
            </li>
          </ul>
        </div>      
      </div>
    </div>


  </div>
</template>

<style scoped>



</style>