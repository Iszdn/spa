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

const ReviewAdmin = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [property, setProperty] = useState(null)

  async function getData() {
    const res = await axios("http://localhost:5000/review");
    setData(res.data);
    setLoading(false)
  }

  

  async function deleteReview(id) {
    const res = await axios.delete(`http://localhost:5000/review/${id}`);
    toast.success("deleted")
    getData();
  }

 

  

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>ReviewAdmin</title>
      </Helmet>
      <>
        <div className="adminpage">
          <div className="userpage">
          <div className="filterDD">
              
            <div className="filter">
    <input type="search" placeholder='Search by name...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
    <div onClick={()=>setProperty({name:"name",asc:true})} className="btn">a-z</div>
    <div onClick={()=>setProperty({name:"name",asc:false})} className="btn">z-a</div>
     <div onClick={()=>setProperty({name:"name",asc:null})} className="btn">default</div>
</div>
            </div>
            <div className="usertable">
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      {/* <th>id</th> */}
                      <th>name</th>
                      <th>review</th>
                      <th>settings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? <span>loading...</span> :
                      (data && data
                        .filter(x=>x.name.toLowerCase().includes(search.toLowerCase()))
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
                        .map(Review => (
                        <tr key={Review._id}>
                          {/* <td>{Review._id}</td> */}
                          <td>{Review.name}</td>
                          <td>{Review.review}</td>
                          

                          <td>
                            <button onClick={() => deleteReview(Review._id)} className='btn'><AiOutlineDelete /></button>
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

       
      </>
    </>
  )
}

export default ReviewAdmin;
