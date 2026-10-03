import type { TemplateProps } from './template.types'

export default function ModernTemplate({
    title,
    fullName,
    photoUrl,
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

            {/* LEFT SIDEBAR */}
            <aside className="cv-preview-modern__sidebar">

                <div className="cv-preview-modern__identity">

                    {photoUrl && (
                        <img
                            src={photoUrl}
                            alt="Profile"
                            className="cv-preview-modern__photo"
                        />
                    )}
                    <h1>{fullName || 'Your Name'}</h1>

                    {title && (
                        <p>{title}</p>
                    )}
                </div>

                {/* CONTACT */}
                <section className="cv-preview-modern__sidebar-section">
                    <h2>Contact</h2>

                    <div className="cv-preview-modern__contact">
                        {email && (
                            <div>
                                <span>Email</span>
                                <strong>{email}</strong>
                            </div>
                        )}

                        {phone && (
                            <div>
                                <span>Phone</span>
                                <strong>{phone}</strong>
                            </div>
                        )}
                    </div>
                </section>

                {/* SKILLS */}
                {skills.length > 0 && (
                    <section className="cv-preview-modern__sidebar-section">
                        <h2>Skills</h2>

                        <div className="cv-preview-modern__skill-list">
                            {skills.map((skill) => (
                                <div
                                    key={skill.id}
                                    className="cv-preview-modern__skill"
                                >
                                    <div className="cv-preview-modern__skill-name">
                                        <strong>{skill.name}</strong>

                                        {skill.level && (
                                            <span>{skill.level}</span>
                                        )}
                                    </div>

                                    <div
                                        className="cv-preview-modern__skill-bar"
                                        aria-hidden="true"
                                    >
                                        <span />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* LANGUAGES */}
                {languages.length > 0 && (
                    <section className="cv-preview-modern__sidebar-section">
                        <h2>Languages</h2>

                        <div className="cv-preview-modern__language-list">
                            {languages.map((language) => (
                                <div key={language.id}>
                                    <strong>{language.name}</strong>

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

            {/* MAIN CONTENT */}
            <main className="cv-preview-modern__main">

                {/* PROFILE */}
                {summary && (
                    <section className="cv-preview-modern__section">
                        <div className="cv-preview-modern__section-heading">
                            <span className="cv-preview-modern__section-number">
                                01
                            </span>

                            <h2>Profile</h2>
                        </div>

                        <p className="cv-preview-modern__summary">
                            {summary}
                        </p>
                    </section>
                )}

                {/* EXPERIENCE */}
                {experiences.length > 0 && (
                    <section className="cv-preview-modern__section">
                        <div className="cv-preview-modern__section-heading">
                            <span className="cv-preview-modern__section-number">
                                02
                            </span>

                            <h2>Experience</h2>
                        </div>

                        <div className="cv-preview-modern__timeline">
                            {experiences.map((experience) => (
                                <article
                                    key={experience.id}
                                    className="cv-preview-modern__timeline-item"
                                >
                                    <div className="cv-preview-modern__timeline-dot" />

                                    <div className="cv-preview-modern__timeline-content">
                                        <div className="cv-preview-modern__item-heading">
                                            <div>
                                                <h3>
                                                    {experience.position}
                                                </h3>

                                                <p>
                                                    {experience.company}
                                                </p>
                                            </div>

                                            {(experience.startDate ||
                                                experience.endDate) && (
                                                <span>
                                                    {experience.startDate || ''}
                                                    {experience.startDate &&
                                                    experience.endDate
 ? ' - '
                                                        : ''}
                                                    {experience.endDate || 'Present'}
                                                </span>
                                            )}
                                        </div>

                                        {experience.description && (
                                            <p>
                                                {experience.description}
                                            </p>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* EDUCATION */}
                {education.length > 0 && (
                    <section className="cv-preview-modern__section">
                        <div className="cv-preview-modern__section-heading">
                            <span className="cv-preview-modern__section-number">
                                03
                            </span>

                            <h2>Education</h2>
                        </div>

                        <div className="cv-preview-modern__timeline">
                            {education.map((item) => (
                                <article
                                    key={item.id}
                                    className="cv-preview-modern__timeline-item"
                                >
                                    <div className="cv-preview-modern__timeline-dot" />

                                    <div className="cv-preview-modern__timeline-content">
                                        <div className="cv-preview-modern__item-heading">
                                            <div>
                                                <h3>
                                                    {item.degree}
                                                </h3>

                                                <p>
                                                    {item.institution}
                                                    {item.field
                                                        ? ` | ${item.field}`
                                                        : ''}
                                                </p>
                                            </div>

                                            {(item.startDate ||
                                                item.endDate) && (
                                                <span>
                                                    {item.startDate || ''}
                                                    {item.startDate &&
                                                    item.endDate
 ? ' - '
                                                        : ''}
                                                    {item.endDate || 'Present'}
                                                </span>
                                            )}
                                        </div>

                                        {item.description && (
                                            <p>
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* PROJECTS */}
                {projects.length > 0 && (
                    <section className="cv-preview-modern__section">
                        <div className="cv-preview-modern__section-heading">
                            <span className="cv-preview-modern__section-number">
                                04
                            </span>

                            <h2>Projects</h2>
                        </div>

                        <div className="cv-preview-modern__cards">
                            {projects.map((project) => (
                                <article
                                    key={project.id}
                                    className="cv-preview-modern__project"
                                >
                                    <h3>{project.name}</h3>

                                    {project.technologies && (
                                        <span className="cv-preview-modern__technology">
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
                                            rel="noreferrer"
                                        >
                                            View Project
                                        </a>
                                    )}
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* CERTIFICATIONS */}
                {certifications.length > 0 && (
                    <section className="cv-preview-modern__section">
                        <div className="cv-preview-modern__section-heading">
                            <span className="cv-preview-modern__section-number">
                                05
                            </span>

                            <h2>Certifications</h2>
                        </div>

                        <div className="cv-preview-modern__cards">
                            {certifications.map((certification) => (
                                <article
                                    key={certification.id}
                                    className="cv-preview-modern__project"
                                >
                                    <h3>
                                        {certification.name}
                                    </h3>

                                    {certification.organization && (
                                        <p className="cv-preview-modern__certification-org">
                                            {certification.organization}
                                        </p>
                                    )}

                                    {certification.issueDate && (
                                        <span className="cv-preview-modern__technology">
                                            {certification.issueDate}
                                        </span>
                                    )}

                                    {certification.credentialUrl && (
                                        <a
                                            href={
                                                certification.credentialUrl
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            View Credential
                                        </a>
                                    )}
                                </article>
                            ))}
                        </div>
                    </section>
                )}

            </main>

        </div>
    )
}
