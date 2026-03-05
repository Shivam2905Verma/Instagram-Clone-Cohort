import { useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import "../style/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../GlobalContext.jsx";

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const { setUser } = useContext(GlobalContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await handleLogin(username, password);
    console.log(res);

    navigate("/");
    setUser(res.user);
  }

  if (loading) {
    return <h1>Loading....</h1>;
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
        />
        <input
          className="authinput"
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Password"
          value={password}
        />
        <button className="button login-Btn">Login</button>
      </form>
      <h4 className="accQue">
        Don't have an account ? <Link to={"/register"}>Sign Up</Link>{" "}
      </h4>
    </div>
  );
};

export default Login;
