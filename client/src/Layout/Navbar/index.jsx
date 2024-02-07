import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";
import "./index.scss"
const Navbar = () => {
  const [logo, setLogo] = useState([])
  const [profileIcon, setProfileIcon] = useState([])
  const [shopIcon, setShopIcon] = useState([])
  const [heartIcon, setHeartIcon] = useState([])
  
  const [scrolling, setScrolling] = useState(false);
  async function getLogo() {
    const res=await axios("http://localhost:5000/logo")
    setLogo(res.data)
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
     
    </ul>

  </div>
  <div className="logo">
{
  logo && logo.map(x=>
  <img key={x._id} src={x.image} alt="" />
  )
}
  </div>
  <div className="icons">
    <ul>
      <li>
        <NavLink>
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
</div>
    </nav>
  )
}

export default Navbar