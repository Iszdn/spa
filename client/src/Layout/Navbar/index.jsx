import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaBars } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
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
  const [languageVisible, setLanguageVisible] = useState(false); 
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  function handleOpen() {
    setOpen(!open)
  }

  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    setLanguageVisible(false); // close language buttons after selecting a language
  }

  async function getLogo() {
    const res = await axios("http://localhost:5000/logo")
    setLogo(res.data)
    setLoading(false)
  }

  async function getProfileIcon() {
    const res = await axios("http://localhost:5000/profileicon")
    setProfileIcon(res.data)
  }

  async function getShopIcon() {
    const res = await axios("http://localhost:5000/shopicon")
    setShopIcon(res.data)
  }

  async function getHeartIcon() {
    const res = await axios("http://localhost:5000/hearticon")
    setHeartIcon(res.data)
  }

  useEffect(() => {
    getLogo();
    getProfileIcon();
    getShopIcon();
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
              <NavLink to="/contactus">{t("Cont")}</NavLink>
            </li>
            <li>
              <NavLink to="/gallery">{t("Gallery")}</NavLink>
            </li>
            <li>
                    <NavLink to="/faq">FAQ</NavLink>
                  </li>
            {/* <li className='menu'>
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
                 
                </ul>
              </div>
            </li> */}
          </ul>
        </div>
        <div className="logo">
          {loading ? <span className="loader"></span> : (
            logo && logo.map(x =>
              <Link to="/" key={x._id}><img src={x.image} alt="" /></Link>
            )
          )}
        </div>
        <div className="icons">
          <ul>
            <li>
              <NavLink to="/account">
                {profileIcon && profileIcon.map(x =>
                  <i key={x._id} className={x.image}></i>
                )}
              </NavLink>
            </li>
            <li>
              <button className='language' onClick={() => setLanguageVisible(!languageVisible)}>
                {selectedLanguage.toUpperCase()}<IoMdArrowDropdown />
              </button>
              {languageVisible && (
                <div className="language-options">
                  <button onClick={() => changeLanguage('az')}> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/2560px-Flag_of_Azerbaijan.svg.png" alt="" /> AZ</button>
                  <button onClick={() => changeLanguage('en')}> <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png" alt="" /> EN</button>
                </div>
              )}
            </li>
          </ul>
        </div>
        <div onClick={() => handleOpen()} className="bar">
          <FaBars />
        </div>
      </div>

      <div className={`backNavbar ${open ? 'active' : ''}`}>
        <div className={`navbar-media ${open ? "nav-med" : ""}`}>
          <div onClick={() => handleOpen()} className="krest"><CgClose /></div>
          <div className="navigations-media">
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
              <NavLink to="/contactus">{t("Cont")}</NavLink>
            </li>
            <li>
              <NavLink to="/gallery">{t("Gallery")}</NavLink>
            </li>
            <li>
                    <NavLink to="/faq">FAQ</NavLink>
                  </li>
                  <li>
              <NavLink to="/account">Account</NavLink>
            </li>
                  <li>
              <NavLink to="/login">{t("Login")}</NavLink>
            </li>
         

            <li>
              <button className='language lana' onClick={() => setLanguageVisible(!languageVisible)}>
                {selectedLanguage.toUpperCase()}<IoMdArrowDropdown />
              </button>
              {languageVisible && (
                <div className="language-options">
                  <button onClick={() => changeLanguage('az')}> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Flag_of_Azerbaijan.svg/2560px-Flag_of_Azerbaijan.svg.png" alt="" /> AZ</button>
                  <button onClick={() => changeLanguage('en')}> <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png" alt="" /> EN</button>
                </div>
              )}
            </li>
          </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
