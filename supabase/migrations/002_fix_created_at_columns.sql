-- Schema fix migration to resolve created_at column issues
-- This migration safely adds missing columns if they don't exist
-- and ensures proper indexing and triggers are in place

-- Function to check if column exists
CREATE OR REPLACE FUNCTION column_exists(table_name text, column_name text)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = $1
        AND column_name = $2
    );
END;
$$ LANGUAGE plpgsql;

-- Add missing created_at columns if they don't exist
DO $$
BEGIN
    -- Fix customers table
    IF NOT column_exists('customers', 'created_at') THEN
        ALTER TABLE customers ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    IF NOT column_exists('customers', 'updated_at') THEN
        ALTER TABLE customers ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;

    -- Fix products table
    IF NOT column_exists('products', 'created_at') THEN
        ALTER TABLE products ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    IF NOT column_exists('products', 'updated_at') THEN
        ALTER TABLE products ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;

    -- Fix orders table
    IF NOT column_exists('orders', 'created_at') THEN
        ALTER TABLE orders ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    IF NOT column_exists('orders', 'updated_at') THEN
        ALTER TABLE orders ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Create indexes for created_at columns if they don't exist
CREATE INDEX IF NOT EXISTS idx_customers_created_at ON customers(created_at);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Create or replace the update function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing triggers if they exist and recreate them
DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;

-- Create triggers to auto-update updated_at
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update existing records to have proper timestamps if they're null
UPDATE customers SET created_at = NOW() WHERE created_at IS NULL;
UPDATE customers SET updated_at = NOW() WHERE updated_at IS NULL;

UPDATE products SET created_at = NOW() WHERE created_at IS NULL;
UPDATE products SET updated_at = NOW() WHERE updated_at IS NULL;

UPDATE orders SET created_at = NOW() WHERE created_at IS NULL;
UPDATE orders SET updated_at = NOW() WHERE updated_at IS NULL;

-- Refresh schema cache to ensure changes are recognized
NOTIFY pgrst, 'reload schema';

-- Clean up helper function
DROP FUNCTION IF EXISTS column_exists(text, text);

-- Success message
SELECT 'Schema fix migration completed successfully! All timestamp columns and triggers are now properly configured.' as message;
