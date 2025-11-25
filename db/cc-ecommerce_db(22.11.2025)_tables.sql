--
-- PostgreSQL database dump
--

\restrict 2MppAgeoYXFWVfSDuFBSmpdeVSuxdWqsjxvWHVQ6aCnt6qMADmjgiLdGMgXEN4N

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-11-22 22:58:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 237 (class 1255 OID 32784)
-- Name: generate_slug(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.generate_slug(input_text text) RETURNS text
    LANGUAGE plpgsql
    AS $$
BEGIN
  RETURN lower(regexp_replace(trim(input_text), '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$;


ALTER FUNCTION public.generate_slug(input_text text) OWNER TO postgres;

--
-- TOC entry 239 (class 1255 OID 32786)
-- Name: set_category_slug(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_category_slug() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.name IS NOT NULL THEN
    NEW.slug := generate_slug(NEW.name);
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.set_category_slug() OWNER TO postgres;

--
-- TOC entry 238 (class 1255 OID 32785)
-- Name: set_product_slug(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_product_slug() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.name IS NOT NULL THEN
    NEW.slug := generate_slug(NEW.name);
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.set_product_slug() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 24634)
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.cart_items (
    id integer NOT NULL,
    cart_id integer,
    product_id integer,
    quantity integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24633)
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO postgres;

--
-- TOC entry 4925 (class 0 OID 0)
-- Dependencies: 225
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- TOC entry 224 (class 1259 OID 24621)
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.carts (
    id integer NOT NULL,
    user_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24620)
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carts_id_seq OWNER TO postgres;

--
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 223
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- TOC entry 220 (class 1259 OID 24595)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    slug character varying(255) NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24594)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 219
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 230 (class 1259 OID 24668)
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.order_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24667)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO postgres;

--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 229
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- TOC entry 236 (class 1259 OID 24717)
-- Name: order_promotions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.order_promotions (
    id integer NOT NULL,
    order_id integer,
    promotion_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.order_promotions OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 24716)
-- Name: order_promotions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_promotions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_promotions_id_seq OWNER TO postgres;

--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 235
-- Name: order_promotions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_promotions_id_seq OWNED BY public.order_promotions.id;


--
-- TOC entry 228 (class 1259 OID 24652)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.orders (
    id integer NOT NULL,
    user_id integer,
    total_amount numeric(10,2) NOT NULL,
    status character varying(50) DEFAULT 'pending'::character varying,
    shipping_address text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24651)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 4930 (class 0 OID 0)
-- Dependencies: 227
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 222 (class 1259 OID 24605)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.products (
    id integer NOT NULL,
    category_id integer,
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    stock_quantity integer NOT NULL,
    image_url character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    slug character varying(255) NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24604)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 234 (class 1259 OID 24707)
-- Name: promotions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.promotions (
    id integer NOT NULL,
    code character varying(50) NOT NULL,
    discount_percentage numeric(5,2),
    start_date timestamp without time zone,
    end_date timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.promotions OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 24706)
-- Name: promotions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.promotions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.promotions_id_seq OWNER TO postgres;

--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 233
-- Name: promotions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.promotions_id_seq OWNED BY public.promotions.id;


--
-- TOC entry 232 (class 1259 OID 24686)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.reviews (
    id integer NOT NULL,
    user_id integer,
    product_id integer,
    rating integer,
    comment text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 24685)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 231
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 218 (class 1259 OID 24581)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE IF NOT EXISTS public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    full_name character varying(255),
    phone character varying(20),
    address text,
    role character varying(50) DEFAULT 'customer'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24580)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4700 (class 2604 OID 24637)
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- TOC entry 4698 (class 2604 OID 24624)
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- TOC entry 4693 (class 2604 OID 24598)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 4705 (class 2604 OID 24671)
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- TOC entry 4711 (class 2604 OID 24720)
-- Name: order_promotions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_promotions ALTER COLUMN id SET DEFAULT nextval('public.order_promotions_id_seq'::regclass);


--
-- TOC entry 4702 (class 2604 OID 24655)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4695 (class 2604 OID 24608)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4709 (class 2604 OID 24710)
-- Name: promotions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions ALTER COLUMN id SET DEFAULT nextval('public.promotions_id_seq'::regclass);


--
-- TOC entry 4707 (class 2604 OID 24689)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 4689 (class 2604 OID 24584)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4909 (class 0 OID 24634)
-- Dependencies: 226
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, cart_id, product_id, quantity, created_at) FROM stdin;
5	2	3	1	2025-11-22 20:30:09.487149
\.


