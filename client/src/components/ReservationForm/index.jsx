import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ReservationForm = () => {
  return (
    <div>
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
          <label htmlFor="firstName">First Name</label>
          <Field name="firstName" type="text" />
          <ErrorMessage name="firstName" />

          <label htmlFor="lastName">Last Name</label>
          <Field name="lastName" type="text" />
          <ErrorMessage name="lastName" />

          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />

          <label htmlFor="servicetype">Service Type</label>
          <Field name="servicetype" as="select">
            <option value="">Select a Service Type</option>
            <option value="FACIAL TREATMENTS">Facial Treatments</option>
            <option value="JALEH SPA ADD-ON SERVICES">Jaleh Spa Add-On Services</option>
            <option value="MASSAGES">Massages</option>
            <option value="BODY TREATMENTS">Body Treatments</option>
            <option value="TRADITIONAL">Traditional</option>
          </Field>
          <ErrorMessage name="servicetype" />

          <label htmlFor="date">Date</label>
          <Field name="date" type="date" />
          <ErrorMessage name="date" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ReservationForm;
