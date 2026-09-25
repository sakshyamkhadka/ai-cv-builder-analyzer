import type { Context } from 'hono'
import { sign } from 'hono/jwt'
import bcrypt from 'bcryptjs'

import { db } from '../prisma/db.js'

import {
  createEmailVerificationToken,
  hashEmailVerificationToken
} from '../utils/emailVerification.js'

import {
  sendVerificationEmail
} from '../services/email.service.js'

import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  resendVerificationSchema
} from '../validators/auth.validator.js'

export const register = async (c: Context) => {
  try {
    const body = await c.req.json()

    const result = registerSchema.safeParse(body)

    if (!result.success) {
      return c.json(
        {
          success: false,
          message: 'Validation failed',
          errors: result.error.flatten().fieldErrors
        },
        400
      )
    }

    const { name, email, password, phone } = result.data

    const normalizedEmail = email.toLowerCase().trim()

    const existingUser = await db.orm.public.User
      .where({ email: normalizedEmail })
      .first()

    if (existingUser) {
      return c.json(
        {
          success: false,
          message: 'Email is already registered'
        },
        409
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const {
      token: verificationToken,
      tokenHash: verificationTokenHash,
      expiresAt: verificationExpiresAt
    } = createEmailVerificationToken()

    const user = await db.orm.public.User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      phone: phone ?? null,
      emailVerified: false,
      emailVerificationTokenHash: verificationTokenHash,
      emailVerificationExpiresAt: verificationExpiresAt
    })

    await sendVerificationEmail({
      to: user.email,
      name: user.name,
      token: verificationToken
    })

    return c.json(
      {
        success: true,
        message:
          'Registration successful. Please check your email to verify your account.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          emailVerified: user.emailVerified,
          createdAt: user.createdAt
        }
      },
      201
    )
  } catch (error) {
    console.error('Registration error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong during registration'
      },
      500
    )
  }
}

export const login = async (c: Context) => {
  try {
    const body = await c.req.json()

    const result = loginSchema.safeParse(body)

    if (!result.success) {
      return c.json(
        {
          success: false,
          message: 'Validation failed',
          errors: result.error.flatten().fieldErrors
        },
        400
      )
    }

    const { email, password } = result.data

    const normalizedEmail = email.toLowerCase().trim()

    const user = await db.orm.public.User
      .where({ email: normalizedEmail })
      .first()

    if (!user) {
      return c.json(
        {
          success: false,
          message: 'Invalid email or password'
        },
        401
      )
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatch) {
      return c.json(
        {
          success: false,
          message: 'Invalid email or password'
        },
        401
      )
    }

    if (!user.emailVerified) {
      return c.json(
        {
          success: false,
          message:
            'Please verify your email address before logging in'
        },
        403
      )
    }

    const secret = process.env.JWT_SECRET

    if (!secret) {
      throw new Error('JWT_SECRET is not configured')
    }

    const token = await sign(
      {
        sub: String(user.id),
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24
      },
      secret,
      'HS256'
    )

    return c.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt
      }
    })
  } catch (error) {
    console.error('Login error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong during login'
      },
      500
    )
  }
}

export const updateProfile = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const body = await c.req.json()

    const result = updateProfileSchema.safeParse(body)

    if (!result.success) {
      return c.json(
        {
          success: false,
          message: 'Validation failed',
          errors: result.error.flatten().fieldErrors
        },
        400
      )
    }

    const { name, phone } = result.data

    const user = await db.orm.public.User
      .where({ id: userId })
      .update({
        name,
        phone: phone ?? null
      })

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
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    })
  } catch (error) {
    console.error('Profile update error:', error)

    return c.json(
      {
        success: false,
        message:
          'Something went wrong while updating profile'
      },
      500
    )
  }
}

export const verifyEmail = async (c: Context) => {
  try {
    const token = c.req.query('token')

    if (!token) {
      return c.json(
        {
          success: false,
          message: 'Verification token is required'
        },
        400
      )
    }

    const tokenHash = hashEmailVerificationToken(token)

    const user = await db.orm.public.User
      .where({
        emailVerificationTokenHash: tokenHash
      })
      .first()

    if (!user) {
      return c.json(
        {
          success: false,
          message: 'Invalid or expired verification token'
        },
        400
      )
    }

    if (user.emailVerified) {
      return c.json({
        success: true,
        message: 'Email is already verified'
      })
    }

    if (
      !user.emailVerificationExpiresAt ||
      new Date(
        user.emailVerificationExpiresAt
      ).getTime() < Date.now()
    ) {
      return c.json(
        {
          success: false,
          message: 'Verification token has expired'
        },
        400
      )
    }

    const updatedUser = await db.orm.public.User
      .where({
        id: user.id
      })
      .update({
        emailVerified: true,
        emailVerificationTokenHash: null,
        emailVerificationExpiresAt: null
      })

    if (!updatedUser) {
      return c.json(
        {
          success: false,
          message: 'Failed to update user'
        },
        500
      )
    }

    return c.json({
      success: true,
      message: 'Email verified successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        emailVerified: updatedUser.emailVerified
      }
    })
  } catch (error) {
    console.error('Verify email error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to verify email'
      },
      500
    )
  }
}
export const resendVerificationEmail = async (c: Context) => {
  try {
    const body = await c.req.json()

    const result = resendVerificationSchema.safeParse(body)

    if (!result.success) {
      return c.json(
        {
          success: false,
          message: 'Validation failed',
          errors: result.error.flatten().fieldErrors
        },
        400
      )
    }

    const { email } = result.data

    const user = await db.orm.public.User
      .where({ email })
      .first()

    if (!user) {
      return c.json({
        success: true,
        message:
          'If the account exists and is not verified, a verification email has been sent'
      })
    }

    if (user.emailVerified) {
      return c.json(
        {
          success: false,
          message: 'Email is already verified'
        },
        400
      )
    }

    const {
      token: verificationToken,
      tokenHash: verificationTokenHash,
      expiresAt: verificationExpiresAt
    } = createEmailVerificationToken()

    await db.orm.public.User
      .where({
        id: user.id
      })
      .update({
        emailVerificationTokenHash: verificationTokenHash,
        emailVerificationExpiresAt: verificationExpiresAt
      })

    await sendVerificationEmail({
      to: user.email,
      name: user.name,
      token: verificationToken
    })

    return c.json({
      success: true,
      message:
        'Verification email sent successfully'
    })
  } catch (error) {
    console.error(
      'Resend verification email error:',
      error
    )

    return c.json(
      {
        success: false,
        message:
          'Something went wrong while sending the verification email'
      },
      500
    )
  }
}