--
-- TOC entry 4907 (class 0 OID 24621)
-- Dependencies: 224
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (id, user_id, created_at) FROM stdin;
2	3	2025-11-22 20:20:48.432786
3	4	2025-11-22 20:33:23.016814
\.


--
-- TOC entry 4903 (class 0 OID 24595)
-- Dependencies: 220
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, description, created_at, slug) FROM stdin;
4	Apple	\N	2025-09-14 18:56:39.516868	apple
1	Samsung	Electronic devices and gadgets	2025-09-14 14:58:37.405858	samsung
2	Xiaomi	Laptops and notebooks	2025-09-14 14:58:37.405858	xiaomi
3	Oppo	Audio devices and headphones	2025-09-14 14:58:37.405858	oppo
6	Vivo	\N	2025-09-15 13:58:01.777658	vivo
5	Redmagic	\N	2025-09-15 13:57:57.727513	redmagic
\.


--
-- TOC entry 4913 (class 0 OID 24668)
-- Dependencies: 230
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, product_id, quantity, unit_price, created_at) FROM stdin;
1	1	2	13	18.59	2025-11-22 19:42:23.614884
2	1	3	27	29.69	2025-11-22 19:42:23.619865
3	2	3	1	29.69	2025-11-22 20:05:48.646384
4	3	3	1	29.69	2025-11-22 20:08:53.314815
5	4	3	1	29.69	2025-11-22 20:10:16.646602
6	5	3	2	29.69	2025-11-22 20:21:35.112678
\.


--
-- TOC entry 4919 (class 0 OID 24717)
-- Dependencies: 236
-- Data for Name: order_promotions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_promotions (id, order_id, promotion_id, created_at) FROM stdin;
\.


--
-- TOC entry 4911 (class 0 OID 24652)
-- Dependencies: 228
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, total_amount, status, shipping_address, created_at) FROM stdin;
5	3	59.38	processing	Lê Đỗ Nghiêm 3333\n60 Nguyễn Thi , phường Hòa Cường Nam\nĐà Nẵng, Hai Chau 50000\nViệt Nam\nPhone: 0815819975	2025-11-22 20:21:35.10648
4	3	29.69	delivered	Lê Đỗ Nghiêm 2\n60 Nguyễn Thi , phường Hòa Cường Nam\nĐà Nẵng, Hai Chau 50000\nViệt Nam\nPhone: 0815819975	2025-11-22 20:10:16.639313
3	3	29.69	shipped	Lê Đỗ Nghiêm\n60 Nguyễn Thi , phường Hòa Cường Nam\nĐà Nẵng, Hai Chau 50000\nViệt Nam\nPhone: 0815819975	2025-11-22 20:08:53.306991
2	\N	29.69	cancelled	Lê Nghiêm\n60 Nguyễn Thi , phường Hòa Cường Nam\nĐà Nẵng, Hai Chau 50000\nViệt Nam\nPhone: 0815819975	2025-11-22 20:05:48.628873
1	3	1043.30	processing	60 Nguyễn Thi , phường Hòa Cường Nam, Đà Nẵng, Hai Chau 50000, Việt Nam	2025-11-22 19:42:23.594532
\.


