import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-green-600 font-bold text-3xl">Imoti.bg</Link>
            <span className="text-gray-600">Сайт за имоти №1</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-green-600">Вход</button>
            <span className="text-gray-400">|</span>
            <button className="text-gray-600 hover:text-green-600">Нова Регистрация</button>
            <button
              onClick={() => navigate('/dobavi-obiava')}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700"
            >
              + ДОБАВИ ОБЯВА
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8 py-3 border-t">
          <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">Начало</Link>
          <Link to="/prodajbi" className="text-gray-700 hover:text-green-600 font-medium">Продажби</Link>
          <Link to="/naemi" className="text-gray-700 hover:text-green-600 font-medium">Наеми</Link>
          <Link to="/novi-sgradi" className="text-gray-700 hover:text-green-600 font-medium">Нови сгради</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;