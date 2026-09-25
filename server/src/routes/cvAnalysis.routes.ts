import { Hono } from 'hono'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {
    createCVAnalysis,
    getCVAnalyses,
    getCVAnalysisById,
    updateCVAnalysis,
    deleteCVAnalysis
} from '../controllers/cvAnalysis.controller.js'

const cvAnalysisRoutes = new Hono()

cvAnalysisRoutes.post(
    '/',
    authMiddleware,
    createCVAnalysis
)

cvAnalysisRoutes.get(
    '/cv/:cvId',
    authMiddleware,
    getCVAnalyses
)

cvAnalysisRoutes.get(
    '/:analysisId',
    authMiddleware,
    getCVAnalysisById
)

cvAnalysisRoutes.put(
    '/:analysisId',
    authMiddleware,
    updateCVAnalysis
)

cvAnalysisRoutes.delete(
    '/:analysisId',
    authMiddleware,
    deleteCVAnalysis
)

export default cvAnalysisRoutes