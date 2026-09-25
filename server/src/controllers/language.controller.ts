import type { Context } from 'hono'
import { db } from '../prisma/db.js'
import {
  createLanguageSchema,
  updateLanguageSchema
} from '../validators/language.validator.js'

export const createLanguage = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)
    const cvId = Number(c.req.param('cvId'))

    if (!Number.isInteger(cvId)) {
      return c.json(
        { success: false, message: 'Invalid CV ID' },
        400
      )
    }

    const cv = await db.orm.public.CV
      .where({ id: cvId, userId })
      .first()

    if (!cv) {
      return c.json(
        { success: false, message: 'CV not found' },
        404
      )
    }

    const body = await c.req.json()
    const result = createLanguageSchema.safeParse(body)

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

    const { name, proficiency } = result.data

    const language = await db.orm.public.Language.create({
      cvId,
      name,
      proficiency: proficiency ?? null
    })

    return c.json(
      {
        success: true,
        message: 'Language created successfully',
        language
      },
      201
    )
  } catch (error) {
    console.error('Create language error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to create language'
      },
      500
    )
  }
}

export const getLanguages = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)
    const cvId = Number(c.req.param('cvId'))

    if (!Number.isInteger(cvId)) {
      return c.json(
        { success: false, message: 'Invalid CV ID' },
        400
      )
    }

    const cv = await db.orm.public.CV
      .where({ id: cvId, userId })
      .first()

    if (!cv) {
      return c.json(
        { success: false, message: 'CV not found' },
        404
      )
    }

    const languages = await db.orm.public.Language
      .where({ cvId })
      .all()

    return c.json({
      success: true,
      languages
    })
  } catch (error) {
    console.error('Get languages error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to get languages'
      },
      500
    )
  }
}

export const updateLanguage = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)
    const cvId = Number(c.req.param('cvId'))
    const languageId = Number(c.req.param('languageId'))

    if (!Number.isInteger(cvId) || !Number.isInteger(languageId)) {
      return c.json(
        { success: false, message: 'Invalid ID' },
        400
      )
    }

    const cv = await db.orm.public.CV
      .where({ id: cvId, userId })
      .first()

    if (!cv) {
      return c.json(
        { success: false, message: 'CV not found' },
        404
      )
    }

    const existingLanguage = await db.orm.public.Language
      .where({
        id: languageId,
        cvId
      })
      .first()

    if (!existingLanguage) {
      return c.json(
        { success: false, message: 'Language not found' },
        404
      )
    }

    const body = await c.req.json()
    const result = updateLanguageSchema.safeParse(body)

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

    const { name, proficiency } = result.data

    const language = await db.orm.public.Language
      .where({
        id: languageId,
        cvId
      })
      .update({
        name,
        proficiency: proficiency ?? null
      })

    return c.json({
      success: true,
      message: 'Language updated successfully',
      language
    })
  } catch (error) {
    console.error('Update language error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to update language'
      },
      500
    )
  }
}

export const deleteLanguage = async (c: Context) => {
  try {
    const user = c.get('user')
    const userId = Number(user.sub)
    const cvId = Number(c.req.param('cvId'))
    const languageId = Number(c.req.param('languageId'))

    if (!Number.isInteger(cvId) || !Number.isInteger(languageId)) {
      return c.json(
        { success: false, message: 'Invalid ID' },
        400
      )
    }

    const cv = await db.orm.public.CV
      .where({ id: cvId, userId })
      .first()

    if (!cv) {
      return c.json(
        { success: false, message: 'CV not found' },
        404
      )
    }

    const deletedLanguage = await db.orm.public.Language
      .where({
        id: languageId,
        cvId
      })
      .delete()

    if (!deletedLanguage) {
      return c.json(
        { success: false, message: 'Language not found' },
        404
      )
    }

    return c.json({
      success: true,
      message: 'Language deleted successfully'
    })
  } catch (error) {
    console.error('Delete language error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to delete language'
      },
      500
    )
  }
}