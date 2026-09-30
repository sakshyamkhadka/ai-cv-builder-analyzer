const placeholderWords = new Set([
  'test',
  'testing',
  'sample',
  'example',
  'dummy',
  'placeholder',
  'qwerty',
  'qwert',
  'asdf',
  'asdfgh'
])

const isRepeatedPattern = (
  value: string
) => {
  if (value.length < 4) {
    return false
  }

  for (let size = 1; size <= 3; size++) {
    if (value.length % size !== 0) {
      continue
    }

    const pattern = value.slice(0, size)

    if (
      pattern.repeat(
        value.length / size
      ) === value
    ) {
      return true
    }
  }

  return false
}

const isRepeatedCharacter = (
  value: string
) => {
  const compact = value
    .toLowerCase()
    .replace(/\s/g, '')

  if (compact.length < 4) {
    return false
  }

  return /^(.)(\1)+$/.test(compact)
}

const isAlphabetSequence = (
  value: string
) => {
  const letters = value
    .toLowerCase()
    .replace(/[^a-z]/g, '')

  if (letters.length < 3) {
    return false
  }

  let increasing = 0
  let decreasing = 0

  for (let i = 1; i < letters.length; i++) {
    const previous =
      letters.charCodeAt(i - 1)

    const current =
      letters.charCodeAt(i)

    if (current === previous + 1) {
      increasing++
    }

    if (current === previous - 1) {
      decreasing++
    }
  }

  if (
    increasing === letters.length - 1 ||
    decreasing === letters.length - 1
  ) {
    return true
  }

  if (letters.length >= 6) {
    const sequential = Math.max(
      increasing,
      decreasing
    )

    if (
      sequential >= letters.length - 2
    ) {
      return true
    }
  }

  return false
}

const hasLongRepeatedCharacterRun = (
  value: string
) => {
  return /(.)\1{3,}/i.test(value)
}

export const isMeaningfulText = (
  value: string
) => {
  const text = value.trim()

  if (!text) {
    return false
  }

  const lowerText =
    text.toLowerCase()

  if (
    placeholderWords.has(lowerText)
  ) {
    return false
  }

  if (
    isRepeatedCharacter(text)
  ) {
    return false
  }

  if (
    isRepeatedPattern(lowerText)
  ) {
    return false
  }

  if (
    isAlphabetSequence(lowerText)
  ) {
    return false
  }

  if (
    hasLongRepeatedCharacterRun(text)
  ) {
    return false
  }

  return true
}

export const validateMeaningfulText = (
  value: string,
  fieldName: string
) => {
  if (!isMeaningfulText(value)) {
    return `${fieldName} must contain meaningful information`
  }

  return ''
}