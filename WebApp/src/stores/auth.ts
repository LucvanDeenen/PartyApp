import { ref, provide, inject, InjectionKey } from 'vue';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signInAnonymously,
  signOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import app from '../../firebase';

interface User {
  id: string;
  name: string | null;
  email: string | null;
  isGuest: boolean;
}

interface AuthStore {
  user: ReturnType<typeof ref<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  loginAsGuest: (guestName: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthState: () => void;
  updateProfileName: (name: string) => Promise<void>;
}

const AuthSymbol: InjectionKey<AuthStore> = Symbol('auth');

export function createAuth() {
  const auth = getAuth(app);
  const user = ref<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      user.value = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        isGuest: false
      };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const loginAsGuest = async (guestName: string) => {
    try {
      const userCredential = await signInAnonymously(auth);
      const firebaseUser = userCredential.user;
      
      // Set the display name for the anonymous user
      await updateProfile(firebaseUser, { displayName: guestName });
      
      user.value = {
        id: firebaseUser.uid,
        name: guestName,
        email: null,
        isGuest: true
      };
    } catch (error) {
      console.error('Guest login failed:', error);
      throw error;
    }
  };

  const updateProfileName = async (name: string) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw new Error('No user logged in');
      
      await updateProfile(currentUser, { displayName: name });
      if (user.value) {
        user.value.name = name;
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const checkAuthState = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          isGuest: firebaseUser.isAnonymous
        };
      } else {
        user.value = null;
      }
    });
  };

  const store: AuthStore = {
    user,
    login,
    loginAsGuest,
    logout,
    checkAuthState,
    updateProfileName
  };

  provide(AuthSymbol, store);
  return store;
}

export function useAuth(): AuthStore {
  const store = inject(AuthSymbol);
  if (!store) {
    throw new Error('Auth store not provided');
  }
  return store;
}