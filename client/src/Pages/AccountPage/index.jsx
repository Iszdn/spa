import React, { useContext } from 'react'
import "./index.scss"
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Helmet } from 'react-helmet-async'
import "./index.scss"
import WhereAreYou from '../../components/WhereAreYou';
import Instagram from '../../components/HomeComponents/Instagram';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
const Account = () => {
  const {user} = useContext(UserContext)
  
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
              <Nav.Link eventKey="second">Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Downloads</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">Addresses</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fifth">Account details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link  eventKey="sixth">Logout</Nav.Link>
            </Nav.Item>
          </Nav> 
          </div>
         
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">

              <p>Hello  {user.username}(not {user.username} ? <Link>Log out</Link> )</p>
              <p>From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details.</p>
            </Tab.Pane>
            <Tab.Pane eventKey="second"></Tab.Pane>
            <Tab.Pane eventKey="third"></Tab.Pane>
            <Tab.Pane eventKey="fourth"></Tab.Pane>
            <Tab.Pane eventKey="fifth"></Tab.Pane>
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

export default Account