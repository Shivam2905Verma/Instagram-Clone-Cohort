import { createContext, useState } from "react";
import { login, register } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

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

  return (
    <AuthContext.Provider
      value={{ loading, user, handleLogin, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
}
