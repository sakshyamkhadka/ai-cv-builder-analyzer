import { Hono } from 'hono'

import type { AppEnv } from '../middleware/auth.middleware.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

import {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} from '../controllers/project.controller.js'

const projectRoutes = new Hono<AppEnv>()

projectRoutes.post(
  '/:cvId',
  authMiddleware,
  createProject
)

projectRoutes.get(
  '/:cvId',
  authMiddleware,
  getProjects
)

projectRoutes.put(
  '/:cvId/:projectId',
  authMiddleware,
  updateProject
)

projectRoutes.delete(
  '/:cvId/:projectId',
  authMiddleware,
  deleteProject
)

export default projectRoutes