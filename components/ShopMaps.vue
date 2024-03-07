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

  const selectedCity = ref(null)
  const selectedShop = ref(null)
  const cityShops = ref([])

  const getShops = (city) => {
    return shopStore.shops.filter(shop => shop.city === city)
  }

  const selectShop = (shop) => {
    selectedShop.value = shop
  }

</script>


<template>
  <div class="container mx-auto px-4 max-w-6xl lg:px-8">
    <div v-if="shopStore.shops.length > 0" class="">


      <!-- <div class="grid grid-cols-1 py-2">
        <div class=" columns-4 gap-x-6 pb-2">
          <div v-for="city, pk in uniqueCities(shopStore.shops)" :key="pk" class="break-inside-avoid-column my-2">
            <div class="flex items-center">
              <button @click="getShops(city)" class="group">
                <div class="flex items-center gap-1">
                  <div class="mdi mdi-city-variant group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-all duration-700"></div>
                  <p class="text-lg">{{ city }}</p>
                </div>
              </button>
            </div>
            <div class="mt-0.5 grid grid-cols-1 gap-1">
              <div v-for="shop in getShops(city)" :key="shop.id" class="">
                <button @click="selectShop(shop)" class="text-left">
                  <p class="text-sm"> {{ shop.adress.replace(`${city},`, '') }}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class=""></div>
      </div> -->


      <!-- <div class="overflow-x-auto w-full my-2">
        <div class="flex flex-nowrap gap-2 py-2">
          <div v-for="shop in shopStore.shops" :key="shop.id" class="">
            <div class="bg-gray-100 py-2 px-2 min-w-[300px] h-full rounded-md border border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 dark:bg-gray-700 transition-all shadow-md">
              
              <div class="">
                <p class="text-sm py-2">{{ shop.adress }}</p>
                <div class=" grid grid-cols-1 gap-2">
                  <div>
                    <p class="text-xs">тел. 8 (911) 123-4567</p>            
                  </div>
                  <div>
                    <div class="text-xs"><p class="">пн-пт: 8:00 - 17:00</p></div>
                    <div class="text-xs"><p class="">сб-вс: 8:00 - 17:00</p></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>      
      </div> -->

      <div class="grid grid-cols-1 py-2">
        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <div v-for="city, pk in uniqueCities(shopStore.shops)" :key="pk" class="break-inside-avoid-column">
            <div class="flex items-center">
              <button @click="selectedCity = city" class="group bg-gray-800 px-4 py-0.5 rounded-md border border-gray-700 hover:border-gray-600">
                <div class="flex items-center gap-1">
                  <div class="mdi mdi-city-variant"></div>
                  <p class="text-lg">{{ city }}</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div class="min-h-[5rem] mt-2">
          <transition name="fade" mode="out-in">
            <div v-if="selectedCity" class="">
              <transition-group name="list" tag="div" class="flex flex-wrap items-center gap-2">
                <div v-for="shop in getShops(selectedCity)" :key="shop.id" :id="shop.id" class="">
                  <button @click="selectShop(shop)" class="text-left bg-gray-800 px-4 py-0.5 rounded-md border border-gray-700 hover:border-gray-600">
                    <p class="text-base"> {{ shop.adress.replace(`${selectedCity},`, '') }}</p>
                    <p class="text-xs text-gray-400">тел. {{ shop.phone }}</p>
                    <p class="text-xs text-gray-400">{{ shop.wday }}</p>
                    <p class="text-xs text-gray-400">{{ shop.wend }}</p>
                  </button>
                </div>
              </transition-group>
            </div>
            <div v-else class="flex items-center justify-center h-full bg-gray-800 px-4 py-0.5 rounded-md border border-gray-700">
              <p class="text-sm text-gray-400">Выберите город</p>
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
            <img src="/mapshops.webp" class="rounded-md object-cover min-h-[350px]" />
            <div class="absolute inset-0 bg-black/50 hover:bg-black/60 transition-all duration-700 flex items-center justify-center rounded-md">
              <p class="text-center text-sm text-gray-100 ">Для отображения карты выберите магазин</p>
            </div>
          </div>

        </div>
      </div>



    </div>
  </div>
</template>