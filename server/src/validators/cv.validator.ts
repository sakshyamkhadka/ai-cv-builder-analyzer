import { z } from 'zod'

import {
  optionalTextSchema,
  shortTextSchema
} from './common.validator.js'

const templateIdSchema = z
  .number()
  .int('Template ID must be an integer')
  .positive('Template ID must be a positive number')

const summarySchema = optionalTextSchema(2000)

export const createCVSchema = z.object({
  title: shortTextSchema(
    'CV title',
    2,
    150
  ),

  templateId: templateIdSchema,

  summary: summarySchema
})

export const updateCVSchema =
  z.object({
    title: shortTextSchema(
      'CV title',
      2,
      150
    ),

    templateId: templateIdSchema,

    summary: summarySchema
  })