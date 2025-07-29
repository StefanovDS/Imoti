const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require(path.join(__dirname, '../config/db'));

const app = express();

// Enable CORS for all origins in development
app.use(cors({
  origin: '*', // Allow all origins in development
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Log all requests with full URL
app.use((req, res, next) => {
  console.log('Request received:');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Query:', req.query);
  console.log('Headers:', req.headers);
  next();
});

// API endpoint to add a new listing
app.post('/api/listings', (req, res) => {
  console.log('Received POST request to /api/listings');
  console.log('Raw request body:', req.body);
  console.log('Content-Type:', req.get('Content-Type'));
  
  // Check if we received any data
  if (!req.body || Object.keys(req.body).length === 0) {
    console.error('No data received in request body');
    return res.status(400).json({ error: 'No data received in request body' });
  }

  const { title, description, price, location, type, area, listingType } = req.body;
  
  console.log('Parsed fields:', { title, description, price, location, type, area, listingType });
  
  // Validate required fields
  if (!title || !description || !price || !location || !type || !area) {
    console.error('Missing required fields:', { title, description, price, location, type, area });
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO listings (title, description, price, location, type, area, is_rental) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const isRental = type.toLowerCase().includes('наем');
  
  console.log('Executing query:', query);
  console.log('Query parameters:', [title, description, price, location, type, area, isRental]);
  
  db.query(query, [title, description, price, location, type, area, isRental], (error, results) => {
    if (error) {
      console.error('Error inserting listing:', error);
      return res.status(500).json({ error: 'Error adding listing', details: error.message });
    }
    console.log('Listing added successfully:', results);
    res.status(201).json({ message: 'Listing added successfully', id: results.insertId });
  });
});

// API endpoint to get all sales listings
app.get('/api/listings/sales', (req, res) => {
  const query = 'SELECT * FROM listings WHERE is_rental = false ORDER BY created_at DESC';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching sales listings:', error);
      return res.status(500).send('Error fetching listings');
    }
    res.json(results);
  });
});

// API endpoint to get all rental listings
app.get('/api/listings/rentals', (req, res) => {
  const query = 'SELECT * FROM listings WHERE is_rental = true ORDER BY created_at DESC';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching rental listings:', error);
      return res.status(500).send('Error fetching listings');
    }
    res.json(results);
  });
});

// Test database connection
app.get('/api/test-db', (req, res) => {
  db.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Database connection error');
    } else {
      res.json({ status: 'Database connection successful' });
    }
  });
});

// API endpoint for searching listings
app.get('/api/listings/search', (req, res) => {
  console.log('Search request received:', req.query);
  
  const {
    location,
    propertyType,
    priceFrom,
    priceTo,
    areaFrom,
    areaTo,
    isRental,
    withPhotos,
    withVideo
  } = req.query;

  let query = 'SELECT * FROM listings WHERE 1=1';
  const params = [];
  
  console.log('Initial query:', query);

  if (location) {
    query += ' AND location LIKE ?';
    params.push(`%${location}%`);
  }

  if (propertyType && propertyType !== 'all') {
    query += ' AND type = ?';
    params.push(propertyType);
  }

  if (priceFrom) {
    query += ' AND price >= ?';
    params.push(parseFloat(priceFrom));
  }

  if (priceTo) {
    query += ' AND price <= ?';
    params.push(parseFloat(priceTo));
  }

  if (areaFrom) {
    query += ' AND area >= ?';
    params.push(parseFloat(areaFrom));
  }

  if (areaTo) {
    query += ' AND area <= ?';
    params.push(parseFloat(areaTo));
  }

  if (isRental !== undefined) {
    query += ' AND is_rental = ?';
    params.push(isRental === 'true');
  }

  if (withPhotos) {
    query += ' AND has_photos = true';
  }

  if (withVideo) {
    query += ' AND has_video = true';
  }

  query += ' ORDER BY created_at DESC';
  
  console.log('Final query:', query);
  console.log('Query parameters:', params);

  db.query(query, params, (error, results) => {
    if (error) {
      console.error('Error searching listings:', error);
      return res.status(500).send('Error searching listings');
    }
    console.log('Results found:', results.length);
    res.json(results);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 404 handler
app.use((req, res) => {
  console.log('404 Not Found:', req.method, req.url);
  res.status(404).send('Not Found');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server is listening at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- GET /api/listings/search');
  console.log('- GET /api/listings/sales');
  console.log('- GET /api/listings/rentals');
  console.log('- POST /api/listings');
});