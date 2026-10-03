import type { Template } from '../../../services/template.service'

interface CVTemplateSectionProps {
    templates: Template[]
    templateId: number | null
    setTemplateId: (value: number) => void
}

export default function CVTemplateSection({
    templates,
    templateId,
    setTemplateId
}: CVTemplateSectionProps) {
    return (
        <div className="cv-editor-panel">

            <div className="cv-panel-heading">

                <div>

                    <span>
                        DESIGN
                    </span>

                    <h3>
                        Choose your template
                    </h3>

                </div>

                <p>
                    You can change this
                    anytime.
                </p>

            </div>

            {templates.length === 0 ? (
                <p>
                    No active templates
                    are available.
                </p>
            ) : (
                <div className="template-grid">

                    {templates.map((template) => (
                        <button
                            key={template.id}
                            type="button"
                            className={
                                templateId === template.id
                                    ? 'template-option active'
                                    : 'template-option'
                            }
                            onClick={() =>
                                setTemplateId(template.id)
                            }
                        >

                            <div className="template-preview-placeholder">

                                <span>
                                    {template.name
                                        .charAt(0)
                                        .toUpperCase()}
                                </span>

                            </div>

                            <div>

                                <strong>
                                    {template.name}
                                </strong>

                                {template.description && (
                                    <span>
                                        {template.description}
                                    </span>
                                )}

                            </div>

                        </button>
                    ))}

                </div>
            )}

        </div>
    )
}