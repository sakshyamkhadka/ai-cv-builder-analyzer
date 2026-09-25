import { Hono } from 'hono'

import type { AppEnv } from '../middleware/auth.middleware.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {
  createCV,
  getMyCVs,
  getCVById,
  updateCV,
  deleteCV
} from '../controllers/cv.controller.js'
const cvRoutes = new Hono<AppEnv>()

cvRoutes.post('/', authMiddleware, createCV)
cvRoutes.get('/', authMiddleware, getMyCVs)
cvRoutes.get('/:id', authMiddleware, getCVById)
cvRoutes.put('/:id', authMiddleware, updateCV)
cvRoutes.delete('/:id', authMiddleware, deleteCV)

export default cvRoutes 