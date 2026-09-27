import { z } from 'zod'

export const personNameSchema = z
  .string()
  .trim()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be 100 characters or less')
  .regex(
    /^\p{L}+(?:[ '-]\p{L}+)*$/u,
    'Name can contain only letters, spaces, hyphens, and apostrophes'
  )

export const phoneSchema = z
  .string()
  .trim()
  .regex(
    /^\+?[1-9]\d{7,14}$/,
    'Invalid phone number'
  )

export const shortTextSchema = (
  field: string,
  min = 1,
  max = 150
) =>
  z
    .string()
    .trim()
    .min(min, `${field} is required`)
    .max(
      max,
      `${field} must be ${max} characters or less`
    )

export const optionalTextSchema = (
  max = 1000
) =>
  z
    .string()
    .trim()
    .max(
      max,
      `Text must be ${max} characters or less`
    )
    .optional()

export const urlSchema = z
  .string()
  .trim()
  .url('Invalid URL')
  .refine(
    (value) =>
      value.startsWith('http://') ||
      value.startsWith('https://'),
    'URL must start with http:// or https://'
  )

export const optionalUrlSchema = urlSchema.optional()

export const yearSchema = z
  .string()
  .trim()
  .regex(
    /^(19|20)\d{2}$/,
    'Enter a valid year'
  )