import React, { useContext, useEffect } from 'react';
import {Formik, Form, Field, ErrorMessage,} from "formik";
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function CreatePost() {
   const{authState} = useContext(AuthContext);
   
let navigate = useNavigate();
 const initialValues ={
    title:"",
    postText:"",
 };

 useEffect(() => {
   if (!localStorage.getItem("accessToken")){
      navigate("/login");
   }
 }, []);
 const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().required(),
 })

 const onSubmit = (data) => {
    axios.post("https://backend-blog-0lbc.onrender.com/posts", data, { headers: {accessToken: localStorage.getItem("accessToken")}}).then((response) =>{
    navigate("/")
      });
 };

 
  return (
 <div className="createPostPage">
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    <Form>
        <div className='formContainer'>
        <label>Title: </label>
        <ErrorMessage name="title" component="span" />
        <Field id="inputCreatePost" name="title" placeholder="(Ex. Title..)"/>
        
        <label>Post: </label>
        <ErrorMessage name="postText" component="span" />
        <Field id="inputCreatePost" name="postText" placeholder="(Ex. Post..)"/>

        <button type="submit"> Create Post</button>
        </div>
        
    </Form>
    </Formik>
   
    </div>
  )
}

export default CreatePost