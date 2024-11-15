// src/pages/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserCars } from '../services/carService';

export default function CarList(){
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if user is not logged in
      return;
    }

    const loadUserCars = async () => {
      try {
        const response = await fetchUserCars();
        setCars(response); // Show only the 6 most recent cars
        setFilteredCars(response)
    
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Failed to load cars. Please try again.');
      }
    };

    loadUserCars();
  }, [navigate]);

  const handleSearch = (event) => {
    const keyword = event.target.value.toLowerCase();
    setSearchKeyword(keyword);

    if (keyword === '') {
      setFilteredCars(cars); // Reset to all cars if search is cleared
    } else {
      const filtered = cars.filter((car) =>
        car.title.toLowerCase().includes(keyword) ||
        car.description.toLowerCase().includes(keyword) ||
        car.tags?.car_type?.toLowerCase().includes(keyword) ||
        car.tags?.company?.toLowerCase().includes(keyword) ||
        car.tags?.dealer?.toLowerCase().includes(keyword)
      );
      setFilteredCars(filtered); // Update displayed cars based on search
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">Your Cars</h1>

      {error && <p className="text-red-500 text-center mb-8">{error}</p>}
      {cars.length === 0? (
           <div className="text-center">
           <p className="text-gray-700 mb-4">You haven't added any cars yet.</p>
           <button
             onClick={() => navigate('/add-product')}
             className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
           >
             Add Your First Car
           </button>
         </div>
      ):(
        <>
        <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by title, description, or tags"
          value={searchKeyword}
          onChange={handleSearch}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

        
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.map((car) => (
          <div key={car._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src={car.images[0]} // Show the first image of the car
              alt={car.title}
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{car.title}</h2>
              <p className="text-gray-700">{car.description.substring(0, 100)}...</p>
              <button
                onClick={() => navigate(`/products/${car._id}`)}
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredCars.length === 0 && searchKeyword && (
        <p className="text-center text-gray-500 mt-8">No cars found matching your search criteria.</p>
      )}
      </>)}
    </div>
  );
};


