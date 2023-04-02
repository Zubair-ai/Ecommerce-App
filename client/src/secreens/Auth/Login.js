import {React ,useState} from "react";
import Layout from "../../components/Layout/Layout";
import {RiShoppingBag3Fill} from "react-icons/ri";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "../../usecontext/AuthContext";
import { useNavigate,useLocation } from "react-router-dom";



const Login = () => {
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const authCtx=useContext(AuthContext);
  const Navigate =useNavigate();
  const loaction=useLocation;
  const onSubmitHandler= async(event)=>{
    event.preventDefault();
    try {
      const res = await axios.post("/api/login", { email, password });
      if (res && res.data.success) {
        toast.success(res.data.message);
        authCtx.setAuth({
          ...authCtx.Auth,
          user:res.data.userData,
          token:res.data.token
        });
        localStorage.setItem("auth",JSON.stringify(res.data));
        // redirect to same page if the user access before dashborad login
        Navigate(loaction.state ||"/");
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
        <form onSubmit={onSubmitHandler} className="form-signin">
          <RiShoppingBag3Fill size={60} class="mb-4"/>
          <h1 class="h3 mb-3 fw-normal">Login</h1>
          <div class="form-floating m-3 w-50">
            <input
            onChange={(event)=>{ setEmail
              (event.target.value)}}
              value={email}
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Email</label>
          </div>
          <div class="form-floating m-3 w-50">
            <input
            onChange={(event)=>{ setPassword
              (event.target.value)}}
              value={password}
              type="password"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label for="floatingInput">Password</label>
          </div>
          <div className="d-grid gap-3">
          <button class="w-auto btn btn-lg btn-primary" type="submit">
            Login
          </button>
          <button class="w-auto btn btn-lg btn-dark" type="submit" onClick={()=>{Navigate("/forgetpassword")}} >
            forget Password
          </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
