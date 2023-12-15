import React from "react";
import * as client from "../client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import logo2 from "../images/logo2.png";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
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
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user._id, user);
      const username = user.username;
      const password = user.password;
      signout();
      const credentials = { username, password };
      const signinStatus = await client.signin(credentials);
      navigate("/psp/profile");
    } catch (err) {
      console.log(err);
    }
  };
  const userIId = user._id || id;
  const [lists, setlists] = useState([]);
  const fetchReviewsById = async () => {
    const lists = await client.findReviewByUserId(userIId);
    setlists(lists);
  };
  
  const signout = async () => {
    const status = await client.signout();
    navigate("/psp/login");
  };
  useEffect(() => {
    if (id) {
      findUserById(id);
      fetchReviewsById();
    } else
    fetchUser();
  }, []);


 
  return (
    <div style={{ backgroundColor: '#F0FFFF', height: '4000px' }}>
        <div className="col-5 mx-auto">
        < img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
          <h1 style={{color: '#66CCCC', textAlign: 'center'}}>Profile</h1>
        </div>
        <div className="col-5 mx-auto">
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
              </div>
            )}
            {(!id) && (
              <div>
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
                <button style={{ marginRight: '5px' }} onClick={updateUser} className="btn btn-primary">
                  Update
                </button>
                <button style={{ marginRight: '5px' }} onClick={signout} className="btn btn-danger">
                  Sign Out
                </button>
                
                {user.role !== "ADMIN" && (
                  <Link style={{ marginRight: '5px' }} to="/psp/profile/allUser" className="btn btn-warning">
                    All Users
                  </Link>
                )}
                  
                {user.role === "ADMIN" && (
                  <Link style={{ marginRight: '5px' }} to="/psp/profile/editUser" className="btn btn-warning">
                    Edit Users
                  </Link>
                )}
                <button onClick={fetchReviewsById} className="btn btn-primary"> Refresh Review List </button>
              </div>
            )}
            <div>
              <h3>Review List:</h3>
              <ul>
                {lists.map((list) => (
                  <li key={list._id}>
                    <Link to={`/psp/details/${list.itemId}`}>{list.itemname}</Link>
                  </li>
                ))}
              </ul>
            </div>
      </div>
    </div>
  );
}
export default Profile;