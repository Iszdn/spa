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

const SpaCategoryAdmin = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [editedSpaCategory, setEditedSpaCategory] = useState(null); 
  const [selectedFile, setSelectedFile] = useState(null);

  async function getData() {
    const res = await axios("http://localhost:5000/spaCategoryServices");
    setData(res.data);
    setLoading(false)
  }



  async function deleteSpa(id) {
    const res = await axios.delete(`http://localhost:5000/spaCategoryServices/${id}`);
    toast.success("deleted")
    getData();
  }

  async function editSpaCategory(id, values) {
    const res = await axios.put(`http://localhost:5000/spaCategoryServices/${id}`, values);
    getData()
    setShowModal(false);
  }

  const openEditModal = (spa) => { 
    setEditedSpaCategory(spa); 
    setShowModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>SpaCategoryAdmin</title>
      </Helmet>
      <>
        <div className="adminpage">
          <div className="userpage">
          <div className="addUser">
              <button  className='btn'><Link to="/admin/addSpaCategory">add spa category</Link></button>
            </div>
            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      {/* <th>id</th> */}
                      <th>image</th>
                      <th>title</th>
                      <th>description</th>
                      <th>settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? <span>loading...</span> :
                      (data && data.map(spa => (
                        <tr key={spa._id}>
                          {/* <td>{spa._id}</td> */}
                          <td><img src={spa.image} alt="" /></td>
                          <td>{spa.title}</td>
                          <td>{spa.description}</td>
                          
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
                initialValues={{ title: editedSpaCategory.title || '', description: editedSpaCategory.description || '' }}
                validationSchema={Yup.object({
                  title: Yup.string()
                    
                    .required('Required'),
                  description: Yup.string()
                    
                    .required('Required'),
                  image: Yup.mixed().notRequired(),
                 
                })}
                onSubmit={(values) => {
                  const formData = new FormData();
                  formData.append("title", values.title);
                  formData.append("description", values.description);
                  if (selectedFile) {
                    formData.append("image", selectedFile);
                  }

                  editSpaCategory(editedSpaCategory._id, formData);
                  toast.success("edited");
                }}
              >
                 {({ setFieldValue }) => (
                <Form>
                  <div className="inpp">
                    <Field name="title" type="text" placeholder="title" />
                    <div className="red"><ErrorMessage name="title" /></div>
                  </div>

                  <div className="inpp">
                    <Field name="description" type="text" placeholder="description" />
                    <div className="red"><ErrorMessage name="description" /></div>
                  </div>


                  <div className="inpp">
                      <input
                        type="file"
                        onChange={(event) => {
                          setSelectedFile(event.currentTarget.files[0]);
                          setFieldValue("image", event.currentTarget.files[0]);
                        }}
                      />
                      <div className="red">
                        <ErrorMessage name="image" />
                      </div>
                    </div>
                  


                    <div className="di">
 <button className="btn" type="submit">
                      Save
                    </button>
</div>
                </Form>
                   )}
              </Formik>
            </div>
          </div>

        )}
      </>
    </>
  )
}

export default SpaCategoryAdmin;
