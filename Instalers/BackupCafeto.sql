toc.dat                                                                                             0000600 0004000 0002000 00000011666 13666060531 0014457 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP            2                x            prueba_cafeto    10.13    10.13     �
           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false         �
           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false         �
           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false         �
           1262    16393    prueba_cafeto    DATABASE     �   CREATE DATABASE prueba_cafeto WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Colombia.1252' LC_CTYPE = 'Spanish_Colombia.1252';
    DROP DATABASE prueba_cafeto;
             postgres    false                     2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
             postgres    false         �
           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                  postgres    false    3                     3079    12924    plpgsql 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
    DROP EXTENSION plpgsql;
                  false         �
           0    0    EXTENSION plpgsql    COMMENT     @   COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';
                       false    1         �            1259    16419    meetings    TABLE     ~  CREATE TABLE public.meetings (
    id character varying(32) NOT NULL,
    title character varying(32),
    description text,
    picture character varying(255),
    location_name character varying(255),
    created_by character varying(50),
    created_date timestamp without time zone,
    latitude character varying(20),
    longitude character varying(20),
    active boolean
);
    DROP TABLE public.meetings;
       public         postgres    false    3         �            1259    16427    meetings_follow    TABLE     �   CREATE TABLE public.meetings_follow (
    meeting_id character varying(32),
    user_id character varying(50),
    nickname character varying(50),
    picture character varying(255),
    id integer NOT NULL
);
 #   DROP TABLE public.meetings_follow;
       public         postgres    false    3         �            1259    18342    meetings_follow_id_seq    SEQUENCE     �   CREATE SEQUENCE public.meetings_follow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.meetings_follow_id_seq;
       public       postgres    false    3    197         �
           0    0    meetings_follow_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.meetings_follow_id_seq OWNED BY public.meetings_follow.id;
            public       postgres    false    198         s
           2604    18344    meetings_follow id    DEFAULT     x   ALTER TABLE ONLY public.meetings_follow ALTER COLUMN id SET DEFAULT nextval('public.meetings_follow_id_seq'::regclass);
 A   ALTER TABLE public.meetings_follow ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    198    197         �
          0    16419    meetings 
   TABLE DATA               �   COPY public.meetings (id, title, description, picture, location_name, created_by, created_date, latitude, longitude, active) FROM stdin;
    public       postgres    false    196       2803.dat �
          0    16427    meetings_follow 
   TABLE DATA               U   COPY public.meetings_follow (meeting_id, user_id, nickname, picture, id) FROM stdin;
    public       postgres    false    197       2804.dat �
           0    0    meetings_follow_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.meetings_follow_id_seq', 17, true);
            public       postgres    false    198         w
           2606    18511    meetings_follow event_to_user 
   CONSTRAINT     g   ALTER TABLE ONLY public.meetings_follow
    ADD CONSTRAINT event_to_user UNIQUE (meeting_id, user_id);
 G   ALTER TABLE ONLY public.meetings_follow DROP CONSTRAINT event_to_user;
       public         postgres    false    197    197         u
           2606    16426    meetings events_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.meetings
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.meetings DROP CONSTRAINT events_pkey;
       public         postgres    false    196         y
           2606    18350 $   meetings_follow meetings_follow_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.meetings_follow
    ADD CONSTRAINT meetings_follow_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.meetings_follow DROP CONSTRAINT meetings_follow_pkey;
       public         postgres    false    197                                                                                  2803.dat                                                                                            0000600 0004000 0002000 00000014663 13666060531 0014266 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        avbADtPc8opPvgWJQNBC2	comidita de tacos 4	vamos a comerles	\N	canaaa	google-oauth2|104845855565446955159	2020-05-24 14:07:08	0	0	t
