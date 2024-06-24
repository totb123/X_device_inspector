--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.7

-- Started on 2024-05-12 15:15:11 MSK

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
-- TOC entry 3 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3634 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 286350)
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 286294)
-- Name: boards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.boards (
    id integer NOT NULL,
    datamatrix character varying,
    multiboard_id integer,
    status character varying
);


ALTER TABLE public.boards OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 286397)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    text character varying NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 286396)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO postgres;

--
-- TOC entry 3635 (class 0 OID 0)
-- Dependencies: 215
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 217 (class 1259 OID 286405)
-- Name: comments_of_inspection_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments_of_inspection_table (
    comment_id integer,
    inspection_id integer
);


ALTER TABLE public.comments_of_inspection_table OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 286299)
-- Name: inspections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspections (
    id integer NOT NULL,
    "time" timestamp without time zone,
    multiboard_id integer,
    url_image character varying,
    sector_id integer
);


ALTER TABLE public.inspections OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 286304)
-- Name: multiboards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.multiboards (
    multiboard_id integer NOT NULL
);


ALTER TABLE public.multiboards OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 286312)
-- Name: sectors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sectors (
    id integer NOT NULL,
    step_num integer,
    name character varying
);


ALTER TABLE public.sectors OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 286317)
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
-- TOC entry 3459 (class 2604 OID 286400)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 3625 (class 0 OID 286350)
-- Dependencies: 214
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
a57ff77a9d25
\.


--
-- TOC entry 3620 (class 0 OID 286294)
-- Dependencies: 209
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.boards (id, datamatrix, multiboard_id, status) FROM stdin;
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
72	1000000001	10	NORMAL
73	1000000002	10	NORMAL
74	1000000003	10	NORMAL
75	1000000004	10	NORMAL
76	1000000005	10	NORMAL
77	1000000006	10	NORMAL
78	1000000007	10	NORMAL
79	1000000008	10	NORMAL
9	180000	2	NORMAL
10	190000	2	NORMAL
11	200000	2	NORMAL
12	210000	2	NORMAL
13	220000	2	NORMAL
14	230000	2	NORMAL
15	240000	2	NORMAL
16	250000	2	NORMAL
1	100000	1	NORMAL
2	110000	1	NORMAL
3	120000	1	NORMAL
4	130000	1	NORMAL
5	140000	1	NORMAL
6	150000	1	NORMAL
7	160000	1	NORMAL
8	170000	1	NORMAL
\.


--
-- TOC entry 3627 (class 0 OID 286397)
-- Dependencies: 216
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, text) FROM stdin;
6	test
7	test
8	test
9	test200
10	test200
11	test200
12	test300
13	test400
14	test500
15	test 600
16	test 1203o10o2301
17	somebody that I used to know
18	somebody that I used to know
19	somebody that I used to know
\.


--
-- TOC entry 3628 (class 0 OID 286405)
-- Dependencies: 217
-- Data for Name: comments_of_inspection_table; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments_of_inspection_table (comment_id, inspection_id) FROM stdin;
6	1
7	1
8	1
9	1
10	1
11	1
12	1
13	1
14	1
15	1
16	1
17	2
18	2
19	2
\.


--
-- TOC entry 3621 (class 0 OID 286299)
-- Dependencies: 210
-- Data for Name: inspections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspections (id, "time", multiboard_id, url_image, sector_id) FROM stdin;
5	2024-01-12 00:00:00	2	image11.jpg	1
6	2024-01-20 00:00:00	2	image12.jpg	2
7	2024-01-22 00:00:00	2	image13.jpg	3
8	2024-01-23 00:00:00	2	image14.jpg	4
9	2024-02-18 14:01:32.934101	5	img//2024_02_18_14_01_32_1.jpg	1
10	2024-02-18 14:05:37.743314	6	img//2024_02_18_14_05_37_1.jpg	1
11	2024-02-18 14:14:58.981444	7	img//2024_02_18_14_14_58_1.jpg	1
12	2024-02-18 14:33:23.785458	9	img//2024_02_18_14_33_23_1.jpg	1
13	2024-02-18 14:50:36.796848	10	img//2024_02_18_14_50_36_1.jpg	1
1	2024-01-15 00:00:00	1	image1.jpg	1
2	2024-01-16 00:00:00	1	image2.jpg	2
3	2024-01-17 00:00:00	1	image3.jpg	3
4	2024-01-18 00:00:00	1	image4.jpg	4
14	2024-02-25 18:50:27.363604	11	img//2024_02_25_18_50_27_1.jpg	1
15	2024-02-25 18:53:16.074566	12	img//2024_02_25_18_53_16_1.jpg	1
16	2024-02-25 18:54:11.153078	13	img//2024_02_25_18_54_11_1.jpg	1
17	2024-02-25 18:57:35.592448	14	img//2024_02_25_18_57_35_1.jpg	1
18	2024-02-25 18:59:05.497682	15	img//2024_02_25_18_59_05_1.jpg	1
19	2024-02-25 19:16:58.369705	3	img//2024_02_25_19_16_58_1.jpg	1
\.


