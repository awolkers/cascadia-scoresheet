<script setup lang="ts">
const store = useGameStore();
const numberOfPlayers = ref(2);
const playerInitials = ref(['', '', '', '']);

const confirmDialogOpen = ref(false);

const onSubmitHandler = () => {
  confirmDialogOpen.value = true;
};

const onNewSessionHandler = () => {
  confirmDialogOpen.value = false;
  store.$reset();

  const players = [];

  for (let index = 0; index < numberOfPlayers.value; index++) {
    players.push({ name: playerInitials.value[index] });
  }

  store.setPlayers(players);
  store.initScoreSheet();
};
</script>

<template>
  <form @submit.prevent="onSubmitHandler">
    <h2>New game</h2>
    <label for="players">Number of players</label>
    <select v-model.number="numberOfPlayers">
      <option v-for="index in 4" :key="index" :value="index" :selected="index === numberOfPlayers">{{ index }}</option>
    </select>

    <div v-for="index in numberOfPlayers" :key="index">
      <h3>Player {{ index }}</h3>
      <label :for="`playerInitials${index}`">Initials</label>
      <input
        :id="`playerInitials${index}`"
        v-model.trim="playerInitials[index - 1]"
        pattern="[a-zA-Z]+"
        type="text"
        maxlength="4"
        required
      />
    </div>

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
