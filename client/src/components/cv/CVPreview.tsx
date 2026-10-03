import { useRef, useState } from 'react'

import { downloadElementAsPdf } from '../../utils/pdf'

import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'

import type {
    Education,
    Skill,
    Experience,
    Project,
    Certification,
    Language
} from './templates/template.types'

interface CVPreviewProps {
    templateId: number

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

    education: Education[]
    skills: Skill[]
    experiences: Experience[]
    projects: Project[]
    certifications: Certification[]
    languages: Language[]
}

export default function CVPreview({
    templateId,

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

    education,
    skills,
    experiences,
    projects,
    certifications,
    languages
}: CVPreviewProps) {
    const previewRef =
        useRef<HTMLDivElement>(null)

    const [isExporting, setIsExporting] =
        useState(false)

    const handleDownloadPdf = async () => {
        if (!previewRef.current) {
            return
        }

        setIsExporting(true)

        try {
            const safeName =
                fullName.trim() || 'CV'

            await downloadElementAsPdf(
                previewRef.current,
                `${safeName}-CV.pdf`
            )
        } finally {
            setIsExporting(false)
        }
    }

    const templateProps = {
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

        education,
        skills,
        experiences,
        projects,
        certifications,
        languages
    }

    const renderTemplate = () => {
        switch (templateId) {
            case 3:
                return (
                    <ModernTemplate
                        {...templateProps}
                    />
                )

            case 1:
            default:
                return (
                    <ClassicTemplate
                        {...templateProps}
                    />
                )
        }
    }

    return (
        <div className="cv-preview">

            <div className="cv-preview__toolbar">

                <div className="cv-preview__actions">

                    <button
                        type="button"
                        onClick={
                            handleDownloadPdf
                        }
                        disabled={isExporting}
                    >
                        {isExporting
                            ? 'Generating PDF...'
                            : 'Download PDF'}
                    </button>

                </div>

            </div>

            <div
                ref={previewRef}
                className="cv-preview__paper"
            >
                {renderTemplate()}
            </div>

        </div>
    )
}