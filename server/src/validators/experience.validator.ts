import { z } from 'zod'

export const createExperienceSchema = z.object({
    company: z
        .string()
        .min(1, 'Company is required'),

    position: z
        .string()
        .min(1, 'Position is required'),

    startDate: z
        .string()
        .optional(),

    endDate: z
        .string()
        .optional(),

    description: z
        .string()
        .optional()
})

export const updateExperienceSchema = createExperienceSchema