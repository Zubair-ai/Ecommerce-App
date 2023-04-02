import React from 'react'
import useCategory from '../Hooks/useCategory'
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';

const FullCategories = () => {
    const categories= useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className='contanier m-3' style={{ marginTop: "100px" }}>
        <h1 className=''>All Categories:</h1>
        <div className='row contanier'>
            {categories?.map(c=>(
               <div className='col-md-6 mt-5 gx-3 gy-3' key={c._id}>
                 <div className="card">
                <Link to={`/selectedcategory/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </Link>
              </div>
               </div>
            ))}
        </div>
      </div>
    </Layout>
  )
}

export default FullCategories
