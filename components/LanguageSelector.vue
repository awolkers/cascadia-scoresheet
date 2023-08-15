<script setup>
const { locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div>
    <h3>{{ $t('languageSelector.title') }}</h3>
    <ul>
      <li v-for="locale in locales" :key="locale.code">
        <NuxtLink :to="switchLocalePath(locale.code)">{{ locale.name }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
