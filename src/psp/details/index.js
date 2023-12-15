import React from 'react';
import logo2 from '../images/logo2.png';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as client from '../client';
import { Card } from 'react-bootstrap';

function Details() {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    const [reviews, setReviews] = useState([]);

    const fetchItems = async () => {
        const items = await client.findItemById(id);
        setItem(items);
    };

    const fetchReviews = async () => {
        const reviews = await client.findReviewByItemId(id);
        setReviews(reviews);
    };

    const [review, setReview] = useState("");
    const handleReviewSubmit = async (review) => {
        const reviewUsername = user.username;
        const itemname = item.itemName;
        const status = await client.createReview(user._id, id, review, reviewUsername, itemname);
        window.location.reload();
    }    
    const [user, setUser] = useState(null);
    const fetchUser = async () => {
        try {
        const user = await client.account();
        setUser(user);
        } catch (error) {
        }
    };

    useEffect(() => {
        fetchUser();
        fetchItems();
        fetchReviews();
    }
    , []);

    return (
        <div style={{ backgroundColor: '#F0FFFF', height: '4000px' }}>
            <div className="col-4 mx-auto">
                <img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
                <h1 style={{ color: '#66CCCC', textAlign: 'center'}}>Details</h1>
            </div>
            <div className="col-11 mx-auto">
                <table className="table">
                    <tbody>
                        <tr>
                            <td style={{ backgroundColor: '#F0FFFF' }}>Item Name:</td>
                            <td style={{ backgroundColor: '#F0FFFF' }}>{item.itemName}</td>
                        </tr>
                        <tr>
                            <td style={{ backgroundColor: '#F0FFFF' }}>Price:</td>
                            <td style={{ backgroundColor: '#F0FFFF' }}>${item.Price}</td>
                        </tr>
                        <tr>
                            <td style={{ backgroundColor: '#F0FFFF' }}>Description:</td>
                            <td style={{ backgroundColor: '#F0FFFF' }}>{item.description}</td>
                        </tr>
                        <tr>
                            <td style={{ backgroundColor: '#F0FFFF' }}>Category:</td>
                            <td style={{ backgroundColor: '#F0FFFF' }}>{item.category}</td>
                        </tr>
                    </tbody>
                </table>
                {user && (
                    <div className="d-flex justify-content-end">
                                <button className="btn btn-primary"
                                    style={{ float: 'end' }}
                                    onClick={async () => { await client.addOneCartByUserId(
                                        user._id,
                                        item._id,
                                        user.username,
                                        item.itemName,
                                        item.Price
                                    );}}>
                                    Add to Cart
                                </button>
                    </div>
                )}
                <div>
                    {reviews.map((review) => (
                        <div key={review} >
                            <Card >
                                <Card.Body>
                                    <Card.Title>Review:</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted"><Link to={`/psp/profile/${review.user}`}>By User: {review.username}</Link></Card.Subtitle>
                                    <Card.Text>{review.review}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
                {user && (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Write a Review:</h5>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary float-end" onClick={() => handleReviewSubmit(review)} > Submit </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Details;