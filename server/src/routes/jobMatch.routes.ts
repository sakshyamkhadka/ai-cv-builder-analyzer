import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {
  createJobMatch,
  getJobMatches,
  getJobMatchById,
  getJobMatchesByCV,
  updateJobMatch,
  deleteJobMatch
} from '../controllers/jobMatch.controller.js'

const jobMatchRoutes = new Hono()

jobMatchRoutes.post(
  '/',
  authMiddleware,
  createJobMatch
)

jobMatchRoutes.get(
  '/',
  authMiddleware,
  getJobMatches
)

jobMatchRoutes.get(
  '/cv/:cvId',
  authMiddleware,
  getJobMatchesByCV
)

jobMatchRoutes.get(
  '/:jobMatchId',
  authMiddleware,
  getJobMatchById
)

jobMatchRoutes.put(
  '/:jobMatchId',
  authMiddleware,
  updateJobMatch
)

jobMatchRoutes.delete(
  '/:jobMatchId',
  authMiddleware,
  deleteJobMatch
)

export default jobMatchRoutes