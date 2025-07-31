import React from 'react';

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  area: string;
  created_at: string;
  images?: string;
}

interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => {
        const images = property.images ? JSON.parse(property.images) : [];
        return (
        <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          {images.length > 0 && (
            <div className="h-48 overflow-hidden">
              <img 
                src={images[0]} 
                alt={property.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-4">{property.location}</p>
              </div>
              <span className="text-lg font-bold text-green-600">€{property.price.toLocaleString()}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
              <div>
                <span className="font-medium">Тип: </span>
                {property.type}
              </div>
              <div>
                <span className="font-medium">Площ: </span>
                {property.area} кв.м
              </div>
            </div>
            
            <p className="text-gray-700 line-clamp-3 mb-4">{property.description}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {new Date(property.created_at).toLocaleDateString('bg-BG')}
              </span>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Детайли
              </button>
            </div>
          </div>
        </div>
        );
      })}
      {properties.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-600">
          Няма намерени имоти, отговарящи на вашите критерии
        </div>
      )}
    </div>
  );
};

export default PropertyList;