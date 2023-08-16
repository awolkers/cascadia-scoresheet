<script setup lang="ts">
const store = useGameStore();

const onSubmitHandler = () => {
  console.log('submit score');
};
</script>

<template>
  <form @submit.prevent="onSubmitHandler">
    <table v-if="store.scoreSheet" :class="$style['score-sheet']">
      <thead>
        <tr>
          <td></td>
          <th v-for="(player, index) in store.players" :key="index">
            {{ player.name }}
          </th>
        </tr>
      </thead>

      <tbody v-for="(entities, sectionName) in store.scoreSheet" :key="sectionName">
        <tr v-for="(entityScores, entityName) in entities" :key="entityName">
          <th>{{ $t(`${sectionName}.${entityName}`, 2) }}</th>
          <td v-for="(score, index) in entityScores" :key="index">
            <input
              v-model.number="store.scoreSheet[sectionName][entityName][index]"
              type="number"
              max="999"
              step="1"
              min="0"
            />
          </td>
        </tr>
        <tr>
          <th>subtotaal {{ sectionName }}</th>
          <td v-for="(_player, index) in store.players" :key="index">
            {{ store.getSectionScore(sectionName, index) }}
          </td>
        </tr>
      </tbody>
    </table>
  </form>
</template>

<style module>
.score-sheet {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}

.score-sheet td,
.score-sheet th {
  border: 2px solid red;
  font-size: clamp(0.75rem, 0.1875rem + 2.5vw, 1.125rem);
}
</style>
