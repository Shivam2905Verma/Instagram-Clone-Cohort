import { useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../GlobalContext";

const Register = () => {
  const { setUser } = useContext(GlobalContext);
  const { handleRegister, loading, isAuthorized } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await handleRegister(email, username, password);
      setUser(res.user);
      navigate("/");
    } catch (error) {
      if (error.response?.data) {
        setErrorMessage(error.response?.data.message);
      } else {
        console.log("This is error frrom register function", error);
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
        <h1>Register</h1>
        <input
          className="authinput"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          value={email}
          required
        />
        <input
          className="authinput"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
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
        <button className="button register-Btn">register</button>
      </form>
      <h4 className="accQue">
        Have an account ? <Link to={"/login"}>Login</Link>{" "}
      </h4>
    </div>
  );
};

export default Register;
