import axios from "axios";
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

// inital state
const initialState = {
  user: null,
  token: "",
};

// Auth reducer function which is use for actions

const AuthContextProvider = (props) => {
  // using state hook
  const [Auth, setAuth] = useState(initialState);

  // default axios like headers

  axios.defaults.headers.common["Authorization"] = Auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        ...Auth,
        user: parseData.userData,
        token: parseData.token,
      });
    }
  },[setAuth]);

  return (
    <AuthContext.Provider value={{ Auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
