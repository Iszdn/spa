import React from 'react'
import "./index.scss"
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <section id='header-sec'>
 <video autoPlay muted loop id="background-video">
        <source src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/Lilic-video-2-output.webm" type="video/mp4" />
    
       
      </video>
<div className="container">
   <div  className="elementor-widget-wrap">
        <span>Premium Cosmetics </span>
        <h2>Beauty & Personal Care</h2>
        <p>Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. In hac habitasse platea dictumst vestibulum rhoncus est.</p>
        <div className="button-an">
            <Link>Browse Collection</Link>
        
        </div>
      </div>
</div>
     
    </section>
  )
}

export default Header