import { z } from 'zod'

export const createCVSchema = z.object({
  title: z
    .string()
    .min(1, 'CV title is required'),

  templateId: z
    .number()
    .int()
    .positive('Template ID must be a positive number'),

  summary: z
    .string()
    .optional()
})
export const updateCVSchema = z.object({
  title: z
    .string()
    .min(1, 'CV title is required'),

  templateId: z
    .number()
    .int()
    .positive('Template ID must be a positive number'),

  summary: z
    .string()
    .optional()
})