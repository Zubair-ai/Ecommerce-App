import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import {RiShoppingBag3Fill} from "react-icons/ri"
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const Signin = () => {
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [phone,setPhone]=useState();
  const [address,setAddress]=useState();
  const [answer,setAnswer]=useState();
  const Navigate = useNavigate();
  const onSubmitHandler= async(event)=>{
    event.preventDefault();
    try {
      const res = await axios.post("/api/signin", { name,email, password,phone,address,answer });
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

          <div className="form-floating m-3  w-50 ">
            <input
              onChange={(event)=>{ setName
              (event.target.value)}}
              value={name}
              type="text"
              required
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Name</label>
          </div>
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
            onChange={(event)=>{ setPassword
              (event.target.value)}}
              value={password}
              type="password"
              required
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Password</label>
          </div>
          <div class="form-floating  w-50">
            <input
            onChange={(event)=>{ setPhone
              (event.target.value)}}
              value={phone}
              type="phone"
              class="form-control"
              required
              id="floatingPassword"
              placeholder="Password"
            />
            <label for="floatingPassword">Phone</label>
          </div>
          <div class="form-floating m-3  w-50">
            <input
            onChange={(event)=>{ setAddress
              (event.target.value)}}
              value={address}
              type="address"
              required
              class="form-control"
              id="floatingInput"
              placeholder="Password"
            />
            <label for="floatingInput">Address</label>
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
            Sign in
          </button></div>
        </form>
      </div>
    </Layout>
  )
}

export default Signin
