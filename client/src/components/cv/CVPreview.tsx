import {
    useRef,
    useState,
    type ReactNode
} from 'react'

import { downloadElementAsPdf } from '../../utils/pdf'

interface Education {
    id: number
    institution: string
    degree: string
    field: string | null
    startDate: string | null
    endDate: string | null
    description: string | null
}

interface Skill {
    id: number
    name: string
    level: string | null
}

interface Experience {
    id: number
    company: string
    position: string
    startDate: string | null
    endDate: string | null
    description: string | null
}

interface Project {
    id: number
    name: string
    description: string | null
    technologies: string | null
    projectUrl: string | null
}

interface Certification {
    id: number
    name: string
    organization: string | null
    issueDate: string | null
    credentialUrl: string | null
}

interface Language {
    id: number
    name: string
    proficiency: string | null
}

interface CVPreviewProps {
    title: string
    fullName: string
    email: string
    phone: string
    summary: string
    education: Education[]
    skills: Skill[]
    experiences: Experience[]
    projects: Project[]
    certifications: Certification[]
    languages: Language[]
    children?: ReactNode
}

function Section({
    title,
    children
}: {
    title: string
    children: ReactNode
}) {
    return (
        <section className="cv-preview__section">
            <h2>{title}</h2>
            {children}
        </section>
    )
}

export default function CVPreview({
    title,
    fullName,
    email,
    phone,
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

    return (
        <div className="cv-preview">

            {/* PDF ACTION TOOLBAR */}

            <div className="cv-preview__toolbar">

                <div className="cv-preview__actions">

                    <button
                        type="button"
                        onClick={handleDownloadPdf}
                        disabled={isExporting}
                    >
                        {isExporting
                            ? 'Generating PDF...'
                            : 'Download PDF'}
                    </button>

                </div>

            </div>

            {/* CV PAPER */}

            <div
                ref={previewRef}
                className="cv-preview__paper"
            >

                {/* HEADER */}

                <header className="cv-preview__header">

                    <h1>
                        {fullName || 'Your Name'}
                    </h1>

                    <p className="cv-preview__role">
                        {title || 'Professional Resume'}
                    </p>

                    <div className="cv-preview__contact">

                        {email && (
                            <span>
                                📧 {email}
                            </span>
                        )}

                        {phone && (
                            <span>
                                📱 {phone}
                            </span>
                        )}

                    </div>

                </header>

                {/* SUMMARY */}

                {summary && (
                    <Section title="Professional Summary">

                        <p>
                            {summary}
                        </p>

                    </Section>
                )}

                {/* EDUCATION */}

                {education.length > 0 && (
                    <Section title="Education">

                        {education.map((item) => (
                            <div
                                className="cv-preview__item"
                                key={item.id}
                            >

                                <strong>
                                    {item.degree}
                                </strong>

                                {item.field && (
                                    <span>
                                        {item.field}
                                    </span>
                                )}

                                <span>
                                    {item.institution}
                                </span>

                                {(item.startDate ||
                                    item.endDate) && (
                                    <small>
                                        {item.startDate || ''}
                                        {' — '}
                                        {item.endDate ||
                                            'Present'}
                                    </small>
                                )}

                                {item.description && (
                                    <p>
                                        {item.description}
                                    </p>
                                )}

                            </div>
                        ))}

                    </Section>
                )}

                {/* EXPERIENCE */}

                {experiences.length > 0 && (
                    <Section title="Experience">

                        {experiences.map((item) => (
                            <div
                                className="cv-preview__item"
                                key={item.id}
                            >

                                <strong>
                                    {item.position}
                                </strong>

                                <span>
                                    {item.company}
                                </span>

                                {(item.startDate ||
                                    item.endDate) && (
                                    <small>
                                        {item.startDate || ''}
                                        {' — '}
                                        {item.endDate ||
                                            'Present'}
                                    </small>
                                )}

                                {item.description && (
                                    <p>
                                        {item.description}
                                    </p>
                                )}

                            </div>
                        ))}

                    </Section>
                )}

                {/* SKILLS */}

                {skills.length > 0 && (
                    <Section title="Skills">

                        <div className="cv-preview__skills">

                            {skills.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="cv-preview__skill"
                                >
                                    {skill.name}

                                    {skill.level
                                        ? ` · ${skill.level}`
                                        : ''}
                                </span>
                            ))}

                        </div>

                    </Section>
                )}

                {/* PROJECTS */}

                {projects.length > 0 && (
                    <Section title="Projects">

                        {projects.map((project) => (
                            <div
                                className="cv-preview__item"
                                key={project.id}
                            >

                                <strong>
                                    {project.name}
                                </strong>

                                {project.technologies && (
                                    <span>
                                        {project.technologies}
                                    </span>
                                )}

                                {project.description && (
                                    <p>
                                        {project.description}
                                    </p>
                                )}

                                {project.projectUrl && (
                                    <a
                                        href={
                                            project.projectUrl
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cv-preview__project-link"
                                    >
                                        View Project →
                                    </a>
                                )}

                            </div>
                        ))}

                    </Section>
                )}

                {/* CERTIFICATIONS */}

                {certifications.length > 0 && (
                    <Section title="Certifications">

                        {certifications.map((item) => (
                            <div
                                className="cv-preview__item"
                                key={item.id}
                            >

                                <strong>
                                    {item.name}
                                </strong>

                                {item.organization && (
                                    <span>
                                        {item.organization}
                                    </span>
                                )}

                                {item.issueDate && (
                                    <small>
                                        {item.issueDate}
                                    </small>
                                )}

                                {item.credentialUrl && (
                                    <a
                                        href={
                                            item.credentialUrl
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cv-preview__project-link"
                                    >
                                        View Credential →
                                    </a>
                                )}

                            </div>
                        ))}

                    </Section>
                )}

                {/* LANGUAGES */}

                {languages.length > 0 && (
                    <Section title="Languages">

                        <div className="cv-preview__skills">

                            {languages.map((language) => (
                                <span
                                    key={language.id}
                                    className="cv-preview__skill"
                                >
                                    {language.name}

                                    {language.proficiency
                                        ? ` · ${language.proficiency}`
                                        : ''}
                                </span>
                            ))}

                        </div>

                    </Section>
                )}

            </div>

        </div>
    )
}