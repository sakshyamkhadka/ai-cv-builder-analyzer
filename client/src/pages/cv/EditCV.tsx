import {
    useCallback,
    useEffect,
    useState
} from 'react'
import type { FormEvent } from 'react'
import {
    Link,
    useParams
} from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import SkillsSection from '../../components/forms/SkillsSection'
import ExperienceSection from '../../components/forms/ExperienceSection'
import ProjectsSection from '../../components/forms/ProjectsSection'
import CertificationsSection from '../../components/forms/CertificationsSection'
import LanguagesSection from '../../components/forms/LanguagesSection'

import {
    getCVById,
    updateCV
} from '../../services/cv.service'

import {
    getTemplates,
    type Template
} from '../../services/template.service'

import EducationSection from '../../components/forms/EducationSection'

const EditCV = () => {
    const { id } = useParams()
    const { token } = useAuth()

    const cvId = Number(id)

    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')

    const [templates, setTemplates] =
        useState<Template[]>([])

    const [templateId, setTemplateId] =
        useState<number | null>(null)

    const [isLoading, setIsLoading] =
        useState(true)

    const [isSaving, setIsSaving] =
        useState(false)

    const [error, setError] = useState('')

    const [successMessage, setSuccessMessage] =
        useState('')

    const loadCV = useCallback(async () => {
        if (
            !token ||
            !Number.isInteger(cvId) ||
            cvId <= 0
        ) {
            setError('Invalid CV')
            setIsLoading(false)
            return
        }

        try {
            const [
                cvResponse,
                templateResponse
            ] = await Promise.all([
                getCVById(token, cvId),
                getTemplates()
            ])

            if (!cvResponse.cv) {
                throw new Error('CV not found')
            }

            setTitle(cvResponse.cv.title)

            setSummary(
                cvResponse.cv.summary ?? ''
            )

            setTemplates(
                templateResponse.templates
            )

            setTemplateId(
                cvResponse.cv.templateId
            )
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to load CV'
            )
        } finally {
            setIsLoading(false)
        }
    }, [cvId, token])

    useEffect(() => {
        loadCV()
    }, [loadCV])

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        if (!token) {
            setError('You must be logged in')
            return
        }

        if (!templateId) {
            setError('You must select a template')
            return
        }

        setError('')
        setSuccessMessage('')
        setIsSaving(true)

        try {
            const response = await updateCV(
                token,
                cvId,
                {
                    title,
                    templateId,
                    summary: summary || undefined
                }
            )

            if (!response.cv) {
                throw new Error(
                    'Updated CV was not returned'
                )
            }

            setSuccessMessage(
                'CV saved successfully'
            )
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to save CV'
            )
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <main className="cv-editor-page">
                <p>Loading CV...</p>
            </main>
        )
    }

    if (error && !title) {
        return (
            <main className="cv-editor-page">
                <h1>Unable to load CV</h1>

                <p className="auth-error">
                    {error}
                </p>

                <Link to="/dashboard">
                    Back to Dashboard
                </Link>
            </main>
        )
    }

    return (
        <main className="cv-editor-page">
            <header className="cv-editor-header">
                <div>
                    <p>CV Builder</p>

                    <h1>Edit CV</h1>
                </div>

                <Link to="/dashboard">
                    Back to Dashboard
                </Link>
            </header>

            <section className="cv-editor-card">
                <form
                    className="cv-create-form"
                    onSubmit={handleSubmit}
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
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="summary">
                            Professional Summary
                        </label>

                        <textarea
                            id="summary"
                            rows={7}
                            value={summary}
                            onChange={(event) =>
                                setSummary(event.target.value)
                            }
                            placeholder="Write your professional summary..."
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Template
                        </label>

                        {templates.length === 0 ? (
                            <p>
                                No active templates are available.
                            </p>
                        ) : (
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

                    {successMessage && (
                        <p className="auth-success">
                            {successMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={
                            isSaving ||
                            !templateId
                        }
                    >
                        {isSaving
                            ? 'Saving...'
                            : 'Save Changes'}
                    </button>
                </form>
                <section className="cv-editor-sections">
                    <EducationSection
                        token={token!}
                        cvId={cvId}
                    />

                    <SkillsSection
                        token={token!}
                        cvId={cvId}
                    />

                    <ExperienceSection
                        token={token!}
                        cvId={cvId}
                    />

                    <ProjectsSection
                        token={token!}
                        cvId={cvId}
                    />

                    <CertificationsSection
                        token={token!}
                        cvId={cvId}
                    />

                    <LanguagesSection
                        token={token!}
                        cvId={cvId}
                    />
                </section>
            </section>
        </main>
    )
}

export default EditCV