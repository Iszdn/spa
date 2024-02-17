import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./index.scss"
import axios from 'axios';
import toast from 'react-hot-toast';
const AddUser = () => {

    async function addUser(values) {
        const res=await axios.post("http://localhost:5000/users",values)

    }
  return (
    <div className="adminpage">
         <div className='formadd'>
         <Formik
       initialValues={{ username: '', role: '', email: '',password:'' }}
       validationSchema={Yup.object({
         username: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('Required'),
         role: Yup.string()
           .max(20, 'Must be 20 characters or less')
           .required('Required'),
           password: Yup.string()
           .max(20, 'Must be 20 characters or less')
           .required('Required'),
         email: Yup.string().email('Invalid email address').required('Required'),
       })}
       onSubmit={(values, { resetForm }) => {
        addUser(values)
        resetForm()
        toast.success('Successfully added!');
       }}
     >
       <Form>
        
        <div className="inpp">
        <Field name="username" type="text" placeholder="Username" />
         <div className="red"><ErrorMessage name="username" /></div>
        </div>
 
 <div className="inpp">
     <Field name="role" type="text" placeholder="Role"/>
         <div className="red"><ErrorMessage name="role" /></div>
 </div>
        
         
         <div className="inpp"><Field name="email" type="email" placeholder="Email"/>
        <div className="red"> <ErrorMessage name="email" /></div></div>

<div className="inpp">
    
<Field name="password" type="password" placeholder="Password" />
         <div className="red"><ErrorMessage name="password" /></div>
 
</div>
         <button className='btn' type="submit">add</button>
       </Form>
     </Formik>
    </div>
    </div>
   
  )
}

export default AddUser