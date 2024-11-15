// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header()  {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      navigate('/login');
    };
  

  return (
    <header className="bg-blue-600 text-white p-6 flex justify-between items-center shadow-md">
      <h1 className="text-3xl font-bold">
        <Link to="/" className="hover:text-gray-200">Car Management App</Link>
      </h1>
      <nav className="flex space-x-6 text-lg">
        {token ? (
          <>
            <Link to="/products" className="hover:text-gray-200">My Cars</Link>
            <Link to="/add-product" className="hover:text-gray-200">Add Car</Link>
            <button onClick={handleLogout} className="hover:text-gray-200">Logout</button>
            <span className="ml-6 font-semibold">Welcome, {userName}</span>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-200">Login</Link>
            <Link to="/signup" className="hover:text-gray-200">Sign Up</Link>
          </>
        )}
      </nav>
    </header>

  // Retrieve token and user name from localStorage to check login status

  );
};


