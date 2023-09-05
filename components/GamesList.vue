<script setup lang="ts">
interface Props {
  scoreSheets?: [];
  players?: [];
}

const props = withDefaults(defineProps<Props>(), {
  // games: [],
  // players: [],
});
</script>
<template>
  <ul :class="$style['games-list']">
    <li v-for="(scoreSheet, index) in scoreSheets" :key="index" :class="$style['games-list__item']">
      <ScoreSheetSummary :score-sheet="scoreSheet" :players="players" />
    </li>
  </ul>
</template>

<style module>
.games-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid orangered;
}

.games-list__item:not(:last-child) {
  padding-bottom: var(--space-16);
}
</style>
