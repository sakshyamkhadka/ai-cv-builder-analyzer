import { z } from 'zod'

export const createCVAnalysisSchema = z.object({
  cvId: z
    .number()
    .int()
    .positive('CV ID is required'),

  overallScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .optional(),

  summary: z
    .string()
    .optional(),

  strengths: z
    .string()
    .optional(),

  weaknesses: z
    .string()
    .optional(),

  suggestions: z
    .string()
    .optional()
})

export const updateCVAnalysisSchema = z.object({
  overallScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .optional(),

  summary: z
    .string()
    .optional(),

  strengths: z
    .string()
    .optional(),

  weaknesses: z
    .string()
    .optional(),

  suggestions: z
    .string()
    .optional()
})