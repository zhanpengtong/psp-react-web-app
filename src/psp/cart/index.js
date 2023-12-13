import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../images/logo2.png';
import * as client from '../client';
import { useParams, useNavigate } from 'react-router-dom';

function Cart() {
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

  const [cartItems, setCartItems] = useState(null);
  const findCartItems = async (id) => {
    const cartItems = await client.findCartItems(id);
    setCartItems(cartItems);
  };
  const [items, setItems] = useState([]);
  const whatIsInCart = async (items) => {
    const itemsInCart = await Promise.all(items.map(async (item) => {
      const cartItems = await client.findItemById(item);
      return cartItems;
    }));
  
    setItems(itemsInCart);
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
    if (user) {
      findCartItems(user._id);
    }
  }
  , [user]);

  useEffect(() => {
    if (cartItems) {
      whatIsInCart(cartItems);
    }
  }
  , [cartItems]);

  return (
    <div>
      <div>
        <img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
        <h1 style={{ color: '#66CCCC', textAlign: 'center' }}>Cart</h1>
        {user && <p>User ID: {user._id}</p>}
        {items && items.map((item) => (
          <div key={item._id}>
            <p>Item Name: {item.itemName}</p>
            <p>Price: {item.Price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
