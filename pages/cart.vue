<script setup>
  const productsStore = useProductsStore()

  useHead({
    titleTemplate: '%s - Ваша корзина'
  })

  const config = useRuntimeConfig()
  // const { data: shops } = await useFetch(`${ config.public.baseURL }c/shops/`)



</script>

<template>
  <div class="">
    <AppHeader />

    <div v-if="(productsStore.cart.length === 0) && (productsStore.simpleCart.length === 0)">
      <UserData />
    </div>
    
    <CartForm />

    <AppFooter />
  </div>
</template>