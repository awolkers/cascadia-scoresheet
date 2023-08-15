<template>
  <div>
    <language-selector />
    <the-navigation />
    <NuxtPage />
  </div>
</template>


<script setup lang="ts">
const i18n = useI18n();

useHead({
  titleTemplate: (titleChunk) => {
    const title = i18n.t('page.title');
    return titleChunk ? `${titleChunk} - ${title}` : title;
  }
})
</script>
