--
-- PostgreSQL database dump
--

\restrict uDW5e6zMbR9npsngJcnAPlYF7jIAGQUePwSX8rFuWTK4Zde4BhhzPIpcqJTnXkW

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2025-11-22 23:04:30

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
-- TOC entry 4900 (class 1262 OID 16388)
-- Name: cc-ecommerce_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "cc-ecommerce_db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Vietnamese_Vietnam.1258';


ALTER DATABASE "cc-ecommerce_db" OWNER TO postgres;

\unrestrict uDW5e6zMbR9npsngJcnAPlYF7jIAGQUePwSX8rFuWTK4Zde4BhhzPIpcqJTnXkW
\encoding SQL_ASCII
\connect -reuse-previous=on "dbname='cc-ecommerce_db'"
\restrict uDW5e6zMbR9npsngJcnAPlYF7jIAGQUePwSX8rFuWTK4Zde4BhhzPIpcqJTnXkW

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
-- TOC entry 4876 (class 0 OID 24581)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (3, 'nghiemledo@gmail.com', '3f0e018b340eba1d5dd4b24397fc8b7c:8f8fac69fb5b8d1939d9c121f57ff697eee467f02150feffab5989069b84a38658f79f9bdc4a414c6e1bfd713497be2d5db7985d4b3a4c52823c247771c0c672', 'Lê Đỗ Nghiêm', NULL, NULL, 'customer', '2025-11-22 12:15:34.367173', '2025-11-22 12:15:34.367173');
INSERT INTO public.users VALUES (4, 'admin@gmail.com', '67bd9f1addf0ad7c7d58c4d6f112ad6a:4c7db83980706719aecd736963bca2b97d2c88d5ac6ab49aa8b92dad23f20d5f7a0c614bc55b4113561d3a27fb159dd76345920fd81acdc0ea5abf4e4d4d63f3', 'admin', NULL, NULL, 'admin', '2025-11-22 20:33:23.00577', '2025-11-22 20:33:23.00577');


--
-- TOC entry 4882 (class 0 OID 24621)
-- Dependencies: 224
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.carts VALUES (2, 3, '2025-11-22 20:20:48.432786');
INSERT INTO public.carts VALUES (3, 4, '2025-11-22 20:33:23.016814');


--
-- TOC entry 4878 (class 0 OID 24595)
-- Dependencies: 220
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories VALUES (4, 'Apple', NULL, '2025-09-14 18:56:39.516868', 'apple');
INSERT INTO public.categories VALUES (1, 'Samsung', 'Electronic devices and gadgets', '2025-09-14 14:58:37.405858', 'samsung');
INSERT INTO public.categories VALUES (2, 'Xiaomi', 'Laptops and notebooks', '2025-09-14 14:58:37.405858', 'xiaomi');
INSERT INTO public.categories VALUES (3, 'Oppo', 'Audio devices and headphones', '2025-09-14 14:58:37.405858', 'oppo');
INSERT INTO public.categories VALUES (6, 'Vivo', NULL, '2025-09-15 13:58:01.777658', 'vivo');
INSERT INTO public.categories VALUES (5, 'Redmagic', NULL, '2025-09-15 13:57:57.727513', 'redmagic');


