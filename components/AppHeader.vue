<script setup>
  // import cities from '~/cities.ts';
  import debounce from "lodash.debounce";
  const ctx = useNuxtApp()
  const cities = await import('~/cities.ts')
  const config = useRuntimeConfig()
  const route = useRoute()
  const colorMode = useColorMode()

  const productsStore = useProductsStore()
  const clientStore = useClientStore()
  // const shopStore = useShopStore()

  const { signIn, signOut, token, data, status, lastRefreshedAt } = useAuth()
  const { data: cts } = await useFetch(`${ config.public.baseURL }c/ct/`)
  const { data: workingShops } = await useFetch(`${ config.public.baseURL }c/ws/`)

  const search = ref('')
  const products = ref([])



  /// Ecommerce

  const impressList = (products) => {
    /// Сделать очистку "ecommerce" из dataLayer

    const ecommerceData = {
      "event": "ecommerce",
      "ecommerce": {
        "currencyCode": "RUB",
        "impressions": []
      }
    }

    products.forEach((product, pk) => {
      ecommerceData.ecommerce.impressions.push({
        "id": product.id,
        "name" : product.name,
        "price": product.only_price,
        "brand": product.brand.brand,
        "category": product.category.name,
        "list": "Результаты поиска",
        "position": pk + 1
      })
    })

    window.dataLayer.push(ecommerceData)
  }


  const clickProduct = (product) => {
    const ecommerceData = {
      "event": "ecommerce",
      "ecommerce": {
        "currencyCode": "RUB",
        "click": {
          "products": [
            {
              "id": product.id,
              "name" : product.name,
              "price": product.only_price,
              "brand": product.brand.brand,
              "category": product.category.name,
              "list": "Search",
              "position": 1
            }
          ]
        }
      }
    }
    window.dataLayer.push(ecommerceData)
  }



  const debouncedHandler = debounce(async query => {

    const { data: prods }  = await useFetch(`${ config.public.baseURL }c/search/`, {
      method: 'POST',
      body: {
        name: search
      }
    })

    if (prods.value) {
      products.value = ( await prods.value )
      impressList(prods.value)      
    } else {
      products.value = []
    }

  }, 300);


  watch(search, (searchRequest) => {
    debouncedHandler()
  })
  
  const searchProduct = ref('')
  const searchCity = ref('')
  const searchCountries = computed(() => {
    if (searchCity.value === '') {
      return []
    }

    let matches = 0
    return cities.filter(city => {
      if (
        city.toLowerCase().includes(searchCity.value.toLowerCase())
        && matches < 10
      ) {
        matches++
        return city
      }
    })

  })

  const succesSearch = () => {
    if (process.client) {
      ctx.$metrika.reachGoal('SUCCESS_SEARCH')
    }
  }

</script>


