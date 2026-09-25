import type { Context } from 'hono'

import { db } from '../prisma/db.js'
import {
  createExperienceSchema,
  updateExperienceSchema
} from '../validators/experience.validator.js'

export const createExperience = async (c: Context) => {
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

    const result = createExperienceSchema.safeParse(body)

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
      company,
      position,
      startDate,
      endDate,
      description
    } = result.data

    const experience = await db.orm.public.Experience.create({
      cvId,
      company,
      position,
      startDate: startDate ?? null,
      endDate: endDate ?? null,
      description: description ?? null
    })

    return c.json(
      {
        success: true,
        message: 'Experience added successfully',
        experience
      },
      201
    )
  } catch (error) {
    console.error('Create experience error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while adding experience'
      },
      500
    )
  }
}

export const getExperiences = async (c: Context) => {
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

    const experiences = await db.orm.public.Experience
      .where({ cvId })
      .all()

    return c.json({
      success: true,
      experiences
    })
  } catch (error) {
    console.error('Get experiences error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while fetching experiences'
      },
      500
    )
  }
}

export const updateExperience = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('cvId'))
    const experienceId = Number(c.req.param('experienceId'))

    if (
      !Number.isInteger(cvId) ||
      cvId <= 0 ||
      !Number.isInteger(experienceId) ||
      experienceId <= 0
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

    const existingExperience = await db.orm.public.Experience
      .where({
        id: experienceId,
        cvId
      })
      .first()

    if (!existingExperience) {
      return c.json(
        {
          success: false,
          message: 'Experience not found'
        },
        404
      )
    }

    const body = await c.req.json()

    const result = updateExperienceSchema.safeParse(body)

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
      company,
      position,
      startDate,
      endDate,
      description
    } = result.data

    const experience = await db.orm.public.Experience
      .where({
        id: experienceId,
        cvId
      })
      .update({
        company,
        position,
        startDate: startDate ?? null,
        endDate: endDate ?? null,
        description: description ?? null
      })

    return c.json({
      success: true,
      message: 'Experience updated successfully',
      experience
    })
  } catch (error) {
    console.error('Update experience error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while updating experience'
      },
      500
    )
  }
}

export const deleteExperience = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('cvId'))
    const experienceId = Number(c.req.param('experienceId'))

    if (
      !Number.isInteger(cvId) ||
      cvId <= 0 ||
      !Number.isInteger(experienceId) ||
      experienceId <= 0
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

    const experience = await db.orm.public.Experience
      .where({
        id: experienceId,
        cvId
      })
      .delete()

    if (!experience) {
      return c.json(
        {
          success: false,
          message: 'Experience not found'
        },
        404
      )
    }

    return c.json({
      success: true,
      message: 'Experience deleted successfully'
    })
  } catch (error) {
    console.error('Delete experience error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while deleting experience'
      },
      500
    )
  }
}