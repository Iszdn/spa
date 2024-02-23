import React from 'react'
import "./index.scss"
import { Link } from 'react-router-dom'
const HowWeMake = () => {
  return (
    <section id='howwemade'>
<div className="container">
    <div className="row">
        <div className="col-lg-6 col-md-12 col-12">
            <div data-aos="fade-up" data-aos-duration="1000" className="image">
                <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/Lilac-Demo-Drawing-Image.png" alt="" />
            </div>
        </div>
        <div className="col-lg-6 col-md-12 col-12">
        <div data-aos="fade-down" data-aos-duration="1000" className="title">
        <span>HOW WE MAKE</span>
        <h3>Developed by professional dermatologists</h3>
        <p className='ma'>Cras dictum odio sed aliquam eleifend. Lorem ipsum dolor sit amet, consecte adipiscing elit. Etiam lorem lectus Pellentesque lacinia sollicitudin luctus Phas pretium porta odio a porta. Cras fringilla iaculis tellus, sit amet efficitur libero non. Aliquam erat volutpat. Ut at sagittis nunc. In vitae tempus lectus. Nulla apien accumsan, aliquam ex ac, vulputate nisi. Curabitur sit amet arcu ut mauri commodo sagittis. In lacinia congue nulla, non suscipit dui gravida id Maecen euismod, elit at semper dictum, velit leo bibendum ipsum, in viverra risus ex.</p>
        <div className="info">
            <div className="opem">
                <h4>We are Open</h4>
            <p>Mon – Fri:   08:30 – 20:00</p>
            <p>Sat & Sun:   09:30 – 21:30</p>

        </div>
        <div className="contact">
<h4>Contact Us</h4>
<Link>contact@example.com</Link>
<Link>+01 23456789</Link>
        </div>
        </div>
        <div className="button-an"><Link>explore now</Link></div>
      </div>
        </div>
       
    </div>
    
</div> 

    </section>
  )
}

export default HowWeMake