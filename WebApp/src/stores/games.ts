import { getGames } from '../services/firestore';

export function useGames() {
  return {
    getGames,
  };
}
