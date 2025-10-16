import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import GoogleLogin from './GoogleLogin'
import Dashboard from './Dashboard'
import PageNotFound from './PageNotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useState } from 'react'
import RefreshHandler from './RefreshHandler'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId="437090129528-9nlep5av6kefts61bhd92tlck71q6sk5.apps.googleusercontent.com">
        <GoogleLogin>
        </GoogleLogin>
      </GoogleOAuthProvider>
    )
  }

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />
  }

  return (
    <BrowserRouter>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

{/* <h1>Google Login</h1> */ }