0maPY4hK7_Sj7WcECQOBD	Prueba con otro usuario	Hablame	file%20-%201591158158269.jpg	DATECSA Yumbo	auth0|5ed71c2c43eb020bec77448e	2020-06-02 22:43:23	3.51761	-76.49736	t
IFgsZw_CraCwBJU5F_Oad	comidita de tacos 7	vamos a comerles	\N	canaaa	google-oauth2|104845855565446955159	2020-05-24 15:36:03	0	0	t
GaRQOpQENjHlhhcl2rVas	hablame	pericles	file%20-%201590178935664.jpg	canaaa	google-oauth2|104845855565446955159	2020-05-18 18:00:22	0	0	t
nrIGan1sxyN5vjw7xn7_5	Evento prueba	Prueba para documentación	\N	Chipichape	google-oauth2|104845855565446955159	2020-06-02 21:42:15	3.47736	-76.52643	t
oPJXykGcj8FrNMggrDhtl	Evento prueba	Prueba para documentación	\N	Chipichape	google-oauth2|104845855565446955159	2020-06-02 21:43:01	3.47736	-76.52643	t
HcA2henyOIleR8BVbI0C3	comidita de tacos	vamos a comerles	file%20-%201590179215244.jpg	canaaa	google-oauth2|104845855565446955159	2020-05-22 15:25:28	0	0	t
oE6urkb0fQQ7S8v9QBz1o	Hi	Hi	file%20-%201590929232091.jpg	undefined	google-oauth2|104845855565446955159	2020-05-29 00:34:24	undefined	undefined	t
NLFJ34L3IpwISiD0nL1mW	Eso eso mi ñero	Holy	file%20-%201590929918759.jpg	undefined	google-oauth2|104845855565446955159	2020-05-29 00:21:02	undefined	undefined	t
oWBabL_Qs0kXvi_Opq7rr	comidita de tacos 2	vamos a comerles	file%20-%201591065692271.png	canaaa	google-oauth2|104845855565446955159	2020-05-24 13:42:16	0	0	t
-ZT5xej8ADYXU2uaN5NI-	comidita de tacos 3	vamos a comerles	file%20-%201591066711942.jpg	canaaa	google-oauth2|104845855565446955159	2020-05-24 13:43:45	0	0	t
drPzas0vRcqiCSXGOw_0c	comidita de tacos 5 ehhh	vamos a comerles pues	file%20-%201591069531606.png	Mercamío Norte	google-oauth2|104845855565446955159	2020-05-24 14:07:11	3.49215	-76.49618	t
JJjcCiIJv7TceMhvVrhq9	comidita de tacos con el enano	vamos a comerles ñero	file%20-%201591145436256.jpg	Parque Del Perro	google-oauth2|104845855565446955159	2020-05-24 14:07:15	3.43557	-76.54585	t
8n03XHihYRttgS1JgC7gD	Chile	Chile con carne	file%20-%201591151290782.jpg	Florida	google-oauth2|104845855565446955159	2020-06-02 21:28:10	3.32142	-76.23556	t
OYDPehB3nBVjbmWlGxPv2	Háblamelo	Háblamelo	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:23:33	undefined	undefined	t
FBXjBehzVtmeORJZdRf-N	Good	Day	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:48:31	undefined	undefined	t
pozqLG2n1jxxtQshiQQjX	Que paso?	No lo se	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:55:53	undefined	undefined	t
EUw_0Rx0CsdcHNow1fVzI	la gran comidita de tacos nea	vamos es a comerles	\N	canaaa	google-oauth2|104845855565446955159	2020-05-30 00:17:39	0	0	t
Fl8Clcb6BIF6hLDcf8olf	comidita de tacos 7	vamos a comerles	\N	canaaa	google-oauth2|104845855565446955159	2020-05-30 00:08:13	0	0	f
q_t9lw3E15Mw4k_4ooVoo	Eso es papu	Eso es	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:18:23	undefined	undefined	f
_458_aGWpeI297txkYxSz	Ok polisha	Ok	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:16:15	undefined	undefined	t
-iUJ_goYeDByG3INTJ8MU	Culebrear	Culebra	\N	undefined	google-oauth2|104845855565446955159	2020-05-30 01:58:05	undefined	undefined	f
pOIspcFLomplZ4QM4zbmO	Holiiiii wiiii v2	Hola	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:14:34	undefined	undefined	t
f4UoE66Setzosp5MJwt3u	Prueba 2 años	Time skip	file%20-%201591159287173.jpg	Guayaquil	auth0|5ed71c2c43eb020bec77448e	2020-06-02 22:59:10	3.4407	-76.52787	t
DzykB_GKYYV2pz61F5UTt	Holi papu dejame	Hola	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:11:53	undefined	undefined	t
wOF09I6JUpj7KJbiZUGan	GG guys	Gg	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:58:59	undefined	undefined	t
bOvY-Xm3-lpQ8C1xhuWvU	Cooking with me, please	Cook	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:28:07	undefined	undefined	t
J8PKjjz_PkZflTy4ptd9U	Prueba sumar meeting	Vamos	file%20-%201591073125339.jpg	Calima	EFKCGrBM23z13axyAzE2dyGUhO5LjzQR	2020-06-01 23:45:15	3.48588	-76.50033	t
DJe23dCRtvIuYaq3YjQcr	Ole papu	Oki	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:16:41	undefined	undefined	t
Yo8YicnZVTwFCvnLj85OK	Háblame pericles v2	Hoy vamos a por polas	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:15:12	undefined	undefined	t
_Vt93wIGtTe5rkdeZHmOo	F	D	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:58:29	undefined	undefined	f
t0_YAKIGBUKJQ0xafwUPn	Prueba 2	Va	file%20-%201591073361004.jpg	Versalles	EFKCGrBM23z13axyAzE2dyGUhO5LjzQR	2020-06-01 23:48:27	3.46124	-76.52707	t
JzeC8Fc0b-Q0p_qvJqpos	J	J	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 01:01:58	undefined	undefined	f
ubobDxwCNbclylsBu-7On	Hp	H	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 01:01:39	undefined	undefined	f
uiTQ15OZuwI0LuWe7euK_	Forza	D	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:58:30	undefined	undefined	f
qk3FDRBH58ljsZwKLbrMn	Fiona cocina	Cocina bueno	\N	undefined	google-oauth2|104845855565446955159	2020-05-29 00:04:59	undefined	undefined	t
jlbPfCpFLHc3IoQmqP77I	Kike el empresario	Kike Dame luk papu	file%20-%201590929777078.jpg	undefined	google-oauth2|104845855565446955159	2020-05-29 00:39:32	undefined	undefined	t
IfTXyswnecZdVAUHeD7NF	K9999 y Kula	KOF	file%20-%201590929320671.jpg	undefined	google-oauth2|104845855565446955159	2020-05-29 01:02:39	undefined	undefined	t
n1P0avCrPCfTMdz41VUah	hablame pericles	pericles es un vago	file%20-%201590915748716.jpg	canaaa	google-oauth2|104845855565446955159	2020-05-18 18:13:26	0	0	f
4MslEDA0yWRWV2KQ9DszP	Vamos está vez	Dale	file%20-%201590929643936.jpg	undefined	google-oauth2|104845855565446955159	2020-05-31 04:18:48	undefined	undefined	t
Tzjr03qMs4MlFUZEKkH26	Fheh	Fbtx	file%20-%201590927549187.jpg	undefined	google-oauth2|104845855565446955159	2020-05-31 07:18:39	undefined	undefined	t
-yLCj_95UCsXXWfbtUGku	Vamos está vez	Dale	file%20-%201590928180969.jpg	undefined	google-oauth2|104845855565446955159	2020-05-31 04:20:04	undefined	undefined	f
Rf33hiApf-QDex-jNktFI	Vamos está vez	Dale	file%20-%201590928439109.jpg	undefined	google-oauth2|104845855565446955159	2020-05-31 04:21:12	undefined	undefined	t
ryUqu6pg9HtHqKsvWebZv	KO técnico	Ko	file%20-%201590929480545.png	undefined	google-oauth2|104845855565446955159	2020-05-29 00:33:31	undefined	undefined	t
6QhyvEM8FHCcu7YIFm7ZC	Pudimos con esto	Sisas?	file%20-%201590929968350.jpg	undefined	google-oauth2|104845855565446955159	2020-05-31 07:59:24	undefined	undefined	t
\.


                                                                             2804.dat                                                                                            0000600 0004000 0002000 00000003474 13666060531 0014265 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        GaRQOpQENjHlhhcl2rVas	lora	pachanga	\N	1
