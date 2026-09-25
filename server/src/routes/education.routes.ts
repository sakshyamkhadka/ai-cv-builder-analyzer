import { Hono } from 'hono'

import type { AppEnv } from '../middleware/auth.middleware.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {
  createEducation,
  getEducation,
  updateEducation,
  deleteEducation
} from '../controllers/education.controller.js'

const educationRoutes = new Hono<AppEnv>()

educationRoutes.post(
  '/:cvId',
  authMiddleware,
  createEducation
)

educationRoutes.get(
  '/:cvId',
  authMiddleware,
  getEducation
)

educationRoutes.put(
  '/:cvId/:educationId',
  authMiddleware,
  updateEducation
)

educationRoutes.delete(
  '/:cvId/:educationId',
  authMiddleware,
  deleteEducation
)

export default educationRoutes