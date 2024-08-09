<script setup>
  const ctx = useNuxtApp()
  const config = useRuntimeConfig()
  const productsStore = useProductsStore()
  const clientStore = useClientStore()
  const notificationsStore = useNotificationsStore()
  const route = useRoute()
  const router = useRouter()

  const { data: brands } = await useFetch(`${ config.public.baseURL }c/ctbrand/`, { params: route.query })
  const { data: props } = await useFetch(`${ config.public.baseURL }c/props/`, { params: route.query })
  const { data: products } = await useFetch(`${ config.public.baseURL }c/prods/`, { params: route.query })
  const { data: breadcrumbs } = await useFetch(`${ config.public.baseURL }c/breadcrumb/`, { params: route.query })


  if ( products.value === null ) {
    products.value = {
      count: 0,
      results: [],
      meta: {
        title: 'Сварочное оборудование и расходные материалы',
        description: 'Сварочное оборудование и расходные материалы',
        keywords: 'Сварочное оборудование и расходные материалы',
        inserted: []
      }
    }
  }

  useSeoMeta({
    title: `${ products.value.meta.title } - купить онлайн в Главный Сварщик`,
    description: `${ products.value.meta.title }, большой выбор, купить по низким ценам. Гарантия качества.`,
    keywords: `${ products.value.meta.title }, сварочное оборудование, оборудование для сварки, купить электроды, купить проволоку, купить источник, купить сварочный инвертор`,
    ogLocale: 'ru_RU',
    ogTitle: `${ products.value.meta.title }`,
    ogDescription: `${ products.value.meta.title }, большой выбор, купить по низким ценам. Гарантия качества.`,
    ogImage: `/og-image.png`,
    twitterCard: `/og-image.png`,
  })


  // Ecommerce

  const impressList = (products, category) => {
    const ecommerceData = {
      "event": "ecommerce",
      "ecommerce": {
        "currencyCode": "RUB",
        "impressions": []
      }
    }

    products.forEach((product) => {
      ecommerceData.ecommerce.impressions.push({
        "id": product.id,
        "name" : product.name,
        "price": product.only_price,
        "brand": product.brand.brand,
        "category": category,
      })
    })

    window.dataLayer.push(ecommerceData)
  }


  const scrollToTop = () => {
    window.scrollTo({ top: 0 })
  }

  watch(() => route.fullPath, async (fullPath) => {
      const { data: brands_updated }  = await useFetch(`${ config.public.baseURL }c/ctbrand/`, { params: route.query })
      const { data: prods_updated }  = await useFetch(`${ config.public.baseURL }c/prods/`, { params: route.query })
      const { data: props_updated }  = await useFetch(`${ config.public.baseURL }c/props/`, { params: route.query })
      const { data: breadcrumbs_updated } = await useFetch(`${ config.public.baseURL }c/breadcrumb/`, { params: route.query })
      
      brands.value = ( await brands_updated.value )
      products.value = ( await prods_updated.value )
      props.value = ( await props_updated.value)
      breadcrumbs.value = ( await breadcrumbs_updated.value )

      impressList(products.value.results, products.value.meta.title)
      
      scrollToTop()
    }
  )

  // const page_id = ref(1)

  // const { data: products, pending, error } = await useAsyncData(() => {
  //   return $fetch(`${ config.public.baseURL }c/prods/`, { params: { ct: ct_id.value, page: page_id.value } })
  // // return $fetch(`${ config.public.baseURL }c/prods/`, { params: route.query })
  // }, {
  //   watch: [ct_id, page_id ]
  // })

  const successSending = ref(false)
  const messText = ref(null)

  const sendMessage = async () => {
    if ( (clientStore.client.city) && (clientStore.client.contact) && (messText.value) ) {
      const { data: response } = await useFetch(`${ config.public.baseURL }u/feedback/`, {
        method: 'POST',
        body: {
          city: clientStore.client.city,
          person: clientStore.client.person,
          contact: clientStore.client.contact,
          theme: 'order',
          text: messText.value,
        }
        
      });

      notificationsStore.pushToast({ id: 1, type: 'success', text: 'Ваше сообщение отправлено!' })
      successSending.value = true

      if (process.client) {
        ctx.$metrika.reachGoal('SEND_MESSAGE')
      }

    } else {
      errorMsg.value = 'Ошибка: Для отправки сообщения заполните все поля.'
    }
  }


  const clearFilter = () => {
    router.push({
      name: 'prods',
      query: {
        ct: route.query.ct,
        page: 1
      },
    })
  }

    /// Ecommerce

  onMounted(() => {

    console.log("MOUNTED ")
    impressList(products.value.results, products.value.meta.title)

  })

