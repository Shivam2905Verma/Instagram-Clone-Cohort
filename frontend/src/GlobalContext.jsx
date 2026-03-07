import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [feedData, setFeedData] = useState([]);
  const [createPostVisible, setcreatePostVisible] = useState(false);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, createPostVisible, setcreatePostVisible , feedData, setFeedData }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
