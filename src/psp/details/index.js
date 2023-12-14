import React from 'react';
import logo2 from '../images/logo2.png';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as client from '../client';

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
        const status = await client.createReview(user._id, id, review);
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
        <div>
            <div className="col-4 mx-auto">
                <img src={logo2} alt="Pet Supplies Pro Logo" style={{ width: '250px', height: 'auto', display: 'block', margin: 'auto' }} />
                <h1 style={{ color: '#66CCCC', textAlign: 'center'}}>Details</h1>
            </div>
            <div>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Item Name:</td>
                            <td>{item.itemName}</td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td>${item.Price}</td>
                        </tr>
                        <tr>
                            <td>Description:</td>
                            <td>{item.description}</td>
                        </tr>
                        <tr>
                            <td>Category:</td>
                            <td>{item.category}</td>
                        </tr>
                    </tbody>
                </table>
                <table className="table">
                    {reviews.map((review) => (
                        <tr key={review}>
                            <td>Review:</td>
                            <td>{review.user}</td>
                            <td>{review.review}</td>
                        </tr>
                    ))}
                </table>
                {user && (<table className="table">
                    <tr>
                        <td>Write a Review:</td>
                        <td>
                            <input type="text" value={review} onChange={(e) => setReview(e.target.value)} />
                        </td>
                        <td>
                            <button onClick={() => handleReviewSubmit(review)} className="btn btn-primary">Submit</button>
                        </td>
                    </tr>
                </table>)}
            </div>
        </div>
    )
}

export default Details;