export type EditorSection =
    | 'overview'
    | 'education'
    | 'skills'
    | 'experience'
    | 'projects'
    | 'certifications'
    | 'languages'

export const editorSections: {
    id: EditorSection
    label: string
    icon: string
}[] = [
    {
        id: 'overview',
        label: 'Personal & Summary',
        icon: '01'
    },
    {
        id: 'education',
        label: 'Education',
        icon: '02'
    },
    {
        id: 'experience',
        label: 'Experience',
        icon: '03'
    },
    {
        id: 'skills',
        label: 'Skills',
        icon: '04'
    },
    {
        id: 'projects',
        label: 'Projects',
        icon: '05'
    },
    {
        id: 'certifications',
        label: 'Certifications',
        icon: '06'
    },
    {
        id: 'languages',
        label: 'Languages',
        icon: '07'
    }
]
