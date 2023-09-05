<script setup lang="ts">
import { useCssModule } from 'vue';

const $style = useCssModule();

interface Props {
  to?: string;
  label: string;
  type?: 'submit' | 'button' | 'reset';
  secondary?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  type: 'button',
});

const tag = computed(() => {
  if (props.to) {
    return 'NuxtLinkLocale';
  }

  return 'button';
});

const buttonClasses = computed(() => {
  return [$style.btn, props.secondary ? $style.btn_secondary : null];
});
</script>

<template>
  <component :is="tag" :class="buttonClasses" :type="type">{{ label }}</component>
</template>

<style module>
.btn {
  --btn-bg-color: var(--color-primary);
  --btn-border-color: transparent;
  --btn-border-width: 2px;
  --btn-text-color: var(--color-white);
  --outline-color: var(--color-secondary);

  border: var(--btn-border-width) solid var(--btn-border-color);
  background: var(--btn-bg-color);
  color: var(--btn-text-color);
  font-weight: var(--font-weight-bold);
  border-radius: var(--border-radius-small);
  padding: calc(var(--space-8) - var(--btn-border-width)) calc(var(--space-16) - var(--btn-border-width));
  cursor: pointer;
  transition:
    background var(--transition-fast) ease,
    border var(--transition-fast) ease,
    outline-color var(--transition-fast) ease;
}

.btn:hover,
.btn:focus-visible {
  --btn-bg-color: var(--color-secondary);
}

.btn_secondary {
  --btn-bg-color: transparent;
  --btn-border-color: currentColor;
  --btn-text-color: var(--color-primary);
  /* --outline-color: currentColor; */
}

.btn_secondary:hover,
.btn_secondary:focus-visible {
  --btn-bg-color: transparent;
  --btn-text-color: var(--color-secondary);
}
</style>
