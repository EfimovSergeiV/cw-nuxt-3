<script setup>
  const config = useRuntimeConfig()
  const notificationsStore = useNotificationsStore()
  
  const currentData = new Date().getFullYear()
  const { data: cts } = await useFetch(`${ config.public.baseURL }c/ct/`)

</script>


<template>
  <div class="container mx-auto px-4 max-w-6xl lg:px-8 pt-2">
    <div class="bg-white dark:bg-gray-800 rounded-t-md border-t border-x border-gray-200 dark:border-gray-700 px-4 py-2 relative">


      <div class="hidden md:block">
        <!-- <p class="text-base text-gray-700 dark:text-gray-300 py-1">Категории</p> -->
        <div class="">
            <div class="columns-2 lg:columns-3 gap-4">
              <div v-for="ct in cts" :key="ct.id" class="break-inside-avoid-column py-2">
                <nuxt-link :to="{ name: 'prods', query: { ct: ct.id } }" class="text-lg uppercase italic font-semibold  text-gray-700 dark:text-gray-100">{{ ct.name }}</nuxt-link>

                <div class="flex flex-wrap gap-x-6 py-1 gap-y-1 border-t border-gray-300 dark:border-gray-700">
                  <div v-for="sct in ct.inserted" :key="sct.id" class="flex items-center gap-2">
                    <nuxt-link :to="{ name: 'prods', query: { ct: sct.id } }" class="text-xs text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-all">{{ sct.name }}</nuxt-link>
                  </div>
                </div>

              </div>
            </div>
          </div>
      </div>


      <div class="md:flex md:justify-between items-start">


        <div class="grid grid-cols-1">

          <div class="">
            <div class="flex items-center">
              <img src="/images/vk-logo.webp" alt="vk-logo" class="w-5" />
              <a href="https://vk.com/glsvar" target="_blank" class="font-bold text-base mx-2">МЫ ВКОНТАКТЕ</a>
            </div> 
          </div>

          <div class="py-4">
            <ul class="flex justify-start gap-2 md:gap-4 text-xs md:text-sm mt-3 sm:mt-0 md:order-last">
              <li>
                <button @click="notificationsStore.pushToast({id: 1, type: 'error', text:' Раздел временно не доступен'})" class="text-xs text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">Доставка</button>
              </li>
              
              <li>
                <button @click="notificationsStore.pushToast({id: 10, type: 'error', text:' Раздел временно не доступен'})" class="text-xs text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">Способы оплаты</button>
              </li>

              <li>
                <nuxt-link :to="{ name: 'policy'}" class="text-xs text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">Политика обработки данных</nuxt-link>
              </li>
            </ul>
          </div>

        </div>


        <div class="w-full h-full md:w-1/2 md:order-1">
          
          <p class="text-[10px] md:text-xs py-2 select-none text-gray-600 dark:text-gray-400">
            Все цены и материаллы, указанные на сайте www.glsvar.ru, приведены как справочная информация и не являются публичной офертой и могут быть изменены в любое время без предупреждения. 
            Для получения подробной информации о стоимости, сроках и условиях поставки просьба обращаться по указанным на сайте телефонам<span @click="eventSend()" class="cursor-pointer">.</span>
          </p> 

        </div>
      </div>


      <div class="">
        <div class="flex items-center justify-start">

          <span class="text-xs text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 flex items-end justify-center md:justify-start">© {{ currentData }} <p class="mx-1">Главный сварщик</p></span>

        </div>
      </div>

    </div>
  </div>
</template>