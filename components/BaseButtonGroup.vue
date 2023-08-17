<template>
  <div :class="$style['button-group']">
    <slot />
  </div>
</template>

<style module>
.button-group {
  display: flex;
  gap: var(--space-8);
}
</style>
