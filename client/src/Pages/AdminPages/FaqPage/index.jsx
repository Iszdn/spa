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

const FaqAdmin = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [editedFaq, setEditedFaq] = useState(null); 
  const [search, setSearch] = useState('')
  const [property, setProperty] = useState(null)

  async function getData() {
    const res = await axios("http://localhost:5000/faq");
    setData(res.data);
    setLoading(false)
  }

  

  async function deleteFaq(id) {
    const res = await axios.delete(`http://localhost:5000/faq/${id}`);
    toast.success("deleted")
    getData();
  }

  async function editFaq(id, values) {
    const res = await axios.put(`http://localhost:5000/faq/${id}`, values);
    getData()
    setShowModal(false);
  }

  const openEditModal = (Faq) => { 
    setEditedFaq(Faq); 
    setShowModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>FaqAdmin</title>
      </Helmet>
      <>
        <div className="adminpage">
          <div className="userpage">
          <div className="filterDD">
              <div className="addUser">
              <button className='btn'><Link to="/admin/addteam">add faq</Link></button>
            </div>
            <div className="filter">
    <input type="search" placeholder='Search by name...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <div onClick={()=>setProperty({name:"title",asc:true})} className="btn">a-z</div>
    <div onClick={()=>setProperty({name:"title",asc:false})} className="btn">z-a</div>
     <div onClick={()=>setProperty({name:"title",asc:null})} className="btn">default</div>
</div>
            </div>
            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      {/* <th>id</th> */}
                      <th>title</th>
                      <th>description</th>
                      
                      <th>settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? <span>loading...</span> :
                      (data && data
                        .filter(x=>x.title.toLowerCase().includes(search.toLowerCase()))
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
                        .map(Faq => (
                        <tr key={Faq._id}>
                          {/* <td>{Faq._id}</td> */}
                          <td>{Faq.title}</td>
                          <td>{Faq.description}</td>
                          

                          <td>
                            <button onClick={() => deleteFaq(Faq._id)} className='btn'><AiOutlineDelete /></button>
                            <button onClick={() => openEditModal(Faq)} className='btn'><CiEdit /></button>
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
                initialValues={{ title: editedFaq.title || '', description: editedFaq.description || ''  }}
                validationSchema={Yup.object({
                  title: Yup.string()
                    
                    .required('Required'),
                  description: Yup.string()
                    
                    .required('Required'),
                 
                })}
                onSubmit={(values) => {
                  editFaq(editedFaq._id, values);
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

export default FaqAdmin;
