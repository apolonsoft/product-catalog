<script lang="ts" setup>
import PageTitle from '~/components/PageTitle.vue';

useHead({
  title: 'My simple product catalog'
});
</script>

<template>
  <div>
    <PageTitle color-class="text-red-500">
      Product Catalog Main Page
    </PageTitle>

    <NuxtImg src="/laptop1.webp" quality="100" alt="laptop1" class="aspect-video" placeholder />
  </div>
</template>