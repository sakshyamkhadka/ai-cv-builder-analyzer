import { z } from 'zod'

import {
  optionalTextSchema,
  shortTextSchema,
  phoneSchema as commonPhoneSchema
} from './common.validator.js'

const templateIdSchema = z
  .number()
  .int('Template ID must be an integer')
  .positive('Template ID must be a positive number')

const summarySchema =
  optionalTextSchema(2000)

const fullNameSchema =
  optionalTextSchema(150)

const emailSchema = z
  .preprocess(
    (value) =>
      value === '' || value === null
        ? undefined
        : value,
    z
      .string()
      .trim()
      .email(
        'Please enter a valid email address'
      )
      .max(
        254,
        'Email must be 254 characters or less'
      )
      .optional()
  )

const phoneSchema = z.preprocess(
  (value) =>
    value === '' || value === null
      ? undefined
      : value,
  commonPhoneSchema.optional()
)

export const createCVSchema =
  z.object({
    title: shortTextSchema(
      'CV title',
      2,
      150
    ),

    fullName:
      fullNameSchema,

    email:
      emailSchema,

    phone:
      phoneSchema,

    templateId:
      templateIdSchema,

    summary:
      summarySchema
  })

export const updateCVSchema =
  z.object({
    title: shortTextSchema(
      'CV title',
      2,
      150
    ),

    fullName:
      fullNameSchema,

    email:
      emailSchema,

    phone:
      phoneSchema,

    templateId:
      templateIdSchema,

    summary:
      summarySchema
  })