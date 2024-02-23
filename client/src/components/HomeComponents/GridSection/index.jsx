import React from 'react'
import "./index.scss"
import { Link } from 'react-router-dom'
const GridSection = () => {
  return (
    <section id='spa-service'>
<div className="spa-ser ">
  <div  className="div1 spa ">
    <div className="image">
      <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/Lilac-Demo-Grid-Banner-Img-2.png" alt="" />
    <div className="conten">
      <h6>QUEENS</h6>
      <h3>Body Care</h3>
      <Link to="/services">View Collections</Link>
    </div>
    </div>
  </div>
  <div    className="div2 spa">
  <div className="image">
      <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/filler-img-10.jpg" alt="" />
    <div className="conten">
      <h6>
GAMBARO</h6>
      <h3>Face Care</h3>
      <Link to="/services">View Collections</Link>
    </div>
    </div>
  </div>
  <div className="div3 spa">
  <div className="image">
      <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/Lilac-Demo-Grid-Banner-Img.png" alt="" />
    <div className="conten">
      <h6>LEICA</h6>
      <h3>Leg Care</h3>
      <Link to="/services">View Collections</Link>
    </div>
    </div>
  </div>
  <div className="div4 spa">
  <div className="image">
      <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/filler-img-12.jpg" alt="" />
    <div className="conten">
      <h6>MARIEKE</h6>
      <h3>Hair Care</h3>
      <Link to="/services">View Collections</Link>
    </div>
    </div>
  </div>
  <div className="div5 spa">
  <div className="image">
      <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/filler-img-13.jpg" alt="" />
    <div className="conten">
      <h6>ISELA</h6>
      <h5>Fragrance</h5>
      <Link to="/services">View Collections</Link>
    </div>
    </div>
  </div>
</div>

    </section>
  )
}

export default GridSection