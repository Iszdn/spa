import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaBars } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import "./index.scss"
import { useTranslation } from 'react-i18next';
const Navbar = () => {
  const [logo, setLogo] = useState([])
  const [profileIcon, setProfileIcon] = useState([])
  const [shopIcon, setShopIcon] = useState([])
  const [heartIcon, setHeartIcon] = useState([])
  const [open, setOpen] = useState(false)
  const [scrolling, setScrolling] = useState(false);
const [loading, setLoading] = useState(true)
const { t, i18n } = useTranslation();

function handleOPen() {
  setOpen(!open)
}

function ChangelANG(lang) {
  i18n.changeLanguage(lang)
}

  async function getLogo() {
    const res=await axios("http://localhost:5000/logo")
    setLogo(res.data)
    setLoading(false)
  }
  async function getProfileIcon() {
    const res=await axios("http://localhost:5000/profileicon")
    setProfileIcon(res.data)
  }
  async function getShopIcon() {
    const res=await axios("http://localhost:5000/shopicon")
    setShopIcon(res.data)
  }
  async function getHeartIcon() {
    const res=await axios("http://localhost:5000/hearticon")
    setHeartIcon(res.data)
  }
  useEffect(() => {
   getLogo();
   getProfileIcon();
   getShopIcon() ;
   getHeartIcon();
   window.addEventListener('scroll', handleScroll);
   return () => {
     window.removeEventListener('scroll', handleScroll);
   };
  }, [])
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };
  return (
    <nav id='nav' className={scrolling ? 'scrolling' : ''}>
<div className="navbar">
  <div className="navigations">
    <ul>
      <li>
        <NavLink to="/">{t("Home")}</NavLink>
      </li>
      <li>
        <NavLink to="/about">{t("About")}</NavLink>
      </li>
      <li>
        <NavLink to="/blog">{t("Blog")}</NavLink>
      </li>
      <li>
        <NavLink to="/shop">Shop</NavLink>
      </li>
      <li>
        <NavLink to="/gallery">{t("Gallery")}</NavLink>
      </li>
      <li className='menu'>
        <Link>{t("Pages")} <IoIosArrowDown /></Link>
        <div className="submenu">
          <ul>
            <li>
              <NavLink to="/account">Account</NavLink>
            </li>
            
            <li>
              <NavLink to="/admin">Admin</NavLink>
            </li>
            <li>
              <NavLink to="*">404</NavLink>
            </li>
            <li>
              <NavLink to="/contactus">Contact Us</NavLink>
            </li>
            <li>
              <NavLink to="/faq">FAQ</NavLink>
            </li>
            <li>
              <button onClick={()=>ChangelANG("az")}>
                AZ
              </button>
              <button onClick={()=>ChangelANG("en")}>
                en
              </button>
            </li>
            
          </ul>
        </div>
      </li>
     
    </ul>

  </div>
  <div className="logo">
{
  loading ? <span className="loader"></span> : (
  logo && logo.map(x=>
  <Link to="/" key={x._id}><img  src={x.image} alt="" /></Link>
  )
)}
  </div>
  <div className="icons">
    <ul>
      <li>
        <NavLink to="/account">
          {
            profileIcon && profileIcon.map(x=>
              <i key={x._id} className={x.image}></i>
              )
          }
          </NavLink>
      </li>
      <li>
        <NavLink> {
            heartIcon && heartIcon.map(x=>
              <i key={x._id} className={x.image}></i>
              )
          }</NavLink>
      </li>
      <li>
        <NavLink> {
           shopIcon && shopIcon.map(x=>
              <i key={x._id} className={x.image}></i>
              )
          }</NavLink>
      </li>
      
    </ul>
  </div>
  <div onClick={()=>handleOPen()} className="bar">
  <FaBars />
  </div>
</div>

<div className={`backNavbar ${open ? 'active' : ''}`}>
<div className={`navbar-media ${open ? "nav-med" : ""}`}>
  <div onClick={()=>handleOPen()} className="krest"><CgClose /></div>
<div className="navigations-media">
    <ul>
      <li>
        <NavLink to="/">Home </NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/blog">Blog</NavLink>
      </li>
      <li>
        <NavLink to="/shop">Shop</NavLink>
      </li>
      <li>
        <NavLink to="/gallery">Gallery</NavLink>
      </li>
      <li>
        <NavLink to="/pages">Pages <IoIosArrowDown /></NavLink>
      </li>
     <li>
      <NavLink></NavLink>
     </li>
    </ul>

  </div> 
 </div>
</div>
    </nav>
  )
}

export default Navbar