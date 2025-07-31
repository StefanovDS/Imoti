import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';

const PropertySearchForm: React.FC = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);

  // Form data state for inline add listing form
  const [formData, setFormData] = useState({
    listingType: 'sale',
    type: 'apartment',
    location: '',
    area: '',
    price: '',
    description: '',
    title: ''
  });
  const [searchParams, setSearchParams] = useState({
    type: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    listingType: 'sale' // 'sale' or 'rental'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const queryParams = new URLSearchParams();

      Object.entries(searchParams).forEach(([key, value]) => {
        if (value && value !== '') {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`http://localhost:5000/api/listings/search?${queryParams.toString()}`);
      const data = await response.json();
      navigate('/search-results', { state: { results: data } });

    } catch (error) {
      console.error('Error:', error);
      alert('Възникна грешка');
    }
  };

  // Handle form input changes for add listing form
  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission for add listing
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Обявата е добавена успешно!');
        setShowAddForm(false);
        // Reset form
        setFormData({
          listingType: 'sale',
          type: 'apartment',
          location: '',
          area: '',
          price: '',
          description: '',
          title: ''
        });
      } else {
        alert('Възникна грешка при добавяне на обявата');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Възникна грешка');
    }
  };

  return (
    <div>
      <Navigation onAddListingClick={() => setShowAddForm(!showAddForm)} />

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
              src="/bulgaria-map.png"
              alt="Карта на България"
              className="max-w-md rounded-lg shadow-md"
              onError={(e) => {
                console.log('Image failed to load');
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Inline Add Listing Form */}
          {showAddForm && (
            <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">
                Добави Нова Обява
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="listingType" className="block text-sm font-semibold text-gray-700 mb-1">Тип обява</label>
                    <select
                      id="listingType"
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
                    <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-1">Тип имот</label>
                    <select
                      id="type"
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
                </div>

                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Заглавие</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleFormInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder="Заглавие на обявата"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">Местоположение</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleFormInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder="Град, квартал, адрес"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="area" className="block text-sm font-semibold text-gray-700 mb-1">Площ (кв.м)</label>
                    <input
                      type="number"
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleFormInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      placeholder="Площ в квадратни метри"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1">Цена (лв.)</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleFormInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      placeholder="Цена в лева"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Описание</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleFormInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    placeholder="Детайлно описание на имота"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
                  >
                    Добави обява
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                  >
                    Отказ
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