import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products");
      console.log(response);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/${id}`
      );
      setProduct(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/categories");
      setCategory(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProductById,
        setProduct,
        product,
        getAllCategory,
        category,
        setCategory,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
