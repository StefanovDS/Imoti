import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  area: string;
  created_at: string;
}

const PropertyListings: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const location = useLocation();
  const isRental = location.pathname === '/naemi';

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/listings${isRental ? '/rentals' : '/sales'}`);
        if (response.ok) {
          const data = await response.json();
          setProperties(data);
        } else {
          console.error('Failed to fetch properties');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProperties();
  }, [isRental]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-green-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Imoti.bg</h1>
          <div className="flex space-x-4">
            <button className="px-3 py-1 bg-green-600 hover:bg-green-800 rounded">Вход</button>
            <button className="px-3 py-1 bg-green-600 hover:bg-green-800 rounded">Регистрация</button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-green-600 text-white py-2 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex space-x-6">
          <Link to="/" className="hover:bg-green-700 px-3 py-1 rounded">Начало</Link>
          <Link to="/prodajbi" className={`px-3 py-1 rounded ${!isRental ? 'bg-green-700' : 'hover:bg-green-700'}`}>Продажби</Link>
          <Link to="/naemi" className={`px-3 py-1 rounded ${isRental ? 'bg-green-700' : 'hover:bg-green-700'}`}>Наеми</Link>
          <Link to="/dobavi-obiava" className="hover:bg-green-700 px-3 py-1 rounded">Добави обява</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-8 px-4">
        <h2 className="text-2xl font-bold mb-6">{isRental ? 'Имоти под наем' : 'Имоти за продажба'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{property.title || 'Без заглавие'}</h3>
                  <p className="text-gray-600 mb-2">{property.location}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">{property.type}</span>
                    <span className="text-sm text-gray-500">{property.area} кв.м</span>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-3">{property.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">{property.price} лв.</span>
                    <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                      Детайли
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 text-gray-500">
              Няма намерени имоти
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyListings;
