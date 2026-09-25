import { Hono } from 'hono'

import type { AppEnv } from '../middleware/auth.middleware.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

import {
  createExperience,
  getExperiences,
  updateExperience,
  deleteExperience
} from '../controllers/experience.controller.js'

const experienceRoutes = new Hono<AppEnv>()

experienceRoutes.post(
  '/:cvId',
  authMiddleware,
  createExperience
)

experienceRoutes.get(
  '/:cvId',
  authMiddleware,
  getExperiences
)

experienceRoutes.put(
  '/:cvId/:experienceId',
  authMiddleware,
  updateExperience
)

experienceRoutes.delete(
  '/:cvId/:experienceId',
  authMiddleware,
  deleteExperience
)

export default experienceRoutes