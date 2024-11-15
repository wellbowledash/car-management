import React , {useState} from 'react'
import { uploadImageToCloudinary } from '../services/cloudinaryService';
import { createCar } from '../services/carService';
export default function AddCar() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState({ car_type: '', company: '', dealer: '' });
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Redirect to login if user is not logged in
      return;
    }
    
    const handleImageUpload = async (event) => {
      setError('');
      const files = Array.from(event.target.files);
  
      if (files.length + images.length > 10) {
        setError('You can upload a maximum of 10 images.');
        return;
      }
  
      setUploading(true);
      try {
        const urls = await Promise.all(files.map((file) => uploadImageToCloudinary(file)));
        setImages((prevImages) => [...prevImages, ...urls]);
      } catch (error) {
        console.error("Error uploading image:", error);
        setError("Failed to upload images. Please try again.");
      } finally {
        setUploading(false);
      }
    };
    const handleRemoveImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
      };
    const handleTagChange = (e) => {
      setTags({ ...tags, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!title || !description|| images.length === 0) {
        setError("Title, description and at least one image are required.");
        return;
      }
  
      try {
        const productData = { title, description, tags, images };
        const response = await createCar(productData);
        console.log("Car added:", response);
        setSuccess("Car added successfully!");
        
        // Clear form after submission
        setTitle('');
        setDescription('');
        setTags({ car_type: '', company: '', dealer: '' });
        setImages([]);
      } catch (error) {
        console.error("Error adding car:", error);
        setError(error.response?.data?.error || "Failed to add car. Please try again.");
      }
    };
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-600">Add New Car</h2>
  
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-500 text-center">{success}</p>}
  
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Car Title"
              required
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
  
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
              className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
  
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="car_type"
                value={tags.car_type}
                onChange={handleTagChange}
                placeholder="Car Type"
                //required
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="company"
                value={tags.company}
                onChange={handleTagChange}
                placeholder="Company"
                //required
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="dealer"
                value={tags.dealer}
                onChange={handleTagChange}
                placeholder="Dealer"
                //required
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="w-full p-2 border rounded-lg"
              accept="image/*"
            />
            {uploading && <p>Uploading images...</p>}
            <p className="text-gray-500 text-sm">You can upload up to 10 images.</p>
            <div className="flex flex-wrap gap-4 mt-4">
            {images.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Car ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200"
              disabled={uploading}
            >
              Add Car
            </button>
          </form>
        </div>
      </div>
    );
      
}
