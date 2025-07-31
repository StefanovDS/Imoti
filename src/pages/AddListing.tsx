import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddListing: React.FC = () => {
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    price: '', 
    location: '', 
    type: 'apartment', 
    area: '',
    listingType: 'sale' // 'sale' or 'rental'
  });
  const navigate = useNavigate();

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        navigate('/'); // Redirect to home page after success
      } else {
        alert('Неуспешно добавяне на обява');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Възникна грешка');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-8 px-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">
            Добави Нова Обява
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
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

              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">Местоположение</label>
                <input
                  id="location"
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
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1">Цена</label>
                <div className="relative">
                  <input
                    id="price"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleFormInputChange}
                    placeholder="0.00"
                    className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500 pr-12"
                    step="0.01"
                    required
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">лв.</span>
                </div>
              </div>

              <div>
                <label htmlFor="area" className="block text-sm font-semibold text-gray-700 mb-1">Площ</label>
                <div className="relative">
                  <input
                    id="area"
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleFormInputChange}
                    placeholder="0"
                    className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500 pr-16"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">кв.м</span>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">Заглавие на обявата</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormInputChange}
                placeholder="Въведете заглавие на обявата"
                className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:ring-1 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-1">Описание</label>
              <textarea
                id="description"
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
                onClick={() => navigate('/')}
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
      </div>
    </div>
  );
};

export default AddListing;