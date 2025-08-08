-- Complete database schema for the application
-- This creates all necessary tables, indexes, and sample data

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist (for clean reinstall)
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- Create customers table
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    images JSONB DEFAULT '[]'::jsonb,
    variants JSONB DEFAULT '[]'::jsonb,
    total_stock INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    total DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
    shipping_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_created_at ON customers(created_at);
CREATE INDEX idx_products_created_at ON products(created_at);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Create function to automatically update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to auto-update updated_at
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create permissive policies for development (adjust for production)
CREATE POLICY "Allow all operations on customers" ON customers FOR ALL USING (true);
CREATE POLICY "Allow all operations on products" ON products FOR ALL USING (true);
CREATE POLICY "Allow all operations on orders" ON orders FOR ALL USING (true);

-- Insert sample customers
INSERT INTO customers (name, email, phone, address) VALUES
('John Doe', 'john.doe@example.com', '+1234567890', '123 Main St, Anytown, USA 12345'),
('Jane Smith', 'jane.smith@example.com', '+1987654321', '456 Oak Ave, Another City, USA 67890'),
('Bob Johnson', 'bob.johnson@example.com', '+1122334455', '789 Pine Rd, Somewhere, USA 11111'),
('Alice Brown', 'alice.brown@example.com', '+1555666777', '321 Elm St, Elsewhere, USA 22222'),
('Charlie Wilson', 'charlie.wilson@example.com', '+1888999000', '654 Maple Dr, Nowhere, USA 33333');

-- Insert sample products
INSERT INTO products (name, description, price, images, variants, total_stock) VALUES
('Wireless Bluetooth Headphones', 'Premium quality headphones with noise cancellation', 35.00, 
 '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"]'::jsonb,
 '[{"id": "v1", "name": "Black", "stock": 25}, {"id": "v2", "name": "White", "stock": 15}, {"id": "v3", "name": "Silver", "stock": 5}]'::jsonb,
 45),

('Adjustable Laptop Stand', 'Ergonomic laptop stand for better posture', 17.50,
 '["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop"]'::jsonb,
 '[{"id": "v1", "name": "Natural Wood", "stock": 13}, {"id": "v2", "name": "Black", "stock": 10}]'::jsonb,
 23),

('USB-C Cable 6ft', 'Fast charging USB-C to USB-C cable', 5.00,
 '["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop"]'::jsonb,
 '[{"id": "v1", "name": "Black", "stock": 70}, {"id": "v2", "name": "White", "stock": 50}]'::jsonb,
 120),

('Portable Bluetooth Speaker', 'Waterproof speaker with 12-hour battery life', 50.00,
 '["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop"]'::jsonb,
 '[{"id": "v1", "name": "Red", "stock": 3}, {"id": "v2", "name": "Blue", "stock": 2}, {"id": "v3", "name": "Black", "stock": 3}]'::jsonb,
 8),

('Wireless Mouse', 'Ergonomic wireless mouse with long battery life', 25.00,
 '["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop"]'::jsonb,
 '[{"id": "v1", "name": "Black", "stock": 30}, {"id": "v2", "name": "White", "stock": 20}]'::jsonb,
 50);

-- Insert sample orders
INSERT INTO orders (customer_id, items, total, status, shipping_address) VALUES
((SELECT id FROM customers WHERE email = 'john.doe@example.com'),
 '[{"id": "1", "name": "Wireless Bluetooth Headphones", "price": 35.00, "quantity": 1, "variant": "Black"}]'::jsonb,
 35.00, 'delivered', '123 Main St, Anytown, USA 12345'),

((SELECT id FROM customers WHERE email = 'jane.smith@example.com'),
 '[{"id": "2", "name": "Adjustable Laptop Stand", "price": 17.50, "quantity": 2, "variant": "Natural Wood"}]'::jsonb,
 35.00, 'shipped', '456 Oak Ave, Another City, USA 67890'),

((SELECT id FROM customers WHERE email = 'bob.johnson@example.com'),
 '[{"id": "3", "name": "USB-C Cable 6ft", "price": 5.00, "quantity": 3, "variant": "Black"}, {"id": "4", "name": "Portable Bluetooth Speaker", "price": 50.00, "quantity": 1, "variant": "Red"}]'::jsonb,
 65.00, 'pending', '789 Pine Rd, Somewhere, USA 11111'),

((SELECT id FROM customers WHERE email = 'alice.brown@example.com'),
 '[{"id": "5", "name": "Wireless Mouse", "price": 25.00, "quantity": 1, "variant": "White"}]'::jsonb,
 25.00, 'confirmed', '321 Elm St, Elsewhere, USA 22222');

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';

-- Success message
SELECT 'Database schema created successfully! All tables, indexes, and sample data have been set up.' as message;
