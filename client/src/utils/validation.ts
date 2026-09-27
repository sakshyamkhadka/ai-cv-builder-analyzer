export const nameRegex =
  /^\p{L}+(?:[ '-]\p{L}+)*$/u

export const phoneRegex =
  /^\+?[1-9]\d{7,14}$/

export const skillRegex =
  /^[\p{L}\p{N}][\p{L}\p{N}\s+#.()/&,'’+\-]*$/u

export const generalNameRegex =
  /^[\p{L}\p{N}\s&.'’(),/@#+_:/-]+$/u

export const technologiesRegex =
  /^[\p{L}\p{N}\s.,#+/&()'’:_-]+$/u

export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d).+$/

export const urlRegex =
  /^https?:\/\/\S+$/i

export const yearRegex =
  /^(19|20)\d{2}$/

export const validateName = (
  value: string
) => {
  const name = value.trim()

  if (name.length < 2) {
    return 'Name must be at least 2 characters'
  }

  if (name.length > 100) {
    return 'Name must be 100 characters or less'
  }

  if (!nameRegex.test(name)) {
    return 'Name can contain only letters, spaces, hyphens, and apostrophes'
  }

  return ''
}

export const validatePhone = (
  value: string
) => {
  const phone = value.trim()

  if (!phone) {
    return ''
  }

  if (!phoneRegex.test(phone)) {
    return 'Invalid phone number'
  }

  return ''
}

export const validatePassword = (
  value: string
) => {
  if (value.length < 8) {
    return 'Password must be at least 8 characters'
  }

  if (value.length > 100) {
    return 'Password must be 100 characters or less'
  }

  if (!passwordRegex.test(value)) {
    return 'Password must contain at least one letter and one number'
  }

  return ''
}

export const validateUrl = (
  value: string
) => {
  const url = value.trim()

  if (!url) {
    return ''
  }

  if (!urlRegex.test(url)) {
    return 'URL must start with http:// or https://'
  }

  return ''
}

export const validateYear = (
  value: string
) => {
  const year = value.trim()

  if (!year) {
    return ''
  }

  if (!yearRegex.test(year)) {
    return 'Enter a valid year'
  }

  return ''
}
export const supportedLanguages = [
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

export const supportedProficiencies = [
  'Basic',
  'Conversational',
  'Professional',
  'Fluent',
  'Native'
] as const

export const validateLanguage = (
  value: string
) => {
  const language = value.trim()

  if (!language) {
    return 'Language is required'
  }

  if (
    !supportedLanguages.includes(
      language as (typeof supportedLanguages)[number]
    )
  ) {
    return 'Please select a valid supported language'
  }

  return ''
}

export const validateProficiency = (
  value: string
) => {
  const proficiency = value.trim()

  if (!proficiency) {
    return ''
  }

  if (
    !supportedProficiencies.includes(
      proficiency as (typeof supportedProficiencies)[number]
    )
  ) {
    return 'Invalid proficiency level'
  }

  return ''
}