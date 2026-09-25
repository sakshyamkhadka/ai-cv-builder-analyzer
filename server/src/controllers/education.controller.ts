import type { Context } from 'hono'

import { db } from '../prisma/db.js'
import {
  createEducationSchema,
  updateEducationSchema
} from '../validators/education.validator.js'

export const createEducation = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('cvId'))

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

    const body = await c.req.json()

    const result = createEducationSchema.safeParse(body)

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

    const {
      institution,
      degree,
      field,
      startDate,
      endDate,
      description
    } = result.data

    const education = await db.orm.public.Education.create({
      cvId,
      institution,
      degree,
      field: field ?? null,
      startDate: startDate ?? null,
      endDate: endDate ?? null,
      description: description ?? null
    })

    return c.json(
      {
        success: true,
        message: 'Education added successfully',
        education
      },
      201
    )
  } catch (error) {
    console.error('Create education error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while adding education'
      },
      500
    )
  }
}

export const getEducation = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('cvId'))

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

    const education = await db.orm.public.Education
      .where({ cvId })
      .all()

    return c.json({
      success: true,
      education
    })
  } catch (error) {
    console.error('Get education error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while fetching education'
      },
      500
    )
  }
}

export const updateEducation = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('cvId'))
    const educationId = Number(c.req.param('educationId'))

    if (
      !Number.isInteger(cvId) ||
      cvId <= 0 ||
      !Number.isInteger(educationId) ||
      educationId <= 0
    ) {
      return c.json(
        {
          success: false,
          message: 'Invalid ID'
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

    const existingEducation = await db.orm.public.Education
      .where({
        id: educationId,
        cvId
      })
      .first()

    if (!existingEducation) {
      return c.json(
        {
          success: false,
          message: 'Education not found'
        },
        404
      )
    }

    const body = await c.req.json()

    const result = updateEducationSchema.safeParse(body)

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

    const {
      institution,
      degree,
      field,
      startDate,
      endDate,
      description
    } = result.data

    const education = await db.orm.public.Education
      .where({
        id: educationId,
        cvId
      })
      .update({
        institution,
        degree,
        field: field ?? null,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        description: description ?? null
      })

    return c.json({
      success: true,
      message: 'Education updated successfully',
      education
    })
  } catch (error) {
    console.error('Update education error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while updating education'
      },
      500
    )
  }
}

export const deleteEducation = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('cvId'))
    const educationId = Number(c.req.param('educationId'))

    if (
      !Number.isInteger(cvId) ||
      cvId <= 0 ||
      !Number.isInteger(educationId) ||
      educationId <= 0
    ) {
      return c.json(
        {
          success: false,
          message: 'Invalid ID'
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

    const education = await db.orm.public.Education
      .where({
        id: educationId,
        cvId
      })
      .delete()

    if (!education) {
      return c.json(
        {
          success: false,
          message: 'Education not found'
        },
        404
      )
    }

    return c.json({
      success: true,
      message: 'Education deleted successfully'
    })
  } catch (error) {
    console.error('Delete education error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while deleting education'
      },
      500
    )
  }
}