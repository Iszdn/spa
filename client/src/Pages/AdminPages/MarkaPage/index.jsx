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

const MarkaAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [editedMarkaId, setEditedMarkaId] = useState(null); // State to hold the ID of the Marka item being edited

  async function getData() {
    const res = await axios("http://localhost:5000/marka");
    setData(res.data);
    setLoading(false);
  }

  async function deleteMarka(id) {
    const res = await axios.delete(`http://localhost:5000/marka/${id}`);
    toast.success("deleted");
    getData();
  }

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleImageUpload = async () => {
    console.log("Image:", image);
    console.log("Edited Marka ID:", editedMarkaId);
    
    try {
      if (!image || !editedMarkaId) {
        console.error("No image selected or no Marka id provided!");
        return;
      }
      const formData = new FormData();
      formData.append("image", image);

      const response = await axios.put(
        `http://localhost:5000/marka/${editedMarkaId}`, // Use editedMarkaId here
        formData
      );
      setImage(null);
      setShowModal(false)
      getData()
    

    } catch (error) {
      console.log(error);
    }
  };

  const openEditModal = (spa) => {
    setEditedMarkaId(spa._id); // Set the id of the edited Marka item
    setShowModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>MarkaAdmin</title>
      </Helmet>
      <>
        <div className="adminpage">
          <div className="userpage">
            <div className="addUser">
              <button className="btn">
                <Link to="/admin/addMarka">add Marka</Link>
              </button>
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
                              onClick={() => deleteMarka(spa._id)}
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

export default MarkaAdmin;
