import { createContext, useContext, useEffect, useState } from "react";
import { loadData } from "./services/feedApi";
import { GlobalContext } from "../../GlobalContext";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const { user, setUser, feedData, setFeedData, getMe } =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  async function loadFeed() {
    try {
      setLoading(true);
      const res = await loadData();
      setFeedData(res.feed);
    } catch (error) {
      console.log("There is a error in loading data" , error);
    } finally {
      setLoading(false);
    }
  }

  async function isUserAuth() {
    try {
      const res = await getMe();
      setUser(res.user);
    } catch (error) {
      if (error.response?.status === 401) {
        return null;
      } else {
        console.log("Error fetching user:", error);
      }
    }
  }

  useEffect(() => {
    if (!user) {
      isUserAuth();
    }
    if (user) {
      loadFeed();
    }
  }, [user]);

  return (
    <PostContext.Provider
      value={{
        feedData,
        setFeedData,
        loading,
        isUserAuth,
        loadFeed,
        user,
        setUser,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
