import {
    useState
} from 'react'

import {
    Link,
    useParams
} from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'

import CVEditorHeader from './components/CVEditorHeader'
import CVEditorWorkspace from './components/CVEditorWorkspace'
import CVEditorSidebar from './components/CVEditorSidebar'
import CVPreviewPanel from './components/CVPreviewPanel'

import { useCVPhoto } from './hooks/useCVPhoto'
import { useCVPreview } from './hooks/useCVPreview'
import { useCVSave } from './hooks/useCVSave'
import { useCVEditorData } from './hooks/useCVEditorData'

import type { Template } from '../../services/template.service'

import {
    editorSections,
    type EditorSection
} from './constants/editorSections'

const EditCV = () => {
    const { id } = useParams()
    const { token } = useAuth()

    const cvId = Number(id)

    const {
        previewRef,
        previewVisible,
        previewZoom,
        handlePreview,
        handleZoomIn,
        handleZoomOut,
        handleClosePreview
    } = useCVPreview()
    const [title, setTitle] = useState('')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')
    const [photoUrl, setPhotoUrl] = useState('')


    const [linkedinUrl, setLinkedinUrl] =
        useState('')

    const [githubUrl, setGithubUrl] =
        useState('')

    const [portfolioUrl, setPortfolioUrl] =
        useState('')

    const [summary, setSummary] =
        useState('')

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


    const [error, setError] =
        useState('')


    const {
        photoPreview,
        handlePhotoChange,
        handleRemovePhoto
    } = useCVPhoto({
        setError
    })

    const { loadCV } = useCVEditorData({
        token,
        cvId,

        setTitle,
        setFullName,
        setEmail,
        setPhone,
        setLocation,
        setPhotoUrl,
        setLinkedinUrl,
        setGithubUrl,
        setPortfolioUrl,
        setSummary,

        setEducation,
        setSkills,
        setExperiences,
        setProjects,
        setCertifications,
        setLanguages,

        setTemplates,
        setTemplateId,

        setError,
        setIsLoading
    })
    const {
        isSaving,
        successMessage,
        handleSubmit
    } = useCVSave({
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
        templateId,
        summary,

        loadCV,
        setError
    })




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

            <CVEditorHeader
                title={title}
                successMessage={successMessage}
                isSaving={isSaving}
                previewVisible={previewVisible}
                onPreview={handlePreview}
            />


            <div className="cv-editor-workspace">

                <CVEditorSidebar
                    sections={editorSections}
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                />


                <CVEditorWorkspace
                    activeSection={activeSection}
                    token={token}
                    cvId={cvId}

                    title={title}
                    fullName={fullName}
                    email={email}
                    phone={phone}
                    location={location}
                    photoUrl={photoUrl}

                    linkedinUrl={linkedinUrl}
                    githubUrl={githubUrl}
                    portfolioUrl={portfolioUrl}
                    summary={summary}

                    photoPreview={photoPreview}

                    templates={templates}
                    templateId={templateId}

                    error={error}

                    setTitle={setTitle}
                    setFullName={setFullName}
                    setEmail={setEmail}
                    setPhone={setPhone}
                    setLocation={setLocation}
                    setLinkedinUrl={setLinkedinUrl}
                    setGithubUrl={setGithubUrl}
                    setPortfolioUrl={setPortfolioUrl}
                    setSummary={setSummary}
                    setTemplateId={setTemplateId}

                    handleSubmit={handleSubmit}
                    handlePhotoChange={handlePhotoChange}
                    handleRemovePhoto={handleRemovePhoto}

                    loadCV={loadCV}
                />
                <CVPreviewPanel
                    previewRef={previewRef}
                    previewVisible={previewVisible}
                    previewZoom={previewZoom}

                    templateId={templateId}

                    title={title}
                    fullName={fullName}
                    email={email}
                    phone={phone}
                    location={location}

                    photoUrl={photoUrl}
                    photoPreview={photoPreview}

                    linkedinUrl={linkedinUrl}
                    githubUrl={githubUrl}
                    portfolioUrl={portfolioUrl}

                    summary={summary}

                    education={education}
                    skills={skills}
                    experiences={experiences}
                    projects={projects}
                    certifications={certifications}
                    languages={languages}

                    handleZoomOut={handleZoomOut}
                    handleZoomIn={handleZoomIn}

                    onClose={handleClosePreview}
                />


            </div>

        </main>
    )
}


export default EditCV
