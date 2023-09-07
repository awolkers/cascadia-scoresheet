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
        <tr :class="$style['score-sheet__players']">
          <td></td>
          <th v-for="(player, index) in store.players" :key="index">
            {{ player.name }}
            <span v-if="store.gamesWon(index)">({{ store.gamesWon(index) }})</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(scores, animal) in store.scoreSheet.wildlife" :key="animal">
          <th>
            <WildLifeTile :animal="animal" />
          </th>
          <td v-for="(score, index) in scores" :key="index">
            <label class="sr-only" :for="`scoreH${animal}${index}`">{{
              $t('scores.scoreInputLabel', [$t(`wildlife.${animal}`), store.players[index].name])
            }}</label>
            <input
              :id="`scoreH${animal}${index}`"
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
        <tr :class="$style['score-sheet__subtotal']">
          <th>{{ $t('scores.subtotal') }}</th>
          <td v-for="(score, index) in store.scoreSheet.totals.wildlife" :key="index">
            {{ score }}
          </td>
        </tr>

        <tr v-for="(scores, habitat) in store.scoreSheet.habitats" :key="habitat">
          <th>
            {{ $t(`habitats.${habitat}`, 2) }}
          </th>
          <td v-for="(score, index) in scores" :key="index">
            <label class="sr-only" :for="`scoreH${habitat}${index}`">{{
              $t('scores.scoreInputLabel', [$t(`habitats.${habitat}`), store.players[index].name])
            }}</label>
            <input
              :id="`scoreH${habitat}${index}`"
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
        <tr :class="$style['score-sheet__subtotal']">
          <th>{{ $t('scores.subtotal') }}</th>
          <td v-for="(score, index) in store.scoreSheet.totals.habitats" :key="index">
            {{ score }}
          </td>
        </tr>

        <tr :class="$style['score-sheet__tokens']">
          <th>{{ $t('tokens.nature', 2) }}</th>
          <td v-for="(score, index) in store.scoreSheet.natureTokens" :key="index">
            <label class="sr-only" :for="`scoreNT${index}`">{{
              $t('scores.scoreInputLabel', [$t('tokens.nature', 2), store.players[index].name])
            }}</label>
            <input
              :id="`scoreNT${index}`"
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
        <tr :class="$style['score-sheet__total']">
          <th>{{ $t('scores.total') }}</th>
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
  max-width: 600px;
  margin-bottom: var(--space-16);
}

.score-sheet td,
.score-sheet th {
  border: 1px solid var(--color-secondary);
  font-size: clamp(0.75rem, 0.1875rem + 2.5vw, 1rem);
  text-align: center;
  padding: var(--space-base-unit);
}

.score-sheet th:first-child {
  text-align: left;
  border-right-width: 2px;
}

.score-sheet__players td {
  border-right-width: 2px;
}
.score-sheet__players td,
.score-sheet__players th {
  text-align: center;
  border-bottom-width: 2px;
}

.score-sheet__subtotal td,
.score-sheet__subtotal th {
  background: rgba(0, 0, 0, 0.05);
  border-bottom-width: 5px;
}

.score-sheet__total,
.score-sheet__total {
  background: rgba(68, 104, 44, 0.2);
}

.score-sheet__tokens td,
.score-sheet__tokens th {
  background: rgba(0, 0, 0, 0.05);
  border-bottom-width: 5px;
}

.score-sheet__winner {
  background-color: var(--color-secondary);
  color: var(--color-white);
}
</style>
