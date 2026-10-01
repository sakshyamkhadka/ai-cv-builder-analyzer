import type { ReactNode } from 'react'

import type {
    TemplateProps
} from './template.types'

function ClassicSection({
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

export default function ClassicTemplate({
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
}: TemplateProps) {
    return (
        <>
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

            {summary && (
                <ClassicSection title="Professional Summary">
                    <p>{summary}</p>
                </ClassicSection>
            )}

            {education.length > 0 && (
                <ClassicSection title="Education">

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

                </ClassicSection>
            )}

            {experiences.length > 0 && (
                <ClassicSection title="Experience">

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

                </ClassicSection>
            )}

            {skills.length > 0 && (
                <ClassicSection title="Skills">

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

                </ClassicSection>
            )}

            {projects.length > 0 && (
                <ClassicSection title="Projects">

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
                                    href={project.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cv-preview__project-link"
                                >
                                    View Project →
                                </a>
                            )}
                        </div>
                    ))}

                </ClassicSection>
            )}

            {certifications.length > 0 && (
                <ClassicSection title="Certifications">

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
                                    href={item.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="cv-preview__project-link"
                                >
                                    View Credential →
                                </a>
                            )}
                        </div>
                    ))}

                </ClassicSection>
            )}

            {languages.length > 0 && (
                <ClassicSection title="Languages">

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

                </ClassicSection>
            )}
        </>
    )
}