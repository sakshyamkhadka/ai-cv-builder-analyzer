import { api } from './api'

export interface Skill {
  id: number
  cvId: number
  name: string
  level: string | null
}

interface SkillResponse {
  success: boolean
  message?: string
  skill?: Skill
}

interface SkillListResponse {
  success: boolean
  message?: string
  skills: Skill[]
}

export const getSkills = (
  token: string,
  cvId: number
) => {
  return api<SkillListResponse>(
    `/skills/${cvId}`,
    {
      method: 'GET',
      token
    }
  )
}

export const createSkill = (
  token: string,
  cvId: number,
  data: {
    name: string
    level?: string
  }
) => {
  return api<SkillResponse>(
    `/skills/${cvId}`,
    {
      method: 'POST',
      token,
      body: JSON.stringify(data)
    }
  )
}

export const updateSkill = (
  token: string,
  cvId: number,
  skillId: number,
  data: {
    name: string
    level?: string
  }
) => {
  return api<SkillResponse>(
    `/skills/${cvId}/${skillId}`,
    {
      method: 'PUT',
      token,
      body: JSON.stringify(data)
    }
  )
}

export const deleteSkill = (
  token: string,
  cvId: number,
  skillId: number
) => {
  return api<SkillResponse>(
    `/skills/${cvId}/${skillId}`,
    {
      method: 'DELETE',
      token
    }
  )
}