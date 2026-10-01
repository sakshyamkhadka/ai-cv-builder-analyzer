
import {
    useCallback,
    useEffect,
    useRef,
    useState
} from 'react'
import type { FormEvent } from 'react'
import {
    Link,
    useParams
} from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'

import EducationSection from '../../components/forms/EducationSection'
import SkillsSection from '../../components/forms/SkillsSection'
import ExperienceSection from '../../components/forms/ExperienceSection'
import ProjectsSection from '../../components/forms/ProjectsSection'
import CertificationsSection from '../../components/forms/CertificationsSection'
import LanguagesSection from '../../components/forms/LanguagesSection'
import CVPreview from '../../components/cv/CVPreview'

import {
    getCVById,
    updateCV
} from '../../services/cv.service'

import {
    getEducation
} from '../../services/education.service'

import {
    getSkills
} from '../../services/skill.service'

import {
    getExperiences
} from '../../services/experience.service'

import {
    getProjects
} from '../../services/project.service'

import {
    getCertifications
} from '../../services/certification.service'

import {
    getLanguages
} from '../../services/language.service'

import {
    getTemplates,
    type Template
} from '../../services/template.service'


type EditorSection =
    | 'overview'
    | 'education'
    | 'skills'
    | 'experience'
    | 'projects'
    | 'certifications'
    | 'languages'



