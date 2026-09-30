import { z } from 'zod'

import {
  optionalUrlSchema
} from './common.validator.js'

const certificationNameSchema = z
  .string()
  .trim()
  .min(
    2,
    'Certification name must be at least 2 characters'
  )
  .max(
    200,
    'Certification name must be 200 characters or less'
  )
  .regex(
    /^[\p{L}\p{N}\s&.'’(),:/#+_-]+$/u,
    'Certification name contains invalid characters'
  )

const organizationSchema = z
  .string()
  .trim()
  .min(
    2,
    'Organization must be at least 2 characters'
  )
  .max(
    200,
    'Organization must be 200 characters or less'
  )
  .regex(
    /^[\p{L}\p{N}\s&.'’(),:/#+_-]+$/u,
    'Organization contains invalid characters'
  )

const requiredIssueDateSchema =
  z.preprocess(
    (value) =>
      value === '' || value === null
        ? undefined
        : value,
    z
      .string()
      .trim()
      .regex(
        /^(19|20)\d{2}(?:-(0[1-9]|1[0-2]))?$/,
        'Issue date must be in YYYY or YYYY-MM format'
      )
  )

const credentialUrlSchema =
  z.preprocess(
    (value) =>
      value === '' || value === null
        ? undefined
        : value,
    optionalUrlSchema
  )

export const createCertificationSchema =
  z.object({
    name: certificationNameSchema,

    organization:
      organizationSchema,

    issueDate:
      requiredIssueDateSchema,

    credentialUrl:
      credentialUrlSchema
  })

export const updateCertificationSchema =
  createCertificationSchema