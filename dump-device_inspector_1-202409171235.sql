--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7
-- Dumped by pg_dump version 14.7

-- Started on 2024-09-17 12:35:10 MSK

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
-- TOC entry 3679 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 319465)
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 319478)
-- Name: boards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.boards (
    id integer NOT NULL,
    multiboard_id integer,
    datamatrix character varying,
    side character varying,
    defect_type integer[],
    status character varying
);


ALTER TABLE public.boards OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 319477)
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.boards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.boards_id_seq OWNER TO postgres;

--
-- TOC entry 3680 (class 0 OID 0)
-- Dependencies: 212
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;


--
-- TOC entry 219 (class 1259 OID 319520)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    inspections_id integer,
    text text
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 319519)
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
-- TOC entry 3681 (class 0 OID 0)
-- Dependencies: 218
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 227 (class 1259 OID 319575)
-- Name: current_party; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.current_party (
    id integer NOT NULL,
    specification_id integer,
    side character varying
);


ALTER TABLE public.current_party OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 319574)
-- Name: current_party_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.current_party_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.current_party_id_seq OWNER TO postgres;

--
-- TOC entry 3682 (class 0 OID 0)
-- Dependencies: 226
-- Name: current_party_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.current_party_id_seq OWNED BY public.current_party.id;


--
-- TOC entry 223 (class 1259 OID 319549)
-- Name: defects_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.defects_types (
    id integer NOT NULL,
    defect_name text NOT NULL
);


ALTER TABLE public.defects_types OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 319548)
-- Name: defects_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.defects_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.defects_types_id_seq OWNER TO postgres;

--
-- TOC entry 3683 (class 0 OID 0)
-- Dependencies: 222
-- Name: defects_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.defects_types_id_seq OWNED BY public.defects_types.id;


--
-- TOC entry 217 (class 1259 OID 319501)
-- Name: inspections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inspections (
    id integer NOT NULL,
    "time" timestamp with time zone,
    multiboard_id integer,
    url_image character varying,
    sector_id integer,
    status character varying,
    side character varying,
    reading_order boolean DEFAULT true
);


ALTER TABLE public.inspections OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 319500)
-- Name: inspections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inspections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inspections_id_seq OWNER TO postgres;

--
-- TOC entry 3684 (class 0 OID 0)
-- Dependencies: 216
-- Name: inspections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inspections_id_seq OWNED BY public.inspections.id;


--
-- TOC entry 211 (class 1259 OID 319471)
-- Name: multiboards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.multiboards (
    id integer NOT NULL,
    specification_id integer,
    multiboard_id integer NOT NULL
);


ALTER TABLE public.multiboards OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 319470)
-- Name: multiboards_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.multiboards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.multiboards_id_seq OWNER TO postgres;

--
-- TOC entry 3685 (class 0 OID 0)
-- Dependencies: 210
-- Name: multiboards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.multiboards_id_seq OWNED BY public.multiboards.id;


--
-- TOC entry 228 (class 1259 OID 319588)
-- Name: multiboards_multiboard_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.multiboards_multiboard_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.multiboards_multiboard_id_seq OWNER TO postgres;

--
-- TOC entry 3686 (class 0 OID 0)
-- Dependencies: 228
-- Name: multiboards_multiboard_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.multiboards_multiboard_id_seq OWNED BY public.multiboards.multiboard_id;


--
-- TOC entry 215 (class 1259 OID 319492)
-- Name: sectors; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sectors (
    id integer NOT NULL,
    step_num integer,
    name character varying
);


ALTER TABLE public.sectors OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 319534)
-- Name: sectors_dm_position; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sectors_dm_position (
    id integer NOT NULL,
    id_sector integer,
    side character varying,
    coordinates_1 character varying,
    coordinates_2 character varying,
    coordinates_3 character varying,
    coordinates_4 character varying,
    coordinates_5 character varying,
    coordinates_6 character varying,
    coordinates_7 character varying,
    coordinates_8 character varying,
    specification_id integer
);


ALTER TABLE public.sectors_dm_position OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 319533)
-- Name: sectors_dm_position_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sectors_dm_position_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sectors_dm_position_id_seq OWNER TO postgres;

--
-- TOC entry 3687 (class 0 OID 0)
-- Dependencies: 220
-- Name: sectors_dm_position_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sectors_dm_position_id_seq OWNED BY public.sectors_dm_position.id;


--
-- TOC entry 214 (class 1259 OID 319491)
-- Name: sectors_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sectors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sectors_id_seq OWNER TO postgres;

