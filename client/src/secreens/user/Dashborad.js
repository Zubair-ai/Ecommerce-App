import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useContext } from "react";
import AuthContext from "../../usecontext/AuthContext";
const Dashboard = () => {
  const Authctx=useContext(AuthContext);
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-flui m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{Authctx.Auth?.user?.name}</h3>
              <h3>{Authctx.Auth?.user?.email}</h3>
              <h3>{Authctx.Auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;