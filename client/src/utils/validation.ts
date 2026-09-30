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

/* =========================================
   NAME
   ========================================= */

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

/* =========================================
   PHONE
   ========================================= */

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

/* =========================================
   PASSWORD
   ========================================= */

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

/* =========================================
   URL
   ========================================= */

export const validateUrl = (
  value: string
) => {
  const url = value.trim()

  /*
   * URL is optional.
   * If a value is provided, it must be a valid
   * HTTP or HTTPS URL.
   */
  if (!url) {
    return ''
  }

  if (!urlRegex.test(url)) {
    return 'URL must start with http:// or https://'
  }

  return ''
}

/* =========================================
   REQUIRED TEXT
   ========================================= */

export const validateRequiredText = (
  value: string,
  fieldName: string,
  minLength = 2,
  maxLength = 200
) => {
  const text = value.trim()

  if (!text) {
    return `${fieldName} is required`
  }

  if (text.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`
  }

  if (text.length > maxLength) {
    return `${fieldName} must be ${maxLength} characters or less`
  }

  return ''
}

/* =========================================
   YEAR
   ========================================= */

export const validateYear = (
  value: string
) => {
  const year = value.trim()

  /*
   * Year is optional.
   * Required fields should check empty values
   * separately with validateRequiredYear().
   */
  if (!year) {
    return ''
  }

  if (!yearRegex.test(year)) {
    return 'Enter a valid year'
  }

  return ''
}

/* =========================================
   REQUIRED YEAR
   ========================================= */

export const validateRequiredYear = (
  value: string,
  fieldName: string
) => {
  const year = value.trim()

  if (!year) {
    return `${fieldName} is required`
  }

  if (!yearRegex.test(year)) {
    return `${fieldName} must be a valid year`
  }

  return ''
}

/* =========================================
   YEAR RANGE
   ========================================= */

export const validateYearRange = (
  startYear: string,
  endYear: string,
  endYearLabel = 'End Year'
) => {
  const start = startYear.trim()
  const end = endYear.trim()

  if (!start || !end) {
    return ''
  }

  if (
    !yearRegex.test(start) ||
    !yearRegex.test(end)
  ) {
    return ''
  }

  if (Number(end) < Number(start)) {
    return `${endYearLabel} cannot be before Start Year`
  }

  return ''
}

/* =========================================
   SKILL
   ========================================= */

export const validateSkill = (
  value: string
) => {
  const skill = value.trim()

  if (!skill) {
    return 'Skill is required'
  }

  if (skill.length < 2) {
    return 'Skill must be at least 2 characters'
  }

  if (skill.length > 100) {
    return 'Skill must be 100 characters or less'
  }

  if (!skillRegex.test(skill)) {
    return 'Skill contains invalid characters'
  }

  return ''
}

/* =========================================
   TECHNOLOGIES
   ========================================= */

export const validateTechnologies = (
  value: string
) => {
  const technologies = value.trim()

  if (!technologies) {
    return 'Technologies are required'
  }

  if (technologies.length < 2) {
    return 'Technologies must be at least 2 characters'
  }

  if (technologies.length > 500) {
    return 'Technologies must be 500 characters or less'
  }

  if (!technologiesRegex.test(technologies)) {
    return 'Technologies contain invalid characters'
  }

  return ''
}

/* =========================================
   SUPPORTED LANGUAGES
   ========================================= */

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

/* =========================================
   SUPPORTED PROFICIENCIES
   ========================================= */

export const supportedProficiencies = [
  'Basic',
  'Conversational',
  'Professional',
  'Fluent',
  'Native'
] as const

/* =========================================
   LANGUAGE
   ========================================= */

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

/* =========================================
   PROFICIENCY
   ========================================= */

export const validateProficiency = (
  value: string
) => {
  const proficiency = value.trim()

  /*
   * Proficiency is REQUIRED.
   */
  if (!proficiency) {
    return 'Proficiency is required'
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