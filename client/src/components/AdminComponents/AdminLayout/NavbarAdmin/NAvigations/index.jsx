import React from 'react'
import "./index.scss"
import { NavLink } from 'react-router-dom'
const NavAdmin = () => {
  return (
    <nav id='nav-admin'>
<div className="navigation">
<ul>
    <li>
        <NavLink to="/admin/users">Users</NavLink>
    </li>
    <li>
        <NavLink to="/admin/services">Services</NavLink>
    </li>
    <li>
        <NavLink to="/admin/teams">Team</NavLink>
    </li>
    <li>
        <NavLink to="/admin/blogs">Blogs</NavLink>
    </li>
    
</ul>
</div>
    </nav>
  )
}

export default NavAdmin