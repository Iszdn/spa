import React, { useState } from 'react'
import "./index.scss"
import { NavLink } from 'react-router-dom'
import { TbUsers } from "react-icons/tb";
import { IoSparklesOutline } from "react-icons/io5";
import { MdInsertEmoticon } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { MdOutlineSpa } from "react-icons/md";
import { IoLogoReddit } from "react-icons/io";
import { TfiGallery } from "react-icons/tfi";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { BsPatchQuestion } from "react-icons/bs";
import { RiTeamLine } from "react-icons/ri";
import { TiContacts } from "react-icons/ti";
import { TbBrandBooking } from "react-icons/tb";
import { PiGithubLogoDuotone } from "react-icons/pi";
const NavAdmin = () => {

    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
      };

  return (
    <nav id='nav-admin' className={darkMode ? 'light-mode' : 'dark-mode'}>
         
<div className="navigation">
<ul>
    <li><p onClick={toggleDarkMode}>
              {darkMode ? <MdOutlineDarkMode /> :   <CiLight />}
            </p></li>
<li>
        <NavLink to="/admin"> <h5>Dashboard</h5> </NavLink>
    </li>
    <li>
        <NavLink to="/admin/users"><TbUsers /> Users</NavLink>
    </li>
    <li>
        <NavLink to="/admin/services"><MdOutlineSpa />Services</NavLink>
    </li>
    <li>
        <NavLink to="/admin/spaCategory"><IoSparklesOutline />  Spa Category</NavLink>
    </li>
    <li>
        <NavLink to="/admin/profileIcon"><MdInsertEmoticon />Profile Icon</NavLink>
    </li>
    <li>
        <NavLink to="/admin/logo"><IoLogoReddit />Logo</NavLink>
    </li>
    <li>
        <NavLink to="/admin/gallery"><TfiGallery />Gallery</NavLink>
    </li>
   
    <li>
        <NavLink to="/admin/marka"><MdOutlineBookmarkAdded />Marka</NavLink>
    </li>
    <li>
        <NavLink to="/admin/faq"><BsPatchQuestion />Faq</NavLink>
    </li>
    <li>
        <NavLink to="/admin/contact"><TiContacts />Contact</NavLink>
    </li>
    <li>
        <NavLink to="/admin/teams"><RiTeamLine />Team</NavLink>
    </li>
    <li>
        <NavLink to="/admin/blogs"><PiGithubLogoDuotone />Blogs</NavLink>
    </li>
    <li>
        <NavLink to="/admin/adminBooking"><TbBrandBooking />Bookings</NavLink>
    </li>
    
</ul>
</div>
    </nav>
  )
}

export default NavAdmin