--
-- TOC entry 4905 (class 0 OID 24605)
-- Dependencies: 222
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, category_id, name, description, price, stock_quantity, image_url, created_at, updated_at, slug) FROM stdin;
26	5	REDMAGIC 10 PRO 16GB/512GB	REDMAGIC 10 PRO 16GB/512GB	21.99	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/11/redmagic-10-pro-bac-1.png	2025-09-15 14:23:51.158521	2025-09-15 14:23:51.158521	redmagic-10-pro-16gb-512gb
27	5	REDMAGIC Nova Gaming 16GB/512GB	REDMAGIC Nova Gaming 16GB/512GB	17.99	100	https://cdn.hoanghamobile.vn/i/preview-h-V2/Uploads/2024/12/11/redmagic-nova-gaming-den-2.png	2025-09-15 14:24:21.483857	2025-09-15 14:24:50.433736	redmagic-nova-gaming-16gb-512gb
28	6	Vivo V50 Lite 5G (12GB/256GB)	Vivo V50 Lite 5G (12GB/256GB)	8.99	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/04/18/vivo-v50-lite-5g-1_638805658568174613.png	2025-09-15 14:25:44.26447	2025-09-15 14:25:44.26447	vivo-v50-lite-5g-12gb-256gb-
29	6	Vivo Y04 (V2430) (6GB/128GB)	Vivo Y04 (V2430) (6GB/128GB)	3.39	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/03/11/y04-v2430-5.png	2025-09-15 14:26:16.188358	2025-09-15 14:26:16.188358	vivo-y04-v2430-6gb-128gb-
30	6	Vivo Y19S 8/128GB	Vivo Y19S 8/128GB	3.89	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/10/16/vivo-y19s-bac-1.png	2025-09-15 14:27:30.761108	2025-09-15 14:27:30.761108	vivo-y19s-8-128gb
31	6	Vivo T1 5G	Vivo T1 5G	7.25	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2022/07/11/image-removebg-preview-32.png	2025-09-15 14:27:59.693083	2025-09-15 14:27:59.693083	vivo-t1-5g
7	4	iPhone 17 Pro Max - 256GB	iPhone 17 Pro Max - 256GB	37.99	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/09/10/iphone-17-pro-max-deep-blue-pdp-image-position-1-deep-blue-color-vn-vi.jpg	2025-09-15 14:02:02.097734	2025-09-15 14:02:02.097734	iphone-17-pro-max-256gb
2	4	iPhone 16 (128GB) 	iPhone 16 (128GB) 	18.59	50	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/02/iphone-16-trang-1.png	2025-09-14 14:58:37.412955	2025-09-15 14:02:47.805066	iphone-16-128gb-
3	4	iPhone 16 Pro Max (256GB)	iPhone 16 Pro Max (256GB)	29.69	30	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/02/iphone-16-pro-max-sa-mac-1.png	2025-09-14 14:58:37.412955	2025-09-15 14:03:16.964037	iphone-16-pro-max-256gb-
4	4	iPhone 16e (256GB) 	iPhone 16e (256GB) 	18.35	50	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/02/20/iphone-16e-den-1.png	2025-09-14 14:58:37.412955	2025-09-15 14:03:53.456615	iphone-16e-256gb-
5	4	iPhone 16 Plus (128GB)	iPhone 16 Plus (128GB)	21.69	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/02/iphone-16-plus-hong-1.png	2025-09-14 14:58:37.412955	2025-09-15 14:04:35.735196	iphone-16-plus-128gb-
6	4	iPhone 16 Pro (128GB)	iPhone 16 Pro (128GB)	24.49	25	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/02/iphone-16-pro-sa-mac-1.png	2025-09-14 14:58:37.412955	2025-09-15 14:05:04.753225	iphone-16-pro-128gb-
8	1	Samsung Galaxy Z Fold7 5G 12GB/512GB	Samsung Galaxy Z Fold7 5G 12GB/512GB	47.99	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/07/09/thumb-fold7-xanh-navy.png	2025-09-15 14:08:36.822119	2025-09-15 14:08:36.822119	samsung-galaxy-z-fold7-5g-12gb-512gb
9	1	Samsung Galaxy Z Flip7 5G 12GB/512GB	Samsung Galaxy Z Flip7 5G 12GB/512GB	30.99	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/07/09/thumb-flip7-xanh-navy.png	2025-09-15 14:10:18.932777	2025-09-15 14:10:18.932777	samsung-galaxy-z-flip7-5g-12gb-512gb
10	1	Samsung Galaxy A56 5G - 8GB/128GB	Samsung Galaxy A56 5G - 8GB/128GB	8.49	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/03/20/a56-xam-marble.png	2025-09-15 14:10:53.086889	2025-09-15 14:10:53.086889	samsung-galaxy-a56-5g-8gb-128gb
11	1	Samsung Galaxy S25 - 12GB/256GB	Samsung Galaxy S25 - 12GB/256GB	17.49	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/01/23/galaxy-s25-blue-1-b404affd42.png	2025-09-15 14:11:45.092673	2025-09-15 14:11:45.092673	samsung-galaxy-s25-12gb-256gb
12	2	Xiaomi 15 12GB/256GB	Xiaomi 15 12GB/256GB	19.89	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/02/28/xiaomi-15-trang.png	2025-09-15 14:14:18.158546	2025-09-15 14:14:18.158546	xiaomi-15-12gb-256gb
13	2	Xiaomi 15 Ultra 16GB/512GB	Xiaomi 15 Ultra 16GB/512GB	28.79	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/03/02/bac.png	2025-09-15 14:14:57.438208	2025-09-15 14:14:57.438208	xiaomi-15-ultra-16gb-512gb
14	2	Xiaomi Redmi 13 (8GB/128GB)	Xiaomi Redmi 13 (8GB/128GB)	3.39	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/04/08/redmi-13-xanh-duong-1.png	2025-09-15 14:15:31.384288	2025-09-15 14:15:31.384288	xiaomi-redmi-13-8gb-128gb-
15	2	Xiaomi Redmi Note 14 Pro+ 5G 8GB/256GB	Xiaomi Redmi Note 14 Pro+ 5G 8GB/256GB	8.95	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/01/10/redmi-note-14-pro-purple.png	2025-09-15 14:16:13.030692	2025-09-15 14:16:13.030692	xiaomi-redmi-note-14-pro-5g-8gb-256gb
16	2	Xiaomi POCO M6 8GB/256GB	Xiaomi POCO M6 8GB/256GB	4.29	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/09/08/poco-m6-black-1.png	2025-09-15 14:16:47.833043	2025-09-15 14:16:47.833043	xiaomi-poco-m6-8gb-256gb
17	2	Xiaomi Redmi Note 14 5G 8GB/256GB	Xiaomi Redmi Note 14 5G 8GB/256GB	6.69	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/03/31/redmi-note-14-5g-tim-3.jpg	2025-09-15 14:17:18.650564	2025-09-15 14:17:18.650564	xiaomi-redmi-note-14-5g-8gb-256gb
18	3	OPPO Reno13 F 5G 12GB/256GB	OPPO Reno13 F 5G 12GB/256GB	10.19	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/26/combo-product-reno13f-rhyder-grey.png	2025-09-15 14:18:08.123946	2025-09-15 14:18:08.123946	oppo-reno13-f-5g-12gb-256gb
19	3	OPPO A5i 4GB+128GB	OPPO A5i 4GB+128GB	3.59	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/07/18/a5i-do.png	2025-09-15 14:18:41.947257	2025-09-15 14:18:41.947257	oppo-a5i-4gb-128gb
20	3	Reno14 F 5G 8GB+256GB	Reno14 F 5G 8GB+256GB	10.29	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/06/25/reno14-f-combo-product-blue.png	2025-09-15 14:19:15.9803	2025-09-15 14:19:15.9803	reno14-f-5g-8gb-256gb
21	3	OPPO Reno12 F 4G 8GB 256GB	OPPO Reno12 F 4G 8GB 256GB	6.29	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/04/15/combo-product-reno12-f-grey.png	2025-09-15 14:19:49.838742	2025-09-15 14:19:49.838742	oppo-reno12-f-4g-8gb-256gb
22	3	OPPO Find N3 Flip (12GB/256GB)	OPPO Find N3 Flip (12GB/256GB)	19.99	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2023/10/27/oppo-find-n3-flip.png	2025-09-15 14:20:23.560423	2025-09-15 14:20:23.560423	oppo-find-n3-flip-12gb-256gb-
23	3	OPPO Reno11 F 5G (8GB/256GB)	OPPO Reno11 F 5G (8GB/256GB)	7.59	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/04/25/reno11-f-1.png	2025-09-15 14:21:02.055323	2025-09-15 14:21:02.055323	oppo-reno11-f-5g-8gb-256gb-
24	5	REDMAGIC 10S PRO 16GB/512GB	REDMAGIC 10S PRO 16GB/512GB	22.99	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/07/21/redmagic-black-11.png	2025-09-15 14:22:34.470453	2025-09-15 14:22:34.470453	redmagic-10s-pro-16gb-512gb
25	5	REDMAGIC 10 PRO 12GB/256GB	REDMAGIC 10 PRO 12GB/256GB	17.99	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/11/redmagic-10-pro-den-1.png	2025-09-15 14:23:17.175567	2025-09-15 14:23:17.175567	redmagic-10-pro-12gb-256gb
32	6	Vivo Y02s - 3GB/32GB	Vivo Y02s - 3GB/32GB	2.79	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2022/07/25/image-removebg-preview-1_637943663994239574.png	2025-09-15 14:28:30.633064	2025-09-15 14:28:30.633064	vivo-y02s-3gb-32gb
33	6	Vivo V27e	Vivo V27e	7.49	100	https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2023/05/10/v27e-2.png	2025-09-15 14:29:07.346666	2025-09-15 14:29:07.346666	vivo-v27e
35	4	IPhone 5s	IPhone 5s Desctiption	799.00	20	https://images-cdn.ubuy.co.in/66d63b3455ef25410c1f2cc2-pre-owned-iphone-5s-16gb-32gb-64gb.jpg	2025-11-14 20:57:04.561195	2025-11-14 20:57:04.561195	iphone-5s
\.


