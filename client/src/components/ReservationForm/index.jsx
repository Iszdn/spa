import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./index.scss";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";

const ReservationForm = () => {
  const [spaCategory, setSpaCategory] = useState([]);
  const [spaServices, setSpaServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeOptions, setTimeOptions] = useState([]);
  const [endTimeOptions, setEndTimeOptions] = useState([]);

  const { user } = useContext(UserContext);

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
      const res = await axios.post("http://localhost:5000/booking", values);
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  }

  async function getSpaServicesByCategory(categoryId) {
    try {
      const res = await axios.get(`http://localhost:5000/spaCategoryServices/${categoryId}`);
      setSpaServices(res.data.spaServices);
    } catch (error) {
      console.error('Error fetching spa services:', error);
    }
  }

  useEffect(() => {
    getSpaCategory();
  }, []);

  useEffect(() => {
    const options = [];
    for (let i = 10; i < 20; i++) {
      options.push(`${i}:00`);
    }
    setTimeOptions(options);
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedDate) {
      const getEndTimeOptions = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/getEndTimeOptions/${selectedCategory}/${selectedDate}`);
          setEndTimeOptions(res.data.endTimeOptions);
        } catch (error) {
          console.error('Error fetching end time options:', error);
        }
      };
      getEndTimeOptions();
    }
  }, [selectedCategory, selectedDate]);

  const handleStartTimeChange = (e, setFieldValue) => {
    const selectedStartTime = e.target.value;
    setFieldValue("startTime", selectedStartTime);
    const index = timeOptions.findIndex(time => time === selectedStartTime);
    if (index !== -1) {
      const availableEndTimes = endTimeOptions.slice(index + 1);
      setFieldValue("endTime", availableEndTimes.length > 0 ? availableEndTimes[0] : "");
    }
  };

  return (
    <div className="reserv-form">
      <div className="title">
        <h3>Reservation</h3>
      </div>
      <Formik
  initialValues={{
    userId: user ? user.userId : '',
    servicetype: "",
    service: "",
    date: "",
    startTime: "",
    endTime: ""
  }}
  validationSchema={Yup.object({
    userId: Yup.string().required("Required"),
    servicetype: Yup.string(),
    service: Yup.string().required("Required"),
    date: Yup.date().required("Required"),
    startTime: Yup.string().required("Required"),
    endTime: Yup.string().required("Required")
  })}
  onSubmit={(values, { resetForm }) => {
    creatReserv(values)
    resetForm();
    toast.success("successfully reserved!")
  }}
>
  {({ values, setFieldValue }) => (
    <Form>
      <Field
        placeholder="userId"
        name="userId"
        type="text"
      />
      <div className="red">
        <ErrorMessage name="userId" />
      </div>

      <Field
        className="select"
        name="servicetype"
        as="select"
        value={selectedCategory}
        onChange={(e) => {
          const categoryId = e.target.value;
          setSelectedCategory(categoryId);
          getSpaServicesByCategory(categoryId);
        }}
      >
        <option value="">Select Category</option>
        {loading ? <option>Loading...</option> : (
          spaCategory && spaCategory.map(category =>
            <option key={category._id} value={category._id}>{category.title}</option>
          )
        )}
      </Field>
      <div className="red">
        <ErrorMessage name="servicetype" />
      </div>

      <Field
        className="select"
        name="service"
        as="select"
      >
        {spaServices && spaServices.map(service =>
          <option key={service._id} value={service._id}>{service.title}</option>
        )}
      </Field>
      <div className="red">
        <ErrorMessage name="service" />
      </div>

      <Field
        name="date"
        type="date"
      />
      <div className="red">
        <ErrorMessage name="date" />
      </div>

      <Field
        className="select"
        name="startTime"
        as="select"
        onChange={(e) => {
          const startTime = e.target.value;
          const endTime = `${parseInt(startTime.split(":")[0]) + 1}:00`;
          setFieldValue("startTime", startTime);
          setFieldValue("endTime", endTime);
        }}
      >
        <option value="">Select Start Time</option>
        {timeOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </Field>
      <div className="red">
        <ErrorMessage name="startTime" />
      </div>

      <Field
        name="endTime"
        type="text"
        readOnly
        value={values.endTime}
      />
      <div className="red">
        <ErrorMessage name="endTime" />
      </div>

      <button type="submit">Submit</button>
    </Form>
  )}
</Formik>

    </div>
  );
};

export default ReservationForm;
