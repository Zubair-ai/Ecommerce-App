import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import {RiShoppingBag3Fill} from "react-icons/ri"
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const ForgetPassword = () => {
  
  const [email,setEmail]=useState();
  const [newPassword,setNewPassword]=useState();
  const [answer,setAnswer]=useState();
  const Navigate = useNavigate();
  const onSubmitHandler= async(event)=>{
    event.preventDefault();
    try {
      const res = await axios.post("/api/forgetpassword", {email, newPassword,answer });
      if (res && res.data.success) {
        toast.success(res.data.message);
        Navigate("/login")
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }    

  }
  return (
    <Layout>
        <div className=" text-center">
        <form  onSubmit={onSubmitHandler} className="form-signin ">
          <RiShoppingBag3Fill size={60} class="mb-4"/>
          <h1 class="h3 mb-3 fw-normal">Sign-In</h1>


          <div class="form-floating m-3  w-50">
            <input
            onChange={(event)=>{ setEmail
              (event.target.value)}}
              value={email}
              type="email"
              required
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email</label>
          </div>
          <div class="form-floating m-3  w-50">
            <input
            onChange={(event)=>{ setNewPassword
              (event.target.value)}}
              value={newPassword}
              type="password"
              required
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">New Password</label>
          </div>
          <div class="form-floating m-3  w-50">
            <input
            onChange={(event)=>{ setAnswer
              (event.target.value)}}
              value={answer}
              type="question"
              required
              class="form-control"
              id="floatingInput"
              placeholder="Question"
            />
            <label for="floatingInput">Name of your best teacher</label>
          </div>
          <div><button class="w-auto btn btn-lg btn-primary  " type="submit">
           Reset Password
          </button></div>
        </form>
      </div>
    </Layout>
  )
}

export default ForgetPassword;
