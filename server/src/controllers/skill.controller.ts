import type { Context } from 'hono'

import { db } from '../prisma/db.js'
import {
  createSkillSchema,
  updateSkillSchema
} from '../validators/skill.validator.js'

export const createSkill = async (c: Context) => {
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

    const result = createSkillSchema.safeParse(body)

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

    const { name, level } = result.data

    const skill = await db.orm.public.Skill.create({
      cvId,
      name,
      level: level ?? null
    })

    return c.json(
      {
        success: true,
        message: 'Skill added successfully',
        skill
      },
      201
    )
  } catch (error) {
    console.error('Create skill error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while adding skill'
      },
      500
    )
  }
}

export const getSkills = async (c: Context) => {
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

    const skills = await db.orm.public.Skill
      .where({ cvId })
      .all()

    return c.json({
      success: true,
      skills
    })
  } catch (error) {
    console.error('Get skills error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while fetching skills'
      },
      500
    )
  }
}

export const updateSkill = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('cvId'))
    const skillId = Number(c.req.param('skillId'))

    if (
      !Number.isInteger(cvId) ||
      cvId <= 0 ||
      !Number.isInteger(skillId) ||
      skillId <= 0
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

    const existingSkill = await db.orm.public.Skill
      .where({
        id: skillId,
        cvId
      })
      .first()

    if (!existingSkill) {
      return c.json(
        {
          success: false,
          message: 'Skill not found'
        },
        404
      )
    }

    const body = await c.req.json()

    const result = updateSkillSchema.safeParse(body)

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

    const { name, level } = result.data

    const skill = await db.orm.public.Skill
      .where({
        id: skillId,
        cvId
      })
      .update({
        name,
        level: level ?? null
      })

    return c.json({
      success: true,
      message: 'Skill updated successfully',
      skill
    })
  } catch (error) {
    console.error('Update skill error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while updating skill'
      },
      500
    )
  }
}

export const deleteSkill = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('cvId'))
    const skillId = Number(c.req.param('skillId'))

    if (
      !Number.isInteger(cvId) ||
      cvId <= 0 ||
      !Number.isInteger(skillId) ||
      skillId <= 0
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

    const skill = await db.orm.public.Skill
      .where({
        id: skillId,
        cvId
      })
      .delete()

    if (!skill) {
      return c.json(
        {
          success: false,
          message: 'Skill not found'
        },
        404
      )
    }

    return c.json({
      success: true,
      message: 'Skill deleted successfully'
    })
  } catch (error) {
    console.error('Delete skill error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while deleting skill'
      },
      500
    )
  }
}