<script setup>
const { locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <div>
    <h3 class="sr-only">{{ $t('languageSelector.title') }}</h3>
    <ul :class="$style['language-selector']">
      <li v-for="locale in locales" :key="locale.code">
        <NuxtLink
          :class="$style['language-selector__link']"
          :active-class="$style['language-selector__link--active']"
          :to="switchLocalePath(locale.code)"
        >
          <img :src="`icons/flags/${locale.code}.svg`" :class="$style['language-selector__flag']" :alt="locale.name" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style module>
.language-selector {
  --outline-color: var(--color-white);
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  gap: var(--space-8);
}

.language-selector__link {
  border: 1px solid transparent;
  display: block;
  border-radius: 50%;
  overflow: hidden;
  /* opacity: 0.75; */
  transition: border var(--transition-fast) ease;
}

.language-selector__link--active {
  border-color: var(--outline-color);
  opacity: 1;
}

.language-selector__flag {
  width: var(--font-size-24);
  height: var(--font-size-24);
  display: block;
  /* border-radius: 50%; */
}
</style>
