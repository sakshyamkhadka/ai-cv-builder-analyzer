import { Hono } from 'hono'

import type { AppEnv } from '../middleware/auth.middleware.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import {
    createSkill,
    getSkills,
    updateSkill,
    deleteSkill
} from '../controllers/skill.controller.js'

const skillRoutes = new Hono<AppEnv>()

skillRoutes.post(
    '/:cvId',
    authMiddleware,
    createSkill
)

skillRoutes.get(
    '/:cvId',
    authMiddleware,
    getSkills
)

skillRoutes.put(
    '/:cvId/:skillId',
    authMiddleware,
    updateSkill
)

skillRoutes.delete(
    '/:cvId/:skillId',
    authMiddleware,
    deleteSkill
)

export default skillRoutes