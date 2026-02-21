import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Register = () => {
  const { handleRegister, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (loading) {
    return <h1>Loading....</h1>;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await handleRegister(email, username, password);
    console.log(res);
  }

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
          value={email}
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
          value={username}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Password"
          value={password}
        />
        <button className="button register-Btn">register</button>
      </form>
      <h3 className="accQue">
        Have an account ? <Link to={"/login"}>Login</Link>{" "}
      </h3>
    </div>
  );
};

export default Register;
