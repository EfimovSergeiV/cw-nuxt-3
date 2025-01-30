<script setup>
  const config = useRuntimeConfig()
  const props = defineProps(['keywords',])

  const extprods = ref(null)

  if (props.keywords) {

    const eprods = await $fetch(`${ config.public.baseURL }c/ext/search/match_phrase/`, {
      method: 'POST', body: {
        name: props.keywords,
        city: 'all',
        shop: 'all'
      }
    }).catch((error) => null)

    extprods.value = await eprods
  }

  const reFormatedDate = (str) => {
    const date = new Date(str)
    return `${date.toLocaleTimeString('ru-RU')} ${date.toLocaleDateString('ru-RU')}`
  }


</script>


<template>
  <div v-if="extprods && extprods.length > 0" class="text-gray-700 dark:text-gray-300">

    <div class="mx-auto px-4 max-w-6xl lg:px-8 py-2">
      <div class="bg-white rounded-md border dark:border-gray-700 dark:bg-gray-800 shadow-md px-2 py-2">

        <div class="flex items-center justify-between gap-4 ">
          <div class="flex items-center gap-2">
            <p class="text-lg uppercase italic font-semibold">Наличие в магазинах:</p>      
          </div>
          <div class="flex gap-0.5 items-center">
            <div class="px-1 text-right">
              <p class="text-xs">Последнее обновление</p>
              <p class="text-xs">{{ reFormatedDate(extprods[0].last_update) }}</p>
            </div>
            <div class="mdi mdi-help-circle text-blue-600 dark:text-gray-200" title="Уточняйте актуальную цену и наличие в магазинах"></div>
          </div>

        </div>


        <div class="hidden lg:block">
          <div class="flex flex-wrap gap-2 mt-2 py-2 ">
            <div v-for="prod in extprods" :key="prod.id" class="grid grid-cols-1 gap-1">
              
              <div :title="prod.name" class="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 text-xs px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600">
                <div class="grid grid-cols-1 gap-2">

                  <p class="text-xs text-right">{{ prod.shop.slice(0, 37) }}</p>

                  <div class="flex items-end justify-between gap-4">
                    <p class="text-sm uppercase italic font-semibold">{{ prod.city }}</p>
                    <div class="flex items-center gap-2">
                      <div class="flex items-center gap-1">
                        <p class="text-sm italic font-semibold">{{ prod.quantity }}</p>
                        <p class="text-xs italic">шт.</p>
                      </div>
                      <div class="flex items-center gap-1">
                        <p class="text-sm italic font-semibold">{{ prod.price }}</p>
                        <p class="text-xs italic">руб.</p>
                      </div>                    
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>          
        </div>


        <div class="w-full lg:hidden pt-4">
          <Swiper
            class=""
            :modules="[]"
            :slidesPerView="'auto'"
            :loop="true"
            :spaceBetween="10"
          >
          
            <SwiperSlide v-for="prod in extprods" :key="prod.id">
              <div :title="prod.name" class="bg-gray-100 dark:bg-gray-700 dark:text-gray-200 text-xs px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600">
                <div class="grid grid-cols-1 gap-2">

                  <p v-if="prod" class="text-xs text-right">{{ prod.shop.slice(0, 37) }}</p>

                  <div class="flex items-end justify-between gap-4">
                    <p class="text-sm uppercase italic font-semibold">{{ prod.city }}</p>
                    <div class="flex items-center gap-2">
                      <div class="flex items-center gap-1">
                        <p class="text-sm italic font-semibold">{{ prod.quantity }}</p>
                        <p class="text-xs italic">шт.</p>
                      </div>
                      <div class="flex items-center gap-1">
                        <p class="text-sm italic font-semibold">{{ prod.price }}</p>
                        <p class="text-xs italic">руб.</p>
                      </div>                    
                    </div>
                  </div>
                  
                  
                </div>
              </div>
            </SwiperSlide>

            <div class="lg:hidden absolute bottom-0 right-0 py-1 px-1 z-40">
              <SwiperControls class="bg-gray-100 rounded-full border border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 dark:bg-gray-700 transition-all duration-500 px-1" />
            </div>

          </Swiper>
        </div>



        <div class="flex items-center justify-end sm:mt-2 md:mt-0">
          <nuxt-link :to="{ name: 'ext-search' }" class="bg-[#005bfe] border border-blue-600/50 shadow-md shadow-black/20 rounded-full cursor-pointer">
            <div class="px-4 py-0.5">
              <p class="text-white italic text-base font-semibold">Искать в наличии</p>
            </div>
          </nuxt-link>
        </div>



      </div>
    </div>

    <!-- <p class="text-xs">{{ props.keywords }}</p>

    <div v-for="prod in extprods" :key="prod.id" class="flex gap-4 my-2">
      <p class="text-xs">{{ prod }}</p>
    </div> -->

  </div>
</template>


<style scoped>
  .swiper-slide {
    width: 260px;
  }
  .description-style ::v-deep(p) {
    margin-bottom: 15px;
  }
  .description-style ::v-deep(ul) {
      margin:8px 24px;
  }
  .description-style ::v-deep(li) {
    list-style-type: disc;
    padding-left:  4px;
    padding-top: 2px;
  }
  
</style>