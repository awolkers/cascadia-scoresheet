import { defineStore, acceptHMRUpdate } from 'pinia';

interface Player {
  name: string;
}

interface EntityScore {
  score: number | null;
  bonus: number | null;
}

type PlayersScore = EntityScore[];

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

  // totals: Record<string, number | null>;
  totals: {
    habitats: number | null;
    wildlife: number | null;
    total: number | null;
  };
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
    //   getSectionScore: (state) => {
    //     return (sectionName: string, playerIndex: number) => {
    //       if (!state.scoreSheet) return;
    //       const section = state.scoreSheet[sectionName];
    //       return Object.keys(section).reduce(function (previous, key) {
    //         return previous + (section[key][playerIndex] || 0);
    //       }, 0);
    //     };
    //   },
  },

  actions: {
    setPlayers(players: Player[]): void {
      this.players = players;
    },

    moveToHistory(): void {
      if (!this.scoreSheet) return;

      this.history.push(this.scoreSheet);
      this.scoreSheet = null;
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

      // console.log(`${key}: ${value}`);
    },

    calculateTotalScores(): void {
      this.players.forEach((_player, index) => {
        if (!this.scoreSheet) return;

        this.scoreSheet.totals.wildlife[index].score = Object.values(this.scoreSheet.wildlife).reduce(function (
          previous,
          scores
        ) {
          return previous + (scores[index].score || 0) + (scores[index].bonus || 0);
        }, 0);
      });

      // this.scoreSheet = this.scoreSheet

      // calculate totals for wildlife
      // calculate bonuses for habitats
      // one player: 2 bonus habitat >= 7
      // two players: 2 bonus points for largest. 1 each if tie
      // three/four players: 3 bonus points for largest
      // calculate totals for habitats
      // calculate totals
    },

    initScoreSheet(): void {
      const scores: PlayersScore = Array(this.players.length).fill({ score: 1, bonus: null });

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
          habitats: JSON.parse(JSON.stringify(scores)),
          wildlife: JSON.parse(JSON.stringify(scores)),
          total: JSON.parse(JSON.stringify(scores)),
        },
      };
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
