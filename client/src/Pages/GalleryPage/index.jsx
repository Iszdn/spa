import React, { useEffect, useState } from 'react'
import "./index.scss"
import { Helmet } from 'react-helmet-async'
import axios from 'axios';
import  { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import { EffectCoverflow } from 'swiper/modules';

const GalleryPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const res = await axios("http://localhost:5000/gallery");
    setData(res.data);
    setLoading(false);
  }
  useEffect(() => {
    
  
    getData()
  }, [])
  
  return (
    <>
    <Helmet>
      <title>GalleryPage</title>
    </Helmet>
    <div className='gallery'>

    
    <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={4}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
       
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {
      loading ? <span className='loader'></span> : (
        data && data.map(x=>
        
          <SwiperSlide>
          <img src={x.image} />
        </SwiperSlide>
          )
      )
    }
         
        
        </Swiper>
    
    </div>
    </>
    
  )
}

export default GalleryPage