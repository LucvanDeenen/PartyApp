import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore';
import type { Game } from '../types/game';
import app from '../../firebase';

const db: Firestore = getFirestore(app);
const gamesCollection = collection(db, 'games');

export const getGames = async (): Promise<Game[]> => {
  try {
    const snapshot = await getDocs(gamesCollection);
    const games = snapshot.docs.map((doc) => {
      return doc.data() as Game;
    });

    return games;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};
