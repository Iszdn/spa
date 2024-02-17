import React, { useState } from 'react';
import "./index.scss";
import { Link } from 'react-router-dom';
import { FaPlay } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

const PlayVideo = () => {
 const [open, setopen] = useState(false)

 function openVideoBox() {
  setopen(!open)
 }
  return (
    <section id='video'>
      <div className={`openVideoBox ${open ? "openVideo":""}`}>
        <div className="closeBtn" onClick={openVideoBox}>x</div>
        <iframe  src="https://www.youtube.com/embed/LZFpbKtiHwY" ></iframe>
      </div>
      <div className="container">
        <div className="videoplayer">
          <div className="title">
            <span data-aos="fade-up" data-aos-duration="500">AWARD WINNING BEAUTY PRODUCTS</span>
            <h3 data-aos="fade-up" data-aos-duration="1000">Highly performing beauty formula</h3>
            <p data-aos="fade-up" data-aos-duration="1700">Etiam ullamcorper facilisis porta. Donec tincidunt metus a elit tempor, a condimentum sapien laoreet. Nullam metus orci, malesuada ac tincidunt vitae, tincidunt eu elit. Phasellus.</p>
            <div className="add-but">
              <Link data-aos="fade-up" data-aos-duration="2200">explore now</Link>
            </div>
          </div>
          <div data-aos="fade-down" data-aos-duration="1000"  className="play"  onClick={openVideoBox}>
            <p>PLAY VIDEO <span className='empt'></span></p>
            <span className='ico'><FaPlay /></span>
          </div>
        </div>
      </div>
      
        
    
    </section>
  )
}

export default PlayVideo;
