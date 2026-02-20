import "../style/auth.scss";

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  function handleLogin(e) {
    e.preventDefault();
  }

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
          value={username}
        />
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="password"
          value={password}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
