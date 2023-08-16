<script setup lang="ts">
const store = useGameStore();
const numberOfPlayers = ref(1);

const onSubmitHandler = () => {
  store.setPlayers(Array(numberOfPlayers.value).fill({ name: 'Arno' }));
  store.initNewGame();
};

const onResetHandler = () => {
  store.$reset();
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
    <BaseButton label="Reset" @click="onResetHandler" />
  </form>
</template>
