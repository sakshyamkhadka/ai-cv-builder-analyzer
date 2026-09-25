import { Resend } from 'resend'

const apiKey = process.env.RESEND_API_KEY

if (!apiKey) {
  throw new Error('RESEND_API_KEY is not configured')
}

const fromEmail = process.env.RESEND_FROM_EMAIL

if (!fromEmail) {
  throw new Error('RESEND_FROM_EMAIL is not configured')
}

const resend = new Resend(apiKey)

export const sendEmail = async ({
  to,
  subject,
  html
}: {
  to: string
  subject: string
  html: string
}) => {
  const result = await resend.emails.send({
    from: fromEmail,
    to,
    subject,
    html
  })

  if (result.error) {
    console.error('Resend error:', result.error)
    throw new Error(result.error.message)
  }

  return result.data
}

export const sendVerificationEmail = async ({
  to,
  name,
  token
}: {
  to: string
  name: string
  token: string
}) => {
  const frontendUrl = process.env.FRONTEND_URL

  if (!frontendUrl) {
    throw new Error('FRONTEND_URL is not configured')
  }

  const verificationUrl =
    `${frontendUrl}/verify-email?token=${encodeURIComponent(token)}`

  return sendEmail({
    to,
    subject: 'Verify your CV Builder account',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome to CV Builder, ${name}!</h2>

        <p>
          Please verify your email address to activate your account.
        </p>

        <p>
          <a
            href="${verificationUrl}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#111827;
              color:#ffffff;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Verify Email
          </a>
        </p>

        <p>
          This verification link will expire in 24 hours.
        </p>

        <p>
          If you did not create this account, you can ignore this email.
        </p>
      </div>
    `
  })
}