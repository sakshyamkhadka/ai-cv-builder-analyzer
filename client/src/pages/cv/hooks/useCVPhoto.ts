import { useState } from 'react'

interface UseCVPhotoProps {
    setError: (value: string) => void
}

export function useCVPhoto({
    setError
}: UseCVPhotoProps) {

    const [photoFile, setPhotoFile] =
        useState<File | null>(null)

    const [photoPreview, setPhotoPreview] =
        useState('')

    const handlePhotoChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file =
            event.target.files?.[0]

        if (!file) {
            return
        }

        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp'
        ]

        if (!allowedTypes.includes(file.type)) {
            setError(
                'Please select a JPG, PNG or WebP image.'
            )

            event.target.value = ''

            return
        }

        const maxSize =
            5 * 1024 * 1024

        if (file.size > maxSize) {
            setError(
                'Profile photo must be 5 MB or smaller.'
            )

            event.target.value = ''

            return
        }

        setError('')

        if (photoPreview) {
            URL.revokeObjectURL(photoPreview)
        }

        const previewUrl =
            URL.createObjectURL(file)

        setPhotoFile(file)
        setPhotoPreview(previewUrl)

        event.target.value = ''
    }

    const handleRemovePhoto = () => {
        if (photoPreview) {
            URL.revokeObjectURL(photoPreview)
        }

        setPhotoPreview('')
        setPhotoFile(null)

        const input =
            document.getElementById(
                'profilePhoto'
            ) as HTMLInputElement | null

        if (input) {
            input.value = ''
        }
    }

    return {
        photoFile,
        photoPreview,
        handlePhotoChange,
        handleRemovePhoto
    }
}
