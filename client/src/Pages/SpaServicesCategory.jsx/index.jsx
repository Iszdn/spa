import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import WhereAreYou from '../../components/WhereAreYou';
import "./index.scss"
import { Formik, Field, Form, ErrorMessage } from 'formik';
 import * as Yup from 'yup';
import toast from 'react-hot-toast';
const CategoryPage = () => {
  const { categoryId } = useParams();
  const [categoryData, setCategoryData] = useState(null);
const [open, setOpen] = useState(false)
const [spaReview, setSpaReview] = useState([]);
  const [loading, setLoading] = useState(true)

 


  async function getSpaReview() {
    try {
      const res = await axios.get("http://localhost:5000/review");
      setSpaReview(res.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching spa categories:', error);
    }
  }

  



function handleOpen() {
  setOpen(!open)
}

async function AddReview(values) {
  const res=await axios.post("http://localhost:5000/review",values)
  
  toast.success("Successfully added!")
  getSpaReview()

}

useEffect(() => {
    getSpaReview();
  }, []);


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
           <div className="reviews">


  <div className="container">
    <div className="addreview">
  <h3>Add a review</h3>
  <p>Your email address will not be published. Required fields are marked <span className="red">*</span></p>

  <Formik
       initialValues={{ name: '', email: '' , review: ''}}
       validationSchema={Yup.object({
         name: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('Required'),
         review: Yup.string()
           .required('Required'),
         email: Yup.string().email('Invalid email address').required('Required'),
       })}
       onSubmit={(values, { resetForm }) => {
        AddReview(values)
        resetForm()
        
       }}
     >
       <Form className='form-review'>
        
         <label htmlFor="name">Name<span className="red">*</span></label>
         <Field name="name" type="text" />
         <div className="red"><ErrorMessage name="name" /></div>
 
        
 
         <label htmlFor="email">Email<span className="red">*</span></label>
         <Field name="email" type="email" />
<div className="red"><ErrorMessage name="email" /></div>

  <label htmlFor="review">Review<span className="red">*</span></label>
         <Field name="review"  as="textarea"/>
        <div className="red"> <ErrorMessage name="review" /></div>

         <button type="submit">Submit</button>
       </Form>
     </Formik>
</div>
    <h3 onClick={()=>handleOpen()}>Reviews</h3>
    {
open && <div className="reviewww">
  {
    loading ? <span className='loader'></span> : (

      spaReview && spaReview.map(x => {
        const createdAtParts = x.createdAt.split('T'); // Rozdělení data a času pomocí 'T' jako oddělovače
        const datePart = createdAtParts[0]; // Část obsahující datum
        const timePart = createdAtParts[1].split('.')[0]; // Část obsahující čas, odstranění milisekund
      
        return (
          <div className="review" key={x._id}>
            <div className="img">
              <img src="https://secure.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=60&d=mm&r=g" alt="" />
              <div className="comment">
                <p><strong>{x.name}</strong> - {datePart} {timePart}</p>
                <div className='desc'><p>{x.review}</p></div>
              </div>
            </div>
          </div>
        )
      })
    )
  } 


</div>
    }

</div>
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
