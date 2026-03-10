import { createContext, useContext, useEffect, useState } from "react";
import { loadUserProfileData, updateUserProfile } from "./services/profileApi";
import { GlobalContext } from "../../GlobalContext";

export const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
  const { user } = useContext(GlobalContext);
  const [data, setData] = useState();
  const [editBoxOpen, setEditBoxOpen] = useState(false);
  const [laoding, setLoading] = useState(false);

  async function laodUserData() {
    try {
      setLoading(true);
      const res = await loadUserProfileData();
      setData(res.posts);
    } catch (error) {
      console.log("this is from load user data");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateUserProfile(formdata) {
    try {
      const res = await updateUserProfile(formdata);
      return res;
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (user) {
      laodUserData();
    }
  }, [user]);

  return (
    <ProfileContext.Provider
      value={{
        data,
        editBoxOpen,
        setEditBoxOpen,
        laoding,
        handleUpdateUserProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
