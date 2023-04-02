import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import AuthContext from "../../usecontext/AuthContext";
import { useContext } from "react";
const AdminDashboard = () => {
  const Authctx=useContext(AuthContext);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3> Admin Name : {Authctx.Auth?.user?.name}</h3>
              <h3> Admin Email : {Authctx.Auth?.user?.email}</h3>
              <h3> Admin Contact : {Authctx.Auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;