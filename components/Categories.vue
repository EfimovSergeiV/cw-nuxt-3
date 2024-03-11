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

        <div class="bg-white rounded-md px-4">
          <div class="hidden md:block">
            <div class="">
                <div class="columns-1 md:columns-2 gap-4">
                  <div v-for="ct in cts" :key="ct.id" class="break-inside-avoid-column py-2">
                    
                    <div class="flex items-center px-2 py-4 gap-4 bg-white rounded-t-md">
                      <div class="">
                        <img :src="ct.image" class="h-14" />
                      </div>
                      <div class="">
                        <nuxt-link :to="{ name: 'prods', query: { ct: ct.id } }" class="text-base text-gray-700 dark:text-gray-700">{{ ct.name }}</nuxt-link>
                      </div>
                    </div>

                    <div class="columns-2 gap-x-2 gap-y-4 px-2 py-2 bg-white border-t border-gray-300 dark:border-gray-300 rounded-b-md">
                      <div v-for="sct in ct.inserted" :key="sct.id" class="flex items-center gap-2 py-0.5">
                        <nuxt-link :to="{ name: 'prods', query: { ct: ct.id } }" class="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-700">{{ sct.name }}</nuxt-link>
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