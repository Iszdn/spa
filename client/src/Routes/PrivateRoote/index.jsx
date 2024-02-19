import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/userContext'
import { Outlet, useNavigate } from 'react-router-dom'

const PrivateRoute = ({roles}) => {
    const {user} = useContext(UserContext)
    const navigate=useNavigate()

    useEffect(() => {
      
        user ? <Outlet/> : navigate("/register")

    }, [])
    
  return (
    <>
{
    user  && roles.includes(user.role)  ? <Outlet/> : navigate("/register")
}
    </>
  )
}

export default PrivateRoute