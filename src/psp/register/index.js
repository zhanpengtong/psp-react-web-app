import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "../client";
function Register() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({
    firstName: "", lastName: "", username: "", password: "", email: "", phoneNumber: "", role: ""
  });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(credentials);
      navigate("/psp/profile");
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1 style={{color: '#66CCCC'}}>Register</h1>
      {error && <div>{error}</div>}
      <input
        type="text"
        className="form-control"
        value={credentials.firstName}
        onChange={(e) => setCredentials({
          ...credentials,
          firstName: e.target.value
        })}
        placeholder="First Name"
      />
      <input
        type="text"
        className="form-control"
        value={credentials.lastName}
        onChange={(e) => setCredentials({
          ...credentials,
          lastName: e.target.value
        })}
        placeholder="Last Name"
      />
      <input
        type="text"
        className="form-control"
        value={credentials.username}
        onChange={(e) => setCredentials({
          ...credentials,
          username: e.target.value
        })}
        placeholder="Username"
      />
      <input
        type="text"
        className="form-control"
        value={credentials.password}
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value
        })}
        placeholder="Password"
      />
      <input
        type="text"
        className="form-control"
        value={credentials.email}
        onChange={(e) => setCredentials({
          ...credentials,
          email: e.target.value
        })}
        placeholder="Email"
      />
      <input
        type="text"
        className="form-control"
        value={credentials.phoneNumber}
        onChange={(e) => setCredentials({
          ...credentials,
          phoneNumber: e.target.value
        })}
        placeholder="Phone Number"
      />
      <select
        className="form-control"
        value={credentials.role}
        onChange={(e) => setCredentials({
          ...credentials,
          role: e.target.value
        })}
      >
        <option value="">Choose Role</option>
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
        <option value="SELLER">SELLER</option>
      </select>
      <button className="btn btn-primary" onClick={signup}>
        Signup
      </button>
    </div>
  );
}
export default Register;