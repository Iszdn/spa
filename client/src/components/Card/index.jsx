import React from 'react'
import { GoHeart } from "react-icons/go";
import "./index.scss"
import { FaRegStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Card = () => {
  return (
    <div className='card-products'>
<div className="image">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/shop-13.webp" alt="" />
<div className="icons">
  <span><GoHeart /></span>
  <div className="add-but">
    <Link>add to cart</Link>
  </div>
</div>
</div>
<div className="content">
  <h5 className="name">
    <Link> Lorem ipsum dolor sit.</Link>
   
  </h5>
  <div className="raitings">
  <FaRegStar />
  <FaRegStar />
  <FaRegStar />
  <FaRegStar />
  </div>
  <p>$22.00</p>
</div>
    </div>
  )
}

export default Card