import { useRef, useState } from 'react'

export function useCVPreview() {

    const previewRef =
        useRef<HTMLElement | null>(null)

    const [previewVisible, setPreviewVisible] =
        useState(false)

    const [previewZoom, setPreviewZoom] =
        useState(100)

    const handlePreview = () => {
        setPreviewVisible(true)

        requestAnimationFrame(() => {
            previewRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }

    const handleZoomIn = () => {
        setPreviewZoom((current) =>
            Math.min(current + 10, 150)
        )
    }

    const handleZoomOut = () => {
        setPreviewZoom((current) =>
            Math.max(current - 10, 60)
        )
    }

    const handleClosePreview = () => {
        setPreviewVisible(false)
    }

    return {
        previewRef,
        previewVisible,
        previewZoom,
        handlePreview,
        handleZoomIn,
        handleZoomOut,
        handleClosePreview
    }
}