import axios from 'axios';

const API_URL = 'https://car-management-api.vercel.app//api';

export const signUp = async (data) => {
  const response = await axios.post(`${API_URL}/users/signup`, data);
  return response.data;
};

export const login = async (data) => {
  const response = await axios.post(`${API_URL}/users/signin`, data);
  return response.data;
};