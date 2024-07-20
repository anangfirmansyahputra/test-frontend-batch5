import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
    payment: "Credit Card",
    userId: null,
    orderItems: [],
  });
  
  const user = JSON.parse(localStorage.getItem("user"));

  const getOrderByUserId = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/orders`, {
        headers: {
          Authorization: `${user.token}`
        },
      });
      console.log(response.data);
      setOrders(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createOrder = async () => {
    try {
      const response = await axios.post( `localhost:8000/api/orders`,formData, {
        headers: {
          Authorization: `${user.token}`,
        },
      });
      const data = response.data;
      console.log("Order berhasil dibuat", data);
      toast.success(`Order Berhasil Dibuat`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
      toast.error(`Terjadi Kesalahan`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        orders,
        getOrderByUserId,
        setOrders,
        formData,
        setFormData,
        createOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
// make sure use
export const useOrderContext = () => {
  return useContext(OrdersContext);
};
