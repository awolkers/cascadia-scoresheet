<script setup lang="ts">
const store = useGameStore();

const onSubmitHandler = () => {
  store.calculateBonusScores();
  store.calculateTotalScores();
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

      <tbody>
        <template v-for="section in ['wildlife', 'habitats']" :key="section">
          <tr v-for="(scores, animal) in store.scoreSheet[section]" :key="animal">
            <th>{{ $t(`${section}.${animal}`, 2) }}</th>
            <td v-for="(score, index) in scores" :key="index">
              <input v-model.lazy.number="score.score" type="number" max="99" step="1" min="0" required />
              <template v-if="typeof score.bonus === 'number'">{{ score.bonus }}</template>
            </td>
          </tr>
          <tr>
            <th>subtotaal {{ section }}</th>
            <td v-for="(score, index) in store.scoreSheet.totals[section]" :key="index">
              {{ score.score }}
            </td>
          </tr>
        </template>
        <tr>
          <th>nature tokens</th>
          <td v-for="(score, index) in store.scoreSheet.natureTokens" :key="index">
            <input v-model.lazy.number="score.score" type="number" max="99" step="1" min="0" required />
          </td>
        </tr>
      </tbody>

      <!-- <tbody v-for="(entities, sectionName) in store.scoreSheet" :key="sectionName">
        <tr v-for="(entityScores, entityName) in entities" :key="entityName">
          <th>{{ $t(`${sectionName}.${entityName}`, 2) }}</th>
          <td v-for="(score, index) in entityScores" :key="index">
            <input
              v-model.lazy.number="store.scoreSheet[sectionName][entityName][index]"
              type="number"
              max="999"
              step="1"
              min="0"
              required
            />
          </td>
        </tr>
        <tr>
          <th>subtotaal {{ sectionName }}</th>
          <td v-for="(_player, index) in store.players" :key="index">
            {{ store.getSectionScore(sectionName, index) }}
          </td>
        </tr>
      </tbody> -->
      <tfoot>
        <tr>
          <th>Total</th>
          <td v-for="(scores, index) in store.scoreSheet.totals.total" :key="index">
            {{ scores.score }}
          </td>
        </tr>
      </tfoot>
    </table>
    <BaseButton type="submit" label="Calculate scores" />
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
