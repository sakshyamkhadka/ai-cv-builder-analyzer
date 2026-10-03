import { FiChevronRight } from 'react-icons/fi'

type EditorSection =
    | 'overview'
    | 'education'
    | 'skills'
    | 'experience'
    | 'projects'
    | 'certifications'
    | 'languages'

interface CVEditorSidebarProps {
    sections: Array<{
        id: EditorSection
        label: string
        icon: string
    }>
    activeSection: string
    onSectionChange: (sectionId: EditorSection) => void
    completionPercentage: number
    missingFields: string[]
}

export default function CVEditorSidebar({
    sections,
    activeSection,
    onSectionChange,
    completionPercentage,
    missingFields
}: CVEditorSidebarProps) {
    return (
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
                            activeSection === section.id
                                ? 'cv-section-nav-item active'
                                : 'cv-section-nav-item'
                        }
                        onClick={() =>
                            onSectionChange(section.id)
                        }
                    >
                        <span className="cv-section-number">
                            {section.icon}
                        </span>

                        <span>
                            {section.label}
                        </span>

                        {activeSection === section.id && (
                            <span className="cv-section-arrow">
                                <FiChevronRight
                                    aria-hidden="true"
                                />
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
                        {completionPercentage}%
                    </strong>
                </div>

                <div className="cv-completion-track">
                    <div
                        className="cv-completion-progress"
                        style={{
                            width: `${completionPercentage}%`
                        }}
                    />
                </div>

                <p>
                    Complete your CV to unlock
                    AI analysis.
                </p>
                {missingFields.length > 0 && (
                    <div className="cv-completion-missing">

                        <strong>
                            Missing
                        </strong>

                        <ul>
                            {missingFields.map((field) => (
                                <li key={field}>
                                    {field}
                                </li>
                            ))}
                        </ul>

                    </div>
                )}

                {completionPercentage === 100 && (
                    <p className="cv-completion-complete">
                        Your CV is complete.
                    </p>
                )}


            </div>

        </aside>
    )
}