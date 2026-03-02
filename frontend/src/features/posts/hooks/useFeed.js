import { useContext, useEffect } from "react";
import { PostContext } from "../postContext";
import { getMe } from "../services/feedApi";

export function useFeed() {
  const context = useContext(PostContext);
  const { setLoading, setUser } = context;

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
    isUserAuth();
  } , []);

  return context;
}
