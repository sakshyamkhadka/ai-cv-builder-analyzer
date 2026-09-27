import {
  useCallback,
  useEffect,
  useState
} from 'react'
import type { FormEvent } from 'react'

import {
  createEducation,
  deleteEducation,
  getEducation,
  updateEducation,
  type Education
} from '../../services/education.service'
import {
  generalNameRegex,
  validateYear
} from '../../utils/validation'

interface EducationSectionProps {
  token: string
  cvId: number
}

interface EducationForm {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
}

const emptyForm: EducationForm = {
  institution: '',
  degree: '',
  field: '',
  startDate: '',
  endDate: '',
  description: ''
}

const EducationSection = ({
  token,
  cvId
}: EducationSectionProps) => {
  const [education, setEducation] =
    useState<Education[]>([])

  const [form, setForm] =
    useState<EducationForm>(emptyForm)

  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [isSaving, setIsSaving] =
    useState(false)

  const [error, setError] = useState('')

  const loadEducation = useCallback(
    async () => {
      setIsLoading(true)
      setError('')

      try {
        const response =
          await getEducation(token, cvId)

        setEducation(response.education)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load education'
        )
      } finally {
        setIsLoading(false)
      }
    },
    [cvId, token]
  )

  useEffect(() => {
    loadEducation()
  }, [loadEducation])

  const handleChange = (
    field: keyof EducationForm,
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

  const institution = form.institution.trim()
  const degree = form.degree.trim()
  const field = form.field.trim()
  const startDate = form.startDate.trim()
  const endDate = form.endDate.trim()
  const description = form.description.trim()

  if (institution.length < 2) {
    setError(
      'Institution must be at least 2 characters'
    )
    return
  }

  if (institution.length > 200) {
    setError(
      'Institution must be 200 characters or less'
    )
    return
  }

  if (!generalNameRegex.test(institution)) {
    setError(
      'Institution contains invalid characters'
    )
    return
  }

  if (degree.length < 2) {
    setError(
      'Degree must be at least 2 characters'
    )
    return
  }

  if (degree.length > 150) {
    setError(
      'Degree must be 150 characters or less'
    )
    return
  }

  if (!generalNameRegex.test(degree)) {
    setError(
      'Degree contains invalid characters'
    )
    return
  }

  if (field) {
    if (field.length < 2) {
      setError(
        'Field of study must be at least 2 characters'
      )
      return
    }

    if (field.length > 150) {
      setError(
        'Field of study must be 150 characters or less'
      )
      return
    }

    if (!generalNameRegex.test(field)) {
      setError(
        'Field of study contains invalid characters'
      )
      return
    }
  }

  const startDateError =
    validateYear(startDate)

  if (startDateError) {
    setError(
      `Start Date: ${startDateError}`
    )
    return
  }

  const endDateError =
    validateYear(endDate)

  if (endDateError) {
    setError(
      `End Date: ${endDateError}`
    )
    return
  }

  if (
    startDate &&
    endDate &&
    Number(endDate) < Number(startDate)
  ) {
    setError(
      'End year cannot be earlier than start year'
    )
    return
  }

  if (description.length > 1000) {
    setError(
      'Description must be 1000 characters or less'
    )
    return
  }

  setIsSaving(true)

  try {
    const data = {
      institution,
      degree,
      field: field || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      description:
        description || undefined
    }

    if (editingId) {
      await updateEducation(
        token,
        cvId,
        editingId,
        data
      )
    } else {
      await createEducation(
        token,
        cvId,
        data
      )
    }

    resetForm()
    await loadEducation()
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : 'Failed to save education'
    )
  } finally {
    setIsSaving(false)
  }
}

  const handleEdit = (
    item: Education
  ) => {
    setEditingId(item.id)

    setForm({
      institution: item.institution,
      degree: item.degree,
      field: item.field ?? '',
      startDate: item.startDate ?? '',
      endDate: item.endDate ?? '',
      description:
        item.description ?? ''
    })
  }

  const handleDelete = async (
    educationId: number
  ) => {
    const confirmed = window.confirm(
      'Delete this education entry?'
    )

    if (!confirmed) {
      return
    }

    setError('')

    try {
      await deleteEducation(
        token,
        cvId,
        educationId
      )

      if (editingId === educationId) {
        resetForm()
      }

      await loadEducation()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to delete education'
      )
    }
  }

  return (
    <section className="editor-section">
      <div className="editor-section-header">
        <div>
          <h2>Education</h2>
          <p>
            Add your academic qualifications.
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
          <label htmlFor="institution">
            Institution
          </label>

          <input
            id="institution"
            type="text"
            value={form.institution}
            onChange={(event) =>
              handleChange(
                'institution',
                event.target.value
              )
            }
            placeholder="e.g. Tribhuvan University"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="degree">
            Degree
          </label>

          <input
            id="degree"
            type="text"
            value={form.degree}
            onChange={(event) =>
              handleChange(
                'degree',
                event.target.value
              )
            }
            placeholder="e.g. Bachelor of Computer Application"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="field">
            Field of Study
          </label>

          <input
            id="field"
            type="text"
            value={form.field}
            onChange={(event) =>
              handleChange(
                'field',
                event.target.value
              )
            }
            placeholder="e.g. Computer Applications"
          />
        </div>

        <div className="editor-form-row">
          <div className="form-group">
            <label htmlFor="startDate">
              Start Date
            </label>

            <input
              id="startDate"
              type="text"
              value={form.startDate}
              onChange={(event) =>
                handleChange(
                  'startDate',
                  event.target.value
                )
              }
              placeholder="e.g. 2023"
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">
              End Date
            </label>

            <input
              id="endDate"
              type="text"
              value={form.endDate}
              onChange={(event) =>
                handleChange(
                  'endDate',
                  event.target.value
                )
              }
              placeholder="e.g. 2027 or Present"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(event) =>
              handleChange(
                'description',
                event.target.value
              )
            }
            placeholder="Relevant coursework, achievements, or details..."
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
                ? 'Update Education'
                : 'Add Education'}
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
          <p>Loading education...</p>
        )}

        {!isLoading &&
          education.length === 0 && (
            <p>
              No education entries added yet.
            </p>
          )}

        {!isLoading &&
          education.map((item) => (
            <article
              key={item.id}
              className="editor-item"
            >
              <div>
                <h3>
                  {item.degree}
                </h3>

                <p>
                  {item.institution}
                </p>

                {item.field && (
                  <p>
                    {item.field}
                  </p>
                )}

                {(item.startDate ||
                  item.endDate) && (
                  <p>
                    {item.startDate ?? ''}
                    {item.startDate &&
                    item.endDate
                      ? ' – '
                      : ''}
                    {item.endDate ?? ''}
                  </p>
                )}

                {item.description && (
                  <p>
                    {item.description}
                  </p>
                )}
              </div>

              <div className="editor-item-actions">
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(item)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(item.id)
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

export default EducationSection