<template>
  <div class="container mx-auto max-w-6xl px-4 lg:px-8 ">

    <div class="relative mb-1">
      <div class="grid grid-cols-1 md:flex gap-4">
        <div class="min-w-[345px]">

          <div class="h-full grid grid-cols-1">


            <div class="flex items-center justify-end">
              <div class="py-2 md:max-w-[345px]">
                <nuxt-link :to="{ name: 'index' }">
                  <img src="/images/blue-svar.webp" alt="main-welder-logo" class="max-h-[6rem] md:max-h-[4rem]" />
                </nuxt-link>
                <div class="flex flex-col py-2">
                  <div class="flex items-center justify-end">
                    
                    <div class="px-3 ">
                      <a href="mailto:zakaz@glsvar.ru" target="_blank" class="text-2xl font-semibold text-right text-gray-800 dark:text-white">zakaz<span class="italic uppercase">@glsvar.ru</span></a>
                      <p style="transform: scaleY(-0.8);" class="-mt-2 text-2xl font-semibold text-right opacity-10 select-none">zakaz<span class="italic uppercase">@glsvar.ru</span></p>
                    </div>

                  </div>
                </div>
              </div>
            </div>


            <div class="grid grid-cols-1 items-end gap-2">
              
              <div v-if="workingShops" class="flex items-center gap-1">
                <a :href="workingShops.google_table_url" target="_blank" class=""> Изменения в графике работы магазинов</a>
                <span class="mdi mdi-open-in-new"></span>                
              </div>

              <div class="grid grid-cols-2 gap-x-2 gap-y-2">
                <button @click="clientStore.locationModal = true" class="py-1 cursor-pointer bg-gray-100 shadow-lg shadow-black/30 border border-gray-100/10 dark:border-white/20 rounded-lg transition-all duration-500">
                  <div class="flex items-center gap-2 text-gray-700">
                    <span class="px-2 mdi mdi-map-marker-radius border-r border-gray-300"></span>
                    <p v-if="clientStore.client.city.length < 14" class="text-sm ">{{ clientStore.client.city }}</p>
                    <p v-else class="text-sm " :title="clientStore.client.city" >{{ clientStore.client.city.slice(0, 14) }} ...</p>
                  </div>
                </button>

                <div id="color-mode" class="BUG">
                  <button v-if="$colorMode.preference === 'system'" @click="$colorMode.preference = 'dark'" class="bg-gray-100 shadow-lg shadow-black/30 border border-gray-100/10 dark:border-white/20 rounded-lg transition-all duration-500 w-full h-full flex items-center">
                    <div class="flex items-center gap-2 text-gray-700 ">
                      <span class="px-2 mdi mdi-laptop border-r border-gray-300"></span>
                      <p class="text-sm "> Сменить тему</p>
                    </div>
                  </button>
                  <button v-if="$colorMode.preference === 'dark'" @click="$colorMode.preference = 'light'" class="bg-gray-100  shadow-lg shadow-black/30 border border-gray-100/10 dark:border-white/20 rounded-lg transition-all duration-500 w-full h-full flex items-center">
                    <div class="flex items-center gap-2 text-gray-700 ">
                      <span class="px-2 mdi mdi-weather-night border-r border-gray-300"></span>
                      <p class="text-sm "> Ночной режим</p>
                    </div>
                  </button>
                  <button v-if="$colorMode.preference === 'light'" @click="$colorMode.preference = 'system'" class="bg-gray-100  shadow-lg shadow-black/30 border border-gray-100/10 dark:border-white/20 rounded-lg transition-all duration-500 w-full h-full flex items-center">
                    <div class="flex items-center gap-2 text-gray-700 ">
                      <span class="px-2 mdi mdi-white-balance-sunny border-r border-gray-300"></span>
                      <p class="text-sm "> Дневной режим</p>
                    </div>
                  </button>
                </div>

                <div class="">
                  <div :to="{ name: 'lk'}" v-if="status === 'authenticated'" class=" bg-gray-100  shadow-lg shadow-black/30 border border-gray-100/10 dark:border-white/20 rounded-lg transition-all duration-500 w-full h-full flex items-center">
                    <div class="flex items-center gap-2 text-gray-700 h-full w-full">
                      <span class="px-2 mdi mdi-account border-r border-gray-300"></span>
                      <p class="text-sm "> Личный кабинет</p>
                    </div>
                  </div>
                  <button  v-else @click="clientStore.registerModal = true" class=" bg-gray-100 shadow-lg shadow-black/30 border border-gray-100/10 dark:border-white/20 rounded-lg transition-all duration-500 w-full h-full flex items-center">
                    <div class="flex items-center gap-2 text-gray-700 h-full w-full">
                      <span class="px-2 mdi mdi-account border-r border-gray-300"></span>
                      <p class="text-sm "> Регистрация</p>
                    </div>
                  </button>
                </div>

                <div class="py-1 bg-gray-100 shadow-lg shadow-black/30 border border-gray-100/10 dark:border-white/20 rounded-lg transition-all duration-500">
                  
                  <button @click="clientStore.loginModal = true" v-if="status === 'unauthenticated'" class="w-full h-full">
                    <div class="flex items-center gap-2 text-gray-700 ">
                      <span class="px-2 mdi mdi-login-variant border-r border-gray-300"></span>
                      <p class="text-sm "> Войти</p>
                    </div>
                  </button>

                  <button v-else @click="signOut({ callbackUrl: '/' }, { redirect: true })" class="w-full h-full">
                    <div class="flex items-center gap-2 text-gray-700 ">
                      <span class="px-2 mdi mdi-login-variant border-r border-gray-300"></span>
                      <p class="text-sm "> Выйти</p>
                    </div>
                  </button>
                </div>
              </div>

              <div class="">
                <div class="group">
                  <div class="cursor-pointer h-full text-gray-100 bg-blue-500 hover:bg-blue-600 rounded-md border border-gray-300/50 dark:border-gray-500/50 transition-all duration-1000">
                    <div class="bg-gradient-to-br from-gray-100/20 to-gray-900/40 rounded-md py-2">
                      <div class="cursor-pointer">
                        <div class="mdi mdi-24px mdi- menu flex items-center justify-center">
                          <p class="text-lg px-2 uppercase "> Открыть каталог</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if=" route.path !== '/cts'" class="py-2 absolute w-full left-0 z-40 invisible group-hover:visible ease-in-out transition-opacity duration-100 opacity-0 group-hover:opacity-100">
                    <div class="bg-white border border-gray-100 shadow-md shadow-black/30 backdrop-blur-md rounded-t-sm rounded-b-md">
                      <div class="px-2 py-2">
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                          <div v-for="ct in cts" :key="ct.id" class="break-inside-avoid-column">

                            <div class="bg-white border border-gray-200 rounded-md py-2 h-full px-2">
                              <div class="grid grid-cols-1 gap-4">

                                <nuxt-link :to="{ name: 'prods', query: { ct: ct.id } }">
                                  <div class="flex justify-center">
                                    <img v-if="ct.image" :src="`${ct.image}`" class="h-16" />
                                  </div>
                                  
                                  <div class="flex justify-center mt-4">
                                    <p class="text-center text-gray-700 text-base transition-all">{{ ct.name }}</p>              
                                  </div>                                    
                                </nuxt-link>

                              </div>                                  
                            </div>

                          </div>


                          <div class="">
                            <div class="bg-white border border-gray-200 rounded-md py-2 px-2 h-full">
                              <nuxt-link :to="{ name: 'cts' }">
                                <div class="flex items-center justify-center h-16">
                                  <img src="/icons/cts.png" class="h-10" />
                                </div>
                                
                                <div class="flex justify-center mt-4">
                                  <p class="text-center text-gray-700 text-base transition-all">Перейти в категории</p>              
                                </div>
                              </nuxt-link>
                            </div>
                          </div>

                          <div class="">
                            <div class="bg-white border border-gray-200 rounded-md py-2 px-2 h-full">
                              <nuxt-link :to="{ name: 'ext-search' }">
                                <div class="flex items-center justify-center h-16">
                                  <img src="/icons/search.png" class="h-10" />
                                </div>
                                
                                <div class="flex justify-center mt-4">
                                  <p class="text-center text-gray-700 text-base transition-all">Расширенный поиск</p>              
                                </div>
                              </nuxt-link>
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


        <div class="w-full">          
          <div class="flex items-end h-full w-full">
            <div class="grid grid-cols-1 w-full">
              
              <div class="w-full">
                <div class="flex justify-end gap-4 md:gap-4 uppercase font-semibold py-2">
                  <div class="before:block before:absolute before:-inset-2 before:-skew-y-3 transition-all duration-0 relative inline-block my-2">
                    <nuxt-link :to="{ name: 'like' }" class="relative text-xs md:text-base">Избранное</nuxt-link>
                  </div>
                  <div class="before:block before:absolute before:-inset-2 before:-skew-y-3 transition-all duration-0 relative inline-block my-2">
                    <nuxt-link :to="{ name: 'compare' }" class="relative text-xs md:text-base">В сравнении</nuxt-link>
                  </div>
                  <div class="before:block before:absolute before:-inset-2 before:-skew-y-3 text-white before:bg-blue-600 transition-all duration-0 relative inline-block my-2 px-2">
                    <nuxt-link :to="{ name: 'cart' }" class="relative text-xs md:text-base">Корзина</nuxt-link>
                  </div>
                  <div class="before:block before:absolute before:-inset-2 before:-skew-y-3 transition-all duration-0 relative inline-block my-2">
                    <nuxt-link :to="{ name: 'about' }" class="relative text-xs md:text-base">О нас</nuxt-link>
                  </div>
                </div>                
              </div>


              <div class="w-full">
                <TopSlider />
              </div>
              

              <div class="mt-2">
                <div class="relative group">
                  <div class="bg-white border border-gray-300 rounded-md">
                    <div class="flex items-center gap-0.5">
                      <div class=" pl-4 mdi mdi-24px mdi-magnify text-gray-600"></div>
                      <input 
                        v-model="search" 
                        type='search'
                        id="search-form"
                        placeholder="Поиск по каталогу"
                        class="bg-white border border-white/0 text-gray-700 dark:text-gray-700 text-lg 
                        rounded-md focus:ring-gray-300/0 focus:border-white/0 block 
                        w-full dark:bg-white dark:border-white/0 dark:placeholder-gray-500
                        ring-0 dark:focus:ring-gray-600/0 dark:focus:border-white/0" 
                      >                      
                    </div>
                  </div>
                  
                  <div v-if="search.length > 1" class="absolute z-40 w-full bg-white border-x border-b border-gray-300 rounded-b-md -mt-1 invisible group-hover:visible ease-in-out transition-opacity duration-100 opacity-0 group-hover:opacity-100">
                    <div class="px-2 h-96 overflow-y-auto border-t border-gray-300 py-1 my-1">
                      <div v-if="search.length > 3 && products.length === 0" class="text-gray-700">
                        <p class="">Ничего не найдено</p>
                      </div>
                      <div v-if="search.length === 0" class="">
                        <p class="">Введите запрос</p>
                      </div>
                      <transition-group name="fade">
                        <div v-for="product in products" :key="product.id" class="px-2 py-0.5 my-1 bg-white hover:border-gray-300 rounded-md transition-all">
                          <nuxt-link :to="{ name: 'product-id', params: { id: product.id }}" @click="succesSearch(); clickProduct(product)" class="">
                            <div class="flex items-center gap-4">
                              <div class="">
                                <img class="bg-white w-20 p-1 rounded-md" :src="product.preview_image" />
                              </div>
                              <div class="">
                                <p class="text-sm text-gray-800">{{ product.name }}</p>
                                <p v-if="product.only_price > 0" class="text-gray-700">{{ product.only_price.toLocaleString() }} <span class="text-xs">руб.</span> 
                                <span>                

                                    <span v-if="product.status === 'stock'" class="text-sm px-2"> в наличии</span>
                                    <span v-if="product.status === 'order'" class="text-sm px-2"> под заказ</span>

                                </span>  
                                </p>
                                <p v-else class="text-xs text-gray-700">Стоимость по запросу</p>
                              </div>
                            </div>
                          </nuxt-link>
                        </div>
                      </transition-group>
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
</template>