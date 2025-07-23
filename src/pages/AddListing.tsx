import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddListing: React.FC = () => {
  const [formData, setFormData] = useState({ title: '', description: '', price: '', location: '', type: 'apartment', area: '' });
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
          price: formData.price,
          location: formData.location,
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
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Добави Нова Обява</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleFormInputChange}
            placeholder="Заглавие"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleFormInputChange}
            placeholder="Описание"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleFormInputChange}
            placeholder="Цена"
            className="w-full p-2 border rounded"
            step="0.01"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleFormInputChange}
            placeholder="Местоположение"
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleFormInputChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="apartment">Апартамент</option>
            <option value="house">Къща</option>
            <option value="office">Офис</option>
            <option value="shop">Магазин</option>
            <option value="garage">Гараж</option>
            <option value="land">Парцел</option>
          </select>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleFormInputChange}
            placeholder="Площ (кв.м)"
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Отказ
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Добави обява
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;