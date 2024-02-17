import React, { useEffect, useState } from 'react';
import "./index.scss";
import { Helmet } from 'react-helmet-async';
import WhereAreYou from '../../components/WhereAreYou';
import axios from 'axios';

const FaqPage = () => {
  
  const [openIndex, setOpenIndex] = useState(null); // Состояние для отслеживания открытого элемента
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  async function getData() {
    const res=await axios("http://localhost:5000/faq")
    setData(res.data)
    setLoading(false)
  }
  useEffect(() => {
    getData()
  }, [])
  const handleAccordionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Открыть или закрыть элемент аккордеона при клике
  };

  return (
    <>
      <Helmet>
        <title>Faq</title>
      </Helmet> 
      <WhereAreYou title="Faq" curent="faq"/>
      <div className='faq'>
        <div className="search">
          {/* <div data-aos="fade-down" data-aos-duration="1200" className="title">
            <span>GET YOUR ANSWER</span>
            <h3>Common Queries</h3>
          </div> */}
          <div className="container">
            {/* <div className="search-inp">
              <form>
                <input type="text" placeholder='Enter Keyword' />
                <button type='submit'>Search</button>
              </form>
            </div>  */}
            
            <div className="title">
                <span>OUR EXPERTS ANSWER</span>
                <h3>Faq For Cosmetic Products</h3>
              </div>
            <div className=" faaq">
                     <div className="faqs ">
             
              {
              loading ? <span className="loader"></span> :
        
              (
              data && data.map((faq, index) => (
                <div key={index} className="accordion">
                  <div className="tittle" onClick={() => handleAccordionClick(index)}>
                   <h6>{faq.title}</h6> 
                  </div>
                  <div className={`content ${openIndex === index ? 'open' : ''}`}>
                   <p>{faq.description}</p> 
                  </div>
                </div>
              ))
            )}
            </div>
            <div className="imageee">
              <div className="image">
                <img src="https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/faq-1.jpg" alt="" />
              </div>
            </div>
            </div>
     
          </div>
        </div>
      </div>
    </>
  );
};

export default FaqPage;
