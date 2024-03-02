import React, { useState } from 'react'
import "./index.scss"
import Count from "react-countup";
import ScrollTrigger from "react-scroll-trigger";


const Luctiory = () => {
  const [counterOn, setCounterOn] = useState(false);
  return (
    <ScrollTrigger
        onEnter={() => setCounterOn(true)}
        onExit={() => setCounterOn(false)}
      >
    <section id='best'>
  <div data-aos="fade-down" data-aos-duration="1200" className="title">
        <span>BEST IN MARKET</span>
        <h3>Lightweight Cosmetics</h3>
      </div>
      <div className="container">
        <div className="prod-kol" data-aos="fade-up" data-aos-duration="1200">
          <div className="sold sol">
            <span>  {counterOn && <Count delay={0.5} end={45} duration={9} />}<sup>k</sup></span>
            <p>Products Sold</p>
          </div>
          <div className="sold chem">
            <span>  {counterOn && <Count delay={0.5} end={99} duration={5} />} <sup>%</sup></span>
            <p>Chemical-Free</p>
          </div>
          <div className="sold satis">
            <span>  {counterOn && <Count delay={0.5} end={42} duration={5} />} <sup>k</sup></span>
            <p>Satisfied Customers</p>
          </div>
          <div className="sold def">
            <span>  {counterOn && <Count delay={0.5} end={1} duration={5} />}<sup>%</sup></span>
            <p>Defective Returns</p>
          </div>
        </div>
        <p className='ma'>Fusce id aliquet justo. Etiam aliquet elit eleifend quam commodo sagittis. Quisque dapibus nulla in blandit dictum. Fusce id aliquet justo. Quisque dapibus nulla in blandit dictum.</p>
      </div>
    </section>
    </ScrollTrigger>
  )
}

export default Luctiory