--
-- TOC entry 3688 (class 0 OID 0)
-- Dependencies: 214
-- Name: sectors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sectors_id_seq OWNED BY public.sectors.id;


--
-- TOC entry 225 (class 1259 OID 319558)
-- Name: specifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.specifications (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.specifications OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 319557)
-- Name: specifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.specifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.specifications_id_seq OWNER TO postgres;

--
-- TOC entry 3689 (class 0 OID 0)
-- Dependencies: 224
-- Name: specifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.specifications_id_seq OWNED BY public.specifications.id;


--
-- TOC entry 3478 (class 2604 OID 319481)
-- Name: boards id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);


--
-- TOC entry 3482 (class 2604 OID 319523)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 3486 (class 2604 OID 319578)
-- Name: current_party id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.current_party ALTER COLUMN id SET DEFAULT nextval('public.current_party_id_seq'::regclass);


--
-- TOC entry 3484 (class 2604 OID 319552)
-- Name: defects_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defects_types ALTER COLUMN id SET DEFAULT nextval('public.defects_types_id_seq'::regclass);


--
-- TOC entry 3480 (class 2604 OID 319504)
-- Name: inspections id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections ALTER COLUMN id SET DEFAULT nextval('public.inspections_id_seq'::regclass);


--
-- TOC entry 3476 (class 2604 OID 319474)
-- Name: multiboards id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.multiboards ALTER COLUMN id SET DEFAULT nextval('public.multiboards_id_seq'::regclass);


--
-- TOC entry 3477 (class 2604 OID 319589)
-- Name: multiboards multiboard_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.multiboards ALTER COLUMN multiboard_id SET DEFAULT nextval('public.multiboards_multiboard_id_seq'::regclass);


--
-- TOC entry 3479 (class 2604 OID 319495)
-- Name: sectors id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors ALTER COLUMN id SET DEFAULT nextval('public.sectors_id_seq'::regclass);


--
-- TOC entry 3483 (class 2604 OID 319537)
-- Name: sectors_dm_position id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors_dm_position ALTER COLUMN id SET DEFAULT nextval('public.sectors_dm_position_id_seq'::regclass);


--
-- TOC entry 3485 (class 2604 OID 319561)
-- Name: specifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specifications ALTER COLUMN id SET DEFAULT nextval('public.specifications_id_seq'::regclass);


--
-- TOC entry 3654 (class 0 OID 319465)
-- Dependencies: 209
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
f278acfc6997
\.


