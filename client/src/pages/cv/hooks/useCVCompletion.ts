interface UseCVCompletionProps {
    fullName: string
    email: string
    phone: string
    location: string
    summary: string
    educationCount: number
    skillsCount: number
    experienceCount: number
    projectsCount: number
    certificationsCount: number
    languagesCount: number
}

export function useCVCompletion({
    fullName,
    email,
    phone,
    location,
    summary,
    educationCount,
    skillsCount,
    experienceCount,
    projectsCount
}: UseCVCompletionProps) {

    let percentage = 0

    const missing: string[] = []

    // Personal information - 25%
    const personalFields = [
        {
            value: fullName,
            label: 'Full name'
        },
        {
            value: email,
            label: 'Email'
        },
        {
            value: phone,
            label: 'Phone number'
        },
        {
            value: location,
            label: 'Location'
        }
    ]

    const completedPersonalFields =
        personalFields.filter(
            (field) => Boolean(field.value.trim())
        ).length

    percentage +=
        (completedPersonalFields / personalFields.length) * 25

    personalFields.forEach((field) => {
        if (!field.value.trim()) {
            missing.push(field.label)
        }
    })

    // Professional summary - 15%
    if (summary.trim()) {
        percentage += 15
    } else {
        missing.push('Professional summary')
    }

    // Education - 15%
    if (educationCount > 0) {
        percentage += 15
    } else {
        missing.push('Education')
    }

    // Skills - 20%
    if (skillsCount > 0) {
        percentage += 20
    } else {
        missing.push('Skills')
    }

    // Experience - 15%
    if (experienceCount > 0) {
        percentage += 15
    } else {
        missing.push('Work experience')
    }

    // Projects - 10%
    if (projectsCount > 0) {
        percentage += 10
    } else {
        missing.push('Projects')
    }

    // Certifications - optional
    // Languages - optional
    // They do not affect completion percentage.

    return {
        percentage: Math.round(percentage),
        missing
    }
}
