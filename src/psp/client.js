import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";
const USERS_API = `${API_BASE}/api/users`;
const ITEMS_API = `${API_BASE}/api/items`;
const REVIEWS_API = `${API_BASE}/api/reviews`;
const CARTS_API = `${API_BASE}/api/carts`;
const request = axios.create({
  withCredentials: true,
});


// User API
export const signin = async (credentials) => {
  const response = await request.post(`${USERS_API}/signin`, credentials);
  return response.data;
};
export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};

export const account = async () => {
  const response = await request.post(`${USERS_API}/account`);
  return response.data;
};

export const findAllUsers = async () => {
  const response = await request.get(USERS_API);
  return response.data;
};

export const findUserById = async (id) => {
  const response = await request.get(`${USERS_API}/${id}`);
  return response.data;
};

export const findUserByCredentials = async (username, password) => {
  const response = await request.get(
    `${USERS_API}/credentials/${username}/${password}`
  );
  return response.data;
}

export const updateUser = async (id, user) => {
  const response = await request.put(`${USERS_API}/${id}`, user);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await request.delete(`${USERS_API}/delete/${id}`);
  return response.data;
};

export const createUser = async (firstName, lastName, username, password, email, phoneNumber, role) => {
  const response = await request.get(`${USERS_API}/creat/${firstName}/${lastName}/${username}/${password}/${email}/${phoneNumber}/${role}`);
  return response.data;
};

export const signup = async (credentials) => {
  const response = await request.post(
    `${USERS_API}/signup`, credentials);
  return response.data;
};

export const findCartItems = async (id) => {
  const response = await request.get(`${USERS_API}/cart/${id}`);
  return response.data;
}

export const findSellerItems = async (id) => {
  const response = await request.get(`${USERS_API}/seller/${id}`);
  return response.data;
}

export const addToCart = async (id, itemId) => {
  const response = await request.put(`${USERS_API}/addcart/${id}/${itemId}`);
  return response.data;
}

export const removeFromCart = async (id, itemId) => {
  const response = await request.put(`${USERS_API}/removecart/${id}/${itemId}`);
  return response.data;
}

export const addToSeller = async (id, itemId) => {
  const response = await request.put(`${USERS_API}/addseller/${id}/${itemId}`);
  return response.data;
}

export const removeFromSeller = async (id, itemId) => {
  const response = await request.put(`${USERS_API}/removeseller/${id}/${itemId}`);
  return response.data;
}

export const clearCart = async (id) => {
  const response = await request.put(`${USERS_API}/clearcart/${id}`);
  return response.data;
}

export const clearSeller = async (id) => {
  const response = await request.put(`${USERS_API}/clearseller/${id}`);
  return response.data;
}


// Item API
export const findItemByName = async (itemName) => {
  const response = await request.get(`${ITEMS_API}/findbyname/${itemName}`);
  return response.data;
}
export const findItemByCategory = async (category) => {
  const response = await request.get(`${ITEMS_API}/category/${category}`);
  return response.data;
}
export const findAllItem = async () => {
  const response = await request.get(`${ITEMS_API}`);
  return response.data;
}
export const findItemById = async (id) => {
  const response = await request.get(`${ITEMS_API}/${id}`);
  return response.data;
}
export const createItem = async (userId, itemName, Price, description, category) => {
  const response = await request.post(`${ITEMS_API}/create/${userId}/${itemName}/${Price}/${description}/${category}`);
  return response.data;
}
export const updateItem = async (id, itemName, Price, description, category) => {
  const response = await request.put(`${ITEMS_API}/update/${id}/${itemName}/${Price}/${description}/${category}`);
  return response.data;
}
export const deleteItemByitemId = async (id) => {
  const response = await request.delete(`${ITEMS_API}/delete/${id}`);
  return response.data;
}
export const searchItem = async (matchAny) => {
  const response = await request.get(`${ITEMS_API}/search/${matchAny}`);
  return response.data;
}
export const findItemBySellerId = async (sellerId) => {
  const response = await request.get(`${ITEMS_API}/seller/${sellerId}`);
  return response.data;
}


// Reviews API
export const findAllReviews = async () => {
  const response = await request.get(`${REVIEWS_API}`);
  return response.data;
}

export const findReviewByUserId = async (id) => {
  const response = await request.get(`${REVIEWS_API}/userid/${id}`);
  return response.data;
}

export const findReviewByItemId = async (itemId) => {
  const response = await request.get(`${REVIEWS_API}/itemid/${itemId}`);
  return response.data;
}

export const createReview = async (users, itemId, review, username, itemname) => {
  const response = await request.get(`${REVIEWS_API}/create/${users}/${itemId}/${review}/${username}/${itemname}`);
  return response.data;
}

export const deleteReview = async (userId, itemId) => {
  const response = await request.delete(`${REVIEWS_API}/delete/${userId}/${itemId}`);
  return response.data;
}


// Cart API

export const findCartByUserId = async (id) => {
  const response = await request.get(`${CARTS_API}/userid/${id}`);
  return response.data;
}

export const deleteOneCartByUserId = async (userId, itemId) => {
  const response = await request.delete(`${CARTS_API}/delete/${userId}/${itemId}`);
  return response.data;
}

export const addOneCartByUserId = async (userId, itemId, username, itemname, price) => {
  const response = await request.get(`${CARTS_API}/add/${userId}/${itemId}/${username}/${itemname}/${price}`);
  return response.data;
}

export const deleteAllCartByUserId = async (userId) => {
  const response = await request.delete(`${CARTS_API}/deleteall/${userId}`);
  return response.data;
}

export const totalPrices = async (userId) => {
  const response = await request.get(`${CARTS_API}/total/${userId}`);
  return response.data;
}