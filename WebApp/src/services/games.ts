import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  Firestore,
} from 'firebase/firestore';
import type { Game, PlayerScore } from '../types/game';
import app from '../../firebase';

const db: Firestore = getFirestore(app);
const gamesCollection = collection(db, 'games');

/**
 * Fetch all Game documents from the "games" collection.
 */
export const getGames = async (): Promise<Game[]> => {
  try {
    const snapshot = await getDocs(gamesCollection);
    const games = snapshot.docs.map((d) => d.data() as Game);
    return games;
  } catch (error) {
    console.error('Error fetching games:', error);
    return [];
  }
};

/**
 * Fetch a single Game document by its Firestore document ID.
 * @param documentId The ID of the document you want to retrieve
 * @returns A `Game` object if found, otherwise `null`
 */
export const getGameById = async (documentId: string): Promise<Game | null> => {
  try {
    const docRef = doc(gamesCollection, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as Game;
    } else {
      return null;
    }
  } catch (error) {
    console.error(`Error fetching game with id=${documentId}:`, error);
    return null;
  }
};

/**
 * Update the score of a specific player in a Game document.
 * 
 * @param documentId The Firestore document ID of the Game
 * @param playerId The ID of the player whose score you want to update
 * @param newScore The new score value
 * @returns A Promise that resolves when the score is successfully updated
 */
export const updatePlayerScore = async (
  documentId: string,
  playerId: string,
  newScore: number
): Promise<void> => {
  try {
    const docRef = doc(gamesCollection, documentId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error(`Game with id "${documentId}" does not exist.`);
    }

    const gameData = docSnap.data() as Game;

    const updatedPlayers = gameData.players.map((playerScore: PlayerScore) => {
      if (playerScore.player.id === playerId) {
        return { ...playerScore, score: newScore };
      }
      return playerScore;
    });

    await updateDoc(docRef, {
      players: updatedPlayers,
    });
  } catch (error) {
    console.error(`Error updating score for player "${playerId}":`, error);
    throw error;
  }
};