--
-- TOC entry 3658 (class 0 OID 319478)
-- Dependencies: 213
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.boards (id, multiboard_id, datamatrix, side, defect_type, status) FROM stdin;
79	10	1000000008	top	\N	NORMAL
9	2	180000	top	\N	NORMAL
10	2	190000	top	\N	NORMAL
11	2	200000	top	\N	NORMAL
12	2	210000	top	\N	NORMAL
13	2	220000	top	\N	NORMAL
14	2	230000	top	\N	NORMAL
15	2	240000	top	\N	NORMAL
16	2	250000	top	\N	NORMAL
1	1	100000	top	\N	NORMAL
2	1	110000	top	\N	NORMAL
3	1	120000	top	\N	NORMAL
4	1	130000	top	\N	NORMAL
5	1	140000	top	\N	NORMAL
6	1	150000	top	\N	NORMAL
7	1	160000	top	\N	NORMAL
8	1	170000	top	\N	NORMAL
125	16	2	bottom	\N	UNCHECKED
126	16	2	bottom	\N	UNCHECKED
127	16	0	bottom	\N	UNCHECKED
128	16	2	bottom	\N	UNCHECKED
129	16	2	bottom	\N	UNCHECKED
130	16	0	bottom	\N	UNCHECKED
131	16	2	bottom	\N	UNCHECKED
132	16	0	bottom	\N	UNCHECKED
18	3	0	top	\N	UNCHECKED
19	3	0	top	\N	UNCHECKED
20	3	0	top	\N	UNCHECKED
21	3	0	top	\N	UNCHECKED
22	3	0	top	\N	UNCHECKED
23	3	0	top	\N	UNCHECKED
24	3	0	top	\N	UNCHECKED
25	3	0	top	\N	UNCHECKED
27	4	0	top	\N	UNCHECKED
28	4	0	top	\N	UNCHECKED
29	4	0	bottom	\N	UNCHECKED
30	4	0	bottom	\N	UNCHECKED
31	4	0	bottom	\N	UNCHECKED
32	4	0	bottom	\N	UNCHECKED
33	4	0	bottom	\N	UNCHECKED
34	4	0	bottom	\N	UNCHECKED
36	5	0	bottom	\N	UNCHECKED
37	5	0	bottom	\N	UNCHECKED
38	5	0	bottom	\N	UNCHECKED
39	5	0	bottom	\N	UNCHECKED
40	5	0	bottom	\N	UNCHECKED
41	5	0	bottom	\N	UNCHECKED
42	5	0	bottom	\N	UNCHECKED
43	5	0	top	\N	UNCHECKED
45	6	0	top	\N	UNCHECKED
46	6	0	top	\N	UNCHECKED
47	6	0	top	\N	UNCHECKED
48	6	0	top	\N	UNCHECKED
49	6	0	top	\N	UNCHECKED
50	6	0	top	\N	UNCHECKED
51	6	0	top	\N	UNCHECKED
52	6	0	top	\N	UNCHECKED
54	7	0	top	\N	UNCHECKED
55	7	0	top	\N	UNCHECKED
56	7	0	top	\N	UNCHECKED
57	7	0	top	\N	UNCHECKED
58	7	0	top	\N	UNCHECKED
59	7	0	top	\N	UNCHECKED
60	7	0	top	\N	UNCHECKED
61	7	0	top	\N	UNCHECKED
63	9	0	top	\N	UNCHECKED
64	9	0	top	\N	UNCHECKED
65	9	0	top	\N	UNCHECKED
66	9	0	bottom	\N	UNCHECKED
67	9	0	bottom	\N	UNCHECKED
68	9	0	bottom	\N	UNCHECKED
69	9	0	bottom	\N	UNCHECKED
70	9	0	bottom	\N	UNCHECKED
81	11	0	bottom	\N	UNCHECKED
82	11	0	bottom	\N	UNCHECKED
83	11	0	bottom	\N	UNCHECKED
84	11	0	bottom	\N	UNCHECKED
85	11	0	bottom	\N	UNCHECKED
86	11	0	bottom	\N	UNCHECKED
87	11	0	bottom	\N	UNCHECKED
88	11	0	bottom	\N	UNCHECKED
90	12	0	bottom	\N	UNCHECKED
91	12	0	bottom	\N	UNCHECKED
92	12	0	bottom	\N	UNCHECKED
93	12	0	bottom	\N	UNCHECKED
94	12	0	bottom	\N	UNCHECKED
95	12	0	bottom	\N	UNCHECKED
96	12	0	bottom	\N	UNCHECKED
97	12	0	top	\N	UNCHECKED
99	13	0	top	\N	UNCHECKED
100	13	0	top	\N	UNCHECKED
101	13	0	top	\N	UNCHECKED
102	13	0	top	\N	UNCHECKED
103	13	0	top	\N	UNCHECKED
104	13	0	top	\N	UNCHECKED
105	13	0	top	\N	UNCHECKED
106	13	0	top	\N	UNCHECKED
108	14	0	top	\N	UNCHECKED
109	14	0	top	\N	UNCHECKED
110	14	0	top	\N	UNCHECKED
111	14	0	top	\N	UNCHECKED
112	14	0	top	\N	UNCHECKED
113	14	0	top	\N	UNCHECKED
114	14	0	top	\N	UNCHECKED
115	14	0	top	\N	UNCHECKED
117	15	0	bottom	\N	UNCHECKED
118	15	0	bottom	\N	UNCHECKED
119	15	0	bottom	\N	UNCHECKED
120	15	0	bottom	\N	UNCHECKED
121	15	0	bottom	\N	UNCHECKED
122	15	0	bottom	\N	UNCHECKED
123	15	0	bottom	\N	UNCHECKED
124	15	0	bottom	\N	UNCHECKED
72	10	1000000001	bottom	\N	NORMAL
73	10	1000000002	bottom	\N	NORMAL
74	10	1000000003	bottom	\N	NORMAL
75	10	1000000004	bottom	\N	NORMAL
76	10	1000000005	bottom	\N	NORMAL
77	10	1000000006	bottom	\N	NORMAL
78	10	1000000007	bottom	\N	NORMAL
\.


--
-- TOC entry 3664 (class 0 OID 319520)
-- Dependencies: 219
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, inspections_id, text) FROM stdin;
\.


--
-- TOC entry 3672 (class 0 OID 319575)
-- Dependencies: 227
-- Data for Name: current_party; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.current_party (id, specification_id, side) FROM stdin;
1	1	top
\.


--
-- TOC entry 3668 (class 0 OID 319549)
-- Dependencies: 223
-- Data for Name: defects_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.defects_types (id, defect_name) FROM stdin;
1	Ошибка маркировки
\.


