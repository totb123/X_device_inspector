--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: boards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.boards (
    board_id integer NOT NULL,
    datamatrix text,
    multiboard_id integer,
    status text
);


ALTER TABLE public.boards OWNER TO postgres;

--
-- Name: inspections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspections (
    inspection_id integer NOT NULL,
    "time" timestamp with time zone,
    multiboard_id integer,
    url_image text,
    sector_id integer,
    comment text
);


ALTER TABLE public.inspections OWNER TO postgres;

--
-- Name: multiboards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.multiboards (
    multiboard_id integer NOT NULL
);


ALTER TABLE public.multiboards OWNER TO postgres;

--
-- Name: sector; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sector (
    id integer,
    step_num integer,
    name text
);


ALTER TABLE public.sector OWNER TO postgres;

--
-- Name: sectors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sectors (
    sector_id integer NOT NULL,
    step_num integer,
    sector_name text
);


ALTER TABLE public.sectors OWNER TO postgres;

--
-- Name: sectors_dm_position; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sectors_dm_position (
    id integer NOT NULL,
    id_sector integer,
    side character varying(10),
    coordinates_1 character varying(20),
    coordinates_2 character varying(20),
    coordinates_3 character varying(20),
    coordinates_4 character varying(20),
    coordinates_5 character varying(20),
    coordinates_6 character varying(20),
    coordinates_7 character varying(20),
    coordinates_8 character varying(20)
);


ALTER TABLE public.sectors_dm_position OWNER TO postgres;

--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.boards (board_id, datamatrix, multiboard_id, status) FROM stdin;
18	0	3	UNCHECKED
19	0	3	UNCHECKED
20	0	3	UNCHECKED
21	0	3	UNCHECKED
22	0	3	UNCHECKED
23	0	3	UNCHECKED
24	0	3	UNCHECKED
25	0	3	UNCHECKED
27	0	4	UNCHECKED
28	0	4	UNCHECKED
29	0	4	UNCHECKED
30	0	4	UNCHECKED
31	0	4	UNCHECKED
32	0	4	UNCHECKED
33	0	4	UNCHECKED
34	0	4	UNCHECKED
36	0	5	UNCHECKED
37	0	5	UNCHECKED
38	0	5	UNCHECKED
39	0	5	UNCHECKED
40	0	5	UNCHECKED
41	0	5	UNCHECKED
42	0	5	UNCHECKED
43	0	5	UNCHECKED
45	0	6	UNCHECKED
46	0	6	UNCHECKED
47	0	6	UNCHECKED
48	0	6	UNCHECKED
49	0	6	UNCHECKED
50	0	6	UNCHECKED
51	0	6	UNCHECKED
52	0	6	UNCHECKED
54	0	7	UNCHECKED
55	0	7	UNCHECKED
56	0	7	UNCHECKED
57	0	7	UNCHECKED
58	0	7	UNCHECKED
59	0	7	UNCHECKED
60	0	7	UNCHECKED
61	0	7	UNCHECKED
63	0	9	UNCHECKED
64	0	9	UNCHECKED
65	0	9	UNCHECKED
66	0	9	UNCHECKED
67	0	9	UNCHECKED
68	0	9	UNCHECKED
69	0	9	UNCHECKED
70	0	9	UNCHECKED
1	100000	1	DEFECTIVE
2	110000	1	DEFECTIVE
3	120000	1	DEFECTIVE
4	130000	1	DEFECTIVE
5	140000	1	DEFECTIVE
6	150000	1	DEFECTIVE
7	160000	1	DEFECTIVE
8	170000	1	DEFECTIVE
81	0	11	UNCHECKED
82	0	11	UNCHECKED
83	0	11	UNCHECKED
84	0	11	UNCHECKED
85	0	11	UNCHECKED
86	0	11	UNCHECKED
87	0	11	UNCHECKED
88	0	11	UNCHECKED
90	0	12	UNCHECKED
91	0	12	UNCHECKED
92	0	12	UNCHECKED
93	0	12	UNCHECKED
94	0	12	UNCHECKED
95	0	12	UNCHECKED
96	0	12	UNCHECKED
97	0	12	UNCHECKED
99	0	13	UNCHECKED
100	0	13	UNCHECKED
101	0	13	UNCHECKED
102	0	13	UNCHECKED
103	0	13	UNCHECKED
104	0	13	UNCHECKED
105	0	13	UNCHECKED
106	0	13	UNCHECKED
108	0	14	UNCHECKED
109	0	14	UNCHECKED
110	0	14	UNCHECKED
111	0	14	UNCHECKED
112	0	14	UNCHECKED
113	0	14	UNCHECKED
114	0	14	UNCHECKED
115	0	14	UNCHECKED
117	0	15	UNCHECKED
118	0	15	UNCHECKED
119	0	15	UNCHECKED
120	0	15	UNCHECKED
121	0	15	UNCHECKED
122	0	15	UNCHECKED
123	0	15	UNCHECKED
124	0	15	UNCHECKED
72	1000000001	10	CHECKED
73	1000000002	10	CHECKED
74	1000000003	10	CHECKED
75	1000000004	10	CHECKED
76	1000000005	10	CHECKED
77	1000000006	10	CHECKED
78	1000000007	10	CHECKED
79	1000000008	10	CHECKED
9	180000	2	CHECKED
10	190000	2	CHECKED
11	200000	2	CHECKED
12	210000	2	CHECKED
13	220000	2	CHECKED
14	230000	2	CHECKED
15	240000	2	CHECKED
16	250000	2	CHECKED
\.


