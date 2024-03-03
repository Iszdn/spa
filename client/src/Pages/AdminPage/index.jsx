import React, { useContext } from 'react'
import "./index.scss"
import { Helmet } from 'react-helmet-async'
import NavAdmin from '../../components/AdminComponents/AdminLayout/NavbarAdmin/NAvigations'
import { UserContext } from '../../context/userContext'
import { Link } from 'react-router-dom'
import {Chart as ChartJS}  from "chart.js/auto"
import {Bar , Doughnut , Line}  from "react-chartjs-2"

import revenueData from "../../components/daata/revenueData.json";
const AdminPage = () => {
  const {user}=useContext(UserContext)
  return (
    <>
    <Helmet>
      <title>AdminPage</title>
    </Helmet>
    <div className="adminpage">
{/* <h3 className='center'>Welcome to admin page <Link to="/account">{user.username}</Link></h3> */}
<div className="container">
  
  <h4>Welcome to admin page <Link to="/account">  {user.username}</Link></h4>
  <div className="row">
  <div className="col-lg-8">
    <div className="chart1">
  <Bar 
  data={{
    labels:["Spa Categories"],
    datasets:[
      {
        label:"FACIAL TREATMENTS",
        data:[8]
      },
      {
        label:"MASSAGES",
        data:[9]
      },
      {
        label:"BODY TREATMENTS",
        data:[12]
      },
      {
        label:"TRADITIONAL",
        data:[4]
      },
      {
        label:"JALEH SPA ADD-ON SERVICES",
        data:[3]
      },
    ]
  }}
  />
</div>
  </div>
 

</div>
<div className="row">
<div className="col-lg-8">
  <div className="chart2">
  <Line
          data={{
            labels: revenueData.map((data) => data.label),
            datasets: [
              {
                label: "Reservations",
                data: revenueData.map((data) => data.revenue),
                backgroundColor: "#2271B1",
                borderColor: "#2271B1",
              },
              
            ],
          }}
          options={{
            elements: {
              line: {
                tension: 0.5,
              },
            },
            plugins: {
              title: {
                text: "Monthly Revenue & Cost",
              },
            },
          }}
        />
  </div>

  </div>
</div>
</div>

    </div>
    </>
    
  )
}

export default AdminPage