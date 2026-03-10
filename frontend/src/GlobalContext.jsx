import axios from "axios";
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [feedData, setFeedData] = useState([]);
  const [createPostVisible, setcreatePostVisible] = useState(false);

  const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
  });

  async function getMe() {
    try {
      const response = await api.get("/api/auth/get-me");
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        getMe,
        createPostVisible,
        setcreatePostVisible,
        feedData,
        setFeedData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
