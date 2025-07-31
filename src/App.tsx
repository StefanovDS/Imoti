import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter import
import PropertySearchForm from './components/PropertySearchForm';
import SearchResultsPage from './components/SearchResultsPage';
import AddListing from './pages/AddListing';
import PropertyListings from './pages/PropertyListings';

const App: React.FC = () => {
  return (
    <Routes> {/* Remove <Router>, keep only <Routes> */}
      <Route path="/" element={<PropertySearchForm />} />
      <Route path="/search-results" element={<SearchResultsPage />} />
      <Route path="/dobavi-obiava" element={<AddListing />} />
      <Route path="/prodajbi" element={<PropertyListings />} />
      <Route path="/naemi" element={<PropertyListings />} />
    </Routes>
  );
};

export default App;