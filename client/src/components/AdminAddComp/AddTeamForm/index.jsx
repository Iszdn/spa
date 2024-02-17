import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import axios from "axios";
import toast from "react-hot-toast";
const AddTeam = () => {



  async function addTeam(values) {
    const res = await axios.post("http://localhost:5000/team", values);
 
  }

  


  return (
    <div className="adminpage">
      <div className="formadd">
        <Formik
          initialValues={{
            title: "",
            position: "",
            image: "",
           
          }}
          validationSchema={Yup.object({
            title:
              Yup.string()
              .required("Required"),
            position:
              Yup.string()
              .required("Required"),
            image: Yup.mixed()              
              .required("Required"),
            
          })}
          onSubmit={(values, { resetForm }) => {
            addTeam(values);
            resetForm();
            toast.success("Successfully added!");
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
              <Field name="position" type="text" placeholder="position" />
              <div className="red">
                <ErrorMessage name="position" />
              </div>
            </div>

           

            <div className="inpp">
              <Field name="image" type="file" placeholder="image" />
              <div className="red">
                <ErrorMessage name="image" />
              </div>
            </div>

           
            <button className="btn" type="submit">
              add
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddTeam;
