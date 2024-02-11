import React, { useEffect, useState } from 'react'
import "./index.scss"
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import BlogsCard from '../../components/BlogCards'
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
  

  return (
    <>
    <Helmet>
      <title>BlogDetails</title>
    </Helmet>
    <>
    <div className="blog-details">
      
{
  data && 
  <BlogsCard {...data}/>
}
    </div>
    </>
    </>
    
  )
}

export default BlogDetails