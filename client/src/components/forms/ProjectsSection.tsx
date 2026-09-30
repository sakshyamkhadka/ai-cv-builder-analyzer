import {
  useCallback,
  useEffect,
  useState
} from 'react'
import type { FormEvent } from 'react'

import {
  generalNameRegex,
  technologiesRegex,
  validateUrl
} from '../../utils/validation'

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
  type Project
} from '../../services/project.service'

interface ProjectsSectionProps {
  token: string
  cvId: number
  onChange?: () => void
}

interface ProjectForm {
  name: string
  description: string
  technologies: string
  projectUrl: string
}

const emptyForm: ProjectForm = {
  name: '',
  description: '',
  technologies: '',
  projectUrl: ''
}

const ProjectsSection = ({
  token,
  cvId,
  onChange
}: ProjectsSectionProps) => {
  const [projects, setProjects] =
    useState<Project[]>([])

  const [form, setForm] =
    useState<ProjectForm>(emptyForm)

  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [isSaving, setIsSaving] =
    useState(false)

  const [error, setError] =
    useState('')

  const loadProjects = useCallback(
    async () => {
      setIsLoading(true)
      setError('')

      try {
        const response =
          await getProjects(token, cvId)

        setProjects(response.projects)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load projects'
        )
      } finally {
        setIsLoading(false)
      }
    },
    [cvId, token]
  )

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  const handleChange = (
    field: keyof ProjectForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }))
  }

  const resetForm = () => {
    setForm(emptyForm)
    setEditingId(null)
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError('')

    const name = form.name.trim()
    const description =
      form.description.trim()
    const technologies =
      form.technologies.trim()
    const projectUrl =
      form.projectUrl.trim()

    if (name.length < 2) {
      setError(
        'Project name must be at least 2 characters'
      )
      return
    }

    if (name.length > 150) {
      setError(
        'Project name must be 150 characters or less'
      )
      return
    }

    if (!generalNameRegex.test(name)) {
      setError(
        'Project name contains invalid characters'
      )
      return
    }

    if (description.length > 1500) {
      setError(
        'Description must be 1500 characters or less'
      )
      return
    }

    if (technologies) {
      if (technologies.length > 500) {
        setError(
          'Technologies must be 500 characters or less'
        )
        return
      }

      if (
        !technologiesRegex.test(
          technologies
        )
      ) {
        setError(
          'Technologies contains invalid characters'
        )
        return
      }
    }

    const urlError =
      validateUrl(projectUrl)

    if (urlError) {
      setError(
        `Project URL: ${urlError}`
      )
      return
    }

    setIsSaving(true)

    try {
      const data = {
        name,
        description:
          description || undefined,
        technologies:
          technologies || undefined,
        projectUrl:
          projectUrl || undefined
      }

      if (editingId) {
        await updateProject(
          token,
          cvId,
          editingId,
          data
        )
      } else {
        await createProject(
          token,
          cvId,
          data
        )
      }

      resetForm()

      await loadProjects()

      onChange?.()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to save project'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (
    project: Project
  ) => {
    setEditingId(project.id)

    setForm({
      name: project.name,
      description:
        project.description ?? '',
      technologies:
        project.technologies ?? '',
      projectUrl:
        project.projectUrl ?? ''
    })
  }

  const handleDelete = async (
    projectId: number
  ) => {
    const confirmed = window.confirm(
      'Delete this project?'
    )

    if (!confirmed) {
      return
    }

    setError('')

    try {
      await deleteProject(
        token,
        cvId,
        projectId
      )

      if (editingId === projectId) {
        resetForm()
      }

      await loadProjects()

      onChange?.()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to delete project'
      )
    }
  }

  return (
    <section className="editor-section projects-editor">
      <div className="editor-section-header">
        <div>
          <h2>Projects</h2>

          <p>
            Add important projects and links.
          </p>
        </div>
      </div>

      {error && (
        <p className="auth-error">
          {error}
        </p>
      )}

      <form
        className="editor-form"
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="project-name">
            Project Name
          </label>

          <input
            id="project-name"
            type="text"
            value={form.name}
            onChange={(event) =>
              handleChange(
                'name',
                event.target.value
              )
            }
            placeholder="e.g. AI CV Builder"
            maxLength={150}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="project-technologies">
            Technologies
          </label>

          <input
            id="project-technologies"
            type="text"
            value={form.technologies}
            onChange={(event) =>
              handleChange(
                'technologies',
                event.target.value
              )
            }
            placeholder="e.g. React, TypeScript, Hono, PostgreSQL"
            maxLength={500}
          />
        </div>

        <div className="form-group">
          <label htmlFor="project-url">
            Project URL
          </label>

          <input
            id="project-url"
            type="url"
            value={form.projectUrl}
            onChange={(event) =>
              handleChange(
                'projectUrl',
                event.target.value
              )
            }
            placeholder="https://github.com/..."
            maxLength={500}
          />
        </div>

        <div className="form-group">
          <label htmlFor="project-description">
            Description
          </label>

          <textarea
            id="project-description"
            rows={5}
            value={form.description}
            onChange={(event) =>
              handleChange(
                'description',
                event.target.value
              )
            }
            placeholder="Describe what you built, your role, and the result..."
            maxLength={1500}
          />
        </div>

        <div className="editor-form-actions">
          <button
            type="submit"
            disabled={isSaving}
          >
            {isSaving
              ? 'Saving...'
              : editingId
                ? 'Update Project'
                : 'Add Project'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              disabled={isSaving}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="editor-list">
        {isLoading && (
          <p>Loading projects...</p>
        )}

        {!isLoading &&
          projects.length === 0 && (
            <p>
              No projects added yet.
            </p>
          )}

        {!isLoading &&
          projects.map((project) => (
            <article
              key={project.id}
              className="editor-item"
            >
              <div>
                <h3>
                  {project.name}
                </h3>

                {project.technologies && (
                  <p>
                    Technologies:{' '}
                    {project.technologies}
                  </p>
                )}

                {project.description && (
                  <p>
                    {project.description}
                  </p>
                )}

                {project.projectUrl && (
                  <p>
                    <a
                      href={
                        project.projectUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Project
                    </a>
                  </p>
                )}
              </div>

              <div className="editor-item-actions">
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(project)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      project.id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
      </div>
    </section>
  )
}

export default ProjectsSection