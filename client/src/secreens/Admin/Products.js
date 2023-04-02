import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const productsHandler = async () => {
    try {
      const res = await axios.get("/api/getproducts");
      if (res?.data?.success) {
        toast.success(res.data.message);
        setProducts(res.data.products);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    productsHandler();
  }, []);
  console.log("products",products)
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap ">
            {products.map((p) => {
              return (
                <Link to={`/dashboard/admin/products/${p.slug}`} className="product-link" key={p._id}>
                  <div
                    className="card m-1"
                    style={{ width: "18rem" }}
                  >
                    <img src={`/api//getphoto/${p._id}`} className="card-img-top" alt={p.name} />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
