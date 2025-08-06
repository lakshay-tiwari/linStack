import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'

import { ThemeProvider } from './components/ThemeProvider'
import SignupPage from './pages/SignupPage'
import SigninPage from './pages/SigninPage'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter >
        {/* Toaster placed here so it works globally */}
          <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/signin' element={<SigninPage />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
