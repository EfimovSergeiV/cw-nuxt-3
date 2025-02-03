<script setup>
  const config = useRuntimeConfig()
  const route = useRoute()

  const { data: orderinfo, pending: pendingorder, error: errorder } = await useFetch(`${ config.public.baseURL }o/orderinfo/${ route.hash.slice(1,) }`)
  const { data: recommends } = await useFetch(`${ config.public.baseURL }c/recommend/`)
  
  // const sendRequest = async () => {
  //     if ( (clientStore.client.city) && (clientStore.client.contact) ) {
  //       const { data: response } = await useFetch(`${ config.public.baseURL }o/request-price/`, {
  //         method: 'POST',
  //         body: {
  //           city: clientStore.client.city,
  //           contact: clientStore.client.contact,
  //           product: `id: ${ productsStore.requestPrice.id } vc: ${ productsStore.requestPrice.vcode } name: ${ productsStore.requestPrice.name }`,
  //         }
          
  //       });

  //       notificationsStore.pushToast({ id: 1, type: 'success', text: 'Запрос на стоимость товара успешно отправлен!' })
  //       productsStore.clearRequestPrice()

  //       // order.value = await response.value
  //       // productsStore.clearCartProducts() 
  //       // clientStore.saveClientData(clientData)

  //         o/orderinfo/PSK1156363/

  //     } else {
  //       errorMsg.value = 'Для отправки запроса заполните все поля.'
  //     }
  //   }
</script>


<template>

  <div class="">
    <AppHeader />



    <div class="container mx-auto px-4 py-2 max-w-6xl lg:px-8">
      
      <div class="bg-white dark:bg-gray-800 rounded-md border dark:border-gray-700 px-4 py-4">
        <div v-if="orderinfo">

          <div class="">
            <p class="text-2xl text-blue-700 dark:text-white italic uppercase font-semibold">Мы получили ваш заказ, и свяжемся с вами в ближайшее время</p>
          </div>

          <div class="flex flex-wrap gap-x-12 gap-y-4 py-4">
            <p class="">Номер заказа: <span class="font-semibold ml-2 text-gray-700 dark:text-white">{{ orderinfo.order_number }}</span></p>
            <p class="">Статус: <span class="font-semibold ml-2 text-gray-700 dark:text-white" v-if="orderinfo.status === 'notprocessed'">В обработке</span><span class=" ml-2" v-else>Обработан</span></p>
            <p class="">Сумма по позициям: <span class="font-semibold ml-2 text-gray-700 dark:text-white">{{ orderinfo.position_total }}</span> руб.</p>
            <p class="" v-if="orderinfo.delivery_summ">Доставка: <span class="font-semibold ml-2 text-gray-700 dark:text-white">{{ orderinfo.delivery_summ }}</span></p>
            <p class="">Итог заказа: <span class="font-semibold ml-2 text-gray-700 dark:text-white">{{ orderinfo.total }}</span> руб.</p>            
          </div>

          
          <div class=" py-2">
            <p class="text-sm">Позиции заказа:</p>
            <div class="grid grid-cols-1 gap-2 py-4">

              <div v-for="product in orderinfo.client_product" :key="product.id" class="bg-white dark:bg-gray-700 px-2 py-2 border border-gray-200 dark:border-gray-700 rounded-md flex items-center gap-6">
                <img :src="product.preview_image" class="h-14 rounded-md bg-white px-2" />
                <p class="text-sm">{{ product.vcode }}</p>
                <nuxt-link :to="{ name: 'product-id', params: { id: product.product_id } }">{{ product.name }}</nuxt-link>
                <p>{{ product.price }} x {{ product.quantity }}</p>
              </div>
              
            </div>

            <!-- <div class="">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9607.746256144887!2d63.1143089!3d52.9855424!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43cd03eb0088f70d%3A0xfaaebd2d312ed8f7!2z0JPQu9Cw0LLQvdGL0Lkg0KHQstCw0YDRidC40Lo!5e0!3m2!1sru!2sru!4v1695649108350!5m2!1sru!2sru" width="100%" height="300" frameborder="0" loading="lazy" class="rounded-md"></iframe>
            </div> -->

          </div>

        </div>

        <div v-else>
          <p>Заказ не найден</p>
        </div>        
      </div>


    </div>

    <UserData />
    <Recommend :hide_recommend="true" />

    <AppFooter />


  </div>
</template>