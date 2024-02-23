import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import './index.scss';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const initialValues = {
    firstname: '',
    email: '',
    message: ''
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    message: Yup.string().required('Message is required')
  });

  const handleSubmit = (values, { resetForm }) => {
    const serviceId = "service_o74aiut";
    const templateId = "template_cwmkhyd";
    const publicKey = "VpSfzhjgwlvXSkVZA";

    const templateParams = {
      from_name: values.firstname,
      from_email: values.email,
      to_name: "Lilac spa-salon",
      message: values.message
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        toast.success('message successfully sended!', response);
        resetForm();
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <div className='form-contact'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              name="firstname"
              type="text"
              placeholder="First Name"
            />
           <div className="red"><ErrorMessage name="firstname" component="div" />
</div> 
            <Field
              name="email"
              type="email"
              placeholder="Email"
            />
           <div className="red"><ErrorMessage name="email" component="div" />
</div> 
            <Field
              name="message"
              as="textarea"
              placeholder="Message"
            />
           <div className="red"><ErrorMessage name="message" component="div" />
</div> 
            <button  type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
