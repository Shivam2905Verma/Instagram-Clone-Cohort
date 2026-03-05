import { BrowserRouter } from "react-router-dom";
import AppRoute from "./AppRoute";
import { AuthProvider } from "./features/auth/authContext";
import { PostProvider } from "./features/posts/postContext";
import { GlobalProvider } from "./GlobalContext";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <AuthProvider>
          <PostProvider>
            <AppRoute />
          </PostProvider>
        </AuthProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default App;