--
-- TOC entry 3622 (class 0 OID 286304)
-- Dependencies: 211
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
-- TOC entry 3623 (class 0 OID 286312)
-- Dependencies: 212
-- Data for Name: sectors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sectors (id, step_num, name) FROM stdin;
1	1	Гравёр
2	2	Паста
3	3	SMD-компоненты
4	4	Печь
\.


--
-- TOC entry 3624 (class 0 OID 286317)
-- Dependencies: 213
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
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 215
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 19, true);


--
-- TOC entry 3472 (class 2606 OID 286354)
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- TOC entry 3461 (class 2606 OID 286321)
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- TOC entry 3474 (class 2606 OID 286404)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 3463 (class 2606 OID 286323)
-- Name: inspections inspections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_pkey PRIMARY KEY (id);


--
-- TOC entry 3465 (class 2606 OID 286325)
-- Name: multiboards multiboards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.multiboards
    ADD CONSTRAINT multiboards_pkey PRIMARY KEY (multiboard_id);


--
-- TOC entry 3470 (class 2606 OID 286327)
-- Name: sectors_dm_position sectors_dm_position_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors_dm_position
    ADD CONSTRAINT sectors_dm_position_pkey PRIMARY KEY (id);


--
-- TOC entry 3468 (class 2606 OID 286329)
-- Name: sectors sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors
    ADD CONSTRAINT sectors_pkey PRIMARY KEY (id);


--
-- TOC entry 3466 (class 1259 OID 294557)
-- Name: ix_sectors_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_sectors_id ON public.sectors USING btree (id);


--
-- TOC entry 3475 (class 2606 OID 286330)
-- Name: boards boards_multiboard_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_multiboard_id_fkey FOREIGN KEY (multiboard_id) REFERENCES public.multiboards(multiboard_id);


--
-- TOC entry 3479 (class 2606 OID 286408)
-- Name: comments_of_inspection_table comments_of_inspection_table_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_of_inspection_table
    ADD CONSTRAINT comments_of_inspection_table_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id);


--
-- TOC entry 3480 (class 2606 OID 286413)
-- Name: comments_of_inspection_table comments_of_inspection_table_inspection_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments_of_inspection_table
    ADD CONSTRAINT comments_of_inspection_table_inspection_id_fkey FOREIGN KEY (inspection_id) REFERENCES public.inspections(id);


--
-- TOC entry 3476 (class 2606 OID 286335)
-- Name: inspections inspections_multiboard_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_multiboard_id_fkey FOREIGN KEY (multiboard_id) REFERENCES public.multiboards(multiboard_id);


--
-- TOC entry 3477 (class 2606 OID 294552)
-- Name: inspections inspections_sector_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_sector_id_fkey FOREIGN KEY (sector_id) REFERENCES public.sectors(id);


--
-- TOC entry 3478 (class 2606 OID 294558)
-- Name: sectors_dm_position sectors_dm_position_id_sector_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors_dm_position
    ADD CONSTRAINT sectors_dm_position_id_sector_fkey FOREIGN KEY (id_sector) REFERENCES public.sectors(id);


-- Completed on 2024-05-12 15:15:11 MSK

--
-- PostgreSQL database dump complete
--

