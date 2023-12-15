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
    }
  );
  const [sellList, setSellList] = useState(null);
  const fetchSellList = async () => {
    try {
      const data = await client.findItemBySellerId(user._id);
      setSellList(data);
    } catch (error) {
    }
  }
  const deleteItem = async (id) => {
    try {
      await client.deleteItemByitemId(id);
      fetchSellList();
    } catch (error) {
    }
  }
  const handelSelectItem = (item) => {
    setItems(item);
  }

  useEffect(() => {
    if (id) {
      findUserById(id);
    } else
      fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchSellerItems();
      fetchSellList();
    }
  }, [user]);

  return (
    <div style={{ backgroundColor: '#F0FFFF', height: '4000px' }} >
      <div className="col-4 mx-auto">
        <img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
        <h1 style={{ color: '#66CCCC', textAlign: 'center' }}>Seller Page</h1>
      </div>
      <div className="col-11 mx-auto">

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
            onChange={(e) => setItems({ ...items, itemName: e.target.value })} />
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={items.Price}
            onChange={(e) => setItems({ ...items, Price: e.target.value })} />
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={items.description}
            onChange={(e) => setItems({ ...items, description: e.target.value })} />
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
          <button style={{ marginRight: '5px' }}
            onClick={() => { client.createItem(user._id, items.itemName, items.Price, 
            items.description, items.category); openPopup(); }} 
            className="btn btn-primary">Add Item</button>
          <button onClick={() => { client.updateItem(items._id, items.itemName, 
            items.Price, items.description, items.category); window.location.reload();}} 
            className="btn btn-primary">Update</button>

          {isPopupOpen && (
            <div className="popup">
              <p>Your item has been added successfully</p>
              <button className="btn btn-primary" onClick={closePopup}>Close</button>
            </div>
          )}
          <br />

            <div className="row">
              {sellList && sellList.map((item) => (
                <div key={item._id} className="col-lg-4 col-md-6 mb-4">
                  <div className="card wd-card">
                    <img
                      src={item.imageURL} // Replace with your item's image URL
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h5 className="card-title">Name: {item.itemName}</h5>
                      <p className="card-text">Price: ${item.Price}</p>
                      <p className="card-text">Category: {item.category}</p>
                      <p className="card-text">Description: {item.description}</p>
                    </div>
                    <div className='card-bottom'>
                    <Link style={{ marginRight: '5px' }} className="btn btn-primary" to={`/psp/details/${item._id}`}> View Item </Link>
                      <button style={{ marginRight: '5px' }}
                        onClick={() => deleteItem(item._id)} className="btn btn-danger">Delete</button>
                      <button onClick={() => handelSelectItem(item)} className="btn btn-primary">Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>}
      </div>
    </div>
  )
}
export default Seller;