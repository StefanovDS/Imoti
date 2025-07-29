import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertyListings from './pages/PropertyListings';
import AddListing from './pages/AddListing';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/prodajbi" element={<PropertyListings />} />
          <Route path="/naemi" element={<PropertyListings />} />
          <Route path="/dobavi-obiava" element={<AddListing />} />
          <Route path="/novi-sgradi" element={<PropertyListings />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;