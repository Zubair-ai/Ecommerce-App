import { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../usecontext/AuthContext";
import Spinner from "../ui/Spinner";
// for nesting router
import { Outlet } from "react-router-dom";
import axios from "axios";
// is sy nesting routing ke functionilty open ho jay gi yh nesting routing k lia zruri ha. for nesting routing see app.js

export const AdminPrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const Authctx = useContext(AuthContext);

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("/api/adminauth");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (Authctx.Auth?.token) authCheck();
  }, [Authctx.Auth?.token]);

  return ok ? <Outlet /> : <Spinner path="/" />;
};
