import { api } from './api'

export interface CV {
  id: number
  userId: number
  title: string
  fullName: string | null
  email: string | null
  phone: string | null
  templateId: number
  summary: string | null
  createdAt: string
  updatedAt: string
}

interface CVResponse {
  success: boolean
  message?: string
  cv?: CV
}

interface CVListResponse {
  success: boolean
  message?: string
  cvs: CV[]
}

export const getMyCVs = (token: string) => {
  return api<CVListResponse>('/cv', {
    method: 'GET',
    token
  })
}

export const createCV = (
  token: string,
  data: {
    title: string
    fullName?: string
    email?: string
    phone?: string
    templateId: number
    summary?: string
  }
) => {
  return api<CVResponse>('/cv', {
    method: 'POST',
    token,
    body: JSON.stringify(data)
  })
}

export const getCVById = (
  token: string,
  id: number
) => {
  return api<CVResponse>(`/cv/${id}`, {
    method: 'GET',
    token
  })
}

export const updateCV = (
  token: string,
  id: number,
  data: {
    title: string
    fullName?: string
    email?: string
    phone?: string
    templateId: number
    summary?: string
  }
) => {
  return api<CVResponse>(`/cv/${id}`, {
    method: 'PUT',
    token,
    body: JSON.stringify(data)
  })
}

export const deleteCV = (
  token: string,
  id: number
) => {
  return api<CVResponse>(`/cv/${id}`, {
    method: 'DELETE',
    token
  })
}