GaRQOpQENjHlhhcl2rVas	123	holi	\N	2
GaRQOpQENjHlhhcl2rVas	1223	chibirin	\N	4
GaRQOpQENjHlhhcl2rVas	1523	chibirin	\N	5
GaRQOpQENjHlhhcl2rVas	1563	chibirin chin chin	\N	6
avbADtPc8opPvgWJQNBC2	google-oauth2|104845855565446955159	fabianguerrero9328	https://lh3.googleusercontent.com/a-/AOh14Gg2sKI-u0FEwbCXrthm252qkl_OZ1neQr9pBAOx_Q	11
drPzas0vRcqiCSXGOw_0c	google-oauth2|104845855565446955159	fabianguerrero9328	https://lh3.googleusercontent.com/a-/AOh14Gg2sKI-u0FEwbCXrthm252qkl_OZ1neQr9pBAOx_Q	12
GaRQOpQENjHlhhcl2rVas	4263	fabianguerrero9328	https://lh3.googleusercontent.com/a-/AOh14Gg2sKI-u0FEwbCXrthm252qkl_OZ1neQr9pBAOx_Q	13
JJjcCiIJv7TceMhvVrhq9	google-oauth2|104845855565446955159	fabianguerrero9328	https://lh3.googleusercontent.com/a-/AOh14Gg2sKI-u0FEwbCXrthm252qkl_OZ1neQr9pBAOx_Q	14
nrIGan1sxyN5vjw7xn7_5	google-oauth2|104845855565446955159	fabianguerrero9328	https://lh3.googleusercontent.com/a-/AOh14Gg2sKI-u0FEwbCXrthm252qkl_OZ1neQr9pBAOx_Q	15
oWBabL_Qs0kXvi_Opq7rr	google-oauth2|104845855565446955159	fabianguerrero9328	https://lh3.googleusercontent.com/a-/AOh14Gg2sKI-u0FEwbCXrthm252qkl_OZ1neQr9pBAOx_Q	7
-ZT5xej8ADYXU2uaN5NI-	google-oauth2|104845855565446955159	fabianguerrero9328	https://lh3.googleusercontent.com/a-/AOh14Gg2sKI-u0FEwbCXrthm252qkl_OZ1neQr9pBAOx_Q	8
GaRQOpQENjHlhhcl2rVas	google-oauth2|104845855565446955159	fabianguerrero9328	https://lh3.googleusercontent.com/a-/AOh14Gg2sKI-u0FEwbCXrthm252qkl_OZ1neQr9pBAOx_Q	10
oPJXykGcj8FrNMggrDhtl	google-oauth2|104845855565446955159	fabianguerrero9328	https://lh3.googleusercontent.com/a-/AOh14Gg2sKI-u0FEwbCXrthm252qkl_OZ1neQr9pBAOx_Q	16
GaRQOpQENjHlhhcl2rVas	auth0|5ed71c2c43eb020bec77448e	fabianguerrero	https://s.gravatar.com/avatar/98aaa185b358450a740afd9ff493bbfc?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Ffa.png	17
\.


                                                                                                                                                                                                    restore.sql                                                                                         0000600 0004000 0002000 00000010751 13666060531 0015376 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 10.13
