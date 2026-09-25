import { api } from './api'

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthUser {
  id: number
  name: string
  email: string
  phone?: string | null
  role: string
  emailVerified: boolean
  createdAt: string
  updatedAt?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: AuthUser
}

export const register = (
  data: RegisterData
) => {
  return api<AuthResponse>(
    '/auth/register',
    {
      method: 'POST',
      body: JSON.stringify(data)
    }
  )
}

export const login = (
  data: LoginData
) => {
  return api<AuthResponse>(
    '/auth/login',
    {
      method: 'POST',
      body: JSON.stringify(data)
    }
  )
}

export const verifyEmail = (
  token: string
) => {
  return api<AuthResponse>(
    `/auth/verify-email?token=${encodeURIComponent(token)}`
  )
}

export const resendVerificationEmail = (
  email: string
) => {
  return api<AuthResponse>(
    '/auth/resend-verification',
    {
      method: 'POST',
      body: JSON.stringify({ email })
    }
  )
}

export const forgotPassword = (
  email: string
) => {
  return api<AuthResponse>(
    '/auth/forgot-password',
    {
      method: 'POST',
      body: JSON.stringify({ email })
    }
  )
}

export const resetPassword = (
  token: string,
  password: string
) => {
  return api<AuthResponse>(
    '/auth/reset-password',
    {
      method: 'POST',
      body: JSON.stringify({
        token,
        password
      })
    }
  )
}