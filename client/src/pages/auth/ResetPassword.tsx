import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { resetPassword } from '../../services/auth.service'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()

  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] =
    useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setMessage('')
    setError('')

    if (!token) {
      setError('Password reset token is missing')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)

    try {
      const response = await resetPassword(
        token,
        password
      )

      setMessage(response.message)
      setIsSuccess(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to reset password'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        {!isSuccess ? (
          <>
            <div className="auth-header">
              <h1>Reset Password</h1>
              <p>
                Enter your new password below.
              </p>
            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="password">
                  New Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Minimum 6 characters"
                  minLength={6}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm New Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  placeholder="Re-enter your password"
                  minLength={6}
                  required
                />
              </div>

              {error && (
                <p className="auth-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isLoading}
              >
                {isLoading
                  ? 'Resetting...'
                  : 'Reset Password'}
              </button>
            </form>

            <p className="auth-footer">
              Remember your password?{' '}
              <Link to="/login">
                Back to Login
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="auth-header">
              <h1>Password Reset Complete</h1>
              <p className="auth-success">
                {message}
              </p>
            </div>

            <Link
              className="auth-link-button"
              to="/login"
            >
              Continue to Login
            </Link>
          </>
        )}
      </section>
    </main>
  )
}

export default ResetPassword