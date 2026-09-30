import { z } from 'zod'

import {
  optionalTextSchema,
  optionalUrlSchema
} from './common.validator.js'

const projectNameSchema = z
  .string()
  .trim()
  .min(
    2,
    'Project name must be at least 2 characters'
  )
  .max(
    150,
    'Project name must be 150 characters or less'
  )
  .regex(
    /^[\p{L}\p{N}\s&.'’(),:/#+_-]+$/u,
    'Project name contains invalid characters'
  )

const technologiesSchema = z
  .string()
  .trim()
  .min(
    2,
    'Technologies must be at least 2 characters'
  )
  .max(
    500,
    'Technologies must be 500 characters or less'
  )
  .regex(
    /^[\p{L}\p{N}\s.,#+/&()'’:_-]+$/u,
    'Technologies contain invalid characters'
  )

const requiredTechnologiesSchema =
  z.preprocess(
    (value) =>
      value === '' || value === null
        ? undefined
        : value,
    technologiesSchema
  )

const optionalProjectUrlSchema =
  z.preprocess(
    (value) =>
      value === '' || value === null
        ? undefined
        : value,
    optionalUrlSchema
  )

export const createProjectSchema =
  z.object({
    name: projectNameSchema,

    description:
      optionalTextSchema(1500),

    technologies:
      requiredTechnologiesSchema,

    projectUrl:
      optionalProjectUrlSchema
  })

export const updateProjectSchema =
  createProjectSchema