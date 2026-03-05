import { Routes, Route, BrowserRouter } from "react-router-dom";
import Feed from "./features/posts/pages/Feed.jsx";
import Login from "./features/auth/pages/Login.jsx";
import Register from "./features/auth/pages/Register.jsx";
import Protected from "./features/posts/components/Protected.jsx";

const AppRoute = () => {
  return (
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Feed />
            </Protected>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  );
};

export default AppRoute;
