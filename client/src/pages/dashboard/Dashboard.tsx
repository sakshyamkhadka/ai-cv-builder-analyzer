import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/AuthContext'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <p>
        Welcome, {user?.name}
      </p>

      <p>
        Email: {user?.email}
      </p>

      <p>
        Email Verified:{' '}
        {user?.emailVerified ? 'Yes' : 'No'}
      </p>

      <button
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </main>
  )
}

export default Dashboard