import React, { useState, useEffect } from "react";
import * as client from "../client";
import logo2 from "../images/logo2.png";
import { Link, useParams } from "react-router-dom";

function Alluser() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => { fetchUsers(); }, []);
  return (
    <div style={{ backgroundColor: '#F0FFFF', height: '4000px' }}>
      <div className="col-4 mx-auto">
        < img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
        <h1 style={{color: '#66CCCC', textAlign: 'center'}}>User List</h1>
      </div>
      <div className="col-11 mx-auto">
        <table className="table" >
          <thead>
            <tr>
              <th style={{ backgroundColor: '#F0FFFF' }}>Username</th>
              <th style={{ backgroundColor: '#F0FFFF' }}>First Name</th>
              <th style={{ backgroundColor: '#F0FFFF' }}>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} >
                <td style={{ backgroundColor: '#F0FFFF' }}><Link to={`/psp/profile/${user._id}`}>{user.username}</Link></td>
                <td style={{ backgroundColor: '#F0FFFF' }}>{user.firstName}</td>
                <td style={{ backgroundColor: '#F0FFFF' }}>{user.lastName}</td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Alluser;

