<script setup lang="ts">
import { useGameStore } from '~/stores/game';

const store = useGameStore();

const onSubmitHandler = () => {
  console.log('submit form');
  if (store.players.length === 1) {
    store.setPlayers([{ name: 'Arno' }, { name: 'Jolanda' }]);
  } else {
    store.$reset();
  }
};
</script>

<template>
  <form @submit.prevent="onSubmitHandler">
    <h2>New game</h2>
    <label for="players">Number of players</label>
    <select>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>

    <p v-for="player in store.players" :key="player.name">{{ player.name }}</p>

    <BaseButton type="submit" label="Start new game" />
  </form>
</template>
