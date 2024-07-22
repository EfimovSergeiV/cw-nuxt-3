<script setup>
  const config = useRuntimeConfig()

  const { data: cts, pending, error } = await useFetch(`${ config.public.baseURL }c/ct/`)

</script>



<template>
  <div class="container mx-auto py-2 px-4 max-w-6xl lg:px-8">
    <div class="">


      <p v-if="pending">Загрузка данных...</p>
      <div v-else-if="error">
        <div class="my-6 lg:my-10">
          <pre>Ошибка: Данные не получены </pre>
          <pre class="text-xs">{{ error.data }}</pre>
        </div>
      </div>


      <div v-else  class="">

        <div class="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 px-4">
          <div class="">
            <div class="">
              <div class="columns-1 md:columns-2 gap-4">
                
                <div v-for="ct in cts" :key="ct.id" class="break-inside-avoid-column py-2">
                  <div class="flex items-center px-2 py-4 gap-4 bg-gray-100 dark:bg-gray-700 border-t border-l border-r border-gray-200 dark:border-gray-600 rounded-t-md">
                    <div class="bg-white px-1 py-1 rounded-md">
                      <img :src="ct.image" class="h-14" />
                    </div>
                    <div class="">
                      <nuxt-link :to="{ name: 'prods', query: { ct: ct.id } }" class="text-base text-gray-700 dark:text-gray-300">{{ ct.name }}</nuxt-link>
                    </div>
                  </div>
                  <div class="columns-2 gap-x-2 gap-y-4 px-2 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-b-md shadow-md">
                    <div v-for="sct in ct.inserted" :key="sct.id" class="flex items-center gap-2 py-0.5">
                      <nuxt-link :to="{ name: 'prods', query: { ct: sct.id } }" class="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">{{ sct.name }}</nuxt-link>
                    </div>
                  </div>
                </div>


                <div class="py-2">
                  <div class="rounded-md flex items-center px-2 py-4 gap-4 bg-gray-100 dark:bg-gray-700 border-t border-l border-r border-gray-200 dark:border-gray-600 rounded-t-md">

                    <div class="">
                      <!-- <nuxt-link :to="{ 'name': 'ext-search' }" class="text-base text-gray-700 dark:text-gray-300 flex items-center gap-4">
                        <div class="mdi mdi-24px mdi-text-box-search-outline"></div>
                        <p class="">Расширенный поиск</p>
                      </nuxt-link> -->

                      <div class="flex items-center gap-4">
                        <div class="bg-white flex items-center justify-center px-1 py-1 w-[90px] h-[60px] rounded-md">
                          <img src="/icons/search.png" class="h-10" />
                        </div>
                        <div class="">
                          <nuxt-link :to="{ 'name': 'ext-search' }" class="text-base text-gray-700 dark:text-gray-300">Расширенный поиск</nuxt-link>
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

  </div>
</template>