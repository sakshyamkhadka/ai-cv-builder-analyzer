interface CVPreviewControlsProps {
    previewZoom: number
    previewVisible: boolean
    handleZoomOut: () => void
    handleZoomIn: () => void
    onClose: () => void
}

export default function CVPreviewControls({
    previewZoom,
    previewVisible,
    handleZoomOut,
    handleZoomIn,
    onClose
}: CVPreviewControlsProps) {
    return (
        <div className="cv-preview-controls">

            <button
                type="button"
                aria-label="Zoom out"
                onClick={handleZoomOut}
            >
                -
            </button>

            <span className="cv-preview-zoom">
                {previewZoom}%
            </span>

            <button
                type="button"
                aria-label="Zoom in"
                onClick={handleZoomIn}
            >
                +
            </button>

            {previewVisible && (
                <button
                    type="button"
                    className="cv-preview-close"
                    aria-label="Close preview"
                    onClick={onClose}
                >
                    &#215;
                </button>
            )}

        </div>
    )
}
