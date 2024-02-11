import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import WhereAreYou from '../../components/WhereAreYou'
import BlogsCard from '../../components/BlogCards'
import axios from 'axios'
import "./index.scss"
const BlogPage = () => {
  const [data, setData] = useState([])

  async function getData() {
    const res=await axios("http://localhost:5000/blog")
    setData(res.data)
  
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
    <Helmet>
      <title>BlogPage</title>
    </Helmet>
    <>
    <WhereAreYou title="Blog" curent="Blog"/>
    <div className="bloga">
       <div className='container'>
      <div className="row">
        {
          data && data.map(x=>
          <div key={x._id} className="col-lg-6 col-md-6 col-12">
          <BlogsCard {...x}/>
        </div>
            )
        }
        
      </div>
    </div>
    </div>
   
    </>
    </>
    
  )
}

export default BlogPage