--
-- TOC entry 3662 (class 0 OID 319501)
-- Dependencies: 217
-- Data for Name: inspections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inspections (id, "time", multiboard_id, url_image, sector_id, status, side, reading_order) FROM stdin;
5	2024-01-12 00:00:00+03	2	image5.jpg	1	UNCHECKED	top	t
6	2024-01-20 00:00:00+03	2	image6.jpg	2	UNCHECKED	top	t
7	2024-01-22 00:00:00+03	2	image7.jpg	3	UNCHECKED	top	t
8	2024-01-23 00:00:00+03	2	image8.jpg	4	UNCHECKED	top	t
9	2024-02-18 14:01:32.934101+03	5	image9.jpg	1	UNCHECKED	top	t
10	2024-02-18 14:05:37.743314+03	6	image10.jpg	1	NORMAL	top	t
11	2024-02-18 14:14:58.981444+03	7	image11.jpg	1	NORMAL	top	t
12	2024-02-18 14:33:23.785458+03	9	image12.jpg	1	NORMAL	top	t
13	2024-02-18 14:50:36.796848+03	10	image13.jpg	1	NORMAL	top	t
2	2024-01-16 00:00:00+03	1	image2.jpg	2	NORMAL	top	t
17	2024-02-25 18:57:35.592448+03	14	image17.jpg	1	UNCHECKED	bottom	t
16	2024-02-25 18:54:11.153078+03	13	image16.jpg	1	UNCHECKED	bottom	t
15	2024-02-25 18:53:16.074566+03	12	image15.jpg	1	UNCHECKED	bottom	t
14	2024-02-25 18:50:27.363604+03	11	image14.jpg	1	UNCHECKED	bottom	t
18	2024-02-25 18:59:05.497682+03	15	image18.jpg	1	DEFECTIVE	bottom	t
4	2024-01-18 00:00:00+03	1	image4.jpg	4	DEFECTIVE	bottom	t
3	2024-01-17 00:00:00+03	1	image3.jpg	3	NORMAL	bottom	t
1	2024-01-15 00:00:00+03	1	image1.jpg	1	NORMAL	bottom	t
20	2024-05-18 14:05:37.743+03	16	список ведомость.jpeg	2	UNCHECKED	bottom	t
19	2024-02-25 19:16:58.369705+03	3	список ведомость.jpeg	1	UNCHECKED	bottom	t
\.


--
-- TOC entry 3656 (class 0 OID 319471)
-- Dependencies: 211
-- Data for Name: multiboards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.multiboards (id, specification_id, multiboard_id) FROM stdin;
1	2	1
2	1	2
3	1	3
4	3	4
5	4	5
6	5	6
7	6	7
8	2	8
9	8	9
10	8	10
11	6	11
12	5	12
13	3	13
14	11	14
15	2	15
16	1	16
\.


--
-- TOC entry 3660 (class 0 OID 319492)
-- Dependencies: 215
-- Data for Name: sectors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sectors (id, step_num, name) FROM stdin;
1	1	Гравёр
2	2	Паста
3	3	SMD-компоненты
4	4	Печь
\.


--
-- TOC entry 3666 (class 0 OID 319534)
-- Dependencies: 221
-- Data for Name: sectors_dm_position; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sectors_dm_position (id, id_sector, side, coordinates_1, coordinates_2, coordinates_3, coordinates_4, coordinates_5, coordinates_6, coordinates_7, coordinates_8, specification_id) FROM stdin;
1	1	top	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	\N
2	1	bot	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	\N
3	2	top	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	\N
4	2	bot	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	\N
5	3	top	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	\N
6	3	bot	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	1,1,1,1	\N
\.


--
-- TOC entry 3670 (class 0 OID 319558)
-- Dependencies: 225
-- Data for Name: specifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.specifications (id, name) FROM stdin;
1	spc_1
2	spc_2
3	spc_3
4	spc_4
5	spc_5
6	spc_6
7	spc_7
8	spc_8
9	spc_9
10	spc_10
11	spc_11
12	spc_12
\.


--
-- TOC entry 3690 (class 0 OID 0)
-- Dependencies: 212
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.boards_id_seq', 1, false);


--
-- TOC entry 3691 (class 0 OID 0)
-- Dependencies: 218
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- TOC entry 3692 (class 0 OID 0)
-- Dependencies: 226
-- Name: current_party_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.current_party_id_seq', 1, false);


--
-- TOC entry 3693 (class 0 OID 0)
-- Dependencies: 222
-- Name: defects_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.defects_types_id_seq', 1, false);


