<script setup lang="ts">
const store = useGameStore();
</script>

<template>
  <div>
    <NewGameForm v-if="!store.scoreSheet" />
    <ScoreSheet v-if="store.scoreSheet" />
  </div>
</template>
