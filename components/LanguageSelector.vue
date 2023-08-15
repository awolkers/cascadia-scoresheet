<script setup>
const { locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div>
    <h2>{{ $t('languageSelector.title') }}</h2>
    <ul>
      <li v-for="locale in locales" :key="locale.code">
        <NuxtLink :to="switchLocalePath(locale.code)">{{ locale.name }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
