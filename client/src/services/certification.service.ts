import { api } from './api'

export interface Certification {
  id: number
  cvId: number
  name: string
  organization: string | null
  issueDate: string | null
  credentialUrl: string | null
}

interface CertificationResponse {
  success: boolean
  message?: string
  certification?: Certification
}

interface CertificationListResponse {
  success: boolean
  message?: string
  certifications: Certification[]
}

export const getCertifications = (
  token: string,
  cvId: number
) => {
  return api<CertificationListResponse>(
    `/certifications/${cvId}`,
    {
      method: 'GET',
      token
    }
  )
}

export const createCertification = (
  token: string,
  cvId: number,
  data: {
    name: string
    organization?: string
    issueDate?: string
    credentialUrl?: string
  }
) => {
  return api<CertificationResponse>(
    `/certifications/${cvId}`,
    {
      method: 'POST',
      token,
      body: JSON.stringify(data)
    }
  )
}

export const updateCertification = (
  token: string,
  cvId: number,
  certificationId: number,
  data: {
    name: string
    organization?: string
    issueDate?: string
    credentialUrl?: string
  }
) => {
  return api<CertificationResponse>(
    `/certifications/${cvId}/${certificationId}`,
    {
      method: 'PUT',
      token,
      body: JSON.stringify(data)
    }
  )
}

export const deleteCertification = (
  token: string,
  cvId: number,
  certificationId: number
) => {
  return api<CertificationResponse>(
    `/certifications/${cvId}/${certificationId}`,
    {
      method: 'DELETE',
      token
    }
  )
}