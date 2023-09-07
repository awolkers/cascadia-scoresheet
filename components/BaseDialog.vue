<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';

const dialog = ref<InstanceType<any> | undefined>(null);
const internalOpen = ref(false);
const isClosing = ref(false);

const props = defineProps({
  open: Boolean,
  inline: Boolean,
});

const toggleDialog = () => {
  if (!dialog.value) return;

  if (props.open) {
    props.inline ? dialog.value.show() : dialog.value.showModal();
  } else {
    startClosing();
  }
};

const startClosing = () => {
  if (!dialog.value.open) return;

  dialog.value.addEventListener('animationend', close, { once: true });
  isClosing.value = true;
};

const close = () => {
  isClosing.value = false;
  dialog.value.close();
};

const onCancelHandler = (event: Event) => {
  event.preventDefault();
  startClosing();
};

onMounted(() => {
  watchEffect(() => {
    if (props.open !== internalOpen.value) {
      toggleDialog();
      internalOpen.value = props.open;
    }
  });
});
</script>

<template>
  <dialog
    ref="dialog"
    :class="[$style['dialog'], isClosing ? $style['dialog--closing'] : null]"
    @cancel="onCancelHandler"
  >
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

.dialog[open] :global {
  animation: slideIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.dialog[open]::backdrop :global {
  animation: fadeIn 0.25s ease-out;
}

.dialog--closing[open] :global {
  animation: slideOut 0.15s cubic-bezier(0.36, 0, 0.66, -0.56);
}

.dialog--closing[open]::backdrop :global {
  animation: fadeOut 0.15s ease-in;
}
</style>
