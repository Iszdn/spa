import React from 'react'
import "./index.scss"
const Luctiory = () => {
  return (
    <section id='best'>
  <div data-aos="fade-down" data-aos-duration="1200" className="title">
        <span>BEST IN MARKET</span>
        <h3>Lightweight Cosmetics</h3>
      </div>
      <div className="container">
        <div className="prod-kol" data-aos="fade-up" data-aos-duration="1200">
          <div className="sold sol">
            <span>4300 <sup>k</sup></span>
            <p>Products Sold</p>
          </div>
          <div className="sold chem">
            <span>99.99 <sup>%</sup></span>
            <p>Chemical-Free</p>
          </div>
          <div className="sold satis">
            <span>42<sup>k</sup></span>
            <p>Satisfied Customers</p>
          </div>
          <div className="sold def">
            <span>0.01<sup>%</sup></span>
            <p>Defective Returns</p>
          </div>
        </div>
        <p className='ma'>Fusce id aliquet justo. Etiam aliquet elit eleifend quam commodo sagittis. Quisque dapibus nulla in blandit dictum. Fusce id aliquet justo. Quisque dapibus nulla in blandit dictum.</p>
      </div>
    </section>
  )
}

export default Luctiory