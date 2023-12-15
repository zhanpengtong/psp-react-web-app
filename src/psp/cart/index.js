import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo2 from '../images/logo2.png';
import * as client from '../client';

function Cart() {
  const [user, setUser] = useState(null);
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const user = await client.account();
      setUser(user);
    } catch (error) {
      // Handle error here (e.g., navigate to login page or show error message)
    }
  };

  const fetchCarts = async () => {
    if (user) {
      const carts = await client.findCartByUserId(user._id);
      setCarts(carts);
    }
  };

  const deleteCart = async (userId, itemId) => {
    await client.deleteOneCartByUserId(userId, itemId);
    fetchCarts(); // Fetch updated cart list instead of reloading the page
  };

  const getTotalPrice = () => {
    return carts.reduce((total, cart) => total + cart.price, 0);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchCarts();
  }, [user]);

  return (
    <div style={{ backgroundColor: '#F0FFFF', height: '4000px' }}>
      <div className="col-4 mx-auto">
          <img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
          <h1 style={{ color: '#66CCCC', textAlign: 'center'}}>Cart</h1>
      </div>
      {user && (
        <div className="col-11 mx-auto">
          <h4 style={{ textAlign: 'left' }}>Welcome {user.firstName} {user.lastName}!</h4>
          <h5 style={{ textAlign: 'left' }}>Your Cart</h5>
          {carts.map((cart) => (
            <div key={cart._id} className="card">
              <div className="card-header">
                {cart.itemname}
              </div>
              <div className="card-body" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className="card-text">${cart.price}</p>
                <button className="btn btn-danger" onClick={() => deleteCart(cart.user, cart.itemId)}>Delete</button>
              </div>
            </div>
          ))}
          <div className="total-price" style={{ textAlign: 'right', marginTop: '40px' }}>
            <strong>Total Price: ${getTotalPrice().toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;