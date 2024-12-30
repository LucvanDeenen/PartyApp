import { ref, provide, inject, InjectionKey } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

interface AuthStore {
  user: ReturnType<typeof ref<User | null>>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthSymbol: InjectionKey<AuthStore> = Symbol('auth')

export function createAuth() {
  const user = ref<User | null>(null)

  const login = async (email: string, password: string) => {

    // Simulate login - replace with actual login logic
    user.value = {
      id: 1,
      name: 'John Doe',
      email: email + password
    }
  }

  const logout = async () => {
    user.value = null
  }

  const store: AuthStore = {
    user,
    login,
    logout
  }

  provide(AuthSymbol, store)
  return store
}

export function useAuth(): AuthStore {
  const store = inject(AuthSymbol)
  if (!store) {
    throw new Error('Auth store not provided')
  }
  return store
}