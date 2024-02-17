import React, { useEffect, useState } from 'react';
import "./index.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaTwitter } from "react-icons/fa";
import { FaInstagram, FaFacebookF,  FaLinkedinIn } from "react-icons/fa";
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const OurTeam = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)

  async function getData() {
    const res = await axios("http://localhost:5000/team");
    setData(res.data);
    setLoading(false)
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <section id='our-team'>
      <div data-aos="fade-down" data-aos-duration="1200" className="title">
        <span>OUR TEAM</span>
        <h3>Cosmetic Experts</h3>
      </div>
      <div data-aos="fade-up" data-aos-duration="1200" className="container">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
         
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            540: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {
             loading ? <span class="loader"></span> :
            (
          data && data.map((x, index) => (
            <SwiperSlide key={index}>
              <div className={index % 2 === 0 ? "team" : "team top-pd"}>
                <div className="image">
                  <img src={x.image} alt="" />
                  <div className="sosial">
                    <Link><FaFacebookF className='face ico' /></Link>
                    <Link><FaInstagram className='inst ico' /></Link>
                    <Link><FaTwitter className='yout ico' /></Link>
                    <Link><FaLinkedinIn className='linkedin ico' /></Link>
                  </div>
                </div>
                <div className="info">
                  <h4>{x.title}</h4>
                  <p>{x.position}</p>
                </div>
              </div>
            </SwiperSlide>
          ))
          )}
        </Swiper>
      </div>
    </section>
  );
}

export default OurTeam;
