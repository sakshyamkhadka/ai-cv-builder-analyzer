import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {
  createLanguage,
  getLanguages,
  updateLanguage,
  deleteLanguage
} from '../controllers/language.controller.js'

const languageRoutes = new Hono()

languageRoutes.post('/:cvId', authMiddleware, createLanguage)
languageRoutes.get('/:cvId', authMiddleware, getLanguages)
languageRoutes.put('/:cvId/:languageId', authMiddleware, updateLanguage)
languageRoutes.delete('/:cvId/:languageId', authMiddleware, deleteLanguage)

export default languageRoutes