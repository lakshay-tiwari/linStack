import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import LandingPage from './pages/LandingPage'
import { ThemeProvider } from './components/ThemeProvider'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuthStore } from './store/authStore'

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
