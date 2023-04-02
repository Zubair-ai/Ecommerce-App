import React from "react";

const CategoryForm = (props) => {
  const {Value,formSubmitHandler,setValue,typeofButton}=props;
  console.log("value",Value)
  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <div class="mb-3 w-75">
          <label for="exampleInputEmail1" class="form-label">
            Create Category
          </label>
          <input
            type="text"
            className="form-control"
            value={Value}
            onChange={(e)=>{setValue(e.target.value)}}
          />
        </div>
        <button class="btn btn-dark">
          {typeofButton}
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
