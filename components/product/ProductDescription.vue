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
    <div class="bg-white rounded-md border dark:border-gray-700 dark:bg-gray-800 shadow-md px-2 py-4">
      <p class="text-lg uppercase italic font-semibold mb-2">Описание:</p>
      <div class=" description-style" v-html="props.description"></div>       
    </div>
  </div>

</template>