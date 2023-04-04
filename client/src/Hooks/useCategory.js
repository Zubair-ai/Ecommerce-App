import axios from "axios";
import { useState,useEffect } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState();
  const categoriesHandler = async () => {
    try {
      const response = await axios.get(
        "/api//allcategories"
      );
      setCategories(response.data.categories);
  
    } catch (error) {
      console.log(error);
      
    }
  };
  useEffect(() => {
    categoriesHandler();
  }, []);

  return categories;
}
