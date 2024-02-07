import React from 'react'
import "./index.scss"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import Card from '../../Card';
const Diamond = () => {
  return (
    <section id='diamond'>
      <div data-aos="fade-down" data-aos-duration="1200" className="title">
        <span>Diamond Collections</span>
        <h3>Personal Care Products</h3>
      </div>
      <div className="container">

      
  <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
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
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
        data-aos="fade-up" data-aos-duration="1300"
      >
        <SwiperSlide>
          <Card/>
        </SwiperSlide>
        <SwiperSlide>
          <Card/>
        </SwiperSlide>
        <SwiperSlide>
          <Card/>
        </SwiperSlide>
        <SwiperSlide>
          <Card/>
        </SwiperSlide>
        <SwiperSlide>
          <Card/>
        </SwiperSlide>
        <SwiperSlide>
          <Card/>
        </SwiperSlide>
        <SwiperSlide>
          <Card/>
        </SwiperSlide>
      
        </Swiper>
        </div>
    </section>
  )
}

export default Diamond