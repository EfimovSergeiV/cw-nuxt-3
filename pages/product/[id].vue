<script setup>
  const gtag = useGtag()
  const ctx = useNuxtApp()
  const config = useRuntimeConfig()
  const route = useRoute()
  const tmp_id = useCookie('tmp_id')

  const { data: product } = await useFetch(`${ config.public.baseURL }c/prod/${route.params.id}`)

  
  if ( product.value === null ) {
    product.value = {
      id: null,
      name: 'Товар не найден',
      description: 'Товар не найден',
      preview_image: 'https://glsvar.ru/img/404.jpg',
      vcode: '000000',
      rating: 0,
      brand: {
        brand: 'noname'
      },
      category: {
        id: 8
      },
      related: []
    }
  }

  if ( product.value.id ) {
    await useFetch(`${ config.public.baseURL }u/uwatch/`, {
      method: 'POST',
      headers: { "Authorization": tmp_id.value, },
      body: { "viewed": product.value.id }
    })    
  }

  const price = ref('0')
  const brand = ref('noname')

  if ( product.value.only_price ) {
    price.value = `${ product.value.only_price }00`
  }

  if ( product.value.brand ) {
    brand.value = product.value.brand.brand
  }


  if ( product.value.id ) {
    
    useHead({
      script: [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
          "type": "application/ld+json",
          "textContent": {
              "@context": "https://schema.org",
              "@type": "Product",
              "id": product.value.id,
              "name": product.value.name,
              "image": product.value.preview_image,
              "description": product.value.description,
              "mpn": product.value.vcode,
              "brand": {
                "@type": 'Brand',
                "name": brand.value,
              },
              "aggregateRating": {
                '@type': 'AggregateRating',
                "ratingValue": product.value.rating,
                "reviewCount": '0',
              },
              "offers": {
                '@type': 'Offer',
                "url": 'https://glsvar.ru/product/' + product.value.id,
                "priceCurrency": 'RUB',
                "lowPrice": price.value,
                "itemCondition": 'https://schema.org/UsedCondition',
                "availability": 'https://schema.org/InStock',
              },
            }
        })
      }],
    })    
  }


  const status = ref('')

  if ( product.value.status === 'stock' ) {
    status.value = '- купить онлайн в Главный Сварщик'
  } else if ( product.value.status === 'order' ) {
    status.value = '- заказать онлайн в Главный Сварщик'
  } else if ( product.value.status === 'preorder' ) {
    status.value = ''
  }

  useSeoMeta({
    title: `${ product.value.name } ${status.value}`,
    description: `${ product.value.description }`,
    keywords: `${ product.value.name }, Главный Сварщик - сварочное оборудование, оборудование для сварки, купить электроды, купить проволоку, купить источник, купить сварочный инвертор`,
    ogLocale: 'ru_RU',
    ogTitle: `${ product.value.name }`,
    ogDescription: `${ product.value.description }`,
    ogImage: `${ product.value.preview_image }`,
    twitterCard: `${ product.value.preview_image }`,
  })


  /// Ecommerce

  onMounted(() => {
    const ecommerceData = {
      "event": "ecommerce",
      "ecommerce": {
        "currencyCode": "RUB",
        "detail": {
          "products": [
            {
              "id": product.value.id,
              "name" : product.value.name,
              "price": price.value,
              "brand": brand.value,
              "category": product.value.category.name,
            }
          ]
        }
      }
    }
    window.dataLayer.push(ecommerceData)
  })


  
  const { data: analogue } =  await useFetch(`${ config.public.baseURL }c/anlgs/?ct=${ product.value.category.id }`)
  const { data: related } =  await useFetch(`${ config.public.baseURL }c/rel/`, { query: { "ct": product.value.related }})
  const { data: breadcrumbs } = await useFetch(`${ config.public.baseURL }c/breadcrumb/?ct=${ product.value.category.id }`)
  const { data: recommends } = await useFetch(`${ config.public.baseURL }c/recommend/`)  
  

</script>


<template>
  <div class="">

    <AppHeader />

    <div v-if="product.id" class="">
      
      <BreadCrumbs :breadcrumbs="breadcrumbs" />
      <ProductDetail :product="product" :analogue="analogue" :category="product.category.name" />
      <!-- <ProductExt  :keywords="product.keywords" /> -->
      <ProductParams :propstrmodel="product.propstrmodel" :prod_doc="product.prod_doc" :prod_link="product.prod_link" />
      <ProductRelated :related="related" :category="`Сопутствующие ${product.category.name.toLowerCase()}`" />
      <ProductDescription :description="product.description" />

    </div>

    <div v-else class="mx-auto px-4 max-w-6xl lg:px-8 py-2">
      <div class="bg-white rounded-md border dark:border-gray-700 dark:bg-gray-800 py-20">
        <div class="flex items-center justify-center">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-200">Товар не найден</h1>
            <p class="text-lg text-gray-600 dark:text-gray-400">Попробуйте вернуться на <nuxt-link to="/" class="text-blue-500 hover:underline">главную страницу</nuxt-link></p>
          </div>        
        </div>
      </div>



    </div>


    <Recommend :recommends="recommends" />
    <AppFooter />
    
  </div>
</template>