--
-- TOC entry 4880 (class 0 OID 24605)
-- Dependencies: 222
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.products VALUES (26, 5, 'REDMAGIC 10 PRO 16GB/512GB', 'REDMAGIC 10 PRO 16GB/512GB', 21.99, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/11/redmagic-10-pro-bac-1.png', '2025-09-15 14:23:51.158521', '2025-09-15 14:23:51.158521', 'redmagic-10-pro-16gb-512gb');
INSERT INTO public.products VALUES (27, 5, 'REDMAGIC Nova Gaming 16GB/512GB', 'REDMAGIC Nova Gaming 16GB/512GB', 17.99, 100, 'https://cdn.hoanghamobile.vn/i/preview-h-V2/Uploads/2024/12/11/redmagic-nova-gaming-den-2.png', '2025-09-15 14:24:21.483857', '2025-09-15 14:24:50.433736', 'redmagic-nova-gaming-16gb-512gb');
INSERT INTO public.products VALUES (28, 6, 'Vivo V50 Lite 5G (12GB/256GB)', 'Vivo V50 Lite 5G (12GB/256GB)', 8.99, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/04/18/vivo-v50-lite-5g-1_638805658568174613.png', '2025-09-15 14:25:44.26447', '2025-09-15 14:25:44.26447', 'vivo-v50-lite-5g-12gb-256gb-');
INSERT INTO public.products VALUES (29, 6, 'Vivo Y04 (V2430) (6GB/128GB)', 'Vivo Y04 (V2430) (6GB/128GB)', 3.39, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/03/11/y04-v2430-5.png', '2025-09-15 14:26:16.188358', '2025-09-15 14:26:16.188358', 'vivo-y04-v2430-6gb-128gb-');
INSERT INTO public.products VALUES (30, 6, 'Vivo Y19S 8/128GB', 'Vivo Y19S 8/128GB', 3.89, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/10/16/vivo-y19s-bac-1.png', '2025-09-15 14:27:30.761108', '2025-09-15 14:27:30.761108', 'vivo-y19s-8-128gb');
INSERT INTO public.products VALUES (31, 6, 'Vivo T1 5G', 'Vivo T1 5G', 7.25, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2022/07/11/image-removebg-preview-32.png', '2025-09-15 14:27:59.693083', '2025-09-15 14:27:59.693083', 'vivo-t1-5g');
INSERT INTO public.products VALUES (7, 4, 'iPhone 17 Pro Max - 256GB', 'iPhone 17 Pro Max - 256GB', 37.99, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/09/10/iphone-17-pro-max-deep-blue-pdp-image-position-1-deep-blue-color-vn-vi.jpg', '2025-09-15 14:02:02.097734', '2025-09-15 14:02:02.097734', 'iphone-17-pro-max-256gb');
INSERT INTO public.products VALUES (2, 4, 'iPhone 16 (128GB) ', 'iPhone 16 (128GB) ', 18.59, 50, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/02/iphone-16-trang-1.png', '2025-09-14 14:58:37.412955', '2025-09-15 14:02:47.805066', 'iphone-16-128gb-');
INSERT INTO public.products VALUES (3, 4, 'iPhone 16 Pro Max (256GB)', 'iPhone 16 Pro Max (256GB)', 29.69, 30, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/02/iphone-16-pro-max-sa-mac-1.png', '2025-09-14 14:58:37.412955', '2025-09-15 14:03:16.964037', 'iphone-16-pro-max-256gb-');
INSERT INTO public.products VALUES (4, 4, 'iPhone 16e (256GB) ', 'iPhone 16e (256GB) ', 18.35, 50, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/02/20/iphone-16e-den-1.png', '2025-09-14 14:58:37.412955', '2025-09-15 14:03:53.456615', 'iphone-16e-256gb-');
INSERT INTO public.products VALUES (5, 4, 'iPhone 16 Plus (128GB)', 'iPhone 16 Plus (128GB)', 21.69, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/02/iphone-16-plus-hong-1.png', '2025-09-14 14:58:37.412955', '2025-09-15 14:04:35.735196', 'iphone-16-plus-128gb-');
INSERT INTO public.products VALUES (6, 4, 'iPhone 16 Pro (128GB)', 'iPhone 16 Pro (128GB)', 24.49, 25, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/02/iphone-16-pro-sa-mac-1.png', '2025-09-14 14:58:37.412955', '2025-09-15 14:05:04.753225', 'iphone-16-pro-128gb-');
INSERT INTO public.products VALUES (8, 1, 'Samsung Galaxy Z Fold7 5G 12GB/512GB', 'Samsung Galaxy Z Fold7 5G 12GB/512GB', 47.99, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/07/09/thumb-fold7-xanh-navy.png', '2025-09-15 14:08:36.822119', '2025-09-15 14:08:36.822119', 'samsung-galaxy-z-fold7-5g-12gb-512gb');
INSERT INTO public.products VALUES (9, 1, 'Samsung Galaxy Z Flip7 5G 12GB/512GB', 'Samsung Galaxy Z Flip7 5G 12GB/512GB', 30.99, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/07/09/thumb-flip7-xanh-navy.png', '2025-09-15 14:10:18.932777', '2025-09-15 14:10:18.932777', 'samsung-galaxy-z-flip7-5g-12gb-512gb');
INSERT INTO public.products VALUES (10, 1, 'Samsung Galaxy A56 5G - 8GB/128GB', 'Samsung Galaxy A56 5G - 8GB/128GB', 8.49, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/03/20/a56-xam-marble.png', '2025-09-15 14:10:53.086889', '2025-09-15 14:10:53.086889', 'samsung-galaxy-a56-5g-8gb-128gb');
INSERT INTO public.products VALUES (11, 1, 'Samsung Galaxy S25 - 12GB/256GB', 'Samsung Galaxy S25 - 12GB/256GB', 17.49, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/01/23/galaxy-s25-blue-1-b404affd42.png', '2025-09-15 14:11:45.092673', '2025-09-15 14:11:45.092673', 'samsung-galaxy-s25-12gb-256gb');
INSERT INTO public.products VALUES (12, 2, 'Xiaomi 15 12GB/256GB', 'Xiaomi 15 12GB/256GB', 19.89, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/02/28/xiaomi-15-trang.png', '2025-09-15 14:14:18.158546', '2025-09-15 14:14:18.158546', 'xiaomi-15-12gb-256gb');
INSERT INTO public.products VALUES (13, 2, 'Xiaomi 15 Ultra 16GB/512GB', 'Xiaomi 15 Ultra 16GB/512GB', 28.79, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/03/02/bac.png', '2025-09-15 14:14:57.438208', '2025-09-15 14:14:57.438208', 'xiaomi-15-ultra-16gb-512gb');
INSERT INTO public.products VALUES (14, 2, 'Xiaomi Redmi 13 (8GB/128GB)', 'Xiaomi Redmi 13 (8GB/128GB)', 3.39, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/04/08/redmi-13-xanh-duong-1.png', '2025-09-15 14:15:31.384288', '2025-09-15 14:15:31.384288', 'xiaomi-redmi-13-8gb-128gb-');
INSERT INTO public.products VALUES (15, 2, 'Xiaomi Redmi Note 14 Pro+ 5G 8GB/256GB', 'Xiaomi Redmi Note 14 Pro+ 5G 8GB/256GB', 8.95, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/01/10/redmi-note-14-pro-purple.png', '2025-09-15 14:16:13.030692', '2025-09-15 14:16:13.030692', 'xiaomi-redmi-note-14-pro-5g-8gb-256gb');
INSERT INTO public.products VALUES (16, 2, 'Xiaomi POCO M6 8GB/256GB', 'Xiaomi POCO M6 8GB/256GB', 4.29, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/09/08/poco-m6-black-1.png', '2025-09-15 14:16:47.833043', '2025-09-15 14:16:47.833043', 'xiaomi-poco-m6-8gb-256gb');
INSERT INTO public.products VALUES (17, 2, 'Xiaomi Redmi Note 14 5G 8GB/256GB', 'Xiaomi Redmi Note 14 5G 8GB/256GB', 6.69, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/03/31/redmi-note-14-5g-tim-3.jpg', '2025-09-15 14:17:18.650564', '2025-09-15 14:17:18.650564', 'xiaomi-redmi-note-14-5g-8gb-256gb');
INSERT INTO public.products VALUES (18, 3, 'OPPO Reno13 F 5G 12GB/256GB', 'OPPO Reno13 F 5G 12GB/256GB', 10.19, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/26/combo-product-reno13f-rhyder-grey.png', '2025-09-15 14:18:08.123946', '2025-09-15 14:18:08.123946', 'oppo-reno13-f-5g-12gb-256gb');
INSERT INTO public.products VALUES (19, 3, 'OPPO A5i 4GB+128GB', 'OPPO A5i 4GB+128GB', 3.59, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/07/18/a5i-do.png', '2025-09-15 14:18:41.947257', '2025-09-15 14:18:41.947257', 'oppo-a5i-4gb-128gb');
INSERT INTO public.products VALUES (20, 3, 'Reno14 F 5G 8GB+256GB', 'Reno14 F 5G 8GB+256GB', 10.29, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/06/25/reno14-f-combo-product-blue.png', '2025-09-15 14:19:15.9803', '2025-09-15 14:19:15.9803', 'reno14-f-5g-8gb-256gb');
INSERT INTO public.products VALUES (21, 3, 'OPPO Reno12 F 4G 8GB 256GB', 'OPPO Reno12 F 4G 8GB 256GB', 6.29, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/04/15/combo-product-reno12-f-grey.png', '2025-09-15 14:19:49.838742', '2025-09-15 14:19:49.838742', 'oppo-reno12-f-4g-8gb-256gb');
INSERT INTO public.products VALUES (22, 3, 'OPPO Find N3 Flip (12GB/256GB)', 'OPPO Find N3 Flip (12GB/256GB)', 19.99, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2023/10/27/oppo-find-n3-flip.png', '2025-09-15 14:20:23.560423', '2025-09-15 14:20:23.560423', 'oppo-find-n3-flip-12gb-256gb-');
INSERT INTO public.products VALUES (23, 3, 'OPPO Reno11 F 5G (8GB/256GB)', 'OPPO Reno11 F 5G (8GB/256GB)', 7.59, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/04/25/reno11-f-1.png', '2025-09-15 14:21:02.055323', '2025-09-15 14:21:02.055323', 'oppo-reno11-f-5g-8gb-256gb-');
INSERT INTO public.products VALUES (24, 5, 'REDMAGIC 10S PRO 16GB/512GB', 'REDMAGIC 10S PRO 16GB/512GB', 22.99, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2025/07/21/redmagic-black-11.png', '2025-09-15 14:22:34.470453', '2025-09-15 14:22:34.470453', 'redmagic-10s-pro-16gb-512gb');
INSERT INTO public.products VALUES (25, 5, 'REDMAGIC 10 PRO 12GB/256GB', 'REDMAGIC 10 PRO 12GB/256GB', 17.99, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2024/12/11/redmagic-10-pro-den-1.png', '2025-09-15 14:23:17.175567', '2025-09-15 14:23:17.175567', 'redmagic-10-pro-12gb-256gb');
INSERT INTO public.products VALUES (32, 6, 'Vivo Y02s - 3GB/32GB', 'Vivo Y02s - 3GB/32GB', 2.79, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2022/07/25/image-removebg-preview-1_637943663994239574.png', '2025-09-15 14:28:30.633064', '2025-09-15 14:28:30.633064', 'vivo-y02s-3gb-32gb');
INSERT INTO public.products VALUES (33, 6, 'Vivo V27e', 'Vivo V27e', 7.49, 100, 'https://cdn.hoanghamobile.vn/i/previewV2/Uploads/2023/05/10/v27e-2.png', '2025-09-15 14:29:07.346666', '2025-09-15 14:29:07.346666', 'vivo-v27e');
INSERT INTO public.products VALUES (35, 4, 'IPhone 5s', 'IPhone 5s Desctiption', 799.00, 20, 'https://images-cdn.ubuy.co.in/66d63b3455ef25410c1f2cc2-pre-owned-iphone-5s-16gb-32gb-64gb.jpg', '2025-11-14 20:57:04.561195', '2025-11-14 20:57:04.561195', 'iphone-5s');


--
-- TOC entry 4884 (class 0 OID 24634)
-- Dependencies: 226
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.cart_items VALUES (5, 2, 3, 1, '2025-11-22 20:30:09.487149');


--
-- TOC entry 4886 (class 0 OID 24652)
-- Dependencies: 228
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.orders VALUES (5, 3, 59.38, 'processing', 'Lê Đỗ Nghiêm 3333
60 Nguyễn Thi , phường Hòa Cường Nam
Đà Nẵng, Hai Chau 50000
Việt Nam
Phone: 0815819975', '2025-11-22 20:21:35.10648');
INSERT INTO public.orders VALUES (4, 3, 29.69, 'delivered', 'Lê Đỗ Nghiêm 2
60 Nguyễn Thi , phường Hòa Cường Nam
Đà Nẵng, Hai Chau 50000
Việt Nam
Phone: 0815819975', '2025-11-22 20:10:16.639313');
INSERT INTO public.orders VALUES (3, 3, 29.69, 'shipped', 'Lê Đỗ Nghiêm
60 Nguyễn Thi , phường Hòa Cường Nam
Đà Nẵng, Hai Chau 50000
Việt Nam
Phone: 0815819975', '2025-11-22 20:08:53.306991');
INSERT INTO public.orders VALUES (2, NULL, 29.69, 'cancelled', 'Lê Nghiêm
60 Nguyễn Thi , phường Hòa Cường Nam
Đà Nẵng, Hai Chau 50000
Việt Nam
Phone: 0815819975', '2025-11-22 20:05:48.628873');
INSERT INTO public.orders VALUES (1, 3, 1043.30, 'processing', '60 Nguyễn Thi , phường Hòa Cường Nam, Đà Nẵng, Hai Chau 50000, Việt Nam', '2025-11-22 19:42:23.594532');


--
-- TOC entry 4888 (class 0 OID 24668)
-- Dependencies: 230
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.order_items VALUES (1, 1, 2, 13, 18.59, '2025-11-22 19:42:23.614884');
INSERT INTO public.order_items VALUES (2, 1, 3, 27, 29.69, '2025-11-22 19:42:23.619865');
INSERT INTO public.order_items VALUES (3, 2, 3, 1, 29.69, '2025-11-22 20:05:48.646384');
INSERT INTO public.order_items VALUES (4, 3, 3, 1, 29.69, '2025-11-22 20:08:53.314815');
INSERT INTO public.order_items VALUES (5, 4, 3, 1, 29.69, '2025-11-22 20:10:16.646602');
INSERT INTO public.order_items VALUES (6, 5, 3, 2, 29.69, '2025-11-22 20:21:35.112678');


--
-- TOC entry 4892 (class 0 OID 24707)
-- Dependencies: 234
-- Data for Name: promotions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.promotions VALUES (1, 'DISCOUNT10', 10.00, '2025-09-01 00:00:00', '2025-12-31 00:00:00', '2025-09-14 14:58:37.417779');
INSERT INTO public.promotions VALUES (2, 'SALE20', 20.00, '2025-10-01 00:00:00', '2025-11-30 00:00:00', '2025-09-14 14:58:37.417779');


--
-- TOC entry 4894 (class 0 OID 24717)
-- Dependencies: 236
-- Data for Name: order_promotions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4890 (class 0 OID 24686)
-- Dependencies: 232
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 225
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 5, true);


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 223
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 3, true);


--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 219
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 229
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 6, true);


--
-- TOC entry 4905 (class 0 OID 0)
-- Dependencies: 235
-- Name: order_promotions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_promotions_id_seq', 1, false);


--
-- TOC entry 4906 (class 0 OID 0)
-- Dependencies: 227
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 5, true);


--
-- TOC entry 4907 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 35, true);


--
-- TOC entry 4908 (class 0 OID 0)
-- Dependencies: 233
-- Name: promotions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.promotions_id_seq', 2, true);


--
-- TOC entry 4909 (class 0 OID 0)
-- Dependencies: 231
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- TOC entry 4910 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 4, true);


-- Completed on 2025-11-22 23:04:30

--
-- PostgreSQL database dump complete
--

\unrestrict uDW5e6zMbR9npsngJcnAPlYF7jIAGQUePwSX8rFuWTK4Zde4BhhzPIpcqJTnXkW

