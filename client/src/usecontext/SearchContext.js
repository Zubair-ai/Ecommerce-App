import { createContext } from "react";
const SearchContext =createContext({
  product:[],
  keyword:""
});

export default SearchContext;