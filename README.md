# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

# CONFIG
touch conf.ts

```typescript
const cfg = {
    "BASE_URL": 'http://127.0.0.1:8000/', //'http://127.0.0.1:8000'
    "gtmId": '',
    "yandexMetrika": '',
    "googleAnalyticsId": '',
  }
  
  export default cfg
```

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


```bash
npm install -D @tailwindcss/aspect-ratio
npm install -D @tailwindcss/line-clamp
npm install -D @tailwindcss/typography
npm install -D @tailwindcss/forms
npm install @mdi/font
```

### Examples
```typescript
<script setup>
  const props = defineProps({
    id: Number
  })
  const { data: quote, pending, error } = await useFetch(() => `https://dummyjson.com/quotes/${props.id}`)
</script>

<template>
  <div>
    <p v-if="pending">Fetching...</p>
    <pre v-else-if="error">Could not load quote: {{ error.data }}</pre>
    <figure v-else class="quote">
      <blockquote>{{ quote.quote }}</blockquote>
      <figcaption>&mdash; {{ quote.author }}</figcaption>
    </figure>
  </div>
</template>

<style scoped>
.quote {
  font: 1.25rem serif, system-ui;
  line-height: 150%;
  max-width: 60ch;
  margin: 1.5rem 0;
  padding: 1rem;
  border-radius: .5em;
  background: hsl(260, 60%, 96%);
  border: 1px solid hsl(260, 60%, 92%);
}
.quote figcaption,
.quote blockquote {
  margin: 1rem;
}
</style>
```

```typescript
<div class="">
  <Swiper
    class="rounded-md relative"
    style=""
    :modules="[SwiperAutoplay, SwiperEffectCreative]"
    :slides-per-view="1"
    :loop="true"
    :effect="'creative'"
    :autoplay="{
      delay: 10000,
      disableOnInteraction: true
    }"
    :creative-effect="{
      prev: {
        shadow: false,
        translate: ['-20%', 0, -1]
      },
      next: {
        translate: ['100%', 0, 0]
      }
    }"
  >
    <SwiperSlide v-for="slide in images" :key="slide.id" class="">
      <img
        :src="slide.url"
        class="rounded-md border dark:border-gray-700 shadow-md "
      />             
    </SwiperSlide>
    <div class="absolute bottom-0 right-0 z-40 p-3">
      <SwiperControls />
    </div>
  </Swiper>
</div>
```


#### Видео для фона
```typescript
    <!-- <div id="background-page" class="bg-fixed bg-no-repeat bg-[center_100px] bg-cover bg-[url('images/footer-bg.webp')] dark:bg-[url('images/footer-dark-bg.webp')] min-h-screen"> -->
      
  <div id="backgr ound-page" class="min-h-screen bg-fixed bg-no-repeat bg-center bg-cover bg-[url('images/weld.webp')] dark:bg-[url('images/weld.webp')] ">
    <div class="bg-gradient-to-r from-gray-300/80 to-gray-100/80 dark:from-gray-900/80 dark:to-gray-800/80 text-gray-700/80 dark:text-gray-300/80">
      <div v-if="clientIP" class="">
        <slot />
      </div>
      <div v-else class="">
        <ErrBackEnd />
      </div>
    </div>
  </div>
```