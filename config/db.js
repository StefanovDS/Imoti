const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'StefanovDS',
  password: '', // No password
  database: 'imoti_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Function to run SQL file
const runSqlFile = async (connection, filePath) => {
  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    await connection.query(sql);
    console.log(`Successfully executed SQL file: ${filePath}`);
  } catch (error) {
    console.error(`Error executing SQL file ${filePath}:`, error);
    throw error;
  }
};

// Convert pool to use promises
const promisePool = pool.promise();

// Initialize database and tables
const initializeDatabase = async () => {
  try {
    // First try to connect to MySQL server
    const tempPool = mysql.createPool({
      host: 'localhost',
      user: 'StefanovDS',
      password: '',
      waitForConnections: true,
      connectionLimit: 1
    });

    const tempPromisePool = tempPool.promise();

    // Create database if it doesn't exist
    console.log('Creating database if not exists...');
    await tempPromisePool.query('CREATE DATABASE IF NOT EXISTS imoti_db');
    
    // Connect to the database and run migrations
    const connection = await pool.promise().getConnection();
    console.log('Connected to database successfully');

    try {
      // Run table creation
      console.log('Running table migrations...');
      await runSqlFile(
        connection, 
        path.join(__dirname, '../server/db/migrations/create_listings_table.sql')
      );
      
      console.log('All database setup completed successfully');
    } catch (error) {
      console.error('Error during database setup:', error);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
};

// Run initialization
initializeDatabase().catch(console.error);

// Handle pool errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;