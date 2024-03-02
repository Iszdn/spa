import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";

import axios from "axios";
import toast from "react-hot-toast";

const AddBlog = () => {


  
  async function AddBlog(values) {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("name", values.name);
      formData.append("tagId", values.tagId);
      formData.append("blogCategoryId", values.blogCategoryId);
      formData.append("image", values.image);

      const res = await axios.post("http://localhost:5000/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle response if needed
      console.log(res.data);
     
    } catch (error) {
      console.error("Error adding Spa Category:", error);
      toast.error("Failed to add Spa Category");
    }
  }

  return (
    <div className="adminpage">
       <div className="text-center margi">
        <h2>Add Blog</h2>
      </div>
      <div className="formadd">
        <Formik
          initialValues={{
            title: "",
            description: "",
            name: "",
            tagId: "",
            blogCategoryId: "",
            image: null, // Initialize image as null
          }}
          
          validationSchema={Yup.object({
            title: Yup.string().required("Required"),
            description: Yup.string().required("Required"),
            tagId: Yup.string().required("Required"),
            blogCategoryId: Yup.string().required("Required"),
            image: Yup.mixed().required("Required"),
          })}

          onSubmit={(values, { resetForm }) => {
            AddBlog(values);
            resetForm();
            toast.success("Successfully added!");
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
  const [blogCategories, setBlogCategories] = useState([])
  const [blogTag, setBlogTag] = useState([])


  async function getCategory() {
    const res = await axios("http://localhost:5000/blogCategory");
    setBlogCategories(res.data);
   
  }
  async function getTag() {
    const res = await axios("http://localhost:5000/blogTag");
    setBlogTag(res.data);
    
  }

  useEffect(() => {
    getCategory();
    getTag()
  }, []);
  return (
    <>
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
            <Field name="blogCategoryId"  as="select">
                      
                      {blogCategories && blogCategories.map(blogCategoryId => (
                        <option key={blogCategoryId._id} value={blogCategoryId._id}>{blogCategoryId.blogCategoryName}</option>
                      ))}
                    </Field>
              <div className="red">
                <ErrorMessage name="blogCategoryId" />
              </div>
            </div>

            <div className="inpp">
            <Field name="tagId"  as="select">
                      
                      { blogTag && blogTag.map(tagId => (
                        <option key={tagId._id} value={tagId._id}>{tagId.blogTagsName}</option>
                      ))}
                    </Field>
              <div className="red">
                <ErrorMessage name="tagId" />
              </div>
            </div>

      <div className="inpp">
        <input
          name="image"
          type="file"
          onChange={(event) => {
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

export default AddBlog;
