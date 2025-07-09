<script setup>
  const props = defineProps(['propstrmodel', 'prod_doc', 'prod_link', ])


</script>



<template>

  <div v-if="props.propstrmodel.length > 0" class="mx-auto px-4 max-w-6xl lg:px-8 py-2">
    <div class="relative">
      
      <div class="bg-white/70 rounded-md border dark:border-gray-700 dark:bg-gray-800/70 shadow-md px-2 py-4 relative z-20 backdrop-blur-3xl ">
        <div class="min-h-[260px] ">
          <div class="min-h-[28px]">
            <p class="text-lg uppercase italic font-semibold mb-2">Характеристики:</p>
          </div>
          <div class="min-h-[232px] content-center">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 py-2">
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

      <div class="absolute bottom-0 right-0 z-10 bg-white dark:bg-gray-700 rounded-md">
        <div class="flex items-end justify-end h-full px-2 py-2">
          <div class="grid grid-cols-2 gap-x-12 gap-y-2">
            <div class="w-[180px] h-[60px] bg-blue-500/70 rounded-full"></div>
            <div class="w-[180px] h-[60px] bg-blue-500/50 rounded-full"></div>
            <div class="w-[180px] h-[60px] bg-blue-500/0 rounded-full"></div>
            <div class="w-[180px] h-[60px] bg-blue-500/20 rounded-full"></div>
          </div>
        </div>
      </div>

    </div>





  </div>


</template>