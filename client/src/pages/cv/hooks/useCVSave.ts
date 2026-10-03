import { useState } from 'react'

import {
    updateCV
} from '../../../services/cv.service'

interface UseCVSaveProps {
    token: string | null
    cvId: number

    title: string
    fullName: string
    email: string
    phone: string
    location: string
    photoUrl: string
    linkedinUrl: string
    githubUrl: string
    portfolioUrl: string
    templateId: number | null
    summary: string

    loadCV: () => void | Promise<void>

    setError: (value: string) => void
}

export function useCVSave({
    token,
    cvId,
    title,
    fullName,
    email,
    phone,
    location,
    photoUrl,
    linkedinUrl,
    githubUrl,
    portfolioUrl,
    templateId,
    summary,
    loadCV,
    setError
}: UseCVSaveProps) {

    const [isSaving, setIsSaving] =
        useState(false)

    const [successMessage, setSuccessMessage] =
        useState('')

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault()

        if (!token) {
            setError('You must be logged in')
            return
        }

        if (!templateId) {
            setError(
                'You must select a template'
            )
            return
        }

        setError('')
        setSuccessMessage('')
        setIsSaving(true)

        try {
            const response = await updateCV(
                token,
                cvId,
                {
                    title,

                    fullName:
                        fullName || undefined,

                    email:
                        email || undefined,

                    phone:
                        phone || undefined,

                    location:
                        location || undefined,

                    photoUrl:
                        photoUrl || undefined,

                    linkedinUrl:
                        linkedinUrl || undefined,

                    githubUrl:
                        githubUrl || undefined,

                    portfolioUrl:
                        portfolioUrl || undefined,

                    templateId,

                    summary:
                        summary || undefined
                }
            )

            if (!response.cv) {
                throw new Error(
                    'Updated CV was not returned'
                )
            }

            setSuccessMessage(
                'CV saved successfully'
            )

            await loadCV()

        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to save CV'
            )

        } finally {
            setIsSaving(false)
        }
    }

    return {
        isSaving,
        successMessage,
        handleSubmit
    }
}
