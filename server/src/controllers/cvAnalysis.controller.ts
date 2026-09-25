import type { Context } from 'hono'
import { db } from '../prisma/db.js'
import {
  createCVAnalysisSchema,
  updateCVAnalysisSchema
} from '../validators/cvAnalysis.validator.js'

export const createCVAnalysis = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)

    const body = await c.req.json()
    const result = createCVAnalysisSchema.safeParse(body)

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
      overallScore,
      summary,
      strengths,
      weaknesses,
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

    const analysis = await db.orm.public.CVAnalysis.create({
      userId,
      cvId,
      overallScore: overallScore ?? null,
      summary: summary ?? null,
      strengths: strengths ?? null,
      weaknesses: weaknesses ?? null,
      suggestions: suggestions ?? null
    })

    return c.json(
      {
        success: true,
        message: 'CV analysis created successfully',
        analysis
      },
      201
    )
  } catch (error) {
    console.error('Create CV analysis error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to create CV analysis'
      },
      500
    )
  }
}

export const getCVAnalyses = async (c: Context) => {
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

    const analyses = await db.orm.public.CVAnalysis
      .where({
        cvId,
        userId
      })
      .all()

    return c.json({
      success: true,
      analyses
    })
  } catch (error) {
    console.error('Get CV analyses error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to get CV analyses'
      },
      500
    )
  }
}

export const getCVAnalysisById = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)

    const analysisId = Number(
      c.req.param('analysisId')
    )

    if (!Number.isInteger(analysisId)) {
      return c.json(
        {
          success: false,
          message: 'Invalid analysis ID'
        },
        400
      )
    }

    const analysis = await db.orm.public.CVAnalysis
      .where({
        id: analysisId,
        userId
      })
      .first()

    if (!analysis) {
      return c.json(
        {
          success: false,
          message: 'CV analysis not found'
        },
        404
      )
    }

    return c.json({
      success: true,
      analysis
    })
  } catch (error) {
    console.error(
      'Get CV analysis by id error:',
      error
    )

    return c.json(
      {
        success: false,
        message: 'Failed to get CV analysis'
      },
      500
    )
  }
}

export const updateCVAnalysis = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)

    const analysisId = Number(
      c.req.param('analysisId')
    )

    if (!Number.isInteger(analysisId)) {
      return c.json(
        {
          success: false,
          message: 'Invalid analysis ID'
        },
        400
      )
    }

    const existingAnalysis =
      await db.orm.public.CVAnalysis
        .where({
          id: analysisId,
          userId
        })
        .first()

    if (!existingAnalysis) {
      return c.json(
        {
          success: false,
          message: 'CV analysis not found'
        },
        404
      )
    }

    const body = await c.req.json()
    const result = updateCVAnalysisSchema.safeParse(body)

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
      overallScore,
      summary,
      strengths,
      weaknesses,
      suggestions
    } = result.data

    const analysis =
      await db.orm.public.CVAnalysis
        .where({
          id: analysisId,
          userId
        })
        .update({
          overallScore: overallScore ?? null,
          summary: summary ?? null,
          strengths: strengths ?? null,
          weaknesses: weaknesses ?? null,
          suggestions: suggestions ?? null
        })

    return c.json({
      success: true,
      message: 'CV analysis updated successfully',
      analysis
    })
  } catch (error) {
    console.error(
      'Update CV analysis error:',
      error
    )

    return c.json(
      {
        success: false,
        message: 'Failed to update CV analysis'
      },
      500
    )
  }
}

export const deleteCVAnalysis = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)

    const analysisId = Number(
      c.req.param('analysisId')
    )

    if (!Number.isInteger(analysisId)) {
      return c.json(
        {
          success: false,
          message: 'Invalid analysis ID'
        },
        400
      )
    }

    const deletedAnalysis =
      await db.orm.public.CVAnalysis
        .where({
          id: analysisId,
          userId
        })
        .delete()

    if (!deletedAnalysis) {
      return c.json(
        {
          success: false,
          message: 'CV analysis not found'
        },
        404
      )
    }

    return c.json({
      success: true,
      message: 'CV analysis deleted successfully'
    })
  } catch (error) {
    console.error(
      'Delete CV analysis error:',
      error
    )

    return c.json(
      {
        success: false,
        message: 'Failed to delete CV analysis'
      },
      500
    )
  }
}