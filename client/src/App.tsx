import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import VerifyEmail from './pages/auth/VerifyEmail'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Dashboard from './pages/dashboard/Dashboard'
import ProtectedRoute from './routes/ProtectedRoute'
import CreateCV from './pages/cv/CreateCV'
import EditCV from './pages/cv/EditCV'


const App = () => {
  return (
    <Routes>
     <Route
  path="/login"
  element={<Login />}
/>

<Route
  path="/register"
  element={<Register />}
/>

<Route
  path="/verify-email"
  element={<VerifyEmail />}
/>

<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/cv/:id"
  element={
    <ProtectedRoute>
      <EditCV />
    </ProtectedRoute>
  }
/>
<Route
  path="/cv/new"
  element={
    <ProtectedRoute>
      <CreateCV />
    </ProtectedRoute>
  }
/>

<Route
  path="*"
  element={
    <Navigate
      to="/login"
      replace
    />
  }
/>
    </Routes>
  )
}

export default App