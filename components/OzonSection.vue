<script setup>


  const selected = ref(0)
  const styleState = (index) => {
    return {
      'bg-blue-600': selected.value === index,
      'text-white': selected.value === index,
      'bg-white': selected.value !== index,
      'text-gray-800': selected.value !== index,
    }
  }

</script>



<template>
  <div class="container mx-auto px-4 max-w-6xl lg:px-8 py-2">
    
    
    <div class="flex items-center justify-end ">      
      <div class="bg-blue-600 text-white w-6/12 bg-slice-full py-3 -mb-8">
        <p class="text-2xl font-bold text-center uppercase italic">Специально для вас!</p>   
      </div>
    </div>



    <div class="relative">
      <div class="flex">
        <div class="bg-white text-gray-800 px-10 pt-4 rounded-t-md bg-slice-right w-5/12" >
          <p class="text-xl italic font-bold uppercase text-center">Сварочные краги и перчатки</p>
        </div>  
      </div>

      <div class=" px-4 h-[160px] bg-white ">
        <div class="flex items-center h-full gap-4">

          <div class="group relative">
            <img src="/tmp/1.png" class="w-24 group-hover:w-32 group-hover:pb-0.5 rotate-45 transition-all duration-300 cursor-pointer"/>
            <div class="absolute z-40 bottom-2">
              <p class=" w-[220px] invisible group-hover:visible text-gray-700 transition-all text-base text-center">370 руб</p>
            </div>
            <div class="absolute z-40 buttom-0">
              <p class=" w-[220px] invisible group-hover:visible text-gray-700 transition-all text-sm text-center">Перчатки для TIG сварки, с усилением ладони</p>
            </div>
          </div>

          <div @click="selected = 1" class="group relative">
            <img src="/tmp/2.png" class="w-24 group-hover:w-32 group-hover:pb-0.5 rotate-45 transition-all duration-300 cursor-pointer"/>
            <div class="absolute z-40 bottom-2">
              <div class="flex items-center justify-end w-[180px]">
                <p class="bg-blue-600 invisible group-hover:visible text-white transition-all text-base font-semibold text-center px-4 py-1 bg-slice-full">370 руб</p>
              </div>
            </div>
            <div class="absolute z-40 buttom-0">
              <p class="z-40 w-[220px] invisible group-hover:visible text-gray-700 transition-all text-sm text-center">Перчатки для TIG сварки, с усилением ладони</p>
            </div>
          </div>

          <div @click="selected = 2" class="group relative">
            <img src="/tmp/3.png" class="w-24 group-hover:w-32 group-hover:pb-0.5 rotate-45 transition-all duration-300 cursor-pointer" />
            <div class="absolute z-40 bottom-2 ">
              <div class="flex items-center justify-end w-[180px]">
                <p class="bg-blue-600 invisible group-hover:visible text-white transition-all text-base font-semibold text-center px-4 py-1 bg-slice-full">2 370 руб</p>
              </div>
            </div>

            <div class="absolute z-40 buttom-0">
              <p class=" w-[220px] invisible group-hover:visible text-gray-700 transition-all text-sm text-center font-semibold">Перчатки для TIG сварки, с усилением ладони</p>
            </div>
          </div>

          <div class="group relative">
            <img src="/tmp/4.png" class="w-24 group-hover:w-32 group-hover:pb-0.5 rotate-45 transition-all duration-300 cursor-pointer"/>
            <div class="absolute z-40 buttom-0">
              <p class=" w-[220px] invisible group-hover:visible text-gray-700 transition-all text-sm text-center">Перчатки для TIG сварки, с усилением ладони</p>
            </div>
          </div>
          <div class="group relative">
            <img src="/tmp/5.png" class="w-24 group-hover:w-32 group-hover:pb-0.5 rotate-45 transition-all duration-300 cursor-pointer"/>
            <div class="absolute z-40 buttom-0">
              <p class=" w-[220px] invisible group-hover:visible text-gray-700 transition-all text-sm text-center">Перчатки для TIG сварки, с усилением ладони</p>
            </div>
          </div>
          <div class="group relative">
            <img src="/tmp/6.png" class="w-24 group-hover:w-32 group-hover:pb-0.5 rotate-45 transition-all duration-300 cursor-pointer"/>
            <div class="absolute z-40 buttom-0">
              <p class=" w-[220px] invisible group-hover:visible text-gray-700 transition-all text-sm text-center">Перчатки для TIG сварки, с усилением ладони</p>
            </div>
          </div>
          <div class="group relative">
            <img src="/tmp/7.png" class="w-24 group-hover:w-32 group-hover:pb-0.5 rotate-45 transition-all duration-300 cursor-pointer"/>
            <div class="absolute z-40 buttom-0">
              <p class=" w-[220px] invisible group-hover:visible text-gray-700 transition-all text-sm text-center">Перчатки для TIG сварки, с усилением ладони</p>
            </div>
          </div>
          <div class="group relative">
            <img src="/tmp/8.png" class="w-24 group-hover:w-32 group-hover:pb-0.5 rotate-45 transition-all duration-300 cursor-pointer"/>
            <div class="absolute z-40 buttom-0">
              <p class=" w-[220px] invisible group-hover:visible text-gray-700 transition-all text-sm text-center">Перчатки для TIG сварки, с усилением ладони</p>
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

<!-- 
    <div class="relative">
      
      <div class="relative bg-white shadow-none border-t">
        <div class="flex h-[160px] items-center justify-between gap-2 bg-ye llow-500/50">
          <div class="px-6">
            <div class="bg-green-500 absolute bottom-1/2">
              
              <div class="bg-red- 500/50">
                <p class="text-gray-700 text-sm">С 2009 года Главный сварщик – ваш надежный партнер в мире сварочного оборудования!</p>
                <div class="py-2 ">
                  <p class="text-xs text-gray-500">
                    Наши магазины – это место, где профессионалы и энтузиасты приходят за лучшими решениями для сварочных работ.<br /> Сварка - это искусство, и мы знаем, как сделать его доступным и эффективным для каждого.
                  </p>                
                </div>                
              </div>


            </div>
          </div>          
          <div class="flex items-center justify-end ">
            <div class=""><img src="/tmp/11.png" class="w-24 hover:w-32 hover:pb-2 transition-all duration-300 cursor-pointer"/></div>
            <div class=""><img src="/tmp/12.png" class="w-24 hover:w-32 hover:pb-2 transition-all duration-300 cursor-pointer"/></div>
            <div class=""><img src="/tmp/13.png" class="w-24 hover:w-32 hover:pb-2 transition-all duration-300 cursor-pointer"/></div>
            <div class=""><img src="/tmp/14.png" class="w-24 hover:w-32 hover:pb-2 transition-all duration-300 cursor-pointer"/></div>            
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <div class="bg-white text-gray-800 px-10 pb-4 bg-slice-left-mirrior w-5/12 -mt-2">
          <p class="text-xl italic font-bold uppercase text-center">Химия для сварки M-WELD</p>
        </div>  
      </div>

    </div>
 -->



    

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
</style>