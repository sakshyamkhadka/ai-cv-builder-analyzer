export interface Education {
    id: number
    institution: string
    degree: string
    field: string | null
    startDate: string | null
    endDate: string | null
    description: string | null
}

export interface Skill {
    id: number
    name: string
    level: string | null
}

export interface Experience {
    id: number
    company: string
    position: string
    startDate: string | null
    endDate: string | null
    description: string | null
}

export interface Project {
    id: number
    name: string
    description: string | null
    technologies: string | null
    projectUrl: string | null
}

export interface Certification {
    id: number
    name: string
    organization: string | null
    issueDate: string | null
    credentialUrl: string | null
}

export interface Language {
    id: number
    name: string
    proficiency: string | null
}

export interface TemplateProps {
    title: string
    fullName: string
    email: string
    phone: string
    summary: string
    education: Education[]
    skills: Skill[]
    experiences: Experience[]
    projects: Project[]
    certifications: Certification[]
    languages: Language[]
}