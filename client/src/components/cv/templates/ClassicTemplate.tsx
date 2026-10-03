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
        <section className="cv-classic__section">
            <h2>{title}</h2>
            {children}
        </section>
    )
}

const getProfileName = (url: string) => {
    try {
        const parsed = new URL(url)
        const parts = parsed.pathname
            .split('/')
            .filter(Boolean)

        return parts[parts.length - 1] || url
    } catch {
        return url
    }
}
export default function ClassicTemplate({
    title,
    fullName,
    photoUrl,
    email,
    phone,
    location,
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
}: TemplateProps) {
    return (
        <div className="cv-classic">

            <header className="cv-classic__header">

                <div className="cv-classic__header-content">

                    {photoUrl && (
                        <img
                            src={photoUrl}
                            alt="Profile"
                            className="cv-classic__photo"
                        />
                    )}

                    <div className="cv-classic__identity">
                        <h1>
                            {fullName || 'YOUR NAME'}
                        </h1>

                        <p>
                            {title || 'Professional Resume'}
                        </p>
                    </div>

                </div>

            </header>

            <div className="cv-classic__body">

                <aside className="cv-classic__sidebar">

                    {(email ||
                        phone ||
                        location ||
                        linkedinUrl ||
                        githubUrl ||
                        portfolioUrl) && (
                        <ClassicSection title="Contact">

                            <div className="cv-classic__contact">

                                {email && (
                                    <div>
                                        <strong>Email</strong>
                                        <span>{email}</span>
                                    </div>
                                )}

                                {phone && (
                                    <div>
                                        <strong>Phone</strong>
                                        <span>{phone}</span>
                                    </div>
                                )}

                                {location && (
                                    <div>
                                        <strong>Location</strong>
                                        <span>{location}</span>
                                    </div>
                                )}

                                {linkedinUrl && (
                                    <div>
                                        <strong>LinkedIn</strong>
                                        <a
                                            href={linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {getProfileName(linkedinUrl)}
                                        </a>
                                    </div>
                                )}

                                {githubUrl && (
                                    <div>
                                        <strong>GitHub</strong>
                                        <a
                                            href={githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {getProfileName(githubUrl)}
                                        </a>
                                    </div>
                                )}

                                {portfolioUrl && (
                                    <div>
                                        <strong>Portfolio</strong>
                                        <a
                                            href={portfolioUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Resume
                                        </a>
                                    </div>
                                )}

                            </div>

                        </ClassicSection>
                    )}

                    {education.length > 0 && (
                        <ClassicSection title="Education">

                            {education.map((item) => (
                                <div
                                    className="cv-classic__item"
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
                                            {' - '}
                                            {item.endDate || 'Present'}
                                        </small>
                                    )}

                                </div>
                            ))}

                        </ClassicSection>
                    )}

                    {skills.length > 0 && (
                        <ClassicSection title="Skills">

                            <div className="cv-classic__skills">

                                {skills.map((skill) => (
                                    <div
                                        className="cv-classic__skill"
                                        key={skill.id}
                                    >
                                        <span>{skill.name}</span>

                                        {skill.level && (
                                            <small>
                                                {skill.level}
                                            </small>
                                        )}
                                    </div>
                                ))}

                            </div>

                        </ClassicSection>
                    )}

                    {languages.length > 0 && (
                        <ClassicSection title="Languages">

                            <div className="cv-classic__languages">

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

                        </ClassicSection>
                    )}

                </aside>

                <main className="cv-classic__main">

                    {summary && (
                        <ClassicSection title="Profile">

                            <p className="cv-classic__summary">
                                {summary}
                            </p>

                        </ClassicSection>
                    )}

                    {experiences.length > 0 && (
                        <ClassicSection title="Professional Experience">

                            {experiences.map((item) => (
                                <div
                                    className="cv-classic__item"
                                    key={item.id}
                                >
                                    <div className="cv-classic__item-header">

                                        <div>
                                            <strong>
                                                {item.position}
                                            </strong>

                                            <span>
                                                {item.company}
                                            </span>
                                        </div>

                                        {(item.startDate ||
                                            item.endDate) && (
                                            <small>
                                                {item.startDate || ''}
                                                {' - '}
                                                {item.endDate || 'Present'}
                                            </small>
                                        )}

                                    </div>

                                    {item.description && (
                                        <p>
                                            {item.description}
                                        </p>
                                    )}

                                </div>
                            ))}

                        </ClassicSection>
                    )}

                    {projects.length > 0 && (
                        <ClassicSection title="Projects">

                            <div className="cv-classic__projects">

                                {projects.map((project) => (
                                    <article
                                        className="cv-classic__project"
                                        key={project.id}
                                    >

                                        <div className="cv-classic__project-header">

                                            <div className="cv-classic__project-title">

                                                <h3>
                                                    {project.projectUrl ? (
                                                        <a
                                                            href={project.projectUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {project.name}
                                                        </a>
                                                    ) : (
                                                        project.name
                                                    )}
                                                </h3>

                                                {project.technologies && (
                                                    <span>
                                                        {project.technologies}
                                                    </span>
                                                )}

                                            </div>

                                        </div>

                                        {project.description && (
                                            <p className="cv-classic__project-description">
                                                {project.description}
                                            </p>
                                        )}

                                    </article>
                                ))}

                            </div>

                        </ClassicSection>
                    )}

                    {certifications.length > 0 && (
                        <ClassicSection title="Certifications">

                            {certifications.map((item) => (
                                <div
                                    className="cv-classic__item"
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
                                            className="cv-classic__link"
                                        >
                                            View Credential
                                        </a>
                                    )}

                                </div>
                            ))}

                        </ClassicSection>
                    )}

                </main>

            </div>

        </div>
    )
}
