import { z } from 'zod'

import {
  optionalTextSchema,
  yearSchema
} from './common.validator.js'

const educationTextSchema = (
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
      /^[\p{L}\p{N}\s&.'’(),/-]+$/u,
      `${field} contains invalid characters`
    )

const optionalStartDateSchema =
  z.preprocess(
    (value) =>
      value === '' ||
      value === null
        ? undefined
        : value,
    yearSchema.optional()
  )

const optionalEndDateSchema =
  z.preprocess(
    (value) =>
      value === '' ||
      value === null
        ? undefined
        : value,
    yearSchema.optional()
  )

const createEducationSchemaBase =
  z.object({
    institution: educationTextSchema(
      'Institution',
      200
    ),

    degree: educationTextSchema(
      'Degree',
      150
    ),

    field: z.preprocess(
      (value) =>
        value === '' ||
        value === null
          ? undefined
          : value,
      educationTextSchema(
        'Field of study',
        150
      ).optional()
    ),

    startDate:
      optionalStartDateSchema,

    endDate:
      optionalEndDateSchema,

    currentlyStudying:
      z.boolean().default(false),

    description:
      optionalTextSchema(1000)
  })

export const createEducationSchema =
  createEducationSchemaBase.superRefine(
    (data, ctx) => {
      if (
        data.currentlyStudying &&
        data.endDate
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['endDate'],
          message:
            'End year must be empty when currently studying'
        })
      }

      if (
        !data.currentlyStudying &&
        data.startDate &&
        data.endDate &&
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

export const updateEducationSchema = createEducationSchema