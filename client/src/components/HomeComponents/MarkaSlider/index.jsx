import React from 'react'
import "./index.scss"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const Marka = () => {

  return (
   
    <section id='marka'>

<Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          speed: 10, 
        }}
 
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
      >      
<SwiperSlide><div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/Logo-5.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide> <div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/Logo-1.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide> <div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/brand-logo-2.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide>   <div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/brand-logo-3.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide><div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/brand-logo-5.webp" alt="" />
</div>
   </SwiperSlide>
   <SwiperSlide><div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/Logo-5.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide> <div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/Logo-1.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide> <div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/brand-logo-2.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide>   <div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/brand-logo-3.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide><div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/brand-logo-5.webp" alt="" />
</div>
   </SwiperSlide>
<SwiperSlide><div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/Logo-5.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide> <div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/Logo-1.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide> <div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/brand-logo-2.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide>   <div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/brand-logo-3.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide><div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/brand-logo-5.webp" alt="" />
</div>
   </SwiperSlide>
   <SwiperSlide><div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/Logo-5.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide> <div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2022/10/Logo-1.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide> <div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/brand-logo-2.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide>   <div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/brand-logo-3.webp" alt="" />
</div></SwiperSlide>
<SwiperSlide><div className="marka1">
  <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/brand-logo-5.webp" alt="" />
</div>
   </SwiperSlide>
      </Swiper>


      
    </section>
  )
}

export default Marka