import React, { useState, useEffect } from "react";
// import { API_KEY } from "./client";
import * as client from "../client.js";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo2 from "../images/logo2.png";
import "./index.css";

function Search() {
  const search = window.location.pathname.split("/")[3];
  const [searchTerm, setSearchTerm] = useState(search);
  const [results, setResults] = useState(null);
  const navigate = useNavigate();
  

  const [user, setUser] = useState(null);
  const findUserById = async (id) => {
    const user = await client.findUserById(id);
    setUser(user);
  };
  const fetchUser = async () => {
    try {
      const user = await client.account();
      setUser(user);
    } catch (error) {
    }
  };
  const fetchAllItem = async (searchTerm) => {
    try {
      const data = await client.searchItem(searchTerm);
      setResults(data);
    } catch (error) {
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchAllItem(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchUser();
  }
  , []);

  return (
    <div style={{ backgroundColor: '#F0FFFF', height: '4000px' }}>
      <div className="col-4 mx-auto">
      < img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
        <h1 style={{color: '#66CCCC', textAlign: 'center'}}>Search</h1>
      </div>
      <div className="col-11 mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        <button
          onClick={() => navigate(`/psp/search/${searchTerm}`)}
          className="btn btn-primary float-end"
        >
          Search
        </button>
      </div>
      <br />
      <h2 className="col-11 mx-auto">Results:</h2>
      <br />
      {results && (
        <table className="card-group col-11 mx-auto">
          <tbody>
            {results.map((item) => (
              <tr className="card" key={item.id}>
                <td className="card-header">
                  <h3>{item.itemName}</h3>
                </td>
                <td className="card-body">
                  <h5>Price: ${item.Price}</h5>
                  <h5>Category: {item.category}</h5>
                  <h5>Description: </h5>
                  <p>{item.description}</p>
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
                  <Link className="btn btn-primary" to={`/psp/details/${item._id}`}> View Item </Link>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}

export default Search;