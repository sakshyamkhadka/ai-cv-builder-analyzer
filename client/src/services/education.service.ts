import { api } from './api'

export interface Education {
  id: number
  cvId: number
  institution: string
  degree: string
  field: string | null
  startDate: string | null
  endDate: string | null
  description: string | null
}

interface EducationResponse {
  success: boolean
  message?: string
  education?: Education
}

interface EducationListResponse {
  success: boolean
  message?: string
  education: Education[]
}

export const getEducation = (
  token: string,
  cvId: number
) => {
  return api<EducationListResponse>(
    `/education/${cvId}`,
    {
      method: 'GET',
      token
    }
  )
}

export const createEducation = (
  token: string,
  cvId: number,
  data: {
    institution: string
    degree: string
    field?: string
    startDate?: string
    endDate?: string
    description?: string
  }
) => {
  return api<EducationResponse>(
    `/education/${cvId}`,
    {
      method: 'POST',
      token,
      body: JSON.stringify(data)
    }
  )
}

export const updateEducation = (
  token: string,
  cvId: number,
  educationId: number,
  data: {
    institution: string
    degree: string
    field?: string
    startDate?: string
    endDate?: string
    description?: string
  }
) => {
  return api<EducationResponse>(
    `/education/${cvId}/${educationId}`,
    {
      method: 'PUT',
      token,
      body: JSON.stringify(data)
    }
  )
}

export const deleteEducation = (
  token: string,
  cvId: number,
  educationId: number
) => {
  return api<EducationResponse>(
    `/education/${cvId}/${educationId}`,
    {
      method: 'DELETE',
      token
    }
  )
}