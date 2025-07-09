<script setup>

  const props = defineProps(['description',])
  
  // const eccEvent = () => {
  //   const ecommerceData = {
  //     "event": "ecommerce",
  //     "ecommerce": {
  //       "currencyCode": "RUB",
  //       "detail": {
  //         "products": [
  //           {
  //             "id": "P15432",
  //             "name" : "Футболка",
  //             "price": 477.60,
  //             "brand": "Яндекс / Яndex",
  //             "category": "Одежда/Мужская одежда/Футболки",
  //             "variant" : "Красный цвет",
  //             "list": "Результаты поиска",
  //             "position": 1
  //           }
  //         ]
  //       }
  //     }
  //   }
  //   window.dataLayer.push(ecommerceData)
  // }


</script>

<template>
  <div v-if="props.description" class="mx-auto px-4 max-w-6xl lg:px-8 py-2" >
    <div class="relative">

      <div class="bg-white/70 rounded-md border dark:border-gray-700 dark:bg-gray-800/70 shadow-md px-2 py-4 backdrop-blur-3xl z-20 relative">
        <div class=" min-h-[240px]">
          <div class="min-h-[28px]">
            <p class="text-lg uppercase italic font-semibold mb-2">Описание:</p>
          </div>
          <div class="min-h-[212px] content-center">
            <div class=" description-style" v-html="props.description"></div>
          </div>
        </div>
      </div>

      <div class="absolute top-0 left-0 z-10 bg-white dark:bg-gray-700 rounded-md">
        <div class="flex items-end justify-end h-full px-2 py-2">
          <div class="grid grid-cols-2 gap-x-12 gap-y-2">
            <div class="w-[120px] h-[60px] bg-blue-500/50 rounded-full"></div>
            <div class="w-[120px] h-[60px] bg-blue-500/70 rounded-full"></div>
            <div class="w-[120px] h-[60px] bg-yellow-500/30 rounded-full"></div>
            <div class="w-[120px] h-[60px] bg-blue-500/80 rounded-full"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>