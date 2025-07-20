import React from 'react';

interface Property {
  id: number;
  city: string;
  title?: string;
  area?: string;
  type?: string;
  yearBuilt?: number;
  isCompleted?: boolean;
  material?: string;
}

interface PropertyListProps {
  properties: Property[];
}

const PropertyList: React.FC<PropertyListProps> = ({ properties }) => {
  return (
    <div className="property-list">
      <h2>Properties</h2>
      {properties.length === 0 ? (
        <p>No properties selected</p>
      ) : (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <h3>{property.title || 'Untitled Property'}</h3>
              <p>City: {property.city}</p>
              {property.area && <p>Area: {property.area}</p>}
              {property.type && <p>Type: {property.type}</p>}
              {property.yearBuilt && <p>Year Built: {property.yearBuilt}</p>}
              {property.material && <p>Material: {property.material}</p>}
              <p>Status: {property.isCompleted ? 'Completed' : 'Under Construction'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PropertyList;