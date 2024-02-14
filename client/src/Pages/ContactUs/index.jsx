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
  <div className="formss">
  <h3>Get in touch</h3>
  <ContactForm/>
</div>
</div>

    </section>
    </>
    
  )
}

export default ContactUs