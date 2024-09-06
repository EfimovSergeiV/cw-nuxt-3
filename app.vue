<script lang="ts" setup>
  import { useOneTap, type CredentialResponse, decodeCredential } from "vue3-google-signin";
  
  const config = useRuntimeConfig()  
  const tmp_id = useCookie('tmp_id')

  const googleUser = ref({} as any);

  // useOneTap({
  //   onSuccess: (response: CredentialResponse) => {

      
  //     const { credential } = response
  //     const decodedCredential = decodeCredential(credential as string);

  //     let uuid = null

  //     if (tmp_id.value) {
  //       uuid = tmp_id.value
  //     }

  //     googleUser.value = decodedCredential
      
  //     const user = $fetch(`${ config.public.baseURL }u/google-user/`, {
  //       method: 'POST', body: {
  //         "uuid": uuid,
  //         "email": googleUser.value.email,
  //         "email_verified": googleUser.value.email_verified,
  //         "family_name": googleUser.value.family_name,
  //         "given_name": googleUser.value.given_name,
  //         "id": googleUser.value.id,
  //         "name": googleUser.value.name,
  //         "picture": googleUser.value.picture,
  //       }
  //     }).catch((error) => error.data)


  //   },
  //   onError: () => console.error("Error with One Tap Login"),
  // });

</script>


<template>

  <NuxtLayout>
    <NuxtLoadingIndicator :color="'repeating-linear-gradient(to right,#38bdf8 0% ,#0369a1 100%)'" :height="1" />
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="postcss">


</style>
