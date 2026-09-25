import { z } from 'zod'

export const createLanguageSchema = z.object({
  name: z
    .string()
    .min(1, 'Language name is required'),

  proficiency: z
    .string()
    .optional()
})

export const updateLanguageSchema = createLanguageSchema