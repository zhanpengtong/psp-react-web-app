import React from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../images/logo2.png';
import * as client from '../client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';



function Seller () {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setUser(user);
  };
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
    window.location.reload();
  };  
  
  const fetchUser = async () => {
    try {
      const user = await client.account();
      setUser(user);
    } catch (error) {
    }
  };
  const [sellerItems, setSellerItems] = useState(null);
  const fetchSellerItems = async () => {
    try {
      const sellerItems = await client.findSellerItems(user._id);
      setSellerItems(sellerItems);
    } catch (error) {
    }
  };
  const [items, setItems] = useState(
    {
      itemName: '',
      Price: Number(''),
      description: '',
      category: '',
      reviews: '[]',
    }
  );
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
      fetchSellerItems();
    }
  }
  , [user]);


  return (
    <div >
      <div className="col-4 mx-auto">
        < img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
        <h1 style={{color: '#66CCCC', textAlign: 'center'}}>Seller Page</h1>
      </div>
      <div>
        
        {!user && <h3>Please sign in to access this page</h3>}
        {user && (user.role === 'USER' || user.role === 'ADMIN') && <h1>Your are not Seller</h1>}
        {user && user.role === 'SELLER' && <div>
          <h3>Welcome {user.firstName} {user.lastName}</h3>
          <h4>Add your seller item here</h4>
          <label>Item Name</label>
          <input
            type="text"
            className="form-control"
            value={items.itemName}
            onChange={(e) => setItems({ ...items, itemName: e.target.value })}/>
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={items.Price}
            onChange={(e) => setItems({ ...items, Price: e.target.value })}/>
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={items.description}
            onChange={(e) => setItems({ ...items, description: e.target.value })}/>
          <label>Category</label>
          <select
            className="form-control"
            value={items.category}
            onChange={(e) => setItems({ ...items, category: e.target.value })}
          >
            <option value="">Select category</option>
            <option value="Toy">Toy</option>
            <option value="Dog Food">Dog Food</option>
            <option value="Cat Food">Cat Food</option>
          </select>
          <button onClick={() => { client.createItem(items.itemName, items.Price, items.description, items.category, items.reviews); openPopup();}} className="btn btn-primary">Add Item</button>

          {isPopupOpen && (
            <div className="popup">
              <p>Your item has been added successfully</p>
              <button onClick={ closePopup }>Close</button>
            </div>
          )}

          </div>}
      </div>
    </div>
  )
}
export default Seller;