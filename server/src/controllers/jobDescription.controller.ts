import type { Context } from 'hono'
import { db } from '../prisma/db.js'
import {
  createJobDescriptionSchema,
  updateJobDescriptionSchema
} from '../validators/jobDescription.validator.js'

export const createJobDescription = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)

    const body = await c.req.json()
    const result = createJobDescriptionSchema.safeParse(body)

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

    const { title, company, description } = result.data

    const jobDescription =
      await db.orm.public.JobDescription.create({
        userId,
        title,
        company: company ?? null,
        description
      })

    return c.json(
      {
        success: true,
        message: 'Job description created successfully',
        jobDescription
      },
      201
    )
  } catch (error) {
    console.error('Create job description error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to create job description'
      },
      500
    )
  }
}

export const getJobDescriptions = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)

    const jobDescriptions =
      await db.orm.public.JobDescription
        .where({ userId })
        .all()

    return c.json({
      success: true,
      jobDescriptions
    })
  } catch (error) {
    console.error('Get job descriptions error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to get job descriptions'
      },
      500
    )
  }
}

export const getJobDescriptionById = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)
    const jobDescriptionId = Number(
      c.req.param('jobDescriptionId')
    )

    if (!Number.isInteger(jobDescriptionId)) {
      return c.json(
        {
          success: false,
          message: 'Invalid job description ID'
        },
        400
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

    return c.json({
      success: true,
      jobDescription
    })
  } catch (error) {
    console.error(
      'Get job description by id error:',
      error
    )

    return c.json(
      {
        success: false,
        message: 'Failed to get job description'
      },
      500
    )
  }
}

export const updateJobDescription = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)
    const jobDescriptionId = Number(
      c.req.param('jobDescriptionId')
    )

    if (!Number.isInteger(jobDescriptionId)) {
      return c.json(
        {
          success: false,
          message: 'Invalid job description ID'
        },
        400
      )
    }

    const existingJobDescription =
      await db.orm.public.JobDescription
        .where({
          id: jobDescriptionId,
          userId
        })
        .first()

    if (!existingJobDescription) {
      return c.json(
        {
          success: false,
          message: 'Job description not found'
        },
        404
      )
    }

    const body = await c.req.json()
    const result = updateJobDescriptionSchema.safeParse(body)

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

    const { title, company, description } = result.data

    const jobDescription =
      await db.orm.public.JobDescription
        .where({
          id: jobDescriptionId,
          userId
        })
        .update({
          title,
          company: company ?? null,
          description
        })

    return c.json({
      success: true,
      message: 'Job description updated successfully',
      jobDescription
    })
  } catch (error) {
    console.error(
      'Update job description error:',
      error
    )

    return c.json(
      {
        success: false,
        message: 'Failed to update job description'
      },
      500
    )
  }
}

export const deleteJobDescription = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)
    const jobDescriptionId = Number(
      c.req.param('jobDescriptionId')
    )

    if (!Number.isInteger(jobDescriptionId)) {
      return c.json(
        {
          success: false,
          message: 'Invalid job description ID'
        },
        400
      )
    }

    const deletedJobDescription =
      await db.orm.public.JobDescription
        .where({
          id: jobDescriptionId,
          userId
        })
        .delete()

    if (!deletedJobDescription) {
      return c.json(
        {
          success: false,
          message: 'Job description not found'
        },
        404
      )
    }

    return c.json({
      success: true,
      message: 'Job description deleted successfully'
    })
  } catch (error) {
    console.error(
      'Delete job description error:',
      error
    )

    return c.json(
      {
        success: false,
        message: 'Failed to delete job description'
      },
      500
    )
  }
}