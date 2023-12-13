import React, { useState, useEffect } from "react";
import * as client from "../client";
import logo2 from "../images/logo2.png";
function Alluser() {
  const [users, setUsers] = useState([]);
  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };
  useEffect(() => { fetchUsers(); }, []);
  return (
    <div>
      <div className="col-4 mx-auto">
        < img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
        <h1 style={{color: '#66CCCC', textAlign: 'center'}}>User List</h1>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
              </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Alluser;

