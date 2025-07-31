import React, { useState } from 'react';
import PropertySearchForm from '../components/PropertySearchForm';
import PropertyList from '../components/PropertyList';

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

const HomePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Открий своя нов имот в Imoti.bg - сайт №1 за имоти в България
      </h1>
      <PropertySearchForm />
    </div>
  );
};

export default HomePage;
