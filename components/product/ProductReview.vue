<script setup>
  const config = useRuntimeConfig()

  const props = defineProps(['reviews', 'product_id'])
  const notificationsStore = useNotificationsStore()
  const selectedReviews = ref([ 1, 2, 3, 4, 5 ])


  const countPercent = (rating) => {
    const count = props.reviews.filter(review => review.rating === rating).length
    const percent = (count / props.reviews.length) * 100
    return Math.ceil(percent)
  }

  const countGeneralRating = () => {
    const sum = props.reviews.reduce((acc, review) => acc + review.rating, 0)
    return Math.ceil(sum / props.reviews.length)
  }

  const sendStar = ref(0)
  const userName = ref(null)
  const message = ref('')
  const sendStatus = ref(false)
  const reviewSended = ref(false)

  const sendReview = () => {
    console.log('sendReview: ', props.product_id, sendStar.value, message.value)
    sendStatus.value = true

    $fetch(`${ config.public.baseURL }o/reviews/${ props.product_id }/`, {
      method: 'POST',
      body: {
        user_name: userName.value,
        rating: sendStar.value,
        r_text: message.value,
      }
    })
    .then(() => {
      sendStatus.value = false
      reviewSended.value = true
    }).catch((error) => {
      sendStatus.value = false
      notificationsStore.pushToast({ id: 1, type: 'error', text: 'Ошибка: Вы не поставили оценку' })
    })
  }

</script>



