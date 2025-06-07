<script setup>
  const productsStore = useProductsStore()
  const props = defineProps(['product', 'category'])


  /// Ecommerce

  const clickProduct = () => {
    const ecommerceData = {
      "event": "ecommerce",
      "ecommerce": {
        "currencyCode": "RUB",
        "click": {
          "products": [
            {
              "id": props.product.id,
              "name" : props.product.name,
              "price": props.product.only_price,
              "brand": props.product.brand.brand,
              "category": props.category,
            }
          ]
        }
      }
    }
    window.dataLayer.push(ecommerceData)
  }

</script>

<template>

  <div class="relative">

    <div class="z-20 relative">
      <div class="bg-white/70 dark:bg-gray-800/70 border backdrop-blur-3xl border-gray-200 hover:border-gray-300 dark:border-gray-700 hover:dark:border-gray-700 transition-all rounded-md px-2">
        <div class="py-2">
          <p class="pb-1 text-xs font-semibold">{{ props.product.vcode }}</p>

          <nuxt-link @click="clickProduct()" :to="{ name: 'product-id', params: { id: props.product.id } }">
            <div class="flex md:grid md:grid-cols-1 gap-4">
              <div class="bg-white rounded-md flex items-center justify-center min-h-[6rem] md:min-h-[10rem]">
                <div class="w-28 md:w-48 p-1">
                  <img :src="props.product.preview_image" :alt="props.product.name" class="rounded-md w-28 md:w-48"/>
                </div>          
              </div>
              <div class="flex items-center md:justify-center md:min-h-[80px]">
                <p class="text-xs xl:text-sm md:text-center">{{ props.product.name.slice(0, 120) }}</p>
              </div>
            </div>
          </nuxt-link>

          <div class="border-t border-gray-200 dark:border-gray-700 flex items-center justify-between my-2 md:min-h-[50px]">
            <div class="flex items-center">
              <div v-for="i in Math.ceil(props.product.rating)" :key="i" class="">
                <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
              <div v-for="i in 5 - Math.ceil(props.product.rating)" :key="i" class="">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              </div>
            </div>

            <div class="">
              <div v-if="props.product.only_price" class="flex gap-1 items-start">
                <p class="text-base text-right font-semibold text-gray-900 dark:text-gray-200">{{ props.product.only_price.toLocaleString() }}</p>
                <p class="text-base">руб.</p>
              </div>
              <p v-else  class="text-xs text-right font-medium text-gray-900 dark:text-gray-200">стоимость по запросу</p>

              <p v-if="props.product.status === 'stock'" class="text-xs text-right font-medium text-gray-900 dark:text-gray-200">в наличии</p>
              <p v-if="props.product.status === 'order'" class="text-xs text-right font-medium text-gray-900 dark:text-gray-200">под заказ</p>
            </div>
          </div>

          <div class="flex items-end justify-between gap-2">
            <div class="sm:flex md:grid grid-cols-1 gap-2">
              <div class="flex items-center gap-2">
                <CompBtn cls="px-3 py-1.5" :product="props.product" />
                <p class="text-xs">Сравнить</p>
              </div>
              <div class="flex items-center gap-2">
                <LikeBtn cls="px-3 py-1.5" :product="props.product" />
                <p class="text-xs">В избранное</p>
              </div>
            </div>
            <div class="flex gap-4 items-end justify-end">
              <CartBtnSmall v-if="props.product.only_price" :product="props.product" :category="props.category" />
              <button v-else @click="productsStore.addRequestPrice(props.product)" class="">
                <div class=" text-sm text-gray-100 rounded-lg bg-blue-600 hover:bg-blue-700 border border-gray-300/50 dark:border-gray-500/50 transition-all duration-1000">
                  <div class=" bg-gradient-to-br from-gray-100/20 to-gray-900/40 rounded-lg">
                    <p class="text-white text-sm w-36 md:w-24 py-1.5">Запросить</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="absolute bottom-0 right-0 z-10 bg-white dark:bg-gray-700 rounded-md">
      <div class="flex items-end justify-end h-full px-2 py-2">
        <div class="grid grid-cols-2 gap-6">
          <div class="w-[80px] h-[80px] bg-yellow-500 rounded-full"></div>
          <div class="w-[80px] h-[80px] bg-fuchsia-500/0 rounded-full"></div>
          <div class="w-[80px] h-[80px] bg-red-500 rounded-full"></div>
          <div class="w-[80px] h-[80px] bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>

  </div>
</template>