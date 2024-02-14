import React from 'react'
import "./index.scss"
import { Link } from 'react-router-dom'
const BlogsCard = (product) => {
  const formattedDate = product.date.split('T')[0];
  return (
    <div className='blog-card'>
        <div className="image">
        <Link to={`/blog/${product._id}`}> <img src={product.image} alt="" /></Link>
            <div className="data">
                <p>{formattedDate}</p>
            </div>
        </div>
        <div className="info">
            <h3> <Link to={`/blog/${product._id}`}>{product.title}</Link></h3>
            <p>{product.description}</p>
            <Link to={`/blog/${product._id}`}>READ MORE</Link>
        </div>
    </div>
  )
}

export default BlogsCard