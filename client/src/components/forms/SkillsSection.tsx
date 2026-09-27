import {
  useCallback,
  useEffect,
  useState
} from 'react'
import type { FormEvent } from 'react'

import {
  createSkill,
  deleteSkill,
  getSkills,
  updateSkill,
  type Skill
} from '../../services/skill.service'

import {
  skillRegex
} from '../../utils/validation'

interface SkillsSectionProps {
  token: string
  cvId: number
}

interface SkillForm {
  name: string
  level: string
}

const emptyForm: SkillForm = {
  name: '',
  level: ''
}

const SkillsSection = ({
  token,
  cvId
}: SkillsSectionProps) => {
  const [skills, setSkills] =
    useState<Skill[]>([])

  const [form, setForm] =
    useState<SkillForm>(emptyForm)

  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [isSaving, setIsSaving] =
    useState(false)

  const [error, setError] =
    useState('')

  const loadSkills = useCallback(
    async () => {
      setIsLoading(true)
      setError('')

      try {
        const response =
          await getSkills(token, cvId)

        setSkills(response.skills)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load skills'
        )
      } finally {
        setIsLoading(false)
      }
    },
    [cvId, token]
  )

  useEffect(() => {
    loadSkills()
  }, [loadSkills])

  const handleChange = (
    field: keyof SkillForm,
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
  const level = form.level.trim()

  if (name.length < 2) {
    setError(
      'Skill name must be at least 2 characters'
    )
    return
  }

  if (name.length > 100) {
    setError(
      'Skill name must be 100 characters or less'
    )
    return
  }

  if (!skillRegex.test(name)) {
    setError(
      'Skill name contains invalid characters'
    )
    return
  }

  if (
    level &&
    ![
      'Beginner',
      'Intermediate',
      'Advanced',
      'Expert'
    ].includes(level)
  ) {
    setError('Invalid skill level')
    return
  }

  setIsSaving(true)

  try {
    const data = {
      name,
      level: level || undefined
    }

    if (editingId) {
      await updateSkill(
        token,
        cvId,
        editingId,
        data
      )
    } else {
      await createSkill(
        token,
        cvId,
        data
      )
    }

    resetForm()
    await loadSkills()
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : 'Failed to save skill'
    )
  } finally {
    setIsSaving(false)
  }
}

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id)

    setForm({
      name: skill.name,
      level: skill.level ?? ''
    })
  }

  const handleDelete = async (
    skillId: number
  ) => {
    const confirmed = window.confirm(
      'Delete this skill?'
    )

    if (!confirmed) {
      return
    }

    setError('')

    try {
      await deleteSkill(
        token,
        cvId,
        skillId
      )

      if (editingId === skillId) {
        resetForm()
      }

      await loadSkills()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to delete skill'
      )
    }
  }

  return (
    <section className="editor-section">
      <div className="editor-section-header">
        <div>
          <h2>Skills</h2>
          <p>
            Add your technical and professional
            skills.
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
            <label htmlFor="skill-name">
              Skill
            </label>

            <input
              id="skill-name"
              type="text"
              value={form.name}
              onChange={(event) =>
                handleChange(
                  'name',
                  event.target.value
                )
              }
              placeholder="e.g. React.js"
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="skill-level">
              Level
            </label>

            <select
              id="skill-level"
              value={form.level}
              onChange={(event) =>
                handleChange(
                  'level',
                  event.target.value
                )
              }
            >
              <option value="">
                Select level
              </option>
              <option value="Beginner">
                Beginner
              </option>
              <option value="Intermediate">
                Intermediate
              </option>
              <option value="Advanced">
                Advanced
              </option>
              <option value="Expert">
                Expert
              </option>
            </select>
          </div>
        </div>

        <div className="editor-form-actions">
          <button
            type="submit"
            disabled={isSaving}
          >
            {isSaving
              ? 'Saving...'
              : editingId
                ? 'Update Skill'
                : 'Add Skill'}
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
          <p>Loading skills...</p>
        )}

        {!isLoading &&
          skills.length === 0 && (
            <p>
              No skills added yet.
            </p>
          )}

        {!isLoading &&
          skills.length > 0 && (
            <div className="skill-list">
              {skills.map((skill) => (
                <article
                  key={skill.id}
                  className="editor-item"
                >
                  <div>
                    <h3>{skill.name}</h3>

                    {skill.level && (
                      <p>{skill.level}</p>
                    )}
                  </div>

                  <div className="editor-item-actions">
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(skill)
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(skill.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
      </div>
    </section>
  )
}

export default SkillsSection