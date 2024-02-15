import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./index.scss"
const ReservationForm = () => {
  return (
    <div className='reserv-form'>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', servicetype: '', date: '' }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          servicetype: Yup.string().required('Required'),
          date: Yup.date().required('Required')
        })}

        onSubmit={(values, { resetForm }) => {
        
          resetForm();
        }}
      >
        <Form>
          <Field  placeholder="Firstname" name="firstName" type="text" />
         <div className="red"> <ErrorMessage name="firstName" /></div>

          <Field placeholder="Lastname" name="lastName" type="text" />
          <div className="red"><ErrorMessage name="lastName" /></div>

          <Field placeholder="Email" name="email" type="email" />
          <div className="red"><ErrorMessage name="email" /></div>

          <Field className="select" name="servicetype" as="select">
            <option value="">Select a Service Type</option>
            <option value="FACIAL TREATMENTS">Facial Treatments</option>
            <option value="JALEH SPA ADD-ON SERVICES">Jaleh Spa Add-On Services</option>
            <option value="MASSAGES">Massages</option>
            <option value="BODY TREATMENTS">Body Treatments</option>
            <option value="TRADITIONAL">Traditional</option>
          </Field>
        <div className="red">  <ErrorMessage name="servicetype" /></div>


          <Field className="select" name="servicetype" as="select">
            <option value="">Select a Service Type</option>
            <option value="FACIAL TREATMENTS">Facial Treatments</option>
            <option value="JALEH SPA ADD-ON SERVICES">Jaleh Spa Add-On Services</option>
            <option value="MASSAGES">Massages</option>
            <option value="BODY TREATMENTS">Body Treatments</option>
            <option value="TRADITIONAL">Traditional</option>
          </Field>
      <div className="red">    <ErrorMessage name="servicetype" /></div>

          <Field name="date" type="date" />
         <div className="red"> <ErrorMessage name="date" /></div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ReservationForm;
