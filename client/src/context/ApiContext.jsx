import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axios";
import { useLocation } from "react-router-dom";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  // Theme state management

  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Initial loading state
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [customerError, setCustomerError] = useState(null);

  const location = useLocation();

  const verifyAuth = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/auth/verify", {
        withCredentials: true,
      });
      setAuthUser(response.data.user);
      setIsAuthenticated(true);
    } catch (error) {
      // Only log if it's not an unauthorized error (which is expected after logout)
      if (error.response?.status !== 401) {
        console.error("Auth verification error:", error);
      }
      setAuthUser(null);
      setIsAuthenticated(false);
      // Only redirect to login if we're not already on the login page or home page
      if (location.pathname !== "/login" && location.pathname !== "/") {
        navigate("/login", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  };

  // Call verifyAuth only once on initial load
  useEffect(() => {
    verifyAuth();
  }, []);

  // Call verifyAuth on route changes only if we're authenticated
  useEffect(() => {
    if (isAuthenticated) {
      verifyAuth();
    }
  }, [location.pathname]);

  const fetchCustomers = async () => {
    try {
      setLoadingCustomers(true);
      const response = await axiosInstance.get("/customer/get");
      setCustomers(response.data.data);

      return response.data.data;
    } catch (error) {
      setCustomerError(
        error.response?.data?.message || "Failed to fetch customers"
      );
      throw error;
    } finally {
      setLoadingCustomers(false);
    }
  };

  // Load initial customers
  useEffect(() => {
    fetchCustomers();
  }, []);

  const refreshToken = async () => {
    try {
      await axiosInstance.post(
        "/auth/refresh-token",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      logout();
      throw error;
    }
  };

  const googleLogin = async (credentialResponse) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/google-login", {
        token: credentialResponse.credential,
      });

      const { user } = response.data.data;
      setAuthUser(user);
      setIsAuthenticated(true);

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Google login failed";
      toast.error(errorMessage);
      console.error("Google Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Use axiosInstance instead of direct axios call
      const response = await axiosInstance.post("/auth/logout");

      if (response.data.statusCode === 200) {
        // Clear auth state
        setAuthUser(null);
        setIsAuthenticated(false);
        
        // Clear stored user data
        localStorage.removeItem('user');
        
        toast.success("Logged out successfully");
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Even if the API call fails, we should still clear the local state
      setAuthUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      navigate("/");
      toast.error(error?.response?.data?.message || "Failed to logout");
    }
  };

  const CustomValueEditor = ({ field, operator, value, handleOnChange }) => {
    // Render a text input for most cases
    return (
      <input
        type={field === "age" || field === "total_spent" || field === "order_count" || field === "last_purchase" ? "number" : "text"}
        value={value}
        onChange={(e) => handleOnChange(e.target.value)}
        className="w-auto px-2 py-1 border rounded"
      />
    );
  };

  return (
    <ApiContext.Provider
      value={{
        authUser,
        isAuthenticated,
        loading,
        verifyAuth,
        googleLogin,
        logout,
        fetchCustomers,
        customers,
        loadingCustomers,
        customerError,
        CustomValueEditor,
        axiosInstance,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);

// Custom Value Editor for React Query Builder (example)
export const CustomValueEditor = ({ field, operator, value, handleOnChange }) => {
  // Render a text input for most cases
  return (
    <input
      type={field === "age" || field === "total_spent" || field === "order_count" || field === "last_purchase" ? "number" : "text"}
      value={value}
      onChange={(e) => handleOnChange(e.target.value)}
      className="w-auto px-2 py-1 border rounded"
    />
  );
};

