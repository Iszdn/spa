import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IoArrowForward } from "react-icons/io5";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { loginValidationSchema } from "../../utils/validation";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
      <Helmet>
        <title>LoginPage</title>
      </Helmet>
      <>
        <div className="register">
          <div className="inner">
            <div className="image-holder">
              <img src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/Lilac-Demo-Home-3-Banner-Img-1.webp" alt="" />
            </div>
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                confirmpassword: "",
              }}
              validationSchema={Yup.object().shape({
                username: Yup.string().required("Username is required"),
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().required("Password is required"),
                confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
              })}
              onSubmit={(values, { resetForm }) => {
                resetForm();
              }}
            >
              <Form>
                <h3>Login Form</h3>
                <div className="form-wrapper">
                  <div className="in">
                    <Field name="username" type="text" placeholder="Username"/>
                    <div className="red">
                      <ErrorMessage name="username" />
                    </div>
                  </div>
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="form-wrapper">
                  <div className="in">
                    <Field name="email" type="email" placeholder="Email Address"/>
                    <div className="red">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="form-wrapper">
                  <div className="in">
                    <Field name="password" type={passwordVisible ? "text" : "password"} placeholder="Password"/>
                    <i className={`fa-regular ${passwordVisible ? "fa-eye" : "fa-eye-slash"}`} onClick={togglePasswordVisibility}></i>
                    <div className="red">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                </div>
                <div className="form-wrapper">
                  <div className="in">
                    <Field name="confirmpassword" type={confirmPasswordVisible ? "text" : "password"} placeholder="Confirm Password"/> 
                    <i className={`fa-regular ${confirmPasswordVisible ? "fa-eye" : "fa-eye-slash"}`} onClick={toggleConfirmPasswordVisibility}></i>
                    <div className="red">
                      <ErrorMessage name="confirmpassword" />
                    </div>
                  </div>
                </div>
                <button type="submit">Log In <IoArrowForward /></button>
                <p><Link>Forgot Password?</Link></p>
              </Form>
            </Formik>
          </div> 
        </div>
      </>
    </>
  );
};

export default LoginPage;
