const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'StefanovDS', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'imoti_db',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL Server!');
});

module.exports = connection;