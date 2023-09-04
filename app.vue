<script setup lang="ts">
const i18n = useI18n();

useHead({
  titleTemplate: (titleChunk) => {
    const title = i18n.t('site.title');
    return titleChunk ? `${titleChunk} - ${title}` : title;
  },
});

useSeoMeta({
  description: () => i18n.t('site.description'),
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
