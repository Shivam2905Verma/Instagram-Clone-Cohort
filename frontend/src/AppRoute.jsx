import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";

const AppRoute = () => {
  return (
      <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
      </BrowserRouter>
  );
};

export default AppRoute;
