import { Routes, Route } from "react-router-dom";
import Feed from "./features/posts/pages/Feed.jsx";
import Protected from "./features/posts/components/Protected.jsx";
import Profile from "./features/profile/page/Profile.jsx";
import SideBar from "./components/SideBar.jsx";
import CreatePost from "./components/CreatePost.jsx";

const AppRoute = () => {
  return (
    <>
      <SideBar />
      <CreatePost />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <Feed />
            </Protected>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoute;
