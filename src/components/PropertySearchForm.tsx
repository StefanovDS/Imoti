import React, { useState } from 'react';

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

interface SearchFilters {
  location: string;
  propertyType: string;
  priceFrom: string;
  priceTo: string;
  areaFrom: string;
  areaTo: string;
  currency: string;
  withPhotos: boolean;
  withVideo: boolean;
}

interface PropertySearchFormProps {
  onSearchResults?: (properties: Property[]) => void;
}

const PropertySearchForm: React.FC<PropertySearchFormProps> = ({ onSearchResults }) => {
  const [selectedTab, setSelectedTab] = useState('sell');
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: '',
    propertyType: 'all',
    priceFrom: '',
    priceTo: '',
    areaFrom: '',
    areaTo: '',
    currency: 'EUR',
    withPhotos: false,
    withVideo: false
  });

  const cities = [
    'София', 'Пловдив', 'Варна', 'Бургас', 'Русе', 'Стара Загора', 
    'Плевен', 'Сливен', 'Добрич', 'Шумен', 'Перник', 'Ямбол'
  ];

  const propertyTypes = [
    { value: 'all', label: 'Всички' },
    { value: 'apartment', label: 'Апартамент' },
    { value: 'house', label: 'Къща' },
    { value: 'office', label: 'Офис' },
    { value: 'shop', label: 'Магазин' },
    { value: 'garage', label: 'Гараж' },
    { value: 'land', label: 'Парцел' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setSearchFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    try {
      // Convert currency if needed
      const priceMultiplier = searchFilters.currency === 'EUR' ? 1 : 
                             searchFilters.currency === 'BGN' ? 0.51 : 0.91; // EUR to USD
      
      const params = new URLSearchParams({
        location: searchFilters.location,
        propertyType: searchFilters.propertyType,
        priceFrom: searchFilters.priceFrom ? (parseFloat(searchFilters.priceFrom) * priceMultiplier).toString() : '',
        priceTo: searchFilters.priceTo ? (parseFloat(searchFilters.priceTo) * priceMultiplier).toString() : '',
        areaFrom: searchFilters.areaFrom,
        areaTo: searchFilters.areaTo,
        isRental: (selectedTab === 'rent').toString(),
        withPhotos: searchFilters.withPhotos.toString(),
        withVideo: searchFilters.withVideo.toString()
      });

      const response = await fetch(`http://localhost:5000/api/listings/search?${params}`);
      
      if (response.ok) {
        const data = await response.json();
        if (onSearchResults) {
          onSearchResults(data);
        }
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex">
        <button
          onClick={() => setSelectedTab('sell')}
          className={`flex-1 py-4 px-6 text-center font-bold text-lg ${
            selectedTab === 'sell' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          ПРОДАЖБИ
        </button>
        <button
          onClick={() => setSelectedTab('rent')}
          className={`flex-1 py-4 px-6 text-center font-bold text-lg ${
            selectedTab === 'rent' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          НАЕМИ
        </button>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Map */}
          <div className="lg:col-span-1">
            <div className="bg-gray-100 rounded-lg p-4 h-96 relative">
              {/* Simplified Bulgaria Map */}
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <path
                  d="M50 150 Q100 100 150 120 Q200 90 250 110 Q300 100 350 130 L340 180 Q300 200 250 190 Q200 210 150 200 Q100 190 50 180 Z"
                  fill="#d4b896"
                  stroke="#999"
                  strokeWidth="2"
                />
                {/* Cities as dots */}
                <circle cx="120" cy="160" r="6" fill="white" stroke="#666" strokeWidth="2" />
                <circle cx="180" cy="180" r="4" fill="white" stroke="#666" strokeWidth="2" />
                <circle cx="280" cy="140" r="4" fill="white" stroke="#666" strokeWidth="2" />
                <text x="120" y="175" textAnchor="middle" className="text-xs fill-gray-600">София</text>
                <text x="180" y="195" textAnchor="middle" className="text-xs fill-gray-600">Пловдив</text>
                <text x="280" y="135" textAnchor="middle" className="text-xs fill-gray-600">Варна</text>
              </svg>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Местоположение:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📍</span>
                <input
                  type="text"
                  placeholder="Местоположение"
                  value={searchFilters.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Search Filters */}
          <div className="lg:col-span-2 space-y-6">
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Вид имот:
              </label>
              <select
                value={searchFilters.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
              >
                {propertyTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Цена на имота:
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="От"
                  value={searchFilters.priceFrom}
                  onChange={(e) => handleInputChange('priceFrom', e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <span className="text-gray-500 font-bold">—</span>
                <input
                  type="text"
                  placeholder="До"
                  value={searchFilters.priceTo}
                  onChange={(e) => handleInputChange('priceTo', e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <select
                  value={searchFilters.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white"
                >
                  <option value="EUR">EUR</option>
                  <option value="BGN">BGN</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            {/* Area Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Площ:
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="От"
                  value={searchFilters.areaFrom}
                  onChange={(e) => handleInputChange('areaFrom', e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <span className="text-gray-500 font-bold">—</span>
                <input
                  type="text"
                  placeholder="До"
                  value={searchFilters.areaTo}
                  onChange={(e) => handleInputChange('areaTo', e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                <span className="text-green-600 font-medium">кв.м</span>
              </div>
            </div>

            {/* Search Button */}
            <div className="pt-4">
              <button
                onClick={handleSearch}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-md flex items-center justify-center space-x-2 text-lg"
              >
                <span>🔍</span>
                <span>ТЪРСИ</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Cities Section */}
      <div className="mt-8 px-8 pb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Популярни градове:</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cities.map((city, index) => (
            <button
              key={index}
              onClick={() => handleInputChange('location', city)}
              className="p-4 text-left border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 group-hover:text-green-500">📍</span>
                <span className="font-medium text-gray-700 group-hover:text-green-600">{city}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertySearchForm;
