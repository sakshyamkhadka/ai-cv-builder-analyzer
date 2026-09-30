import {
  useCallback,
  useEffect,
  useState
} from 'react'
import type { FormEvent } from 'react'

import {
  createCertification,
  deleteCertification,
  getCertifications,
  updateCertification,
  type Certification
} from '../../services/certification.service'

import {
  generalNameRegex,
  validateUrl
} from '../../utils/validation'

interface CertificationsSectionProps {
  token: string
  cvId: number
  onChange?: () => void
}

interface CertificationForm {
  name: string
  organization: string
  issueDate: string
  credentialUrl: string
}

const emptyForm: CertificationForm = {
  name: '',
  organization: '',
  issueDate: '',
  credentialUrl: ''
}

const CertificationsSection = ({
  token,
  cvId,
  onChange
}: CertificationsSectionProps) => {
  const [certifications, setCertifications] =
    useState<Certification[]>([])

  const [form, setForm] =
    useState<CertificationForm>(emptyForm)

  const [editingId, setEditingId] =
    useState<number | null>(null)

  const [isLoading, setIsLoading] =
    useState(true)

  const [isSaving, setIsSaving] =
    useState(false)

  const [error, setError] =
    useState('')

  const loadCertifications = useCallback(
    async () => {
      setIsLoading(true)
      setError('')

      try {
        const response =
          await getCertifications(
            token,
            cvId
          )

        setCertifications(
          response.certifications
        )
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load certifications'
        )
      } finally {
        setIsLoading(false)
      }
    },
    [cvId, token]
  )

  useEffect(() => {
    loadCertifications()
  }, [loadCertifications])

  const handleChange = (
    field: keyof CertificationForm,
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
    const organization =
      form.organization.trim()
    const issueDate =
      form.issueDate.trim()
    const credentialUrl =
      form.credentialUrl.trim()

    if (name.length < 2) {
      setError(
        'Certification name must be at least 2 characters'
      )
      return
    }

    if (name.length > 200) {
      setError(
        'Certification name must be 200 characters or less'
      )
      return
    }

    if (!generalNameRegex.test(name)) {
      setError(
        'Certification name contains invalid characters'
      )
      return
    }

    if (organization) {
      if (organization.length < 2) {
        setError(
          'Organization must be at least 2 characters'
        )
        return
      }

      if (organization.length > 200) {
        setError(
          'Organization must be 200 characters or less'
        )
        return
      }

      if (!generalNameRegex.test(organization)) {
        setError(
          'Organization contains invalid characters'
        )
        return
      }
    }

    if (issueDate) {
      const issueDateRegex =
        /^(19|20)\d{2}(?:-(0[1-9]|1[0-2]))?$/

      if (!issueDateRegex.test(issueDate)) {
        setError(
          'Issue Date must be in YYYY or YYYY-MM format'
        )
        return
      }
    }

    const urlError =
      validateUrl(credentialUrl)

    if (urlError) {
      setError(
        `Credential URL: ${urlError}`
      )
      return
    }

    setIsSaving(true)

    try {
      const data = {
        name,
        organization:
          organization || undefined,
        issueDate:
          issueDate || undefined,
        credentialUrl:
          credentialUrl || undefined
      }

      if (editingId) {
        await updateCertification(
          token,
          cvId,
          editingId,
          data
        )
      } else {
        await createCertification(
          token,
          cvId,
          data
        )
      }

      resetForm()
      await loadCertifications()
      onChange?.()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to save certification'
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = (
    certification: Certification
  ) => {
    setEditingId(certification.id)

    setForm({
      name: certification.name,
      organization:
        certification.organization ?? '',
      issueDate:
        certification.issueDate ?? '',
      credentialUrl:
        certification.credentialUrl ?? ''
    })
  }

  const handleDelete = async (
    certificationId: number
  ) => {
    const confirmed = window.confirm(
      'Delete this certification?'
    )

    if (!confirmed) {
      return
    }

    setError('')

    try {
      await deleteCertification(
        token,
        cvId,
        certificationId
      )

      if (editingId === certificationId) {
        resetForm()
      }

      await loadCertifications()
      onChange?.()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to delete certification'
      )
    }
  }

  return (
    <section className="editor-section certifications-editor">
      <div className="editor-section-header">
        <div>
          <h2>Certifications</h2>

          <p>
            Add certifications and credentials.
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
          <label htmlFor="certification-name">
            Certification Name
          </label>

          <input
            id="certification-name"
            type="text"
            value={form.name}
            maxLength={200}
            onChange={(event) =>
              handleChange(
                'name',
                event.target.value
              )
            }
            placeholder="e.g. AWS Certified Cloud Practitioner"
            required
          />
        </div>

        <div className="editor-form-row">
          <div className="form-group">
            <label htmlFor="certification-organization">
              Organization
            </label>

            <input
              id="certification-organization"
              type="text"
              value={form.organization}
              maxLength={200}
              onChange={(event) =>
                handleChange(
                  'organization',
                  event.target.value
                )
              }
              placeholder="e.g. Amazon Web Services"
            />
          </div>

          <div className="form-group">
            <label htmlFor="certification-date">
              Issue Date
            </label>

            <input
              id="certification-date"
              type="text"
              maxLength={7}
              value={form.issueDate}
              onChange={(event) =>
                handleChange(
                  'issueDate',
                  event.target.value
                )
              }
              placeholder="e.g. 2026-09"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="certification-url">
            Credential URL
          </label>

          <input
            id="certification-url"
            type="url"
            maxLength={500}
            value={form.credentialUrl}
            onChange={(event) =>
              handleChange(
                'credentialUrl',
                event.target.value
              )
            }
            placeholder="https://..."
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
                ? 'Update Certification'
                : 'Add Certification'}
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
          <p>Loading certifications...</p>
        )}

        {!isLoading &&
          certifications.length === 0 && (
            <p>
              No certifications added yet.
            </p>
          )}

        {!isLoading &&
          certifications.map((certification) => (
            <article
              key={certification.id}
              className="editor-item"
            >
              <div>
                <h3>
                  {certification.name}
                </h3>

                {certification.organization && (
                  <p>
                    {certification.organization}
                  </p>
                )}

                {certification.issueDate && (
                  <p>
                    Issued:{' '}
                    {certification.issueDate}
                  </p>
                )}

                {certification.credentialUrl && (
                  <p>
                    <a
                      href={
                        certification.credentialUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Credential
                    </a>
                  </p>
                )}
              </div>

              <div className="editor-item-actions">
                <button
                  type="button"
                  onClick={() =>
                    handleEdit(certification)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      certification.id
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

export default CertificationsSection