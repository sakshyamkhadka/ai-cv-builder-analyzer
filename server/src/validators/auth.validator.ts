  import { z } from 'zod'

  import {
    personNameSchema,
    phoneSchema
  } from './common.validator.js'

  const passwordSchema = z
    .string()
    .min(
      8,
      'Password must be at least 8 characters'
    )
    .max(
      100,
      'Password must be 100 characters or less'
    )
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      'Password must contain at least one letter and one number'
    )

  const emailSchema = z
    .string()
    .trim()
    .toLowerCase()
    .email('Invalid email address')
    .max(
      254,
      'Email address is too long'
    )

  const optionalPhoneSchema = z.preprocess(
    (value) =>
      value === '' ||
      value === null
        ? undefined
        : value,
    phoneSchema.optional()
  )

  export const registerSchema =
    z.object({
      name: personNameSchema,

      email: emailSchema,

      password: passwordSchema,

      phone: optionalPhoneSchema
    })

  export const loginSchema =
    z.object({
      email: emailSchema,

      password: z
        .string()
        .min(
          1,
          'Password is required'
        )
    })

  export const updateProfileSchema =
    z.object({
      name: personNameSchema,

      phone: optionalPhoneSchema
    })

  export const resendVerificationSchema =
    z.object({
      email: emailSchema
    })

  export const forgotPasswordSchema =
    z.object({
      email: emailSchema
    })

  export const resetPasswordSchema =
    z.object({
      token: z
        .string()
        .trim()
        .min(
          1,
          'Reset token is required'
        ),

      password: passwordSchema
    })