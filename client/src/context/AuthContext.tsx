import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react'

import {
  login as loginUser,
  type AuthUser,
  type LoginData
} from '../services/auth.service'

interface AuthContextType {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginData) => Promise<void>
  logout: () => void
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  )

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({
  children
}: AuthProviderProps) => {
  const [user, setUser] =
    useState<AuthUser | null>(null)

  const [token, setToken] =
    useState<string | null>(null)

  const [isLoading, setIsLoading] =
    useState(true)

  useEffect(() => {
    const storedToken =
      localStorage.getItem('authToken')

    const storedUser =
      localStorage.getItem('authUser')

    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUser')
      }
    }

    setIsLoading(false)
  }, [])

  const login = async (
    data: LoginData
  ) => {
    const response = await loginUser(data)

    if (!response.token || !response.user) {
      throw new Error(
        'Invalid login response'
      )
    }

    localStorage.setItem(
      'authToken',
      response.token
    )

    localStorage.setItem(
      'authUser',
      JSON.stringify(response.user)
    )

    setToken(response.token)
    setUser(response.user)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')

    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    )
  }

  return context
}