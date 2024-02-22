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
  const [image, setImage] = useState(null);
  const [editedGalleryId, setEditedGalleryId] = useState(null); // State to hold the ID of the gallery item being edited

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

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleImageUpload = async () => {
    console.log("Image:", image);
    console.log("Edited Gallery ID:", editedGalleryId);
    
    try {
      if (!image || !editedGalleryId) {
        console.error("No image selected or no gallery id provided!");
        return;
      }
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.put(
        `http://localhost:5000/gallery/${editedGalleryId}`, // Use editedGalleryId here
        formData
      );
      toast.success('Successfully edited!');
      setImage(null);
      setShowModal(false)
      getData()
    

    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (spa) => {
    setEditedGalleryId(spa._id); // Set the id of the edited gallery item
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
          <div className="filterDD">
              <div className="addUser">
              <button className='btn'><Link to="/admin/addGallery">add gallery</Link></button>
            </div>
           
            </div>

            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
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
                          <td>
                            <img src={spa.image} alt="" />
                          </td>

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
              <input type="file" onChange={handleImageChange} />
              <div className="di">
                <button className="btn" onClick={handleImageUpload}>
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
};

export default GalleryAdmin;
