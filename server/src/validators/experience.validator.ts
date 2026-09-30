import { z } from 'zod'

import {
  optionalTextSchema,
  yearSchema
} from './common.validator.js'

const experienceTextSchema = (
  field: string,
  max: number
) =>
  z
    .string()
    .trim()
    .min(
      2,
      `${field} must be at least 2 characters`
    )
    .max(
      max,
      `${field} must be ${max} characters or less`
    )
    .regex(
      /^[\p{L}\p{N}\s&.'’(),/@#+_-]+$/u,
      `${field} contains invalid characters`
    )

const requiredYearSchema = z.preprocess(
  (value) =>
    value === '' || value === null
      ? undefined
      : value,
  yearSchema
)

const endDateSchema = z.preprocess(
  (value) =>
    value === '' || value === null
      ? undefined
      : value,
  z.union([
    yearSchema,
    z.literal('Present')
  ])
)

const createExperienceSchemaBase =
  z.object({
    company: experienceTextSchema(
      'Company',
      200
    ),

    position: experienceTextSchema(
      'Position',
      150
    ),

    startDate: requiredYearSchema,

    endDate: endDateSchema,

    description: optionalTextSchema(1500)
  })

export const createExperienceSchema =
  createExperienceSchemaBase.superRefine(
    (data, ctx) => {
      if (
        data.endDate !== 'Present' &&
        Number(data.endDate) <
          Number(data.startDate)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['endDate'],
          message:
            'End year cannot be earlier than start year'
        })
      }
    }
  )

export const updateExperienceSchema =
  createExperienceSchema