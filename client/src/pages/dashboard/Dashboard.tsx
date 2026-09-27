import {
  useCallback,
  useEffect,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'
import {
  getMyCVs,
  type CV
} from '../../services/cv.service'

const Dashboard = () => {
  const navigate = useNavigate()
  const {
    user,
    token,
    logout
  } = useAuth()

  const [cvs, setCvs] = useState<CV[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadCVs = useCallback(async () => {
    if (!token) {
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await getMyCVs(token)
      setCvs(response.cvs)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to load your CVs'
      )
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    loadCVs()
  }, [loadCVs])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">
            AI CV Builder
          </p>

          <h1>
            Welcome, {user?.name}
          </h1>

          <p>
            Create, manage, and improve your
            professional CVs.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      <section className="dashboard-content">
        <div className="dashboard-section-header">
          <div>
            <h2>Your CVs</h2>

            <p>
              {cvs.length}{' '}
              {cvs.length === 1 ? 'CV' : 'CVs'}
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate('/cv/new')
            }
          >
            Create New CV
          </button>
        </div>

        {isLoading && (
          <div className="dashboard-state">
            <p>Loading your CVs...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="dashboard-state dashboard-error">
            <p>{error}</p>

            <button
              type="button"
              onClick={loadCVs}
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading &&
          !error &&
          cvs.length === 0 && (
            <div className="dashboard-state">
              <h3>No CVs yet</h3>

              <p>
                Create your first CV to get
                started.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate('/cv/new')
                }
              >
                Create Your First CV
              </button>
            </div>
          )}

        {!isLoading &&
          !error &&
          cvs.length > 0 && (
            <div className="cv-grid">
              {cvs.map((cv) => (
                <article
                  key={cv.id}
                  className="cv-card"
                >
                  <div>
                    <p className="cv-card-label">
                      CV #{cv.id}
                    </p>

                    <h3>{cv.title}</h3>

                    <p>
                      Template #{cv.templateId}
                    </p>

                    <p>
                      Updated:{' '}
                      {new Date(
                        cv.updatedAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        `/cv/${cv.id}`
                      )
                    }
                  >
                    Open CV
                  </button>
                </article>
              ))}
            </div>
          )}
      </section>
    </main>
  )
}

export default Dashboard