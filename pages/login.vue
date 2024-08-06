<script lang="ts" setup>
// import { ref } from 'vue'
// import { definePageMeta, useAuth } from '#imports'

// const { signIn, token, data, status, lastRefreshedAt } = useAuth()

// const username = ref('')
// const password = ref('')

  // definePageMeta({
  //   auth: {
  //     unauthenticatedOnly: true,
  //     navigateAuthenticatedTo: '/'
  //   }
  // })


  // import {
  //   GoogleSignInButton,
  //   type CredentialResponse,
  // } from "vue3-google-signin";

  // // handle success event
  // const handleLoginSuccess = (response: CredentialResponse) => {
  //   const { credential } = response;
  // };

  // // handle an error event
  // const handleLoginError = () => {
  //   console.error("Login failed");
  // };


  import { useOneTap, type CredentialResponse, decodeCredential } from "vue3-google-signin";
  const config = useRuntimeConfig()

  const googleUser = ref({} as any);

  useOneTap({
    onSuccess: (response: CredentialResponse) => {
      const { credential } = response
      const decodedCredential = decodeCredential(credential as string);

      googleUser.value = decodedCredential

      const user = $fetch(`${ config.public.baseURL }u/google-user/`, {
        method: 'POST', body: {
          "email": googleUser.value.email,
          "email_verified": googleUser.value.email_verified,
          "family_name": googleUser.value.family_name,
          "given_name": googleUser.value.given_name,
          "id": googleUser.value.id,
          "name": googleUser.value.name,
          "picture": googleUser.value.picture,
        }
      }).catch((error) => error.data)


    },
    onError: () => {
      console.error("Login failed");
    },
  });

</script>


<template>
  <div class="mx-auto max-w-xl px-4 lg:px-8 py-8">



    <div class="">
      <div class="bg-white border-gray-200 border dark:border-gray-700 dark:bg-gray-800 py-12 px-8 rounded-md">
        
        <p class="">GOOGLE AUTH</p>
        <div class="text-sm py-4">
          <p class="">{{ googleUser.email }}</p>
          <p class="">{{ googleUser.email_verified }}</p>
          <p class="">{{ googleUser.family_name }}</p>
          <p class="">{{ googleUser.given_name }}</p>
          <p class="">{{ googleUser.id }}</p>
          <p class="">{{ googleUser.name }}</p>
          <p class="">{{ googleUser.picture }}</p>

          <div class=" bg-white rounded-full flex items-center px-1 py-1 gap-4 my-4">
            <img :src="googleUser.picture" alt="" class="w-20 h-20 rounded-full" />
            <p class="text-lg text-gray-700 font-semibold">{{ googleUser.name }}</p>
          </div>
          
        </div>
        


      </div>
    </div>

  </div>
</template>