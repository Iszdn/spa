import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
const AddFaq = () => {

    async function AddFaq(values) {
        const res=await axios.post("http://localhost:5000/faq",values)
    }

  return (
    <div className="adminpage">
       <div className="text-center margi">
        <h2>Add FAQ</h2>
      </div>
         <div className='formadd'>
         <Formik
       initialValues={{ title: '', description: '' }}
       validationSchema={Yup.object({
         title: Yup.string()
           .required('Required'),
         description: Yup.string()
           .required('Required'),
           })}
       onSubmit={(values, { resetForm }) => {
        AddFaq(values)
        resetForm()
        toast.success('Successfully added!');
       }}
     >
       <Form>
        
        <div className="inpp">
        <Field name="title" type="text" placeholder="title" />
         <div className="red"><ErrorMessage name="title" /></div>
        </div>
 
 
 <div className="inpp">
     <Field name="description" type="text" placeholder="description"/>
         <div className="red"><ErrorMessage name="description" /></div>
 </div>
        
         
    
         <button className='btn' type="submit">add</button>
       </Form>
     </Formik>
    </div>
    </div>
   
  )
}

export default AddFaq