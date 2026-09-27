import { api } from './api'

export interface Template {
  id: number
  name: string
  slug: string
  description: string | null
  previewImage: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface TemplateListResponse {
  success: boolean
  message?: string
  templates: Template[]
}

export const getTemplates = () => {
  return api<TemplateListResponse>('/templates', {
    method: 'GET'
  })
}