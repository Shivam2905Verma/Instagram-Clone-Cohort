import { useFeed } from "../hooks/useFeed";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { loading, user } = useFeed();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
