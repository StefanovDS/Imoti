ALTER TABLE listings
ADD COLUMN type VARCHAR(50),
ADD COLUMN area VARCHAR(20),
ADD COLUMN is_rental BOOLEAN DEFAULT false,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Add indexes for better performance
CREATE INDEX idx_is_rental ON listings(is_rental);
CREATE INDEX idx_created_at ON listings(created_at);
