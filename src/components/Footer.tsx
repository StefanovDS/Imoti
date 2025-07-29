import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">За Imoti.bg</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-white">За нас</Link></li>
              <li><Link to="/contacts" className="hover:text-white">Контакти</Link></li>
              <li><Link to="/advertising" className="hover:text-white">Реклама</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Услуги</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/publish" className="hover:text-white">Публикуване</Link></li>
              <li><Link to="/vip" className="hover:text-white">VIP обяви</Link></li>
              <li><Link to="/banners" className="hover:text-white">Банери</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Помощ</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-white">Условия</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Поверителност</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Социални мрежи</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-300 hover:text-white">Facebook</a>
              <a href="https://twitter.com" className="text-gray-300 hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 Imoti.bg - Всички права запазени</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
