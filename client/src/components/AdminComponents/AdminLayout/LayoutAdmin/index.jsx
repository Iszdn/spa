import React from 'react'
import NavAdmin from '../NavbarAdmin/NAvigations'
import { Outlet } from 'react-router-dom'

const LAyoutAdmin = () => {
  return (
    <>
    <NavAdmin/>
    <Outlet/>
    </>
  )
}

export default LAyoutAdmin