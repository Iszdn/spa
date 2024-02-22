import React, { useEffect, useState } from "react";
import "./index.scss";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const TeamAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editedTeam, setEditedTeam] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [search, setSearch] = useState('')
  const [property, setProperty] = useState(null)
  async function getData() {
    const res = await axios("http://localhost:5000/team");
    setData(res.data);
    setLoading(false);
  }

  async function deleteTeam(id) {
    const res = await axios.delete(`http://localhost:5000/team/${id}`);
    toast.success("deleted");
    getData();
  }

  async function editTeam(id, values) {
    const res = await axios.put(`http://localhost:5000/team/${id}`, values);
    toast.success('Successfully edited!');
    getData();

    setShowModal(false);
  }

  const openEditModal = (spa) => {
    setEditedTeam(spa);
    setShowModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>TeamAdmin</title>
      </Helmet>
      <>
        <div className="adminpage">
          <div className="userpage">
            <div className="filterDD">
              <div className="addUser">
              <button className='btn'><Link to="/admin/addteam">add team</Link></button>
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
                      <th>image</th>
                      <th>title</th>
                      <th>position</th>

                      <th>settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <span>loading...</span>
                    ) : (
                      data &&
                      data
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
                      .map((spa) => (
                        <tr key={spa._id}>
                          {/* <td>{spa._id}</td> */}
                          <td><img src={spa.image} alt="" /></td>
                          <td>{spa.title}</td>
                          <td>{spa.position}</td>

                          <td>
                            <button
                              onClick={() => deleteTeam(spa._id)}
                              className="btn"
                            >
                              <AiOutlineDelete />
                            </button>
                            <button
                              onClick={() => openEditModal(spa)}
                              className="btn"
                            >
                              <CiEdit />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <h2>Edit</h2>
              <Formik
                initialValues={{
                  title: editedTeam.title || "",
                  position: editedTeam.position || "",
                }}
                validationSchema={Yup.object({
                  title: Yup.string().required("Required"),
                  position: Yup.string().required("Required"),
                  image: Yup.mixed().notRequired(), // Image not required
                })}
                onSubmit={(values) => {
                  const formData = new FormData();
                  formData.append("title", values.title);
                  formData.append("position", values.position);
                  if (selectedFile) {
                    formData.append("image", selectedFile);
                  }

                  editTeam(editedTeam._id, formData);
                  toast.success("edited");
                }}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <div className="inpp">
                      <Field name="title" type="text" placeholder="title" />
                      <div className="red">
                        <ErrorMessage name="title" />
                      </div>
                    </div>

                    <div className="inpp">
                      <Field name="position" type="text" placeholder="position" />
                      <div className="red">
                        <ErrorMessage name="position" />
                      </div>
                    </div>
                    

                    <div className="inpp">
                      <label className="custom-file-upload">
                      <input
                        type="file"
                        onChange={(event) => {
                          setSelectedFile(event.currentTarget.files[0]);
                          setFieldValue("image", event.currentTarget.files[0]);
                        }}
                      />
                      </label>
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
  );
};

export default TeamAdmin;
