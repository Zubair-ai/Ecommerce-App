import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SlectedCategory = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate =useNavigate();
  const params = useParams();
  const getProducts = async () => {
    try {
      const res = await axios.get(
        `/api//selectedcategory/${params.slug}`
      );
      if (res) {
        toast.success(`${res.data.products.name} uploaded successfully`);
        setProducts(res?.data?.products);
        setCategory(res?.data?.category);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  useEffect(() => {
    getProducts();
  }, [params.slug]);
//   console.log("catgory",category)
//   console.log("catgory",products)
  return (
    <Layout>
      <div className="contaier mt-3">
        <h1 className="text-center"> Category - {category?.name}</h1>
        <h6 className="text-center"> {products?.length} results found</h6>
        <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`/api//getphoto/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text text-warning fw-bold fs-5 "> $ {p.price}</p>
                  <button class="btn btn-primary ms-1" onClick={()=>{navigate(`/moredetail/${p.slug}`)}}>More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Layout>
  );
};

export default SlectedCategory;
