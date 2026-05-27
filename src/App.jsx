import React from 'react'
import RegisterPage from './pages/registerPage'
import ProfileSetPage from './pages/ProfileSetPage'
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom'

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements (
    <>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfileSetPage />} />
    </> 
  ))

  return <RouterProvider router={router} />
}

export default App