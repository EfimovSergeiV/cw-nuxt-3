<script setup>
  const config = useRuntimeConfig()
  const shopStore = useShopStore()
  const clientStore = useClientStore()
  const { data: shops } = await useFetch(`${ config.public.baseURL }c/shops/`)
  const images = [
    { "id": 1, "url": "/shops/1.webp"},
    { "id": 2, "url": "/shops/2.webp"},
    { "id": 3, "url": "/shops/3.webp"},
    { "id": 4, "url": "/shops/4.webp"},
    { "id": 5, "url": "/shops/5.webp"},
    { "id": 6, "url": "/shops/6.webp"},
  ]

  const activeCert = ref(null)
  const descriptionData = 'С 2009 года Главный сварщик – ваш надежный партнер в мире сварочного оборудования! '

  useSeoMeta({
    title: `Интернет магазин Главный Сварщик - О нас - Адреса магазинов`,
    description: `${ descriptionData }`,
    keywords: `Главный сварщик, сварочное оборудование, оборудование для сварки, купить электроды, купить проволоку, купить источник, купить сварочный инвертор`,
    ogLocale: 'ru_RU',
    ogTitle: `Интернет магазин Главный Сварщик`,
    ogDescription: `${ descriptionData }`,
    ogImage: `/og-image.png`,
    twitterCard: `/og-image.png`,
  })

  const uniqueCities = (shops) => {
    let cities = []
    shops.forEach(shop => {
      if (!cities.includes(shop.city)) {
        cities.push(shop.city)
      }
    })
    return cities
  }


  /// Получаем список магазинов
  const selectedCity = ref('')
  const cityShops = ref([])
  const getShops = (city) => {
    selectedCity.value = city
    cityShops.value = shopStore.shops.filter(shop => shop.city === city)
  }

</script>

