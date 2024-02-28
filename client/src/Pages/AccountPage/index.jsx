import React, { useContext, useEffect, useState } from 'react';
import "./index.scss";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Helmet } from 'react-helmet-async';
import "./index.scss";
import WhereAreYou from '../../components/WhereAreYou';
import Instagram from '../../components/HomeComponents/Instagram';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import Cookies from "js-cookie"
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const Account = () => {
  const { user, setToken, setUser } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
                    <p>Username: {user.username}</p>
                    <p>Role: {user.role}</p>
                    <p>Email: {user.email}</p>
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
