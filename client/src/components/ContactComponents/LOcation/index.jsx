import React, { useEffect, useState } from 'react'
import { MdOutlineLocationOn } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import axios from 'axios';

const Locasions = () => {
  const [spaContact, setSpaContact] = useState([])
  const [loading, setLoading] = useState(true)

  async function getSpaContact() {
    const res=await axios("http://localhost:5000/contact")
    setSpaContact(res.data)
  setLoading(false)
  }
  useEffect(() => {
    getSpaContact()
  }, [])
  return (

    <div className="container">
  <div className="row">
{
  loading ? <p>loading...</p> :(
spaContact && spaContact.map(x=>
<div key={x._id} className="col-lg-4 col-md-6 col-12">
<div className="widget">
  <ul>
    <li className='location'><span className='loc'><MdOutlineLocationOn /></span><span>No: 58 A, East Madison Street, Baltimore, MD, USA 1234</span></li>
    <li><span className='loc'><FaPhone /></span><span>+1 000-123-456789</span></li>
    <li><span className='loc'><IoIosMail /></span> <span>info@example.com</span></li>
  </ul>
</div>
    </div>
))
}
    
    
  </div>
</div>
  )
}

export default Locasions