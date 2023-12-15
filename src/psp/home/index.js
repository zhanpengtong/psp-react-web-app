import React, { useState, useEffect } from "react";
import * as client from "../client";
import logo2 from "../images/logo2.png";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function Home() {
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    const items = await client.findAllItem();
    setItems(items);
  };
  const { id } = useParams();
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div style={{ backgroundColor: '#F0FFFF', height: '4000px' }}>
      <div className="col mx-auto text-end">
        <Link style={{ marginRight: '5px' }} to="/psp/login" className="btn btn-primary">Log In</Link>
        <button onClick={signout} className="btn btn-danger">Sign Out</button>
      </div>
      <div className="col-4 mx-auto">
          <img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
          <h1 style={{ color: '#66CCCC', textAlign: 'center'}}>Home</h1>
        </div>
        {user && (
          <h3 className="col-11 mx-auto">Welcome {user.firstName} {user.lastName}</h3>
        )}
        {items.map((item) => (
          <div className="col-11 mx-auto card" key={item.id} >
            <div className="card-header">
              <h3>{item.itemName}</h3>
            </div>
            <div className="card-body">
              <p className="card-text">Category: {item.category}</p>
              <p className="card-text" style={{ float: 'right' }}>Price: ${item.Price}</p>
              <div style={{ clear: 'both' }}></div> {/* Clears the float */}
              <div className="button-group" style={{ marginTop: '20px' }}>
                {user && (
                  <button onClick={async () => { await client.addOneCartByUserId(
                        user._id,
                        item._id,
                        user.username,
                        item.itemName,
                        item.Price
                      );}}
                    className="btn btn-primary"
                    style={{ marginRight: '10px' }}>
                    Add to Cart
                  </button>
                )}
                <Link to={`/psp/details/${item._id}`} className="btn btn-primary">
                  See details
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
        export default Home;



