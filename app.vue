<script lang="ts" setup>
  import { useOneTap, type CredentialResponse } from "vue3-google-signin";

  useOneTap({
    onSuccess: (response: CredentialResponse) => {
      console.log("Success:", response);
    },
    onError: () => console.error("Error with One Tap Login"),
    // options
  });

</script>


<template>

  <NuxtLayout>
    <NuxtLoadingIndicator :color="'repeating-linear-gradient(to right,#38bdf8 0% ,#0369a1 100%)'" :height="1" />
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="postcss">


</style>
