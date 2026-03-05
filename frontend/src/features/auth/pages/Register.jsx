import { useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../GlobalContext";

const Register = () => {
  const { setUser} = useContext(GlobalContext)
  const { handleRegister, loading  } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await handleRegister(email, username, password);
    console.log(res);
    navigate("/")
    setUser(res.user)
  }
  
  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
        className="authinput"
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          value={email}
        />
        <input
        className="authinput"
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          value={username}
        />
        <input
        className="authinput"
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Password"
          value={password}
        />
        <button className="button register-Btn">register</button>
      </form>
      <h4 className="accQue">
        Have an account ? <Link to={"/login"}>Login</Link>{" "}
      </h4>
    </div>
  );
};

export default Register;
