<script setup>
  const config = useRuntimeConfig()
  // const colorMode = useColorMode()
  // const route = useRoute()

  const { data: widebanner } = await useFetch(`${ config.public.baseURL }c/widebanners/`)
  const { data: banners } = await useFetch(`${ config.public.baseURL }c/mainbanner/`)
  const { data: brands } = await useFetch(`${ config.public.baseURL }c/brands/`)
  const { data: esab } = await useFetch(`${ config.public.baseURL }c/prods/?brnd=3`)
  const { data: latest } = await useFetch(`${ config.public.baseURL }c/neues/`)
  const { data: mpromobs } = await useFetch(`${ config.public.baseURL }c/mpromob/`)
  const { data: recommends } = await useFetch(`${ config.public.baseURL }c/recommend/`)
  const { data: randomreviews } = await useFetch(`${ config.public.baseURL }c/random-reviews/`)
  
  // const { data: crags } = await useFetch(`${ config.public.baseURL }c/prods/?ct=109`)
  

  const descriptionData = 'С 2009 года Главный сварщик – ваш надежный партнер в мире сварочного оборудования! Наши магазины – это место, где профессионалы и энтузиасты приходят за лучшими решениями для сварочных работ. Сварка - это искусство, и мы знаем, как сделать его доступным и эффективным для каждого.'
  
  useSeoMeta({
    title: `Интернет магазин Главный Сварщик - сварочное оборудование и расходные материалы купить онлайн`,
    description: `${ descriptionData }`,
    keywords: `Главный сварщик, сварочное оборудование, оборудование для сварки, купить электроды, купить проволоку, купить источник, купить сварочный инвертор`,
    ogLocale: 'ru_RU',
    ogTitle: `Интернет магазин Главный Сварщик`,
    ogDescription: `${ descriptionData }`,
    ogImage: `/og-image.png`,
    twitterCard: `/og-image.png`,
  })

</script>

<template>

  <div class="">

    <AppHeader />
    <MainSection :latest="latest" :banners="banners" />
    <MainWelder />    
    <UserData />
    <ESAB />
    <Recommend :recommends="recommends" />
    <CorouselBrands />
    <ShopMaps />
    <AppFooter />
    
  </div>
</template>