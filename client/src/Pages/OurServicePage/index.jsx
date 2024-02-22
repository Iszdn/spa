import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import WhereAreYou from '../../components/WhereAreYou';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReservationForm from '../../components/ReservationForm';
import "./index.scss"
const OurServicePage = () => {
  const [spaCategory, setSpaCategory] = useState([]);
  const [loading, setLoading] = useState(true)

  async function getSpaCategory() {
    try {
      const res = await axios.get("http://localhost:5000/spaCategoryServices");
      setSpaCategory(res.data);
      setLoading(false)
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
              {
               loading ? <span className="loader"></span> :
        
               (
              spaCategory && spaCategory.map(category => (
                <div key={category._id} className="col-lg-4 col-md-12 col-12 ser">
                  <h6><Link to={`/services/${category._id}`}>{category.title}</Link></h6>
                  <p>{category.description}</p>
                </div>
              )))}
            </div>
          </div>
          <div className="container reserv">
<div className="reservationform row">
          <div data-aos="fade-up" data-aos-duration="1200" className="col-lg-6 col-md-12 col-12">
            <ReservationForm/>
          </div>
          <div data-aos="fade-down" data-aos-duration="1200" className="col-lg-6 col-md-12 col-12">
            <img className='imgreserv' src="https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
        </div>
</div>


        </section>

        
      </div>
    </>
  );
};

export default OurServicePage;