--
-- TOC entry 4917 (class 0 OID 24707)
-- Dependencies: 234
-- Data for Name: promotions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.promotions (id, code, discount_percentage, start_date, end_date, created_at) FROM stdin;
1	DISCOUNT10	10.00	2025-09-01 00:00:00	2025-12-31 00:00:00	2025-09-14 14:58:37.417779
2	SALE20	20.00	2025-10-01 00:00:00	2025-11-30 00:00:00	2025-09-14 14:58:37.417779
\.


--
-- TOC entry 4915 (class 0 OID 24686)
-- Dependencies: 232
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, user_id, product_id, rating, comment, created_at) FROM stdin;
\.


--
-- TOC entry 4901 (class 0 OID 24581)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, full_name, phone, address, role, created_at, updated_at) FROM stdin;
3	nghiemledo@gmail.com	3f0e018b340eba1d5dd4b24397fc8b7c:8f8fac69fb5b8d1939d9c121f57ff697eee467f02150feffab5989069b84a38658f79f9bdc4a414c6e1bfd713497be2d5db7985d4b3a4c52823c247771c0c672	Lê Đỗ Nghiêm	\N	\N	customer	2025-11-22 12:15:34.367173	2025-11-22 12:15:34.367173
4	admin@gmail.com	67bd9f1addf0ad7c7d58c4d6f112ad6a:4c7db83980706719aecd736963bca2b97d2c88d5ac6ab49aa8b92dad23f20d5f7a0c614bc55b4113561d3a27fb159dd76345920fd81acdc0ea5abf4e4d4d63f3	admin	\N	\N	admin	2025-11-22 20:33:23.00577	2025-11-22 20:33:23.00577
\.


