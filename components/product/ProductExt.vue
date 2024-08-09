<script setup>
  const config = useRuntimeConfig()
  const productsStore = useProductsStore()
  const shopStore = useShopStore()
  const props = defineProps(['keywords',])


  const extprods = ref(null)

  
  if (props.keywords) {

    const eprods = await $fetch(`${ config.public.baseURL }c/ext/search/`, {
      method: 'POST', body: {
        name: props.keywords,
        city: 'all',
        shop: 'all'
      }
    }).catch((error) => error.data)

    extprods.value = await eprods
  }

  // Сопостовляем города магазинам
  const selCity = ref(
    { "city": "Псков", "shops": [1, 2, 3, ] },
  )
  
  const cities = [
    { "city": "Псков", "shops": [1, 2, 3, ] },
    { "city": "Великие Луки", "shops": [4, ] },
    { "city": "Смоленск", "shops": [5, ] },
    { "city": "Петрозаводск", "shops": [6, ] },
  ]

  const shops = {
    '1': 'ул.Леона Поземского, 92, Павильон 28 (рынок на Алмазной)',
    '2': 'ул.Шоссейная д.3а',
    '3': 'пос. Неёлово, ул.Юбилейная д. 5ж',
    '4': 'проспект Ленина д.57',
    '5': 'ул. Посёлок Тихвинка 69, ТК "Город Мастеров" павильон №73',
    '6': 'ул. Заводская, д. 2'
  }



  const shopSelected = ref(0)
  

  const showProds = ref(null)
  
  const filterProdShop = (shop_id) => {
    showProds.value = []
    showProds.value = extprods.value.filter(prod => prod.shop_id === shop_id)
  }

</script>


<template>
  <div class="">

    <div v-if="extprods" class="mx-auto px-4 max-w-6xl lg:px-8 py-2">
      <div class="bg-white rounded-md border dark:border-gray-700 dark:bg-gray-800 shadow-md px-2 py-2">

        <div class="flex items-center gap-4 my-2">
          <div class="flex items-center gap-2">
            <p class="text-lg uppercase italic font-semibold">В наличии:</p>
            <p class="text-lg upperc ase italic font-semibold">{{ selCity.city }}</p>            
          </div>

          <div class="flex items-center gap-2">
            <div v-for="city in cities" class="">
              <button v-if="city.city !== selCity.city" @click="selCity = city" class="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 text-xs px-8 py-1 rounded-md">{{ city.city }}</button>
            </div>            
          </div>

        </div>


        <div class="flex items-center gap-2">
          
          <transition-group name="list" tag="div" class="flex gap-4">
            <div v-for="shop, pk in selCity.shops" :key="shop" :id="pk" class="">
              <button @click="filterProdShop(shop)" class="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 text-xs px-8 py-1 rounded-md">{{ shops[shop] }}</button>
            </div>
          </transition-group>

        </div>



        
        <transition name="fade" mode="out-in" class="py-4">
          
          <div v-if="showProds" class="text-xs">

            <transition-group name="list" tag="div" class="flex gap-2 flex-wrap">
              <div v-for="prod in showProds" :key="prod.id" :id="prod.id" class="text-xs">
                <div v-if="showProds.length > 1">
                  <div class="border border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 bg-gray-100 dark:bg-gray-700 rounded-md py-1 px-4 transition-all">
                    <div class="flex flex-wrap gap-x-2 gap-y-2">
                      <div class="grid grid-cols-1 gap-2">
                        <p class="">{{ prod.name }}</p>
                        <div class="flex gap-4">

                          <p class="">в наличии: {{ prod.quantity }}</p>
                          <p class=""> {{ prod.price }} руб.</p>
                        
                        </div>
                      </div>
                    </div>
                  </div>                
                </div>
              </div>
            </transition-group>

          </div>

          <div v-else>
            <div class="flex items-center justify-center">
              <p class="text-base">нет товаров</p>
            </div>
          </div>

        </transition>



      </div>
    </div>

    <!-- <p class="text-xs">{{ shopStore.shops }}</p> -->
    <p class="text-xs">{{ props.keywords }}</p>
    <p class="text-xs">{{ extprods }}</p>

  </div>
</template>