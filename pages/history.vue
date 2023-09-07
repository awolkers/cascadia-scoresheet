<script setup>
const store = useGameStore();

useSeoMeta({
  title: 'History',
});
</script>

<template>
  <main>
    <h2>History</h2>
    <template v-if="store.history.length">
      <WinsSummary />
      <GamesList :score-sheets="store.history" :players="store.players" />
    </template>
    <template v-else>
      <p>No game history available yet.</p>
    </template>
  </main>
</template>
