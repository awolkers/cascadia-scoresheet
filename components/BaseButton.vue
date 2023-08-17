<script setup lang="ts">
interface Props {
  to?: string;
  label: string;
  type?: 'submit' | 'button' | 'reset';
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
</script>

<template>
  <component :is="tag" :class="$style.button" :type="type">{{ label }}</component>
</template>

<style module>
.button {
  border: 0;
  background: var(--color-primary);
  color: var(--color-white);
  font-weight: var(--font-weight-bold);
  border-radius: var(--border-radius-small);
  padding: var(--space-8) var(--space-16);
  cursor: pointer;
  transition: background var(--transition-fast) ease;
}

.button:hover {
  background: var(--color-secondary);
}
</style>
