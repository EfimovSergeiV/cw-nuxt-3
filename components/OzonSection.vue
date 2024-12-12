<script setup>

  const props = defineProps(['crags',])
  
  
  
  const selected = ref(1)





</script>



<template>
  <div class="container mx-auto px-4 max-w-6xl lg:px-8 py-2">

    <div class="">
    
    
      <div class="flex items-center justify-end">      
        <div class="bg-blue-600 text-white w-8/12 md:w-6/12 bg-slice-full py-3 md:-mb-8">
          <p class="text-2xl font-bold text-center uppercase italic">Специально для вас!</p>   
        </div>
      </div>





      <div class="relative">
        <div class="flex -mb-0.5">
          <div class="bg-white text-gray-800 px-10 pt-4 rounded-t-md bg-slice-right w-10/12 md:w-5/12" >
            <p class="text-xl italic font-bold uppercase text-center">Сварочные краги и перчатки</p>
          </div>  
        </div>

        <div class=" px-4 h-[160px] bg-white ">
          <div class="flex items-center h-full gap-4">


            <div v-for="prod, index in crags" :key="prod.id" class="">


              
              <div v-if="index === selected" class="cursor-pointer">
                <div @click="selected = index" class="group relative">
                  <img :src="prod.preview_image" class="w-32 pb-0.5 rotate-45 transition-all duration-300 "/>
                  <div class="absolute z-10 bottom-2">
                    <div class="flex items-center justify-end w-[180px]">
                      <p class="bg-blue-600 visible text-white transition-all text-base font-semibold text-center px-4 py-1 bg-slice-full">{{ prod.only_price }} руб.</p>
                    </div>
                  </div>
                  <div class="absolute z-10 buttom-0">
                    <p class="z-10 w-[220px] visible text-gray-700 transition-all text-base text-center bg-white font-semibold italic">{{ prod.name }}</p>
                  </div>
                </div>
              </div>
              

              <div v-if="index !== selected" class="cursor-pointer">
                <div @click="selected = index" class="group relative">
                  <img :src="prod.preview_image" class="w-24 rotate-45 transition-all duration-300 "/>
                  <div class="absolute z-10 bottom-2">
                    <div class="flex items-center justify-end w-[180px]">
                      <p class="bg-blue-600 invisible text-white transition-all text-base font-semibold text-center px-4 py-1 bg-slice-full">{{ prod.only_price }} руб.</p>
                    </div>
                  </div>
                  <div class="absolute z-10 buttom-0">
                    <p class="z-10 w-[220px] invisible text-gray-700 transition-all text-base text-center bg-white font-semibold italic">{{ prod.name }}</p>
                  </div>
                </div>
              </div>



            </div>


          </div>
        </div>

      </div>


      


      <div class="">
        <div class="h-[160px] bg-white px-4 py-4 relative">
          
          
          <div class="flex items-center justify-end h-full">
            <div class="absolute z-10 w-full left-0">
              <div class="">
                <div class="px-4">
                  <p class="text-gray-700 text-base">С 2009 года Главный сварщик – ваш надежный партнер в мире сварочного оборудования!</p>
                  <div class="py-2 ">
                    <p class="text-xs text-gray-500">
                      Наши магазины – это место, где профессионалы и энтузиасты приходят за лучшими решениями для сварочных работ.<br /> Сварка - это искусство, и мы знаем, как сделать его доступным и эффективным для каждого.
                    </p>                
                  </div>                
                </div>
              </div>
            </div>
            <div class="absolute z-20 w-full left-0">
              <div class="flex items-center justify-end">
              <div class=""><img src="/tmp/11.png" class="w-24 hover:w-32 hover:pb-2 transition-all duration-300 cursor-pointer"/></div>
              <div class=""><img src="/tmp/12.png" class="w-24 hover:w-32 hover:pb-2 transition-all duration-300 cursor-pointer"/></div>
              <div class=""><img src="/tmp/13.png" class="w-24 hover:w-32 hover:pb-2 transition-all duration-300 cursor-pointer"/></div>
              <div class=""><img src="/tmp/14.png" class="w-24 hover:w-32 hover:pb-2 transition-all duration-300 cursor-pointer"/></div>            
            </div>
            </div>          
          </div>



        </div>

        <div class="flex justify-end">
          <div class="bg-white text-gray-800 px-10 pb-4 bg-slice-left-mirrior w-10/12 md:w-5/12 -mt-0.5">
            <p class="text-xl italic font-bold uppercase text-center">Химия для сварки M-WELD</p>
          </div>  
        </div>

      </div>


    </div>
    

  </div>


</template>


<style scoped>
.bg-slice-right {
  /* clip-path: polygon(0 1%, 98% 0, 100% 100%, 0% 100%); */
  clip-path: polygon(0 15%, 97% 0, 100% 100%, 0 100%);
}

.bg-slice-left {
  clip-path: polygon(2% 0, 100% 0, 100% 100%, 0 100%);
}
.bg-slice-left-mirrior {
  clip-path: polygon(0 0, 100% 0, 100% 90%, 3% 100%);
}
.bg-slice-full {
  clip-path: polygon(0 15%, 100% 0, 100% 85%, 0 100%);
}
.img-resize {
  width: 8rem;
}
</style>