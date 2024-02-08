import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { loginValidationSchema } from '../../../utils/validation'

const ContactForm = () => {
  return (
    <div>
            <Formik
       initialValues={{ firstName: '', lastName: '', email: '', number: '', message:'' }}
       validationSchema={loginValidationSchema} >


       <Form>
         <Field name="firstName" type="text" />
         <ErrorMessage name="firstName" />
 
         <Field name="lastName" type="text" />
         <ErrorMessage name="lastName" />
 
         <Field name="email" type="email" />
         <ErrorMessage name="email" />
 
         <Field name="text" type="text" />
         <ErrorMessage name="text" />

        
         <Field name="message" type="text" />
         <ErrorMessage name="message" />

         <button type="submit">Submit</button>
       </Form>
     </Formik>
    </div>
  )
}

export default ContactForm