import {
  useEffect,
  useState
} from 'react'
import type { FormEvent } from 'react'
import {
  Link,
  useNavigate
} from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import {
  createCV
} from '../../services/cv.service'
import {
  getTemplates,
  type Template
} from '../../services/template.service'

const CreateCV = () => {
  const navigate = useNavigate()
  const { token } = useAuth()

  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [templates, setTemplates] =
    useState<Template[]>([])
  const [templateId, setTemplateId] =
    useState<number | null>(null)

  const [isLoadingTemplates, setIsLoadingTemplates] =
    useState(true)
  const [isSaving, setIsSaving] =
    useState(false)

  const [error, setError] = useState('')

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const response = await getTemplates()

        setTemplates(response.templates)

        if (response.templates.length > 0) {
          setTemplateId(response.templates[0].id)
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load templates'
        )
      } finally {
        setIsLoadingTemplates(false)
      }
    }

    loadTemplates()
  }, [])

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError('')

    if (!token) {
      setError('You must be logged in')
      return
    }

    if (!templateId) {
      setError('Please select a template')
      return
    }

    setIsSaving(true)

    try {
      const response = await createCV(
        token,
        {
          title,
          templateId,
          summary: summary || undefined
        }
      )

      if (!response.cv) {
        throw new Error(
          'CV was not returned by the server'
        )
      }

      navigate(`/cv/${response.cv.id}`)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to create CV'
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="cv-create-page">
      <section className="cv-create-card">
        <div className="cv-create-header">
          <div>
            <p>Create your CV</p>

            <h1>
              Start a new professional CV
            </h1>

            <span>
              Choose a template and add your basic
              information.
            </span>
          </div>

          <Link to="/dashboard">
            Back to Dashboard
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="cv-create-form"
        >
          <div className="form-group">
            <label htmlFor="title">
              CV Title
            </label>

            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="e.g. Software Developer CV"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="summary">
              Professional Summary
            </label>

            <textarea
              id="summary"
              value={summary}
              onChange={(event) =>
                setSummary(event.target.value)
              }
              placeholder="A short professional summary..."
              rows={5}
            />
          </div>

          <div className="form-group">
            <label>
              Choose a Template
            </label>

            {isLoadingTemplates && (
              <p>
                Loading templates...
              </p>
            )}

            {!isLoadingTemplates &&
              templates.length === 0 && (
                <p>
                  No active templates are available.
                </p>
              )}

            {!isLoadingTemplates &&
              templates.length > 0 && (
                <div className="template-grid">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      className={
                        templateId === template.id
                          ? 'template-option active'
                          : 'template-option'
                      }
                      onClick={() =>
                        setTemplateId(template.id)
                      }
                    >
                      <strong>
                        {template.name}
                      </strong>

                      {template.description && (
                        <span>
                          {template.description}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
          </div>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={
              isSaving ||
              isLoadingTemplates ||
              templates.length === 0
            }
          >
            {isSaving
              ? 'Creating CV...'
              : 'Create CV'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default CreateCV