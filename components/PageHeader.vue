<template>
  <header :class="$style['page-header']">
    <h1>{{ $t('site.title') }}</h1>
    <TheNavigation />
  </header>
</template>

<style module>
.page-header {
  background: var(--color-secondary);
}
</style>
