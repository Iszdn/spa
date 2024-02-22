import React, { useEffect, useState } from 'react'
import "./index.scss"
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const BookingAdmin = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [editedBooking, setEditedBooking] = useState(null); 
  const [search, setSearch] = useState('')
  const [property, setProperty] = useState(null)

  async function getData() {
    const res = await axios("http://localhost:5000/booking");
    setData(res.data);
    setLoading(false)
  }

  

  async function deleteBooking(id) {
    const res = await axios.delete(`http://localhost:5000/booking/${id}`);
    toast.success("deleted")
    getData();
  }

  async function editBooking(id, values) {
    const res = await axios.put(`http://localhost:5000/booking/${id}`, values);
    toast.success('Successfully edited!');
    getData()
    setShowModal(false);
  }

  const openEditModal = (Booking) => { 
    setEditedBooking(Booking); 
    setShowModal(true);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>BookingAdmin</title>
      </Helmet>
      <>
        <div className="adminpage">
          <div className="userpage">
          <div className="filterDD">
              
            <div className="filter">
    <input type="search" placeholder='Search by name...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <div onClick={()=>setProperty({name:"date",asc:false})} className="btn">decrease</div>
    <div onClick={()=>setProperty({name:"date",asc:true})} className="btn">increase</div>
     <div onClick={()=>setProperty({name:"date",asc:null})} className="btn">default</div>
</div>
            </div>
            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      {/* <th>id</th> */}
                      <th>spa service</th>
                      <th>date</th>
                      <th>start time</th>
                      <th>end time</th>
                      <th>user</th>
                      <th>settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {loading ? <span>loading...</span> :
                      (data && data
                        .filter(x=>x.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>{
        if (property && property.asc===true) {
            return a[property.name]<b[property.name] ? -1 : (a[property.name]<b[property.name] ? 1 : 0)
        }
        else if (property && property.asc===false) {
            return a[property.name]>b[property.name] ? -1 : (a[property.name]>b[property.name] ? 1 : 0)
        }
        else{
            return 0;
        }
    })
                        .map(Booking => (
                        <tr key={Booking._id}>
                          <td>{Booking._id}</td> 
                         <td>{Booking.spaService.title}</td>
                          <td>{Booking.date}</td>
                          <td>{Booking.time}</td>
                          <td>{Booking.user.username}</td>
                          
                          <td>
                            <button onClick={() => deleteBooking(Booking._id)} className='btn'><AiOutlineDelete /></button>
                            <button onClick={() => openEditModal(Booking)} className='btn'><CiEdit /></button>
                          </td>
                        </tr>
                      )))
                    } */}
                    {loading ? <span>loading...</span> :
    (data && data
      .filter(x=>x.spaService?.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b)=>{
        if (property && property.asc===true) {
            return a[property.name]<b[property.name] ? -1 : (a[property.name]<b[property.name] ? 1 : 0)
        }
        else if (property && property.asc===false) {
            return a[property.name]>b[property.name] ? -1 : (a[property.name]>b[property.name] ? 1 : 0)
        }
        else{
            return 0;
        }
    })
      .map(Booking => (
        <tr key={Booking._id}>
            <td>{Booking.spaService?.title}</td>
            <td>{Booking.date}</td>
            <td>{Booking.startTime}</td>
            <td>{Booking.endTime}</td>
            <td>{Booking.user?.username}</td> {/* Accessing the username of the user */}
            <td>
                <button onClick={() => deleteBooking(Booking._id)} className='btn'><AiOutlineDelete /></button>
                <button onClick={() => openEditModal(Booking)} className='btn'><CiEdit /></button>
            </td>
        </tr>
    )))
}

                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        </div>

        {showModal && (
          <>
          <div className="modal" onClick={() => setShowModal(false)}>
            </div>
            <div className="modal-content">
              <span className="close" onClick={() => setShowModal(false)}>&times;</span>
              <h2>Edit</h2>
              <Formik
                initialValues={{ title: editedBooking.title || '', description: editedBooking.description || ''  }}
                validationSchema={Yup.object({
                  title: Yup.string()
                    
                    .required('Required'),
                  description: Yup.string()
                    
                    .required('Required'),
                 
                })}
                onSubmit={(values) => {
                  editBooking(editedBooking._id, values);
                  toast.success("edited")

                }}
              >
                <Form>


                  <div className="inpp">
                    <Field name="title" type="text" placeholder="title" />
                    <div className="red"><ErrorMessage name="title" /></div>
                  </div>

                  <div className="inpp">
                    <Field name="description" type="text" placeholder="description" />
                    <div className="red"><ErrorMessage name="description" /></div>
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
  )
}

export default BookingAdmin;
