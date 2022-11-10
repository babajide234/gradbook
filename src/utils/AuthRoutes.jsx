import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRoutes = () => {
    const auth = {'token':false}

  return (
    
        auth.token ? <> output </> : <Navigate to={`/login`}/>
    
  )
}

export default AuthRoutes;