CREATE TABLE IF NOT EXISTS listings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  area VARCHAR(20) NOT NULL,
  is_rental BOOLEAN DEFAULT false,
  has_photos BOOLEAN DEFAULT false,
  has_video BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_is_rental (is_rental),
  INDEX idx_location (location),
  INDEX idx_type (type),
  INDEX idx_price (price),
  INDEX idx_created_at (created_at)
);
