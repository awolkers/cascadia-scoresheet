<template>
  <div :class="$style['layout']">
    <PageHeader />
    <slot />
    <PageFooter />
  </div>
</template>

<style module>
.layout {
  height: 100dvh;
  display: flex;
  flex-direction: column;
}

.layout > main {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: var(--space-16) var(--space-8);
}
</style>
