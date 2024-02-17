import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import WhereAreYou from '../../components/WhereAreYou'
import BlogsCard from '../../components/BlogCards'
import axios from 'axios'
import "./index.scss"
import { Link } from 'react-router-dom'
const BlogPage = () => {
  const [data, setData] = useState([])
  const [category, setCategory] = useState([])
  const [tag, setTag] = useState([])
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)

async function getCategory() {
  const res=await axios(`http://localhost:5000/blogCategory`)
  setCategory(res.data)
}
async function getTag() {
  const res=await axios(`http://localhost:5000/blogTag`)
  setTag(res.data)
}
 
  async function getData() {
    const res=await axios("http://localhost:5000/blog")
    setData(res.data)
    setLoading(false)
  
  }
  async function getGallery() {
    const res=await axios("http://localhost:5000/gallery")
    setGallery(res.data)
  
  }
 useEffect(() => {
     getData()
    getCategory()
    getTag()
    getGallery()
  }, [])
  
  return (
    <>
    <Helmet>
      <title>BlogPage</title>
    </Helmet>
    <>
    <WhereAreYou title="Blog" curent="Blog"/>
    <div className="bloga">
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
    {data.slice(0, 3).map(blog => (
      <li key={blog._id}>
        <img src={blog.image} />
        <h5>{blog.title}</h5>
      </li>
    ))}
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
                {
                  gallery && gallery.slice(0, 6).map(x=>
                     <div key={x._id} className="gallery">
              <img src={x.image} alt="" />
             </div>
             )
                }
               
           
             
              </div>
             
            </div>
          </div>
        </div>
        <div className="col-lg-9">
            <div className='container'>
      <div className="row">
        {
        
        loading ? <span className="loader"></span> :
        
        (
          data && data.map(x=>
          <div key={x._id} className="col-lg-6 col-md-6 col-12">
          <BlogsCard {...x}/>
        </div>
            ))
        }
        
      </div>
    </div>
        </div>
        </div>
      </div>

     
    </div>
   
    </>
    </>
    
  )
}

export default BlogPage