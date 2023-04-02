import axios from "axios";
import { useState,useEffect } from "react";
import { toast } from "react-hot-toast";

export default function useCategory() {
  const [categories, setCategories] = useState();
  const categoriesHandler = async () => {
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
    categoriesHandler();
  }, []);

  return categories;
}
