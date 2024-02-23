import React, { useState } from 'react';
import './index.scss'; 
import { MdKeyboardArrowUp } from "react-icons/md";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  window.addEventListener('scroll', toggleVisibility);

  return (
    <div className="back-to-top">
      {isVisible && 
        <button onClick={scrollToTop}><MdKeyboardArrowUp /></button>
      }
    </div>
  );
};

export default BackToTopButton;
