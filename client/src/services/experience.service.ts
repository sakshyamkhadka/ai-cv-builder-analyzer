import { api } from './api'

export interface Experience {
  id: number
  cvId: number
  company: string
  position: string
  startDate: string | null
  endDate: string | null
  description: string | null
}

interface ExperienceResponse {
  success: boolean
  message?: string
  experience?: Experience
}

interface ExperienceListResponse {
  success: boolean
  message?: string
  experiences: Experience[]
}

export const getExperiences = (
  token: string,
  cvId: number
) => {
  return api<ExperienceListResponse>(
    `/experience/${cvId}`,
    {
      method: 'GET',
      token
    }
  )
}

export const createExperience = (
  token: string,
  cvId: number,
  data: {
    company: string
    position: string
    startDate?: string
    endDate?: string
    description?: string
  }
) => {
  return api<ExperienceResponse>(
    `/experience/${cvId}`,
    {
      method: 'POST',
      token,
      body: JSON.stringify(data)
    }
  )
}

export const updateExperience = (
  token: string,
  cvId: number,
  experienceId: number,
  data: {
    company: string
    position: string
    startDate?: string
    endDate?: string
    description?: string
  }
) => {
  return api<ExperienceResponse>(
    `/experience/${cvId}/${experienceId}`,
    {
      method: 'PUT',
      token,
      body: JSON.stringify(data)
    }
  )
}

export const deleteExperience = (
  token: string,
  cvId: number,
  experienceId: number
) => {
  return api<ExperienceResponse>(
    `/experience/${cvId}/${experienceId}`,
    {
      method: 'DELETE',
      token
    }
  )
}