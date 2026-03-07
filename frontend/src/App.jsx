import { AuthProvider } from "./features/auth/authContext";
import { PostProvider } from "./features/posts/postContext";
import { GlobalProvider } from "./GlobalContext";
import {ProfileProvider} from "./features/profile/ProfileContext";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoute from "./AppRoute";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";

const App = () => {
  return (
   <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <PostProvider>
            <ProfileProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/*" element={<AppRoute />} />
              </Routes>
            </ProfileProvider>
          </PostProvider>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default App;
