import React from "react";
import { useFeed } from "../hooks/useFeed";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { loading, user } = useFeed();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return navigate("/login");
  }

  return children;
};

export default Protected;
