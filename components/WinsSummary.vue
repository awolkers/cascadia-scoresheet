<script setup lang="ts">
const store = useGameStore();
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Player</th>
        <th>Wins</th>
        <th>Total score</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(player, index) in store.players" :key="index">
        <th>{{ player.name }}</th>
        <td>
          {{ store.gamesWon(index) }}
        </td>
        <td>
          {{ store.totalScore(index) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style module></style>