-- Dumped by pg_dump version 10.13

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

ALTER TABLE ONLY public.meetings_follow DROP CONSTRAINT meetings_follow_pkey;
ALTER TABLE ONLY public.meetings DROP CONSTRAINT events_pkey;
ALTER TABLE ONLY public.meetings_follow DROP CONSTRAINT event_to_user;
ALTER TABLE public.meetings_follow ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.meetings_follow_id_seq;
DROP TABLE public.meetings_follow;
DROP TABLE public.meetings;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: meetings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meetings (
    id character varying(32) NOT NULL,
    title character varying(32),
    description text,
    picture character varying(255),
    location_name character varying(255),
    created_by character varying(50),
    created_date timestamp without time zone,
    latitude character varying(20),
    longitude character varying(20),
    active boolean
);


ALTER TABLE public.meetings OWNER TO postgres;

--
-- Name: meetings_follow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meetings_follow (
    meeting_id character varying(32),
    user_id character varying(50),
    nickname character varying(50),
    picture character varying(255),
    id integer NOT NULL
);


ALTER TABLE public.meetings_follow OWNER TO postgres;

--
-- Name: meetings_follow_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.meetings_follow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.meetings_follow_id_seq OWNER TO postgres;

--
-- Name: meetings_follow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.meetings_follow_id_seq OWNED BY public.meetings_follow.id;


--
-- Name: meetings_follow id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetings_follow ALTER COLUMN id SET DEFAULT nextval('public.meetings_follow_id_seq'::regclass);


--
-- Data for Name: meetings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meetings (id, title, description, picture, location_name, created_by, created_date, latitude, longitude, active) FROM stdin;
\.
COPY public.meetings (id, title, description, picture, location_name, created_by, created_date, latitude, longitude, active) FROM '$$PATH$$/2803.dat';

--
-- Data for Name: meetings_follow; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.meetings_follow (meeting_id, user_id, nickname, picture, id) FROM stdin;
\.
COPY public.meetings_follow (meeting_id, user_id, nickname, picture, id) FROM '$$PATH$$/2804.dat';

--
-- Name: meetings_follow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.meetings_follow_id_seq', 17, true);


--
-- Name: meetings_follow event_to_user; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetings_follow
    ADD CONSTRAINT event_to_user UNIQUE (meeting_id, user_id);


--
-- Name: meetings events_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetings
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: meetings_follow meetings_follow_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meetings_follow
    ADD CONSTRAINT meetings_follow_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       