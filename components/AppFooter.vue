<script setup>
  const config = useRuntimeConfig()
  const notificationsStore = useNotificationsStore()
  
  const { data: brands } = await useFetch(`${ config.public.baseURL }c/brands/`)
  const { data: cts } = await useFetch(`${ config.public.baseURL }c/ct/`)

</script>


<template>
  <div class="container mx-auto px-4 max-w-6xl lg:px-8 pt-2">
    <div class="bg-gray-100 dark:bg-gray-800 rounded-t-md border-t border-x border-gray-200 dark:border-gray-700 px-4 py-2 relative">


      <div class="">
        <div class="">
            <div class="flex flex-wrap gap-4">
              <div v-for="ct in cts" :key="ct.id" class="">
                <p class="text-sm text-gray-700 dark:text-gray-300">{{ ct.name }}</p>
              </div>
            </div>
          </div>
      </div>


      <div class="md:flex md:justify-between items-end py-2">


        <div class="grid grid-cols-1">

          <div class="">
            <div class="flex items-center py-4">
              <img src="/images/vk-logo.webp" alt="vk-logo" class="w-5" />
              <a href="https://vk.com/glsvar" target="_blank" class="font-bold text-base mx-2">МЫ ВКОНТАКТЕ</a>
            </div> 
          </div>

          <div class="">
            <ul class="flex justify-start gap-8 text-xs md:text-sm mt-3 sm:mt-0 md:order-last py-2 ">
              <li>
                <button @click="notificationsStore.pushToast({id: 1, type: 'error', text:' Раздел временно не доступен'})" class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">Доставка</button>
              </li>
              
              <li>
                <button @click="notificationsStore.pushToast({id: 10, type: 'error', text:' Раздел временно не доступен'})" class=" text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100">Способы оплаты</button>
              </li>

              <li>
                <nuxt-link :to="{ name: 'policy'}" class=" text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 text-xs md:text-sm">Политика обработки данных</nuxt-link>
              </li>
            </ul>
          </div>

        </div>

        

        <div class="w-full h-full md:w-1/2 md:order-1">
          
          <p class="text-[10px] md:text-xs py-6 select-none text-gray-700 dark:text-gray-300">
            Все цены и материаллы, указанные на сайте www.glsvar.ru, приведены как справочная информация и не являются публичной офертой и могут быть изменены в любое время без предупреждения. 
            Для получения подробной информации о стоимости, сроках и условиях поставки просьба обращаться по указанным на сайте телефонам.
          </p>  

        </div>
      </div>


      <div class="">
        <div class="flex items-center justify-start">

          <span class="text-xs text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 flex items-end justify-center md:justify-start">© 2024 <p class="mx-1">Главный сварщик</p></span>

        </div>
      </div>

    </div>
  </div>
</template>