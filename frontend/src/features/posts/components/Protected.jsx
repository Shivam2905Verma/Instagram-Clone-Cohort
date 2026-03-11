import { useFeed } from "../hooks/useFeed";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { loading, user } = useFeed();
  
  if (loading) {
    return (
      <div className="Loadingpage">
        <h1>Loading....</h1>
      </div>
    );
  }

  if (!user && !loading) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;
