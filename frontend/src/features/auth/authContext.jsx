import { createContext, useEffect, useState } from "react";
import { login, register, getMe } from "./services/auth.api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate();
  
  async function handleLogin(username, password) {
    setLoading(true);
    try {
      const response = await login(username, password);
      setUser(response.user);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(email, username, password) {
    setLoading(true);
    try {
      const response = await register(email, username, password);
      setUser(response.user);
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function isAuthorized() {
    try {
      const response = await getMe();
      if (response.status == 200) {
        navigate("/");
      }
    } catch (error) {
      console.log("User not authenticated");
    }
  }

  useEffect(() => {
    isAuthorized();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loading, user, handleLogin, handleRegister, getMe }}
    >
      {children}
    </AuthContext.Provider>
  );
}
