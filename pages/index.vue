<script setup lang="ts">
const store = useGameStore();
</script>

<template>
  <main>
    <NewGameForm v-if="!store.scoreSheet" />
    <ScoreSheet v-if="store.scoreSheet" />
  </main>
</template>
