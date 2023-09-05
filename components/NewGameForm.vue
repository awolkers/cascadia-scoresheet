<script setup lang="ts">
const store = useGameStore();
const numberOfPlayers = ref(2);

const confirmDialogOpen = ref(false);

const onSubmitHandler = () => {
  confirmDialogOpen.value = true;
};

const onNewSessionHandler = () => {
  confirmDialogOpen.value = false;
  store.$reset();
  store.setPlayers(Array(numberOfPlayers.value).fill({ name: 'Arno' }));
  store.initScoreSheet();
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

    <BaseButton type="submit" label="Start new game" />

    <BaseDialog :open="confirmDialogOpen" @close="confirmDialogOpen = false">
      <h3>Are you sure you want to start a new game session?</h3>
      <p>All existing game data including the history will be lost.</p>
      <BaseButtonGroup>
        <BaseButton label="Yes" @click="onNewSessionHandler" />
        <BaseButton label="Cancel" secondary @click="confirmDialogOpen = false" />
      </BaseButtonGroup>
    </BaseDialog>
  </form>
</template>
