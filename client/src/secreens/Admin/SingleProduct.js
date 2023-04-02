import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { message, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const params=useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [Id, setID] = useState("");
  const {slug}=params;

  const singleCategoryHandler = async () => {
    try {
      const response = await axios.get(
        `/api//getproduct/${slug}`
      );
      toast.success("geeting product successfully");
      setName(response.data.product.name)
      setDescription(response.data.product.description)
      setPrice(response.data.product.price)
      setQuantity(response.data.product.quantity)
      setShipping(response.data.product.shipping)
      setCategory(response.data.product.category._id)
      setID(response.data.product._id)
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in geeting product");
    }
  };
  useEffect(() => {
    singleCategoryHandler();
  }, []);

  //get all category
  const getAllCategory = async () => {
    try {
        const response = await axios.get(
          "/api//allcategories"
        );
        setCategories(response.data.categories);
        toast.success("geeting categories successfully");
      } catch (error) {
        console.log(error);
        toast.error("something went wrong in geeting categories");
      }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  
//   updateing products
  const handleUpdate=(e)=>{
    e.preventDefault();
    try {
        const productData=new FormData();
        productData.append("name",name);
        productData.append("description",description);
        productData.append("price",price);
        productData.append("quantity",quantity);
        productData.append("photo",photo);
        productData.append("category",category);
        const res=axios.put(`/api//updateproduct/${Id}`, productData)
        if(res?.data?.success){
            toast.success(res.data.message);
            navigate("/dashboard/admin/products");
        }else{
            toast.error(res.data,message)
        }
    } catch (error) {
        console.log(error);
        toast.success("something went wrong")
    }
}

  const handleDelete= async ()=>{
    try {
        const res= await axios.delete(`/api//deleteproduct/${Id}`)
        if(res?.data?.success){
            toast.success(res.data.message);
            navigate("/dashboard/admin/products");
        }else{
            toast.error(res.data,message)
        }
    } catch (error) {
        console.log(error);
        toast.error("something went wrong")
    }
 }
 
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`/api//getphoto/${Id}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
