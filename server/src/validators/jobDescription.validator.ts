import { z } from 'zod'

export const createJobDescriptionSchema = z.object({
  title: z
    .string()
    .min(1, 'Job title is required'),

  company: z
    .string()
    .optional(),

  description: z
    .string()
    .min(1, 'Job description is required')
})

export const updateJobDescriptionSchema =
  createJobDescriptionSchema