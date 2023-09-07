<script setup lang="ts">
const store = useGameStore();

const [isDialogOpen, toggleDialog] = useToggle(false);

const isWinner = (playerIndex: number) => {
  return store.scoreSheet?.winners.includes(playerIndex);
};

const onSubmitHandler = () => {
  toggleDialog();
};

const onNewGameHandler = () => {
  store.initScoreSheet();
};

const onFinishGameHandler = () => {
  toggleDialog();

  store.calculateBonusScores();
  store.calculateTotalScores();
  store.calculateWinner();
  store.addToHistory();
};

const onFocusHandler = (event: Event) => {
  (event.target as HTMLInputElement).select();
};
</script>

<template>
  <form v-if="store.scoreSheet" @submit.prevent="onSubmitHandler">
    <table :class="$style['score-sheet']">
      <thead>
        <tr>
          <td></td>
          <th v-for="(player, index) in store.players" :key="index">
            {{ player.name }}
            <span v-if="store.gamesWon(index)">({{ store.gamesWon(index) }})</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <template v-for="section in ['wildlife', 'habitats']" :key="section">
          <tr v-for="(scores, animal) in store.scoreSheet[section]" :key="animal">
            <th>{{ $t(`${section}.${animal}`, 2) }}</th>
            <td v-for="(score, index) in scores" :key="index">
              <input
                v-model.number="score.score"
                :disabled="store.isGameFinished"
                type="number"
                max="99"
                step="1"
                min="0"
                required
                @focus="onFocusHandler"
              />
              <template v-if="typeof score.bonus === 'number'">{{ score.bonus }}</template>
            </td>
          </tr>
          <tr>
            <th>subtotaal {{ section }}</th>
            <td v-for="(score, index) in store.scoreSheet.totals[section]" :key="index">
              {{ score }}
            </td>
          </tr>
        </template>
        <tr>
          <th>{{ $t('tokens.nature', 2) }}</th>
          <td v-for="(score, index) in store.scoreSheet.natureTokens" :key="index">
            <input
              v-model.number="score.score"
              :disabled="store.isGameFinished"
              type="number"
              max="25"
              step="1"
              min="0"
              required
              @focus="onFocusHandler"
            />
          </td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <th>Total</th>
          <td
            v-for="(score, index) in store.scoreSheet.totals.total"
            :key="index"
            :class="isWinner(index) ? $style['score-sheet__winner'] : null"
          >
            {{ score }}
          </td>
        </tr>
      </tfoot>
    </table>
    <BaseButton v-if="!store.isGameFinished" type="submit" label="Calculate totals" />
    <BaseButton v-if="store.isGameFinished" type="button" label="Start new game" @click="onNewGameHandler" />

    <BaseDialog :open="isDialogOpen" @close="toggleDialog(false)">
      <h3>Are you sure?</h3>
      <p>This will finish the game and calculates the winner. Make sure all scores are filled in correctly.</p>
      <BaseButtonGroup>
        <BaseButton label="Continue" @click="onFinishGameHandler" />
        <BaseButton label="Cancel" secondary @click="toggleDialog()" />
      </BaseButtonGroup>
    </BaseDialog>
  </form>
</template>

<style module>
.score-sheet {
  border-collapse: collapse;
  width: 100%;
}

.score-sheet td,
.score-sheet th {
  border: 1px solid var(--color-secondary);
  font-size: clamp(0.75rem, 0.1875rem + 2.5vw, 1.125rem);
  text-align: center;
}

.score-sheet__winner {
  background-color: var(--color-secondary);
  color: var(--color-white);
}
</style>
