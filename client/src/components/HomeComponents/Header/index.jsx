import React from 'react'
import { useTranslation } from 'react-i18next';
import "./index.scss"
import { Link } from 'react-router-dom'
const Header = () => {
  const { t, i18n } = useTranslation();

 
  return (
    <section id='header-sec'>
 <video autoPlay muted loop id="background-video">
        <source src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/Lilic-video-2-output.webm" type="video/mp4" />
    
       
      </video>
<div className="container">
   <div  className="elementor-widget-wrap">
        <span>{t("Pre")}</span>
        <h2>{t("Beaty")}</h2>
        <p>Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. In hac habitasse platea dictumst vestibulum rhoncus est.</p>
        <div className="button-an">
            <Link>{t("Browse")}</Link>
        
        </div>
      </div>
</div>
     
    </section>
  )
}

export default Header