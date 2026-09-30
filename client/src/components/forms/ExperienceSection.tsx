import {
  useCallback,
  useEffect,
  useState
} from 'react'
import type { FormEvent } from 'react'

import {
  generalNameRegex,
  validateRequiredText,
  validateRequiredYear
} from '../../utils/validation'

import {
  validateMeaningfulText
} from '../../utils/meaningfulText'

import {
  createExperience,
  deleteExperience,
  getExperiences,
  updateExperience,
  type Experience
} from '../../services/experience.service'

interface ExperienceSectionProps {
  token: string
  cvId: number
  onChange?: () => void
}

interface ExperienceForm {
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

const emptyForm: ExperienceForm = {
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  description: ''
}

const ExperienceSection = ({
  token,
  cvId,
  onChange
}: ExperienceSectionProps) => {
  const [experiences, setExperiences] =
    useState<Experience[]>([])

  const [form, setForm] =
    useState<ExperienceForm>(emptyForm)

  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [isSaving, setIsSaving] =
    useState(false)

  const [error, setError] =
    useState('')

  const loadExperiences = useCallback(
    async () => {
      setIsLoading(true)
      setError('')

      try {
        const response =
          await getExperiences(
            token,
            cvId
          )

        setExperiences(
          response.experiences
        )
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load experience'
        )
      } finally {
        setIsLoading(false)
      }
    },
    [cvId, token]
  )

  useEffect(() => {
    loadExperiences()
  }, [loadExperiences])

  const handleChange = (
    field: keyof ExperienceForm,
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

  const validateExperienceText = (
    value: string,
    fieldName: string,
    maxLength: number
  ) => {
    const text = value.trim()

    const requiredError =
      validateRequiredText(
        text,
        fieldName,
        2,
        maxLength
      )

    if (requiredError) {
      return requiredError
    }

    if (!generalNameRegex.test(text)) {
      return `${fieldName} contains invalid characters`
    }

    return validateMeaningfulText(
      text,
      fieldName
    )
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError('')

    const company =
      form.company.trim()

    const position =
      form.position.trim()

    const startDate =
      form.startDate.trim()

    const endDate =
      form.endDate.trim()

    const description =
      form.description.trim()

    const companyError =
      validateExperienceText(
        company,
        'Company',
        200
      )

    if (companyError) {
      setError(companyError)
      return
    }

    const positionError =
      validateExperienceText(
        position,
        'Position',
        150
      )

    if (positionError) {
      setError(positionError)
      return
    }

    const startDateError =
      validateRequiredYear(
        startDate,
        'Start Year'
      )

    if (startDateError) {
      setError(startDateError)
      return
    }

    if (!endDate) {
      setError(
        'End Year is required. Enter a year or Present.'
      )
      return
    }

    const isPresent =
      endDate.toLowerCase() === 'present'

    if (!isPresent) {
      const endDateError =
        validateRequiredYear(
          endDate,
          'End Year'
        )

      if (endDateError) {
        setError(
          `${endDateError}. You can also enter Present.`
        )
        return
      }

      if (
        Number(endDate) <
        Number(startDate)
      ) {
        setError(
          'End year cannot be earlier than start year'
        )
        return
      }
    }

    if (description.length > 1500) {
      setError(
        'Description must be 1500 characters or less'
      )
      return
    }

    setIsSaving(true)

    try {
      const data = {
        company,
        position,
        startDate,
        endDate,
        description:
          description || undefined
      }

      if (editingId) {
        await updateExperience(
          token,
          cvId,
          editingId,
          data
        )
      } else {
        await createExperience(
          token,
          cvId,
          data
        )
      }

      resetForm()

      await loadExperiences()

      onChange?.()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to save experience'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (
    experience: Experience
  ) => {
    setEditingId(experience.id)

    setForm({
      company: experience.company,
      position: experience.position,
      startDate:
        experience.startDate ?? '',
      endDate:
        experience.endDate ?? '',
      description:
        experience.description ?? ''
    })

    setError('')
  }

  const handleDelete = async (
    experienceId: number
  ) => {
    const confirmed =
      window.confirm(
        'Delete this experience entry?'
      )

    if (!confirmed) {
      return
    }

    setError('')

    try {
      await deleteExperience(
        token,
        cvId,
        experienceId
      )

      if (
        editingId === experienceId
      ) {
        resetForm()
      }

      await loadExperiences()

      onChange?.()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to delete experience'
      )
    }
  }

  return (
    <section className="editor-section experience-editor">
      <div className="editor-section-header">
        <div>
          <h2>Experience</h2>

          <p>
            Add your professional work experience.
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
        <div className="editor-form-row">
          <div className="form-group">
            <label htmlFor="experience-company">
              Company
            </label>

            <input
              id="experience-company"
              type="text"
              value={form.company}
              onChange={(event) =>
                handleChange(
                  'company',
                  event.target.value
                )
              }
              placeholder="e.g. ABC Technology"
              maxLength={200}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience-position">
              Position
            </label>

            <input
              id="experience-position"
              type="text"
              value={form.position}
              onChange={(event) =>
                handleChange(
                  'position',
                  event.target.value
                )
              }
              placeholder="e.g. Frontend Developer"
              maxLength={150}
              required
            />
          </div>
        </div>

        <div className="editor-form-row">
          <div className="form-group">
            <label htmlFor="experience-start">
              Start Year
            </label>

            <input
              id="experience-start"
              type="text"
              value={form.startDate}
              onChange={(event) =>
                handleChange(
                  'startDate',
                  event.target.value
                )
              }
              placeholder="e.g. 2025"
              maxLength={4}
              inputMode="numeric"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="experience-end">
              End Year
            </label>

            <input
              id="experience-end"
              type="text"
              value={form.endDate}
              onChange={(event) =>
                handleChange(
                  'endDate',
                  event.target.value
                )
              }
              placeholder="e.g. 2026 or Present"
              maxLength={7}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="experience-description">
            Description
          </label>

          <textarea
            id="experience-description"
            rows={5}
            value={form.description}
            onChange={(event) =>
              handleChange(
                'description',
                event.target.value
              )
            }
            placeholder="Describe your responsibilities and achievements..."
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
                ? 'Update Experience'
                : 'Add Experience'}
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
          <p>
            Loading experience...
          </p>
        )}

        {!isLoading &&
          experiences.length === 0 && (
            <p>
              No experience entries added yet.
            </p>
          )}

        {!isLoading &&
          experiences.map((experience) => (
            <article
              key={experience.id}
              className="editor-item"
            >
              <div>
                <h3>
                  {experience.position}
                </h3>

                <p>
                  {experience.company}
                </p>

                {(experience.startDate ||
                  experience.endDate) && (
                  <p>
                    {experience.startDate ?? ''}
                    {experience.startDate &&
                    experience.endDate
                      ? ' – '
                      : ''}
                    {experience.endDate ?? ''}
                  </p>
                )}

                {experience.description && (
                  <p>
                    {experience.description}
                  </p>
                )}
              </div>

              <div className="editor-item-actions">
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(
                      experience
                    )
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      experience.id
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

export default ExperienceSection