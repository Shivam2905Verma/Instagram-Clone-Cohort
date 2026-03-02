import AppRoute from "./AppRoute";
import { AuthProvider } from "./features/auth/authContext";
import { PostProvider } from "./features/posts/postContext";

const App = () => {
  return (
    <PostProvider>
      <AuthProvider>
        <AppRoute />
      </AuthProvider>
    </PostProvider>
  );
};

export default App;
