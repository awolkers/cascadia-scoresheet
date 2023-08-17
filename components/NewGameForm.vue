<script setup lang="ts">
const store = useGameStore();
const numberOfPlayers = ref(1);

const confirmResetDialogOpen = ref(false);

const onSubmitHandler = () => {
  store.setPlayers(Array(numberOfPlayers.value).fill({ name: 'Arno' }));
  store.initScoreSheet();
};

const onResetHandler = () => {
  confirmResetDialogOpen.value = false;
  store.$reset();
};

const onHistoryHandler = () => {
  store.moveToHistory();
};
</script>

<template>
  <form @submit.prevent="onSubmitHandler">
    <h2>New game</h2>
    <label for="players">Number of players</label>
    <select v-model.number="numberOfPlayers">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
      <option :value="4">4</option>
    </select>

    <BaseButtonGroup>
      <BaseButton type="submit" label="Start new game" />
      <BaseButton label="Reset" @click="confirmResetDialogOpen = true" />
      <BaseButton label="Move to history" @click="onHistoryHandler" />
    </BaseButtonGroup>

    <BaseDialog :open="confirmResetDialogOpen" @close="confirmResetDialogOpen = false">
      <h3>Are you sure you want to reset?</h3>
      <p>All game data will be lost including the history.</p>
      <BaseButtonGroup>
        <BaseButton label="Yes" @click="onResetHandler" />
        <BaseButton label="Cancel" @click="confirmResetDialogOpen = false" />
      </BaseButtonGroup>
    </BaseDialog>
  </form>
</template>
