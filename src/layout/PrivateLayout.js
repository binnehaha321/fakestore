import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth)
  console.log(user);

  if (!user) return <Navigate to='/login' />

  return <>{children}</>
}

export default PrivateLayout;