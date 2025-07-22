import React, { useState } from 'react';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('sell');
  const [searchFilters, setSearchFilters] = useState({
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

  const handleSearch = () => {
    console.log('Search with filters:', searchFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-4">
              <span className="text-red-600 font-bold text-2xl">imoti.bg</span>
              <span className="text-gray-600">Сайт за имоти №1</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-red-600">Вход</button>
              <span className="text-gray-400">|</span>
              <button className="text-gray-600 hover:text-red-600">Нова Регистрация</button>
              <button className="bg-red-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-red-700">
                + ДОБАВИ ОБЯВА
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8 py-3 border-t">
            <button className="bg-red-600 text-white px-6 py-2 rounded font-medium">
              Начало
            </button>
            <button className="text-gray-700 hover:text-red-600 font-medium">Публикуване</button>
            <button className="text-gray-700 hover:text-red-600 font-medium">Търсене</button>
            <button className="text-gray-700 hover:text-red-600 font-medium">Нови сгради</button>
            <button className="text-gray-700 hover:text-red-600 font-medium">Агенции</button>
            <button className="text-gray-700 hover:text-red-600 font-medium">Новини</button>
            <button className="text-gray-700 hover:text-red-600 font-medium">Кредити</button>
            <button className="text-gray-700 hover:text-red-600 font-medium">+ Още...</button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Открий своя нов имот в сайт No 1 за имоти в България:
        </h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex">
            <button
              onClick={() => setSelectedTab('sell')}
              className={`flex-1 py-4 px-6 text-center font-bold text-lg ${
                selectedTab === 'sell' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ПРОДАЖБИ
            </button>
            <button
              onClick={() => setSelectedTab('rent')}
              className={`flex-1 py-4 px-6 text-center font-bold text-lg ${
                selectedTab === 'rent' 
                  ? 'bg-red-600 text-white' 
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
                    <circle cx="320" cy="150" r="4" fill="white" stroke="#666" strokeWidth="2" />
                    <circle cx="200" cy="120" r="4" fill="white" stroke="#666" strokeWidth="2" />
                    <text x="120" y="175" textAnchor="middle" className="text-xs fill-gray-600">София</text>
                    <text x="180" y="195" textAnchor="middle" className="text-xs fill-gray-600">Пловдив</text>
                    <text x="280" y="135" textAnchor="middle" className="text-xs fill-gray-600">Варна</text>
                  </svg>
                  <div className="absolute bottom-4 right-4 text-xs text-gray-500">
                    <div className="bg-white p-2 rounded shadow">
                      По света
                    </div>
                  </div>
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
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
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <span className="text-gray-500 font-bold">—</span>
                    <input
                      type="text"
                      placeholder="До"
                      value={searchFilters.priceTo}
                      onChange={(e) => handleInputChange('priceTo', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <select
                      value={searchFilters.currency}
                      onChange={(e) => handleInputChange('currency', e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
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
                    Цена на кв.м площ:
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      placeholder="От"
                      value={searchFilters.areaFrom}
                      onChange={(e) => handleInputChange('areaFrom', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <span className="text-gray-500 font-bold">—</span>
                    <input
                      type="text"
                      placeholder="До"
                      value={searchFilters.areaTo}
                      onChange={(e) => handleInputChange('areaTo', e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <span className="text-red-600 font-medium">( кв.м )</span>
                  </div>
                </div>

                {/* Square Footage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Квадратура:
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      placeholder="От"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <span className="text-gray-500 font-bold">—</span>
                    <input
                      type="text"
                      placeholder="До"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                    <span className="text-red-600 font-medium">( кв.м )</span>
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="flex items-center space-x-8">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={searchFilters.withPhotos}
                      onChange={(e) => handleInputChange('withPhotos', e.target.checked)}
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-gray-700">Само обяви със снимка</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={searchFilters.withVideo}
                      onChange={(e) => handleInputChange('withVideo', e.target.checked)}
                      className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-gray-700">Само обяви с видео</span>
                  </label>
                </div>

                {/* Search Button */}
                <div className="pt-4">
                    <button
                    onClick={handleSearch}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-md flex items-center justify-center space-x-2 text-lg"
                  >
                    <span>🔍</span>
                    <span>ТЪРСИ</span>
                  </button>
                </div>

                {/* Additional Criteria */}
                <div className="pt-4 border-t border-gray-200">
                  <button className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium">
                    <span>🔧</span>
                    <span>Още критерии за търсене</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Cities Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Популярни градове:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {cities.map((city, index) => (
              <button
                key={index}
                className="p-4 text-left border border-gray-200 rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 group-hover:text-red-500">📍</span>
                  <span className="font-medium text-gray-700 group-hover:text-red-600">{city}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">За Imot.bg</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">За нас</a></li>
                <li><a href="#" className="hover:text-white">Контакти</a></li>
                <li><a href="#" className="hover:text-white">Реклама</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Услуги</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Публикуване</a></li>
                <li><a href="#" className="hover:text-white">VIP обяви</a></li>
                <li><a href="#" className="hover:text-white">Банери</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Помощ</h3>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">FAQ</a></li>
                <li><a href="#" className="hover:text-white">Условия</a></li>
                <li><a href="#" className="hover:text-white">Поверителност</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Социални мрежи</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Imot.bg - Всички права запазени</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;