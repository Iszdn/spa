import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { IoArrowForward } from "react-icons/io5";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { loginValidationSchema } from "../../utils/validation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../../context/userContext";
import { jwtDecode } from "jwt-decode";
import { setCookie } from "../../helper/cookie";

const LoginPage = () => {
  const navigate=useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {setToken} = useContext(UserContext)
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
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
                password: Yup.string()
                .min(5, 'Must be 5 characters or more')
                .required("Password is required"),
                confirmpassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
              })}
              onSubmit={async (values, { resetForm }) => {
                try {
                  const response = await axios.post("http://localhost:5000/users/auth", values);
                  setCookie("token",response.data.token)
                  setToken(response.data.token)
                  toast.success('Successfully logged in!')
                  navigate("/")
                  console.log("Logged in successfully", response.data);
                } catch (error) {
                  toast.error('wrong email or password')
                  console.error("Login failed", error);
                }

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
                {/* <p><Link>Forgot Password?</Link></p> */}
                <p>Not registered yet? <Link to="/register">Register here</Link>.</p>
              </Form>
            </Formik>
          </div> 
        </div>
      </>
    </>
  );
};

export default LoginPage;
