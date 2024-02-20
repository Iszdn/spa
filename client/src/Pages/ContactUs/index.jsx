import React from 'react'
import "./index.scss"
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Locasions from '../../components/ContactComponents/LOcation'
import WhereAreYou from '../../components/WhereAreYou'
import ContactForm from '../../components/ContactUsComponents/ContactForm/index2'
// import ContactForm from '../../components/ContactUsComponents/ContactForm'

const ContactUs = () => {
  return (
    <>
    <Helmet>
      <title>ContactUs</title>
    </Helmet>
   <WhereAreYou title="Contact Us" curent="contact"/>
    <section id='meet'>
    <div  className="title">
        <span>OUR BRANCHES</span>
        <h3>Meet Us At</h3>
      </div>
<div className="locations">
<Locasions/>
</div>
<div className="container">
  <div className=" fram">
    <div className="for">
       <div className="formss">
  <h3>Get in touch</h3>
  <ContactForm/>
</div>
    </div>
    <div className=' ifr'><iframe width="100%" height="450" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=code%20academy+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps vehicle tracker</a></iframe></div>

  </div>
 
</div>

    </section>
    </>
    
  )
}

export default ContactUs