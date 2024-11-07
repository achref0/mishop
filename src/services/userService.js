import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const updateProfile = async (userData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/users/profile`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};