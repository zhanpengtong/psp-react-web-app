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
  const addItem = async (userId, itemId) => {
    const status = await client.addToCart(userId, itemId);
  }

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
    <div>
      <div className="col mx-auto text-end">
        <Link to="/psp/login" className="btn btn-primary">Log In</Link>
        <button onClick={signout} className="btn btn-danger">Sign Out</button>
      </div>
      <div className="col-4 mx-auto">
          <img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
          <h1 style={{ color: '#66CCCC', textAlign: 'center'}}>Home</h1>
        </div>
        <div className=" mx-auto">
          {items.map((item) => (
            <div key={item.id}>
              <table className="table">
                <tbody>
                  <tr>
                    <td className="table-primary">
                      <Link to={`/psp/item/${item._id}`}>{item.itemName}</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{item.category}</p>
                      <p style={{ float: 'right' }}>${item.Price}</p>
                      {user && (
                        <td>
                          <button onClick={() => addItem(user._id, item._id)} className="btn btn-primary">Add to Cart</button>
                        </td>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
}
        export default Home;
