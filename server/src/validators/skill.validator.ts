import { z } from 'zod'

const skillNameSchema = z
  .string()
  .trim()
  .min(
    2,
    'Skill name must be at least 2 characters'
  )
  .max(
    100,
    'Skill name must be 100 characters or less'
  )
  .regex(
    /^[\p{L}\p{N}][\p{L}\p{N}\s+#.()/&,'’+_-]*$/u,
    'Skill name contains invalid characters'
  )

const requiredSkillLevelSchema =
  z.preprocess(
    (value) =>
      value === '' || value === null
        ? undefined
        : value,
    z.enum([
      'Beginner',
      'Intermediate',
      'Advanced',
      'Expert'
    ])
  )

export const createSkillSchema =
  z.object({
    name: skillNameSchema,

    level:
      requiredSkillLevelSchema
  })

export const updateSkillSchema =
  createSkillSchema