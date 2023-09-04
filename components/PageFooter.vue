<template>
  <footer :class="$style['page-footer']">
    <LanguageSelector />
  </footer>
</template>

<style module>
.page-footer {
  background: var(--color-primary);
  display: flex;
  padding: var(--space-8);
  justify-content: flex-end;
}
</style>
