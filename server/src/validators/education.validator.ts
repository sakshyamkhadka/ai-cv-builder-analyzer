import { z } from 'zod'

export const createEducationSchema = z.object({
  institution: z
    .string()
    .min(1, 'Institution is required'),

  degree: z
    .string()
    .min(1, 'Degree is required'),

  field: z
    .string()
    .optional(),

  startDate: z
    .string()
    .optional(),

  endDate: z
    .string()
    .optional(),

  description: z
    .string()
    .optional()
})

export const updateEducationSchema = createEducationSchema