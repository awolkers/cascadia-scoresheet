<script setup lang="ts">
import { onMounted, ref, watchEffect, useAttrs } from 'vue';

const dialog = ref<InstanceType<any> | undefined>(null);
const internalOpen = ref(false);
const attrs = useAttrs();

const emit = defineEmits(['close']);

const props = defineProps({
  open: Boolean,
  inline: Boolean,
});

const openCloseDialog = () => {
  if (!dialog?.value) return;
  if (props.open) {
    props.inline ? dialog.value.show() : dialog.value.showModal();
  } else {
    dialog.value.close();
  }
};

const onClose = () => {
  emit('close');
};

onMounted(() => {
  watchEffect(() => {
    if (props.open !== internalOpen.value) {
      openCloseDialog();
      internalOpen.value = props.open;
    }
  });
});
</script>

<template>
  <dialog ref="dialog" v-bind="attrs" :class="$style['dialog']" @close="onClose">
    <div :class="$style['dialog__content']">
      <slot />
    </div>
  </dialog>
</template>

<style module>
.dialog {
  border: 0;
  max-width: min(calc(100vw - var(--space-32)), 64ch);
  padding: var(--space-8);
  background: var(--color-tertiary);
  box-shadow: var(--space-base-unit) var(--space-base-unit) 0 rgba(0, 0, 0, 0.25);
}
.dialog__content {
  border: 2px solid var(--color-secondary);
  padding: var(--space-16);
}
</style>
