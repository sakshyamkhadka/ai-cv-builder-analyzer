import { api } from './api'

export interface Language {
  id: number
  cvId: number
  name: string
  proficiency: string | null
}

interface LanguageResponse {
  success: boolean
  message?: string
  language?: Language
}

interface LanguageListResponse {
  success: boolean
  message?: string
  languages: Language[]
}

export const getLanguages = (
  token: string,
  cvId: number
) => {
  return api<LanguageListResponse>(
    `/languages/${cvId}`,
    {
      method: 'GET',
      token
    }
  )
}

export const createLanguage = (
  token: string,
  cvId: number,
  data: {
    name: string
    proficiency?: string
  }
) => {
  return api<LanguageResponse>(
    `/languages/${cvId}`,
    {
      method: 'POST',
      token,
      body: JSON.stringify(data)
    }
  )
}

export const updateLanguage = (
  token: string,
  cvId: number,
  languageId: number,
  data: {
    name: string
    proficiency?: string
  }
) => {
  return api<LanguageResponse>(
    `/languages/${cvId}/${languageId}`,
    {
      method: 'PUT',
      token,
      body: JSON.stringify(data)
    }
  )
}

export const deleteLanguage = (
  token: string,
  cvId: number,
  languageId: number
) => {
  return api<LanguageResponse>(
    `/languages/${cvId}/${languageId}`,
    {
      method: 'DELETE',
      token
    }
  )
}