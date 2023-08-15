<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const i18n = useI18n();

useHead({
  titleTemplate: (titleChunk) => {
    const title = i18n.t('site.title');
    return titleChunk ? `${titleChunk} - ${title}` : title;
  },
});
</script>