<template>
  <div class="mx-auto px-4 max-w-6xl lg:px-8 py-2">



    <div class="grid grid-cols-1 lg:flex flex-nowrap gap-4">

      <div class="lg:w-2/6 grid grid-cols-1 gap-4">
        <div v-if="props.reviews.length > 0" class="bg-white rounded-md border dark:border-gray-700 dark:bg-gray-800 p-2 ">
          <p class="text-lg uppercase italic font-semibold">Общий рейтинг</p>

          <div class="mt-2">
            <div class="flex items-center mb-2">
              <div v-for="star in 5" :key="star">
                <svg v-if="countGeneralRating() >= star" class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg v-else class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>                
              </div>
            </div>

            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ props.reviews.length }} оценили</p>
            <div class="flex items-center justify-between mt-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">5 звёзд</p>
              <div class="w-2/4 h-3 mx-4 bg-gray-200 rounded-sm dark:bg-gray-700">
                  <div class="h-3 bg-yellow-300 rounded-sm" :style="`width: ${ countPercent(5) }%`"></div>
              </div>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400 w-8 text-center">{{ countPercent(5) }}%</span>
            </div>
            <div class="flex items-center justify-between mt-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">4 звёзды</p>
              <div class="w-2/4 h-3 mx-4 bg-gray-200 rounded-sm dark:bg-gray-700">
                  <div class="h-3 bg-yellow-300 rounded-sm" :style="`width: ${ countPercent(4) }%`"></div>
              </div>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400 w-8 text-center">{{ countPercent(4) }}%</span>
            </div>
            <div class="flex items-center justify-between mt-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">3 звёзды</p>
              <div class="w-2/4 h-3 mx-4 bg-gray-200 rounded-sm dark:bg-gray-700">
                  <div class="h-3 bg-yellow-300 rounded-sm" :style="`width: ${ countPercent(3) }%`"></div>
              </div>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400 w-8 text-center">{{ countPercent(3) }}%</span>
            </div>
            <div class="flex items-center justify-between mt-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">2 звёзды</p>
              <div class="w-2/4 h-3 mx-4 bg-gray-200 rounded-sm dark:bg-gray-700">
                  <div class="h-3 bg-yellow-300 rounded-sm" :style="`width: ${ countPercent(2) }%`"></div>
              </div>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400 w-8 text-center">{{ countPercent(2) }}%</span>
            </div>
            <div class="flex items-center justify-between mt-4">
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">1 звёзда</p>
              <div class="w-2/4 h-3 mx-4 bg-gray-200 rounded-sm dark:bg-gray-700">
                  <div class="h-3 bg-yellow-300 rounded-sm" :style="`width: ${ countPercent(1) }%`"></div>
              </div>
              <span class="text-sm font-medium text-gray-500 dark:text-gray-400 w-8 text-center">{{ countPercent(1) }}%</span>
            </div>
          </div>
    
        </div>

        



        <div v-if="reviewSended" class="bg-white rounded-md border dark:border-gray-700 dark:bg-gray-800 p-2">
          <div class="h-full flex items-center justify-center">
            <p class="text-center">Ваш отзыв отправлен, и будет опубликован после модерации</p>
          </div>
        </div>


        <div v-else class="bg-white rounded-md border dark:border-gray-700 dark:bg-gray-800 p-2">
          <p class="text-lg uppercase italic font-semibold">Отправить отзыв</p>

          <div class="grid grid-cols-1 gap-2 mt-2">
            <div class="flex items-center gap-2">
              <p class="">Ваша оценка</p>
              <div class="">
                <div class="flex items-center">
                  
                  <div v-for="star in 5" :key="star">
                    <svg v-if="sendStar >= star" @click="sendStar = star" class="cursor-pointer w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>
                    <svg v-else @click="sendStar = star" class="cursor-pointer w-4 h-4 text-gray-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                    </svg>                    
                  </div>

                </div>
              </div>
            </div>

            <div class="">
              <label for="message" class="block mt-2 mb-1 text-xs font-medium text-gray-900 dark:text-gray-400">Представьтесь</label>
              <div class="relative">
                <div class="flex absolute inset-y-0 left-0 items-center pl-2 pointer-events-none">
                  <p class="mdi mdi-24px mdi-account"></p>
                </div>
                <input type="text" v-model="userName" id="person" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-gray-300 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Иван Иванов">
              </div>
            </div>

            <div class="">
              <label for="message" class="block text-xs font-medium text-gray-900 dark:text-gray-400 mb-0.5">Комментарий (необязательно)</label>
              <textarea id="message" rows="4" v-model="message" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Напишите что-нибудь..."></textarea>
            </div>
            <div class="flex items-center justify-end">
              <button @click="sendReview()" :disabled="sendStatus" class="">
                <div class=" text-sm text-gray-100 rounded-lg bg-blue-600 hover:bg-blue-700 border border-gray-300/50 dark:border-gray-500/50 transition-all duration-1000">
                  <div class=" bg-gradient-to-br from-gray-100/20 to-gray-900/40 rounded-lg">
                    <p v-if="sendStatus" class="text-white text-base w-52 py-1.5 mdi mdi-loading animate-spin"></p>
                    <p v-else class="text-white text-base w-52 py-1.5">Отправить отзыв</p>
                  </div>
                </div>
              </button>            
            </div>

          </div>
        </div>
      </div>

      <div class="lg:w-4/6 flex flex-col justify-between gap-4">
        <div class="lg:grid grid-cols-5 flex flex-wrap gap-2">
          <div v-for="sec in 5" :key="sec" class="bg-white rounded-md border dark:border-gray-700 dark:bg-gray-800 px-2 py-1">
            <div class="flex items-center justify-between">
              <div class="mr-2">
                <input v-model="selectedReviews" :value="sec" id="default-checkbox" type="checkbox" class="
                  w-4 h-4 
                  rounded text-gray-500 dark:text-gray-500 focus:ring-0 
                  focus:ring-gray-300 ring-offset-gray-300 bg-gray-300 border-gray-300
                  dark:focus:ring-gray-500 dark:ring-offset-gray-800 dark:bg-gray-500 dark:border-gray-500"
                >
              </div>
              <div class="flex items-center">
                <div v-for="id in 5" :key="id" class="">
                  <svg v-if="sec > id - 1" class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                  <svg v-else class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div class="flex flex-col bg-white rounded-md border dark:border-gray-700 dark:bg-gray-800 h-full px-2 py-2">
          
          <div class="">
            <div class="mt-2">
              <p class="text-lg uppercase italic font-semibold">Отзывы покупателей</p>
            </div>
          </div>

          <div v-if="props.reviews.length > 0" class="max-h-[520px] overflow-y-scroll pr-2 py-2">
            <transition-group tag="div" name="list">
              <div v-for="(review, id) in props.reviews" :key="id" class="mt-3">
                
                <div v-if="selectedReviews.includes(review.rating)" class="border border-gray-200 hover:border-gray-300 dark:border-gray-600 dark:hover:border-gray-500 bg-gray-50 dark:bg-gray-700 transition-all px-4 py-2 rounded-md shadow-md shadow-black/20">
                  <div class="flex justify-between items-center">
                    <div class="">
                      <p class="">{{ review.user_name }}</p>
                    </div>
                    <div class="">
                      <p class="text-xs text-gray-500">{{ review.created_date }}</p>
                    </div>
                  </div>

                  <div class="flex items-center my-1 border-b border-gray-200 dark:border-gray-600 pb-1">
                    <div v-for="звёзд in 5" :key="звёзд" >
                      <svg v-if="review.rating >= звёзд" class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                      </svg>
                      <svg v-else class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                      </svg>
                    </div>
                  </div>                

                  <div class="text-sm">
                    {{ review.r_text }}
                  </div>

                </div>

              </div>
            </transition-group>            
          </div>
          <div v-else class="flex items-center justify-center h-full">
            <p class="text-center py-8">Пока нет отзывов</p>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>