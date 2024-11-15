import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const createCar = async (carData) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
  
    const response = await axios.post(`${API_URL}/cars/create`, carData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
};

export const fetchUserCars = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/cars/getall`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  export const fetchCarDetails = async (carId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/cars/get/${carId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  export const updateCar = async (carId, updatedCarData) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/cars/update/${carId}`, updatedCarData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  export const deleteCar = async (carId) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/cars/delete/${carId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };