<script setup lang="ts">
const store = useGameStore();

const [isDialogOpen, toggleDialog] = useToggle(false);

const onResetHandler = () => {
  if (!store.players.length) {
    navigateTo('/');
  } else {
    toggleDialog(true);
  }
};

const resetScoreSheet = () => {
  store.initScoreSheet();
  toggleDialog();
  navigateTo('/');
};

const resetGame = () => {
  store.$reset();
  toggleDialog();
  navigateTo('/');
};
</script>

<template>
  <header :class="$style['page-header']">
    <h1>{{ $t('site.title') }}</h1>
    <TheNavigation />

    <BaseButton label="Reset" @click="onResetHandler" />
    <BaseDialog :open="isDialogOpen" @close="toggleDialog(false)">
      <h3>What do you want to reset?</h3>
      <p>
        You can reset the current score sheet or quit the current session. When you quit, all game data including the
        history will be lost.
      </p>
      <BaseButtonGroup>
        <BaseButton label="Reset score sheet" @click="resetScoreSheet" />
        <BaseButton label="Quit session" @click="resetGame" />
        <BaseButton label="Cancel" secondary @click="toggleDialog()" />
      </BaseButtonGroup>
    </BaseDialog>
  </header>
</template>

<style module>
.page-header {
  background: var(--color-secondary);
}
</style>
