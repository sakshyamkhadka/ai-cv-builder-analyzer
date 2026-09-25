import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import {
  resendVerificationEmail,
  verifyEmail
} from '../../services/auth.service'

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const verificationStarted =
    useRef(false)

  const [status, setStatus] =
    useState<'loading' | 'success' | 'error'>(
      token ? 'loading' : 'error'
    )

  const [message, setMessage] =
    useState(
      token
        ? 'Verifying your email...'
        : 'Verification token is missing'
    )

  const [isResending, setIsResending] =
    useState(false)

  const [resendMessage, setResendMessage] =
    useState('')

  useEffect(() => {
    if (!token || verificationStarted.current) {
      return
    }

    verificationStarted.current = true

    const verify = async () => {
      try {
        const response = await verifyEmail(token)

        setStatus('success')
        setMessage(response.message)
      } catch (error) {
        setStatus('error')
        setMessage(
          error instanceof Error
            ? error.message
            : 'Email verification failed'
        )
      }
    }

    verify()
  }, [token])

  const handleResend = async () => {
    if (!email) {
      setResendMessage(
        'Email address is required to resend the verification email'
      )
      return
    }

    setIsResending(true)
    setResendMessage('')

    try {
      const response =
        await resendVerificationEmail(email)

      setResendMessage(response.message)
    } catch (error) {
      setResendMessage(
        error instanceof Error
          ? error.message
          : 'Failed to resend verification email'
      )
    } finally {
      setIsResending(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        {status === 'loading' && (
          <>
            <h1>Verifying your email</h1>
            <p>{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <h1>Email verified</h1>
            <p>{message}</p>

            <Link
              className="auth-link-button"
              to="/login"
            >
              Continue to Login
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <h1>Email verification failed</h1>
            <p className="auth-error">
              {message}
            </p>

            {email && (
              <>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                >
                  {isResending
                    ? 'Sending...'
                    : 'Resend Verification Email'}
                </button>

                {resendMessage && (
                  <p>{resendMessage}</p>
                )}
              </>
            )}

            <p className="auth-footer">
              <Link to="/login">
                Back to Login
              </Link>
            </p>
          </>
        )}
      </section>
    </main>
  )
}

export default VerifyEmail