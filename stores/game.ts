import { defineStore, acceptHMRUpdate } from 'pinia';

interface Player {
  name: string;
  color: string;
}

interface Game {
  todo: string;
}

interface State {
  players: Player[];
  games: Game[];
}

export const useGameStore = defineStore('game', {
  state: (): State => ({
    players: [{ name: 'Bob', color: 'pink' }],
    games: [],
  }),

  getters: {},

  actions: {
    setPlayers(players: Player[]): void {
      this.players = players;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
