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
  const [blogCategories, setBlogCategories] = useState([]);
  const [blogTag, setBlogTag] = useState([]);

  const [search, setSearch] = useState("");
  const [property, setProperty] = useState(null);

  async function getData() {
    const res = await axios("http://localhost:5000/blog");
    setData(res.data);
    setLoading(false);
  }

  async function getCategory() {
    const res = await axios("http://localhost:5000/blogCategory");
    setBlogCategories(res.data);
    setLoading(false);
  }
  async function getTag() {
    const res = await axios("http://localhost:5000/blogTag");
    setBlogTag(res.data);
    setLoading(false);
  }
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
    toast.success("Successfully edited!");
    setShowModal(false);
    getData();
    
  }

  const openEditModal = (spa) => {
    setEditedBlog(spa);
    setShowModal(true);
  };

  useEffect(() => {
    getData();
    getCategory();
    getTag();
  }, []);

  return (
    <>
      <Helmet>
        <title>BlogAdmin</title>
      </Helmet>
      <>
        <div className="adminpage">
          <div className="userpage">
            <div className="filterDD">
              <div className="addUser">
                <button className="btn">
                  <Link to="/admin/addblog">add blog</Link>
                </button>
              </div>
              <div className="filter">
                <input
                  type="search"
                  placeholder="Search by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div
                  onClick={() => setProperty({ name: "title", asc: true })}
                  className="btn"
                >
                  a-z
                </div>
                <div
                  onClick={() => setProperty({ name: "title", asc: false })}
                  className="btn"
                >
                  z-a
                </div>
                <div
                  onClick={() => setProperty({ name: "title", asc: null })}
                  className="btn"
                >
                  default
                </div>
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
                      data
                        .filter((x) =>
                          x.title.toLowerCase().includes(search.toLowerCase())
                        )
                        .sort((a, b) => {
                          if (property && property.asc === true) {
                            return a[property.name] < b[property.name]
                              ? -1
                              : a[property.name] < b[property.name]
                              ? 1
                              : 0;
                          } else if (property && property.asc === false) {
                            return a[property.name] > b[property.name]
                              ? -1
                              : a[property.name] > b[property.name]
                              ? 1
                              : 0;
                          } else {
                            return 0;
                          }
                        })
                        .map((spa) => (
                          <tr key={spa._id}>
                            {/* <td>{spa._id}</td> */}
                            <td>
                              <img src={spa.image} alt="" />
                            </td>
                            <td>{spa.title}</td>
                            <td>{spa.description}</td>
                            <td>{spa.name}</td>
                            <td>{spa.blogCategory[0]?.blogCategoryName}</td>
                            <td>{spa.tag[0]?.blogTagsName}</td>

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
              <Formik
                initialValues={{
                  title: editedBlog.title || "",
                  description: editedBlog.description || "",
                  name: editedBlog.name || "",
                  blogCategory: editedBlog.blogCategory[0] || "",
                  tag: editedBlog.tag[0] || "",
                }}
                validationSchema={Yup.object({
                  title: Yup.string().required("Required"),
                  description: Yup.string().required("Required"),
                  name: Yup.string().required("Required"),
                  blogCategory: Yup.string(),
                  tag: Yup.string(),
                  image: Yup.mixed().notRequired(),
                })}
                onSubmit={(values) => {
                  const formData = new FormData();
                  formData.append("title", values.title);
                  formData.append("description", values.description);
                  formData.append("name", values.name);
                  formData.append("blogCategory", values.blogCategory);
                  formData.append("tag", values.tag);
                  if (selectedFile) {
                    formData.append("image", selectedFile);
                  }

                  editBlog(editedBlog._id, formData);
                  // toast.success("edited");
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
                      <Field
                        name="description"
                        type="text"
                        placeholder="description"
                      />
                      <div className="red">
                        <ErrorMessage name="description" />
                      </div>
                    </div>

                    <div className="inpp">
                      <Field name="name" type="text" placeholder="name" />
                      <div className="red">
                        <ErrorMessage name="name" />
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

                    <div className="inpp">
                      <Field name="blogCategory" as="select">
                        {blogCategories.map((blogCategory) => (
                          <option
                            key={blogCategory._id}
                            value={blogCategory._id}
                          >
                            {blogCategory.blogCategoryName}
                          </option>
                        ))}
                      </Field>
                      <div className="red">
                        <ErrorMessage name="blogCategory" />
                      </div>
                    </div>

                    <div className="inpp">
                      <Field name="tag" as="select">
                        {blogTag.map((blogTag) => (
                          <option key={blogTag._id} value={blogTag._id}>
                            {blogTag.blogTagsName}
                          </option>
                        ))}
                      </Field>
                      <div className="red">
                        <ErrorMessage name="tag" />
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

export default BlogAdmin;
