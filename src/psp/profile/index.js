import { set } from "mongoose";
import * as client from "../client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const fakeUser = {
    firstName: "first name",
    lastName: "last name",
    username: "username",
    password: "password",
    email: "email",
    phoneNumber: "phone number",
    role: "USER",
  };
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setUser(user);
  };
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const user = await client.account();
      setUser(user);
    } catch (error) {
      setUser(fakeUser);
    }
  };
  const save = async () => {
    const status = await client.updateUser(user._id, user);
  };
  const updateUser = async () => {
    const status = await client.updateUser(user._id, user);
  };
  
  const signout = async () => {
    const status = await client.signout();
    navigate("/psp/login");
  };
  useEffect(() => {
    if (id) {
      findUserById(id);
    } else
    fetchUser();
  }, []);
  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <input
            type="text"
            className="form-control"
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          <input
            type="text"
            className="form-control"
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          <input
            type="text"
            className="form-control"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <input
            type="email"
            className="form-control"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="text"
            className="form-control"
            value={user.phoneNumber}
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
          />
          <select
            className="form-control"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          >
            <option value="SELLER">SELLER</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select>
          <button onClick={updateUser} className="btn btn-primary">
            Update
          </button>
          <button onClick={signout} className="btn btn-danger">
            Sign Out
          </button>
          <button onClick={save} className="btn btn-primary" >
            Save
          </button>

          {user.role === "ADMIN" && (
            <Link to="/project/admin/users" className="btn btn-warning">
              Users
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
export default Profile;