import { z } from 'zod'

export const createCertificationSchema = z.object({
  name: z
    .string()
    .min(1, 'Certification name is required'),

  organization: z
    .string()
    .optional(),

  issueDate: z
    .string()
    .optional(),

  credentialUrl: z
    .string()
    .optional()
})

export const updateCertificationSchema = createCertificationSchema