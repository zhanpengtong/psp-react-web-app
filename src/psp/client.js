import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:4000";
const USERS_API = `${API_BASE}/api/users`;
const request = axios.create({
  withCredentials: true,
});


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
  const response = await request.delete(`${USERS_API}/${id}`);
  return response.data;
};

export const createUser = async (firstName, lastName, username, password, email, phoneNumber, role) => {
  const response = await request.get(`${USERS_API}/creat/${firstName}/${lastName}/${username}/${password}/${email}/${phoneNumber}/${role}`);
  return response.data;
};

export const updateSellerItem = async (id, item) => {
  const response = await request.put(`${USERS_API}/updateSellerItem/${id}/${item}`);
  return response.data;
}

export const updateCartItem = async (id, item) => {
  const response = await request.put(`${USERS_API}/updateCartItem/${id}/${item}`);
  return response.data;
}

export const signup = async (credentials) => {
  const response = await request.post(
    `${USERS_API}/signup`, credentials);
  return response.data;
};