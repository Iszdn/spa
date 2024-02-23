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

const ContactAdmin = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [editedContact, setEditedContact] = useState(null); 
  const [search, setSearch] = useState('')
  const [property, setProperty] = useState(null)

  async function getData() {
    const res = await axios("http://localhost:5000/contact");
    setData(res.data);
    setLoading(false)
  }

  

  async function deleteContact(id) {
    const res = await axios.delete(`http://localhost:5000/contact/${id}`);
    toast.success("deleted")
    getData();
  }

  async function editContact(id, values) {
    const res = await axios.put(`http://localhost:5000/contact/${id}`, values);
    toast.success("Successfully edited!");
    setShowModal(false);
    getData();
  }

  const openEditModal = (Contact) => { 
    setEditedContact(Contact); 
    setShowModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>ContactAdmin</title>
      </Helmet>
      <>
        <div className="adminpage">
          <div className="userpage">
          <div className="filterDD">
              <div className="addUser">
              <button className='btn'><Link to="/admin/addContact">add Contact</Link></button>
            </div>
            <div className="filter">
    <input type="search" placeholder='Search by name...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <div onClick={()=>setProperty({name:"location",asc:true})} className="btn">a-z</div>
    <div onClick={()=>setProperty({name:"location",asc:false})} className="btn">z-a</div>
     <div onClick={()=>setProperty({name:"location",asc:null})} className="btn">default</div>
</div>
            </div>
            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      {/* <th>id</th> */}
                      <th>location</th>
                      <th>number</th>
                      <th>email</th>
                      
                      <th>settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? <span>loading...</span> :
                      (data && data
                        .filter(x=>x.location.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>{
        if (property && property.asc===true) {
            return a[property.name]<b[property.name] ? -1 : (a[property.name]<b[property.name] ? 1 : 0)
        }
        else if (property && property.asc===false) {
            return a[property.name]>b[property.name] ? -1 : (a[property.name]>b[property.name] ? 1 : 0)
        }
        else{
            return 0;
        }
    })
                        .map(Contact => (
                        <tr key={Contact._id}>
                          {/* <td>{Contact._id}</td> */}
                          <td>{Contact.location}</td>
                          <td>{Contact.number}</td>
                          <td>{Contact.email}</td>
                          

                          <td>
                            <button onClick={() => deleteContact(Contact._id)} className='btn'><AiOutlineDelete /></button>
                            <button onClick={() => openEditModal(Contact)} className='btn'><CiEdit /></button>
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
          <>
          <div className="modal" onClick={() => setShowModal(false)}>
            </div>
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <h2>Edit</h2>
              <Formik
                initialValues={{ location: editedContact.location || '', number: editedContact.number || '',email: editedContact.email || ''  }}
                validationSchema={Yup.object({
                  location: Yup.string()
                    
                    .required('Required'),
                  number: Yup.string()
                    
                    .required('Required'),
                    email: Yup.string().email("invalid email")
                    
                    .required('Required'),
                 
                })}
                onSubmit={(values) => {
                  editContact(editedContact._id, values);
                  // toast.success("edited")

                }}
              >
                <Form>


                  <div className="inpp">
                    <Field name="location" type="text" placeholder="location" />
                    <div className="red"><ErrorMessage name="location" /></div>
                  </div>

                  <div className="inpp">
                    <Field name="number" type="text" placeholder="number" />
                    <div className="red"><ErrorMessage name="number" /></div>
                  </div>

                  <div className="inpp">
                    <Field name="email" type="email" placeholder="email" />
                    <div className="red"><ErrorMessage name="email" /></div>
                  </div>

                  <div className="di">
 <button className="btn" type="submit">
                      Save
                    </button>
</div>
                </Form>
              </Formik>
            </div>
            </>
        )}
      </>
    </>
  )
}

export default ContactAdmin;
