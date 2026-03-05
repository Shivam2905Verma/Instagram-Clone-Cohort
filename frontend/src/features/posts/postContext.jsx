import { createContext, useContext, useEffect, useState } from "react";
import { getMe, loadData } from "./services/feedApi";
import { GlobalContext } from "../../GlobalContext";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const {user , setUser} = useContext(GlobalContext)
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  async function loadFeed() {
    try {
      const res = await loadData();
      setData(res.feed);
    } catch (error) {
      console.log("this is the error in the feed.jsx", error);
    }
  }

  async function isUserAuth() {
    try {
      setLoading(true);
      const res = await getMe();
      setUser(res.user);
    } catch (error) {
      console.log("this error is from isuserAuth");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(!user){
      isUserAuth();
    }
    loadFeed();
  }, []);

  return (
    <PostContext.Provider
      value={{ data, setData, loading, setLoading, user, setUser }}
    >
      {children}
    </PostContext.Provider>
  );
};
