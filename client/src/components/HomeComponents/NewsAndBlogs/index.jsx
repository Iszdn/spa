import React, { useEffect, useState } from 'react'
import "./index.scss"
import BlogsCard from '../../BlogCards'
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
const NewsAndBlog = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  async function getData() {
    const res=await axios("http://localhost:5000/blog")
    setData(res.data)
  setLoading(false)
  }
  useEffect(() => {
    getData()
  }, [])
  
  return (
    <section id='newsandblogs'>
  <div data-aos="fade-down" data-aos-duration="1200" className="title">
        <span>LATEST</span>
        <h3>News & Blogs</h3>
      </div>
      <div className="container">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
       
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
          loading ?  <span className="loader"></span> : (
              data && data.map(x=>
            <SwiperSlide key={x._id}><BlogsCard {...x}/></SwiperSlide>
            )
          )
        
        }
        

</Swiper>
      </div>
    </section>
  )
}

export default NewsAndBlog