import React, { useState, useEffect } from "react";
import {  BsFillCheckCircleFill, BsPencil, BsPlusCircleFill, BsTrash3Fill  } from "react-icons/bs";
import * as client from "../client";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo2 from "../images/logo2.png";

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
  const fetchUser = async () => {
    try {
      const user = await client.account();
      setUser(user);
    } catch (error) {
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => { fetchUsers(); }, []);
  useEffect(() => { fetchUser(); }, []);
  console.log(user.role);
  
  return (
    <div style={{ backgroundColor: '#F0FFFF', height: '4000px' }}>
        <div className="col-4 mx-auto">
            < img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
            <h1 style={{color: '#66CCCC', textAlign: 'center'}}>User List</h1>
        </div>
        {user.role !== 'ADMIN' && <h1>Your are not able to use this page.</h1>}
        {user.role === 'ADMIN' &&
          <div className="col-11 mx-auto">
            <table className="table" >
              <thead>
                <tr >
                  <th style={{ backgroundColor: '#F0FFFF' }}>Username
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="username"
                        value={user.username} 
                        onChange={(e) => setUser({ ...user, username: e.target.value })}/>
                  </th>
                  <th style={{ backgroundColor: '#F0FFFF' }}>Password
                    <input 
                        type="passwrd"
                        className="form-control"
                        placeholder="password"
                        value={user.password} 
                        onChange={(e) => setUser({ ...user, password: e.target.value })}/>
                  </th>
                  <th style={{ backgroundColor: '#F0FFFF' }}>First Name
                    <input 
                        ype="text"
                        className="form-control"
                        placeholder="first name"
                        value={user.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}/>
                  </th>
                  <th style={{ backgroundColor: '#F0FFFF' }}>Last Name
                    <input 
                        type="text"
                        className="form-control"
                        placeholder="last name"
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}/>
                  </th>
                  <th style={{ backgroundColor: '#F0FFFF' }}>Role
                    <select 
                        className="form-control"
                        value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="SELLER">SELLER</option>
                      </select>
                  </th>
                  <td style={{ backgroundColor: '#F0FFFF' }}>
                      <BsFillCheckCircleFill onClick={updateUser} 
                          className="me-2 text-success fs-1 text" />
                  </td>
                </tr>
              </thead>
              <tbody >
                {users.map((user) => (
                  <tr key={user._id} >
                    <td style={{ backgroundColor: '#F0FFFF' }}><Link style={{ backgroundColor: '#F0FFFF' }} to={`/psp/profile/${user._id}`}>{user.username}</Link></td>
                    <td style={{ backgroundColor: '#F0FFFF' }}>{user.password}</td>
                    <td style={{ backgroundColor: '#F0FFFF' }}>{user.firstName}</td>
                    <td style={{ backgroundColor: '#F0FFFF' }}>{user.lastName}</td>
                    <td style={{ backgroundColor: '#F0FFFF' }}>{user.role}</td>
                    <td style={{ backgroundColor: '#F0FFFF' }} className="text-nowrap">
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
        }
    </div> 
  );
}
export default EditUser;

