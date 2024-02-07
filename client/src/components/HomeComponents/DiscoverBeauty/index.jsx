import React from 'react'
import dis from "../../../assets/imgs/discver.png"
import "./index.scss"
import { Link } from 'react-router-dom';
const Discover = () => {
  return (
    <section id='discover'>
      <div className="container">
        <div className="row">
          <div  data-aos="fade-right" data-aos-duration="1000" className="col-lg-6 col-md-12 col-12">
              <div className="title">
        <span>DISCOVER BEAUTY</span>
        <h3>Daily Essentials Makeup Range</h3>
        <p>Nullam euismod purus quis blandit eleifend. Nullam egestas, diam ut ornare ultrices, nibh metus feugiat ante, id sclerisque ague est.</p>
      </div>
      <div className="services">
        <div className="formula">
        <div className="image">
        <img src="https://wordpress.vecurosoft.com/wellnez/wp-content/uploads/2023/03/sr-i-1-4.png" alt="" />
        </div> 
        <div className="info">
          <h4><Link>Thermal Bath</Link></h4>
          <p>There are many variations of passages gaks the majority.</p>
        </div>
        </div>
        
      
      <div className="read-more">
      <div className="add-but">
    <Link>read more</Link>
  </div>
      </div>
      </div>
          </div>
          <div data-aos="fade-up" data-aos-duration="1200" className="col-lg-6 col-md-12 col-12">
            <div className="massage">
             <img src={dis} alt="" />
            </div>
            
          </div>
        </div>
      </div>

    </section>
  )
}

export default Discover