import React, { useEffect, useState } from "react";
import "./index.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import axios from "axios";
const Instagram = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  async function getData() {
    const res=await axios("http://localhost:5000/insta")
    setData(res.data)
    setLoading(false)
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <section id="instagram">
      <div data-aos="fade-down" data-aos-duration="1200" className="title">
        <span>FOLLOW US</span>
        <h3>Instagram</h3>
      </div>
      <div data-aos="fade-down" className="swip-da">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
        
          className="mySwiper"
        >
          {
             loading ? <span className="loader"></span> :
        
             (
            data && data.map(x=>
              <SwiperSlide key={x._id}>
            <div  className="card-nst">
              <div className="image">
                <img
                  src={x.image}
                  alt=""
                />
              </div>
              <div className="overlay"></div>
              <div className="inst">
                <i className="fa-brands fa-instagram"></i>
              </div>
            </div>
          </SwiperSlide>
              )
             )
          }
          
         
        </Swiper>
      </div>
    </section>
  );
};

export default Instagram;
