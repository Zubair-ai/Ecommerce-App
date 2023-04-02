import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Checkbox, Radio } from "antd";
import axios from "axios";
import {Prices} from "../components/Prices/Prices"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../usecontext/CartContextProvider";
import { toast } from "react-hot-toast";


const Home = () => {
  const navigate=useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const {cart,setCart}=useContext(CartContext);
  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "/api//allcategories"
      );
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  //get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.post(`/api//loadmoreproduct/${page}`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

  const handleFilter = (value, id) => {
    let allchecked = [...checked];
    if (value) {
      allchecked.push(id);
    } else {
      allchecked = allchecked.filter((c) => c !== id);
    }
    setChecked(allchecked);
  };
  // if not filtered 
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);
  // if filtered any product
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

   //get filterd product called backend
   const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api//filterproduct", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // get Total count 
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api//productcount");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`/api//loadmoreproduct/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout title={"Home - Ecommer app"}>
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div className="row">
        <div className="col-md-3 ms-3 m-3 ">
          {/* filter bt Category */}
          <h3 className="text-center">Filter By Category</h3>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* filter by Price */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger m-3"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        <div className="col-md-8 m-3 ">
          <h1 className="text-center">All Product</h1>
          <div className="d-flex flex-wrap align-items-center ">
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
                  <button class="btn btn-primary ms-1" onClick={()=>{navigate(`moredetail/${p.slug}`)}}>More Details</button>
                  <button class="btn btn-dark ms-1" onClick={()=>{setCart([...cart,p]);toast.success("Prodcut Added to Cart");localStorage.setItem("cart",...cart,JSON.stringify(p))}}>ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
      </div>
    </Layout>
  );
};

export default Home;
