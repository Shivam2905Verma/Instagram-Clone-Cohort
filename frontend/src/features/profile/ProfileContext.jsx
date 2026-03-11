import { createContext,useState } from "react";
import {
  followUser,
  isFollowed,
  loadUserProfileData,
  loadUserProfilePost,
  unFollowUser,
  updateUserProfile,
} from "./services/profileApi";

export const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {
  const [profilePostdata, setProfilePostData] = useState([]);
  const [editBoxOpen, setEditBoxOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleUserProfilePosts(id) {
    try {
      setLoading(true);
      const res = await loadUserProfilePost(id);
      setProfilePostData(res.posts);
    } catch (error) {
      console.log("This error come from load user profile posts", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleUserProfileData(id) {
    try {
      setLoading(true);
      const res = await loadUserProfileData(id);
      return res
    } catch (error) {
      throw error
    } finally {
      setLoading(false);
    }
  }

  async function handleUserSavedData() {
    setProfilePostData([]);
  }

  async function handleUpdateUserProfile(formdata) {
    try {
      setLoading(true);
      const res = await updateUserProfile(formdata);
      return res;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function handleFollowUser(id) {
    try {
      const res = await followUser(id);
      return res;
    } catch (error) {
      console.log("This error come from follow", error);
    }
  }

  async function handleUnFollowUser(id) {
    try {
      const res = await unFollowUser(id);
      return res;
    } catch (error) {
      console.log("This error come from unfollow", error);
    }
  }
  async function handleIsFollowed(id) {
    try {
      const res = await isFollowed(id);
      return res;
    } catch (error) {
      throw error
    }
  }

  return (
    <ProfileContext.Provider
      value={{
        profilePostdata,
        loading,
        editBoxOpen,
        setProfilePostData,
        setEditBoxOpen,
        handleUserProfileData,
        handleUserProfilePosts,
        handleUserSavedData,
        handleFollowUser,
        handleUnFollowUser,
        handleIsFollowed,
        handleUpdateUserProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
