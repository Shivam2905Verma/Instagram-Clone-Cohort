import { useContext } from "react";
import { ProfileContext } from "../ProfileContext";

const useProfile = () => {
  const context = useContext(ProfileContext);

  return context;
};

export default useProfile;