--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 225
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 5, true);


--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 223
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 3, true);


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 219
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 229
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 6, true);


--
-- TOC entry 4939 (class 0 OID 0)
-- Dependencies: 235
-- Name: order_promotions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_promotions_id_seq', 1, false);


--
-- TOC entry 4940 (class 0 OID 0)
-- Dependencies: 227
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 5, true);


--
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 35, true);


--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 233
-- Name: promotions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.promotions_id_seq', 2, true);


--
-- TOC entry 4943 (class 0 OID 0)
-- Dependencies: 231
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- TOC entry 4944 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


--
-- TOC entry 4729 (class 2606 OID 24640)
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4727 (class 2606 OID 24627)
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- TOC entry 4719 (class 2606 OID 24603)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4721 (class 2606 OID 32781)
-- Name: categories categories_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_slug_unique UNIQUE (slug);


--
-- TOC entry 4733 (class 2606 OID 24674)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4741 (class 2606 OID 24723)
-- Name: order_promotions order_promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_promotions
    ADD CONSTRAINT order_promotions_pkey PRIMARY KEY (id);


--
-- TOC entry 4731 (class 2606 OID 24661)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4723 (class 2606 OID 24614)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4725 (class 2606 OID 32783)
-- Name: products products_slug_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_slug_unique UNIQUE (slug);


