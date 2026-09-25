import type { Context } from 'hono'
import { db } from '../prisma/db.js'
import {
  createJobMatchSchema,
  updateJobMatchSchema
} from '../validators/jobMatch.validator.js'

export const createJobMatch = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)

    const body = await c.req.json()
    const result = createJobMatchSchema.safeParse(body)

    if (!result.success) {
      return c.json(
        {
          success: false,
          message: 'Validation failed',
          errors: result.error.flatten()
        },
        400
      )
    }

    const {
      cvId,
      jobDescriptionId,
      matchScore,
      matchingSkills,
      missingSkills,
      suggestions
    } = result.data

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

    const jobDescription =
      await db.orm.public.JobDescription
        .where({
          id: jobDescriptionId,
          userId
        })
        .first()

    if (!jobDescription) {
      return c.json(
        {
          success: false,
          message: 'Job description not found'
        },
        404
      )
    }

    const jobMatch = await db.orm.public.JobMatch.create({
      userId,
      cvId,
      jobDescriptionId,
      matchScore: matchScore ?? null,
      matchingSkills: matchingSkills ?? null,
      missingSkills: missingSkills ?? null,
      suggestions: suggestions ?? null
    })

    return c.json(
      {
        success: true,
        message: 'Job match created successfully',
        jobMatch
      },
      201
    )
  } catch (error) {
    console.error('Create job match error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to create job match'
      },
      500
    )
  }
}

export const getJobMatches = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)

    const jobMatches =
      await db.orm.public.JobMatch
        .where({ userId })
        .all()

    return c.json({
      success: true,
      jobMatches
    })
  } catch (error) {
    console.error('Get job matches error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to get job matches'
      },
      500
    )
  }
}

export const getJobMatchById = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)

    const jobMatchId = Number(
      c.req.param('jobMatchId')
    )

    if (!Number.isInteger(jobMatchId)) {
      return c.json(
        {
          success: false,
          message: 'Invalid job match ID'
        },
        400
      )
    }

    const jobMatch =
      await db.orm.public.JobMatch
        .where({
          id: jobMatchId,
          userId
        })
        .first()

    if (!jobMatch) {
      return c.json(
        {
          success: false,
          message: 'Job match not found'
        },
        404
      )
    }

    return c.json({
      success: true,
      jobMatch
    })
  } catch (error) {
    console.error('Get job match by id error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to get job match'
      },
      500
    )
  }
}

export const getJobMatchesByCV = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)
    const cvId = Number(c.req.param('cvId'))

    if (!Number.isInteger(cvId)) {
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

    const jobMatches =
      await db.orm.public.JobMatch
        .where({
          cvId,
          userId
        })
        .all()

    return c.json({
      success: true,
      jobMatches
    })
  } catch (error) {
    console.error('Get CV job matches error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to get CV job matches'
      },
      500
    )
  }
}

export const updateJobMatch = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)

    const jobMatchId = Number(
      c.req.param('jobMatchId')
    )

    if (!Number.isInteger(jobMatchId)) {
      return c.json(
        {
          success: false,
          message: 'Invalid job match ID'
        },
        400
      )
    }

    const existingJobMatch =
      await db.orm.public.JobMatch
        .where({
          id: jobMatchId,
          userId
        })
        .first()

    if (!existingJobMatch) {
      return c.json(
        {
          success: false,
          message: 'Job match not found'
        },
        404
      )
    }

    const body = await c.req.json()
    const result = updateJobMatchSchema.safeParse(body)

    if (!result.success) {
      return c.json(
        {
          success: false,
          message: 'Validation failed',
          errors: result.error.flatten()
        },
        400
      )
    }

    const {
      matchScore,
      matchingSkills,
      missingSkills,
      suggestions
    } = result.data

    const jobMatch =
      await db.orm.public.JobMatch
        .where({
          id: jobMatchId,
          userId
        })
        .update({
          matchScore: matchScore ?? null,
          matchingSkills: matchingSkills ?? null,
          missingSkills: missingSkills ?? null,
          suggestions: suggestions ?? null
        })

    return c.json({
      success: true,
      message: 'Job match updated successfully',
      jobMatch
    })
  } catch (error) {
    console.error('Update job match error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to update job match'
      },
      500
    )
  }
}

export const deleteJobMatch = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)

    const jobMatchId = Number(
      c.req.param('jobMatchId')
    )

    if (!Number.isInteger(jobMatchId)) {
      return c.json(
        {
          success: false,
          message: 'Invalid job match ID'
        },
        400
      )
    }

    const deletedJobMatch =
      await db.orm.public.JobMatch
        .where({
          id: jobMatchId,
          userId
        })
        .delete()

    if (!deletedJobMatch) {
      return c.json(
        {
          success: false,
          message: 'Job match not found'
        },
        404
      )
    }

    return c.json({
      success: true,
      message: 'Job match deleted successfully'
    })
  } catch (error) {
    console.error('Delete job match error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to delete job match'
      },
      500
    )
  }
}