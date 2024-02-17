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


const BlogAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editedBlog, setEditedBlog] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  async function getData() {
    const res = await axios("http://localhost:5000/blog");
    setData(res.data);
    setLoading(false);
  }

  async function deleteBlog(id) {
    const res = await axios.delete(`http://localhost:5000/blog/${id}`);
    toast.success("deleted");
    getData();
  }

  async function editBlog(id, values) {
    const res = await axios.put(`http://localhost:5000/blog/${id}`, values);
    getData();
    setShowModal(false);
  }

  const openEditModal = (spa) => {
    setEditedBlog(spa);
    setShowModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>BlogAdmin</title>
      </Helmet>
      <>
        <div className="adminpage">
          <div className="userpage">
            <div className="addUser">
              <button className='btn'><Link to="/admin/addBlog">add service</Link></button>
            </div>

            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>image</th>
                      <th>title</th>
                      <th>description</th>
                      <th>name</th>
                      <th>category</th>
                      <th>tag</th>
                      
                      <th>settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <span>loading...</span>
                    ) : (
                      data &&
                      data.map((spa) => (
                        <tr key={spa._id}>
                          <td>{spa._id}</td>
                          <td>{spa.image}</td>
                          <td>{spa.title}</td>
                          <td>{spa.description}</td>
                          <td>{spa.name}</td>
                          <td>{spa.blogCategory[0]?.blogCategoryName}</td>
                          <td>{spa.blogCategory[0]?.blogTagsName}</td>

                          <td>
                            <button
                              onClick={() => deleteBlog(spa._id)}
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
              {/* <Formik
                initialValues={{
                  title: editedBlog.title || "",
                  position: editedBlog.position || "",
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

                  editBlog(editedBlog._id, formData);
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

                    <button className="btn" type="submit">
                      Edit
                    </button>
                  </Form>
                )}
              </Formik> */}
            </div>
          </div>
        )}  
      </>
    </>
  );
};

export default BlogAdmin;
