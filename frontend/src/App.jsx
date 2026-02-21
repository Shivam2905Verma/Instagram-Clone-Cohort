import AppRoute from "./AppRoute";
import { AuthProvider } from "./features/auth/authContext";

const App = () => {
  return (
    <AuthProvider>
      <AppRoute />
    </AuthProvider>
  );
};

export default App;
