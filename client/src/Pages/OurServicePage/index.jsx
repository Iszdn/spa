import React, { useEffect, useState } from 'react'
import "./index.scss"
import { Helmet } from 'react-helmet-async'
import WhereAreYou from '../../components/WhereAreYou'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReservationForm from '../../components/ReservationForm'
const OurServicePage = () => {
  const [spaCategory, setSpaCategory] = useState([])
  async function getSpaCategory() {
    const res=await axios("http://localhost:5000/spaCategoryServices")
    setSpaCategory(res.data)
  
  }
  useEffect(() => {
    getSpaCategory()
  }, [])
  return (
    <>
    <Helmet>
      <title>OurServicePage</title>
    </Helmet>
    <>
    <div id="services">
    <WhereAreYou title="Our Services" curent="Our Services"/>
    
    <section id='discover'>
      <div className="container">
       
            
      <div className=" row">
        {
           spaCategory && spaCategory.map(x=>
            <div className="col-lg-4 col-md-12 col-12 ser">
            <h6>{x.title}</h6>
            <p>{x.description}</p>
          </div>
          
           )

        }
     
        </div>
        <div className="reservationform row">
<div className="col-lg-6">
  <ReservationForm/>
</div>
        </div>
      </div>

    </section>
    </div>
    
    </>
    </>
    
  )
}

export default OurServicePage