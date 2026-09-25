import { z } from 'zod'

export const createTemplateSchema = z.object({
  name: z
    .string()
    .min(1, 'Template name is required'),

  slug: z
    .string()
    .min(1, 'Template slug is required'),

  description: z
    .string()
    .optional(),

  previewImage: z
    .string()
    .optional(),

  isActive: z
    .boolean()
    .optional()
})

export const updateTemplateSchema = z.object({
  name: z
    .string()
    .min(1, 'Template name is required')
    .optional(),

  slug: z
    .string()
    .min(1, 'Template slug is required')
    .optional(),

  description: z
    .string()
    .optional(),

  previewImage: z
    .string()
    .optional(),

  isActive: z
    .boolean()
    .optional()
})