--
-- TOC entry 3694 (class 0 OID 0)
-- Dependencies: 216
-- Name: inspections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inspections_id_seq', 1, false);


--
-- TOC entry 3695 (class 0 OID 0)
-- Dependencies: 210
-- Name: multiboards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.multiboards_id_seq', 16, true);


--
-- TOC entry 3696 (class 0 OID 0)
-- Dependencies: 228
-- Name: multiboards_multiboard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.multiboards_multiboard_id_seq', 1, false);


--
-- TOC entry 3697 (class 0 OID 0)
-- Dependencies: 220
-- Name: sectors_dm_position_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sectors_dm_position_id_seq', 1, false);


--
-- TOC entry 3698 (class 0 OID 0)
-- Dependencies: 214
-- Name: sectors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sectors_id_seq', 1, false);


--
-- TOC entry 3699 (class 0 OID 0)
-- Dependencies: 224
-- Name: specifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.specifications_id_seq', 12, true);


--
-- TOC entry 3488 (class 2606 OID 319469)
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- TOC entry 3492 (class 2606 OID 319485)
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- TOC entry 3498 (class 2606 OID 319527)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 3506 (class 2606 OID 319582)
-- Name: current_party current_party_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.current_party
    ADD CONSTRAINT current_party_pkey PRIMARY KEY (id);


--
-- TOC entry 3502 (class 2606 OID 319556)
-- Name: defects_types defects_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.defects_types
    ADD CONSTRAINT defects_types_pkey PRIMARY KEY (id);


--
-- TOC entry 3496 (class 2606 OID 319508)
-- Name: inspections inspections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_pkey PRIMARY KEY (id);


--
-- TOC entry 3490 (class 2606 OID 319476)
-- Name: multiboards multiboards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.multiboards
    ADD CONSTRAINT multiboards_pkey PRIMARY KEY (id);


--
-- TOC entry 3500 (class 2606 OID 319541)
-- Name: sectors_dm_position sectors_dm_position_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors_dm_position
    ADD CONSTRAINT sectors_dm_position_pkey PRIMARY KEY (id);


--
-- TOC entry 3494 (class 2606 OID 319499)
-- Name: sectors sectors_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors
    ADD CONSTRAINT sectors_pkey PRIMARY KEY (id);


--
-- TOC entry 3504 (class 2606 OID 319563)
-- Name: specifications specifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specifications
    ADD CONSTRAINT specifications_pkey PRIMARY KEY (id);


--
-- TOC entry 3508 (class 2606 OID 319486)
-- Name: boards boards_multiboard_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_multiboard_id_fkey FOREIGN KEY (multiboard_id) REFERENCES public.multiboards(id);


--
-- TOC entry 3511 (class 2606 OID 319528)
-- Name: comments comments_inspections_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_inspections_id_fkey FOREIGN KEY (inspections_id) REFERENCES public.inspections(id);


--
-- TOC entry 3514 (class 2606 OID 319583)
-- Name: current_party current_party_specification_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.current_party
    ADD CONSTRAINT current_party_specification_id_fkey FOREIGN KEY (specification_id) REFERENCES public.specifications(id);


--
-- TOC entry 3509 (class 2606 OID 319509)
-- Name: inspections inspections_multiboard_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_multiboard_id_fkey FOREIGN KEY (multiboard_id) REFERENCES public.multiboards(id);


--
-- TOC entry 3510 (class 2606 OID 319514)
-- Name: inspections inspections_sector_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_sector_id_fkey FOREIGN KEY (sector_id) REFERENCES public.sectors(id);


--
-- TOC entry 3507 (class 2606 OID 319564)
-- Name: multiboards multiboards_specification_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.multiboards
    ADD CONSTRAINT multiboards_specification_id_fkey FOREIGN KEY (specification_id) REFERENCES public.specifications(id);


--
-- TOC entry 3512 (class 2606 OID 319542)
-- Name: sectors_dm_position sectors_dm_position_id_sector_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors_dm_position
    ADD CONSTRAINT sectors_dm_position_id_sector_fkey FOREIGN KEY (id_sector) REFERENCES public.sectors(id);


--
-- TOC entry 3513 (class 2606 OID 319569)
-- Name: sectors_dm_position sectors_dm_position_specification_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sectors_dm_position
    ADD CONSTRAINT sectors_dm_position_specification_id_fkey FOREIGN KEY (specification_id) REFERENCES public.specifications(id);


-- Completed on 2024-09-17 12:35:10 MSK

--
-- PostgreSQL database dump complete
--