--
-- Data for Name: inspections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspections (inspection_id, "time", multiboard_id, url_image, sector_id, comment) FROM stdin;
5	2024-01-12 00:00:00+03	2	image11.jpg	1	\N
6	2024-01-20 00:00:00+03	2	image12.jpg	2	\N
7	2024-01-22 00:00:00+03	2	image13.jpg	3	\N
8	2024-01-23 00:00:00+03	2	image14.jpg	4	\N
9	2024-02-18 14:01:32.934101+03	5	img//2024_02_18_14_01_32_1.jpg	1	\N
10	2024-02-18 14:05:37.743314+03	6	img//2024_02_18_14_05_37_1.jpg	1	\N
11	2024-02-18 14:14:58.981444+03	7	img//2024_02_18_14_14_58_1.jpg	1	\N
12	2024-02-18 14:33:23.785458+03	9	img//2024_02_18_14_33_23_1.jpg	1	\N
13	2024-02-18 14:50:36.796848+03	10	img//2024_02_18_14_50_36_1.jpg	1	\N
1	2024-01-15 00:00:00+03	1	image1.jpg	1	comment
2	2024-01-16 00:00:00+03	1	image2.jpg	2	comment
3	2024-01-17 00:00:00+03	1	image3.jpg	3	comment
4	2024-01-18 00:00:00+03	1	image4.jpg	4	comment
14	2024-02-25 18:50:27.363604+03	11	img//2024_02_25_18_50_27_1.jpg	1	\N
15	2024-02-25 18:53:16.074566+03	12	img//2024_02_25_18_53_16_1.jpg	1	\N
16	2024-02-25 18:54:11.153078+03	13	img//2024_02_25_18_54_11_1.jpg	1	\N
17	2024-02-25 18:57:35.592448+03	14	img//2024_02_25_18_57_35_1.jpg	1	\N
18	2024-02-25 18:59:05.497682+03	15	img//2024_02_25_18_59_05_1.jpg	1	\N
19	2024-02-25 19:16:58.369705+03	3	img//2024_02_25_19_16_58_1.jpg	1	\N
\.


--
-- Data for Name: multiboards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.multiboards (multiboard_id) FROM stdin;
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
\.


--
-- Data for Name: sector; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sector (id, step_num, name) FROM stdin;
1	1	Гравёр
2	2	Паста
3	3	SMD-компоненты
4	4	Печь
\.


--
-- Data for Name: sectors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sectors (sector_id, step_num, sector_name) FROM stdin;
1	1	Гравёр
2	2	Паста
3	3	SMD-компоненты
4	4	Печь
\.


--
-- Data for Name: sectors_dm_position; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sectors_dm_position (id, id_sector, side, coordinates_1, coordinates_2, coordinates_3, coordinates_4, coordinates_5, coordinates_6, coordinates_7, coordinates_8) FROM stdin;
3	2	top	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)
5	3	top	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)
6	3	bot	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)
7	4	top	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)
8	4	bot	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)	(100,200)
4	2	bot	1,1,1,1	2,2,2,2	3,3,3,3	4,4,4,4	5,5,5,5	6,6,6,6	7,7,7,7	8,8,8,8
2	1	bot	100,350,750,900	100,350,750,900	100,350,750,900	100,350,750,900	100,350,750,900	100,350,750,900	100,350,750,900	100,350,750,900
1	1	top	140,210,200,280	160,225,550,615	160,225,875,940	165,230,1205,1270	860,920,420,485	865,925,750,815	865,925,1075,1140	865,925,1400,1465
\.


--
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (board_id);


--
-- Name: inspections inspections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_pkey PRIMARY KEY (inspection_id);


--
-- Name: multiboards multiboards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.multiboards
    ADD CONSTRAINT multiboards_pkey PRIMARY KEY (multiboard_id);


--
-- Name: sectors_dm_position sectors_dm_position_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors_dm_position
    ADD CONSTRAINT sectors_dm_position_pkey PRIMARY KEY (id);


--
-- Name: sectors sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors
    ADD CONSTRAINT sectors_pkey PRIMARY KEY (sector_id);


--
-- Name: boards boards_multiboard_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_multiboard_id_fkey FOREIGN KEY (multiboard_id) REFERENCES public.multiboards(multiboard_id);


--
-- Name: inspections inspections_multiboard_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_multiboard_id_fkey FOREIGN KEY (multiboard_id) REFERENCES public.multiboards(multiboard_id);


--
-- Name: inspections inspections_sector_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_sector_id_fkey FOREIGN KEY (sector_id) REFERENCES public.sectors(sector_id);


--
-- Name: sectors_dm_position sectors_dm_position_id_sector_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors_dm_position
    ADD CONSTRAINT sectors_dm_position_id_sector_fkey FOREIGN KEY (id_sector) REFERENCES public.sectors(sector_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

