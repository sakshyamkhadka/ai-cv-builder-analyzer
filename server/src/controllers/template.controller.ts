import type { Context } from 'hono'
import { db } from '../prisma/db.js'
import {
  createTemplateSchema,
  updateTemplateSchema
} from '../validators/template.validator.js'

export const createTemplate = async (c: Context) => {
  try {
    const body = await c.req.json()
    const result = createTemplateSchema.safeParse(body)

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
      name,
      slug,
      description,
      previewImage,
      isActive
    } = result.data

    const existingTemplate =
      await db.orm.public.Template
        .where({ slug })
        .first()

    if (existingTemplate) {
      return c.json(
        {
          success: false,
          message: 'Template slug already exists'
        },
        409
      )
    }

    const template =
      await db.orm.public.Template.create({
        name,
        slug,
        description: description ?? null,
        previewImage: previewImage ?? null,
        isActive: isActive ?? true
      })

    return c.json(
      {
        success: true,
        message: 'Template created successfully',
        template
      },
      201
    )
  } catch (error) {
    console.error('Create template error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to create template'
      },
      500
    )
  }
}

export const getTemplates = async (c: Context) => {
  try {
    const templates =
      await db.orm.public.Template
        .where({ isActive: true })
        .all()

    return c.json({
      success: true,
      templates
    })
  } catch (error) {
    console.error('Get templates error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to get templates'
      },
      500
    )
  }
}

export const getTemplateById = async (c: Context) => {
  try {
    const templateId = Number(
      c.req.param('templateId')
    )

    if (!Number.isInteger(templateId)) {
      return c.json(
        {
          success: false,
          message: 'Invalid template ID'
        },
        400
      )
    }

    const template =
      await db.orm.public.Template
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

    return c.json({
      success: true,
      template
    })
  } catch (error) {
    console.error('Get template by id error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to get template'
      },
      500
    )
  }
}

export const updateTemplate = async (c: Context) => {
  try {
    const templateId = Number(
      c.req.param('templateId')
    )

    if (!Number.isInteger(templateId)) {
      return c.json(
        {
          success: false,
          message: 'Invalid template ID'
        },
        400
      )
    }

    const existingTemplate =
      await db.orm.public.Template
        .where({ id: templateId })
        .first()

    if (!existingTemplate) {
      return c.json(
        {
          success: false,
          message: 'Template not found'
        },
        404
      )
    }

    const body = await c.req.json()
    const result = updateTemplateSchema.safeParse(body)

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
      name,
      slug,
      description,
      previewImage,
      isActive
    } = result.data

    if (slug && slug !== existingTemplate.slug) {
      const slugExists =
        await db.orm.public.Template
          .where({ slug })
          .first()

      if (slugExists) {
        return c.json(
          {
            success: false,
            message: 'Template slug already exists'
          },
          409
        )
      }
    }

    const template =
      await db.orm.public.Template
        .where({ id: templateId })
        .update({
          name: name ?? existingTemplate.name,
          slug: slug ?? existingTemplate.slug,
          description:
            description ?? existingTemplate.description,
          previewImage:
            previewImage ?? existingTemplate.previewImage,
          isActive:
            isActive ?? existingTemplate.isActive
        })

    return c.json({
      success: true,
      message: 'Template updated successfully',
      template
    })
  } catch (error) {
    console.error('Update template error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to update template'
      },
      500
    )
  }
}

export const deleteTemplate = async (c: Context) => {
  try {
    const templateId = Number(
      c.req.param('templateId')
    )

    if (!Number.isInteger(templateId)) {
      return c.json(
        {
          success: false,
          message: 'Invalid template ID'
        },
        400
      )
    }

    const existingTemplate =
      await db.orm.public.Template
        .where({ id: templateId })
        .first()

    if (!existingTemplate) {
      return c.json(
        {
          success: false,
          message: 'Template not found'
        },
        404
      )
    }

    const linkedCVs =
      await db.orm.public.CV
        .where({ templateId })
        .all()

    if (linkedCVs.length > 0) {
      return c.json(
        {
          success: false,
          message:
            'Template cannot be deleted because it is used by one or more CVs'
        },
        409
      )
    }

    await db.orm.public.Template
      .where({ id: templateId })
      .delete()

    return c.json({
      success: true,
      message: 'Template deleted successfully'
    })
  } catch (error) {
    console.error('Delete template error:', error)

    return c.json(
      {
        success: false,
        message: 'Failed to delete template'
      },
      500
    )
  }
}