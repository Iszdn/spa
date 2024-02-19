import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.scss";
// import { Datepicker, Button } from '@mobiscroll/react';
import mobiscroll from '@mobiscroll/react-lite';
import axios from "axios";
import { UserContext } from "../../context/userContext";

const ReservationForm = () => {
  const [spaCategory, setSpaCategory] = useState([]);
  const [spaServices, setSpaServices] = useState([]);
  const [loading, setLoading] = useState(true);
const {user}=useContext(UserContext)
// console.log(user.userId);
  // Функция для загрузки категорий спа
  async function getSpaCategory() {
    try {
      const res = await axios.get("http://localhost:5000/spaCategoryServices");
      setSpaCategory(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching spa categories:', error);
    }
  }

  async function creatReserv(values) {
    try {
      const res = await axios.post("http://localhost:5000/booking",values);
      
    } catch (error) {
      console.error('Error fetching spa categories:', error);
    }
  }

  // Функция для загрузки услуг для выбранной категории
  async function getSpaServicesByCategory(categoryId) {
    try {
      const res = await axios.get(`http://localhost:5000/spaCategoryServices/${categoryId}`);
      console.log("res",res.data.spaServices);
      setSpaServices(res.data.spaServices);
    } catch (error) {
      console.error('Error fetching spa services:', error);
    }
  }

 

  useEffect(() => {
    getSpaCategory();
  }, []);

  return (
    <div className="reserv-form">
      <Formik
        initialValues={{
         userId: '',
          servicetype: "",
          service: "",
          date: "",
          time: ""
        }}
        validationSchema={Yup.object({
        
            userId: Yup.string()
            
            .required("Required"),
          
          servicetype: Yup.string(),
          service: Yup.string().required("Required"),
          date: Yup.date().required("Required"),
          time: Yup.string().required("Required"),
        })}
        onSubmit={(values, { resetForm }) => {
          creatReserv(values)
          resetForm();
        }}
      >
        <Form>
         

          <Field placeholder="userId" name="userId" type="text" />
          <div className="red">
            <ErrorMessage name="userId" />
          </div>

          <Field className="select" name="servicetype" as="select" onChange={(e) => {
            const categoryId = e.target.value;
            getSpaServicesByCategory(categoryId);
          }}>
            {loading ? <span>Loading...</span> : (
              spaCategory && spaCategory.map(category =>
                <option key={category._id} value={category._id}>{category.title}</option>
              )
            )}
          </Field>
          <div className="red">
            <ErrorMessage name="servicetype" />
          </div>

          <Field className="select" name="service" as="select">
            {spaServices && spaServices.map(service =>
              <option key={service._id} value={service._id}>{service.title}</option>
            )}
          </Field>
          <div className="red">
            <ErrorMessage name="service" />
          </div>

          <Field name="date" type="date" />
          <div className="red">
            <ErrorMessage name="date" />
          </div>

          <Field name="time" type="time" />
          <div className="red">
            <ErrorMessage name="time" />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ReservationForm;
