import type { Context } from 'hono'

import { db } from '../prisma/db.js'
import {
  createCVSchema,
  updateCVSchema
} from '../validators/cv.validator.js'

export const createCV = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const body = await c.req.json()

    const result = createCVSchema.safeParse(body)

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

    const { title, templateId, summary } = result.data

    const template = await db.orm.public.Template
      .where({ id: templateId })
      .first()

    if (!template) {
      return c.json(
        {
          success: false,
          message: 'Template not found'
        },
        404
      )
    }

    const cv = await db.orm.public.CV.create({
      userId,
      title,
      templateId,
      summary: summary ?? null
    })

    return c.json(
      {
        success: true,
        message: 'CV created successfully',
        cv
      },
      201
    )
  } catch (error) {
    console.error('Create CV error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while creating CV'
      },
      500
    )
  }
}
export const getMyCVs = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvs = await db.orm.public.CV
      .where({ userId })
      .all()

    return c.json({
      success: true,
      cvs
    })
  } catch (error) {
    console.error('Get CVs error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while fetching CVs'
      },
      500
    )
  }
}
export const getCVById = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('id'))

    if (!Number.isInteger(cvId) || cvId <= 0) {
      return c.json(
        {
          success: false,
          message: 'Invalid CV ID'
        },
        400
      )
    }

    const cv = await db.orm.public.CV
      .where({
        id: cvId,
        userId
      })
      .first()

    if (!cv) {
      return c.json(
        {
          success: false,
          message: 'CV not found'
        },
        404
      )
    }

    return c.json({
      success: true,
      cv
    })
  } catch (error) {
    console.error('Get CV error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while fetching CV'
      },
      500
    )
  }
}
export const updateCV = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('id'))

    if (!Number.isInteger(cvId) || cvId <= 0) {
      return c.json(
        {
          success: false,
          message: 'Invalid CV ID'
        },
        400
      )
    }

    const body = await c.req.json()

    const result = updateCVSchema.safeParse(body)

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

    const { title, templateId, summary } = result.data

    const template = await db.orm.public.Template
      .where({ id: templateId })
      .first()

    if (!template) {
      return c.json(
        {
          success: false,
          message: 'Template not found'
        },
        404
      )
    }

    const cv = await db.orm.public.CV
      .where({
        id: cvId,
        userId
      })
      .update({
        title,
        templateId,
        summary: summary ?? null
      })

    if (!cv) {
      return c.json(
        {
          success: false,
          message: 'CV not found'
        },
        404
      )
    }

    return c.json({
      success: true,
      message: 'CV updated successfully',
      cv
    })
  } catch (error) {
    console.error('Update CV error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while updating CV'
      },
      500
    )
  }
}
export const deleteCV = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('id'))

    if (!Number.isInteger(cvId) || cvId <= 0) {
      return c.json(
        {
          success: false,
          message: 'Invalid CV ID'
        },
        400
      )
    }

    const cv = await db.orm.public.CV
      .where({
        id: cvId,
        userId
      })
      .delete()

    if (!cv) {
      return c.json(
        {
          success: false,
          message: 'CV not found'
        },
        404
      )
    }

    return c.json({
      success: true,
      message: 'CV deleted successfully'
    })
  } catch (error) {
    console.error('Delete CV error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while deleting CV'
      },
      500
    )
  }
}