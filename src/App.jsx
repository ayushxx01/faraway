import React from 'react'
import RegisterPage from './pages/registerPage'
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider, Router } from 'react-router-dom'
import ProfileSetPage from './pages/ProfileSetPage'
import HomePage from './pages/HomePage'

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements (
    <>
    <Route path = "/" element = {<RegisterPage/>}/>
    <Route path = '/profile-setup' element = {<ProfileSetPage/>} />
    <Route path = '/home' element = {<HomePage/>} />
    </> 
  ))

  return <RouterProvider router = {router} />
}

export default App