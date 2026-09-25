import { Hono } from 'hono'
import type { AppEnv } from '../middleware/auth.middleware.js'
import {
  register,
  login,
  updateProfile
} from '../controllers/auth.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import { db } from '../prisma/db.js'

const authRoutes = new Hono<AppEnv>()


authRoutes.get('/test', (c) => {
  return c.json({
    success: true,
    message: 'Auth route is working'
  })
})

authRoutes.post('/register', register)
authRoutes.post('/login', login)

authRoutes.get('/me', authMiddleware, async (c) => {
  const authUser = c.get('user')

  const userId = Number(authUser.sub)

  const user = await db.orm.public.User
    .where({ id: userId })
    .first()

  if (!user) {
    return c.json(
      {
        success: false,
        message: 'User not found'
      },
      404
    )
  }

  return c.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  })
})

authRoutes.put('/profile', authMiddleware, updateProfile)
export default authRoutes