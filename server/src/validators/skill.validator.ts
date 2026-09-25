import { z } from 'zod'

export const createSkillSchema = z.object({
  name: z
    .string()
    .min(1, 'Skill name is required'),

  level: z
    .string()
    .optional()
})

export const updateSkillSchema = createSkillSchema