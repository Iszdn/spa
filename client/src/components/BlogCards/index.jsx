import React from 'react'
import "./index.scss"
import { Link } from 'react-router-dom'
const BlogsCard = (product) => {
  const formattedDate = product.date.split('T')[0];
  return (
    <div className='blog-card'>
        <div className="image">
            <img src={product.image} alt="" />
            <div className="data">
                <p>{formattedDate}</p>
            </div>
        </div>
        <div className="info">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <Link to={`/blog/${product._id}`}>READ MORE</Link>
        </div>
    </div>
  )
}

export default BlogsCard