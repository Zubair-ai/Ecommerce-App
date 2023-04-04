import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const MoreDetail = () => {
  const [singleProduct, setSingleProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const params = useParams();

  const singleProductHandler = async () => {
    try {
      const response = await axios.get(
        `/api//getproduct/${params.slug}`
      );
      setSingleProduct(response.data.product);
      similarProductHandler(response.data.product._id,response.data.product.category._id)
      
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting product');
    }
  }; 
 console.log("relatedProduct",relatedProduct)
  useEffect(() => {
    singleProductHandler();
  }, []);
  const similarProductHandler = async (pid,cid) => {
    try {
      const response = await axios.get(
        `/api//similarproduct/${pid}/${cid}`
      );
      setRelatedProduct(response?.data?.products);
      
    } catch (error) {
      console.log(error);
      
    }
  };


  

  return (
    <Layout>
      <div className='row container mt-2'>
        <div className='col-md-6'>
          {singleProduct && (
            <img
              src={`/api//getphoto/${singleProduct._id}`}
              className='card-img-top'
              alt={singleProduct.name}
            />
          )}
        </div>
        <div className='col-md-6'>
          <h1 className='text-center'>Product Details</h1>
          <h6>Name: {singleProduct.name}</h6>
          <h6>Description: {singleProduct.description}</h6>
          <h6>Price: {singleProduct.price}</h6>
          <h6>Category: {singleProduct.category && singleProduct.category.name}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
                  
      </div>
      <hr />
      <div className='row'><h1>Similar products</h1>
      {relatedProduct.length<1 && <p className='text-center'>No Similar Product Found</p>}
      <div className="d-flex flex-wrap">
            {relatedProduct?.map((p) => (
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
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
          </div>
    </Layout>
  );
};

export default MoreDetail;
