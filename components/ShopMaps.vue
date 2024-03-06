<script setup>

  const config = useRuntimeConfig()
  const shopStore = useShopStore()

  /// Получаем список городов в которых есть магазины
  // const uniqueCities = ref([])
  // watch(() => shopStore.shops, (shops) => {
  //   if (shops.length > 0) {
  //     shops.forEach(shop => {
  //       if (!uniqueCities.value.includes(shop.city)) {
  //         uniqueCities.value.push(shop.city)
  //       }
  //     })
  //   }
  // })

  const uniqueCities = (shops) => {
    let cities = []
    shops.forEach(shop => {
      if (!cities.includes(shop.city)) {
        cities.push(shop.city)
      }
    })
    return cities
  }


  /// Получаем список магазинов
  const selectedCity = ref('')
  const cityShops = ref([])
  const getShops = (city) => {
    selectedCity.value = city
    cityShops.value = shopStore.shops.filter(shop => shop.city === city)
  }

</script>


<template>
  <div v-if="shopStore.shops.length > 0" class="mx-auto px-4 max-w-6xl lg:px-8 py-2">


    <div class="grid grid-cols-1 ">
      <div class="flex flex-wrap gap-x-4 gap-y-2 pb-2">
        <div v-for="city, pk in uniqueCities(shopStore.shops)" :key="pk" class="flex items-center justify-between">
          <div class="flex items-center">
            <button @click="getShops(city)" class="group">
              <div class="flex items-center gap-1">
                <div class="mdi mdi-map-marker-radius group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-all duration-700"></div>
                <p class="">{{ city }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div class=""></div>

    </div>


    <div class="flex gap-14">
      <div v-for="i in 3" :key="i" class="">
        <p class="text-sm">Москва, Ткацкая улица 5 , с16</p>
        <div class=" flex gap-4 py-2">

          <div>
            <div class="text-xs"><p class="">пн-пт: 8:00 - 17:00</p></div>
            <div class="text-xs"><p class="">сб-вс: 8:00 - 17:00</p></div>            
          </div>
          <div>
            <p class="text-xs">тел. 8 (911) 123-4567</p>            
          </div>

        </div>
      </div>
    </div>


    <div class="bg-white rounded-md border dark:border-gray-700 dark:bg-gray-800 shadow-md">
      <div class="relative min-h-[350px]">

        
        <div v-if="cityShops.length > 0" class="">
          <iframe :src="cityShops[0].google_maps" width="100%" height="350" frameborder="0" loading="lazy" class="rounded-md"></iframe>
        </div>

        <div v-else class="relative rounded-md">
          <img src="/mapshops.webp" class="rounded-md object-cover min-h-[350px]" />
          <div class="absolute inset-0 bg-black/50 hover:bg-black/60 transition-all duration-700 flex items-center justify-center rounded-md">
            <p class="text-center text-sm text-gray-100 ">Для отображения карты выберите магазин</p>
          </div>
        </div>


      </div>
    </div>

  </div>
</template>