<script setup>
  const ctx = useNuxtApp()
  const props = defineProps(['product'])
  const productsStore = useProductsStore()
  const notificationsStore = useNotificationsStore()


  const ymEvent = (product) => {
    if (process.client && product) {
      ctx.$metrika.reachGoal('PRODUCT_IN_CART')
    }
  }

  const cartEvent = (product) => {
    let ecommerceData = null

    console.log('BigBtn: ', product)

    if (product) {
      ecommerceData = {
        "event": "ecommerce",
        "ecommerce": {
        "currencyCode": "RUB",    
        "add": {
          "products": [
              {
                "id": props.product.id,
                "name" : props.product.name,
                "price": props.product.only_price,
                "brand": props.product.brand.brand,
                "category": props.product.category.name,
                "quantity": 1,
              }
            ]
          }
        }
      }
    } else {
      ecommerceData = {
        "event": "ecommerce",
        "ecommerce": {
        "currencyCode": "RUB",    
        "remove": {
          "products": [
              {
                "id": props.product.id,
                "name" : props.product.name,
                "price": props.product.only_price,
                "brand": props.product.brand.brand,
                "category": props.product.category.name,
                "quantity": 1,
              }
            ]
          }
        }
      }
    }

    window.dataLayer.push(ecommerceData)
  }

</script>



<template>
  <div class="">

    <button @click="
              productsStore.addProduct('cart', props.product); 
              ymEvent(productsStore.productInCart(props.product.id)); 
              cartEvent(productsStore.productInCart(props.product.id))"
            class="">
      <div class=" text-sm text-gray-100 rounded-lg bg-blue-600 hover:bg-blue-700 border border-gray-300/50 dark:border-gray-500/50 transition-all duration-1000">
        <div class="bg-gradient-to-br from-gray-100/20 to-gray-900/40 rounded-lg">
          <transition name="fade" mode="out-in">
            <p v-if="productsStore.productInCart(props.product.id)" class="text-white text-base w-32 md:w-52 py-2.5">В корзине</p>
            <p v-else class="text-white text-base w-32 md:w-52 py-2.5">Купить</p>
          </transition>
        </div>
      </div>
    </button>

  </div>
</template>