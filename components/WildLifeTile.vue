<script setup lang="ts">
interface Props {
  animal: string;
}

defineProps<Props>();
</script>

<template>
  <div :class="[$style['wildlife-tile'], $style[`wildlife-tile--${animal}`]]">
    <span :class="$style['wildlife-tile__bullet']"></span>
    <span :class="$style['wildlife-tile__label']">{{ $t(`wildlife.${animal}`, 2) }}</span>
  </div>
</template>

<style module>
.wildlife-tile {
  --wildlife-animal-color: transparent;
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
}

.wildlife-tile__bullet {
  background: var(--wildlife-animal-color);
  width: 1em;
  height: 1em;
  border-radius: 50%;
}

.wildlife-tile--bear {
  --wildlife-animal-color: var(--color-wildlife-bear);
}

.wildlife-tile--elk {
  --wildlife-animal-color: var(--color-wildlife-elk);
}

.wildlife-tile--salmon {
  --wildlife-animal-color: var(--color-wildlife-salmon);
}

.wildlife-tile--hawk {
  --wildlife-animal-color: var(--color-wildlife-hawk);
}

.wildlife-tile--fox {
  --wildlife-animal-color: var(--color-wildlife-fox);
}
</style>
