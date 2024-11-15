import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import CarList from './pages/CarList';
import CarDetail from './pages/CarDetail';
import AddCar from './pages/AddCar';
import Header from './components/Header';

export default function App() {
  return (
    <Router>
      <Header/>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<CarList />} />
      <Route path="/products/:id" element={<CarDetail />} />
      <Route path="/add-product" element={<AddCar />} />
    </Routes>
  </Router>
);
  
}
