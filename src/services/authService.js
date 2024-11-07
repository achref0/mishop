import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/users/login`, { email, password });
  return response.data;
};

export const adminLogin = async (email, password) => {
  const response = await axios.post(`${API_URL}/admin/login`, { email, password });
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/users/register`, { name, email, password });
  return response.data;
};

export const getProfile = async (token) => {
  const response = await axios.get(`${API_URL}/users/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};