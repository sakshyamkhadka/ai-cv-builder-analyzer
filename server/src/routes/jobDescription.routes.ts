import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {
  createJobDescription,
  getJobDescriptions,
  getJobDescriptionById,
  updateJobDescription,
  deleteJobDescription
} from '../controllers/jobDescription.controller.js'

const jobDescriptionRoutes = new Hono()

jobDescriptionRoutes.post(
  '/',
  authMiddleware,
  createJobDescription
)

jobDescriptionRoutes.get(
  '/',
  authMiddleware,
  getJobDescriptions
)

jobDescriptionRoutes.get(
  '/:jobDescriptionId',
  authMiddleware,
  getJobDescriptionById
)

jobDescriptionRoutes.put(
  '/:jobDescriptionId',
  authMiddleware,
  updateJobDescription
)

jobDescriptionRoutes.delete(
  '/:jobDescriptionId',
  authMiddleware,
  deleteJobDescription
)

export default jobDescriptionRoutes