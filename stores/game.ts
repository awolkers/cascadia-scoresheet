import { defineStore, acceptHMRUpdate } from 'pinia';

interface Player {
  name: string;
}

type PlayerScores = Array<number | null>;

interface ScoreSheet {
  habitats: {
    forest: PlayerScores;
    mountain: PlayerScores;
    prairie: PlayerScores;
    river: PlayerScores;
    wetland: PlayerScores;
  };
  wildlife: {
    bear: PlayerScores;
    elk: PlayerScores;
    salmon: PlayerScores;
    hawk: PlayerScores;
    fox: PlayerScores;
  };
  tokens: {
    nature: PlayerScores;
  };
}

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
    getSectionScore: (state) => {
      return (sectionName: string, playerIndex: number) => {
        if (!state.scoreSheet) return;

        const section = state.scoreSheet[sectionName];

        return Object.keys(section).reduce(function (previous, key) {
          return previous + (section[key][playerIndex] || 0);
        }, 0);
      };
    },
  },

  actions: {
    setPlayers(players: Player[]): void {
      this.players = players;
    },
    initNewGame(): void {
      const scores: PlayerScores = Array(this.players.length).fill(null);

      this.scoreSheet = {
        habitats: {
          forest: [...scores],
          mountain: [...scores],
          prairie: [...scores],
          river: [...scores],
          wetland: [...scores],
        },
        wildlife: {
          bear: [...scores],
          elk: [...scores],
          salmon: [...scores],
          hawk: [...scores],
          fox: [...scores],
        },
        tokens: {
          nature: [...scores],
        },
      };
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
