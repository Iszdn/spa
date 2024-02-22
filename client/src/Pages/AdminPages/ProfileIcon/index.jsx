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

const ProfileIconAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editedProfileIcon, setEditedProfileIcon] = useState(null);

  async function getData() {
    const res = await axios("http://localhost:5000/profileicon");
    setData(res.data);
    setLoading(false);
  }

  async function deleteProfileIcon(id) {
    const res = await axios.delete(`http://localhost:5000/profileicon/${id}`);
    toast.success("deleted");
    getData();
  }

  async function editProfileIcon(id, values) {
    const res = await axios.put(
      `http://localhost:5000/profileicon/${id}`,
      values
    );
    toast.success('Successfully edited!');
    getData();
    setShowModal(false);
  }

  const openEditModal = (ProfileIcon) => {
    setEditedProfileIcon(ProfileIcon);
    setShowModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>ProfileIconAdmin</title>
      </Helmet>
      <>
        <div className="adminpage">
          <div className="userpage">
            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      {/* <th>id</th> */}
                      <th>icon</th>

                      <th>settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <span>loading...</span>
                    ) : (
                      data &&
                      data.map((ProfileIcon) => (
                        <tr key={ProfileIcon._id}>
                          {/* <td>{ProfileIcon._id}</td> */}
                          <td>
                            <i className={ProfileIcon.image}></i>
                          </td>

                          <td>
                            <button
                              onClick={() => deleteProfileIcon(ProfileIcon._id)}
                              className="btn"
                            >
                              <AiOutlineDelete />
                            </button>
                            <button
                              onClick={() => openEditModal(ProfileIcon)}
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
          <>
            <div className="modal"onClick={() => setShowModal(false)}></div>
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <h2>Edit</h2>
              <Formik
                initialValues={{
                  title: editedProfileIcon.title || "",
                  description: editedProfileIcon.description || "",
                }}
                validationSchema={Yup.object({
                  title: Yup.string().required("Required"),
                  description: Yup.string().required("Required"),
                })}
                onSubmit={(values) => {
                  editProfileIcon(editedProfileIcon._id, values);
                  toast.success("edited");
                }}
              >
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
  );
};

export default ProfileIconAdmin;
