import { createHash, randomBytes } from 'node:crypto'

const VERIFICATION_TOKEN_EXPIRY_HOURS = 24

export const createEmailVerificationToken = () => {
  const token = randomBytes(32).toString('hex')

  const tokenHash = createHash('sha256')
    .update(token)
    .digest('hex')

  const expiresAt = new Date(
    Date.now() +
      VERIFICATION_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000
  ).toISOString()

  return {
    token,
    tokenHash,
    expiresAt
  }
}

export const hashEmailVerificationToken = (
  token: string
) => {
  return createHash('sha256')
    .update(token)
    .digest('hex')
}