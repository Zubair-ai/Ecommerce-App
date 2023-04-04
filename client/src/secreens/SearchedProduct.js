import React from 'react'
import Layout from "../components/Layout/Layout";
import { useContext } from 'react';
import SearchContext from '../usecontext/SearchContext';

const SearchedProduct = () => {
    const searchctx=useContext(SearchContext);
  return (
    <Layout>
      <div className='text-center m-3'> <h1>Searched products</h1></div>
      <h4 className='text-center m-3'>Found: {searchctx.headerSearch?.product.length<1?"product not found":searchctx.headerSearch?.product.length}</h4>
      <div className="d-flex flex-wrap text-center">
            {searchctx.headerSearch?.product.map((p) => (
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
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
    </Layout>
  )
}

export default SearchedProduct