</script>



<template>
  <div>

    <AppHeader />
    <BreadCrumbs id="breadcrumbs" :breadcrumbs="breadcrumbs" />

    <div class="mx-auto px-4 max-w-6xl lg:px-8">


      <div class="flex items-center justify-end pb-2">
        <h1 class="text-xl font-semibold">{{ products.meta.title }}</h1>
      </div>


      <div class="flex items-center justify-between">

        <div class="hidden md:block">
          <div class="flex gap-1">
            <button @click="clientStore.viewport = 'grid'" class="mdi mdi-24px mdi-view-grid text-gray-600 dark:text-gray-300"></button>            
            <button @click="clientStore.viewport = 'row'" class="mdi mdi-24px mdi-view-agenda text-gray-600 dark:text-gray-300"></button>
          </div>
        </div>

        <div v-if="products.meta.inserted" class="flex items-center justify-end">
          <div id="" class="">
            <div class="flex flex-wrap gap-2 justify-end">
              <div v-for="inserted in products.meta.inserted" :key="inserted.id" class="">
                <div class="bg-white dark:bg-gray-800 rounded-xl border hover:border-gray-300 dark:border-gray-700 border-gray-200 hover:dark:border-gray-700 transition-all shadow-md">
                  
                  <div class="flex items-center justify-center py-1 px-4">
                    <nuxt-link :to="{ name: 'prods', query: { ct: inserted.id}}" class="text-[10px] md:text-xs">{{ inserted.name }}</nuxt-link>
                  </div>
                
                </div>
              </div>          
            </div>
          </div>
        </div>

      </div>
    </div>


    <div class="mx-auto px-4 my-2 max-w-6xl lg:px-8">
      <div class="grid grid-cols-1 md:flex items-center justify-between">

        <div class="flex items-center gap-1 justify-between md:justify-end my-2">
          <button class="w-full px-4 h-8 text-sm flex items-center justify-center text-gray-500 bg-white rounded-r-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="notificationsStore.statusFilterComponent">Фильтр</button>
          <nuxt-link :to="{ name: 'prods', query: { page: 1, ...route.query, by: 'Date' } }" class="w-full px-3 md:px-4 h-8 text-xs md:text-sm flex items-center justify-center text-gray-500 bg-white rounded-r-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Новые</nuxt-link>
          <nuxt-link :to="{ name: 'prods', query: { page: 1, ...route.query, by: 'Rating' } }" class="w-full px-3 md:px-4 h-8 text-xs md:text-sm flex items-center justify-center text-gray-500 bg-white rounded-r-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Рейтинг</nuxt-link>
          <nuxt-link :to="{ name: 'prods', query: { page: 1, ...route.query, by: 'LowPrice' } }" class="w-full px-3 md:px-4 h-8 text-xs md:text-sm flex items-center justify-center text-gray-500 bg-white rounded-r-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Дешевле</nuxt-link>
          <nuxt-link :to="{ name: 'prods', query: { page: 1, ...route.query, by: 'HighPrice' } }" class="w-full px-3 md:px-4 h-8 text-xs md:text-sm flex items-center justify-center text-gray-500 bg-white rounded-r-sm border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Дороже</nuxt-link>
        </div>

        <Pagination :count="products.count" />

      </div>

    </div>


    <transition name="filter">
      <div v-if="notificationsStore.filterComponent" class="fixed z-40 top-0 left-0">
        <Filters :brands="brands" :props="props" />
      </div>
    </transition>

   
    <div class="">
      <div class="container mx-auto px-4 max-w-6xl lg:px-8">

        <transition name="fade">
          <div v-if="products.results.length > 0" id="products" class="">

            <transition name="fade" mode="out-in">
              <div v-if="clientStore.viewport === 'grid'" class="grid grid-cols-1 gap-y-4 gap-x-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
                <transition-group name="fade">
                    <div class="" v-for="product in products.results" :key="product.id">
                      <ProductCard :product="product" />
                    </div>                
                </transition-group>
              </div>

              <div v-else class="grid grid-cols-1 gap-4">
                <transition-group name="fade">
                    <div class="" v-for="product in products.results" :key="product.id">
                      <ProductCardLS :product="product" />
                    </div>                
                </transition-group>
              </div>            
            </transition>


          </div>


          <div class="" v-else>

            <div class="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4 min-h-[50vh]">
              <div class="flex items-center justify-center py-8 lg:py-16">
                <p class=""> По вашему запросу товаров не найдено...</p>
              </div>


              <div class="grid grid-cols-1 gap-0.5 py-8">
                <p class="text-4xl uppercase px-0.5">Не нашли что искали?</p>
                <div class="flex">
                  <p class="text-sm md:text-base border-t text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 px-0.5">Отправьте заявку на товар, который вам нужен, и мы постараемся его найти</p>

                </div>
              </div>


              <div class="grid grid-cols-1 md:flex md:flex-wrap gap-4">
                <div class="">
                  <label for="person" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Как к вам обращаться?</label>
                  <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <p class="mdi mdi-account text-gray-700 dark:text-gray-300"></p>
                    </div>
                    <input v-model="clientStore.client.person" type="text" id="person" :readonly="successSending" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[320px] pl-10 p-2.5  dark:bg-gray-600 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Иван Иванов">
                  </div>                
                </div>
                <div class="">
                  <label for="email" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Как с вами связаться?</label>
                  <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <p class="mdi mdi-email text-gray-700 dark:text-gray-300"></p>
                    </div>
                    <input v-model="clientStore.client.contact" type="text" id="email" :readonly="successSending" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[320px] pl-10 p-2.5  dark:bg-gray-600 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e-mail или номер телефона">
                  </div>                 
                </div>
                <div class="">
                  <label for="city" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Где вы находитесь?</label>
                  <div class="relative cursor-pointer" @click="clientStore.locationModal = true">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <p class="mdi mdi-map-marker-radius text-gray-700 dark:text-gray-300"></p>
                    </div>
                    <input v-model="clientStore.client.city" type="text" id="city" readonly class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full md:w-[320px] pl-10 p-2.5  dark:bg-gray-600 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Москва">
                  </div>                 
                </div>
              </div>


              <div class="">
                <label for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Опишите что вы ищете</label>
                <textarea v-model="messText" id="message" rows="4" :readonly="successSending" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Опишите что вы искали и не смогли найти..."></textarea>
              </div>

              
              <transition name="fade">
                <div v-if="successSending" class="grid grid-cols-1 gap-2 py-4">
                  <p class="">Ваша заявка успешно отправлена!</p>
                  <p class="">Мы свяжемся с вами в ближайшее время.</p>

                  <div class="">
                    <button @click="clearFilter()" class="py-4">
                      <div class=" text-sm text-gray-100 rounded-lg bg-blue-600 hover:bg-blue-700 border border-gray-300/50 dark:border-gray-500/50 transition-all duration-1000">
                        <div class=" bg-gradient-to-br from-gray-100/20 to-gray-900/40 rounded-lg">
                          <p class="px-5 py-2">Очистить фильтр</p>
                        </div>
                      </div>
                    </button>                  
                  </div>

                </div>
                <div v-else class="flex gap-4">
                  <div class="">
                    <button @click="clearFilter()" class="py-4">
                      <div class=" text-sm text-gray-100 rounded-lg bg-blue-600 hover:bg-blue-700 border border-gray-300/50 dark:border-gray-500/50 transition-all duration-1000">
                        <div class=" bg-gradient-to-br from-gray-100/20 to-gray-900/40 rounded-lg">
                          <p class="px-5 py-2">Очистить фильтр</p>
                        </div>
                      </div>
                    </button>                  
                  </div>
                  <button @click="sendMessage" class="py-4">
                    <div class=" text-sm text-gray-100 rounded-lg bg-blue-600 hover:bg-blue-700 border border-gray-300/50 dark:border-gray-500/50 transition-all duration-1000">
                      <div class=" bg-gradient-to-br from-gray-100/20 to-gray-900/40 rounded-lg">
                        <p class="px-5 py-2">Отправить</p>
                      </div>
                    </div>
                  </button>
                </div>
              </transition>



            </div>
            
          </div>
        </transition>




      </div>
    </div>



    <div class="mx-auto px-4 my-2 max-w-6xl lg:px-8">
      <div v-if="products.count > 0" class="flex items-center justify-start md:justify-end">
        <Pagination :count="products.count" />
      </div>
    </div>

    <AppFooter />

  </div>
</template>