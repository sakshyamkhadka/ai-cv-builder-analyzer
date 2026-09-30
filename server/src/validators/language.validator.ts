import { z } from 'zod'

const supportedLanguages = [
  'Arabic',
  'Bengali',
  'Chinese',
  'Czech',
  'Danish',
  'Dutch',
  'English',
  'Finnish',
  'French',
  'German',
  'Greek',
  'Gujarati',
  'Hebrew',
  'Hindi',
  'Hungarian',
  'Indonesian',
  'Italian',
  'Japanese',
  'Kannada',
  'Korean',
  'Malay',
  'Malayalam',
  'Marathi',
  'Nepali',
  'Norwegian',
  'Persian',
  'Polish',
  'Portuguese',
  'Punjabi',
  'Romanian',
  'Russian',
  'Serbian',
  'Sinhala',
  'Slovak',
  'Spanish',
  'Swedish',
  'Tamil',
  'Telugu',
  'Thai',
  'Turkish',
  'Ukrainian',
  'Urdu',
  'Vietnamese'
] as const

const proficiencySchema = z.enum([
  'Basic',
  'Conversational',
  'Professional',
  'Fluent',
  'Native'
])

const languageNameSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      supportedLanguages.includes(
        value as (typeof supportedLanguages)[number]
      ),
    'Please select a valid supported language'
  )

const requiredProficiencySchema =
  z.preprocess(
    (value) =>
      value === '' || value === null
        ? undefined
        : value,
    proficiencySchema
  )

export const createLanguageSchema =
  z.object({
    name: languageNameSchema,

    proficiency:
      requiredProficiencySchema
  })

export const updateLanguageSchema =
  createLanguageSchema