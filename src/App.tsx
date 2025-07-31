import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter import
import PropertySearchForm from './components/PropertySearchForm';
import SearchResultsPage from './components/SearchResultsPage';

const App: React.FC = () => {
  return (
    <Routes> {/* Remove <Router>, keep only <Routes> */}
      <Route path="/" element={<PropertySearchForm />} />
      <Route path="/search-results" element={<SearchResultsPage />} />
    </Routes>
  );
};

export default App;