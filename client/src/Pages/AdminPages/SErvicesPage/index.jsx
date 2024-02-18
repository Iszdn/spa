import React, { useEffect, useState } from 'react'
import "./index.scss"
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const ServiceAdmin = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [editedSpa, setEditedSpa] = useState(null); 
  const [categories, setCategories] = useState([]); 

  async function getData() {
    const res = await axios("http://localhost:5000/spa-services");
    setData(res.data);
    setLoading(false)
  }

  async function getCateg() {
    const res = await axios("http://localhost:5000/spaCategoryServices");
    setCategories(res.data);
   
  }

  async function deleteSpa(id) {
    const res = await axios.delete(`http://localhost:5000/spa-services/${id}`);
    toast.success("deleted")
    getData();
  }

  async function editSpa(id, values) {
    const res = await axios.put(`http://localhost:5000/spa-services/${id}`, values);
    getData()
    setShowModal(false);
  }

  const openEditModal = (spa) => { 
    setEditedSpa(spa); 
    setShowModal(true);
  };

  useEffect(() => {
    getData();
    getCateg()
  }, []);

  return (
    <>
      <Helmet>
        <title>ServiceAdmin</title>
      </Helmet>
      <>
        <div className="adminpage">
          <div className="userpage">
          <div className="addUser">
              <button  className='btn'><Link to="/admin/addserv">add service</Link></button>
            </div>
            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      {/* <th>id</th> */}
                      <th>title</th>
                      <th>cattegory</th>
                      <th>descriptionription</th>
                      
                      <th>duration</th>
                      <th>price</th>
                      
                      <th>settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? <span>loading...</span> :
                      (data && data.map(spa => (
                        <tr key={spa._id}>
                          {/* <td>{spa._id}</td> */}
                          <td>{spa.title}</td>
                          <td>{spa.spaCategory[0]?.title}</td>
                          <td>{spa.description}</td>
                          <td>{spa.duration}min</td>
                          <td>{spa.price}$</td>
                          

                          <td>
                            <button onClick={() => deleteSpa(spa._id)} className='btn'><AiOutlineDelete /></button>
                            <button onClick={() => openEditModal(spa)} className='btn'><CiEdit /></button>
                          </td>
                        </tr>
                      )))
                    }
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        </div>

        {showModal && (
          
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <h2>Edit</h2>
              <Formik
                initialValues={{ title: editedSpa.title || '', description: editedSpa.description || '', duration: editedSpa.duration || '', price: editedSpa.price || '',spaCategory: editedSpa.spaCategory[0]._id || ''  }}
                validationSchema={Yup.object({
                  title: Yup.string()
                    
                    .required('Required'),
                  description: Yup.string()
                    
                    .required('Required'),
                  duration: Yup.number().required('Required'),
                  price: Yup.number().required('Required'),
                  spaCategory: Yup.string().notRequired('Required')
                })}
                onSubmit={(values) => {
                  editSpa(editedSpa._id, values);
                  toast.success("edited")

                }}
              >
                <Form>
                  <div className="inpp">
                    <Field name="title" type="text" placeholder="title" />
                    <div className="red"><ErrorMessage name="title" /></div>
                  </div>

                  <div className="inpp">
                    <Field name="description" type="text" placeholder="description" />
                    <div className="red"><ErrorMessage name="description" /></div>
                  </div>


                  <div className="inpp"><Field name="duration" type="number" placeholder="duration" />
                    <div className="red"> <ErrorMessage name="duration" /></div></div>

                  <div className="inpp">
                    <Field name="price" type="price" placeholder="price" />
                    <div className="red"><ErrorMessage name="price" /></div>
                  </div>

                  <div className="inpp">
                    <Field name="spaCategory" as="select">
                      
                      {categories.map(spaCategory => (
                        <option key={spaCategory._id} value={spaCategory._id}>{spaCategory.title}</option>
                      ))}
                    </Field>
                    <div className="red"><ErrorMessage name="spaCategory" /></div>
                  </div>

                  <div className="di">
 <button className="btn" type="submit">
                      Save
                    </button>
</div>
                </Form>
              </Formik>
            </div>
          </div>

        )}
      </>
    </>
  )
}

export default ServiceAdmin;
