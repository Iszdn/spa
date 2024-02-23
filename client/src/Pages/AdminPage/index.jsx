import React, { useContext } from 'react'
import "./index.scss"
import { Helmet } from 'react-helmet-async'
import NavAdmin from '../../components/AdminComponents/AdminLayout/NavbarAdmin/NAvigations'
import { UserContext } from '../../context/userContext'
import { Link } from 'react-router-dom'
const AdminPage = () => {
  const {user}=useContext(UserContext)
  return (
    <>
    <Helmet>
      <title>AdminPage</title>
    </Helmet>
    <div className="adminpage">
<h3 className='center'>Welcome to admin page <Link to="/account">{user.username}</Link></h3>
    </div>
    </>
    
  )
}

export default AdminPage