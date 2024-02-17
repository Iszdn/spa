import React from 'react'
import NavAdmin from '../NavbarAdmin/NAvigations'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const LAyoutAdmin = () => {
  return (
    <>
    <NavAdmin/>
    <Outlet/>
    <Toaster />
    </>
  )
}

export default LAyoutAdmin