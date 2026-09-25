import type { Context } from 'hono'

import { db } from '../prisma/db.js'
import {
  createProjectSchema,
  updateProjectSchema
} from '../validators/project.validator.js'

export const createProject = async (c: Context) => {
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

    const result = createProjectSchema.safeParse(body)

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
      description,
      technologies,
      projectUrl
    } = result.data

    const project = await db.orm.public.Project.create({
      cvId,
      name,
      description: description ?? null,
      technologies: technologies ?? null,
      projectUrl: projectUrl ?? null
    })

    return c.json(
      {
        success: true,
        message: 'Project added successfully',
        project
      },
      201
    )
  } catch (error) {
    console.error('Create project error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while adding project'
      },
      500
    )
  }
}

export const getProjects = async (c: Context) => {
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

    const projects = await db.orm.public.Project
      .where({ cvId })
      .all()

    return c.json({
      success: true,
      projects
    })
  } catch (error) {
    console.error('Get projects error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while fetching projects'
      },
      500
    )
  }
}

export const updateProject = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('cvId'))
    const projectId = Number(c.req.param('projectId'))

    if (
      !Number.isInteger(cvId) ||
      cvId <= 0 ||
      !Number.isInteger(projectId) ||
      projectId <= 0
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

    const existingProject = await db.orm.public.Project
      .where({
        id: projectId,
        cvId
      })
      .first()

    if (!existingProject) {
      return c.json(
        {
          success: false,
          message: 'Project not found'
        },
        404
      )
    }

    const body = await c.req.json()

    const result = updateProjectSchema.safeParse(body)

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
      description,
      technologies,
      projectUrl
    } = result.data

    const project = await db.orm.public.Project
      .where({
        id: projectId,
        cvId
      })
      .update({
        name,
        description: description ?? null,
        technologies: technologies ?? null,
        projectUrl: projectUrl ?? null
      })

    return c.json({
      success: true,
      message: 'Project updated successfully',
      project
    })
  } catch (error) {
    console.error('Update project error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while updating project'
      },
      500
    )
  }
}

export const deleteProject = async (c: Context) => {
  try {
    const authUser = c.get('user')
    const userId = Number(authUser.sub)

    const cvId = Number(c.req.param('cvId'))
    const projectId = Number(c.req.param('projectId'))

    if (
      !Number.isInteger(cvId) ||
      cvId <= 0 ||
      !Number.isInteger(projectId) ||
      projectId <= 0
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

    const project = await db.orm.public.Project
      .where({
        id: projectId,
        cvId
      })
      .delete()

    if (!project) {
      return c.json(
        {
          success: false,
          message: 'Project not found'
        },
        404
      )
    }

    return c.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    console.error('Delete project error:', error)

    return c.json(
      {
        success: false,
        message: 'Something went wrong while deleting project'
      },
      500
    )
  }
}