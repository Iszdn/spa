import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.scss";
import axios from "axios";
import toast from "react-hot-toast";
const AddService = () => {

  const [categories, setCategories] = useState([])


  async function addService(values) {
    const res = await axios.post("http://localhost:5000/spa-services", values);
 
  }

  
  async function getCateg() {
    const res = await axios("http://localhost:5000/spaCategoryServices");
    setCategories(res.data);
   
  }
  useEffect(() => {
    getCateg()
  }, []);


  return (
    <div className="adminpage">
      <div className="formadd">
        <Formik
          initialValues={{
            title: "",
            description: "",
            duration: "",
            price: "",
            spaCategory: "",
          }}
          validationSchema={Yup.object({
            title:
              Yup.string()
              .required("Required"),
            description:
              Yup.string()
              .required("Required"),
            price: Yup.number()
              .positive("price must be positive")
              .required("Required"),
            duration: Yup.number()
              .positive("Invalid duration address")
              .required("Required"),
            spaCategoryId: Yup.string().required("Required"),
          })}
          onSubmit={(values, { resetForm }) => {
            addService(values);
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
              <Field name="description" type="text" placeholder="description" />
              <div className="red">
                <ErrorMessage name="description" />
              </div>
            </div>

            <div className="inpp">
              <Field name="duration" type="number" placeholder="duration" />
              <div className="red">
                
                <ErrorMessage name="duration" />
              </div>
            </div>

            <div className="inpp">
              <Field name="price" type="number" placeholder="price" />
              <div className="red">
                <ErrorMessage name="price" />
              </div>
            </div>

            <div className="inpp">
            <Field name="spaCategoryId"  as="select">
                      
                      {categories.map(spaCategoryId => (
                        <option key={spaCategoryId._id} value={spaCategoryId._id}>{spaCategoryId.title}</option>
                      ))}
                    </Field>
              <div className="red">
                <ErrorMessage name="spaCategoryId" />
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

export default AddService;
