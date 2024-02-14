import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WhereAreYou from '../../components/WhereAreYou';
import "./index.scss"
const CategoryPage = () => {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/spaCategoryServices/${categoryId}`);
        setCategoryData(res.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <div className='spa-detail'>
        {
            categoryData && <WhereAreYou title={categoryData.title} curent="Our Services"/>
        }
       
      {categoryData ? (
        <div className='spa-se'>
          
          <div className='container'>
            <div className="row">
               {categoryData.spaServices.map(service => (
              <div className='col-lg-6 col-md-6 col-12' key={service._id}>
                <div className="card-spa">
                <h5>{service.title}</h5>
                <p className='des'>{service.description}</p>
                <p>Duration: {service.duration} minutes</p>
                <p>Price: ${service.price}</p>
                </div>
              </div>
            ))}  
            </div>
           
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CategoryPage;
