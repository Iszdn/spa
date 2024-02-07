import React from 'react'
import "./index.scss"
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';


import { Navigation } from 'swiper/modules';
const Testimonials = () => {
  return (
    <section id='testimonia'>
<div data-aos="fade-down" data-aos-duration="1200" className="title">
        <span>TESTIMONIALS</span>
        <h3>What Our Clients Say</h3>
      </div>
      <div className="container">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide> 
          <div className="testimonils">
        <p>
        “Nulla bibendum volutpat nisl, in ullamcorper sem
vehicula non. Vestibulum quis ipsum elementum, pulvinar enim eget, suscipit nisl. 	
  Nullam aliquam est a vulputate placerat. Ut quis lectus sodales, laoreet nisi ut, ultricies ex
Maecenas consequat nunc purus, non maximus nunc gravida nec.”
        </p>
        <div className="info">
          <div className="foto">
            <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/home-testimonial-2.webp" alt="" />
          </div>
          <div className="pep">
            <h4><Link>Elisabeth John</Link></h4>
            <span>Top Model</span>
          </div>
          

        </div>
      </div>
      </SwiperSlide>
      <SwiperSlide> 
          <div className="testimonils">
        <p>
        “Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti ad repellat animi, est explicabo qui doloribus sequi fugiat delectus tenetur maiores officiis architecto aliquam consectetur iste dolorem atque, maxime a nisi id fugit eaque cum! Quo voluptates minima veniam maiores deserunt. Repellat sit optio cupiditate molestiae accusamus iste esse enim inventore numquam ipsam illum excepturi nobis deserunt fugit eius cumque fuga, expedita assumenda. Harum consectetur eveniet velit alias. Distinctio, deleniti?.”
        </p>
        <div className="info">
          <div className="foto">
            <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/home-testimonial-2.webp" alt="" />
          </div>
          <div className="pep">
            <h4><Link>Elisabeth John</Link></h4>
            <span>Top Model</span>
          </div>
          

        </div>
      </div>
      </SwiperSlide>
     
      <SwiperSlide> 
          <div className="testimonils">
        <p>
        “Nulla bibendum volutpat nisl, in ullamcorper sem
vehicula non. Vestibulum quis ipsum elementum, pulvinar enim eget, suscipit nisl. 	
  Nullam aliquam est a vulputate placerat. Ut quis lectus sodales, laoreet nisi ut, ultricies ex
Maecenas consequat nunc purus, non maximus nunc gravida nec.”
        </p>
        <div className="info">
          <div className="foto">
            <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/home-testimonial-2.webp" alt="" />
          </div>
          <div className="pep">
            <h4><Link>Elisabeth John</Link></h4>
            <span>Top Model</span>
          </div>
          

        </div>
      </div>
      </SwiperSlide>
     
      <SwiperSlide> 
          <div className="testimonils">
        <p>
        “Nulla bibendum volutpat nisl, in ullamcorper sem
vehicula non. Vestibulum quis ipsum elementum, pulvinar enim eget, suscipit nisl. 	
  Nullam aliquam est a vulputate placerat. Ut quis lectus sodales, laoreet nisi ut, ultricies ex
Maecenas consequat nunc purus, non maximus nunc gravida nec.”
        </p>
        <div className="info">
          <div className="foto">
            <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/home-testimonial-2.webp" alt="" />
          </div>
          <div className="pep">
            <h4><Link>Elisabeth John</Link></h4>
            <span>Top Model</span>
          </div>
          

        </div>
      </div>
      </SwiperSlide>
     
      </Swiper>
      </div>
      
    </section>
  )
}

export default Testimonials