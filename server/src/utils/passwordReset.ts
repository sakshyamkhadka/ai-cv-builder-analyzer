import { createHash, randomBytes } from 'node:crypto'

const PASSWORD_RESET_TOKEN_EXPIRY_HOURS = 1

export const createPasswordResetToken = () => {
  const token = randomBytes(32).toString('hex')

  const tokenHash = createHash('sha256')
    .update(token)
    .digest('hex')

  const expiresAt = new Date(
    Date.now() +
      PASSWORD_RESET_TOKEN_EXPIRY_HOURS * 60 * 60 * 1000
  ).toISOString()

  return {
    token,
    tokenHash,
    expiresAt
  }
}

export const hashPasswordResetToken = (token: string) => {
  return createHash('sha256')
    .update(token)
    .digest('hex')
}