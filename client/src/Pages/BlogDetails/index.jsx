import React, { useEffect, useState } from 'react'
import "./index.scss"
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import BlogsCard from '../../components/BlogCards'
import { FaFacebookF } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa6"; 
import { IoMailSharp } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import WhereAreYou from '../../components/WhereAreYou'
const BlogDetails = () => {
  const [data, setData] = useState(null)
 
const {id}=useParams()
async function getId() {
  const res=await axios.get(`http://localhost:5000/blog/${id}`)
  setData(res.data)
}

  useEffect(() => {
    getId()
   
  }, [])
  
  const formatMonthAndDay = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} - ${day} - ${year}`;
  }
  return (
    <>
    <Helmet>
      <title>BlogDetails</title>
    </Helmet>
    <>
    <div className="blog-details">
    
    <div className="container">
      <div className="row">
       
<div className="col-lg-12">
  {
    data && <div className="rigt">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
          <div className="image">
  <img src={data.image} alt="" />

</div>
<div className="dataa">
  <div className="gra"></div>
  <p>{formatMonthAndDay(data.date)}</p>
  <div className="gra"></div>
</div>
<div className="sosi">
  <div className="writt">
    <span>Written by</span>
    <p>{data.name}</p>

  </div>
  <div className="sosials">
  <FaFacebookF />
  <FaTwitter />
  <FaGoogle />
  <FaPinterestP />
  <IoMailSharp />
  </div>
</div> 

          </div>
          <div className="col-lg-7">
           <div className="desc">
  <p>{data.description}
</p>

</div>

          </div>
          <div className="fofo">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/shop-19.1.webp" alt="" />
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/shop-18.1.webp" alt="" />
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/shop-8.1.webp" alt="" />
</div>  
        </div>
      </div>
  

  </div>
  }
  

</div>
      </div>
    </div>
      

    </div>
    </>
    </>
    
  )
}

export default BlogDetails