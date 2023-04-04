import React from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Forms/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [category, setCategory] = useState();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [visible, setVisible] = useState(false);
  const [Selectedcate, setSelectedCate] = useState(false);
  const [updateCategoryName, setUpdateCategoryName] = useState(Selectedcate);

  const categoryHandler = async () => {
    try {
      const response = await axios.get(
        "/api//allcategories"
      );
      setCategory(response.data.categories);
      
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in geeting categories");
    }
  };
  useEffect(() => {
    categoryHandler();
  }, []);

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api//createcategory",
        { name: newCategoryName }
      );
      if (res) {
        
        categoryHandler();
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("something went wrong");
    }
  };
  const categoryUpdatedHandler = async (e) => {
    e.preventDefault();
    console.log("in update handler");
    try {
      const res = await axios.put(
        `/api//updatecategory/${Selectedcate._id}`,
        { name: updateCategoryName }
      );
      if (res.success) {
        
        setVisible(false);

        categoryHandler();
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somingthing went wrong");
    }
  };

  const deleteHandler = async (cate) => {
    try {
      const res = await axios.delete(
        `/api//deletecategory/${cate._id}`
      );
      if (res.success) {
        toast.success(res.data.message);
        categoryHandler();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("somingthing went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Categories</h1>
            <CategoryForm
              Value={newCategoryName}
              formSubmitHandler={formSubmitHandler}
              setValue={setNewCategoryName}
              typeofButton={"Create"}
            />
            <div>
              <table className="table w-75">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((cate) => (
                    <tr key={cate._id}>
                      <td>{cate.name}</td>
                      <td>
                        <button
                          className="btn btn-dark"
                          onClick={() => {
                            setVisible(true);
                            setSelectedCate(cate);
                            setUpdateCategoryName(cate.name);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger m-3"
                          onClick={() => {
                            deleteHandler(cate);
                          }}
                        >
                          {" "}
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              visible={visible}
              footer={null}
            >
              <CategoryForm
                Value={updateCategoryName}
                formSubmitHandler={categoryUpdatedHandler}
                setValue={setUpdateCategoryName}
                typeofButton={"Update"}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
