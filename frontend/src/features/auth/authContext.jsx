import { createContext } from "react";
import { login, register } from "./services/auth.api";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  async function handleLogin(username, password) {
    setLoading(true);
    try {
      const response = await login(username, password);
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(email, username, password) {
    setLoading(true);
    try {
      const response = await register(email, username, password);
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  <AuthContext.Provider value={{ loading, user, handleLogin, handleRegister }}>
    {children}
  </AuthContext.Provider>;
}

export default AuthProvider;
