import { createContext, useEffect, useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [data, setData] = useState();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    <PostContext.Provider
      value={{ data, setData, loading, setLoading, user, setUser }}
    >
      {children}
    </PostContext.Provider>
  );
};
