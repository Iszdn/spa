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
const BlogDetails = () => {
  const [data, setData] = useState(null)
  const [category, setCategory] = useState([])
  const [tag, setTag] = useState([])
const {id}=useParams()
async function getId() {
  const res=await axios.get(`http://localhost:5000/blog/${id}`)
  setData(res.data)
}
async function getCategory() {
  const res=await axios(`http://localhost:5000/blogCategory`)
  setCategory(res.data)
}
async function getTag() {
  const res=await axios(`http://localhost:5000/blogTag`)
  setTag(res.data)
}
  useEffect(() => {
    getId()
    getCategory()
    getTag()
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
        <div className="col-lg-3">
          <div className="fil">
            <div className="filtersr">
              <h4>Categories</h4>
              <ul>
                {
                  category && category.map(x=>
                    <li key={x._id}>{x.blogCategoryName}</li>
                    )
                }
              </ul>
            </div>
            <div className="filtersr">
              <h4>Recent Post</h4>
              <ul>
                <li><img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/blog-1-150x150.webp" alt="" /> <h5>Premium feather-light, comfortable lipstick</h5></li>
                <li><img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/blog-1-150x150.webp" alt="" /> <h5>Premium feather-light, comfortable lipstick</h5></li>
                <li><img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/blog-1-150x150.webp" alt="" /> <h5>Premium feather-light, comfortable lipstick</h5></li>
              </ul>
            </div>
            <div className="filtersr">
              <h4>Tags</h4>
             <div className="tags">
              {
tag && tag.map(x=>
  <Link key={x._id}>{x.blogTagsName}</Link>
  )
              }
             
             </div>
            </div>
            <div className="filtersr">
              <h4>Gallery</h4>
              <div className="galleries">
                <div className="gallery">
              <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/insta-img-6-150x150.webp" alt="" />
             </div>
             <div className="gallery">
              <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/insta-img-6-150x150.webp" alt="" />
             </div>
             <div className="gallery">
              <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/insta-img-6-150x150.webp" alt="" />
             </div>
             <div className="gallery">
              <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/insta-img-6-150x150.webp" alt="" />
             </div>
             <div className="gallery">
              <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/insta-img-6-150x150.webp" alt="" />
             </div>
             <div className="gallery">
              <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/insta-img-6-150x150.webp" alt="" />
             </div>
             
              </div>
             
            </div>
          </div>
        </div>
<div className="col-lg-9">
  {
    data && <div className="rigt">
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
<div className="desc">
  <p>{data.description}
</p>
</div>
<div className="fofo">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/shop-19.1.webp" alt="" />
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/shop-18.1.webp" alt="" />
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/shop-8.1.webp" alt="" />
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