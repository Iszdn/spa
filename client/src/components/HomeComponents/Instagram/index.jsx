import React from "react";
import "./index.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
const Instagram = () => {
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
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="card-nst">
              <div className="image">
                <img
                  src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/insta-img-2.webp"
                  alt=""
                />
              </div>
              <div className="overlay"></div>
              <div className="inst">
                <i className="fa-brands fa-instagram"></i>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-nst">
              <div className="image">
                <img
                  src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/insta-img-3.webp"
                  alt=""
                />
              </div>
              <div className="overlay"></div>
              <div className="inst">
                <i className="fa-brands fa-instagram"></i>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-nst">
              <div className="image">
                <img
                  src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/insta-img-4.webp"
                  alt=""
                />
              </div>
              <div className="overlay"></div>
              <div className="inst">
                <i className="fa-brands fa-instagram"></i>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-nst">
              <div className="image">
                <img
                  src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/insta-img-5.webp"
                  alt=""
                />
              </div>
              <div className="overlay"></div>
              <div className="inst">
                <i className="fa-brands fa-instagram"></i>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Instagram;
