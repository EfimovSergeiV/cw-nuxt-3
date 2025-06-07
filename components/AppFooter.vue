<script setup>
  const config = useRuntimeConfig()
  const notificationsStore = useNotificationsStore()
  
  const currentData = new Date().getFullYear()
  const { data: cts } = await useFetch(`${ config.public.baseURL }c/ct/`)

</script>


<template>
  <div class="container mx-auto px-4 max-w-6xl lg:px-8 pt-2">

    <div class="relative">

      <div class="bg-white/70 dark:bg-gray-800/70 backdrop-blur-3xl rounded-t-md border-t border-x border-gray-200 dark:border-gray-700 px-4 py-2 relative z-20 ">


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


        <div class="grid grid-cols-1 md:grid-cols-2 items-start gap-4 md:border-t border-gray-300 dark:border-gray-700">
          <div class="flex flex-col justify-between h-full">
            <div class="flex items-center justify-start py-2">
              <img src="/images/vk-logo.webp" alt="vk-logo" class="w-5" />
              <a href="https://vk.com/glsvar" target="_blank" class="font-bold text-base mx-2">МЫ ВКОНТАКТЕ</a>
            </div>
            <div class="hidden md:block">
              <div class="flex items-center justify-start">
                <div class="grid grid-cols-1 gap-1">
                  <p class="text-xs">ООО "Техносвар КС"</p>
                  <span class="text-xs text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 flex items-end justify-center md:justify-start">© {{ currentData }} <p class="mx-1">Главный сварщик</p></span>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-0.5">
            <p class="text-center md:text-left text-[10px] md:text-xs py-2 select-none text-gray-600 dark:text-gray-400">
              Все цены и материаллы, указанные на сайте www.glsvar.ru, приведены как справочная информация и не являются публичной офертой и могут быть изменены в любое время без предупреждения. 
              Для получения подробной информации о стоимости, сроках и условиях поставки просьба обращаться по указанным на сайте телефонам<span @click="eventSend()" class="cursor-pointer">.</span>
            </p>
            <div class="">
              <ul class="flex justify-center md:justify-start gap-2 md:gap-4 text-xs md:text-sm sm:mt-0 md:order-last">
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
        </div>

        <div class="md:hidden mt-4">
          <div class="flex items-center justify-center">
            <p class="text-xs mr-1">ООО "Техносвар КС"</p>
            <span class="text-xs text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 flex items-end justify-center md:justify-start">© {{ currentData }} <p class="mx-1">Главный сварщик</p></span>
          </div>
        </div>

      </div>


      <div class="absolute bottom-0 right-0 z-10 bg-white dark:bg-gray-700 rounded-md">
        <div class="flex items-end justify-end h-full px-2 py-2">
          <div class="grid grid-cols-2 gap-x-6 gap-y-2">
            <div class="w-[120px] h-[60px] md:w-[240px] md:h-[120px] bg-yellow-500/50 rounded-full"></div>
            <div class="w-[120px] h-[60px] md:w-[240px] md:h-[120px] bg-blue-500 rounded-full"></div>
            <div class="w-[120px] h-[60px] md:w-[240px] md:h-[120px] bg-red-500/50 rounded-full"></div>
            <div class="w-[120px] h-[60px] md:w-[240px] md:h-[120px] bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>