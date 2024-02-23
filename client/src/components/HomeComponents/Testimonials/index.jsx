import React, { useEffect, useState } from 'react'
import "./index.scss"
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';


import { Navigation } from 'swiper/modules';
import axios from 'axios';
const Testimonials = () => {

  const [spaReview, setSpaReview] = useState([]);
  const [loading, setLoading] = useState(true)

 


  async function getSpaReview() {
    try {
      const res = await axios.get("http://localhost:5000/review");
      setSpaReview(res.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching spa categories:', error);
    }
  }

  useEffect(() => {
    getSpaReview();
  }, []);



  return (
    <section id='testimonia'>
<div data-aos="fade-down" data-aos-duration="1200" className="title">
        <span>TESTIMONIALS</span>
        <h3>What Our Clients Say</h3>
      </div>
      <div className="container">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
       
       {
        loading ? <span className='loader'></span> : (
          spaReview && spaReview.map(x=>
             <SwiperSlide key={x._id}> 
          <div className="testimonils">
        <p>
        “ {x.review} ”
        </p>
        <div className="info">
          <div className="foto">
            <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/home-testimonial-2.webp" alt="" />
          </div>
          <div className="pep">
            <h4><Link>{x.name}</Link></h4>
            <span>Top Model</span>
          </div>
          

        </div>
      </div>
      </SwiperSlide>
            )
        )
       }
       
      
     
      </Swiper>
      </div>
      
    </section>
  )
}

export default Testimonials