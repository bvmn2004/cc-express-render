-- Cấu hình cơ bản
SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

-- 1. Functions & Triggers
CREATE OR REPLACE FUNCTION public.generate_slug(input_text text) RETURNS text
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN lower(regexp_replace(trim(input_text), '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$;

CREATE OR REPLACE FUNCTION public.set_category_slug() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.name IS NOT NULL THEN
    NEW.slug := generate_slug(NEW.name);
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.set_product_slug() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.name IS NOT NULL THEN
    NEW.slug := generate_slug(NEW.name);
  END IF;
  RETURN NEW;
END;
$$;

-- 2. Create Tables (Thứ tự quan trọng để tránh lỗi khóa ngoại)

-- Users
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    email character varying(255) NOT NULL UNIQUE,
    password character varying(255) NOT NULL,
    full_name character varying(255),
    phone character varying(20),
    address text,
    role character varying(50) DEFAULT 'customer',
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- Categories
CREATE TABLE IF NOT EXISTS public.categories (
    id SERIAL PRIMARY KEY,
    name character varying(255) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    slug character varying(255) NOT NULL UNIQUE
);

-- Products
CREATE TABLE IF NOT EXISTS public.products (
    id SERIAL PRIMARY KEY,
    category_id integer REFERENCES public.categories(id),
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    stock_quantity integer NOT NULL,
    image_url character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    slug character varying(255) NOT NULL UNIQUE
);

-- Carts
CREATE TABLE IF NOT EXISTS public.carts (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES public.users(id),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- Cart Items
CREATE TABLE IF NOT EXISTS public.cart_items (
    id SERIAL PRIMARY KEY,
    cart_id integer REFERENCES public.carts(id),
    product_id integer REFERENCES public.products(id),
    quantity integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- Orders
CREATE TABLE IF NOT EXISTS public.orders (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES public.users(id),
    total_amount numeric(10,2) NOT NULL,
    status character varying(50) DEFAULT 'pending',
    shipping_address text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- Order Items
CREATE TABLE IF NOT EXISTS public.order_items (
    id SERIAL PRIMARY KEY,
    order_id integer REFERENCES public.orders(id),
    product_id integer REFERENCES public.products(id),
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- Promotions
CREATE TABLE IF NOT EXISTS public.promotions (
    id SERIAL PRIMARY KEY,
    code character varying(50) NOT NULL UNIQUE,
    discount_percentage numeric(5,2),
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- Order Promotions
CREATE TABLE IF NOT EXISTS public.order_promotions (
    id SERIAL PRIMARY KEY,
    order_id integer REFERENCES public.orders(id),
    promotion_id integer REFERENCES public.promotions(id),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- Reviews
CREATE TABLE IF NOT EXISTS public.reviews (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES public.users(id),
    product_id integer REFERENCES public.products(id),
    rating integer CHECK (rating >= 1 AND rating <= 5),
    comment text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

-- 3. Apply Triggers
DROP TRIGGER IF EXISTS trg_set_category_slug ON public.categories;
CREATE TRIGGER trg_set_category_slug BEFORE INSERT OR UPDATE OF name ON public.categories FOR EACH ROW EXECUTE FUNCTION public.set_category_slug();

DROP TRIGGER IF EXISTS trg_set_product_slug ON public.products;
CREATE TRIGGER trg_set_product_slug BEFORE INSERT OR UPDATE OF name ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_product_slug();