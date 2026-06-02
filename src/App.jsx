import React from 'react'
import { Route, createRoutesFromElements, createBrowserRouter, RouterProvider, Router } from 'react-router-dom'
import ProfileSetPage from './pages/ProfileSetPage'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import MainLayout from './layout/MainLayout'

const App = () => {
  const router = createBrowserRouter(createRoutesFromElements (
    <>
    <Route path = "/" element = {<AuthPage/>}/>
    <Route path = '/profile-setup' element = {<ProfileSetPage/>} />


    
    <Route element = {<MainLayout/>}>
      <Route path = '/home' element = {<HomePage/>} />
    </Route>
    </> 
  ))

  return <RouterProvider router = {router} />
}

export default App