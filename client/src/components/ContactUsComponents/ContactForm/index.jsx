import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { loginValidationSchema } from '../../../utils/validation'
import "./index.scss"
const ContactForm = () => {
  return (
    <div className='form-contact'>
            <Formik
       initialValues={{ firstName: '', lastName: '', email: '', number: '', message:'' }}
       validationSchema={loginValidationSchema} >


       <Form>
        

   <Field name="firstName" type="text" placeholder="First Name"/>
         <div className="red"><ErrorMessage name="firstName" /></div>
 
         <Field name="lastName" type="text" placeholder="Last Name"/>
      <div className="red">   <ErrorMessage name="lastName" /></div>

   
         <Field name="email" type="email" placeholder="Email"/>
        <div className="red"> <ErrorMessage name="email" /></div>
 
         <Field name="number" type="number" placeholder="Mobile Number"/>
         <div className="red"><ErrorMessage name="number" /></div>
  
   
      
        <Field name="message" type="text" placeholder="Message"/>
   <div className="red">      <ErrorMessage name="message" /></div>

   
  <button type="submit">Submit</button>
        
       </Form>
     </Formik>
    
    </div>
  )
}

export default ContactForm