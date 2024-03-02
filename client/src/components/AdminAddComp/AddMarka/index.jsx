

import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";

import axios from "axios";
import toast from "react-hot-toast";

const AddMarka = () => {
  async function addMarka(values) {
    try {
      const formData = new FormData();
      formData.append("image", values.image);

      const res = await axios.post("http://localhost:5000/marka", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle response if needed
      console.log(res.data);
      toast.success("Successfully added!");
    } catch (error) {
      console.error("Error adding Spa Category:", error);
      toast.error("Failed to add Spa Category");
    }
  }

  return (
    <div className="adminpage">
       <div className="text-center margi">
        <h2>Add Marka</h2>
      </div>
      <div className="formadd">
        <Formik
          initialValues={{
            image: null, // Initialize image as null
          }}
          
          validationSchema={Yup.object({
            image: Yup.mixed().required("Required"),
          })}

          onSubmit={(values, { resetForm }) => {
            addMarka(values);
            resetForm();
          }}
        >
          <Form>
            <SpaCategoryFormFields />
            <button className="btn" type="submit">
              add
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

const SpaCategoryFormFields = () => {
  const { setFieldValue } = useFormikContext();

  return (
    <>
      

      <div className="inpp">
        <input
          name="image"
          type="file"
          onChange={(event) => {
            // Set image value when file is selected
            const file = event.currentTarget.files[0];
            setFieldValue("image", file);
          }}
        />
        <div className="red">
          <ErrorMessage name="image" />
        </div>
      </div>
    </>
  );
};

export default AddMarka;
