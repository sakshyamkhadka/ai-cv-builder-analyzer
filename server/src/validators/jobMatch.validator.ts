import { z } from 'zod'

export const createJobMatchSchema = z.object({
  cvId: z
    .number()
    .int()
    .positive('CV ID is required'),

  jobDescriptionId: z
    .number()
    .int()
    .positive('Job description ID is required'),

  matchScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .optional(),

  matchingSkills: z
    .string()
    .optional(),

  missingSkills: z
    .string()
    .optional(),

  suggestions: z
    .string()
    .optional()
})

export const updateJobMatchSchema = z.object({
  matchScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .optional(),

  matchingSkills: z
    .string()
    .optional(),

  missingSkills: z
    .string()
    .optional(),

  suggestions: z
    .string()
    .optional()
})