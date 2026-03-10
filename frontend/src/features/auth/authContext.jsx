import { createContext, useContext, useEffect, useState } from "react";
import { login, register } from "./services/auth.api";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const { getMe , setUser , user } = useContext(GlobalContext);
  const navigate = useNavigate();

  async function handleLogin(username, password) {
    setLoading(true);
    try {
      const response = await login(username, password);
      return response;
    } catch (error) {
      throw error
    } finally {
      setLoading(false);
    }
  }
  
  async function handleRegister(email, username, password) {
    setLoading(true);
    try {
      const response = await register(email, username, password);
      return response;
    } catch (error) {
      throw error
    } finally {
      setLoading(false);
    }
  }
  
  async function isAuthorized() {
    setLoading(true);
    try {
      const response = await getMe();
        setUser(response.user)
        navigate("/");
    } catch (error) {
      if (error.status === 401) {
        return null;
      }
      console.log("this is error from isAuthorzied");
    }finally {
      setLoading(false);
    } 
  }

  return (
    <AuthContext.Provider
      value={{ loading, handleLogin, handleRegister, getMe , isAuthorized }}
    >
      {children}
    </AuthContext.Provider>
  );
}
