import { createMiddleware } from 'hono/factory'
import { verify } from 'hono/jwt'
import type { JWTPayload } from 'hono/utils/jwt/types'

export type AppEnv = {
  Variables: {
    user: JWTPayload
  }
}

export const authMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  try {
    const authorization = c.req.header('Authorization')

    if (!authorization) {
      return c.json(
        {
          success: false,
          message: 'Authorization token is required'
        },
        401
      )
    }

    if (!authorization.startsWith('Bearer ')) {
      return c.json(
        {
          success: false,
          message: 'Invalid authorization format'
        },
        401
      )
    }

    const token = authorization.substring(7)

    const secret = process.env.JWT_SECRET

    if (!secret) {
      throw new Error('JWT_SECRET is not configured')
    }

    const payload = await verify(token, secret, 'HS256')

    c.set('user', payload)

    await next()
  } catch (error) {
    console.error('Authentication error:', error)

    return c.json(
      {
        success: false,
        message: 'Invalid or expired token'
      },
      401
    )
  }
})