--
-- TOC entry 4737 (class 2606 OID 24715)
-- Name: promotions promotions_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_code_key UNIQUE (code);


--
-- TOC entry 4739 (class 2606 OID 24713)
-- Name: promotions promotions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT promotions_pkey PRIMARY KEY (id);


--
-- TOC entry 4735 (class 2606 OID 24695)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 24593)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4717 (class 2606 OID 24591)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4753 (class 2620 OID 32788)
-- Name: categories trg_set_category_slug; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_set_category_slug BEFORE INSERT OR UPDATE OF name ON public.categories FOR EACH ROW EXECUTE FUNCTION public.set_category_slug();


--
-- TOC entry 4754 (class 2620 OID 32787)
-- Name: products trg_set_product_slug; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_set_product_slug BEFORE INSERT OR UPDATE OF name ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_product_slug();


--
-- TOC entry 4744 (class 2606 OID 24641)
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id);


--
-- TOC entry 4745 (class 2606 OID 24646)
-- Name: cart_items cart_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 4743 (class 2606 OID 24628)
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4747 (class 2606 OID 24675)
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- TOC entry 4748 (class 2606 OID 24680)
-- Name: order_items order_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 4751 (class 2606 OID 24724)
-- Name: order_promotions order_promotions_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_promotions
    ADD CONSTRAINT order_promotions_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- TOC entry 4752 (class 2606 OID 24729)
-- Name: order_promotions order_promotions_promotion_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_promotions
    ADD CONSTRAINT order_promotions_promotion_id_fkey FOREIGN KEY (promotion_id) REFERENCES public.promotions(id);


--
-- TOC entry 4746 (class 2606 OID 24662)
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4742 (class 2606 OID 24615)
-- Name: products products_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- TOC entry 4749 (class 2606 OID 24701)
-- Name: reviews reviews_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);


--
-- TOC entry 4750 (class 2606 OID 24696)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2025-11-22 22:58:58

--
-- PostgreSQL database dump complete
--

\unrestrict 2MppAgeoYXFWVfSDuFBSmpdeVSuxdWqsjxvWHVQ6aCnt6qMADmjgiLdGMgXEN4N

