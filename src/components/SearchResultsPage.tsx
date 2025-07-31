import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { results } = location.state || { results: [] };

  const handleBack = (): void => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="p-8">
      <button
        onClick={handleBack}
        className="mb-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
      >
        ← Назад
      </button>
      {results.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Резултати от търсенето ({results.length})</h2>
          <ul className="space-y-4">
            {results.map((property: Property) => (
              <li key={property.id} className="border-b pb-2">
                <h3 className="font-semibold">{property.title}</h3>
                <p>{property.description}</p>
                <p>Цена: {property.price} EUR | Площ: {property.area} кв.м | Местоположение: {property.location}</p>
                <p>Тип: {property.type} | Добавено на: {new Date(property.created_at).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Няма намерени резултати или възникна проблем с навигацията. Проверете конзолата за грешки.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;