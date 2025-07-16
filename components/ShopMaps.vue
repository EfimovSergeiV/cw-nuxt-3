<script setup>

  const config = useRuntimeConfig()
  const shopStore = useShopStore()
  const clientStore = useClientStore()

  const uCities = ref([ "Москва", "Санкт-Петербург", "Псков", "Смоленск", "Петрозаводск", "Великие Луки" ])
  const uniqueCities = (shops) => {
    let cities = []
    shops.forEach(shop => {
      if (!cities.includes(shop.city)) {
        cities.push(shop.city)
      }
    })
    return cities
  }

  // const selectedCity = ref(null)
  const selectedShop = ref(null)
  // const cityShops = ref([])

  const getShops = (city) => {
    return shopStore.shops.filter(shop => shop.city === city)
  }

  const selectShop = (shop) => {
    selectedShop.value = shop
  }

  watch(clientStore.client, () => {
    /// Проверяем есть ли clientStore.client.city в uCities
    if (uCities.value.includes(clientStore.client.city)) {
      shopStore.selectedCity = clientStore.client.city
    }
  })

</script>


<template>
  <div class="container mx-auto px-4 max-w-6xl lg:px-8 py-2">
    <div v-if="shopStore.shops.length > 0" class="">

      <div class="grid grid-cols-1">
        <div class="flex flex-wrap lg:grid grid-cols-6 gap-x-2 gap-y-2">
          <div v-for="city, pk in uniqueCities(shopStore.shops)" :key="pk" class="break-inside-avoid-column">
            
            <div v-if="shopStore.selectedCity === city">
              <button class="w-full bg-gray-100 dark:bg-gray-700 px-4 py-0 rounded-md border border-gray-200 dark:border-gray-600 hover:border-gray-200 dark:hover:border-gray-600">
                <div class="flex items-center justify-center py-1">
                  <div class="flex items-center gap-0.5">
                    <div class="mdi mdi-map-marker"></div>
                    <p class="text-sm"> {{ city }}</p>
                  </div>
                </div>
              </button>
            </div>
            <div v-else>
              <button @click="shopStore.selectedCity = city" class="w-full bg-white dark:bg-gray-800 px-4 py-0 rounded-md border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600">
                <div class="flex items-center justify-center py-1">
                  <div class="flex items-center gap-0.5">
                    <div class="mdi mdi-map-marker"></div>
                    <p class="text-sm">{{ city }}</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div class="min-h-[7rem] py-2">
          <transition name="fade" mode="out-in">
            <div v-if="shopStore.selectedCity" class="bg-white dark:bg-gray-800 px-4 py-2 rounded-md border border-gray-100 dark:border-gray-700">
              <transition-group name="long-fade" tag="div" class="flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
                <div v-for="shop in getShops(shopStore.selectedCity)" :key="shop.id" :id="shop.id" class="">
                  <button @click="selectShop(shop)" class="group text-left text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-all duration-700">
                    <p class="text-sm "> {{ shop.adress.replace(`${shopStore.selectedCity},`, '') }}</p>
                    
                    <div class="text-gray-600 group-hover:text-gray-800 dark:text-gray-400 group-hover:dark:text-gray-300 transition-all duration-700">
                      <div class="flex gap-1">
                        <a :href="`tel:${shop.phone.replace('(', '').replace(')', '').replace(/ /ig, '')}`" class="text-xs">тел. {{ shop.phone }}</a>
                        <a v-if="shop.mobile" :href="`tel:${shop.mobile.replace('(', '').replace(')', '').replace(/ /ig, '')}`" class="text-xs">/ {{ shop.mobile }}</a>
                      </div>

                      <p class="text-xs">{{ shop.wday }}</p>
                      <p class="text-xs">{{ shop.wend }}</p>                      
                    </div>

                  </button>
                </div>
              </transition-group>
            </div>
            <div v-else class="flex items-center justify-center h-full bg-white dark:bg-gray-800 px-4 py-0.5 rounded-md border border-gray-100 dark:border-gray-700">
              <p class="text-sm text-gray-500 dark:text-gray-400">Выберите город</p>
            </div>
          </transition>
        </div>
      </div>


      <div class="bg-white rounded-md border dark:border-gray-700 dark:bg-gray-800 shadow-md">
        <div class="relative min-h-[350px]">
          
          <div v-if="selectedShop" class="">
            <iframe :src="selectedShop.google_maps" width="100%" height="350" frameborder="0" loading="lazy" class="rounded-md"></iframe>
          </div>

          <div v-else class="relative rounded-md">
            <img src="/mapshops.webp" alt="maps-template" class="rounded-md object-cover min-h-[350px]" />
            <div class="absolute inset-0 bg-white/50 hover:bg-white/60 dark:bg-black/50 dark:hover:bg-black/60 transition-all duration-700 flex items-center justify-center rounded-md">
              <p class="text-center text-sm text-gray-700 dark:text-gray-100">Для отображения карты выберите магазин</p>
            </div>
          </div>

        </div>
      </div>



    </div>
  </div>
</template>