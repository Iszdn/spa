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

const GalleryAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null)

  async function getData() {
    const res = await axios("http://localhost:5000/gallery");
    setData(res.data);
    setLoading(false);
  }

  async function deleteGallery(id) {
    const res = await axios.delete(`http://localhost:5000/gallery/${id}`);
    toast.success("deleted");
    getData();
  }

  async function editGallery(id, values) {
    const res = await axios.put(`http://localhost:5000/gallery/${id}`, values);
    getData();
    setShowModal(false);
  }

  const openEditModal = (spa) => {
    // setEditedGallery(spa);
    setShowModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>GalleryAdmin</title>
      </Helmet>
      <>
        <div className="adminpage">
          <div className="userpage">
            <div className="addUser">
              <button className='btn'><Link to="/admin/addGallery">add gallery</Link></button>
            </div>

            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      {/* <th>id</th> */}
                      <th>image</th>
                     

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
                          {/* <td>{spa._id}</td> */}
                          <td><img src={spa.image} alt="" /></td>

                          <td>
                            <button
                              onClick={() => deleteGallery(spa._id)}
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
    image: editedGallery?.image || null, 
  }}
  validationSchema={Yup.object({
    image: Yup.mixed().notRequired(), 
  })}
  onSubmit={async (values) => {
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("image", selectedFile);
      }
      await editGallery(editedGallery._id, formData);
      toast.success("Edited");
    } catch (error) {
      console.error("Error editing gallery:", error);
      toast.error("Failed to edit gallery");
    }
  }}
>
  {({ setFieldValue }) => (
    <Form>
      <div className="inpp">
        {values.image && typeof values.image === "string" ? (
          <img src={values.image} alt="gallery" />
        ) : null}
        <input
          type="file"
          onChange={(event) => {
            setSelectedFile(event.currentTarget.files[0]);
            setFieldValue("image", URL.createObjectURL(event.currentTarget.files[0]));
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
</Formik> */}

<input type="file" />
    </div>
  </div>
)}

      </>
    </>
  );
};

export default GalleryAdmin;
