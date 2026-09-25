import { Hono } from 'hono'

import type { AppEnv } from '../middleware/auth.middleware.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

import {
  createCertification,
  getCertifications,
  updateCertification,
  deleteCertification
} from '../controllers/certification.controller.js'

const certificationRoutes = new Hono<AppEnv>()

certificationRoutes.post(
  '/:cvId',
  authMiddleware,
  createCertification
)

certificationRoutes.get(
  '/:cvId',
  authMiddleware,
  getCertifications
)

certificationRoutes.put(
  '/:cvId/:certificationId',
  authMiddleware,
  updateCertification
)

certificationRoutes.delete(
  '/:cvId/:certificationId',
  authMiddleware,
  deleteCertification
)

export default certificationRoutes