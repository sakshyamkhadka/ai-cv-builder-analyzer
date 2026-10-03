import { useCallback, useEffect } from 'react'

import {
    getCVById
} from '../../../services/cv.service'

import {
    getEducation
} from '../../../services/education.service'

import {
    getSkills
} from '../../../services/skill.service'

import {
    getExperiences
} from '../../../services/experience.service'

import {
    getProjects
} from '../../../services/project.service'

import {
    getCertifications
} from '../../../services/certification.service'

import {
    getLanguages
} from '../../../services/language.service'

import {
    getTemplates,
    type Template
} from '../../../services/template.service'

interface UseCVEditorDataProps {
    token: string | null
    cvId: number

    setTitle: (value: string) => void
    setFullName: (value: string) => void
    setEmail: (value: string) => void
    setPhone: (value: string) => void
    setLocation: (value: string) => void
    setPhotoUrl: (value: string) => void
    setLinkedinUrl: (value: string) => void
    setGithubUrl: (value: string) => void
    setPortfolioUrl: (value: string) => void
    setSummary: (value: string) => void

    setEducation: (value: any[]) => void
    setSkills: (value: any[]) => void
    setExperiences: (value: any[]) => void
    setProjects: (value: any[]) => void
    setCertifications: (value: any[]) => void
    setLanguages: (value: any[]) => void

    setTemplates: (value: Template[]) => void
    setTemplateId: (value: number | null) => void

    setError: (value: string) => void
    setIsLoading: (value: boolean) => void
}

export function useCVEditorData({
    token,
    cvId,
    setTitle,
    setFullName,
    setEmail,
    setPhone,
    setLocation,
    setPhotoUrl,
    setLinkedinUrl,
    setGithubUrl,
    setPortfolioUrl,
    setSummary,
    setEducation,
    setSkills,
    setExperiences,
    setProjects,
    setCertifications,
    setLanguages,
    setTemplates,
    setTemplateId,
    setError,
    setIsLoading
}: UseCVEditorDataProps) {

    const loadCV = useCallback(async () => {
        if (
            !token ||
            !Number.isInteger(cvId) ||
            cvId <= 0
        ) {
            setError('Invalid CV')
            setIsLoading(false)
            return
        }

        try {
            const [
                cvResponse,
                templateResponse,
                educationResponse,
                skillsResponse,
                experiencesResponse,
                projectsResponse,
                certificationsResponse,
                languagesResponse
            ] = await Promise.all([
                getCVById(token, cvId),
                getTemplates(),
                getEducation(token, cvId),
                getSkills(token, cvId),
                getExperiences(token, cvId),
                getProjects(token, cvId),
                getCertifications(token, cvId),
                getLanguages(token, cvId)
            ])

            if (!cvResponse.cv) {
                throw new Error('CV not found')
            }

            setTitle(cvResponse.cv.title)

            setFullName(
                cvResponse.cv.fullName ?? ''
            )

            setEmail(
                cvResponse.cv.email ?? ''
            )

            setPhone(
                cvResponse.cv.phone ?? ''
            )

            setLocation(
                cvResponse.cv.location ?? ''
            )

            setPhotoUrl(
                cvResponse.cv.photoUrl ?? ''
            )

            setLinkedinUrl(
                cvResponse.cv.linkedinUrl ?? ''
            )

            setGithubUrl(
                cvResponse.cv.githubUrl ?? ''
            )

            setPortfolioUrl(
                cvResponse.cv.portfolioUrl ?? ''
            )

            setSummary(
                cvResponse.cv.summary ?? ''
            )

            setTemplates(
                templateResponse.templates
            )

            setTemplateId(
                cvResponse.cv.templateId
            )

            setEducation(
                educationResponse.education
            )

            setSkills(
                skillsResponse.skills
            )

            setExperiences(
                experiencesResponse.experiences
            )

            setProjects(
                projectsResponse.projects
            )

            setCertifications(
                certificationsResponse.certifications
            )

            setLanguages(
                languagesResponse.languages
            )
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to load CV'
            )
        } finally {
            setIsLoading(false)
        }
    }, [
        cvId,
        token,
        setTitle,
        setFullName,
        setEmail,
        setPhone,
        setLocation,
        setPhotoUrl,
        setLinkedinUrl,
        setGithubUrl,
        setPortfolioUrl,
        setSummary,
        setEducation,
        setSkills,
        setExperiences,
        setProjects,
        setCertifications,
        setLanguages,
        setTemplates,
        setTemplateId,
        setError,
        setIsLoading
    ])

    useEffect(() => {
        loadCV()
    }, [loadCV])

    return {
        loadCV
    }
}