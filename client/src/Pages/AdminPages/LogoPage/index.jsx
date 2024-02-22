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

const LogoAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [editedLogoId, setEditedLogoId] = useState(null); // State to hold the ID of the Logo item being edited

  async function getData() {
    const res = await axios("http://localhost:5000/logo");
    setData(res.data);
    setLoading(false);
  }

  async function deleteLogo(id) {
    const res = await axios.delete(`http://localhost:5000/logo/${id}`);
    toast.success("deleted");
    getData();
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleImageUpload = async () => {
    console.log("Image:", image);
    console.log("Edited Logo ID:", editedLogoId);
    
    try {
      if (!image || !editedLogoId) {
        console.error("No image selected or no Logo id provided!");
        return;
      }
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.put(
        `http://localhost:5000/logo/${editedLogoId}`, // Use editedLogoId here
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
    setEditedLogoId(spa._id); // Set the id of the edited Logo item
    setShowModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>LogoAdmin</title>
      </Helmet>
      <>
        <div className="adminpage">
          <div className="userpage">
            

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
                              onClick={() => deleteLogo(spa._id)}
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

export default LogoAdmin;
