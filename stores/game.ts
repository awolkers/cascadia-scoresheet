import { defineStore, acceptHMRUpdate } from 'pinia';

interface Player {
  name: string;
}

interface EntityScore {
  score: number | null;
  bonus: number | null;
}

type PlayersScore = EntityScore[];
type PlayersTotals = Array<number | null>;

interface ScoreSheet {
  wildlife: {
    bear: PlayersScore;
    elk: PlayersScore;
    salmon: PlayersScore;
    hawk: PlayersScore;
    fox: PlayersScore;
  };
  habitats: {
    forest: PlayersScore;
    mountain: PlayersScore;
    prairie: PlayersScore;
    river: PlayersScore;
    wetland: PlayersScore;
  };
  natureTokens: PlayersScore;

  totals: {
    habitats: Array<number | null>;
    wildlife: Array<number | null>;
    total: Array<number | null>;
  };
  winners: Array<number>;
}

// interface ScoreSheet {
//   wildlife: Record<string, PlayerScores>;
//   habitats: Record<string, PlayerScores[]>;
//   natureTokens: PlayerScores;
//   totals: Record<string, PlayerScores>;
// }

// interface ScoreSheet {
//   wildlife: Record<string, PlayerScores>;
//   habitats: Record<string, PlayerScores[]>;
//   natureTokens: PlayerScores;
//   totals: Record<string, PlayerScores>;
// }

interface State {
  players: Player[];
  scoreSheet: ScoreSheet | null;
  history: ScoreSheet[];
}

export const useGameStore = defineStore('game', {
  state: (): State => ({
    players: [],
    scoreSheet: null,
    history: [],
  }),

  getters: {
    gamesInHistory: (state) => state.history.length,

    gamesWon: (state) => {
      return (playerId) =>
        state.history.reduce((acc, scoreSheet) => (scoreSheet.winners.includes(playerId) ? acc + 1 : acc), 0);
    },

    totalScore: (state) => {
      return (playerId) => state.history.reduce((acc, scoreSheet) => scoreSheet.totals.total[playerId] + acc, 0);
    },

    isGameFinished: (state) => {
      return state.scoreSheet !== null && state.scoreSheet.winners.length > 0;
    },
  },

  actions: {
    setPlayers(players: Player[]): void {
      this.players = players;
    },

    addToHistory(): void {
      if (!this.scoreSheet) return;

      this.history.push(JSON.parse(JSON.stringify(this.scoreSheet)));
    },

    calculateBonusScores(): void {
      if (!this.scoreSheet) return;
      for (const [habitat, scores] of Object.entries(this.scoreSheet.habitats)) {
        const scoreOccurrences: Record<string, number> = {};
        const topScoresSorted = [
          ...new Set(
            scores
              .map((score) => score.score || 0)
              .sort((a, b) => a - b)
              .reverse()
          ),
        ];

        scores.forEach((score) => {
          if (score.score === null) return;

          const key = score.score;
          scoreOccurrences[key] ? (scoreOccurrences[key] += 1) : (scoreOccurrences[key] = 1);
        });

        scores.forEach((score) => {
          if (score.score === null) return;

          switch (this.players.length) {
            case 1:
              if (score.score >= 7) score.bonus = 2;
              break;
            case 2:
              if (scoreOccurrences[score.score] === 2) {
                score.bonus = 1; // tied scores
              } else if (topScoresSorted.indexOf(score.score) === 0) {
                score.bonus = 2; // highest score
              } else {
                score.bonus = 0; // no score
              }
              break;
            case 3:
            case 4:
              if (topScoresSorted.indexOf(score.score) === 0 && scoreOccurrences[score.score] === 1) {
                score.bonus = 3; // is only player with largest habitat
              } else if (topScoresSorted.indexOf(score.score) === 0 && scoreOccurrences[score.score] === 2) {
                score.bonus = 2; // is one of two players largest habitat
              } else if (topScoresSorted.indexOf(score.score) === 0 && scoreOccurrences[score.score] > 2) {
                score.bonus = 1; // is one of three or four players with largest habitat
              } else if (
                topScoresSorted.indexOf(score.score) === 1 &&
                scoreOccurrences[score.score] === 1 &&
                scoreOccurrences[topScoresSorted[0]] === 1
              ) {
                score.bonus = 1; //  is only player with second largest habitat and only one player has largest habitat
              } else {
                score.bonus = 0; // no score
              }
              break;
          }
        });
      }
    },

    calculateTotalScores(): void {
      this.players.forEach((_player, index) => {
        if (!this.scoreSheet) return;

        this.scoreSheet.totals.wildlife[index] = Object.values(this.scoreSheet.wildlife).reduce(function (
          previous,
          scores
        ) {
          return previous + (scores[index].score || 0) + (scores[index].bonus || 0);
        }, 0);

        this.scoreSheet.totals.habitats[index] = Object.values(this.scoreSheet.habitats).reduce(function (
          previous,
          scores
        ) {
          return previous + (scores[index].score || 0) + (scores[index].bonus || 0);
        }, 0);

        this.scoreSheet.totals.total[index] =
          this.scoreSheet.natureTokens[index].score +
          this.scoreSheet.totals.wildlife[index] +
          this.scoreSheet.totals.habitats[index];
      });
    },

    calculateWinner() {
      if (!this.scoreSheet) return;

      const highScore = Math.max(...this.scoreSheet.totals.total);

      const playersWithHighScore = this.scoreSheet.totals.total.reduce(
        (acc: number[], score, index) => (score === highScore && acc.push(index), acc),
        []
      );

      const natureTokensHighScore = Math.max(
        ...this.scoreSheet.natureTokens
          .filter((scores, index) => playersWithHighScore.includes(index))
          .map((scores) => scores.score)
      );

      this.scoreSheet.winners = playersWithHighScore.filter((playerIndex) => {
        return this.scoreSheet.natureTokens[playerIndex].score === natureTokensHighScore;
      });
    },

    initScoreSheet(): void {
      const scores: PlayersScore = Array(this.players.length).fill({ score: 0, bonus: null });
      const totals: PlayersTotals = Array(this.players.length).fill(null);

      this.scoreSheet = {
        wildlife: {
          bear: JSON.parse(JSON.stringify(scores)),
          elk: JSON.parse(JSON.stringify(scores)),
          salmon: JSON.parse(JSON.stringify(scores)),
          hawk: JSON.parse(JSON.stringify(scores)),
          fox: JSON.parse(JSON.stringify(scores)),
        },
        habitats: {
          forest: JSON.parse(JSON.stringify(scores)),
          mountain: JSON.parse(JSON.stringify(scores)),
          prairie: JSON.parse(JSON.stringify(scores)),
          river: JSON.parse(JSON.stringify(scores)),
          wetland: JSON.parse(JSON.stringify(scores)),
        },
        natureTokens: JSON.parse(JSON.stringify(scores)),
        totals: {
          habitats: JSON.parse(JSON.stringify(totals)),
          wildlife: JSON.parse(JSON.stringify(totals)),
          total: JSON.parse(JSON.stringify(totals)),
        },
        winners: [],
      };
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
