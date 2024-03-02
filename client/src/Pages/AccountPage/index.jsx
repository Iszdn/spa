import React, { useContext, useEffect, useState } from 'react';
import "./index.scss";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import InputLabel from '@mui/material/InputLabel';
import { Helmet } from 'react-helmet-async';
import "./index.scss";
import WhereAreYou from '../../components/WhereAreYou';
import Instagram from '../../components/HomeComponents/Instagram';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Cookies from "js-cookie"
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { TextField } from '@mui/material';

const Account = () => {
  const { user, setToken, setUser } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({ username: '', password: '', confirmPassword: '' });


  async function updateUserById(userData) {
    try {
      const res = await axios.put(`http://localhost:5000/users/${user.userId}`, userData);
      // Обработка успешного обновления
      toast.success("User Updated")
      console.log("User updated successfully:", res.data);
    } catch (error) {
      toast.error("wrong!")

      console.log("Error updating user:", error.message);
    }
  }

  async function getUserById() {
    try {
      const res = await axios.get(`http://localhost:5000/users/${user.userId}`);
      setData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserById();
  }, []);

  function handleLogout() {
    Cookies.remove('token');
    setUser(null);
    setToken(null);
    toast.success("Logout");
  }

  // Function to format date
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  }

  function handleEditClick() {
    setEditedValues({ username: user.username, password: user.password });
    setEditing(true);
    resetForm()
  }

  const handleSubmit = async (values, { setSubmitting,resetForm  }) => {
    try {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords do not match");
        setSubmitting(false);
        return;
      }
      await updateUserById(values);
      setSubmitting(false); 
      resetForm();
    } catch (error) {
      console.log("Error:", error.message);
      setSubmitting(false); 
    }
  };
  

  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>
      <WhereAreYou title="My Account" curent="my account" />
      <div className='account'>
        <div className="container">
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={3}>
                <div className="left-si">
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Dashboard</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Bookings</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fifth">Account details</Nav.Link>
                    </Nav.Item>
                    {user.role === "admin" ? 
                    <Nav.Item>
                      <Nav.Link eventKey="sixth"> <Link to="/admin">Admin page</Link></Nav.Link>
                    </Nav.Item>

                    : ""}
                    <Nav.Item>
                      <Nav.Link eventKey="seventh" onClick={handleLogout}>Logout</Nav.Link>
                    </Nav.Item>

                  </Nav>
                </div>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <p>Hello {user.username} (not {user.username} ? <Link onClick={handleLogout}>Log out</Link>)</p>
                    <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <Swiper
                      slidesPerView={3}
                      spaceBetween={10}
                      breakpoints={{
                        300: { slidesPerView: 1, spaceBetween: 20 },
                        640: { slidesPerView: 2, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 40 },
                        1024: { slidesPerView: 2, spaceBetween: 40 },
                      }}
                      pagination={true} modules={[Pagination]} className="mySwiper">

                      {isLoading ? (
                        <p>loading...</p>
                      ) : (
                        data && data.booking.slice(0, 5).map((bookingItem, index) => ( // Slice to get first 5 items
                          <SwiperSlide key={bookingItem._id}>
                            <div className="booking">
                              <div className="boo">
                                <h6>{bookingItem.spaService.title}</h6>
                                <p><b>Price:</b> {bookingItem.spaService.price}$</p>
                                <p><b>Date:</b> {formatDate(bookingItem.date)}</p> {/* Format date */}
                                <p><b>Start time:</b>{bookingItem.startTime}</p>
                              </div>
                            </div>
                          </SwiperSlide>
                        ))
                      )}

                    </Swiper>
                  </Tab.Pane>
                  <Tab.Pane eventKey="fifth">
                    <Formik
                      initialValues={editedValues}
                      validationSchema={Yup.object({
                        username: Yup.string()
                          .max(15, 'Must be 15 characters or less')
                          .required('Required'),
                          password: Yup.string()
                          .min(5, 'Must be 5 characters or more')
                          .max(20, 'Must be 20 characters or less')
                          .required('Required')
                          .oneOf([Yup.ref('confirmPassword'), null], 'Passwords must match'),
                        confirmPassword: Yup.string()
                          .required('Required')
                          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                        
                      })}
                      onSubmit={handleSubmit}
                    >
                      {({ values, handleChange, handleBlur, isSubmitting }) => (
                        <Form>
                          <TextField
                            id="username"
                            label={user.username}
                            variant="outlined"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            disabled={!editing} // Disable while not editing
                          />
                          <div className="red"> <ErrorMessage name="username" /></div>

                          <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            disabled={!editing} // Disable while not editing
                          />
                          <div className="red"><ErrorMessage name="password" /></div>


                          <TextField
  id="confirmPassword"
  label="Confirm Password"
  variant="outlined"
  name="confirmPassword"
  type="password"
  onChange={handleChange}
  onBlur={handleBlur}
  value={values.confirmPassword}
  disabled={!editing}
/>
<div className="red"><ErrorMessage name="confirmPassword" /></div>



                          {editing ? (
                            
                            <button type="submit" disabled={isSubmitting}>Save</button>
                          ) : (
                            <button type="button" onClick={handleEditClick}>Edit</button>
                          )}
                        </Form>
                      )}
                    </Formik>
                  </Tab.Pane>
                  <Tab.Pane eventKey="sixth"></Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
      <Instagram />
    </>
  )
}

export default Account;
