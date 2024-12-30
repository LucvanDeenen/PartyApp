import { ref, provide, inject, InjectionKey } from 'vue';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import app from '../../firebase.ts';

interface User {
  id: string;
  name: string | null;
  email: string | null;
}

interface AuthStore {
  user: ReturnType<typeof ref<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthState: () => void;
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
      };
    } catch (error) {
      console.error('Login failed:', error);
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
        };
      } else {
        user.value = null;
      }
    });
  };

  const store: AuthStore = {
    user,
    login,
    logout,
    checkAuthState,
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
