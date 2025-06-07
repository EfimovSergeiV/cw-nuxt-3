<script setup>
  const props = defineProps(['propstrmodel', 'prod_doc', 'prod_link', ])


</script>



<template>

  <div v-if="props.propstrmodel.length > 0" class="mx-auto px-4 max-w-6xl lg:px-8 py-2">
    <div class="relative">
      <div class="bg-white/70 rounded-md border dark:border-gray-700 dark:bg-gray-800/70 shadow-md px-2 py-4 relative z-20 backdrop-blur-3xl min-h-[260px]">

        <div class="grid grid-cols-1 gap-8">
          <div class="">
            <p class="text-lg uppercase italic font-semibold mb-2">Характеристики:</p>
            <div class="">
              <div class="">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <div v-for="param in props.propstrmodel" :key="param.id">
                    
                    <div class="flex items-center justify-between gap-x-10 gap-y-2 border-b border-gray-300 hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600">
                      <p class="text-sm">{{ param.name }}:</p>
                      <p class="text-sm">{{ param.value }}</p>
                    </div>
                      
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="props.prod_doc.length > 0 || props.prod_link.length > 0" class="flex flex-wrap gap-8 items-center">
            <p class="text-lg uppercase italic font-semibold">Документы:</p>
            <div class="">
              <div class="">
                <div class="flex flex-wrap gap-x-8 gap-y-2">

                  <div class="" v-for="file in props.prod_doc" :key="file.id">
                    <a class="text-sm" :href="file.doc" target="_blank">{{ file.name }}</a>
                  </div>
                  <div class="" v-for="doc in props.prod_link" :key="doc.id">
                    <a class="text-sm" :href="doc.url" target="_blank">{{ doc.name }}</a>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="absolute bottom-0 right-0 z-10 bg-white dark:bg-gray-700 rounded-md">
        <div class="flex items-end justify-end h-full px-2 py-2">
          <div class="grid grid-cols-2 gap-x-12 gap-y-2">
            <div class="w-[120px] h-[60px] bg-blue-500 rounded-full"></div>
            <div class="w-[120px] h-[60px] bg-blue-500 rounded-full"></div>
            <div class="w-[120px] h-[60px] bg-yellow-500/30 rounded-full"></div>
            <div class="w-[120px] h-[60px] bg-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>

    </div>





  </div>


</template>