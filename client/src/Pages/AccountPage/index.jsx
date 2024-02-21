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



const Account = () => {
  const { user,setToken,setUser } = useContext(UserContext);
  const [data, setData] = useState(null)
  const [IsLoading, setIsLoading] = useState(true)

 console.log("userbooooki",user.booking);


 console.log("user",user);


 async function GetuserById() {
  try {
    const res=await axios.get(`http://localhost:5000/users/${user.userId}`)
setData(res.data)
setIsLoading(false)
  } catch (error) {
    console.log(error.message);
  }
 }
 useEffect(() => {
    GetuserById()
 }, [])
 
 function handleLogout() {
  Cookies.remove('token')
  setUser(null)
  setToken(null)
  toast.success("Logout")
 }
  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>
      <WhereAreYou title="My Account" curent="my account"/>
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
                      <Nav.Link eventKey="second">Books</Nav.Link>
                    </Nav.Item>
                    
                    <Nav.Item>
                      <Nav.Link eventKey="fifth">Account details</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link  eventKey="sixth" onClick={handleLogout}>Logout</Nav.Link>
                    </Nav.Item>
                  </Nav> 
                </div>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <p>Hello {user.username} (not {user.username} ? <Link>Log out</Link>)</p>
                    <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
  <ul>
    {IsLoading ? (
      <p>loading...</p>
    ) : (
      data && data.booking && data.booking.map((bookingItem, index) => (
        <ul key={bookingItem._id}>
        <li key={index}>Spa-Service:{bookingItem.spaService.title}</li>
        <li key={index}>Price:{bookingItem.spaService.price}$</li>
        <li key={index}>Date:{bookingItem.date}</li>
        <li key={index}>Start time:{bookingItem.startTime}</li>

        </ul>
      ))
    )}
  </ul>
</Tab.Pane>

                  <Tab.Pane eventKey="fifth">
                    <p>{user.username}</p> 
                    <p>{user.role}</p> 
                    <p>{user.email}</p> 
                  
                  </Tab.Pane>
                  <Tab.Pane eventKey="sixth"></Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
      <Instagram/>
    </>
  )
}

export default Account;
