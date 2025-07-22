const express = require('express');
const cors = require('cors');
const db = require('../config/db');

const app = express();

app.use(cors());
app.use(express.json());

// API endpoint to add a new listing
app.post('/api/listings', (req, res) => {
  const { title, description, price, location } = req.body;
  const query = 'INSERT INTO listings (title, description, price, location) VALUES (?, ?, ?, ?)';
  db.query(query, [title, description, price, location], (error, results) => {
    if (error) {
      console.error('Error inserting listing:', error);
      return res.status(500).send('Error adding listing');
    }
    res.status(201).send('Listing added successfully');
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});