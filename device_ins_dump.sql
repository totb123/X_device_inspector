PGDMP     8            
        |            device_inspector_1    13.4    13.4 3    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    501433    device_inspector_1    DATABASE     o   CREATE DATABASE device_inspector_1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Russia.1251';
 "   DROP DATABASE device_inspector_1;
                postgres    false            �            1259    502141    boards    TABLE     �   CREATE TABLE public.boards (
    id integer NOT NULL,
    multiboard_id integer,
    datamatrix character varying,
    side character varying
);
    DROP TABLE public.boards;
       public         heap    postgres    false            �            1259    502139    boards_id_seq    SEQUENCE     �   CREATE SEQUENCE public.boards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.boards_id_seq;
       public          postgres    false    207            �           0    0    boards_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;
          public          postgres    false    206            �            1259    502203    comments    TABLE     e   CREATE TABLE public.comments (
    id integer NOT NULL,
    inspections_id integer,
    text text
);
    DROP TABLE public.comments;
       public         heap    postgres    false            �            1259    502201    comments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public          postgres    false    211            �           0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public          postgres    false    210            �            1259    502120    inspections    TABLE     �   CREATE TABLE public.inspections (
    id integer NOT NULL,
    "time" timestamp with time zone,
    multiboard_id integer,
    url_image character varying,
    sector_id integer,
    status character varying,
    side character varying
);
    DROP TABLE public.inspections;
       public         heap    postgres    false            �            1259    502118    inspections_id_seq    SEQUENCE     �   CREATE SEQUENCE public.inspections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.inspections_id_seq;
       public          postgres    false    205            �           0    0    inspections_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.inspections_id_seq OWNED BY public.inspections.id;
          public          postgres    false    204            �            1259    502101    multiboards    TABLE     =   CREATE TABLE public.multiboards (
    id integer NOT NULL
);
    DROP TABLE public.multiboards;
       public         heap    postgres    false            �            1259    502099    multiboards_id_seq    SEQUENCE     �   CREATE SEQUENCE public.multiboards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.multiboards_id_seq;
       public          postgres    false    203            �           0    0    multiboards_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.multiboards_id_seq OWNED BY public.multiboards.id;
          public          postgres    false    202            �            1259    502090    sectors    TABLE     k   CREATE TABLE public.sectors (
    id integer NOT NULL,
    step_num integer,
    name character varying
);
    DROP TABLE public.sectors;
       public         heap    postgres    false            �            1259    502157    sectors_dm_position    TABLE     �  CREATE TABLE public.sectors_dm_position (
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
    coordinates_8 character varying
);
 '   DROP TABLE public.sectors_dm_position;
       public         heap    postgres    false            �            1259    502155    sectors_dm_position_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sectors_dm_position_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.sectors_dm_position_id_seq;
       public          postgres    false    209            �           0    0    sectors_dm_position_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.sectors_dm_position_id_seq OWNED BY public.sectors_dm_position.id;
          public          postgres    false    208            �            1259    502088    sectors_id_seq    SEQUENCE     �   CREATE SEQUENCE public.sectors_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.sectors_id_seq;
       public          postgres    false    201            �           0    0    sectors_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.sectors_id_seq OWNED BY public.sectors.id;
          public          postgres    false    200            H           2604    502144 	   boards id    DEFAULT     f   ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);
 8   ALTER TABLE public.boards ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207            J           2604    502206    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            G           2604    502123    inspections id    DEFAULT     p   ALTER TABLE ONLY public.inspections ALTER COLUMN id SET DEFAULT nextval('public.inspections_id_seq'::regclass);
 =   ALTER TABLE public.inspections ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            F           2604    502104    multiboards id    DEFAULT     p   ALTER TABLE ONLY public.multiboards ALTER COLUMN id SET DEFAULT nextval('public.multiboards_id_seq'::regclass);
 =   ALTER TABLE public.multiboards ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            E           2604    502093 
   sectors id    DEFAULT     h   ALTER TABLE ONLY public.sectors ALTER COLUMN id SET DEFAULT nextval('public.sectors_id_seq'::regclass);
 9   ALTER TABLE public.sectors ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            I           2604    502160    sectors_dm_position id    DEFAULT     �   ALTER TABLE ONLY public.sectors_dm_position ALTER COLUMN id SET DEFAULT nextval('public.sectors_dm_position_id_seq'::regclass);
 E   ALTER TABLE public.sectors_dm_position ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            �          0    502141    boards 
   TABLE DATA           E   COPY public.boards (id, multiboard_id, datamatrix, side) FROM stdin;
    public          postgres    false    207   I:       �          0    502203    comments 
   TABLE DATA           <   COPY public.comments (id, inspections_id, text) FROM stdin;
    public          postgres    false    211   �:       �          0    502120    inspections 
   TABLE DATA           d   COPY public.inspections (id, "time", multiboard_id, url_image, sector_id, status, side) FROM stdin;
    public          postgres    false    205   �:       �          0    502101    multiboards 
   TABLE DATA           )   COPY public.multiboards (id) FROM stdin;
    public          postgres    false    203   z;       �          0    502090    sectors 
   TABLE DATA           5   COPY public.sectors (id, step_num, name) FROM stdin;
    public          postgres    false    201   �;       �          0    502157    sectors_dm_position 
   TABLE DATA           �   COPY public.sectors_dm_position (id, id_sector, side, coordinates_1, coordinates_2, coordinates_3, coordinates_4, coordinates_5, coordinates_6, coordinates_7, coordinates_8) FROM stdin;
    public          postgres    false    209   �;       �           0    0    boards_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.boards_id_seq', 80, true);
          public          postgres    false    206            �           0    0    comments_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.comments_id_seq', 16, true);
          public          postgres    false    210            �           0    0    inspections_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.inspections_id_seq', 13, true);
          public          postgres    false    204            �           0    0    multiboards_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.multiboards_id_seq', 10, true);
          public          postgres    false    202            �           0    0    sectors_dm_position_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.sectors_dm_position_id_seq', 1, false);
          public          postgres    false    208            �           0    0    sectors_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.sectors_id_seq', 1, false);
          public          postgres    false    200            R           2606    502149    boards boards_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.boards DROP CONSTRAINT boards_pkey;
       public            postgres    false    207            V           2606    502211    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    211            P           2606    502128    inspections inspections_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.inspections DROP CONSTRAINT inspections_pkey;
       public            postgres    false    205            N           2606    502106    multiboards multiboards_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.multiboards
    ADD CONSTRAINT multiboards_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.multiboards DROP CONSTRAINT multiboards_pkey;
       public            postgres    false    203            T           2606    502165 ,   sectors_dm_position sectors_dm_position_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.sectors_dm_position
    ADD CONSTRAINT sectors_dm_position_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.sectors_dm_position DROP CONSTRAINT sectors_dm_position_pkey;
       public            postgres    false    209            L           2606    502098    sectors sectors_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.sectors
    ADD CONSTRAINT sectors_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.sectors DROP CONSTRAINT sectors_pkey;
       public            postgres    false    201            Y           2606    502150     boards boards_multiboard_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_multiboard_id_fkey FOREIGN KEY (multiboard_id) REFERENCES public.multiboards(id);
 J   ALTER TABLE ONLY public.boards DROP CONSTRAINT boards_multiboard_id_fkey;
       public          postgres    false    2894    203    207            [           2606    502212 %   comments comments_inspections_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_inspections_id_fkey FOREIGN KEY (inspections_id) REFERENCES public.inspections(id);
 O   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_inspections_id_fkey;
       public          postgres    false    205    2896    211            W           2606    502129 *   inspections inspections_multiboard_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_multiboard_id_fkey FOREIGN KEY (multiboard_id) REFERENCES public.multiboards(id);
 T   ALTER TABLE ONLY public.inspections DROP CONSTRAINT inspections_multiboard_id_fkey;
       public          postgres    false    2894    203    205            X           2606    502134 &   inspections inspections_sector_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.inspections
    ADD CONSTRAINT inspections_sector_id_fkey FOREIGN KEY (sector_id) REFERENCES public.sectors(id);
 P   ALTER TABLE ONLY public.inspections DROP CONSTRAINT inspections_sector_id_fkey;
       public          postgres    false    205    201    2892            Z           2606    502166 6   sectors_dm_position sectors_dm_position_id_sector_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.sectors_dm_position
    ADD CONSTRAINT sectors_dm_position_id_sector_fkey FOREIGN KEY (id_sector) REFERENCES public.sectors(id);
 `   ALTER TABLE ONLY public.sectors_dm_position DROP CONSTRAINT sectors_dm_position_id_sector_fkey;
       public          postgres    false    2892    201    209            �   f   x�]ι�0 ��*�����" ��� ��f��Q�`Y��Μ�"�.�����I�n���m��ȬFc��]�V*>ݯ�����CL	�9�/IB҄6%��, �Y;�      �   $   x�34�44�442".C3 ���0����b���� x��      �   w   x�]�1�@��9�+ܥG��x�mR�ZAp.���Znp��./<���ҁ7�*Vų�NE����� 4�B<������p��x��痠+L�²��0�Jӥ�צ���?7�SJ3Q�"Z      �      x���24������ rW      �      x�3�4�0�bÅ6]�z��+F��� w�	�      �   �   x�M��m0Dki"��+��8��GNq�t�y����z���#y\�Zx�(#9�����N1��,�C�]�/T���!6!K�0�j�	VL��e\s�Xb��)��`��ך��e2�3��4C��`����v0XcM���U^���5f4����E�?w�(.�~3s�Ƀ��d`����u��Xc>     