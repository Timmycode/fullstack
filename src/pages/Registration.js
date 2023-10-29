import React from 'react'
import {Formik, Form, Field, ErrorMessage,} from "formik";
import * as Yup from 'yup'
import axios from 'axios';


function Registration() {

    const initialValues ={
        username:"",
        password:"",
     };
    
     const validationSchema = Yup.object().shape({
        username:Yup.string().min(3).max(15).required(),
        password:Yup.string().min(4).max(20).required(),
     });

     const onSubmit = (data) => {
        axios.post("https://backend-blog-0lbc.onrender.com/auth", data).then(() =>{
            console.log(data);
        })
     };
      
    
  return (
    
    <div className="createPostPage"><Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    <Form>
        <div className='formContainer'>

        <label>Username: </label>
        <ErrorMessage name="username" component="span" />
        <Field id="inputCreatePost" name="username" placeholder="(Ex. Faruq..)"/>

        <label>Password: </label>
        <ErrorMessage name="password" component="span" />
        <Field id="inputCreatePost" name="password" placeholder="(Your Password...)" type="password"/>

        <button type="submit">Registration</button>
        </div>
        
    </Form>
    </Formik></div>
  )
}

export default Registration