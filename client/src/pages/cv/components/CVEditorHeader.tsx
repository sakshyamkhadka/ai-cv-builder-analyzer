interface CVEditorHeaderProps {
    title: string
    successMessage: string
    isSaving: boolean
    previewVisible: boolean
    onPreview: () => void
}

export default function CVEditorHeader({
    title,
    successMessage,
    isSaving,
    previewVisible,
    onPreview
}: CVEditorHeaderProps) {
    return (
        <header className="cv-editor-topbar">

            <div className="cv-editor-topbar-left">

                <a
                    href="/dashboard"
                    className="cv-back-link"
                    onClick={(event) => {
                        event.preventDefault()
                        window.location.href = '/dashboard'
                    }}
                >
                    ?
                </a>

                <div>
                    <span className="cv-editor-eyebrow">
                        CV Builder
                    </span>

                    <h1>
                        {title || 'Untitled CV'}
                    </h1>
                </div>

            </div>

            <div className="cv-editor-topbar-actions">

                {successMessage && (
                    <span className="cv-save-status">
                        ? {successMessage}
                    </span>
                )}

                <button
                    type="button"
                    className={
                        previewVisible
                            ? 'cv-preview-button active'
                            : 'cv-preview-button'
                    }
                    onClick={onPreview}
                >
                    Preview
                </button>

                <button
                    type="submit"
                    form="cv-overview-form"
                    className="cv-save-button"
                    disabled={isSaving}
                >
                    {isSaving ? 'Saving...' : 'Save CV'}
                </button>

            </div>

        </header>
    )
}
