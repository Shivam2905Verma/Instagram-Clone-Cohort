import { useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import "../style/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../GlobalContext.jsx";

const Login = () => {
  const { handleLogin, loading, isAuthorized } = useAuth();
  const { setUser } = useContext(GlobalContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await handleLogin(username, password);
      console.log(res.message)
      setUser(res.user);
      navigate("/");
    } catch (error) {
      if(error.response?.data){
        setErrorMessage(error.response?.data.message)
      }else{
        console.log("This is error frrom login function" , error);
      }
    }
  }

  useEffect(() => {
    const hasToken = document.cookie.includes("token");

    if (!hasToken) return;

    isAuthorized();
  }, []);

  if (loading) {
    return (
      <div className="Loadingpage">
        <h1>Loading....</h1>
      </div>
  );
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          className="authinput"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username or Email"
          value={username}
          required
          />
        <input
          className="authinput"
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Password"
          value={password}
          required
        />
        <p className="errorMessage">{errorMessage ? errorMessage : ""}</p>
        <button className="button login-Btn">Login</button>
      </form>
      <h4 className="accQue">
        Don't have an account ? <Link to={"/register"}>Sign Up</Link>{" "}
      </h4>
    </div>
  );
};

export default Login;
