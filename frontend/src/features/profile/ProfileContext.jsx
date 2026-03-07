import { createContext, useState } from "react";

export const ProfileContext = createContext({});

export const ProfileProvider = ({ children }) => {

  const [data, setData] = useState()

  return <ProfileContext.Provider value={data}>{children}</ProfileContext.Provider>;
};