const EditCV = () => {
    const { id } = useParams()
    const { token } = useAuth()

    const cvId = Number(id)

    const previewRef =
        useRef<HTMLElement | null>(null)

    const [title, setTitle] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [summary, setSummary] = useState('')

    const [education, setEducation] =
        useState<any[]>([])

    const [skills, setSkills] =
        useState<any[]>([])

    const [experiences, setExperiences] =
        useState<any[]>([])

    const [projects, setProjects] =
        useState<any[]>([])

    const [certifications, setCertifications] =
        useState<any[]>([])

    const [languages, setLanguages] =
        useState<any[]>([])

    const [templates, setTemplates] =
        useState<Template[]>([])

    const [templateId, setTemplateId] =
        useState<number | null>(null)

    const [activeSection, setActiveSection] =
        useState<EditorSection>('overview')

    const [isLoading, setIsLoading] =
        useState(true)

    const [isSaving, setIsSaving] =
        useState(false)

    const [error, setError] = useState('')

    const [successMessage, setSuccessMessage] =
        useState('')

    const [previewVisible, setPreviewVisible] =
        useState(false)

    const [previewZoom, setPreviewZoom] =
        useState(100)

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
                templateResponse,
                educationResponse,
                skillsResponse,
                experiencesResponse,
                projectsResponse,
                certificationsResponse,
                languagesResponse
            ] = await Promise.all([
                getCVById(token, cvId),
                getTemplates(),
                getEducation(token, cvId),
                getSkills(token, cvId),
                getExperiences(token, cvId),
                getProjects(token, cvId),
                getCertifications(token, cvId),
                getLanguages(token, cvId)
            ])

            if (!cvResponse.cv) {
                throw new Error('CV not found')
            }

            setTitle(
                cvResponse.cv.title
            )

            setFullName(
                cvResponse.cv.fullName ?? ''
            )

            setEmail(
                cvResponse.cv.email ?? ''
            )

            setPhone(
                cvResponse.cv.phone ?? ''
            )

            setSummary(
                cvResponse.cv.summary ?? ''
            )

   

            setTemplates(
                templateResponse.templates
            )

            setTemplateId(
                cvResponse.cv.templateId
            )

            setEducation(
                educationResponse.education
            )

            setSkills(
                skillsResponse.skills
            )

            setExperiences(
                experiencesResponse.experiences
            )

            setProjects(
                projectsResponse.projects
            )

            setCertifications(
                certificationsResponse.certifications
            )

            setLanguages(
                languagesResponse.languages
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

    const handlePreview = () => {
        setPreviewVisible(true)

        requestAnimationFrame(() => {
            previewRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }

    const handleZoomIn = () => {
        setPreviewZoom((current) =>
            Math.min(current + 10, 150)
        )
    }

    const handleZoomOut = () => {
        setPreviewZoom((current) =>
            Math.max(current - 10, 60)
        )
    }

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        if (!token) {
            setError('You must be logged in')
            return
        }

        if (!templateId) {
            setError(
                'You must select a template'
            )
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
                    fullName:
                        fullName || undefined,
                    email:
                        email || undefined,
                    phone:
                        phone || undefined,
                    templateId,
                    summary:
                        summary || undefined
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

            await loadCV()
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

    const sections: {
        id: EditorSection
        label: string
        icon: string
    }[] = [
            {
                id: 'overview',
                label: 'Personal & Summary',
                icon: '01'
            },
            {
                id: 'education',
                label: 'Education',
                icon: '02'
            },
            {
                id: 'experience',
                label: 'Experience',
                icon: '03'
            },
            {
                id: 'skills',
                label: 'Skills',
                icon: '04'
            },
            {
                id: 'projects',
                label: 'Projects',
                icon: '05'
            },
            {
                id: 'certifications',
                label: 'Certifications',
                icon: '06'
            },
            {
                id: 'languages',
                label: 'Languages',
                icon: '07'
            }
        ]

    if (isLoading) {
        return (
            <main className="cv-editor-page">
                <div className="cv-editor-loading">
                    <div className="cv-loading-spinner" />

                    <p>
                        Loading your CV...
                    </p>
                </div>
            </main>
        )
    }

    if (error && !title) {
        return (
            <main className="cv-editor-page">
                <div className="cv-editor-error">

                    <h1>
                        Unable to load CV
                    </h1>

                    <p className="auth-error">
                        {error}
                    </p>

                    <Link to="/dashboard">
                        Back to Dashboard
                    </Link>

                </div>
            </main>
        )
    }

    return (
        <main className="cv-editor-page">

            <header className="cv-editor-topbar">

                <div className="cv-editor-topbar-left">

                    <Link
                        to="/dashboard"
                        className="cv-back-link"
                    >
                        ←
                    </Link>

                    <div>

                        <span className="cv-editor-eyebrow">
                            CV Builder
                        </span>

                        <h1>
                            {title || 'Untitled CV'}
                        </h1>

                    </div>

                </div>

                <div className="cv-editor-topbar-actions">

                    {successMessage && (
                        <span className="cv-save-status">
                            ✓ {successMessage}
                        </span>
                    )}

                    <button
                        type="button"
                        className={
                            previewVisible
                                ? 'cv-preview-button active'
                                : 'cv-preview-button'
                        }
                        onClick={handlePreview}
                    >
                        Preview
                    </button>

                    <button
                        type="submit"
                        form="cv-overview-form"
                        className="cv-save-button"
                        disabled={isSaving}
                    >
                        {isSaving
                            ? 'Saving...'
                            : 'Save CV'}
                    </button>

                </div>

            </header>

            <div className="cv-editor-workspace">

                <aside className="cv-editor-sidebar">

                    <div className="cv-sidebar-heading">
                        <span>
                            BUILD YOUR CV
                        </span>
                    </div>

                    <nav className="cv-section-navigation">

                        {sections.map((section) => (
                            <button
                                key={section.id}
                                type="button"
                                className={
                                    activeSection ===
                                        section.id
                                        ? 'cv-section-nav-item active'
                                        : 'cv-section-nav-item'
                                }
                                onClick={() =>
                                    setActiveSection(
                                        section.id
                                    )
                                }
                            >
                                <span className="cv-section-number">
                                    {section.icon}
                                </span>

                                <span>
                                    {section.label}
                                </span>

                                {activeSection ===
                                    section.id && (
                                        <span className="cv-section-arrow">
                                            →
                                        </span>
                                    )}
                            </button>
                        ))}

                    </nav>

                    <div className="cv-completion-card">

                        <div className="cv-completion-header">
                            <span>
                                CV Completion
                            </span>

                            <strong>
                                25%
                            </strong>
                        </div>

                        <div className="cv-completion-track">

                            <div
                                className="cv-completion-progress"
                                style={{
                                    width: '25%'
                                }}
                            />

                        </div>

                        <p>
                            Complete your CV to unlock
                            AI analysis.
                        </p>

                    </div>

                </aside>

                <section className="cv-editor-main">

                    {activeSection === 'overview' && (
                        <form
                            id="cv-overview-form"
                            className="cv-editor-content"
                            onSubmit={handleSubmit}
                        >

                            <div className="cv-content-heading">

                                <span>
                                    STEP 01
                                </span>

                                <h2>
                                    Personal & Professional Summary
                                </h2>

                                <p>
                                    Start with the information
                                    employers see first.
                                </p>

                            </div>

                            <div className="cv-editor-panel">

                                {/* Full Name */}

                                <div className="form-group">

                                    <label htmlFor="fullName">
                                        Full Name
                                    </label>

                                    <input
                                        id="fullName"
                                        type="text"
                                        value={fullName}
                                        onChange={(event) =>
                                            setFullName(
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. Sakshyam Khadka"
                                    />

                                </div>

                                {/* Email */}

                                <div className="form-group">

                                    <label htmlFor="email">
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. sakshyam@example.com"
                                    />

                                </div>

                                {/* Phone */}

                                <div className="form-group">

                                    <label htmlFor="phone">
                                        Phone Number
                                    </label>

                                    <input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(event) =>
                                            setPhone(
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. +977 98XXXXXXXX"
                                    />

                                </div>

                                {/* CV Title */}

                                <div className="form-group">

                                    <label htmlFor="title">
                                        CV Title
                                    </label>

                                    <input
                                        id="title"
                                        type="text"
                                        value={title}
                                        onChange={(event) =>
                                            setTitle(
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. Software Developer CV"
                                        required
                                    />

                                </div>

                                {/* Professional Summary */}

                                <div className="form-group">

                                    <div className="cv-field-label-row">

                                        <label htmlFor="summary">
                                            Professional Summary
                                        </label>

                                        <span>
                                            Recommended
                                        </span>

                                    </div>

                                    <textarea
                                        id="summary"
                                        rows={8}
                                        value={summary}
                                        onChange={(event) =>
                                            setSummary(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Write a concise summary of your experience, strengths, skills and career goals..."
                                    />

                                    <div className="cv-ai-hint">

                                        <span>
                                            ✦
                                        </span>

                                        <p>
                                            AI suggestions will
                                            appear here in the
                                            next phase.
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {/* Template Selection */}

                            <div className="cv-editor-panel">

                                <div className="cv-panel-heading">

                                    <div>

                                        <span>
                                            DESIGN
                                        </span>

                                        <h3>
                                            Choose your template
                                        </h3>

                                    </div>

                                    <p>
                                        You can change this
                                        anytime.
                                    </p>

                                </div>

                                {templates.length === 0 ? (
                                    <p>
                                        No active templates
                                        are available.
                                    </p>
                                ) : (
                                    <div className="template-grid">

                                        {templates.map(
                                            (template) => (
                                                <button
                                                    key={
                                                        template.id
                                                    }
                                                    type="button"
                                                    className={
                                                        templateId ===
                                                            template.id
                                                            ? 'template-option active'
                                                            : 'template-option'
                                                    }
                                                    onClick={() =>
                                                        setTemplateId(
                                                            template.id
                                                        )
                                                    }
                                                >

                                                    <div className="template-preview-placeholder">

                                                        <span>
                                                            {template.name
                                                                .charAt(
                                                                    0
                                                                )
                                                                .toUpperCase()}
                                                        </span>

                                                    </div>

                                                    <div>

                                                        <strong>
                                                            {
                                                                template.name
                                                            }
                                                        </strong>

                                                        {template.description && (
                                                            <span>
                                                                {
                                                                    template.description
                                                                }
                                                            </span>
                                                        )}

                                                    </div>

                                                </button>
                                            )
                                        )}

                                    </div>
                                )}

                            </div>

                            {error && (
                                <p className="auth-error">
                                    {error}
                                </p>
                            )}

                        </form>
                    )}

                    {activeSection === 'education' && (
                        <div className="cv-editor-content">

                            <div className="cv-content-heading">

                                <span>
                                    STEP 02
                                </span>

                                <h2>
                                    Education
                                </h2>

                                <p>
                                    Add your academic background.
                                </p>

                            </div>

                            <div className="cv-editor-panel">

                                <EducationSection
                                    token={token!}
                                    cvId={cvId}
                                    onChange={loadCV}
                                />

                            </div>

                        </div>
                    )}

                    {activeSection === 'experience' && (
                        <div className="cv-editor-content">

                            <div className="cv-content-heading">

                                <span>
                                    STEP 03
                                </span>

                                <h2>
                                    Experience
                                </h2>

                                <p>
                                    Add your professional
                                    experience.
                                </p>

                            </div>

                            <div className="cv-editor-panel">

                                <ExperienceSection
                                    token={token!}
                                    cvId={cvId}
                                    onChange={loadCV}
                                />

                            </div>

                        </div>
                    )}

                    {activeSection === 'skills' && (
                        <div className="cv-editor-content">

                            <div className="cv-content-heading">

                                <span>
                                    STEP 04
                                </span>

                                <h2>
                                    Skills
                                </h2>

                                <p>
                                    Highlight the skills that
                                    make you valuable.
                                </p>

                            </div>

                            <div className="cv-editor-panel">

                                <SkillsSection
                                    token={token!}
                                    cvId={cvId}
                                    onChange={loadCV}
                                />

                            </div>

                        </div>
                    )}

                    {activeSection === 'projects' && (
                        <div className="cv-editor-content">

                            <div className="cv-content-heading">

                                <span>
                                    STEP 05
                                </span>

                                <h2>
                                    Projects
                                </h2>

                                <p>
                                    Show what you have built.
                                </p>

                            </div>

                            <div className="cv-editor-panel">

                                <ProjectsSection
                                    token={token!}
                                    cvId={cvId}
                                    onChange={loadCV}
                                />

                            </div>

                        </div>
                    )}

                    {activeSection === 'certifications' && (
                        <div className="cv-editor-content">

                            <div className="cv-content-heading">

                                <span>
                                    STEP 06
                                </span>

                                <h2>
                                    Certifications
                                </h2>

                                <p>
                                    Add certifications and
                                    professional achievements.
                                </p>

                            </div>

                            <div className="cv-editor-panel">

                                <CertificationsSection
                                    token={token!}
                                    cvId={cvId}
                                    onChange={loadCV}
                                />

                            </div>

                        </div>
                    )}

                    {activeSection === 'languages' && (
                        <div className="cv-editor-content">

                            <div className="cv-content-heading">

                                <span>
                                    STEP 07
                                </span>

                                <h2>
                                    Languages
                                </h2>

                                <p>
                                    Add languages and proficiency
                                    levels.
                                </p>

                            </div>

                            <div className="cv-editor-panel">

                                <LanguagesSection
                                    token={token!}
                                    cvId={cvId}
                                    onChange={loadCV}
                                />

                            </div>

                        </div>
                    )}

                </section>

                <aside
                    ref={previewRef}
                    className={
                        previewVisible
                            ? 'cv-live-preview visible'
                            : 'cv-live-preview'
                    }
                >

                    <div className="cv-preview-header">

                        <div>

                            <span>
                                LIVE PREVIEW
                            </span>

                            <h2>
                                CV
                            </h2>

                        </div>

                        <div className="cv-preview-controls">

                            <button
                                type="button"
                                aria-label="Zoom out"
                                onClick={
                                    handleZoomOut
                                }
                            >
                                −
                            </button>

                            <span className="cv-preview-zoom">
                                {previewZoom}%
                            </span>

                            <button
                                type="button"
                                aria-label="Zoom in"
                                onClick={
                                    handleZoomIn
                                }
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <div className="cv-preview-stage">

                        <div
                            className="cv-preview-scale"
                            style={{
                                transform:
                                    `scale(${previewZoom / 100})`
                            }}
                        >

                            <CVPreview templateId={templateId ?? 1}
                                title={title}
                                fullName={fullName}
                                email={email}
                                phone={phone}
                                summary={summary}
                                education={education}
                                skills={skills}
                                experiences={experiences}
                                projects={projects}
                                certifications={
                                    certifications
                                }
                                languages={languages}
                            />
                        </div>

                    </div>

                </aside>

            </div>

        </main>
    )
}

export default EditCV
