import React from "react";
import "./index.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IoArrowForward } from "react-icons/io5";
import * as Yup from "yup";

import { Helmet } from "react-helmet-async";
import { loginValidationSchema } from "../../utils/validation";
import { Link } from "react-router-dom";
const Register = () => {
  return (
    <>
      <Helmet>
        <title>RegisterPage</title>
      </Helmet>
      <>
        <div className="register">
          <div className="inner">
            <div className="image-holder">
              <img
                src="https://wdtlilacdemo.wpengine.com/wp-content/uploads/2023/06/Lilac-Demo-Home-3-Banner-Img-1.webp"
                alt=""
              />
            </div>

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",
                confirmpassword: "",
              }}
              validationSchema={loginValidationSchema}
              onSubmit={(values, { resetForm }) => {
                resetForm();
              }}
            >
              <Form>
                <h3>Registration Form</h3>
                <div className="form-group">
                  <div className="in">
                    <Field
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                    />

                    <div className="red">
                      <ErrorMessage name="firstName" />
                    </div>
                  </div>

                  <div className="in">
                    <Field
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                    />
                    <div className="red">
                      <ErrorMessage name="lastName" />
                    </div>
                  </div>
                </div>

                <div className="form-wrapper">
                  <div className="in">
                    <Field name="username" type="text" placeholder="Username" />

                    <div className="red">
                      <ErrorMessage name="username" />
                    </div>
                  </div>
                  {/* <i className="fa-solid fa-user"></i> */}
                </div>
                <div className="form-wrapper">
                  <div className="in">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email Address"
                    />

                    <div className="red">
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  {/* <i className="fa-solid fa-envelope"></i> */}
                </div>

                <div className="form-wrapper">
                  <div className="in">
                    <Field
                      name="password"
                      type="number"
                      placeholder="Password"
                    />

                    <div className="red">
                      <ErrorMessage name="password" />
                    </div>
                  </div>
                  {/* <i className="fa-solid fa-lock"></i> */}
                </div>

                <div className="form-wrapper">
                  <div className="in">
                    <Field
                      name="confirmpassword"
                      type="number"
                      placeholder="Confirm Password"
                    />
                    <div className="red">
                      <ErrorMessage name="confirmpassword" />
                    </div>
                  </div>
                  {/* <i className="fa-solid fa-lock"></i> */}
                </div>

                <button type="submit">
                  Register <IoArrowForward />
                </button>
                <p>
                  Already have an account? <Link to="/login">Login now</Link>
                </p>
              </Form>
            </Formik>
          </div>
        </div>
      </>
    </>
  );
};

export default Register;
