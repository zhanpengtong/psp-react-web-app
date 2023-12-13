import React from "react";
import { Route, Routes } from "react-router-dom";
import allUser from "./allUser";
import * as client from "../client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import logo2 from "../images/logo2.png";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    role: "",
  });
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
    try {
      const status = await client.updateUser(user._id, user);
    //   setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
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
        <div className="col-4 mx-auto">
        < img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
          <h1 style={{color: '#66CCCC', textAlign: 'center'}}>Profile</h1>
        </div>
        <div className="col-4 mx-auto">
            {user && (
              <div>
                <label> First Name </label>
                <input
                  type="text"
                  className="form-control"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  />
                <br /><label> Last Name </label>
                <input
                  type="text"
                  className="form-control"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  />
                <br /><label> Username </label>
                <input
                  type="text"
                  className="form-control"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <br /><label> Password </label>
                <input
                  type="text"
                  className="form-control"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <br /><label> Email </label>
                <input
                  type="email"
                  className="form-control"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <br /><label> Phone Number </label>
                <input
                  type="text"
                  className="form-control"
                  value={user.phoneNumber}
                  onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                />
                <br /><label> Role </label>
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
                
                {["USER", "SELLER"].includes(user.role) && (
                  <Link to="/psp/profile/allUser" className="btn btn-warning">
                    All Users
                  </Link>
                )}
                
                {user.role === "ADMIN" && (
                  <Link to="/psp/profile/editUser" className="btn btn-warning">
                    Edit Users
                  </Link>
                )}
              </div>
            )}
          </div>
    </div>
  );
}
export default Profile;