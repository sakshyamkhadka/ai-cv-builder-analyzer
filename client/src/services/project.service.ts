import { api } from './api'

export interface Project {
  id: number
  cvId: number
  name: string
  description: string | null
  technologies: string | null
  projectUrl: string | null
}

interface ProjectResponse {
  success: boolean
  message?: string
  project?: Project
}

interface ProjectListResponse {
  success: boolean
  message?: string
  projects: Project[]
}

export const getProjects = (
  token: string,
  cvId: number
) => {
  return api<ProjectListResponse>(
    `/projects/${cvId}`,
    {
      method: 'GET',
      token
    }
  )
}

export const createProject = (
  token: string,
  cvId: number,
  data: {
    name: string
    description?: string
    technologies?: string
    projectUrl?: string
  }
) => {
  return api<ProjectResponse>(
    `/projects/${cvId}`,
    {
      method: 'POST',
      token,
      body: JSON.stringify(data)
    }
  )
}

export const updateProject = (
  token: string,
  cvId: number,
  projectId: number,
  data: {
    name: string
    description?: string
    technologies?: string
    projectUrl?: string
  }
) => {
  return api<ProjectResponse>(
    `/projects/${cvId}/${projectId}`,
    {
      method: 'PUT',
      token,
      body: JSON.stringify(data)
    }
  )
}

export const deleteProject = (
  token: string,
  cvId: number,
  projectId: number
) => {
  return api<ProjectResponse>(
    `/projects/${cvId}/${projectId}`,
    {
      method: 'DELETE',
      token
    }
  )
}