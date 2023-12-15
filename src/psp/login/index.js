import * as client from "../client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo2 from "../images/logo2.png";
function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const signIn = async () => {
    try {
      const credentials = { username: username, password: password };
      const user = await client.signin(credentials);
      navigate("/psp/home");
    } catch (error) {
      setError("Your username or password is incorrect.");
    }
  };
  return (
    <div style={{ backgroundColor: '#F0FFFF', height: '4000px' }}>
      <div className="col-4 mx-auto">
      < img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
        <h1 style={{color: '#66CCCC', textAlign: 'center'}}>Log In</h1>
      </div>
      <div className="col-4 mx-auto">
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn} className="btn btn-primary">
          Log In
        </button>
      </div>
    </div>
  );
}

export default SignIn;