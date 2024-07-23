import React, { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  console.log(JSON.stringify(form));
  console.log("redirectPath", redirectPath);

  const login = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        // `http://localhost:8000/api/auth/customer/sign-in`,
        `${process.env.REACT_APP_API_URL}/api/auth/sign-in`,
        JSON.stringify(form), // Send dataUser as JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      navigation(redirectPath, { replace: true });
      localStorage.setItem("user", JSON.stringify(data));
      toast.success(`Login Success, Welcome ${data.name}`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigation(-1);
      setUser(user);
    } catch (error) {
      console.error(error);
      toast.error(`There is a problem with the server`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigation(-1);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, form, setForm }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
