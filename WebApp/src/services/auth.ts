import {
  signInWithEmailAndPassword,
  signInAnonymously,
  updateProfile,
  createUserWithEmailAndPassword,
  UserCredential,
  signOut,
} from 'firebase/auth';
import { auth } from '../../firebase';


export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signInAsGuest = async (guestName: string) => {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;

    await updateProfile(user, { displayName: guestName });
    return user;
  } catch (error) {
    console.error('Error signing in as guest:', error);
    throw error;
  }
};

export const signUp = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};


export default {
  signIn,
  signInAsGuest,
  signUp,
  signOutUser
};
