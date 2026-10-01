import type { ReactNode } from 'react'

import type {
    TemplateProps
} from './template.types'

function ModernSection({
    title,
    children
}: {
    title: string
    children: ReactNode
}) {
    return (
        <section className="cv-preview-modern__section">
            <h2>{title}</h2>
            {children}
        </section>
    )
}

export default function ModernTemplate({
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
        <div className="cv-preview-modern">

            <header className="cv-preview-modern__header">

                <div>
                    <h1>
                        {fullName || 'Your Name'}
                    </h1>

                    <p>
                        {title || 'Professional Resume'}
                    </p>
                </div>

                <div className="cv-preview-modern__contact">

                    {email && (
                        <span>
                            {email}
                        </span>
                    )}

                    {phone && (
                        <span>
                            {phone}
                        </span>
                    )}

                </div>

            </header>

            <div className="cv-preview-modern__body">

                <aside className="cv-preview-modern__sidebar">

                    {skills.length > 0 && (
                        <section className="cv-preview-modern__sidebar-section">

                            <h2>
                                Skills
                            </h2>

                            <div className="cv-preview-modern__skill-list">

                                {skills.map((skill) => (
                                    <div
                                        key={skill.id}
                                        className="cv-preview-modern__skill"
                                    >
                                        <strong>
                                            {skill.name}
                                        </strong>

                                        {skill.level && (
                                            <span>
                                                {skill.level}
                                            </span>
                                        )}
                                    </div>
                                ))}

                            </div>

                        </section>
                    )}

                    {languages.length > 0 && (
                        <section className="cv-preview-modern__sidebar-section">

                            <h2>
                                Languages
                            </h2>

                            <div className="cv-preview-modern__language-list">

                                {languages.map((language) => (
                                    <div
                                        key={language.id}
                                    >
                                        <strong>
                                            {language.name}
                                        </strong>

                                        {language.proficiency && (
                                            <span>
                                                {language.proficiency}
                                            </span>
                                        )}
                                    </div>
                                ))}

                            </div>

                        </section>
                    )}

                </aside>

                <main className="cv-preview-modern__main">

                    {summary && (
                        <ModernSection title="Profile">
                            <p>
                                {summary}
                            </p>
                        </ModernSection>
                    )}

                    {experiences.length > 0 && (
                        <ModernSection title="Experience">

                            {experiences.map((item) => (
                                <article
                                    className="cv-preview-modern__item"
                                    key={item.id}
                                >

                                    <div className="cv-preview-modern__item-heading">

                                        <div>
                                            <h3>
                                                {item.position}
                                            </h3>

                                            <p>
                                                {item.company}
                                            </p>
                                        </div>

                                        {(item.startDate ||
                                            item.endDate) && (
                                            <span>
                                                {item.startDate || ''}
                                                {' — '}
                                                {item.endDate ||
                                                    'Present'}
                                            </span>
                                        )}

                                    </div>

                                    {item.description && (
                                        <p>
                                            {item.description}
                                        </p>
                                    )}

                                </article>
                            ))}

                        </ModernSection>
                    )}

                    {education.length > 0 && (
                        <ModernSection title="Education">

                            {education.map((item) => (
                                <article
                                    className="cv-preview-modern__item"
                                    key={item.id}
                                >

                                    <div className="cv-preview-modern__item-heading">

                                        <div>
                                            <h3>
                                                {item.degree}
                                            </h3>

                                            {item.field && (
                                                <p>
                                                    {item.field}
                                                </p>
                                            )}

                                            <p>
                                                {item.institution}
                                            </p>
                                        </div>

                                        {(item.startDate ||
                                            item.endDate) && (
                                            <span>
                                                {item.startDate || ''}
                                                {' — '}
                                                {item.endDate ||
                                                    'Present'}
                                            </span>
                                        )}

                                    </div>

                                    {item.description && (
                                        <p>
                                            {item.description}
                                        </p>
                                    )}

                                </article>
                            ))}

                        </ModernSection>
                    )}

                    {projects.length > 0 && (
                        <ModernSection title="Projects">

                            {projects.map((project) => (
                                <article
                                    className="cv-preview-modern__item"
                                    key={project.id}
                                >

                                    <h3>
                                        {project.name}
                                    </h3>

                                    {project.technologies && (
                                        <p>
                                            <strong>
                                                Technologies:
                                            </strong>{' '}
                                            {project.technologies}
                                        </p>
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
                                        >
                                            View Project →
                                        </a>
                                    )}

                                </article>
                            ))}

                        </ModernSection>
                    )}

                    {certifications.length > 0 && (
                        <ModernSection title="Certifications">

                            {certifications.map((item) => (
                                <article
                                    className="cv-preview-modern__item"
                                    key={item.id}
                                >

                                    <h3>
                                        {item.name}
                                    </h3>

                                    {item.organization && (
                                        <p>
                                            {item.organization}
                                        </p>
                                    )}

                                    {item.issueDate && (
                                        <span>
                                            {item.issueDate}
                                        </span>
                                    )}

                                    {item.credentialUrl && (
                                        <a
                                            href={item.credentialUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View Credential →
                                        </a>
                                    )}

                                </article>
                            ))}

                        </ModernSection>
                    )}

                </main>

            </div>

        </div>
    )
}