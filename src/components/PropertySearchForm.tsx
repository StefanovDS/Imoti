import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation'; // Add this import

const PropertySearchForm: React.FC = () => {
  const [searchParams, setSearchParams] = useState({
    type: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    listingType: 'sale' // 'sale' or 'rental'
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const queryParams = new URLSearchParams();
      Object.entries(searchParams).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`http://localhost:5000/api/listings/search?${queryParams}`);
      if (response.ok) {
        const results = await response.json();
        navigate('/search-results', { state: { results } });
      } else {
        console.error('Search failed');
        alert('Търсенето неуспешно');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Възникна грешка при търсенето');
    }
  };

  return (
    <div>
      <Navigation /> {/* Add Navigation component here */}
      
      {/* Rest of your existing PropertySearchForm content */}
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-4xl mx-auto pt-8 px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Търсене на имоти
            </h1>
            
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="listingType" className="block text-sm font-medium text-gray-700 mb-2">
                    Тип обява
                  </label>
                  <select
                    id="listingType"
                    name="listingType"
                    value={searchParams.listingType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="sale">За продажба</option>
                    <option value="rental">Под наем</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                    Тип имот
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={searchParams.type}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Всички типове</option>
                    <option value="apartment">Апартамент</option>
                    <option value="house">Къща</option>
                    <option value="office">Офис</option>
                    <option value="shop">Магазин</option>
                    <option value="garage">Гараж</option>
                    <option value="land">Парцел</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Местоположение
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    placeholder="Град, квартал, улица"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена (лв.)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      name="minPrice"
                      value={searchParams.minPrice}
                      onChange={handleInputChange}
                      placeholder="От"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      value={searchParams.maxPrice}
                      onChange={handleInputChange}
                      placeholder="До"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Площ (кв.м)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      name="minArea"
                      value={searchParams.minArea}
                      onChange={handleInputChange}
                      placeholder="От"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <input
                      type="number"
                      name="maxArea"
                      value={searchParams.maxArea}
                      onChange={handleInputChange}
                      placeholder="До"
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  🔍 Търсене
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertySearchForm;