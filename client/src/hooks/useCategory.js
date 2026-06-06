import axios from "axios";
import { useState, useEffect } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data?.category);
      console.log("data -----", data?.category);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
