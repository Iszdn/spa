import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import WhereAreYou from '../../components/WhereAreYou';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReservationForm from '../../components/ReservationForm';
import "./index.scss"
const OurServicePage = () => {
  const [spaCategory, setSpaCategory] = useState([]);

  async function getSpaCategory() {
    try {
      const res = await axios.get("http://localhost:5000/spaCategoryServices");
      setSpaCategory(res.data);
    } catch (error) {
      console.error('Error fetching spa categories:', error);
    }
  }

  useEffect(() => {
    getSpaCategory();
  }, []);

  return (
    <>
      <Helmet>
        <title>OurServicePage</title>
      </Helmet>
      <div id="services">
        <WhereAreYou title="Our Services" curent="Our Services"/>
        
        <section id='discover'>
          <div className="container">
            <div className="row">
              {spaCategory && spaCategory.map(category => (
                <div key={category._id} className="col-lg-4 col-md-12 col-12 ser">
                  <h6><Link to={`/services/${category._id}`}>{category.title}</Link></h6>
                  <p>{category.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="container reserv">
<div className="reservationform row">
          <div className="col-lg-6">
            <ReservationForm/>
          </div>
        </div>
</div>
        </section>

        
      </div>
    </>
  );
};

export default OurServicePage;