<template>
  <div class="">
    <AppHeader />

    <div class="container mx-auto px-4 max-w-6xl lg:px-8 min-h-[40rem]">

      <div class="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 mt-4 mb-2">
        <div class="">
          <img src="/bnr/banner_image-1.webp" class=" rounded-t-md" />
        </div>

        <div class="px-4">
          <div class="">
            <blockquote class="text-xs md:text-2xl font-semibold italic text-center text-gray-700 dark:text-gray-300">
          
              <span class="text-base md:text-2xl px-4">ЕСЛИ НУЖНО</span>
              <span class="before:block before:absolute before:-inset-2 before:-skew-y-3 before:bg-blue-600 relative inline-block my-4 lg:my-2">
                <span class="text-base md:text-2xl relative text-white"> СВАРОЧНОЕ ОБОРУДОВАНИЕ </span>
              </span>
              <span class="text-base md:text-2xl px-4">,ЗАКАЗЫВАЙТЕ ОНЛАЙН </span>
              <p class="text-base md:text-2xl mt-1">НА GLSVAR.RU!</p>
              
            </blockquote>



            <div class="md:-mt-4">
              <div class="">
                <div class="flex flex-col items-center justify-center py-2">

                  <div class="mt-4">
                    <h1 class="text-xl text-center">{{ descriptionData }}</h1>  
                  </div>
                  <div class="py-4 max-w-4xl">
                    <h2 class="text-base text-gray-600 dark:text-gray-400 text-center">
                      Наши магазины – это место, где профессионалы и энтузиасты приходят за лучшими решениями для сварочных работ. Сварка - это искусство, и мы знаем, как сделать его доступным и эффективным для каждого.
                    </h2>
                  </div>

                </div>
      
              </div>
            </div>


            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
              <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-1 py-1 rounded-md border border-white/20 shadow-md shadow-black/50">
                <img src="/bnr/arbeitsschutz-schweissen.webp" class=" rounded-full w-24 border border-white/20"/>
                <nuxt-link :to="{ name: 'prods', query: { ct: 108 }}" class="">
                  <p class="">Средства защиты головы, рук и лица</p>
                </nuxt-link>
              </div>
              <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-1 py-1 rounded-md border border-white/20 shadow-md shadow-black/50">
                <img src="/bnr/autogentechnik.webp" class=" rounded-full w-24 border border-white/20"/>
                <nuxt-link :to="{ name: 'prods', query: { ct: 3 }}" class="">
                  <p class="">Принадлежности для газокислородной сварки</p>
                </nuxt-link>
              </div>
              <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-1 py-1 rounded-md border border-white/20 shadow-md shadow-black/50">
                <img src="/bnr/Kreise-SH-hell4.webp" class=" rounded-full w-24 border border-white/20"/>
                <nuxt-link :to="{ name: 'prods', query: { ct: 1 }}" class="">
                  <p class="">Современные сварочные аппараты на дуговой сварке</p>
                </nuxt-link>
              </div>
              <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-1 py-1 rounded-md border border-white/20 shadow-md shadow-black/50">
                <img src="/bnr/schweissbrenner.webp" class=" rounded-full w-24 border border-white/20"/>
                <nuxt-link :to="{ name: 'prods', query: { ct: 2 }}" class="">
                  <p class="">Сварочные горелки и их изнашиваемые детали</p>
                </nuxt-link>
              </div>
              <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-1 py-1 rounded-md border border-white/20 shadow-md shadow-black/50">
                <img src="/bnr/schweisszusatzwerkstoffe.webp" class=" rounded-full w-24 border border-white/20"/>
                <nuxt-link :to="{ name: 'prods', query: { ct: 4 }}" class="">
                  <p class="">Сварочные электроды, проволока и присадочные материалы</p>
                </nuxt-link>
              </div>
              <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-1 py-1 rounded-md border border-white/20 shadow-md shadow-black/50">
                <img src="/bnr/oberflaechenbearbeitung.webp" class=" rounded-full w-24 border border-white/20"/>
                <nuxt-link :to="{ name: 'prods', query: { ct: 5 }}" class="">
                  <p class="">Инструменты и химия для очистки поверхности</p>
                </nuxt-link>
              </div>          
              <div class="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-1 py-1 rounded-md border border-white/20 shadow-md shadow-black/50">
                <img src="/bnr/schweisszubehoer.webp" class=" rounded-full w-24 border border-white/20"/>
                <nuxt-link :to="{ name: 'cts' }" class="">
                  <p class="">Другие принадлежности для ваших сварочных работ</p>
                </nuxt-link>
              </div>              
            </div>


            <div class="py-4">
              <p class="text-xl py-2">Наши сертификаты</p>
              <p class="text-base text-gray-600 dark:text-gray-400">
                Мы являемся официальным дистрибьютором ведущих брендов сварочного оборудования, и всегда готовы предложить вам широкий выбор продуктов, которые обеспечат вашу эффективную и качественную работу. Наши специалисты всегда готовы проконсультировать вас и помочь выбрать именно то, что вам нужно.
              </p>
            </div>
            
            <!-- <div class="hidden">
              <div class="flex flex-wrap gap-4 py-4">
                <div class="" v-for="cert in ['/certs/aurora-2.webp', '/certs/aurora-3.webp', '/certs/cert-redius.webp', '/certs/cert-svarog.webp', '/certs/esab-cert.webp', '/certs/svarog-2.webp']">
                  <img @click="activeCert = cert" :src="cert" class="w-36 cursor-pointer" />
                </div>
              </div>
              <div class=""></div>
            </div> -->

            <div class="py-8 grid grid-cols-1 gap-2">
              <p class="text-center">
                Если вы не нашли то, что Вам нужно - <a href="mailto:zakaz@glsvar.ru" target="_blank" class="font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-800 dark:border-gray-200">свяжитесь с нами</a> и мы найдем этот товар специально для Вас!
              </p>
              <p class="text-center">
                Покупайте современное сварочное оборудование у нас и помните, качественное оборудование - залог успешной работы!
              </p>
            </div>


          </div>

        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="activeCert" class="fixed inset-0 overflow-y-hidden overscroll-y-none z-50 my-10">
        <div class="flex min-h-full justify-center text-center items-center">

          <div class="relative rounded-sm px-10">
            <div class="overflow-y-auto h-screen">
              <div class="flex min-h-full justify-center text-center items-center">
                <img @click="activeCert = null" :src="activeCert" class="rounded-sm cursor-zoom-out w-[80%]" fluid/>
              </div>

            </div>
          </div>

        </div>
      </div>
    </transition>

    <CorouselBrands />
    <ShopMaps />
    <AppFooter />
    
  </div>
</template>