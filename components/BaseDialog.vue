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
    <slot />
  </dialog>
</template>

<style module>
.dialog {
  border: 1px solid var(--color-primary);
  border-radius: var(--border-radius-small);
  max-width: min(calc(100vw - var(--space-16)), 64ch);
  padding: var(--space-16);
}
</style>
