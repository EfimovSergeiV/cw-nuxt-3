<script setup>
  import { onMounted } from 'vue'

  const ctx = useNuxtApp()
  const route = useRoute()
  const config = useRuntimeConfig()
  
  const tmp_id = useCookie('tmp_id', {
    sameSite: 'strict',
    // default: () => 'no',
    maxAge: 21 * 24 * 60 * 60,
  })

  const shopStore = useShopStore()
  const productsStore = useProductsStore()
  const clientStore = useClientStore()
  // const notificationsStore = useNotificationsStore()

  const { signIn, signOut, token, data, status, lastRefreshedAt } = useAuth()

  const cookiesModal = ref(false)
  const clientIP = await $fetch(`${ config.public.baseURL }myip/`).catch((error) => error.data)

  onMounted( async () => {

    /// Получаем список магазинов
    const shops = await $fetch(`${ config.public.baseURL }c/shops/`).catch((error) => error.data)
    shopStore.shops = await shops

    /// Присваиваем клиенту временыый идентификатор
    if ( tmp_id.value ) {
      /// Проверяем, если устарел (нет в базе), получаем новый
      const watcher = await $fetch(`${ config.public.baseURL }u/uwatch/`, {
        method: 'PUT', body: { "tmp_id": tmp_id.value }
      }).catch((error) => error.data)

      //INFO: сжать IF
      if (clientIP !== '5.187.6.178' && clientIP !== '89.23.6.175') {
        if (process.client) {
          ctx.$metrika.reachGoal('REPEAT_VISIT')
        }
      }

      /// Если tmp_id найден, обновляем его (???)
      if ( watcher.tmp_id ) {
        tmp_id.value = watcher.tmp_id
      }

    } else {
      /// Если tmp_id не найден, получаем новый
      const watcher = await $fetch(`${ config.public.baseURL }u/uwatch/`, { method: 'PUT' }).catch((error) => error.data)
      tmp_id.value = watcher.tmp_id
      cookiesModal.value = true
    }

    /// Получаем данные о просмотренных товарах
    const tmp_data = await $fetch(`${ config.public.baseURL }u/uwatch/`, {
      headers: {
        "Authorization": tmp_id.value,
      }
    }).catch((error) => error.data)
    productsStore.restoreState(tmp_data)


    clientStore.getLocateFromIP()

    setTimeout(() => {
      if ("geolocation" in navigator) {
        /* Определяем местоположение по координатам */
        navigator.geolocation.getCurrentPosition(position => {
          let location = {
            "latitude": position.coords.latitude, 
            "longitude": position.coords.longitude 
          }

          clientStore.sendCoordinates(location)

          // this.sendCoordinates(location)
        });
      } else {
        /* Местоположение не доступно */
      }
    }, 7500) // 15000

  })

  const onClick = (messenger) => {
    if (process.client) {
      ctx.$metrika.reachGoal(messenger)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

</script>

<template>
  <div class="">

    <div class="hidden">
      <h1 id="glsvar">Большой выбор сварочного оборудования и расходных материалов в магазинах Главный Сварщик</h1>
      <h2 id="desc">
        С 2009 года Главный сварщик – ваш надежный партнер в мире сварочного оборудования!
        Наши магазины – это место, где профессионалы и энтузиасты приходят за лучшими решениями для сварочных работ. 
        Сварка - это искусство, и мы знаем, как сделать его доступным и эффективным для каждого.
      </h2>
      <a id="mma-welding" href="https://glsvar.ru/prods?ct=8">MMA сварка</a>
      <a id="mig-mag-welding" href="https://glsvar.ru/prods?ct=9">MIG-MAG сварка</a>
      <a id="tig-welding" href="https://glsvar.ru/prods?ct=11">TIG сварка</a>
      <a id="laser-welding" href="https://glsvar.ru/prods?ct=111">Лазерная сварка</a>
      <a id="auto-welding" href="https://glsvar.ru/prods?ct=106">Автоматическая сварка</a>
      <a id="consumables" href="https://glsvar.ru/prods?ct=4">Расходные материалы</a>
      <a id="means-of-protection" href="https://glsvar.ru/prods?ct=108">Средства защиты</a>
      <a id="gas-equiment" href="https://glsvar.ru/prods?ct=3">Газосварочное оборудование</a>
    </div>

    <div class="">
      <div id="nav-bar" class="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-b border-gray-400 dark:border-gray-700 fixed hidden w-full z-40">
        
        <div class="container mx-auto px-4 max-w-6xl lg:px-8">
          <div class="lg:flex items-start justify-between">
            <nuxt-link :to="{ name: 'index' }" class="hidden lg:block pb-1">
              <img src="/images/blue-svar.webp" class="max-h-[3rem]" />
            </nuxt-link>

            <div class="flex justify-end gap-4 md:gap-4 uppercase font-semibold py-1">
              <div class="hidden md:block before:block before:absolute before:-inset-2 before:-skew-y-3 transition-all duration-0 relative my-2">
                <nuxt-link :to="{ name: 'index' }" class="relative text-xs md:text-base">Главная</nuxt-link>
              </div>
              <div class="before:block before:absolute before:-inset-2 before:-skew-y-3 transition-all duration-0 relative inline-block my-2">
                <nuxt-link :to="{ name: 'like' }" class="relative text-xs md:text-base">Избранное</nuxt-link>
              </div>
              <div class="before:block before:absolute before:-inset-2 before:-skew-y-3 transition-all duration-0 relative inline-block my-2">
                <nuxt-link :to="{ name: 'compare' }" class="relative text-xs md:text-base">В сравнении</nuxt-link>
              </div>
              <div class="before:block before:absolute before:-inset-2 before:-skew-y-3 text-white before:bg-blue-600 transition-all duration-0 relative inline-block h-5 mt-3 px-2">
                <nuxt-link :to="{ name: 'cart' }" class="relative text-xs md:text-base">Корзина</nuxt-link>
              </div>
              <div class="before:block before:absolute before:-inset-2 before:-skew-y-3 transition-all duration-0 relative inline-block my-2">
                <nuxt-link :to="{ name: 'about' }" class="relative text-xs md:text-base">О нас</nuxt-link>
              </div>
            </div>            
          </div>

        </div>
        
      </div>
    </div>


    <transition name="fade" mode="in-out">
      <CartModal v-if="productsStore.cartAlert" />
    </transition>
    <transition name="fade" mode="in-out">
      <OrderModal v-if="clientStore.order" />
    </transition>
    <transition name="fade" mode="in-out">
      <RequestPrice v-if="productsStore.requestPrice" />
    </transition>
    <transition name="fade" mode="in-out">
      <ProductImageModal v-if="productsStore.productImages" />
    </transition>
    <transition name="fade" mode="in-out">
      <WriteUsModal v-if="shopStore.writeUsModal" />
    </transition>
    <transition name="fade" mode="in-out">
      <Toasts />
    </transition>
    <transition name="fade" mode="in-out">
      <LocationModal v-if="clientStore.locationModal" />
    </transition>
    <transition name="fade" mode="in-out">
      <LoginModal v-if="clientStore.loginModal && status === 'unauthenticated'" />
    </transition>
    <transition name="fade" mode="in-out">
      <RegisterModal v-if="clientStore.registerModal" />
    </transition>
    

    <div class="bg-gradient-to-r from-gray-300 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-700 dark:text-gray-300">
      
      <div id="background-page" class="bg-fixed bg-no-repeat bg-[center_100px] bg-cover bg-[url('images/footer-bg.webp')] dark:bg-[url('images/footer-dark-bg.webp')] min-h-screen">        
        <div v-if="clientIP" class="">
          <slot />
        </div>
        <div v-else class="">
          <ErrBackEnd />
        </div>
      </div>

      <div  v-if=" route.path !== '/banner'" class="">
        <div class="">
          <div class="fixed z-40 bottom-60 md:bottom-54 right-20 hover:right-24 transition-all duration-500">
            <div class="relative">
              <div class="absolute z-40">
                <div class="-rotate-90 bg-blue-600 px-4 pb-12 group rounded-md w-44 cursor-pointer" @click="shopStore.showWriteUsModal">
                  <div class="flex items-center justify-center group-hover:text-gray-100 text-gray-100 font-bold transition-all duration-500">
                    <div class="">
                      <p class="text-sm mx-2">Напишите нам</p>
                    </div>
                    <div class="rotate-90">
                      <p class="mdi mdi-24px mdi-message-text-outline"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div class="">
          <div class="fixed z-40 bottom-16 -right-[126px] hover:right-0 focus:right-0 transition-all duration-500">
            <div class="relative">
              <div class="">
                <div class=" bg-blue-600 group rounded-l-md cursor-pointer transition-all duration-500">
                  <div class="flex items-center justify-center">
                    <div class="grid grid-cols-4 items-center gap-4 px-1">
                      <p class="mdi mdi-24px mdi-face-agent text-gray-100 pl-0.5"></p>
                      <a class="" title="WhatsApp" href="https://wa.me/79116965424" @click="onClick('ONCLICK_WHATSAPP')" target="_blank">
                        <img src="/WhatsApp-logo.webp" class="w-5" />
                      </a>
                      <a class="" title="Telegramm" href="https://t.me/s2nullnullachtundfunfzig" @click="onClick('ONCLICK_TELEGRAMM')" target="_blank">
                        <img src="/telegr-logo.webp" class="w-5" />
                      </a>
                      <a class="" title="Viber" href="viber://chat?number=79116965424" @click="onClick('ONCLICK_VIBER')" target="_blank">
                        <img src="/viber-logo.webp" class="w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>



    <transition name="fade">
      <div v-if="cookiesModal" class="fixed bottom-0 z-40">
        <div class="bg-gray-700 border-t border-r border-gray-500 px-10 py-4 rounded-tr-3xl">
          <div class="flex gap-6 lg:gap-16 items-center">
            <div class="">
              <p class="text-sm lg:text-2xl text-gray-300">Мы используем Cookies</p>
            </div>
            <div class="">
              <button @click="cookiesModal = false" class="text-gray-100 text-sm font-semibold bg-blue-600 border border-blue-500 px-8 py-1 rounded-lg">Хорошо</button>
            </div>
          </div>
        </div>
      </div>      
    </transition>


    <div id="navbar" class="fixed bottom-4 z-40 right-14 md:right-28 cursor-pointer hidden">
      <button @click="scrollToTop()" class="transition-all duration-500">
        <div class="">
          <div class="flex gap-1 items-center text-black/80 dark:text-white/80 ">
            <span class="mdi mdi-arrow-up-bold-circle-outline mdi-36px"></span>
          </div>
        </div>        
      </button>
    </div>


  </div>
</template>