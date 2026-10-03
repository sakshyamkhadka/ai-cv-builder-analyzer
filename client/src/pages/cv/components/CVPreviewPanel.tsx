import type { RefObject } from 'react'

import CVPreview from '../../../components/cv/CVPreview'
import CVPreviewControls from './CVPreviewControls'

interface CVPreviewPanelProps {
    previewRef: RefObject<HTMLElement | null>
    previewVisible: boolean
    previewZoom: number

    templateId: number | null
    title: string
    fullName: string
    email: string
    phone: string
    location: string
    photoUrl: string
    photoPreview: string
    linkedinUrl: string
    githubUrl: string
    portfolioUrl: string
    summary: string

    education: any[]
    skills: any[]
    experiences: any[]
    projects: any[]
    certifications: any[]
    languages: any[]

    handleZoomOut: () => void
    handleZoomIn: () => void
    onClose: () => void
}

export default function CVPreviewPanel({
    previewRef,
    previewVisible,
    previewZoom,

    templateId,
    title,
    fullName,
    email,
    phone,
    location,
    photoUrl,
    photoPreview,
    linkedinUrl,
    githubUrl,
    portfolioUrl,
    summary,

    education,
    skills,
    experiences,
    projects,
    certifications,
    languages,

    handleZoomOut,
    handleZoomIn,
    onClose
}: CVPreviewPanelProps) {
    return (
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

                <CVPreviewControls
                    previewZoom={previewZoom}
                    previewVisible={previewVisible}
                    handleZoomOut={handleZoomOut}
                    handleZoomIn={handleZoomIn}
                    onClose={onClose}
                />

            </div>

            <div className="cv-preview-stage">

                <div
                    className="cv-preview-scale"
                    style={{
                        transform:
                            `scale(${previewZoom / 100})`
                    }}
                >
                    <CVPreview
                        templateId={templateId ?? 1}
                        title={title}
                        fullName={fullName}
                        email={email}
                        phone={phone}
                        location={location}
                        photoUrl={
                            photoPreview ||
                            photoUrl
                        }
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
                    />
                </div>

            </div>

        </aside>
    )
}