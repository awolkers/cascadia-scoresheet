<script setup lang="ts">
interface Props {
  scoreSheet: {};
  players: [];
}

const props = withDefaults(defineProps<Props>(), {});

const isWinner = (playerIndex: number) => {
  return props.scoreSheet.winners.includes(playerIndex);
};
</script>
<template>
  <table :class="$style['score-sheet']">
    <thead>
      <tr>
        <td></td>
        <th v-for="(player, index) in players" :key="index">
          {{ player.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>subtotaal wildlife</th>
        <td v-for="(score, index) in scoreSheet.totals.wildlife" :key="index">
          {{ score }}
        </td>
      </tr>
      <tr>
        <th>subtotaal habitats</th>
        <td v-for="(score, index) in scoreSheet.totals.habitats" :key="index">
          {{ score }}
        </td>
      </tr>
      <tr>
        <th>{{ $t('tokens.nature', 2) }}</th>
        <td v-for="(score, index) in scoreSheet.natureTokens" :key="index">
          {{ score.score }}
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <th>Total</th>
        <td
          v-for="(score, index) in scoreSheet.totals.total"
          :key="index"
          :class="isWinner(index) ? $style['score-sheet__winner'] : null"
        >
          {{ score }}
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<style module>
.score-sheet {
  border-collapse: collapse;
  width: 100%;
}

.score-sheet td,
.score-sheet th {
  border: 1px solid var(--color-secondary);
}
.score-sheet__winner {
  background-color: var(--color-secondary);
  color: var(--color-white);
}
</style>
