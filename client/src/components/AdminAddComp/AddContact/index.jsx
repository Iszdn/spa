import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
const AddContact = () => {

    async function AddContact(values) {
        const res=await axios.post("http://localhost:5000/contact",values)
    }

  return (
    <div className="adminpage">
         <div className='formadd'>
         <Formik
       initialValues={{ location: '', number: '',email:'' }}
       validationSchema={Yup.object({
         location: Yup.string()
           .required('Required'),
         number: Yup.string()
           .required('Required'),
           email: Yup.string().email("invalid email")
           .required('Required'),
           })}
       onSubmit={(values, { resetForm }) => {
        AddContact(values)
        resetForm()
        toast.success('Successfully added!');
       }}
     >
       <Form>
        
        <div className="inpp">
        <Field name="location" type="text" placeholder="location" />
         <div className="red"><ErrorMessage name="location" /></div>
        </div>
 
 
 <div className="inpp">
     <Field name="number" type="text" placeholder="number"/>
         <div className="red"><ErrorMessage name="number" /></div>
 </div>
        
 <div className="inpp">
     <Field name="email" type="email" placeholder="email"/>
         <div className="red"><ErrorMessage name="email" /></div>
 </div>   
    
         <button className='btn' type="submit">add</button>
       </Form>
     </Formik>
    </div>
    </div>
   
  )
}

export default AddContact