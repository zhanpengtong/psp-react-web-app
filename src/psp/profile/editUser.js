import React, { useState, useEffect } from "react";
import {  BsFillCheckCircleFill, BsPencil, BsPlusCircleFill, BsTrash3Fill  } from "react-icons/bs";
import * as client from "../client";
import { Link, Navigate, useNavigate } from "react-router-dom";
function EditUser() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ username: "", password: "", firstName: "", lastName: "", role: "USER"});
  const createUser = async () => {
    try {
      const status = await client.createUser(user.username, user.password, user.firstName, user.lastName, user.role);
      // setUsers([...users, user]);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  const selectUser = async (user) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user._id, user);
    //   setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };
  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user._id);
      // setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };



  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => { fetchUsers(); }, []);
  return (
    <div>
      <h1 style={{color: '#66CCCC'}}>User List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          <tr >
            <td>
              <input 
                type="text"
                className="form-control"
                placeholder="username"
                value={user.username} 
                onChange={(e) => setUser({ ...user, username: e.target.value })}/>
              <input 
                type="passwrd"
                className="form-control"
                placeholder="password"
                value={user.password} 
                onChange={(e) => setUser({ ...user, password: e.target.value })}/>
            </td>
            <td>
              <input 
                ype="text"
                className="form-control"
                placeholder="first name"
                value={user.firstName}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}/>
            </td>
            <td>
              <input 
                type="text"
                className="form-control"
                placeholder="last name"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}/>
            </td>
            <td>
              <select 
                className="form-control"
                value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="SELLER">SELLER</option>
              </select>
            </td>
            <td>
                <BsFillCheckCircleFill onClick={updateUser}
                    className="me-2 text-success fs-1 text" />
                <BsPlusCircleFill onClick={createUser}
                    className="text-success fs-1 text" />
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td className="text-nowrap">
                 <button className="btn btn-danger me-2">
                    <BsTrash3Fill onClick={() => deleteUser(user)} />
                 </button>
                 <button className="btn btn-warning me-2">
                    <BsPencil onClick={() => selectUser(user)} />
                 </button>
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}
export default EditUser;

