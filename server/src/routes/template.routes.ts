import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {
  createTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate
} from '../controllers/template.controller.js'

const templateRoutes = new Hono()

templateRoutes.post(
  '/',
  authMiddleware,
  createTemplate
)

templateRoutes.get(
  '/',
  getTemplates
)

templateRoutes.get(
  '/:templateId',
  getTemplateById
)

templateRoutes.put(
  '/:templateId',
  authMiddleware,
  updateTemplate
)

templateRoutes.delete(
  '/:templateId',
  authMiddleware,
  deleteTemplate
)

export default templateRoutes