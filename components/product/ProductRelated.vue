<script setup>
  const productsStore = useProductsStore()
  const props = defineProps(['related', 'category',])


</script>


<template>
  <div v-if="props.related && props.related.length > 0" class="mx-auto px-4 max-w-6xl lg:px-8 py-2">
    <div class="">
      <div class="bg-white rounded-md border dark:border-gray-700 dark:bg-gray-800 shadow-md p-2">
        <p class="text-lg uppercase italic font-semibold my-2">Сопутствующие товары</p>
        
        <div class=" py-1">
          <div class="w-full">
            <Swiper
              class=""
              :modules="[]"
              :slidesPerView="'auto'"
              :loop="true"
              :spaceBetween="10"
            >
            
              <SwiperSlide v-for="prod_related in props.related" :key="prod_related.id">
                <ProductSmall :product="prod_related" :category="props.category" />
              </SwiperSlide>

              <div class="lg:hidden absolute bottom-0 right-0 py-1 px-1 z-40">
                <SwiperControls class="bg-gray-100 rounded-full border border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 dark:bg-gray-700 transition-all duration-500 px-1" />
              </div>

            </Swiper>
          </div>
        </div>

      </div>
    </div>           
  </div>
  <!-- <div v-else class="py-2">нет связанных</div> -->
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