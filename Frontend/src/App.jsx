import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from './routes/app.routes'
import { AuthProvider } from './features/auth/context/auth.context'
import "./style/button.scss";

const App = () => {
  return (
   <AuthProvider>
    <RouterProvider router={router}/>
   </AuthProvider>
  )
}

export default App

