<script setup>
  const route = useRoute()
  const config = useRuntimeConfig()
  const clientStore = useClientStore()

  const { data: prod } = await useFetch(`${ config.public.baseURL }c/ext/${route.params.id}/`)

  useSeoMeta({
    title: `${prod.value.name} есть наличии в ${prod.value.city} - купить в магазине Главный Сварщик'`,
    description: `Главный сварщик ${prod.value.city}, ${prod.value.name}, сварочное оборудование, оборудование для сварки, купить электроды, купить проволоку, купить источник, купить сварочный инвертор`,
    keywords: `Главный сварщик ${prod.value.city}, ${prod.value.name}, сварочное оборудование, оборудование для сварки, купить электроды, купить проволоку, купить источник, купить сварочный инвертор`,
  })

</script>


<template>

  <div class="">
    <AppHeader />


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


      <div class="bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 px-4 py-2 relative">
        
        <div class="flex items-center py-2">
          <div class="grid grid-cols-1 gap-2">
            <p class="text-xl">{{ prod.name }}</p>
            <div class="">
              <p class="text-xs">{{ prod.city }}. {{ prod.shop }}</p>            
            </div>
          </div>
        </div>
        
        <div class="flex items-center justify-end py-2">
          <p class="text-sm">Последнее обновление: <span class="text-base pl-4">{{ prod.last_update.slice(0, 10) }}</span></p>
        </div>


        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div class="">
            <p class="">Форма быстрого заказа:</p>

            <div class="grid grid-cols-1 gap-2">
              <div class="">
                <div class="">
                  <label for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Имя (необязательно)</label>
                  <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <p class="mdi mdi-account"></p>
                    </div>
                    <input v-model="clientStore.client.person" type="text" id="person" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Иван Иванов">
                  </div>
                </div>
              </div>
              <div class="">
                <div class="">
                  <label for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Номер телефона</label>
                  <div class="relative">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <p class="mdi mdi-phone"></p>
                    </div>
                    <input v-model="clientStore.client.phone" type="text" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+7 (987) 654 32 10">
                  </div> 
                </div>
              </div>
            </div>
          </div>


          <div class="border border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 bg-gray-100 dark:bg-gray-700 transition-all px-4 py-2 rounded-md shadow-md shadow-black/20">
            
            <div class="h-full ">
              <div class="grid grid-cols-1 content-center h-full gap-6">

                <div class="grid grid-cols-1 gap-2">
                  <p class="text-xl">Стоимость: <span class="text-3xl font-semibold pl-2">{{ prod.price }}</span> руб.</p>
                  <p class="">В наличии: <span>{{ prod.quantity }}</span></p>
                </div>

                <div class="flex items-center justify-end">
                  <div class="flex items-center justify-end gap-6">

                    <button @click="" class="text-sm">
                      Добавить в корзину
                    </button>

                    <button @click="" class="">
                      <div class=" text-sm text-gray-100 rounded-lg bg-blue-600 hover:bg-blue-700 border border-gray-300/50 dark:border-gray-500/50 transition-all duration-1000">
                        <div class=" bg-gradient-to-br from-gray-100/20 to-gray-900/40 rounded-lg">
                          
                          <transition name="fade" mode="out-in">
                            <div v-if="false">
                              <p class="text-white text-sm w-36 md:w-32 py-1.5">В корзине</p>
                            </div>
                            <div v-else>
                              <p class="text-white text-sm w-36 md:w-32 py-1.5">Быстрый заказ</p>
                            </div>
                          </transition>

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


    <ExtSearch />

    <AppFooter />
  </div>

</template>