<script setup>
const store = useGameStore();

useSeoMeta({
  title: 'History',
});
</script>

<template>
  <div>
    <h1>History</h1>
    <template v-if="store.history.length">
      <WinsSummary />
      <GamesList :score-sheets="store.history" :players="store.players" />
    </template>
    <p>Todo history:</p>
    <ul>
      <li>History add end date to game</li>
    </ul>
    <p>Todo homepage:</p>
    <ul>
      <li>style score sheet</li>
      <li>style new game form</li>
      <li>Add best of x games</li>
      <li>a11y label for input fields</li>
    </ul>
  </div>
</template>
