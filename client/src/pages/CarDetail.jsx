// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCarDetails, updateCar, deleteCar } from '../services/carService';
import { uploadImageToCloudinary } from '../services/cloudinaryService';


export default function CarDetail()  {
  const { id } = useParams(); // Get car ID from URL parameters
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [editing, setEditing] = useState({
    title: false,
    description: false,
    tags: false,
    images: false,
  });
  const [updatedCar, setUpdatedCar] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const loadCarDetails = async () => {
      try {
        const carData = await fetchCarDetails(id);
        setCar(carData);
        setUpdatedCar(carData); // Initialize editable fields with current data
      } catch (error) {
        setError("Failed to load car details. Please try again.");
      }
    };
    loadCarDetails();
  }, [id]);

  const handleInputChange = (e) => {
    setUpdatedCar({ ...updatedCar, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e) => {
    setUpdatedCar({
      ...updatedCar,
      tags: { ...updatedCar.tags, [e.target.name]: e.target.value },
    });
  };

  const handleImageUpload = async (event) => {
    setUploading(true);
    const files = Array.from(event.target.files);
    try {
      const urls = await Promise.all(files.map((file) => uploadImageToCloudinary(file)));
      setNewImages((prevImages) => [...prevImages, ...urls]);
    } catch (error) {
      setError("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const updatedCarData = { ...updatedCar, images: [...updatedCar.images, ...newImages] };
      await updateCar(id, updatedCarData);
      setCar(updatedCarData)
      setUpdatedCar(updatedCarData)
      setSuccess("Car details updated successfully!");
      setNewImages([]);
      setEditing({ title: false, description: false, tags: false, images: false });
    } catch (error) {
      setError("Failed to save changes. Please try again.");
    }
  };
  

  const handleDeleteCar = async () => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
        await deleteCar(id);
        navigate("/products");
      } catch (error) {
        setError("Failed to delete the car. Please try again.");
      }
    }
  };
  const openImageModal = (url) => {
    setCurrentImage(url);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };
  const removeOriginalImage = (index) => {
    setUpdatedCar((prevCar) => ({
      ...prevCar,
      images: prevCar.images.filter((_, i) => i !== index),
    }));
  };

  const removeNewImage = (index) => {
    setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  if (!car) {
    return <p className="text-center text-gray-500">Loading car details...</p>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">Car Details</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        {/* Title Section */}
        <div>
          <h2 className="text-2xl font-semibold">Title</h2>
          {editing.title ? (
            <input
              type="text"
              name="title"
              value={updatedCar.title}
              onChange={handleInputChange}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            />
          ) : (
            <p className="mt-2 text-lg">{car.title}</p>
          )}
          <button
            onClick={() => setEditing({ ...editing, title: !editing.title })}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            {editing.title ? "Cancel" : "Edit Title"}
          </button>
        </div>

        {/* Description Section */}
        <div>
          <h2 className="text-2xl font-semibold">Description</h2>
          {editing.description ? (
            <textarea
              name="description"
              value={updatedCar.description}
              onChange={handleInputChange}
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
            />
          ) : (
            <p className="mt-2 text-lg">{car.description}</p>
          )}
          <button
            onClick={() => setEditing({ ...editing, description: !editing.description })}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            {editing.description ? "Cancel" : "Edit Description"}
          </button>
        </div>

        {/* Tags Section */}
        <div>
          <h2 className="text-2xl font-semibold">Tags</h2>
          {editing.tags ? (
            <div className="space-y-2 mt-2">
              <input
                type="text"
                name="car_type"
                value={updatedCar.tags.car_type}
                onChange={handleTagChange}
                placeholder="Car Type"
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="company"
                value={updatedCar.tags.company}
                onChange={handleTagChange}
                placeholder="Company"
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="dealer"
                value={updatedCar.tags.dealer}
                onChange={handleTagChange}
                placeholder="Dealer"
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ) : (
            <ul className="mt-2 space-y-1 text-lg">
            <li><strong>Car Type:</strong> {car.tags?.car_type}</li>
              <li><strong>Company:</strong> {car.tags?.company}</li>
              <li><strong>Dealer:</strong> {car.tags?.dealer }</li>
            </ul>
          )}
          <button
            onClick={() => setEditing({ ...editing, tags: !editing.tags })}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            {editing.tags ? "Cancel" : "Edit Tags"}
          </button>
        </div>

        {/* Images Section */}
        <div>
          <h2 className="text-2xl font-semibold">Images</h2>
          <div className="flex flex-wrap gap-4 mt-4">
            {updatedCar.images.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Car ${index}`}
                  className="w-48 h-48 object-contain rounded-lg shadow-md cursor-pointer"
                  onClick={() => openImageModal(url)}
                />
                {editing.images && (
                  <button
                    onClick={() => removeOriginalImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            {newImages.map((url, index) => (
              <div key={`new-${index}`} className="relative">
                <img
                  src={url}
                  alt={`New Car ${index}`}
                  className="w-48 h-48 object-contain rounded-lg shadow-md cursor-pointer"
                  onClick={() => openImageModal(url)}
                />
                {editing.images && (
                  <button
                    onClick={() => removeNewImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
          </div>
          {editing.images && (
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-lg mt-4"
              accept="image/*"
            />
          )}
          <button
            onClick={() => setEditing({ ...editing, images: !editing.images })}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            {editing.images ? "Cancel" : "Edit Images"}
          </button>
        </div>

        {/* Save Changes Button */}
        {(editing.title || editing.description || editing.tags || editing.images) && (
          <button
            onClick={handleSaveChanges}
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg hover:bg-blue-700 mt-6"
            disabled={uploading}
          >
            Save Changes
          </button>
        )}

        {/* Delete Car Button */}
        <button
          onClick={handleDeleteCar}
          className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold text-lg hover:bg-red-700 mt-6"
        >
          Delete Car
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative max-3xl max-h-screen">
            <img
              src={currentImage}
              alt="Enlarged Car"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white text-black rounded-full p-2 hover:bg-gray-200"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


