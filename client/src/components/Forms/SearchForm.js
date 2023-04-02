import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import SearchContext from "../../usecontext/SearchContext";

const SearchForm = () => {
  const ctx = useContext(SearchContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/searchproduct/${search}`
      );
      if (data?.success) {
        console.log("data", data.products);
        ctx.setHeaderSearch({
          ...ctx.headerSearch,
          product: data?.products,
          keyword: search,
        });
        console.log("headerSearch", ctx.headerSearch);
        navigate("/search");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className="d-flex">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-dark bg-dark text-white" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
