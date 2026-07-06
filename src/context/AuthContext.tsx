import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import type { SavedUser } from "../types"

type LC_USER = SavedUser | null;

interface AuthContextInterface {
  currentUser: LC_USER,
  setCurrentUser: (user: LC_USER) => void
}

const LC_KEY = 'currentUser'
const AuthContext = createContext<AuthContextInterface | null>(null)

export function AuthProvider({children}: {children: ReactNode}) {
  const storedUser = localStorage.getItem(LC_KEY)
  const [currentUser, setCurrentUserState] = useState<LC_USER>(
    storedUser ? JSON.parse(storedUser) : null)

  const setCurrentUser = useCallback((user: LC_USER): void => {
      if (user) {
        localStorage.setItem(LC_KEY, JSON.stringify(user))
        setCurrentUserState(user)
      } else {
        localStorage.removeItem(LC_KEY)
        setCurrentUserState(null)
      }
    }, []
  );

  const value = useMemo(() => ({currentUser, setCurrentUser}), [currentUser, setCurrentUser])

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('You need to use context inside AuthContext.Provider')
  }
  return ctx;
}
