import EducationSection from '../../../components/forms/EducationSection'
import SkillsSection from '../../../components/forms/SkillsSection'
import ExperienceSection from '../../../components/forms/ExperienceSection'
import ProjectsSection from '../../../components/forms/ProjectsSection'
import CertificationsSection from '../../../components/forms/CertificationsSection'
import LanguagesSection from '../../../components/forms/LanguagesSection'

import CVPersonalSection from './CVPersonalSection'
import CVTemplateSection from './CVTemplateSection'

import type { Template } from '../../../services/template.service'

type EditorSection =
    | 'overview'
    | 'education'
    | 'skills'
    | 'experience'
    | 'projects'
    | 'certifications'
    | 'languages'

interface CVEditorWorkspaceProps {
    activeSection: EditorSection
    token: string | null
    cvId: number

    title: string
    fullName: string
    email: string
    phone: string
    location: string
    photoUrl: string
    linkedinUrl: string
    githubUrl: string
    portfolioUrl: string
    summary: string
    photoPreview: string

    templates: Template[]
    templateId: number | null
    error: string

    setTitle: (value: string) => void
    setFullName: (value: string) => void
    setEmail: (value: string) => void
    setPhone: (value: string) => void
    setLocation: (value: string) => void
    setLinkedinUrl: (value: string) => void
    setGithubUrl: (value: string) => void
    setPortfolioUrl: (value: string) => void
    setSummary: (value: string) => void
    setTemplateId: (value: number) => void

    handleSubmit: (
        event: React.FormEvent<HTMLFormElement>
    ) => void

    handlePhotoChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void

    handleRemovePhoto: () => void

    loadCV: () => void | Promise<void>
}

export default function CVEditorWorkspace({
    activeSection,
    token,
    cvId,

    title,
    fullName,
    email,
    phone,
    location,
    photoUrl,
    linkedinUrl,
    githubUrl,
    portfolioUrl,
    summary,
    photoPreview,

    templates,
    templateId,
    error,

    setTitle,
    setFullName,
    setEmail,
    setPhone,
    setLocation,
    setLinkedinUrl,
    setGithubUrl,
    setPortfolioUrl,
    setSummary,
    setTemplateId,

    handleSubmit,
    handlePhotoChange,
    handleRemovePhoto,
    loadCV
}: CVEditorWorkspaceProps) {
    return (
        <section className="cv-editor-main">

            {activeSection === 'overview' && (
                <form
                    id="cv-overview-form"
                    className="cv-editor-content"
                    onSubmit={handleSubmit}
                >

                    <CVPersonalSection
                        title={title}
                        setTitle={setTitle}
                        fullName={fullName}
                        setFullName={setFullName}
                        email={email}
                        setEmail={setEmail}
                        phone={phone}
                        setPhone={setPhone}
                        location={location}
                        setLocation={setLocation}
                        linkedinUrl={linkedinUrl}
                        setLinkedinUrl={setLinkedinUrl}
                        githubUrl={githubUrl}
                        setGithubUrl={setGithubUrl}
                        portfolioUrl={portfolioUrl}
                        setPortfolioUrl={setPortfolioUrl}
                        summary={summary}
                        setSummary={setSummary}
                        photoUrl={photoUrl}
                        photoPreview={photoPreview}
                        handlePhotoChange={handlePhotoChange}
                        handleRemovePhoto={handleRemovePhoto}
                    />

                    <CVTemplateSection
                        templates={templates}
                        templateId={templateId}
                        setTemplateId={setTemplateId}
                    />

                    {error && (
                        <p className="auth-error">
                            {error}
                        </p>
                    )}

                </form>
            )}

            {activeSection === 'education' && (
                <EditorSectionLayout
                    step="STEP 02"
                    title="Education"
                    description="Add your academic background."
                >
                    <EducationSection
                        token={token!}
                        cvId={cvId}
                        onChange={loadCV}
                    />
                </EditorSectionLayout>
            )}

            {activeSection === 'experience' && (
                <EditorSectionLayout
                    step="STEP 03"
                    title="Experience"
                    description="Add your professional experience."
                >
                    <ExperienceSection
                        token={token!}
                        cvId={cvId}
                        onChange={loadCV}
                    />
                </EditorSectionLayout>
            )}

            {activeSection === 'skills' && (
                <EditorSectionLayout
                    step="STEP 04"
                    title="Skills"
                    description="Highlight the skills that make you valuable."
                >
                    <SkillsSection
                        token={token!}
                        cvId={cvId}
                        onChange={loadCV}
                    />
                </EditorSectionLayout>
            )}

            {activeSection === 'projects' && (
                <EditorSectionLayout
                    step="STEP 05"
                    title="Projects"
                    description="Show what you have built."
                >
                    <ProjectsSection
                        token={token!}
                        cvId={cvId}
                        onChange={loadCV}
                    />
                </EditorSectionLayout>
            )}

            {activeSection === 'certifications' && (
                <EditorSectionLayout
                    step="STEP 06"
                    title="Certifications"
                    description="Add certifications and professional achievements."
                >
                    <CertificationsSection
                        token={token!}
                        cvId={cvId}
                        onChange={loadCV}
                    />
                </EditorSectionLayout>
            )}

            {activeSection === 'languages' && (
                <EditorSectionLayout
                    step="STEP 07"
                    title="Languages"
                    description="Add languages and proficiency levels."
                >
                    <LanguagesSection
                        token={token!}
                        cvId={cvId}
                        onChange={loadCV}
                    />
                </EditorSectionLayout>
            )}

        </section>
    )
}

interface EditorSectionLayoutProps {
    step: string
    title: string
    description: string
    children: React.ReactNode
}

function EditorSectionLayout({
    step,
    title,
    description,
    children
}: EditorSectionLayoutProps) {
    return (
        <div className="cv-editor-content">

            <div className="cv-content-heading">

                <span>
                    {step}
                </span>

                <h2>
                    {title}
                </h2>

                <p>
                    {description}
                </p>

            </div>

            <div className="cv-editor-panel">
                {children}
            </div>

        </div>
    )
}