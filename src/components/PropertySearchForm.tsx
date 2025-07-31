import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

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
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'apartment',
    area: '',
    listingType: 'sale'
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

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddListing = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          location: formData.location,
          type: formData.type,
          area: formData.area,
          listingType: formData.listingType
        }),
      });
      if (response.ok) {
        alert('Обявата е добавена успешно!');
        setFormData({
          title: '',
          description: '',
          price: '',
          location: '',
          type: 'apartment',
          area: '',
          listingType: 'sale'
        });
        setShowAddForm(false);
      } else {
        alert('Неуспешно добавяне на обява');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Възникна грешка');
    }
  };

  return (
    <div>
      <Navigation onAddListingClick={() => {
        console.log('Add listing clicked, current state:', showAddForm);
        setShowAddForm(!showAddForm);
      }} />
      
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
          
          {/* Map Image */}
          <div className="mt-8 flex justify-center">
            <img 
              src="/attached_assets/image_1753984636343.png" 
              alt="Карта на България" 
              className="max-w-md rounded-lg shadow-md"
              onError={(e) => {
                console.log('Image failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Add Listing Form - shown conditionally */}
          {showAddForm && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">
                Добави Нова Обява
              </h2>
              <form onSubmit={handleAddListing} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="addListingType" className="block text-sm font-semibold text-gray-700 mb-1">Тип обява</label>
                    <select
                      id="addListingType"
                      name="listingType"
                      value={formData.listingType}
                      onChange={handleFormInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      required
                    >
                      <option value="sale">За продажба</option>
                      <option value="rental">Под наем</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="addType" className="block text-sm font-semibold text-gray-700 mb-1">Тип имот</label>
                    <select
                      id="addType"
                      name="type"
                      value={formData.type}
                      onChange={handleFormInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      required
                    >
                      <option value="apartment">Апартамент</option>
                      <option value="house">Къща</option>
                      <option value="office">Офис</option>
                      <option value="shop">Магазин</option>
                      <option value="garage">Гараж</option>
                      <option value="land">Парцел</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="addLocation" className="block text-sm font-semibold text-gray-700 mb-1">Местоположение</label>
                    <input
                      id="addLocation"
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleFormInputChange}
                      placeholder="Град, квартал, улица"
                      className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="addPrice" className="block text-sm font-semibold text-gray-700 mb-1">Цена (лв.)</label>
                    <input
                      id="addPrice"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormInputChange}
                      placeholder="Цена в лева"
                      className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="addArea" className="block text-sm font-semibold text-gray-700 mb-1">Площ (кв.м)</label>
                    <input
                      id="addArea"
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleFormInputChange}
                      placeholder="Площ в кв.м"
                      className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="addTitle" className="block text-sm font-semibold text-gray-700 mb-1">Заглавие</label>
                    <input
                      id="addTitle"
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleFormInputChange}
                      placeholder="Заглавие на обявата"
                      className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="addDescription" className="block text-sm font-semibold text-gray-700 mb-1">Описание</label>
                  <textarea
                    id="addDescription"
                    name="description"
                    value={formData.description}
                    onChange={handleFormInputChange}
                    placeholder="Подробно описание на имота"
                    className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500 h-32"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-all"
                  >
                    Отказ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
                  >
                    Добави обява
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertySearchForm;