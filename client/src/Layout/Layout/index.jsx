import React from 'react'
import Navbar from '../Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import toast, { Toaster } from 'react-hot-toast';
import BackToTopButton from '../BackToTop';
const Layout = () => {
  return (
    <>
<Navbar/>
<Outlet/>
<Toaster />
<BackToTopButton/>
<Footer/>
    </>
  )
}

export default Layout