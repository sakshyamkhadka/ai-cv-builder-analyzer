import type { Context } from 'hono'

import { db } from '../prisma/db.js'
import {
  createCertificationSchema,
  updateCertificationSchema
} from '../validators/certification.validator.js'

export const createCertification = async (c: Context) => {
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

    const result = createCertificationSchema.safeParse(body)

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
      name,
      organization,
      issueDate,
      credentialUrl
    } = result.data

    const certification =
      await db.orm.public.Certification.create({
        cvId,
        name,
        organization: organization ?? null,
        issueDate: issueDate ?? null,
        credentialUrl: credentialUrl ?? null
      })

    return c.json(
      {
        success: true,
        message: 'Certification added successfully',
        certification
      },
      201
    )
  } catch (error) {
    console.error('Create certification error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while adding certification'
      },
      500
    )
  }
}

export const getCertifications = async (c: Context) => {
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

    const certifications =
      await db.orm.public.Certification
        .where({ cvId })
        .all()

    return c.json({
      success: true,
      certifications
    })
  } catch (error) {
    console.error('Get certifications error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while fetching certifications'
      },
      500
    )
  }
}

export const updateCertification = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('cvId'))
    const certificationId = Number(
      c.req.param('certificationId')
    )

    if (
      !Number.isInteger(cvId) ||
      cvId <= 0 ||
      !Number.isInteger(certificationId) ||
      certificationId <= 0
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

    const existingCertification =
      await db.orm.public.Certification
        .where({
          id: certificationId,
          cvId
        })
        .first()

    if (!existingCertification) {
      return c.json(
        {
          success: false,
          message: 'Certification not found'
        },
        404
      )
    }

    const body = await c.req.json()

    const result =
      updateCertificationSchema.safeParse(body)

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
      name,
      organization,
      issueDate,
      credentialUrl
    } = result.data

    const certification =
      await db.orm.public.Certification
        .where({
          id: certificationId,
          cvId
        })
        .update({
          name,
          organization: organization ?? null,
          issueDate: issueDate ?? null,
          credentialUrl: credentialUrl ?? null
        })

    return c.json({
      success: true,
      message: 'Certification updated successfully',
      certification
    })
  } catch (error) {
    console.error('Update certification error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while updating certification'
      },
      500
    )
  }
}

export const deleteCertification = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('cvId'))
    const certificationId = Number(
      c.req.param('certificationId')
    )

    if (
      !Number.isInteger(cvId) ||
      cvId <= 0 ||
      !Number.isInteger(certificationId) ||
      certificationId <= 0
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

    const certification =
      await db.orm.public.Certification
        .where({
          id: certificationId,
          cvId
        })
        .delete()

    if (!certification) {
      return c.json(
        {
          success: false,
          message: 'Certification not found'
        },
        404
      )
    }

    return c.json({
      success: true,
      message: 'Certification deleted successfully'
    })
  } catch (error) {
    console.error('Delete certification error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while deleting certification'
      },
      500
    )
  }
}   