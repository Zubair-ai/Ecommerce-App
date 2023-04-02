
import { useState} from "react";
import SearchContext from "./SearchContext";

// inital state
const initialState = {
  product:[],
  keyword: "",
};

// Auth reducer function which is use for actions

const SearchContextProvider = (props) => {
  // using state hook
  const [headerSearch, setHeaderSearch] = useState(initialState);

  return (
    <SearchContext.Provider value={{ headerSearch, setHeaderSearch }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
