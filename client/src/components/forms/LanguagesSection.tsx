import {
  useCallback,
  useEffect,
  useState
} from 'react'
import type { FormEvent } from 'react'

import {
  createLanguage,
  deleteLanguage,
  getLanguages,
  updateLanguage,
  type Language
} from '../../services/language.service'

import {
  supportedLanguages,
  validateLanguage,
  validateProficiency
} from '../../utils/validation'

interface LanguagesSectionProps {
  token: string
  cvId: number
}

interface LanguageForm {
  name: string
  proficiency: string
}

const emptyForm: LanguageForm = {
  name: '',
  proficiency: ''
}

const LanguagesSection = ({
  token,
  cvId
}: LanguagesSectionProps) => {
  const [languages, setLanguages] =
    useState<Language[]>([])

  const [form, setForm] =
    useState<LanguageForm>(emptyForm)

  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [isSaving, setIsSaving] =
    useState(false)

  const [error, setError] =
    useState('')

  const loadLanguages = useCallback(
    async () => {
      setIsLoading(true)
      setError('')

      try {
        const response =
          await getLanguages(token, cvId)

        setLanguages(
          response.languages
        )
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load languages'
        )
      } finally {
        setIsLoading(false)
      }
    },
    [cvId, token]
  )

  useEffect(() => {
    loadLanguages()
  }, [loadLanguages])

  const handleChange = (
    field: keyof LanguageForm,
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
    const proficiency =
      form.proficiency.trim()

    const languageError =
      validateLanguage(name)

    if (languageError) {
      setError(languageError)
      return
    }

    const proficiencyError =
      validateProficiency(proficiency)

    if (proficiencyError) {
      setError(proficiencyError)
      return
    }

    setIsSaving(true)

    try {
      const data = {
        name,
        proficiency:
          proficiency || undefined
      }

      if (editingId) {
        await updateLanguage(
          token,
          cvId,
          editingId,
          data
        )
      } else {
        await createLanguage(
          token,
          cvId,
          data
        )
      }

      resetForm()
      await loadLanguages()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to save language'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (
    language: Language
  ) => {
    setEditingId(language.id)

    setForm({
      name: language.name,
      proficiency:
        language.proficiency ?? ''
    })
  }

  const handleDelete = async (
    languageId: number
  ) => {
    const confirmed = window.confirm(
      'Delete this language?'
    )

    if (!confirmed) {
      return
    }

    setError('')

    try {
      await deleteLanguage(
        token,
        cvId,
        languageId
      )

      if (editingId === languageId) {
        resetForm()
      }

      await loadLanguages()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to delete language'
      )
    }
  }

  return (
    <section className="editor-section">
      <div className="editor-section-header">
        <div>
          <h2>Languages</h2>

          <p>
            Add languages and your proficiency.
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
            <label htmlFor="language-name">
              Language
            </label>

            <select
              id="language-name"
              value={form.name}
              onChange={(event) =>
                handleChange(
                  'name',
                  event.target.value
                )
              }
              required
            >
              <option value="">
                Select language
              </option>

              {supportedLanguages.map(
                (language) => (
                  <option
                    key={language}
                    value={language}
                  >
                    {language}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="language-proficiency">
              Proficiency
            </label>

            <select
              id="language-proficiency"
              value={form.proficiency}
              onChange={(event) =>
                handleChange(
                  'proficiency',
                  event.target.value
                )
              }
            >
              <option value="">
                Select proficiency
              </option>

              <option value="Basic">
                Basic
              </option>

              <option value="Conversational">
                Conversational
              </option>

              <option value="Professional">
                Professional
              </option>

              <option value="Fluent">
                Fluent
              </option>

              <option value="Native">
                Native
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
                ? 'Update Language'
                : 'Add Language'}
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
          <p>Loading languages...</p>
        )}

        {!isLoading &&
          languages.length === 0 && (
            <p>
              No languages added yet.
            </p>
          )}

        {!isLoading &&
          languages.map((language) => (
            <article
              key={language.id}
              className="editor-item"
            >
              <div>
                <h3>
                  {language.name}
                </h3>

                {language.proficiency && (
                  <p>
                    Proficiency:{' '}
                    {language.proficiency}
                  </p>
                )}
              </div>

              <div className="editor-item-actions">
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(language)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      language.id
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

export default LanguagesSection

