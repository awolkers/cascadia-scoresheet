<template>
  <div :class="$style['button-group']">
    <slot />
  </div>
</template>

<style module>
.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
}
</style>
