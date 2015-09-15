--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: abstractpublication; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE abstractpublication (
    dtype character varying(31) NOT NULL,
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    description text,
    enddate timestamp without time zone NOT NULL,
    searchabletitle character varying(255) NOT NULL,
    startdate timestamp without time zone NOT NULL,
    title character varying(255) NOT NULL,
    minimalquantity double precision,
    offpercent double precision,
    originalprice double precision,
    quantity double precision,
    unit character varying(255),
    business_id bigint NOT NULL,
    interest_id bigint
);


ALTER TABLE public.abstractpublication OWNER TO play;

--
-- Name: abstractpublication_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE abstractpublication_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.abstractpublication_id_seq OWNER TO play;

--
-- Name: abstractpublication_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE abstractpublication_id_seq OWNED BY abstractpublication.id;


--
-- Name: account; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE account (
    dtype character varying(31) NOT NULL,
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    authenticationkey character varying(255),
    email character varying(255) NOT NULL,
    firstname character varying(255),
    gender character varying(255) NOT NULL,
    lang character varying(255) DEFAULT 'en'::character varying NOT NULL,
    lastname character varying(255) NOT NULL,
    role character varying(255),
    sendnotificationbydefault boolean NOT NULL,
    type character varying(255),
    selectedaddress_id bigint
);


ALTER TABLE public.account OWNER TO play;

--
-- Name: account_customerinterest; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE account_customerinterest (
    account_id bigint NOT NULL,
    customerinterests_id bigint NOT NULL
);


ALTER TABLE public.account_customerinterest OWNER TO play;

--
-- Name: account_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_id_seq OWNER TO play;

--
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE account_id_seq OWNED BY account.id;


--
-- Name: address; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE address (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    city character varying(255),
    country character varying(255) NOT NULL,
    name character varying(255),
    posx double precision NOT NULL,
    posy double precision NOT NULL,
    street character varying(255) NOT NULL,
    zip character varying(255) NOT NULL,
    account_id bigint
);


ALTER TABLE public.address OWNER TO play;

--
-- Name: address_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE address_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_id_seq OWNER TO play;

--
-- Name: address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE address_id_seq OWNED BY address.id;


--
-- Name: business; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE business (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    askpublicationdate timestamp without time zone,
    businessstatus character varying(255) NOT NULL,
    description text NOT NULL,
    email character varying(255),
    name character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    searchablename character varying(255) NOT NULL,
    deliverylink character varying(255),
    ecommercelink character varying(255),
    facebooklink character varying(255),
    instagramlink character varying(255),
    opinionlink character varying(255),
    reservationlink character varying(255),
    twitterlink character varying(255),
    website character varying(255),
    account_id bigint NOT NULL,
    address_id bigint,
    illustration_id bigint,
    landscape_id bigint
);


ALTER TABLE public.business OWNER TO play;

--
-- Name: business_category; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE business_category (
    business bigint NOT NULL,
    category bigint NOT NULL
);


ALTER TABLE public.business_category OWNER TO play;

--
-- Name: business_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE business_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.business_id_seq OWNER TO play;

--
-- Name: business_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE business_id_seq OWNED BY business.id;


--
-- Name: businesscategory; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE businesscategory (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    name character varying(255) NOT NULL,
    orderindex integer,
    parent_id bigint,
    translationname_id bigint NOT NULL
);


ALTER TABLE public.businesscategory OWNER TO play;

--
-- Name: businesscategory_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE businesscategory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.businesscategory_id_seq OWNER TO play;

--
-- Name: businesscategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE businesscategory_id_seq OWNED BY businesscategory.id;


--
-- Name: businessschedule; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE businessschedule (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    dayofweek character varying(255) NOT NULL,
    business_id bigint
);


ALTER TABLE public.businessschedule OWNER TO play;

--
-- Name: businessschedule_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE businessschedule_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.businessschedule_id_seq OWNER TO play;

--
-- Name: businessschedule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE businessschedule_id_seq OWNED BY businessschedule.id;


--
-- Name: businessschedulepart; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE businessschedulepart (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    attendance character varying(255) NOT NULL,
    fromminutes integer NOT NULL,
    tominutes integer NOT NULL,
    businessschedule_id bigint NOT NULL
);


ALTER TABLE public.businessschedulepart OWNER TO play;

--
-- Name: businessschedulepart_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE businessschedulepart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.businessschedulepart_id_seq OWNER TO play;

--
-- Name: businessschedulepart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE businessschedulepart_id_seq OWNED BY businessschedulepart.id;


--
-- Name: categoryinterestlink; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE categoryinterestlink (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    priority integer NOT NULL,
    businesscategory_id bigint NOT NULL,
    customerinterest_id bigint NOT NULL
);


ALTER TABLE public.categoryinterestlink OWNER TO play;

--
-- Name: categoryinterestlink_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE categoryinterestlink_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categoryinterestlink_id_seq OWNER TO play;

--
-- Name: categoryinterestlink_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE categoryinterestlink_id_seq OWNED BY categoryinterestlink.id;


--
-- Name: customerinterest; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE customerinterest (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    iconname character varying(255),
    name character varying(255) NOT NULL,
    orderindex integer,
    translationname_id bigint NOT NULL
);


ALTER TABLE public.customerinterest OWNER TO play;

--
-- Name: customerinterest_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE customerinterest_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customerinterest_id_seq OWNER TO play;

--
-- Name: customerinterest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE customerinterest_id_seq OWNED BY customerinterest.id;


--
-- Name: facebookcredential; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE facebookcredential (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    userid character varying(255) NOT NULL,
    account_id bigint NOT NULL
);


ALTER TABLE public.facebookcredential OWNER TO play;

--
-- Name: facebookcredential_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE facebookcredential_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.facebookcredential_id_seq OWNER TO play;

--
-- Name: facebookcredential_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE facebookcredential_id_seq OWNED BY facebookcredential.id;


--
-- Name: followlink; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE followlink (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    followedfrom timestamp without time zone NOT NULL,
    followingnotification boolean DEFAULT true NOT NULL,
    notification boolean,
    account_id bigint NOT NULL,
    business_id bigint NOT NULL
);


ALTER TABLE public.followlink OWNER TO play;

--
-- Name: followlink_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE followlink_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.followlink_id_seq OWNER TO play;

--
-- Name: followlink_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE followlink_id_seq OWNED BY followlink.id;


--
-- Name: logincredential; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE logincredential (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    keepsessionopen boolean NOT NULL,
    password character varying(255) NOT NULL,
    account_id bigint NOT NULL
);


ALTER TABLE public.logincredential OWNER TO play;

--
-- Name: logincredential_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE logincredential_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.logincredential_id_seq OWNER TO play;

--
-- Name: logincredential_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE logincredential_id_seq OWNED BY logincredential.id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE session (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    connectiondate timestamp without time zone,
    source character varying(255),
    account_id bigint NOT NULL
);


ALTER TABLE public.session OWNER TO play;

--
-- Name: session_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.session_id_seq OWNER TO play;

--
-- Name: session_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE session_id_seq OWNED BY session.id;


--
-- Name: storedfile; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE storedfile (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    comment text,
    fileorder integer DEFAULT 0,
    isimage boolean NOT NULL,
    originalname character varying(255) NOT NULL,
    size integer,
    storedname character varying(255) NOT NULL,
    storednameoriginalsize character varying(255),
    account_id bigint NOT NULL,
    businessgallerypicture_id bigint,
    publication_id bigint
);


ALTER TABLE public.storedfile OWNER TO play;

--
-- Name: storedfile_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE storedfile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.storedfile_id_seq OWNER TO play;

--
-- Name: storedfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE storedfile_id_seq OWNED BY storedfile.id;


--
-- Name: translation; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE translation (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint
);


ALTER TABLE public.translation OWNER TO play;

--
-- Name: translation_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE translation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.translation_id_seq OWNER TO play;

--
-- Name: translation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE translation_id_seq OWNED BY translation.id;


--
-- Name: translationvalue; Type: TABLE; Schema: public; Owner: play; Tablespace: 
--

CREATE TABLE translationvalue (
    id bigint NOT NULL,
    creationdate timestamp without time zone,
    creationuser character varying(255),
    lastupdate timestamp without time zone,
    lastupdateuser character varying(255),
    version bigint,
    content text NOT NULL,
    lang character varying(255) DEFAULT 'en'::character varying NOT NULL,
    searchablecontent character varying(255) NOT NULL,
    translation_id bigint
);


ALTER TABLE public.translationvalue OWNER TO play;

--
-- Name: translationvalue_id_seq; Type: SEQUENCE; Schema: public; Owner: play
--

CREATE SEQUENCE translationvalue_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.translationvalue_id_seq OWNER TO play;

--
-- Name: translationvalue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: play
--

ALTER SEQUENCE translationvalue_id_seq OWNED BY translationvalue.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY abstractpublication ALTER COLUMN id SET DEFAULT nextval('abstractpublication_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY account ALTER COLUMN id SET DEFAULT nextval('account_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY address ALTER COLUMN id SET DEFAULT nextval('address_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY business ALTER COLUMN id SET DEFAULT nextval('business_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY businesscategory ALTER COLUMN id SET DEFAULT nextval('businesscategory_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY businessschedule ALTER COLUMN id SET DEFAULT nextval('businessschedule_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY businessschedulepart ALTER COLUMN id SET DEFAULT nextval('businessschedulepart_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY categoryinterestlink ALTER COLUMN id SET DEFAULT nextval('categoryinterestlink_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY customerinterest ALTER COLUMN id SET DEFAULT nextval('customerinterest_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY facebookcredential ALTER COLUMN id SET DEFAULT nextval('facebookcredential_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY followlink ALTER COLUMN id SET DEFAULT nextval('followlink_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY logincredential ALTER COLUMN id SET DEFAULT nextval('logincredential_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY session ALTER COLUMN id SET DEFAULT nextval('session_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY storedfile ALTER COLUMN id SET DEFAULT nextval('storedfile_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY translation ALTER COLUMN id SET DEFAULT nextval('translation_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: play
--

ALTER TABLE ONLY translationvalue ALTER COLUMN id SET DEFAULT nextval('translationvalue_id_seq'::regclass);


--
-- Data for Name: abstractpublication; Type: TABLE DATA; Schema: public; Owner: play
--

COPY abstractpublication (dtype, id, creationdate, creationuser, lastupdate, lastupdateuser, version, description, enddate, searchabletitle, startdate, title, minimalquantity, offpercent, originalprice, quantity, unit, business_id, interest_id) FROM stdin;
Promotion	72	2015-09-15 01:19:14.604	\N	2015-09-15 01:19:14.604	\N	0		2015-09-26 19:00:00	pok	2015-09-15 01:18:43.53	pok	\N	0.0100000000000000002	\N	\N	\N	2	20
Promotion	24	2015-09-11 22:14:37.195	\N	2015-09-11 22:14:37.195	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-14 15:14:37.195	bonnets 'speedo'	2015-09-10 22:14:37.195	Bonnets 'Speedo'	\N	0.5	\N	\N		3	10
Promotion	1	2015-09-11 22:14:21.194	\N	2015-09-11 22:14:21.194	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 00:14:21.193	tartes aux fraises	2015-09-10 22:14:21.193	Tartes aux fraises	1	0.66666666666666663	12	8		1	1
BusinessNotification	2	2015-09-11 22:14:22.226	\N	2015-09-11 22:14:22.226	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 04:14:22.226	voici notre derniere creation pour l'anniversaire d'enzo!	2015-09-10 22:14:22.226	Voici notre dernière création pour l'anniversaire d'Enzo!	\N	\N	\N	\N	\N	1	14
BusinessNotification	3	2015-09-11 22:14:23.23	\N	2015-09-11 22:14:23.23	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 22:14:23.23	n'oubliez pas de feter papa ce dimanche nous, on est prets!	2015-09-10 22:14:23.23	N'oubliez pas de fêter Papa ce dimanche… Nous, on est prêts!	\N	\N	\N	\N	\N	1	\N
BusinessNotification	4	2015-09-11 22:14:24.078	\N	2015-09-11 22:14:24.078	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-13 22:14:24.078	bienvenue a l'expo "miel dans tous ses etats" au centre culturel!	2015-09-10 22:14:24.078	Bienvenue à l'expo "Miel dans tous ses états" au Centre Culturel!	\N	\N	\N	\N	\N	1	4
BusinessNotification	5	2015-09-11 22:14:24.976	\N	2015-09-11 22:14:24.976	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 21:14:24.968	saviez-vous que tout les fruits que nous utilisons sont bio et locaux?	2015-09-10 22:14:24.968	Saviez-vous que tout les fruits que nous utilisons sont bio et locaux?	\N	\N	\N	\N	\N	1	\N
BusinessNotification	6	2015-09-11 22:14:25.983	\N	2015-09-11 22:14:25.983	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-13 17:14:25.983	nous serons exceptionellement fermes ce weekend!	2015-09-10 22:14:25.983	Nous serons exceptionellement fermés ce weekend!	\N	\N	\N	\N	\N	1	\N
Promotion	7	2015-09-11 22:14:26.556	\N	2015-09-11 22:14:26.556	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 21:14:26.556	pots de miel 300ml	2015-09-10 22:14:26.556	Pots de miel 300ml	\N	0.100000000000000006	\N	\N		1	1
Promotion	8	2015-09-11 22:14:26.564	\N	2015-09-11 22:14:26.564	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 04:14:26.564	2 + 1 couque gratuite	2015-09-10 22:14:26.564	2 + 1 couque gratuite	\N	\N	\N	\N		1	1
BusinessNotification	9	2015-09-11 22:14:26.59	\N	2015-09-11 22:14:26.59	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 03:14:26.589	bientot la saison des barbecues preparez-vous!  :)	2015-09-10 22:14:26.589	Bientôt la saison des barbecues… Préparez-vous!  :)	\N	\N	\N	\N	\N	2	1
BusinessNotification	10	2015-09-11 22:14:27.41	\N	2015-09-11 22:14:27.41	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 21:14:27.41	je vous presente mr marc, mon fournisseur de buf de qualite du brabant wallon!	2015-09-10 22:14:27.41	Je vous présente Mr Marc, mon fournisseur de bœuf de qualité du Brabant Wallon!	\N	\N	\N	\N	\N	2	\N
BusinessNotification	11	2015-09-11 22:14:27.874	\N	2015-09-11 22:14:27.874	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-14 15:14:27.873	faites mariner vos viandes des la veille au soir pour un meilleur gout!	2015-09-10 22:14:27.874	Faites mariner vos viandes dès la veille au soir pour un meilleur goût!	\N	\N	\N	\N	\N	2	\N
BusinessNotification	12	2015-09-11 22:14:28.588	\N	2015-09-11 22:14:28.588	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-15 13:14:28.588	nouveau boudin blanc maison a decouvrir!	2015-09-10 22:14:28.588	Nouveau boudin blanc maison à découvrir!	\N	\N	\N	\N	\N	2	1
BusinessNotification	13	2015-09-11 22:14:29.366	\N	2015-09-11 22:14:29.366	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 01:14:29.366	l'equipe au complet en plein travail!	2015-09-10 22:14:29.366	L'équipe au complet en plein travail!	\N	\N	\N	\N	\N	2	\N
Promotion	14	2015-09-11 22:14:30.191	\N	2015-09-11 22:14:30.191	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 02:14:30.19	brochettes de poulet	2015-09-10 22:14:30.19	Brochettes de poulet	\N	0.149999999999999994	\N	\N		2	1
Promotion	15	2015-09-11 22:14:31.047	\N	2015-09-11 22:14:31.047	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 21:14:31.047	sauce banzai	2015-09-10 22:14:31.047	Sauce Banzaï	\N	0.200000000000000011	\N	\N		2	1
Promotion	16	2015-09-11 22:14:31.978	\N	2015-09-11 22:14:31.978	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-15 02:14:31.978	roti de porc	2015-09-10 22:14:31.978	Roti de porc	0.25	0.100000000000000006	15	6	kg	2	1
Promotion	17	2015-09-11 22:14:32.825	\N	2015-09-11 22:14:32.825	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 01:14:32.825	pate au poivre vert	2015-09-10 22:14:32.825	Pâté au poivre vert	\N	0.149999999999999994	25	2	kg	2	1
BusinessNotification	18	2015-09-11 22:14:33.686	\N	2015-09-11 22:14:33.686	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 03:14:33.686	venez nous retrouvez tous les mardis des 18h00 pour l'aquagym!	2015-09-10 22:14:33.686	Venez nous retrouvez tous les mardis dès 18h00 pour l'aquagym!	\N	\N	\N	\N	\N	3	10
BusinessNotification	19	2015-09-11 22:14:34.172	\N	2015-09-11 22:14:34.172	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 07:14:34.172	les 6iemes primaire de saint michel sont venus nous dire bonjour!	2015-09-10 22:14:34.172	Les 6ièmes primaire de Saint Michel sont venus nous dire bonjour!	\N	\N	\N	\N	\N	3	\N
BusinessNotification	20	2015-09-11 22:14:34.837	\N	2015-09-11 22:14:34.837	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-13 17:14:34.837	fiers de notre athlete national!	2015-09-10 22:14:34.837	Fiers de notre athlète national!	\N	\N	\N	\N	\N	3	\N
BusinessNotification	21	2015-09-11 22:14:35.537	\N	2015-09-11 22:14:35.537	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-15 02:14:35.537	il fait chaud dehors, il fait juste bon dedans 28c sous l'eau!	2015-09-10 22:14:35.537	Il fait chaud dehors, il fait juste bon dedans… 28°C sous l'eau!	\N	\N	\N	\N	\N	3	10
BusinessNotification	22	2015-09-11 22:14:36.221	\N	2015-09-11 22:14:36.221	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 01:14:36.221	toutes les 2 heures, les sols de nos cabines sont nettoyes a fond!	2015-09-10 22:14:36.221	Toutes les 2 heures, les sols de nos cabines sont nettoyés à fond!	\N	\N	\N	\N	\N	3	\N
Promotion	23	2015-09-11 22:14:37.188	\N	2015-09-11 22:14:37.188	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 07:14:37.188	entree adulte "soiree"	2015-09-10 22:14:37.188	Entrée adulte "Soirée"	\N	0.300000000000000044	\N	\N		3	10
BusinessNotification	25	2015-09-11 22:14:40.216	\N	2015-09-11 22:14:40.216	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 07:14:40.216	nous proposons aujourd'hui en lunch du jour une salade de gesiers aux pommes.	2015-09-10 22:14:40.216	Nous proposons aujourd'hui en lunch du jour une salade de gésiers aux pommes.	\N	\N	\N	\N	\N	4	1
BusinessNotification	26	2015-09-11 22:14:41.123	\N	2015-09-11 22:14:41.123	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-13 17:14:41.123	bienvenue a michel notre nouveau cuisinier!	2015-09-10 22:14:41.123	Bienvenue à Michel notre nouveau cuisinier!	\N	\N	\N	\N	\N	4	\N
BusinessNotification	27	2015-09-11 22:14:41.443	\N	2015-09-11 22:14:41.443	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 05:14:41.443	7h00, deja l'heure pour nous d'aller vous chercher de bons produits!	2015-09-10 22:14:41.443	7h00, déjà l'heure pour nous d'aller vous chercher de bons produits!	\N	\N	\N	\N	\N	4	\N
BusinessNotification	28	2015-09-11 22:14:41.849	\N	2015-09-11 22:14:41.849	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-16 00:14:41.849	n'oubliez pas reservez votre table si vous venez en groupe!	2015-09-10 22:14:41.849	N'oubliez pas réservez votre table si vous venez en groupe!	\N	\N	\N	\N	\N	4	\N
BusinessNotification	29	2015-09-11 22:14:42.59	\N	2015-09-11 22:14:42.59	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 03:14:42.59	happy hour ce jeudi soir sur les cocktails de 18 a 19h!	2015-09-10 22:14:42.59	Happy Hour ce jeudi soir sur les cocktails de 18 à 19h!	\N	\N	\N	\N	\N	4	2
Promotion	30	2015-09-11 22:14:43.405	\N	2015-09-11 22:14:43.405	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-14 15:14:43.404	2 couverts	2015-09-10 22:14:43.404	2 couverts	1	0.100000000000000006	\N	10		4	1
Promotion	31	2015-09-11 22:14:43.411	\N	2015-09-11 22:14:43.411	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-15 02:14:43.411	steaks de saumon	2015-09-10 22:14:43.411	Steaks de saumon	1	\N	18	8		4	1
BusinessNotification	32	2015-09-11 22:14:43.42	\N	2015-09-11 22:14:43.42	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 01:14:43.42	vous revez d'un combishort pour l'ete? ils vous attendent!	2015-09-10 22:14:43.42	Vous rêvez d'un combishort pour l'été? Ils vous attendent!	\N	\N	\N	\N	\N	5	7
BusinessNotification	33	2015-09-11 22:14:44.407	\N	2015-09-11 22:14:44.407	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 03:14:44.407	le jeans est partout... depechez vous de regarnir votre garde-robe!	2015-09-10 22:14:44.407	Le jeans est partout... Dépêchez vous de regarnir votre garde-robe!	\N	\N	\N	\N	\N	5	\N
BusinessNotification	34	2015-09-11 22:14:45.417	\N	2015-09-11 22:14:45.417	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 07:14:45.416	retouches gratuites sur vos robes de soiree jusqu'aux soldes!	2015-09-10 22:14:45.416	Retouches gratuites sur vos robes de soirée jusqu'aux soldes!	\N	\N	\N	\N	\N	5	\N
BusinessNotification	35	2015-09-11 22:14:46.955	\N	2015-09-11 22:14:46.955	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-13 17:14:46.955	seance relooking chez via moda ce vendredi soir. inscriptions ouvertes!	2015-09-10 22:14:46.955	Séance relooking chez Via Moda ce vendredi soir. Inscriptions ouvertes!	\N	\N	\N	\N	\N	5	\N
BusinessNotification	36	2015-09-11 22:14:47.911	\N	2015-09-11 22:14:47.911	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-15 02:14:47.911	que pensez-vous du nouvel arrivage?..	2015-09-10 22:14:47.911	Que pensez-vous du nouvel arrivage?..	\N	\N	\N	\N	\N	5	7
Promotion	37	2015-09-11 22:14:49.573	\N	2015-09-11 22:14:49.573	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 01:14:49.572	chapeaux de mariage	2015-09-10 22:14:49.572	Chapeaux de mariage	\N	0.149999999999999994	\N	\N		5	7
Promotion	38	2015-09-11 22:14:49.994	\N	2015-09-11 22:14:49.994	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 07:14:49.994	bottes daim bouvy	2015-09-10 22:14:49.994	Bottes daim BOUVY	\N	0.200000000000000011	\N	\N		5	7
Promotion	39	2015-09-11 22:14:50.439	\N	2015-09-11 22:14:50.439	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 01:14:50.439	vestes cuir chanel	2015-09-10 22:14:50.439	Vestes cuir CHANEL	1	0.300000000000000044	399	5		5	7
BusinessNotification	40	2015-09-11 22:14:52.29	\N	2015-09-11 22:14:52.29	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-15 13:14:52.29	tous nos produits sont sans ammoniac pour limiter l'agression de votre peau!	2015-09-10 22:14:52.29	Tous nos produits sont sans ammoniac pour limiter l'agression de votre peau!	\N	\N	\N	\N	\N	6	\N
BusinessNotification	41	2015-09-11 22:14:53.007	\N	2015-09-11 22:14:53.007	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 07:14:53.007	avez-vous deja essayer le nouveau soin loreal?	2015-09-10 22:14:53.007	Avez-vous déjà essayer le nouveau soin LOREAL?	\N	\N	\N	\N	\N	6	9
BusinessNotification	42	2015-09-11 22:14:53.349	\N	2015-09-11 22:14:53.349	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-13 17:14:53.349	votre coiffeuse elise sera en conge du 10 au 22 juillet.	2015-09-10 22:14:53.349	Votre coiffeuse Elise sera en congé du 10 au 22 juillet.	\N	\N	\N	\N	\N	6	\N
BusinessNotification	43	2015-09-11 22:14:54.166	\N	2015-09-11 22:14:54.166	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 05:14:54.166	n'oubliez pas de proteger egalement vos cheveux du soleil!	2015-09-10 22:14:54.166	N'oubliez pas de protéger également vos cheveux du soleil!	\N	\N	\N	\N	\N	6	\N
BusinessNotification	44	2015-09-11 22:14:54.974	\N	2015-09-11 22:14:54.974	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-16 00:14:54.974	et si vous tentiez un peu plus de cuivre dans vos cheveux?!	2015-09-10 22:14:54.974	Et si vous tentiez un peu plus de cuivre dans vos cheveux?!	\N	\N	\N	\N	\N	6	\N
Promotion	45	2015-09-11 22:14:55.378	\N	2015-09-11 22:14:55.378	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 03:14:55.378	brushing (tous les lundis)	2015-09-10 22:14:55.378	Brushing (tous les lundis)	\N	0.149999999999999994	\N	\N		6	9
Promotion	46	2015-09-11 22:14:55.394	\N	2015-09-11 22:14:55.394	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 21:14:55.393	lumino contrast (l'oreal)	2015-09-10 22:14:55.393	Lumino Contrast (L'Oréal)	1	0.200000000000000011	19	35		6	9
BusinessNotification	47	2015-09-11 22:14:56.206	\N	2015-09-11 22:14:56.206	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-14 15:14:56.206	nouvel arrivage juste pour votre terrasse!	2015-09-10 22:14:56.206	Nouvel arrivage juste pour votre terrasse!	\N	\N	\N	\N	\N	7	8
BusinessNotification	48	2015-09-11 22:14:57.051	\N	2015-09-11 22:14:57.051	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-15 13:14:57.051	et si ajoutiez un peu de home-made dans votre deco?	2015-09-10 22:14:57.051	Et si ajoutiez un peu de Home-Made dans votre déco?	\N	\N	\N	\N	\N	7	8
BusinessNotification	49	2015-09-11 22:14:57.844	\N	2015-09-11 22:14:57.844	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 07:14:57.844	des bougies aux milles senteurs!	2015-09-10 22:14:57.844	Des bougies aux milles senteurs!	\N	\N	\N	\N	\N	7	8
BusinessNotification	50	2015-09-11 22:14:58.388	\N	2015-09-11 22:14:58.388	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-13 17:14:58.388	nous vous proposons des stages de bricolage pour vos enfants!	2015-09-10 22:14:58.388	Nous vous proposons des stages de bricolage pour vos enfants!	\N	\N	\N	\N	\N	7	14
BusinessNotification	51	2015-09-11 22:14:58.85	\N	2015-09-11 22:14:58.85	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 05:14:58.85	des idees depuis nos vacances!	2015-09-10 22:14:58.85	Des idées depuis nos vacances!	\N	\N	\N	\N	\N	7	8
Promotion	52	2015-09-11 22:14:59.583	\N	2015-09-11 22:14:59.583	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-16 00:14:59.583	serviettes funny	2015-09-10 22:14:59.583	Serviettes FUNNY	\N	\N	\N	\N		7	8
Promotion	53	2015-09-11 22:14:59.976	\N	2015-09-11 22:14:59.976	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 03:14:59.976	fauteuils chill	2015-09-10 22:14:59.976	Fauteuils CHILL	\N	0.100000000000000006	\N	\N		7	8
Promotion	54	2015-09-11 22:15:00.8	\N	2015-09-11 22:15:00.8	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-14 06:15:00.8	tables 4 personnes gardenor	2015-09-10 22:15:00.8	Tables 4 personnes GARDENOR	\N	\N	\N	\N		7	8
BusinessNotification	55	2015-09-11 22:15:01.652	\N	2015-09-11 22:15:01.652	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-14 15:15:01.652	et voici notre cocktail de l'ete a gouter de toute urgence!	2015-09-10 22:15:01.652	Et voici notre cocktail de l'été… A goûter de toute urgence!	\N	\N	\N	\N	\N	8	2
BusinessNotification	56	2015-09-11 22:15:02.441	\N	2015-09-11 22:15:02.441	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-15 02:15:02.44	soiree speciale latino ce vendredi!	2015-09-10 22:15:02.44	Soirée spéciale Latino ce vendredi!	\N	\N	\N	\N	\N	8	3
BusinessNotification	57	2015-09-11 22:15:02.925	\N	2015-09-11 22:15:02.925	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 01:15:02.925	la terrasse est ouverte pour le weekend!	2015-09-10 22:15:02.925	La terrasse est ouverte pour le weekend!	\N	\N	\N	\N	\N	8	\N
BusinessNotification	58	2015-09-11 22:15:04.215	\N	2015-09-11 22:15:04.215	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 03:15:04.214	la delta nouvelle biere au clover!	2015-09-10 22:15:04.214	La Delta… Nouvelle bière au Clover!	\N	\N	\N	\N	\N	8	2
BusinessNotification	59	2015-09-11 22:15:04.994	\N	2015-09-11 22:15:04.994	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 07:15:04.994	projection du match ce soir des 20h00!	2015-09-10 22:15:04.994	Projection du match ce soir dès 20h00!	\N	\N	\N	\N	\N	8	3
Promotion	60	2015-09-11 22:15:05.826	\N	2015-09-11 22:15:05.826	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-13 17:15:05.826	10 + 1 biere gratuite durant toute la coupe du monde!	2015-09-10 22:15:05.826	10 + 1 bière gratuite durant toute la coupe du monde!	\N	\N	\N	\N		8	2
Promotion	61	2015-09-11 22:15:05.836	\N	2015-09-11 22:15:05.836	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-15 02:15:05.836	mojito fraises	2015-09-10 22:15:05.836	Mojito Fraises	\N	0.200000000000000011	\N	\N		8	2
BusinessNotification	62	2015-09-11 22:15:05.866	\N	2015-09-11 22:15:05.866	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 01:15:05.866	c'est la saison des mangues. rendez-vous au rayon fruits et legumes!	2015-09-10 22:15:05.866	C'est la saison des mangues. Rendez-vous au rayon fruits et légumes!	\N	\N	\N	\N	\N	9	1
BusinessNotification	63	2015-09-11 22:15:06.253	\N	2015-09-11 22:15:06.253	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-14 15:15:06.253	alex, notre responsable 'bien-etre', vous conseille parmi nos cremes solaires.	2015-09-10 22:15:06.253	Alex, notre responsable 'Bien-Être', vous conseille parmi nos crêmes solaires.	\N	\N	\N	\N	\N	9	9
BusinessNotification	64	2015-09-11 22:15:07.14	\N	2015-09-11 22:15:07.14	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-15 13:15:07.14	pensez au self-scan pour gagner du temps!	2015-09-10 22:15:07.14	Pensez au self-scan pour gagner du temps!	\N	\N	\N	\N	\N	9	\N
BusinessNotification	65	2015-09-11 22:15:07.873	\N	2015-09-11 22:15:07.873	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 07:15:07.873	les scouts de saint dominique financent leur voyage a nos caisses!	2015-09-10 22:15:07.873	Les scouts de Saint Dominique financent leur voyage à nos caisses!	\N	\N	\N	\N	\N	9	\N
BusinessNotification	66	2015-09-11 22:15:08.363	\N	2015-09-11 22:15:08.363	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-13 17:15:08.363	la delta est egalement disponible chez nous!	2015-09-10 22:15:08.363	La Delta est également disponible chez nous!	\N	\N	\N	\N	\N	9	5
Promotion	67	2015-09-11 22:15:08.846	\N	2015-09-11 22:15:08.846	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 05:15:08.846	decoration 'paques'	2015-09-10 22:15:08.846	Décoration 'Pâques'	\N	0.149999999999999994	\N	\N		9	8
Promotion	68	2015-09-11 22:15:09.676	\N	2015-09-11 22:15:09.676	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-16 00:15:09.676	poulets rotis	2015-09-10 22:15:09.676	Poulets rôtis	\N	0.200000000000000011	\N	\N		9	1
Promotion	69	2015-09-11 22:15:10.071	\N	2015-09-11 22:15:10.071	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 03:15:10.071	sauce devos lemmens	2015-09-10 22:15:10.071	Sauce DEVOS LEMMENS	\N	0.100000000000000006	\N	\N		9	5
Promotion	70	2015-09-11 22:15:10.865	\N	2015-09-11 22:15:10.865	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-12 05:15:10.865	tables ping-pong jeanmi	2015-09-10 22:15:10.865	Tables Ping-Pong JEANMI	1	0.100000000000000006	179	3		9	5
Promotion	71	2015-09-11 22:15:11.672	\N	2015-09-11 22:15:11.672	\N	0	cec uefposkfpk pok zepofk zepokf pzeokf poezkf poz	2015-09-14 06:15:11.672	velo enfants eddi	2015-09-10 22:15:11.672	Vélo Enfants EDDI	1	0.149999999999999994	85	5		9	14
\.


--
-- Name: abstractpublication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('abstractpublication_id_seq', 72, true);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: play
--

COPY account (dtype, id, creationdate, creationuser, lastupdate, lastupdateuser, version, authenticationkey, email, firstname, gender, lang, lastname, role, sendnotificationbydefault, type, selectedaddress_id) FROM stdin;
Account	2	\N	\N	\N	\N	0	\N	gil.knops@krings-law.be	Florian	MALE	fr	Jeanmart	SUPERADMIN	t	CUSTOMER	\N
Account	3	\N	\N	\N	\N	0	\N	greg.malcause@gmail.com	Florian	MALE	fr	Jeanmart	SUPERADMIN	t	CUSTOMER	\N
BusinessAccount	4	2015-09-11 22:13:33.482	\N	2015-09-11 22:13:33.482	\N	0	vdSATEfG6ODLG5XNaSuEdRLK1MxyJm4OWktm4SBzqfjl+u+ng1CptCtm5n7KkuuC	pain@business.com	L'amie du pain	MALE	fr	L'amie du pain	BUSINESS	t	BUSINESS	\N
BusinessAccount	5	2015-09-11 22:13:43.024	\N	2015-09-11 22:13:43.024	\N	0	ec9N8vdr+IODlpT3vpQGdfBgZa0CTg/5nEteeDhSAY1r3MmGADTDG4uUbjmUiHxo	boucherie@business.com	La Bouche Rit	MALE	fr	La Bouche Rit	BUSINESS	t	BUSINESS	\N
BusinessAccount	6	2015-09-11 22:13:48.077	\N	2015-09-11 22:13:48.077	\N	0	9VUNoQdPVGCtSTJhOcbnCNLaCj5qvyeGbOwvCFsWTp8QPeW94I9eYpYKJWH3lUsn	piscine@business.com	Piscine 'Ibiza'	MALE	fr	Piscine 'Ibiza'	BUSINESS	t	BUSINESS	\N
BusinessAccount	7	2015-09-11 22:13:52.646	\N	2015-09-11 22:13:52.646	\N	0	emahzcdeAiOfykThvdPJGS4KAM1kI2/PmAizVrLNht2S5lsqU6HmDrdxp3dv0fxh	villa@business.com	Villa Lorraine	MALE	fr	Villa Lorraine	BUSINESS	t	BUSINESS	\N
BusinessAccount	8	2015-09-11 22:13:55.495	\N	2015-09-11 22:13:55.495	\N	0	4scbDclGGx5Tyl3EqprYnykIL771W84v4BcuFz7vWPqffb3dRniURcKmBCclv/lh	mode@business.com	Via Moda	MALE	fr	Via Moda	BUSINESS	t	BUSINESS	\N
BusinessAccount	9	2015-09-11 22:14:00.724	\N	2015-09-11 22:14:00.724	\N	0	RJ7l0EPXJ7fc7vbYuqx6iSVEyJ9TEzkJVEaC3sDqSY9qzCdyjjA27PmmAva8G/HO	coiffeur@business.com	Tif & Tondu	MALE	fr	Tif & Tondu	BUSINESS	t	BUSINESS	\N
BusinessAccount	10	2015-09-11 22:14:04.682	\N	2015-09-11 22:14:04.682	\N	0	i2O16X3bWguxrn4QbFSjw8MEooOSH5b5qe/3bQbkzQqPqgKMGW5oLII4LhRmgxgh	traiteur@business.com	Jany Deco	MALE	fr	Jany Deco	BUSINESS	t	BUSINESS	\N
BusinessAccount	11	2015-09-11 22:14:11.982	\N	2015-09-11 22:14:11.982	\N	0	7FVHMu0pBxAdpAqk59XJN+enYBQK739FCP2lUTwcZGG2I3VoIojsfMp3yH/nOcYv	bar@business.com	Clover Bar	MALE	fr	Clover Bar	BUSINESS	t	BUSINESS	\N
BusinessAccount	12	2015-09-11 22:14:17.9	\N	2015-09-11 22:14:17.9	\N	0	Qqb5AP457K3n69lT0UGTGXyOaK3hZ1eBl614vCNvsPdhEeuW/xuwtCjUD0IFv5H/	jacketannie@business.com	Supermarket "Jack & Annie"	MALE	fr	Supermarket "Jack & Annie"	BUSINESS	t	BUSINESS	\N
Account	1	\N	\N	2015-09-12 12:43:59.009	\N	1	lMpzWrR0IEL4VcKhLxp1S5RkbTn2qzHqZ2z6Ds4S9jEgmhFgdZSXfkc575Ha7zdm	florian.jeanmart@gmail.com	Florian	MALE	fr	Jeanmart	SUPERADMIN	t	CUSTOMER	10
Account	13	2015-09-14 18:44:57.04	\N	2015-09-14 18:44:57.04	\N	0	VDmIhwvLfoMuQ6MRGwXyCyb+bUYyJY9TOWuqdmRrSWF3WFcARmoondL1iQO3PJeE	em@ma.le	prénom	MALE	fr	nom	CUSTOMER	t	\N	\N
Account	15	2015-09-15 00:13:34.071	\N	2015-09-15 00:13:34.071	\N	0	OMC0RwPMHIuMvMcuxD6qANbJXy7pnakeo9igznEBAHVBk27AWMstAqh8G90zQO2H	florian.jeanmart@gmail.cm	Florian	MALE	fr	Florian	CUSTOMER	t	\N	\N
Account	14	2015-09-15 00:10:03.648	\N	2015-09-15 00:14:08.807	\N	1	24jb0Xi5UiVh5Op3KTLsUkSzNIM+puE/CsdjKKmXiODZW3P7I+7NrV5x0EEUuX5d	florian.jean@hotmail.fr	Flo	MALE	fr	Rian	CUSTOMER	t	\N	11
\.


--
-- Data for Name: account_customerinterest; Type: TABLE DATA; Schema: public; Owner: play
--

COPY account_customerinterest (account_id, customerinterests_id) FROM stdin;
\.


--
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('account_id_seq', 15, true);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: play
--

COPY address (id, creationdate, creationuser, lastupdate, lastupdateuser, version, city, country, name, posx, posy, street, zip, account_id) FROM stdin;
1	2015-09-11 22:13:33.668	\N	2015-09-11 22:13:33.668	\N	0	Auderghem	Belgique	\N	50.8137793000000002	4.42598799999999937	Boulevard du Souverain 230	1160	\N
2	2015-09-11 22:13:43.253	\N	2015-09-11 22:13:43.253	\N	0	Auderghem	Belgique	\N	50.8126350000000002	4.42786819999999981	Boulevard du Souverain 63	1160	\N
3	2015-09-11 22:13:48.241	\N	2015-09-11 22:13:48.241	\N	0	Auderghem	Belgique	\N	50.7946416999999997	4.47961410000000004	Chaussée de Wavre 6	1160	\N
4	2015-09-11 22:13:52.807	\N	2015-09-11 22:13:52.807	\N	0	Auderghem	Belgique	\N	50.8203256999999979	4.42841769999999979	Boulevard du Souverain 6	1160	\N
5	2015-09-11 22:13:55.665	\N	2015-09-11 22:13:55.665	\N	0	Auderghem	Belgique	\N	50.8185288999999969	4.42785290000000042	Boulevard du Souverain 630	1160	\N
6	2015-09-11 22:14:00.884	\N	2015-09-11 22:14:00.884	\N	0	Auderghem	Belgique	\N	50.8036032999999989	4.44229839999999943	Avenue Schaller 105	1160	\N
7	2015-09-11 22:14:04.848	\N	2015-09-11 22:14:04.848	\N	0	Auderghem	Belgique	\N	50.8092894999999984	4.43650309999999859	Avenue Schaller 1	1160	\N
8	2015-09-11 22:14:12.15	\N	2015-09-11 22:14:12.15	\N	0	Auderghem	Belgique	\N	50.8089167999999987	4.43687960000000015	Avenue Schaller 15	1160	\N
9	2015-09-11 22:14:18.062	\N	2015-09-11 22:14:18.062	\N	0	Auderghem	Belgique	\N	50.8197121999999979	4.42898019999999981	Boulevard du Souverain 68	1160	\N
10	2015-09-12 12:43:58.897	\N	2015-09-12 12:43:58.897	\N	0	BXL	BELGIUM	Mon domicile	50.857491600000003	4.38435360000000074	12 place des bienfaiteurs	1030	1
11	2015-09-15 00:14:08.714	\N	2015-09-15 00:14:08.714	\N	0	BXL	BELGIUM	Mon domicile	50.857491600000003	4.38435360000000074	12 place des bienfaiteurs	1030	14
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('address_id_seq', 11, true);


--
-- Data for Name: business; Type: TABLE DATA; Schema: public; Owner: play
--

COPY business (id, creationdate, creationuser, lastupdate, lastupdateuser, version, askpublicationdate, businessstatus, description, email, name, phone, searchablename, deliverylink, ecommercelink, facebooklink, instagramlink, opinionlink, reservationlink, twitterlink, website, account_id, address_id, illustration_id, landscape_id) FROM stdin;
1	2015-09-11 22:13:33.482	\N	2015-09-11 22:13:43.264	\N	1	\N	PUBLISHED	L'Amie du Pain, boulangerie artisanale depuis 1972, vous  propose une large gamme de pains bio et cuits sur pierre.\nVenez également découvrir notre rayon de produits sans gluten, mais pas sans goût!	pain@business.com	L'amie du pain	+32 123 45 66	l'amie du pain	\N	\N	\N	\N	\N	\N	\N	\N	4	1	2	1
2	2015-09-11 22:13:43.024	\N	2015-09-11 22:13:48.251	\N	1	\N	PUBLISHED	Une boucherie où vous trouverez des viandes découpées sur place dans des viandes de qualité.\nTous les jours, les bouchers vous préparent de savoureuses viandes marinées que vous pouvez réserver également via le site internet.	boucherie@business.com	La Bouche Rit	+32 123 45 67	la bouche rit	\N	\N	\N	\N	\N	\N	\N	\N	5	2	4	3
3	2015-09-11 22:13:48.077	\N	2015-09-11 22:13:52.813	\N	1	\N	PUBLISHED	Notre piscine vous accueille tous les jours de la semaine dans ses installations toutes neuves et son eau toujours à 28°C!	piscine@business.com	Piscine 'Ibiza'	+32 123 45 68	piscine 'ibiza'	\N	\N	\N	\N	\N	\N	\N	\N	6	3	6	5
4	2015-09-11 22:13:52.646	\N	2015-09-11 22:13:55.672	\N	1	\N	PUBLISHED	Perdue au milieu du Parc de la Woluwe, la Villa Lorraine dispose d'une grande terrasse ensoleillée où il fait bon se retrouver entre amis après le boulot.\nRéservez également votre table pour un dîner aux chandelles ou entre collègues et laisser vous suprendre par notre chef étoilé!	villa@business.com	Villa Lorraine	+32 123 45 69	villa lorraine	\N	\N	\N	\N	\N	\N	\N	\N	7	4	8	7
5	2015-09-11 22:13:55.495	\N	2015-09-11 22:14:00.894	\N	1	\N	PUBLISHED	Venez passer la porte du paradis des robes et des chapeaux.\nUn choix vaste et des conseils personnalisés pour toutes les envies et tous les genres!	mode@business.com	Via Moda	+32 123 45 70	via moda	\N	\N	\N	\N	\N	\N	\N	\N	8	5	10	9
6	2015-09-11 22:14:00.724	\N	2015-09-11 22:14:04.861	\N	1	\N	PUBLISHED	Chez Tif & Tondu, nous voulons créer les conditions pour que vous expérimentiez un traitement personnalisé, de qualité et où le temps n’est pas compté. Nous mettons tout en œuvre pour que votre passage chez nous soit un vrai moment de détente et de plaisir.	coiffeur@business.com	Tif & Tondu	+32 123 45 71	tif & tondu	\N	\N	\N	\N	\N	\N	\N	\N	9	6	12	11
7	2015-09-11 22:14:04.682	\N	2015-09-11 22:14:12.159	\N	1	\N	PUBLISHED	Jany Deco est un magasin qui mêle passion et maison. Venez dénicher l'objet qui finira d'habiller votre salon, terasse ou même salle-de-bain!	traiteur@business.com	Jany Deco	+32 123 45 73	jany deco	\N	\N	\N	\N	\N	\N	\N	\N	10	7	14	13
8	2015-09-11 22:14:11.982	\N	2015-09-11 22:14:18.07	\N	1	\N	PUBLISHED	Situé dans l'artère commerciale de l'avenue Roland à Woluwé-Saint-Lambert, le Clover Bar  vous accueille pour déguster une de ses 50 bières spéciales à la carte. Si le houblon ne vous tente pas, vous succomberez aux charmes de nos cocktails maison!	bar@business.com	Clover Bar	+32 123 45 74	clover bar	\N	\N	\N	\N	\N	\N	\N	\N	11	8	16	15
9	2015-09-11 22:14:17.9	\N	2015-09-11 22:14:21.185	\N	1	\N	PUBLISHED	Jack & Annie vous accueillent depuis 1988 dans leur épicerie de quartier basée sur 2 étage. Parking facile et photomaton à disposition!	jacketannie@business.com	Supermarket "Jack & Annie"	+32 123 45 75	supermarket "jack & annie"	\N	\N	\N	\N	\N	\N	\N	\N	12	9	18	17
\.


--
-- Data for Name: business_category; Type: TABLE DATA; Schema: public; Owner: play
--

COPY business_category (business, category) FROM stdin;
1	34
2	32
3	148
4	28
5	51
6	66
7	41
8	20
9	31
\.


--
-- Name: business_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('business_id_seq', 9, true);


--
-- Data for Name: businesscategory; Type: TABLE DATA; Schema: public; Owner: play
--

COPY businesscategory (id, creationdate, creationuser, lastupdate, lastupdateuser, version, name, orderindex, parent_id, translationname_id) FROM stdin;
1	2015-09-11 22:11:48.976	\N	2015-09-11 22:11:48.976	\N	0	horeca	1	\N	21
2	2015-09-11 22:11:48.984	\N	2015-09-11 22:11:48.985	\N	0	horeca_hotel	2	1	22
3	2015-09-11 22:11:48.992	\N	2015-09-11 22:11:48.992	\N	0	horeca_hotel_auberge	3	2	23
4	2015-09-11 22:11:49	\N	2015-09-11 22:11:49	\N	0	horeca_hotel_camping	4	2	24
5	2015-09-11 22:11:49.007	\N	2015-09-11 22:11:49.008	\N	0	horeca_hotel_bb	5	2	25
6	2015-09-11 22:11:49.016	\N	2015-09-11 22:11:49.016	\N	0	horeca_hotel_hotel	6	2	26
7	2015-09-11 22:11:49.023	\N	2015-09-11 22:11:49.023	\N	0	horeca_restaurant	7	1	27
8	2015-09-11 22:11:49.031	\N	2015-09-11 22:11:49.031	\N	0	horeca_restaurant_fastfood	8	7	28
9	2015-09-11 22:11:49.039	\N	2015-09-11 22:11:49.039	\N	0	horeca_restaurant_asiatique	9	7	29
10	2015-09-11 22:11:49.047	\N	2015-09-11 22:11:49.047	\N	0	horeca_restaurant_europeen	10	7	30
11	2015-09-11 22:11:49.055	\N	2015-09-11 22:11:49.055	\N	0	horeca_restaurant_africain	11	7	31
12	2015-09-11 22:11:49.062	\N	2015-09-11 22:11:49.062	\N	0	horeca_restaurant_americain	12	7	32
13	2015-09-11 22:11:49.068	\N	2015-09-11 22:11:49.068	\N	0	horeca_restaurant_belge	13	7	33
14	2015-09-11 22:11:49.075	\N	2015-09-11 22:11:49.075	\N	0	horeca_restaurant_brunch	14	7	34
15	2015-09-11 22:11:49.082	\N	2015-09-11 22:11:49.082	\N	0	horeca_restaurant_gastronomique	15	7	35
16	2015-09-11 22:11:49.089	\N	2015-09-11 22:11:49.089	\N	0	horeca_cafe	16	1	36
17	2015-09-11 22:11:49.097	\N	2015-09-11 22:11:49.097	\N	0	horeca_cafe_bieres	17	16	37
18	2015-09-11 22:11:49.104	\N	2015-09-11 22:11:49.104	\N	0	horeca_cafe_vins	18	16	38
19	2015-09-11 22:11:49.11	\N	2015-09-11 22:11:49.111	\N	0	horeca_cafe_champagne	19	16	39
20	2015-09-11 22:11:49.118	\N	2015-09-11 22:11:49.118	\N	0	horeca_cafe_cocktails	20	16	40
21	2015-09-11 22:11:49.125	\N	2015-09-11 22:11:49.125	\N	0	horeca_cafe_jus	21	16	41
22	2015-09-11 22:11:49.134	\N	2015-09-11 22:11:49.134	\N	0	horeca_traiteur	22	1	42
23	2015-09-11 22:11:49.141	\N	2015-09-11 22:11:49.141	\N	0	horeca_traiteur_asiatique	23	22	43
24	2015-09-11 22:11:49.147	\N	2015-09-11 22:11:49.147	\N	0	horeca_traiteur_europeen	24	22	44
25	2015-09-11 22:11:49.154	\N	2015-09-11 22:11:49.154	\N	0	horeca_traiteur_africain	25	22	45
26	2015-09-11 22:11:49.162	\N	2015-09-11 22:11:49.162	\N	0	horeca_traiteur_americain	26	22	46
27	2015-09-11 22:11:49.169	\N	2015-09-11 22:11:49.169	\N	0	horeca_traiteur_belge	27	22	47
28	2015-09-11 22:11:49.177	\N	2015-09-11 22:11:49.177	\N	0	horeca_traiteur_gastronomique	28	22	48
29	2015-09-11 22:11:49.184	\N	2015-09-11 22:11:49.184	\N	0	magasin	29	\N	49
30	2015-09-11 22:11:49.19	\N	2015-09-11 22:11:49.19	\N	0	magasin_alimentation	30	29	50
31	2015-09-11 22:11:49.196	\N	2015-09-11 22:11:49.196	\N	0	magasin_alimentation_supermarche	31	30	51
32	2015-09-11 22:11:49.204	\N	2015-09-11 22:11:49.204	\N	0	magasin_alimentation_boucheriecharcuterie	32	30	52
33	2015-09-11 22:11:49.21	\N	2015-09-11 22:11:49.21	\N	0	magasin_alimentation_poissonerie	33	30	53
34	2015-09-11 22:11:49.216	\N	2015-09-11 22:11:49.216	\N	0	magasin_alimentation_boulangerie	34	30	54
35	2015-09-11 22:11:49.222	\N	2015-09-11 22:11:49.222	\N	0	magasin_alimentation_fromagerie	35	30	55
36	2015-09-11 22:11:49.228	\N	2015-09-11 22:11:49.228	\N	0	magasin_alimentation_bieres	36	30	56
37	2015-09-11 22:11:49.233	\N	2015-09-11 22:11:49.233	\N	0	magasin_alimentation_epices	37	30	57
38	2015-09-11 22:11:49.239	\N	2015-09-11 22:11:49.239	\N	0	magasin_alimentation_confiseries	38	30	58
39	2015-09-11 22:11:49.245	\N	2015-09-11 22:11:49.245	\N	0	magasin_loisirs	39	29	59
40	2015-09-11 22:11:49.25	\N	2015-09-11 22:11:49.25	\N	0	magasin_loisirs_sport_	40	39	60
41	2015-09-11 22:11:49.255	\N	2015-09-11 22:11:49.255	\N	0	magasin_loisirs_maison	41	39	61
42	2015-09-11 22:11:49.261	\N	2015-09-11 22:11:49.261	\N	0	magasin_loisirs_jardin	42	39	62
43	2015-09-11 22:11:49.267	\N	2015-09-11 22:11:49.267	\N	0	magasin_loisirs_jeux	43	39	63
44	2015-09-11 22:11:49.272	\N	2015-09-11 22:11:49.272	\N	0	magasin_loisirs_multimedia	44	39	64
45	2015-09-11 22:11:49.284	\N	2015-09-11 22:11:49.284	\N	0	magasin_loisirs_animaux	45	39	65
46	2015-09-11 22:11:49.291	\N	2015-09-11 22:11:49.291	\N	0	magasin_loisirs_voyages	46	39	66
47	2015-09-11 22:11:49.298	\N	2015-09-11 22:11:49.298	\N	0	magasin_loisirs_livres	47	39	67
48	2015-09-11 22:11:49.304	\N	2015-09-11 22:11:49.304	\N	0	magasin_mode	48	29	68
49	2015-09-11 22:11:49.31	\N	2015-09-11 22:11:49.31	\N	0	magasin_mode_enfants	49	48	69
50	2015-09-11 22:11:49.316	\N	2015-09-11 22:11:49.316	\N	0	magasin_mode_hommes	50	48	70
51	2015-09-11 22:11:49.323	\N	2015-09-11 22:11:49.323	\N	0	magasin_mode_femmes	51	48	71
52	2015-09-11 22:11:49.329	\N	2015-09-11 22:11:49.329	\N	0	magasin_mode_chaussures	52	48	72
53	2015-09-11 22:11:49.335	\N	2015-09-11 22:11:49.335	\N	0	magasin_mode_bijoux	53	48	73
54	2015-09-11 22:11:49.342	\N	2015-09-11 22:11:49.342	\N	0	magasin_mode_parfums	54	48	74
55	2015-09-11 22:11:49.348	\N	2015-09-11 22:11:49.348	\N	0	magasin_mode_lingerie	55	48	75
56	2015-09-11 22:11:49.355	\N	2015-09-11 22:11:49.355	\N	0	magasin_mode_lunettes	56	48	76
57	2015-09-11 22:11:49.362	\N	2015-09-11 22:11:49.362	\N	0	magasin_utile	57	29	77
58	2015-09-11 22:11:49.368	\N	2015-09-11 22:11:49.368	\N	0	magasin_utile_electromenager	58	57	78
59	2015-09-11 22:11:49.376	\N	2015-09-11 22:11:49.376	\N	0	magasin_utile_bricolage	59	57	79
60	2015-09-11 22:11:49.383	\N	2015-09-11 22:11:49.383	\N	0	magasin_utile_papeterie	60	57	80
61	2015-09-11 22:11:49.39	\N	2015-09-11 22:11:49.39	\N	0	magasin_utile_magasin_voiture	61	57	81
62	2015-09-11 22:11:49.396	\N	2015-09-11 22:11:49.396	\N	0	magasin_utile_droguerie	62	57	82
63	2015-09-11 22:11:49.402	\N	2015-09-11 22:11:49.402	\N	0	magasin_utile_velo	63	57	83
64	2015-09-11 22:11:49.407	\N	2015-09-11 22:11:49.407	\N	0	beaute	64	\N	84
65	2015-09-11 22:11:49.413	\N	2015-09-11 22:11:49.413	\N	0	beaute_soins	65	64	85
66	2015-09-11 22:11:49.42	\N	2015-09-11 22:11:49.42	\N	0	beaute_soins_coiffure	66	65	86
67	2015-09-11 22:11:49.426	\N	2015-09-11 22:11:49.426	\N	0	beaute_soins_esthetique	67	65	87
68	2015-09-11 22:11:49.432	\N	2015-09-11 22:11:49.432	\N	0	beaute_soins_manipedi	68	65	88
69	2015-09-11 22:11:49.437	\N	2015-09-11 22:11:49.437	\N	0	beaute_soins_massage	69	65	89
70	2015-09-11 22:11:49.442	\N	2015-09-11 22:11:49.442	\N	0	beaute_soins_tatoupierc	70	65	90
71	2015-09-11 22:11:49.448	\N	2015-09-11 22:11:49.448	\N	0	beaute_soins_toilettage	71	65	91
72	2015-09-11 22:11:49.452	\N	2015-09-11 22:11:49.452	\N	0	beaute_etablissement	72	64	92
73	2015-09-11 22:11:49.458	\N	2015-09-11 22:11:49.458	\N	0	beaute_etablissement_saunahammam	73	72	93
74	2015-09-11 22:11:49.463	\N	2015-09-11 22:11:49.463	\N	0	beaute_etablissement_solarium	74	72	94
75	2015-09-11 22:11:49.468	\N	2015-09-11 22:11:49.468	\N	0	sante	75	\N	95
76	2015-09-11 22:11:49.474	\N	2015-09-11 22:11:49.474	\N	0	sante_medconv	76	75	96
77	2015-09-11 22:11:49.479	\N	2015-09-11 22:11:49.479	\N	0	sante_medconv_generale	77	76	97
78	2015-09-11 22:11:49.485	\N	2015-09-11 22:11:49.485	\N	0	sante_medconv_ophtalmologie	78	76	98
79	2015-09-11 22:11:49.491	\N	2015-09-11 22:11:49.491	\N	0	sante_medconv_orl	79	76	99
80	2015-09-11 22:11:49.497	\N	2015-09-11 22:11:49.497	\N	0	sante_medconv_gyneco	80	76	100
81	2015-09-11 22:11:49.509	\N	2015-09-11 22:11:49.509	\N	0	sante_medconv_dentisterie	81	76	101
82	2015-09-11 22:11:49.515	\N	2015-09-11 22:11:49.515	\N	0	sante_medconv_kine	82	76	102
83	2015-09-11 22:11:49.521	\N	2015-09-11 22:11:49.521	\N	0	sante_medconv_dermato	83	76	103
84	2015-09-11 22:11:49.526	\N	2015-09-11 22:11:49.527	\N	0	sante_medconv_psycho	84	76	104
85	2015-09-11 22:11:49.532	\N	2015-09-11 22:11:49.532	\N	0	sante_mednonconv	85	75	105
86	2015-09-11 22:11:49.538	\N	2015-09-11 22:11:49.538	\N	0	asante_mednonconv_acupuncture	86	85	106
87	2015-09-11 22:11:49.544	\N	2015-09-11 22:11:49.544	\N	0	sante_mednonconv_osteopatie	87	85	107
88	2015-09-11 22:11:49.549	\N	2015-09-11 22:11:49.549	\N	0	sante_mednonconv_homeopathie	88	85	108
89	2015-09-11 22:11:49.555	\N	2015-09-11 22:11:49.555	\N	0	sante_mednonconv_hypnose	89	85	109
90	2015-09-11 22:11:49.561	\N	2015-09-11 22:11:49.561	\N	0	sante_mednonconv_naturopathie	90	85	110
91	2015-09-11 22:11:49.568	\N	2015-09-11 22:11:49.568	\N	0	sante_autres	91	75	111
92	2015-09-11 22:11:49.574	\N	2015-09-11 22:11:49.574	\N	0	sante_autres_pharmacie	92	91	112
93	2015-09-11 22:11:49.581	\N	2015-09-11 22:11:49.581	\N	0	sante_autres_hopitaux	93	91	113
94	2015-09-11 22:11:49.587	\N	2015-09-11 22:11:49.587	\N	0	sante_autres_centres	94	91	114
95	2015-09-11 22:11:49.593	\N	2015-09-11 22:11:49.593	\N	0	sante_autres_veterinaire	95	91	115
96	2015-09-11 22:11:49.599	\N	2015-09-11 22:11:49.599	\N	0	servicesprox	96	\N	116
97	2015-09-11 22:11:49.607	\N	2015-09-11 22:11:49.607	\N	0	servicesprox_crearepa	97	96	117
98	2015-09-11 22:11:49.615	\N	2015-09-11 22:11:49.615	\N	0	servicesprox_crearepa_cordoserru	98	97	118
99	2015-09-11 22:11:49.621	\N	2015-09-11 22:11:49.621	\N	0	servicesprox_crearepa_couture	99	97	119
100	2015-09-11 22:11:49.627	\N	2015-09-11 22:11:49.627	\N	0	servicesprox_crearepa_informatique	100	97	120
101	2015-09-11 22:11:49.632	\N	2015-09-11 22:11:49.632	\N	0	servicesprox_crearepa_smartphones	101	97	121
102	2015-09-11 22:11:49.638	\N	2015-09-11 22:11:49.638	\N	0	servicesprox_crearepa_plombier	102	97	122
103	2015-09-11 22:11:49.644	\N	2015-09-11 22:11:49.644	\N	0	servicesprox_crearepa_electricien	103	97	123
104	2015-09-11 22:11:49.652	\N	2015-09-11 22:11:49.652	\N	0	servicesprox_crearepa_jardinier	104	97	124
105	2015-09-11 22:11:49.662	\N	2015-09-11 22:11:49.662	\N	0	servicesprox_findroit	105	96	125
106	2015-09-11 22:11:49.667	\N	2015-09-11 22:11:49.667	\N	0	servicesprox_findroit_banque	106	105	126
107	2015-09-11 22:11:49.672	\N	2015-09-11 22:11:49.672	\N	0	servicesprox_findroit_mistercash	107	105	127
108	2015-09-11 22:11:49.677	\N	2015-09-11 22:11:49.677	\N	0	servicesprox_findroit_assurances	108	105	128
109	2015-09-11 22:11:49.682	\N	2015-09-11 22:11:49.682	\N	0	servicesprox_findroit_avocat	109	105	129
110	2015-09-11 22:11:49.687	\N	2015-09-11 22:11:49.687	\N	0	servicesprox_findroit_notaire	110	105	130
111	2015-09-11 22:11:49.692	\N	2015-09-11 22:11:49.692	\N	0	servicesprox_findroit_comptable	111	105	131
112	2015-09-11 22:11:49.698	\N	2015-09-11 22:11:49.698	\N	0	servicesprox_voiture	112	96	132
113	2015-09-11 22:11:49.703	\N	2015-09-11 22:11:49.703	\N	0	servicesprox_voiture_garage	113	112	133
114	2015-09-11 22:11:49.709	\N	2015-09-11 22:11:49.709	\N	0	servicesprox_voiture_station	114	112	134
115	2015-09-11 22:11:49.716	\N	2015-09-11 22:11:49.716	\N	0	servicesprox_voiture_carwash	115	112	135
116	2015-09-11 22:11:49.721	\N	2015-09-11 22:11:49.721	\N	0	servicesprox_voiture_parking	116	112	136
117	2015-09-11 22:11:49.728	\N	2015-09-11 22:11:49.728	\N	0	servicesprox_voiture_parebrise	117	112	137
118	2015-09-11 22:11:49.734	\N	2015-09-11 22:11:49.734	\N	0	servicesprox_voiture_pneus	118	112	138
119	2015-09-11 22:11:49.739	\N	2015-09-11 22:11:49.739	\N	0	servicesprox_voiture_controletech	119	112	139
120	2015-09-11 22:11:49.743	\N	2015-09-11 22:11:49.743	\N	0	servicesprox_autres	120	96	140
121	2015-09-11 22:11:49.748	\N	2015-09-11 22:11:49.748	\N	0	servicesprox_autres_imprimerie	121	120	141
122	2015-09-11 22:11:49.753	\N	2015-09-11 22:11:49.753	\N	0	servicesprox_autres_garderie	122	120	142
123	2015-09-11 22:11:49.757	\N	2015-09-11 22:11:49.757	\N	0	servicesprox_autres_immo	123	120	143
124	2015-09-11 22:11:49.762	\N	2015-09-11 22:11:49.762	\N	0	servicesprox_autres_teleinternet	124	120	144
125	2015-09-11 22:11:49.771	\N	2015-09-11 22:11:49.771	\N	0	servicesprox_autres_repassage	125	120	145
126	2015-09-11 22:11:49.778	\N	2015-09-11 22:11:49.778	\N	0	servicesprox_autres_etudesformations	126	120	146
127	2015-09-11 22:11:49.784	\N	2015-09-11 22:11:49.784	\N	0	detente	127	\N	147
128	2015-09-11 22:11:49.788	\N	2015-09-11 22:11:49.788	\N	0	detente_culture	128	127	148
129	2015-09-11 22:11:49.793	\N	2015-09-11 22:11:49.793	\N	0	detente_culture_theatre	129	128	149
130	2015-09-11 22:11:49.798	\N	2015-09-11 22:11:49.798	\N	0	detente_culture_opera	130	128	150
131	2015-09-11 22:11:49.802	\N	2015-09-11 22:11:49.802	\N	0	detente_culture_concert	131	128	151
132	2015-09-11 22:11:49.807	\N	2015-09-11 22:11:49.807	\N	0	detente_culture_cirque	132	128	152
133	2015-09-11 22:11:49.812	\N	2015-09-11 22:11:49.812	\N	0	detente_culture_musee	133	128	153
134	2015-09-11 22:11:49.816	\N	2015-09-11 22:11:49.816	\N	0	detente_culture_cinema	134	128	154
135	2015-09-11 22:11:49.822	\N	2015-09-11 22:11:49.822	\N	0	detente_culture_galerie	135	128	155
136	2015-09-11 22:11:49.828	\N	2015-09-11 22:11:49.828	\N	0	detente_culture_zooaqua	136	128	156
137	2015-09-11 22:11:49.833	\N	2015-09-11 22:11:49.833	\N	0	detente_soiree	137	127	157
138	2015-09-11 22:11:49.838	\N	2015-09-11 22:11:49.838	\N	0	detente_soiree_discotheque	138	137	158
139	2015-09-11 22:11:49.843	\N	2015-09-11 22:11:49.843	\N	0	detente_soiree_karaoke	139	137	159
140	2015-09-11 22:11:49.848	\N	2015-09-11 22:11:49.848	\N	0	detente_soiree_lounge	140	137	160
141	2015-09-11 22:11:49.853	\N	2015-09-11 22:11:49.853	\N	0	detente_soiree_bowling	141	137	161
142	2015-09-11 22:11:49.862	\N	2015-09-11 22:11:49.862	\N	0	detente_soiree_cafetheatre	142	137	162
143	2015-09-11 22:11:49.868	\N	2015-09-11 22:11:49.868	\N	0	detente_soiree_holebi	143	137	163
144	2015-09-11 22:11:49.875	\N	2015-09-11 22:11:49.875	\N	0	detente_sport	144	127	164
145	2015-09-11 22:11:49.879	\N	2015-09-11 22:11:49.879	\N	0	detente_sport_tennis	145	144	165
146	2015-09-11 22:11:49.885	\N	2015-09-11 22:11:49.885	\N	0	detente_sport_badmintonsquash	146	144	166
147	2015-09-11 22:11:49.889	\N	2015-09-11 22:11:49.889	\N	0	detente_sport_escalade	147	144	167
148	2015-09-11 22:11:49.894	\N	2015-09-11 22:11:49.894	\N	0	detente_sport_piscine	148	144	168
149	2015-09-11 22:11:49.898	\N	2015-09-11 22:11:49.898	\N	0	detente_sport_fitness	149	144	169
150	2015-09-11 22:11:49.902	\N	2015-09-11 22:11:49.902	\N	0	detente_sport_karting	150	144	170
151	2015-09-11 22:11:49.907	\N	2015-09-11 22:11:49.907	\N	0	detente_sport_danse	151	144	171
152	2015-09-11 22:11:49.911	\N	2015-09-11 22:11:49.911	\N	0	detente_sport_golf	152	144	172
153	2015-09-11 22:11:49.916	\N	2015-09-11 22:11:49.916	\N	0	detente_autres	153	127	173
154	2015-09-11 22:11:49.92	\N	2015-09-11 22:11:49.92	\N	0	detente_autres_casino	154	153	174
155	2015-09-11 22:11:49.924	\N	2015-09-11 22:11:49.924	\N	0	detente_autres_jeuxsociete	155	153	175
156	2015-09-11 22:11:49.929	\N	2015-09-11 22:11:49.929	\N	0	detente_autres_jeuxvideo	156	153	176
157	2015-09-11 22:11:49.933	\N	2015-09-11 22:11:49.933	\N	0	detente_autres_jeuxenfants	157	153	177
158	2015-09-11 22:11:49.937	\N	2015-09-11 22:11:49.937	\N	0	servicespubliques	158	\N	178
159	2015-09-11 22:11:49.94	\N	2015-09-11 22:11:49.94	\N	0	servicespubliques_pratiques	159	158	179
160	2015-09-11 22:11:49.944	\N	2015-09-11 22:11:49.944	\N	0	servicespubliques_pratiques_poste	160	159	180
161	2015-09-11 22:11:49.949	\N	2015-09-11 22:11:49.949	\N	0	servicespubliques_pratiques_police	161	159	181
162	2015-09-11 22:11:49.952	\N	2015-09-11 22:11:49.952	\N	0	servicespubliques_pratiques_pompiers	162	159	182
163	2015-09-11 22:11:49.958	\N	2015-09-11 22:11:49.958	\N	0	servicespubliques_pratiques_bibliotheque	163	159	183
164	2015-09-11 22:11:49.963	\N	2015-09-11 22:11:49.963	\N	0	servicespubliques_communal	164	158	184
165	2015-09-11 22:11:49.973	\N	2015-09-11 22:11:49.973	\N	0	servicespubliques_communal_population	165	164	185
166	2015-09-11 22:11:49.978	\N	2015-09-11 22:11:49.978	\N	0	servicespubliques_communal_energie	166	164	186
167	2015-09-11 22:11:49.983	\N	2015-09-11 22:11:49.983	\N	0	servicespubliques_communal_emploi	167	164	187
168	2015-09-11 22:11:49.987	\N	2015-09-11 22:11:49.987	\N	0	servicespubliques_communal_urbanisme	168	164	188
169	2015-09-11 22:11:49.991	\N	2015-09-11 22:11:49.991	\N	0	servicespubliques_communal_cpas	169	164	189
170	2015-09-11 22:11:49.995	\N	2015-09-11 22:11:49.995	\N	0	servicespubliques_communal_tourisme	170	164	190
171	2015-09-11 22:11:50	\N	2015-09-11 22:11:50	\N	0	servicespubliques_fedeintern	171	158	191
172	2015-09-11 22:11:50.004	\N	2015-09-11 22:11:50.004	\N	0	servicespubliques_fedeintern_economie	172	171	192
173	2015-09-11 22:11:50.009	\N	2015-09-11 22:11:50.009	\N	0	servicespubliques_fedeintern_emploi	173	171	193
174	2015-09-11 22:11:50.013	\N	2015-09-11 22:11:50.013	\N	0	servicespubliques_fedeintern_justice	174	171	194
175	2015-09-11 22:11:50.017	\N	2015-09-11 22:11:50.017	\N	0	servicespubliques_fedeintern_mobilite	175	171	195
176	2015-09-11 22:11:50.022	\N	2015-09-11 22:11:50.022	\N	0	servicespubliques_fedeintern_impots	176	171	196
177	2015-09-11 22:11:50.026	\N	2015-09-11 22:11:50.026	\N	0	servicespubliques_fedeintern_logement	177	171	197
178	2015-09-11 22:11:50.031	\N	2015-09-11 22:11:50.031	\N	0	servicespubliques_fedeintern_sante	178	171	198
179	2015-09-11 22:11:50.037	\N	2015-09-11 22:11:50.037	\N	0	servicespubliques_fedeintern_ambassade	179	171	199
\.


--
-- Name: businesscategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('businesscategory_id_seq', 179, true);


--
-- Data for Name: businessschedule; Type: TABLE DATA; Schema: public; Owner: play
--

COPY businessschedule (id, creationdate, creationuser, lastupdate, lastupdateuser, version, dayofweek, business_id) FROM stdin;
\.


--
-- Name: businessschedule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('businessschedule_id_seq', 1, false);


--
-- Data for Name: businessschedulepart; Type: TABLE DATA; Schema: public; Owner: play
--

COPY businessschedulepart (id, creationdate, creationuser, lastupdate, lastupdateuser, version, attendance, fromminutes, tominutes, businessschedule_id) FROM stdin;
\.


--
-- Name: businessschedulepart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('businessschedulepart_id_seq', 1, false);


--
-- Data for Name: categoryinterestlink; Type: TABLE DATA; Schema: public; Owner: play
--

COPY categoryinterestlink (id, creationdate, creationuser, lastupdate, lastupdateuser, version, priority, businesscategory_id, customerinterest_id) FROM stdin;
1	2015-09-11 22:11:50.042	\N	2015-09-11 22:11:50.042	\N	0	2	5	20
2	2015-09-11 22:11:50.044	\N	2015-09-11 22:11:50.044	\N	0	2	6	20
3	2015-09-11 22:11:50.046	\N	2015-09-11 22:11:50.046	\N	0	1	8	20
4	2015-09-11 22:11:50.048	\N	2015-09-11 22:11:50.048	\N	0	1	9	20
5	2015-09-11 22:11:50.05	\N	2015-09-11 22:11:50.05	\N	0	1	10	20
6	2015-09-11 22:11:50.051	\N	2015-09-11 22:11:50.051	\N	0	1	11	20
7	2015-09-11 22:11:50.053	\N	2015-09-11 22:11:50.053	\N	0	1	12	20
8	2015-09-11 22:11:50.054	\N	2015-09-11 22:11:50.054	\N	0	1	13	20
9	2015-09-11 22:11:50.056	\N	2015-09-11 22:11:50.056	\N	0	1	14	20
10	2015-09-11 22:11:50.057	\N	2015-09-11 22:11:50.057	\N	0	1	15	20
11	2015-09-11 22:11:50.058	\N	2015-09-11 22:11:50.058	\N	0	2	17	20
12	2015-09-11 22:11:50.06	\N	2015-09-11 22:11:50.06	\N	0	2	18	20
13	2015-09-11 22:11:50.061	\N	2015-09-11 22:11:50.061	\N	0	2	19	20
14	2015-09-11 22:11:50.062	\N	2015-09-11 22:11:50.062	\N	0	2	20	20
15	2015-09-11 22:11:50.064	\N	2015-09-11 22:11:50.064	\N	0	2	21	20
16	2015-09-11 22:11:50.065	\N	2015-09-11 22:11:50.065	\N	0	1	23	20
17	2015-09-11 22:11:50.066	\N	2015-09-11 22:11:50.066	\N	0	1	24	20
18	2015-09-11 22:11:50.068	\N	2015-09-11 22:11:50.068	\N	0	1	25	20
19	2015-09-11 22:11:50.069	\N	2015-09-11 22:11:50.069	\N	0	1	26	20
20	2015-09-11 22:11:50.071	\N	2015-09-11 22:11:50.071	\N	0	1	27	20
21	2015-09-11 22:11:50.072	\N	2015-09-11 22:11:50.072	\N	0	1	28	20
22	2015-09-11 22:11:50.075	\N	2015-09-11 22:11:50.075	\N	0	1	32	20
23	2015-09-11 22:11:50.076	\N	2015-09-11 22:11:50.076	\N	0	1	33	20
24	2015-09-11 22:11:50.078	\N	2015-09-11 22:11:50.078	\N	0	1	34	20
25	2015-09-11 22:11:50.08	\N	2015-09-11 22:11:50.08	\N	0	1	35	20
26	2015-09-11 22:11:50.081	\N	2015-09-11 22:11:50.081	\N	0	1	36	20
27	2015-09-11 22:11:50.083	\N	2015-09-11 22:11:50.083	\N	0	1	37	20
28	2015-09-11 22:11:50.084	\N	2015-09-11 22:11:50.084	\N	0	1	38	20
29	2015-09-11 22:11:50.085	\N	2015-09-11 22:11:50.085	\N	0	2	129	20
30	2015-09-11 22:11:50.087	\N	2015-09-11 22:11:50.087	\N	0	2	130	20
31	2015-09-11 22:11:50.088	\N	2015-09-11 22:11:50.089	\N	0	2	131	20
32	2015-09-11 22:11:50.09	\N	2015-09-11 22:11:50.09	\N	0	2	133	20
33	2015-09-11 22:11:50.091	\N	2015-09-11 22:11:50.091	\N	0	2	139	20
34	2015-09-11 22:11:50.093	\N	2015-09-11 22:11:50.093	\N	0	2	140	20
35	2015-09-11 22:11:50.094	\N	2015-09-11 22:11:50.094	\N	0	2	141	20
36	2015-09-11 22:11:50.095	\N	2015-09-11 22:11:50.095	\N	0	2	142	20
37	2015-09-11 22:11:50.097	\N	2015-09-11 22:11:50.097	\N	0	2	143	20
38	2015-09-11 22:11:50.098	\N	2015-09-11 22:11:50.098	\N	0	2	154	20
\.


--
-- Name: categoryinterestlink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('categoryinterestlink_id_seq', 38, true);


--
-- Data for Name: customerinterest; Type: TABLE DATA; Schema: public; Owner: play
--

COPY customerinterest (id, creationdate, creationuser, lastupdate, lastupdateuser, version, iconname, name, orderindex, translationname_id) FROM stdin;
1	2015-09-11 22:11:48.103	\N	2015-09-11 22:11:48.103	\N	0	eat.png	eat	1	1
2	2015-09-11 22:11:48.157	\N	2015-09-11 22:11:48.157	\N	0	drink.png	drink	2	2
3	2015-09-11 22:11:48.174	\N	2015-09-11 22:11:48.174	\N	0	going_out.png	going_out	3	3
4	2015-09-11 22:11:48.188	\N	2015-09-11 22:11:48.189	\N	0	culture.png	culture	4	4
5	2015-09-11 22:11:48.203	\N	2015-09-11 22:11:48.203	\N	0	supermarket.png	supermarket	5	5
6	2015-09-11 22:11:48.217	\N	2015-09-11 22:11:48.217	\N	0	shopping.png	shopping	6	6
7	2015-09-11 22:11:48.234	\N	2015-09-11 22:11:48.234	\N	0	clothe.png	clothe	7	7
8	2015-09-11 22:11:48.247	\N	2015-09-11 22:11:48.247	\N	0	decor.png	decor	8	8
9	2015-09-11 22:11:48.259	\N	2015-09-11 22:11:48.259	\N	0	welness.png	welness	9	9
10	2015-09-11 22:11:48.271	\N	2015-09-11 22:11:48.271	\N	0	sport.png	sport	10	10
11	2015-09-11 22:11:48.282	\N	2015-09-11 22:11:48.283	\N	0	pets.png	pets	11	11
12	2015-09-11 22:11:48.295	\N	2015-09-11 22:11:48.295	\N	0	travel.png	travel	12	12
13	2015-09-11 22:11:48.307	\N	2015-09-11 22:11:48.307	\N	0	sleep.png	sleep	13	13
14	2015-09-11 22:11:48.319	\N	2015-09-11 22:11:48.319	\N	0	baby.png	baby	14	14
15	2015-09-11 22:11:48.331	\N	2015-09-11 22:11:48.331	\N	0	doityourself.png	doityourself	15	15
16	2015-09-11 22:11:48.343	\N	2015-09-11 22:11:48.343	\N	0	read.png	read	16	16
17	2015-09-11 22:11:48.359	\N	2015-09-11 22:11:48.36	\N	0	garden.png	garden	17	17
18	2015-09-11 22:11:48.372	\N	2015-09-11 22:11:48.372	\N	0	music.png	music	18	18
19	2015-09-11 22:11:48.383	\N	2015-09-11 22:11:48.383	\N	0	technology.png	technology	19	19
20	2015-09-11 22:11:48.395	\N	2015-09-11 22:11:48.395	\N	0	play.png	play	20	20
\.


--
-- Name: customerinterest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('customerinterest_id_seq', 20, true);


--
-- Data for Name: facebookcredential; Type: TABLE DATA; Schema: public; Owner: play
--

COPY facebookcredential (id, creationdate, creationuser, lastupdate, lastupdateuser, version, userid, account_id) FROM stdin;
1	2015-09-15 00:10:03.791	\N	2015-09-15 00:10:03.791	\N	0	10206000417265654	14
\.


--
-- Name: facebookcredential_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('facebookcredential_id_seq', 1, true);


--
-- Data for Name: followlink; Type: TABLE DATA; Schema: public; Owner: play
--

COPY followlink (id, creationdate, creationuser, lastupdate, lastupdateuser, version, followedfrom, followingnotification, notification, account_id, business_id) FROM stdin;
6	2015-09-12 22:32:57.056	\N	2015-09-12 22:32:57.056	\N	0	2015-09-12 22:32:57.056	t	\N	1	1
7	2015-09-13 13:25:12.083	\N	2015-09-13 13:25:12.083	\N	0	2015-09-13 13:25:12.082	t	\N	1	4
8	2015-09-14 13:38:56.509	\N	2015-09-14 13:38:56.509	\N	0	2015-09-14 13:38:56.509	t	\N	1	2
9	2015-09-15 01:10:49.796	\N	2015-09-15 01:10:49.796	\N	0	2015-09-15 01:10:49.796	t	\N	14	4
\.


--
-- Name: followlink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('followlink_id_seq', 9, true);


--
-- Data for Name: logincredential; Type: TABLE DATA; Schema: public; Owner: play
--

COPY logincredential (id, creationdate, creationuser, lastupdate, lastupdateuser, version, keepsessionopen, password, account_id) FROM stdin;
1	\N	\N	\N	\N	0	f	ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R	3
2	\N	\N	\N	\N	0	f	ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R	2
3	\N	\N	\N	\N	0	f	ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R	1
4	2015-09-11 22:13:33.581	\N	2015-09-11 22:13:33.581	\N	0	f	UQx45QLY7Rsjzj/Jk/zGEx9IWHETVyGvVfdJaYs36wp350/7dxUzphxVRtNnBN5P	4
5	2015-09-11 22:13:43.108	\N	2015-09-11 22:13:43.108	\N	0	f	ji6QkWTFMDJYdj3VxaUgIk3g4wt47NNMm/T/0ppPfkX0w0mmhYSdGnjk+HGgYCBh	5
6	2015-09-11 22:13:48.159	\N	2015-09-11 22:13:48.159	\N	0	f	JQgxGLv7wKzcoiFy1E4pFvWOqchTXnW9sepNmo1KdYA05Re02mbtqPDGHOeM8MAs	6
7	2015-09-11 22:13:52.727	\N	2015-09-11 22:13:52.727	\N	0	f	HXAGYBFOGLY6Zzymo8s+3ph6Er1x9NkhJsfPUjg+ftrjSa6WCQig7WTmF825LMTA	7
8	2015-09-11 22:13:55.579	\N	2015-09-11 22:13:55.579	\N	0	f	oRUUUlHBC/4XZwOVho2JxJtrv7NmFqy1ZrH145fbfPp5sIFocxTGeGj893okiRid	8
9	2015-09-11 22:14:00.804	\N	2015-09-11 22:14:00.804	\N	0	f	1HhngrWUUHgPLE2gYrN1fcg2dT53KjeGml2wFY7aZOGcEXqVqLAN5RIobadJHMkT	9
10	2015-09-11 22:14:04.766	\N	2015-09-11 22:14:04.766	\N	0	f	vOIZOFuDj2rqrxZCyIXkCLxbfRQe8o64ozjiJ5teRwHez1TJoagJsjSa6VE9flRd	10
11	2015-09-11 22:14:12.069	\N	2015-09-11 22:14:12.069	\N	0	f	ixFCfzL27ce1cnhaVtqxQFkTA6ZdaesB8UIpyI6lo1knwhDCr97rjpIDE9u/e8F2	11
12	2015-09-11 22:14:17.983	\N	2015-09-11 22:14:17.983	\N	0	f	u1NDhRyf/cay36hH1Hlhwt195E094TpyLMvFmPmfbnhxVYlkI9P2VEQBuALLGu+u	12
13	2015-09-14 18:44:57.16	\N	2015-09-14 18:44:57.16	\N	0	f	RDOg2BgzQdjCWe895SDyc0ihzpJ+VsTf9AIZ4Fv6o/kcbpmBoL2k7TZpBkN2lwAM	13
14	2015-09-15 00:13:34.172	\N	2015-09-15 00:13:34.172	\N	0	f	tfbMOqCWfxVjLAr3BjRrgqluJ8qH7GkClNBXlMJDXemAb5Ou9QwfHYMQEiC8DYKj	15
\.


--
-- Name: logincredential_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('logincredential_id_seq', 14, true);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: play
--

COPY session (id, creationdate, creationuser, lastupdate, lastupdateuser, version, connectiondate, source, account_id) FROM stdin;
1	2015-09-12 11:38:07.91	\N	2015-09-12 11:38:07.91	\N	0	2015-09-12 11:38:07.909	ANDROID	1
2	2015-09-12 12:41:36.674	\N	2015-09-12 12:41:36.674	\N	0	2015-09-12 12:41:36.674	ANDROID	1
3	2015-09-12 12:43:45.059	\N	2015-09-12 12:43:45.059	\N	0	2015-09-12 12:43:45.059	ANDROID	1
4	2015-09-12 12:57:04.101	\N	2015-09-12 12:57:04.101	\N	0	2015-09-12 12:57:04.101	ANDROID	1
5	2015-09-12 13:52:41.715	\N	2015-09-12 13:52:41.715	\N	0	2015-09-12 13:52:41.715	ANDROID	1
6	2015-09-14 13:38:56.284	\N	2015-09-14 13:38:56.284	\N	0	2015-09-14 13:38:56.283	ANDROID	1
7	2015-09-14 18:44:57.251	\N	2015-09-14 18:44:57.251	\N	0	2015-09-14 18:44:57.251	ANDROID	13
8	2015-09-14 19:06:01.407	\N	2015-09-14 19:06:01.407	\N	0	2015-09-14 19:06:01.407	ANDROID	1
9	2015-09-14 21:13:19.002	\N	2015-09-14 21:13:19.002	\N	0	2015-09-14 21:13:19.001	ANDROID	1
10	2015-09-14 21:27:17.068	\N	2015-09-14 21:27:17.068	\N	0	2015-09-14 21:27:17.068	ANDROID	5
11	2015-09-15 00:10:03.797	\N	2015-09-15 00:10:03.797	\N	0	2015-09-15 00:10:03.796	ANDROID	14
12	2015-09-15 00:13:34.264	\N	2015-09-15 00:13:34.264	\N	0	2015-09-15 00:13:34.264	ANDROID	15
13	2015-09-15 00:13:53.326	\N	2015-09-15 00:13:53.326	\N	0	2015-09-15 00:13:53.326	ANDROID	14
14	2015-09-15 00:51:13.599	\N	2015-09-15 00:51:13.599	\N	0	2015-09-15 00:51:13.599	ANDROID	14
15	2015-09-15 01:01:47.981	\N	2015-09-15 01:01:47.982	\N	0	2015-09-15 01:01:47.978	ANDROID	14
16	2015-09-15 01:04:02.74	\N	2015-09-15 01:04:02.74	\N	0	2015-09-15 01:04:02.74	ANDROID	14
17	2015-09-15 01:10:42.858	\N	2015-09-15 01:10:42.858	\N	0	2015-09-15 01:10:42.858	ANDROID	14
18	2015-09-15 01:18:26.591	\N	2015-09-15 01:18:26.591	\N	0	2015-09-15 01:18:26.591	ANDROID	5
\.


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('session_id_seq', 18, true);


--
-- Data for Name: storedfile; Type: TABLE DATA; Schema: public; Owner: play
--

COPY storedfile (id, creationdate, creationuser, lastupdate, lastupdateuser, version, comment, fileorder, isimage, originalname, size, storedname, storednameoriginalsize, account_id, businessgallerypicture_id, publication_id) FROM stdin;
1	2015-09-11 22:13:36.639	\N	2015-09-11 22:13:36.639	\N	0	\N	0	f	temp-file-name5191489369336913393.tmp	0	2kDwIFlkeRvyh7nqRms949jux9TkidnhpOaGdWzO7AJq0vALuhaj2XnO3N5fUrNf3g6kMu8lEsBW0Z8oB0U9EPMRdJbN22Mkf79H	BU3F0w6JLCtHp8sURjOByEUr65A7N5VUy4VpHy9lDjHlOYfY5ghdZWT7FZBXsIjXXbmYwntgzUUVU8CWJXdil4qGV0ha7RDi6lqT	4	\N	\N
2	2015-09-11 22:13:40.42	\N	2015-09-11 22:13:40.42	\N	0	\N	0	f	temp-file-name1991344386284417296.tmp	0	v2UWd4hDy7Mt0slLkaMv8R6Ztk3Iv8qbiOuaPRvLoaRpdmTgK97752CU8QixpipqHwhshK2NTWhnqw8nM4UEqU1c5CJOrStvY7o3	yDwJyhV5O9F7ibtEPWaVEef7EY5w5leGBgYH8Kx5MbVtH0J5Bn5noawqmjgJh0rOFdE6Mt6hHss2lNEFVB6f4aivmzl9eo8Ryhdm	4	\N	\N
3	2015-09-11 22:13:45.485	\N	2015-09-11 22:13:45.485	\N	0	\N	0	f	temp-file-name2017524603972938196.tmp	0	0On7Z4OteV50afguLT4XgRYNJgTV7bx8MDNr8BaWm4RvRZFvcrC4coIw5ux0i8NuEQ4QThDyxJp7zwbahUmjY15E7SSX7YrUXItF	5RrdlKyekISgAGAeITSe8ZtsMu64wy5WdYfBL4JHSs9m4D44g72X6GfRntWu436UrLXrWFFW8CP75uXGwHNiIRnblfsgSvTlX3Th	5	\N	\N
4	2015-09-11 22:13:47.601	\N	2015-09-11 22:13:47.601	\N	0	\N	0	f	temp-file-name4894254941245246157.tmp	0	MHWuNFQelplivxzrMxcwJJhFo2T94b7R9lqIAs5hfuuttEYYDsnnY6Od6BvWl5hrgxV2zYIWdispHjTqWtMBuscwGhCZ8ppl0iEt	tN9waDwsTypVhnxAzSYx8OtPHhCOZbiw2WXWaExQ2Q8jL5dMmX3P4HzovQ9Z5b8WYrabPhMKDEkFBIVS2JdxUuQ20FEnKThnyPPo	5	\N	\N
5	2015-09-11 22:13:50.044	\N	2015-09-11 22:13:50.044	\N	0	\N	0	f	temp-file-name9038587457337828241.tmp	0	PmLaar6y3DaTMgTtpSRSIPqZg9kJIrlDeluaBU6jbLfnUmgoxg1GSXYDCyrElMoFDFY8yTcAb9ziedfQDh2GPz69s5WcY6j8fJYh	xrMrTXaGlfUzJRpAcDDHV47aUgDXAS8CyLUnR35fKSuaXeiw6HPikzD13RxZIN1xXMivXTvrjGCPljdfUNDiRXAy0hWyXcBgYGRT	6	\N	\N
6	2015-09-11 22:13:52.081	\N	2015-09-11 22:13:52.081	\N	0	\N	0	f	temp-file-name4641008502072025272.tmp	0	kJJYDiZPW6MgYYD0aXJhDSZavYlCRh1Lkh6grsCVBy49ZxsSXmktGw6ha6P6zgpK44dHNXd7gGGNlxlpFLVWlcJlJZhqYtPKLGSp	mLzizDELSmbew7a4XHgpDOBKelEtSAg9ayCb5i5Vt2rjaI9eVSo0GUg1qDSd0nSfIOlboJhKU0Z6wXbfz0SZ8e3oWvjuqnUZL8CS	6	\N	\N
7	2015-09-11 22:13:53.822	\N	2015-09-11 22:13:53.822	\N	0	\N	0	f	temp-file-name8387302289356314796.tmp	0	Ytnm8isUSOwUNSyXBqETqq3ydmPnJd5P9nht4kenLdx7yYlSyVUeD0Nudsl4uGeMti0AY198s5uXmtmccZj2JX1XuqXkcjgexzCH	4WBqRdeSEzF6OPn7znLskysdhe8VkNbWEpU6dQeb0wtkw1s6ibzdrN2wIWEk3YPNdMPOHvd3hb45xw4cQH3xajsKfwL1fV0Zi9RN	7	\N	\N
8	2015-09-11 22:13:55.037	\N	2015-09-11 22:13:55.037	\N	0	\N	0	f	temp-file-name5839956643927996407.tmp	0	gumd7Ak7iRNaXvfsXPjjAFCHRGp6fyRX0e60YlLi1qBZbR8cwMyuDVdy9Ol24ot98bE86YhPsfVB3xjK50FV9y0iruc2FEKi9qRM	TtssGnWyL6eeGIYZRyKcY9AavLAnLqW8wP0FE74pnah0qo6HIqPfquHTcwzn6bseraZtTCxVLJDT9DUqWxv1dEYw3eahfb1TJqDB	7	\N	\N
9	2015-09-11 22:13:57.079	\N	2015-09-11 22:13:57.079	\N	0	\N	0	f	temp-file-name2154818474403770238.tmp	0	mthqplpTZ0ul6PnXv5wr9G57IYjree7rheB5ry3690s2w2YYMv8RTaIXdX8W1IBALPMu0H5RrSwzkJGE07kHrU1YAnJ09MJO7Kn2	1eWpIQ75ERxafVmkL3Fctvc8y6wyFxckSv9FPhoLhrXHUljaVZTqxi8ISfV4EwvVRsK81whVF2IQ2FipZtgu0N7HPmztSSpKRNiJ	8	\N	\N
10	2015-09-11 22:13:59.786	\N	2015-09-11 22:13:59.786	\N	0	\N	0	f	temp-file-name8207927239621226990.tmp	0	4QOk4GyFvaOFuEO31FN4W7h1lpJRMenqXmjTfHsSdNqJ0itSY6LiolAvPO7ub4vUm6DpvaFSYRvj16HRSUWpJ2br2PoQAa7Ae5dE	cka68QmpL4ITSZydrRkQBsxHcGApxgJYJE6ysTtaTS4bLtdmjdBkJefiE34OAYhTh79GskhyNQyERfl1RjjJvw0kGBN2kSvMuS8f	8	\N	\N
11	2015-09-11 22:14:02.584	\N	2015-09-11 22:14:02.584	\N	0	\N	0	f	temp-file-name7924889960813802843.tmp	0	bcGhZXkHI5Xvchu2pF9xmiwqljhGoatxdU06m44ePsg2IUav5Hka9fMhKDlTzSP4K4CECGta8Q58u21EynFTTvnbhVyJpcY8yZMs	pVCSSopQIO0NxeYBnwbDwL0gSwytdHw8ShJSyKdiajF02hHjSCBrvotFa1Rji3ccXYrr93DGNwFFzJvsr2E6K9XrjgDw1K8lr0bN	9	\N	\N
12	2015-09-11 22:14:04.33	\N	2015-09-11 22:14:04.33	\N	0	\N	0	f	temp-file-name6039761998456383607.tmp	0	QrGpUitf400uk0msZbmS3CJTzzcDmtmW1ArPp9LzdQqVYaQEfRUOJWGhk65UhJ6Qt3UXUfl2pCOSLypSxPAuJW7FmPewfIS5oUGK	ZhgudHnJ4r5yH8PhRJoWaAagMLhtDUAszmrvLH72rA0Vpdbv1jG31MiRYMX2ueD3cz20CNXdk9X3TkfreR4gboOieBy3NDXWuOKk	9	\N	\N
13	2015-09-11 22:14:07.161	\N	2015-09-11 22:14:07.161	\N	0	\N	0	f	temp-file-name7063069482402977222.tmp	0	elOxbJBA0a4g9GFzqRu31gONoqHSjgOlsLBytRu8C51tm4CKfE6YolBSqVWOqNj5DbSfQX0WhWSz2hJNP28bz8cf5YtD0p4OfjV3	1GsGhPTmzQkyobBA0zQnULEk7CGDDy0z8p63yk6UbGx4Aawx858AXzCVQS38kotTqE1QRV3DCsYPsaT5j2gjjMZuM0s02fUpHe7D	10	\N	\N
14	2015-09-11 22:14:11.453	\N	2015-09-11 22:14:11.453	\N	0	\N	0	f	temp-file-name2343643303746913705.tmp	0	oGHuwGoXeOtObSqDDNVNDuoUshb6fP1rv8iBgBUszCNTRm1CFej7f3U9LRblCL3b3H7078nD34SNTLfapqXi8bi2oCslfATEgGI7	XWqI5ODaqIfap5g11ie3jxdR7OLBLzK9KKam4bHAvnvR983UFzsDcQ8f0eEeRkIAFMu1hjEOq5NNToWYM2N6sSfdbVHbv5X0yf9W	10	\N	\N
15	2015-09-11 22:14:14.91	\N	2015-09-11 22:14:14.91	\N	0	\N	0	f	temp-file-name4786762010544547531.tmp	0	1wsKutsOYgdSkLPTIrWhF49w279rac17tg4jhk8MxL8Uf7BWqv6p65UrDHUvtatpoNOpxZEyteWVS03expgAbI4DaZmsxAZMxGgQ	GGrRIfiydmVM5oUaVCK1tK7YL2zwVPesatmlbpmUZiT06zNEI7affT5NTXzM1cNXPjU7pkWkABqufFvBkriKIeSAZ48RXgyV1lgH	11	\N	\N
16	2015-09-11 22:14:17.35	\N	2015-09-11 22:14:17.35	\N	0	\N	0	f	temp-file-name7846624276632248955.tmp	0	D7CwOwhthoBUwoznvEQ4kZMH2b6xXm0GPoeCmy2sIsHseGdYBo8KxWrvHagxT5atb497hbMtGknLlxBMT7CC47yhOOMBSZExrSHR	dTHgo4t5ubvjobxKGHAtBdLyaFKwwG8aKyZRwNHT4hhcMEUxUCwGT7WqnbP54SFXIEaCPQRD6uT0r1r472Nv8CjIJbmDzoIJ0VsW	11	\N	\N
17	2015-09-11 22:14:19.121	\N	2015-09-11 22:14:19.121	\N	0	\N	0	f	temp-file-name1436946671535701716.tmp	0	BqU0x9e3OF6Wx5igV15Z9Kwy28KDPA259E0IVv5u95MN1djD8KoaJNBeZfJeAoC2U2PWqmZrk0f75QUEhwJgtmRJ1jiZq1Harj3p	tRnPtlxo7SZo2KvTMAACNI6jbwNMp0QRo1dP1c3jIlpRzC8K5o6MOgubibkL1xNZfOCckQdReDx67g4myFIhXRANwZBqwxERcVny	12	\N	\N
18	2015-09-11 22:14:20.339	\N	2015-09-11 22:14:20.339	\N	0	\N	0	f	temp-file-name3742341643345164558.tmp	0	4nM0wy3v7dvscPlZKpICveBEUPDy72AhNh9qN6cpjvzP6LQQ8cxNFAjfAphG3Ldsk6LBzUkvGdMjbXFSfvH0MzYT1Uv2tfDomKDl	Y2VxvXQJ5E43HpYmqaPsXUCxeC69TSPhgyWrQihmGMLBqqscbVnkurbXpmjblUdXvaubIum7IZvehQFVjNOKR2ZaPxe9Uz4IM4VE	12	\N	\N
19	2015-09-11 22:14:21.679	\N	2015-09-11 22:14:22.236	\N	1	\N	0	f	temp-file-name1344224443212082918.tmp	0	OKNob1c2oV5sJmqD21IT4VpBnX94nsQ9xx8z6wUW2iIsT3CyQc7o6kuFoLSBxs5qOVXcvahrSjrNcTqLnuc9xGNTteEPZlSts8ot	zPwlKqf2j99EDCtXyPV6DfCHHZmsK1YeOtfKDYzLcVfaPUzyWoQNQ10UaMFQJ5oSMqS8ZVwV081tLlSepO2PrCuf4XktsNNyeeu1	4	\N	1
20	2015-09-11 22:14:22.735	\N	2015-09-11 22:14:23.24	\N	1	\N	0	f	temp-file-name5273684346936836007.tmp	0	Ru90d4QP11KZQ2DMIeWka8gqRMOhnPlwV7heQ73iZFEFsGEt4IoaaE1ab9wWS9gJoPKYrUnf8m44GKmVJrndTjPhZllEdWZoUsOd	ssE1vAjsrUxEjWSyU6C9yIkb26l1J9CGz7pbqzGpYeiAbSIHomB3mV4xTKUghMj3NjWflsBSEUxUDuiODdUcfkryFUvSadBOaxRU	4	\N	2
21	2015-09-11 22:14:23.721	\N	2015-09-11 22:14:24.087	\N	1	\N	0	f	temp-file-name4550435895589761038.tmp	0	QT0dSoLQ3PhFpyPlDLx0DEULODCH7AV55mEq81oG3gNrC9awf3siCnBt468ED1I1PRjWiG8MLuJUOarqdsZf4QqJHSe5iZN3uKlZ	ygTVB4VRUatvT0b6TPUFlrf85GKVqjVw1V5L6oPM4MNrRL6N3Vi9XZ7d5geKVa38sG9fTybFNTHdqgTyUl7vDKlgR2nKZTtF6kqo	4	\N	3
22	2015-09-11 22:14:24.553	\N	2015-09-11 22:14:24.983	\N	1	\N	0	f	temp-file-name3883128001973502814.tmp	0	rYokyyePnK3S2j2pVLfzV3pZdVCj6AryDDCoC2OxA99JurmwYWg69M6g6r3neJD7FvTzEud2lhGMjHG13leHVHMAMQJ0pf7iF0FQ	CdngmqK8XpASXvJKvspB3emuDcG3Asr1RIR7wFs4uzF7qk9bUDe5xXOflqo0ATzJOIxDNrMNcyb17gQ6TZCRwfb3YazFcNLN84BL	4	\N	4
23	2015-09-11 22:14:25.488	\N	2015-09-11 22:14:25.991	\N	1	\N	0	f	temp-file-name5323915706798246059.tmp	0	q4P0vBPLdyT7LnnlPbFvPz5mUTlQ38eQoIZjccebX7J6KLJJGbh7l1J4w0oXopcWjJJvTYCX1321OXVOGCxQeDV6Y0sDkrt2A3ga	M6z0065JIK5rjZ4EjOsjHO27rodRJcrvOWClTGqpv8I9P6GZnTauJSdwrF6Q172vNtcsWksJvCmfUk6Ljh0oWzFuScneLishVXM2	4	\N	5
24	2015-09-11 22:14:27.004	\N	2015-09-11 22:14:27.417	\N	1	\N	0	f	temp-file-name5177214003480346058.tmp	0	pxhQYU9cyrM70lMopybJwkq2iiD5OFAHvIUoOVYYMl9gKRp5ba6MBl2nwssMKreoIOujbL92rIkvVLRiiAUbPz7HNUJzi4MI7hFM	tZHInUMdmqeMQp5JftTvLDkpQWfvhHsGa12TZQSD7MZtWcerSO3ad1TZissl3JnRQ15MYOiR5AU4OJlYi2Yd6WJBIjPy33US6vme	5	\N	9
25	2015-09-11 22:14:28.235	\N	2015-09-11 22:14:28.594	\N	1	\N	0	f	temp-file-name3589809302254920359.tmp	0	LK0F9538oYFRhFsilaKjAUKzxR36IYcAikVbv98I40NZqHRL5BowE5wIl6LkiAGoP9P3CVX2f07qdKEfLimYe00R6AfMH3Y3uPFl	qFzSfOV8b3ATcWfcurSWaDdvH6QHDCkTuqMYUzI6wxOuBBi3I8OlBuAg71TlYXNVMIUGynLXZCtRdlXRkgEPgmFtw054rsp5IlSq	5	\N	11
26	2015-09-11 22:14:28.966	\N	2015-09-11 22:14:29.372	\N	1	\N	0	f	temp-file-name8645009165491221869.tmp	0	8cfoyg5W91ELKusBrmKLYVBtG2hXYKYDlA0AfHlPGgA11OJ0Likfe6PAPC7Tn1DgQtmInISTyrYw8Y4Asq3f1XN9515n8kRlUXbg	khucBhpExDu4xEfxQ7FYqFOf0IMkQr1XUOEkHfeY0bMaTwQedSmBO3IoEs5CeU10y8QhvoiZoTohvJ2cEkRk3wVm7K14vxPFfrQx	5	\N	12
27	2015-09-11 22:14:29.787	\N	2015-09-11 22:14:30.199	\N	1	\N	0	f	temp-file-name5358338678397737803.tmp	0	x2IAVgqsRf4VzZ6VbwwypXwD79H1Kd3LDjNWYALpYalckAxSOJLNEE7K3bd8fjK7SDtn3Qy50IWOboCsWK4X2t2Ma77TFnNSkwxk	jtfCDAdYFJ2IhuLLWVKUSPHfrreRtHJ80lPHL8fTDl06MN431i3UdqbzCIRAUA48mcK9mZjYeRciHhKRxazWMdkbr1nmLM1eolaF	5	\N	13
28	2015-09-11 22:14:30.616	\N	2015-09-11 22:14:31.053	\N	1	\N	0	f	temp-file-name5761314698300415913.tmp	0	PFvaT5lA6GJ7I9nItOmiuy65PFy58dr8kuqGyh8YITUcYT6M7DCbkk5UwXedw8jteKHzx2T7s9kRUSiHmy4EFOJkZ8w6849slkIj	WMqpDg00eq3pRJco5Kxrr8gcHb2KfNbOVwQmpZfotDNba41UZlQv6qtC7VdXlWWmI3yEVGHkwMP3gNMGCAXnr0QBt4RJihNJeMpK	5	\N	14
29	2015-09-11 22:14:31.471	\N	2015-09-11 22:14:31.985	\N	1	\N	0	f	temp-file-name2752103032921276364.tmp	0	hBoeM8uJ1TACyTctVSrXAGRYSgA9NObr3psl3zNwtb4UsHp2FTjelbB1x3Ev0Pb2yFI5l1WZQWgviE0vRQ0orqLjH4VTRcrPcTfQ	unja1IkJLUAXtuYVYrqXWSmSBYh1CQIwBBkcgOj6D0l3GMzfHnkpCWx6PbFktwcKNbrKyw6JB670JtOxUYydbE2tQnDepWDxByAf	5	\N	15
30	2015-09-11 22:14:32.441	\N	2015-09-11 22:14:32.833	\N	1	\N	0	f	temp-file-name459239287750811139.tmp	0	OWMIy4o1UcXgJYQWnWO3PhnEII0vzrG0CYngYg9oTOg2Iwn81Emxb3Gx2l2vPoE0OvQcfGFMH74sUATCM9lHRvphlZ1tMsRnk3E3	8bPLvELKJJQ3qRJm1gUmNs5IPmisqmOxm3ZSQV2L2UT4sQxGmGh4IboVWxsKEu7XnxCWxJVLH9l6IgHCIcd03E8sfwChcjKTZmVY	5	\N	16
31	2015-09-11 22:14:33.257	\N	2015-09-11 22:14:33.692	\N	1	\N	0	f	temp-file-name5458082266269912259.tmp	0	QD6F4cxYOrcOplLZWNPpLTM9mZa7erGF5WOJaPTmyYckE0jLjWR33r9EihOcNbplXzfuv7uejQjn5yuxnlypIDXOe39fmbhF76F7	UaFAS1Ifykt2fjjeG8Z7Q3JhF9tpvLhqp4w0sRK9j00DxKMHx3o5vAAhE1Ng8Zt0OBpM4EfJr11necgPTKGx74mZGVWljgJZX9y0	5	\N	17
32	2015-09-11 22:14:34.507	\N	2015-09-11 22:14:34.847	\N	1	\N	0	f	temp-file-name5291105231368623566.tmp	0	pyeXK35nzbZv5HkRwrcECqC5NAx01Y3tHmVOpOD2ZqAcZiLl3PJlFpS8PBya1sI1v8FA6JEBzmLX43WXtOK4SAbxzNnoa1VGPJuH	bC4hu4Hmu5No10n2JwX5A1Omww4UZapiVmG3pyliGmcz87NssINEmVE7mOZD92rk1hWWeF2FhaLBKMixcbcVGt1KZ3DNuaRlDOtj	6	\N	19
33	2015-09-11 22:14:35.141	\N	2015-09-11 22:14:35.543	\N	1	\N	0	f	temp-file-name4790763503893763239.tmp	0	ae7XrTY8LImXhP4lXIUjzlEkpMI6U5UeURzkxaBBDP6JUBUFgPKUGpW1Kr8Mq45n0fg5FUdtvLZA3itNM30801kF6HdK8G5YOQjz	Y08cwus7Ta4A7fGijua3cxIjDnBpULLTbaxbvEeM3FiWDdnmHzEsXnmhMOQxW1jmE2RayL8RzWfGanPIPephhISCXPPvsD8Kzdcx	6	\N	20
34	2015-09-11 22:14:35.933	\N	2015-09-11 22:14:36.23	\N	1	\N	0	f	temp-file-name5786695103367667356.tmp	0	lACtdZSzK78X8uraVjmPPDQRrmhPJZdQEhKb3oTN5uFzrA0EpVikRsqn2hiinowXtux7WKDs97yxeL6MbEGNPgi4sWBN9XwzLHKI	2qqcgkM89gikC01HDYBZKoRZnuN1S5W9Vc85GwcxXZcmALQxws5bwr3SVkBohCw8behsxVY40u4qfQWrhTmwRNJOcsXsfElwiISi	6	\N	21
35	2015-09-11 22:14:36.664	\N	2015-09-11 22:14:37.201	\N	1	\N	0	f	temp-file-name6719288480456539322.tmp	0	HeKOgez16xINJvEhBwsBAxAVEexJ0qxd8Vc5slbwEGbKvWU8GnQWJlcwyp5IJLQlNacSQiRKlOHgIj9GNgK6okg7peCsTy5Z5naN	GWd44IHjLMwM9M3SFreDZIctapkFKQEK8cTgeyecEdhW2wNtMbrDfYxp7xxYaOy3Tor3hIqdBQWxfmXtZvDFYqiFXe73DEIcWdNW	6	\N	22
36	2015-09-11 22:14:37.898	\N	2015-09-11 22:14:38.322	\N	1	\N	0	f	temp-file-name8100610928231468010.tmp	0	EANR451KTf9S4a81ldgIdcaroXYDMxfFlgCOgRmLYEeR5kdm78zJjdwZvxGWG1ruN5v4FS5D5BjFAkAxGLxtUym51cuqu9jFVkiC	RwIBqcMpICdGjMjH5Gr7mKemcVt3aDBn8Ww1Y0THG2gsuAYWyIylyTUGfHM3bxxyQRrmHQlyDkAMmtt2qmTXaB8HFeQMFIh7arH4	6	\N	24
37	2015-09-11 22:14:38.678	\N	2015-09-11 22:14:38.954	\N	1	\N	0	f	temp-file-name7335805131140811349.tmp	0	yOMWRPSXiB4LKK8C4BY1pPt7yQhxkfvuHuTRsVwd3J2iJEXiSDIEVRf32kIdQrj8VsV0JNwBizOrI4uzzK3r3029VCIGyazbZMz5	ULFGCPnUZyXrQoXpBmpdlm8DPZxHLxhKbKhI0QKM4QAH4KbiLqNY7ssH9hcs9z5KW41J2FBH2aATQsepQmlG9MwQ6TRmNwnCftrr	6	\N	24
38	2015-09-11 22:14:39.272	\N	2015-09-11 22:14:39.558	\N	1	\N	0	f	temp-file-name1956031853140643830.tmp	0	oav9srMlkuXnVgIiDOLuuGjg6VMKEaS1gVZTcq2liw1sEhXVRIPhGFgvwZiSddoshxEQjq4jFmENaOpQ6iqX21kF3avOM60ojNSn	3lZxqx2dMiuTNv6zDPeKsU913clUFbqQd6fdNsgMGqdfKVMQxJrKcEKHJ6edcRcZkkKusIEQHvsSHFmYvEWhCxDVf24exrTyl2xy	6	\N	24
39	2015-09-11 22:14:39.908	\N	2015-09-11 22:14:40.222	\N	1	\N	0	f	temp-file-name5053537968586133426.tmp	0	Zp5OPL87d45hWbFkgXvYN1ghXzDLUoRRRtUilGzO2pRIFsPw7slnmp41OO5H2Vt7SEDQBAR96F6h9oCyVAWyUwuS91gBBz5moLfI	TJjlpzQyEh6WAxWcVLwWlnD9r2Z7drxQb3kus9LvbRy3kWVeUZw7kQRWlXFn7vCHpv6yDMg8JrYs3d5ipfn4McE5NTHDuZVlAUKr	6	\N	24
40	2015-09-11 22:14:40.733	\N	2015-09-11 22:14:41.131	\N	1	\N	0	f	temp-file-name3850710824394870295.tmp	0	BPV68PF9wcdxJQuF4Jw2rd3FaCrpjnGEHHiTmKc88OlDyqXbdmNmSt00cBt8crFBlb3jv8tq8R0hXHQt5RE1BzVFESSF0Dc7spui	87foPxsgteHAAOT4Q04fKS4sHBHU3IT4cgUDV0qguBUmHO1E5CTHxsHW3YH1DvFC9aZJDbpJ1Rqikasst93sBOiTA2GFWIW4Ynd3	7	\N	25
41	2015-09-11 22:14:42.184	\N	2015-09-11 22:14:42.596	\N	1	\N	0	f	temp-file-name7643809890491231666.tmp	0	agWsKfBxtjFwo2cUjwGcxow5NrvjKKkFGO4dQs77xN5aDGAIjJFZwp3RuVjsJCD1nItSuXVVTwfE8HQfFiPVNmtfrR6EO5fHFRTx	6lvp8hlCcBYEUwxFBEmjTFf9Ihn1oCSkbH5prZgrYIfiTdbY29BSWh5bQ9nYRh6jjoZFbvxWtaifbbRRRg1bbd39CcgGkCeBw7I3	7	\N	28
42	2015-09-11 22:14:42.985	\N	2015-09-11 22:14:43.427	\N	1	\N	0	f	temp-file-name1933789181514932369.tmp	0	8kluIgiBbhGUYLyX2NtadOVL4lRvoIHE6D5CALvHguluVwS8rQDwBtI4bC9PQ6uOHKigdzIdSrqi8qePXvki4CpQReBgl5xbJMUW	sdMz3fnlQ3rhrsRyRWVzVkUM5Zc1j6SBQSe9t4lx0ZebObFGaEyFQs2BT4MuqwXpsR3sRXUYnyFzmpMgjfPbQ4XHAcJGvgQwtFdG	7	\N	29
43	2015-09-11 22:14:43.914	\N	2015-09-11 22:14:44.415	\N	1	\N	0	f	temp-file-name7441833888833454147.tmp	0	Z8lLZnYEQNwI0R93v0Ss32iDsmU6qCifxujYJkX8v9CkbjCd0UVj0qsgUt1faRKqKxRZ28GDQmAp7dhp5BNE6rvbxv706mrJn6Dc	5SS5rOOtTI71sggNQkhYYmuEmvXmqT4n4KjZWP2RnVGvc4vZ5tQytMa6t9t0mlOp6LzL4dfYwkzV43QXeDccAMB6KipXHRyEtjAC	8	\N	32
44	2015-09-11 22:14:44.936	\N	2015-09-11 22:14:45.426	\N	1	\N	0	f	temp-file-name7069814028900480717.tmp	0	qoFM9q8FURnvXLloFEVUsaHO3HHqlXfzRvgM1FCssSTBb7zmodYMYno9kCeIiMWn2PQvqlm1BbHzC8wmehOZWsZmtl7o4xJS8Ckc	3183HsYOracjT72k76qaRXJfKT4gJ2vOXhR5MclSiiaGkKF1BUIaSzaXbe2ygMDO0j16WAzAcvylJilULtNs9gJwwSyMQpfnjCw6	8	\N	33
45	2015-09-11 22:14:46.049	\N	2015-09-11 22:14:46.963	\N	1	\N	0	f	temp-file-name3108690040184195767.tmp	0	i5JKdvuXLvldi6X2fUmLRQ3jfYUG3Aes3vv0kenwz2fpPxKzRk88VRvSsvi8kToqFSWJOiVoGwlmd242NlL2Td62PyLgUh3ZbJ5f	yrn4A8JcBRm4zDJd1RhRnR4EAa7psyEvjDicJDKNpUT6AUKEvnBml1hTooej39fFHnNbrCab2D5bngoXDsUSQz1Bn5Wl92g2Tbpt	8	\N	34
46	2015-09-11 22:14:49.105	\N	2015-09-11 22:14:49.579	\N	1	\N	0	f	temp-file-name6568109624029027861.tmp	0	510ds0ICkQRilvEaS1bFJDmyFzvMbwD3jWojvYIjSSY3pBJhsvAxBMWIVcJCXKOUXIIvxNwLOh1cPCma12swo78JDHQQGhTMi2eF	n9QUTALNjgbUnvKZIGadXD75y8mBGbqF4whlmaJbyB3HDPTTiyL6lxEJEDMVwilJiqpTD59b8AUNaHTQlGdCrcoCDYxkoCSqjhYq	8	\N	36
47	2015-09-11 22:14:51.705	\N	2015-09-11 22:14:52.293	\N	1	\N	0	f	temp-file-name5395444280163270792.tmp	0	6rsRYYtjYduNlcwXS9fkDo3aV4lbbBZVYnyg6KV1T6x35Ku7Hlfdo55SCT8VHrFNEltJWV7ErrH1OIUmI2rN3wRU8S6RBlDjKYZ6	5SUIu9zwZkjE46ZzcyuAJsbwcngWZZLtplC5WGNWxTBmIePtUBpS1YeOTZuqj3XHqwyA6ARLuyqHcSIB2yu5AYVc6q5C2iywtqO7	8	\N	39
48	2015-09-11 22:14:52.617	\N	2015-09-11 22:14:53.014	\N	1	\N	0	f	temp-file-name613178016565758383.tmp	0	piw7EUwdUI5fHxbRMEnMbMYJSgJ39RiyRPjm55G7NSRjI0mRfwQUfwmNWEvwkhJwT09ZuOtpJrqZe8pHTScHdukN4WBxloLlWvFx	ztQhqXHUwy8jGGOnuKSycc0Hq6sSLxFf3eDcE6q9OgagvWZTcopRSkewz8JxfC4B99yR6aNAyJuMp22JZY4UUgIWfeJLKwZqvJZo	9	\N	40
49	2015-09-11 22:14:53.763	\N	2015-09-11 22:14:54.174	\N	1	\N	0	f	temp-file-name5793614934783376771.tmp	0	6glGxzKUJbMjrCr2AYPC707ulBCBWUkq6KFhEyIdIjDfJIJygQLus0YLqb7fK5fSAt6cG3bWu3vGMXl475QHKXlhONmuSb7WQV4f	TTUWWbvmjWMTXC12REIoHHpzwUfuVqSPJ4RiVcVNsMcQkSKHe1t5T6ZhpXkpTF4MpHkGTmZtVDYBuwe5tfCLb0PaZCvmqFuYOHzX	9	\N	42
50	2015-09-11 22:14:54.569	\N	2015-09-11 22:14:54.982	\N	1	\N	0	f	temp-file-name776494659471863295.tmp	0	m1x8haSxTH1dqk1tCwHWSkcxuW2QpY7Kmqb0lNJuaUbLqWLlKRGJET4ge7rT8LEpXXzF5F3lH33ZmWAw8pIXJXfHKDjUgVxInUBp	adaK96OTNcOirtTGfYlvaUU1fUfl4WD833d30GFoyk52Sfc9WEmZSZyWpE8s3OLGMd5ZW7cmuBvSza3SQ5FcxSG2eFEqPxALiVDU	9	\N	43
51	2015-09-11 22:14:55.796	\N	2015-09-11 22:14:56.212	\N	1	\N	0	f	temp-file-name9065312057244672145.tmp	0	U7bEgeFaZy78wRrKbe5ZKUGSdiomPqxBnIfgHfExx8FgbkAL6yo3hTVe1FHSKu55fwdLHeS6Jb9QrtCITtV1kQk76rjQg2eURJUH	Ou8TMQL2CNqutRKsdxbR4eiH653uGALSH5QcWSKqjs5omRJdJ8hagKqZwdvj2tt24wvoihFbzNQ8dvQ43EBcHnkqo0ZNwpx8GC0I	9	\N	46
52	2015-09-11 22:14:56.697	\N	2015-09-11 22:14:57.057	\N	1	\N	0	f	temp-file-name2371550401890754318.tmp	0	raXQm6njNqdYlt6H56V0CRCXT6MQYUi4QP0W2zIV2Aqd1YelJvfWYXARLPUT9s1tkd6ZYZOdsGyoJGDWDAyttyzbNH3fNfXbpk06	oK1nkFbnISdaWewDpe9yYnRMZO5rWfkEQoWOr0aFlKd7i1ASMHHMy96mC8gUgaS8E0ct3clXNP8fY4Zu812XYYzqzMlbN70Hjvy3	10	\N	47
53	2015-09-11 22:14:57.429	\N	2015-09-11 22:14:57.85	\N	1	\N	0	f	temp-file-name5554841740548335491.tmp	0	B2gOlE63qi9OTLeZnN9joKeGlZd0AQKEXkIkDMv8FfhjTJ3J578sz2hDCfUW2xiCmSnFNu3LGuNcbAFltYu9DTO2tmoNl6Q7m8wB	rT9IQCExUzo9KlvZoh6Fi3PPR81P5Ehid92gzXt2bYKlUXnYet1ezYZhk5Err8EySO8j96za4IOobcwQyfgwVkygXpFEVgxtJEfv	10	\N	48
54	2015-09-11 22:14:59.167	\N	2015-09-11 22:14:59.593	\N	1	\N	0	f	temp-file-name2883947849104081453.tmp	0	Y73thW9Zki1BkeGtUFrneygvY7dS0feYS9nubRAV9jJpjhAoFfUHHP15QbnZYaBtEtv1JW0ql1t0mNla4j7mBLiakYi59sj232PW	Y2b3zomUgklwF17EKKSAqCU0QiLHyoX7xjRjd3wo5LyZFz6hGXyfhyxTHJdoBHgvw3QmUuksT5XThffxbLLONSghiKPK0RZBMYwh	10	\N	51
55	2015-09-11 22:15:00.451	\N	2015-09-11 22:15:00.803	\N	1	\N	0	f	temp-file-name1031585457704688991.tmp	0	hwmvIlEHvn1AMr7mEUmV8n6LJXsNsQu8pGORNF4wHiv8a0HgawqDK7lxizpaDIZxQPWkktrPEtUQJfF9wZf3eFpK3MKK5K44qyIT	VxGzLPEumxfrkineV8L8LP1cDmXQp2NfXRaz58iHfoVewzwwSV7qiTwrUJnAbrIc4s3r9VqZTbeVSPgs0lPWrU9a7dud1aSOcx7u	10	\N	53
56	2015-09-11 22:15:01.264	\N	2015-09-11 22:15:01.66	\N	1	\N	0	f	temp-file-name4117145822032172782.tmp	0	6hnyqB5IgOPw6TjTMdXZFdhIPf0QOT3O5S1eIoYkKnz7A0l6G5D8KwxUivARr1LWcS1jdA2qQLV8cr9x5ctttznuykUSCZmk5X6M	jfsDHcYI4RIXz1qAmXDRF90idhlrUPsAC6iflvgDvLykUwiFxoT1LjxEuqJIzmrIZznNkzsXuNwYoaDWbfNROCaSKR2AXla1nd3M	10	\N	54
57	2015-09-11 22:15:01.935	\N	2015-09-11 22:15:02.447	\N	1	\N	0	f	temp-file-name7215272121761492526.tmp	0	6dN89qmQSp9OnZKX12XF3rKtRqLqRyEAsXG53Azowh1eebAORIKEs3eevX2dhdFG2bdueNKM17Mr0Xg6fiX0AQ59XOWfeYPxWFO4	z86WYyLF92AqCcEpDDogJP52Ze1SilQci9fs05psRxrVj2bi83bdoXSHU6DYcmt08hgtHWC0W5bp98GdtKsZYqiWkdVYybu3V59j	11	\N	55
58	2015-09-11 22:15:03.724	\N	2015-09-11 22:15:04.218	\N	1	\N	0	f	temp-file-name3305993546350548876.tmp	0	KrOnBFOJUcVEhbuFLqjOcfspOiM4LBWRDJ0pnSqGOrpoEOCapsz6tQWWSDVzOXgJhMLgE80hxbMbPENZdJqFfKMuS5X0awvJTiWy	n5IJGpYVOtxfSlvkQG8OcrCcOiTFm15ZdgTEtfrOvvZ7O1iKXq51lqWNqRqPs0urjGsF0GTlYb7jMxgP4hBDVvTHXTkfGK3LugXs	11	\N	57
59	2015-09-11 22:15:04.604	\N	2015-09-11 22:15:05.001	\N	1	\N	0	f	temp-file-name2970018359844196094.tmp	0	Rs5WI1FWoUeSlNHQJtZWABYjFKpaOLK4SLiSTg3l7gJ6KQirifhUkLJMiGwy0V8KSHgow2GJuiSj9AJpWQU4T6m1ZvtuqojxkieM	TdoRyaXKGt0dCeve7Dqoei2yrXVL89cGTBTdD76EpSifRz4AJ5l1PIHFPQwgDmiYgDBZXo6k6o7a74gKgJyqkEHMbSmYXSKZdbkc	11	\N	58
60	2015-09-11 22:15:05.32	\N	2015-09-11 22:15:05.873	\N	1	\N	0	f	temp-file-name8691221665487608674.tmp	0	GjmhZaizEkOaCUZMv7vdOBkkoMyR7jRUVF81O1eLEHGzTbpebnBXRdG014mCINtleGzwcP23QsC1sRX1EZcVDGoyzqc2lm3KTS2F	0QhOlHD4VrZbMANN7yxpmXZ3rOk5oAM2iyuhaACFtMSj7zJxI2BLsKEEwKUm3VoRvWxXkH4Tw7OCimw07yjpqKT5diOsU0OS0JPT	11	\N	59
61	2015-09-11 22:15:06.727	\N	2015-09-11 22:15:07.147	\N	1	\N	0	f	temp-file-name5738594195823566463.tmp	0	pbSzk1cJ3mXHk05B9DSn4ljvqf1TVktH4Cdn9aYSF4ady0o7GjZCOfQhi2FA6j062lVON0BvkYIKgnqEOTgA8XwiRNe8UlLyGf6S	MfAVP1j4CKDhIvejdS67u12lVhzIgzDmQwfUi8ReU19evmq8lom5VLLwUtfrtGhUDGce2UbnEakHOc8hLH1pwfmbEmL2A94OmFF7	12	\N	63
62	2015-09-11 22:15:07.489	\N	2015-09-11 22:15:07.88	\N	1	\N	0	f	temp-file-name1257255070424675268.tmp	0	mYqhcox5xP7nBdUPK9SHslmGjlc3mptuOvOv7sDMLhDtu2EvHwhfl5F5Ed7RradjzLECcMj3mHtl1EL2fiGFYTGXEK1e1TSetSKa	envV1lWKu1s8L4CTMwBflrMDUoj2k9vroRBUevLoVLjY3PqO0a88hFYooW2tm1Lwn0YFibFxsdTFIs7giNrlbiHvQ4KYeUrw7Ex0	12	\N	64
63	2015-09-11 22:15:09.293	\N	2015-09-11 22:15:09.683	\N	1	\N	0	f	temp-file-name2324626342717046695.tmp	0	ChdHb2wqOKIciBchkG4ItLCRkWX7uQnWDaDTdPf8gwFecUttMHEn4qeCG0dSnNQIUziAeGHnbhL4MSDOTrchgqvN9XLhpsFMeyay	q5kwwfeZGgjpTy3BkmecfYKG5v9GAfspWZAI77ucViR7FnpXVzVyllNJx3XptMz8uDlUFumW70I71UkCymLUr05vwR2JCjj0Jvbp	12	\N	67
64	2015-09-11 22:15:10.457	\N	2015-09-11 22:15:10.874	\N	1	\N	0	f	temp-file-name733022929088859358.tmp	0	yp1MKQMODjl9HLMIfmBJc6l3OUd7H0N7W6tnbw1JBwCPslwdTut9RyZfjEz4oefgqSNP6ik1WWIbKi17pvqNxlLA2g5luhDXFXFo	P2qfUQrkrGOicZfDAxYgtm1gekyhZuInkNaH8YnwFrycv5pGuOsJxF7iiweqHrcxgcAos2Suu2ocPQWhuGTeMZ0w3hnEOF46Hic4	12	\N	69
65	2015-09-11 22:15:11.271	\N	2015-09-11 22:15:11.679	\N	1	\N	0	f	temp-file-name6649573976655013021.tmp	0	AaGwVIxOCP95Uk0bbkZJor4aNBiAMLx3TQIHGmis0SKgLuFbzbLwOol3Ry0Hx64Je7WYdv0bJjYR48SWux2bAXzPsD7Sju44EgRS	r613E0pqx37jYFZSD9CR7d1Z2ZePJfCJbSKFkKOWbyuflqhrPbLmMipkt4tUGs91Atf15oeblj5Yyz7nnSbxD1xZNCtdubg0m2fG	12	\N	70
66	2015-09-11 22:15:12.091	\N	2015-09-11 22:15:12.524	\N	1	\N	0	f	temp-file-name2344136353573797399.tmp	0	nd2be9M1OTsTqkwAwWC86thmbgOKDFDxJliWEe9GfMuuQ3O4k6reb3C5jQZVhf7QlASIa9TnnU76ahUycOoTKpNqervjXZWWJ7T5	Wo0RosSuizdUxpGBYdMR6t8zWCLGhlZ5TcOzN6JRYfoScBqhwn07iLSuLJWSINTpAqZsk6MZZ8onQWWDzRiQ3FjNhEHtVqPFTHgw	12	\N	71
67	2015-09-15 01:18:56.748	\N	2015-09-15 01:19:14.66	\N	1	\N	1	t	Capture du 2015-03-06 002257.png	0	EZQcO8SHZyQ1q7XUK1sULK2aj05ksjb5SiP0ND1cRwJMmleWdMy6686LcpmP1tFOvGO421CsQMTT5lG2zkTEqW06KnL5Hzk5miuS	9u1ewqD7N3nPjgihQ2Y7g2fCR4evVerSjjvIsNOeghsIJ5rWHAzg1593B4aHl0E3ZUsyC8853cILOVcZzhzO22kRD4qDCZvLzp1R	5	\N	72
68	2015-09-15 01:32:23.627	\N	2015-09-15 01:32:59.755	\N	1	\N	1	t	4.png	0	SzlQKafDKAiLJHhFHpC6zh03yVDAoFQstVbV1ouKE4E1QfGUvD0Amdtac2Z7cq5rdflIWaVieBsZfdw7YNI0LsePUf5GoDSDzEax	5Vy950MqyJtIwCggCsSyZHlwgBB3LTNKdtSW3fRNJrTfgcUj8AMw9hyuyG4AMccRrEDkuR0QNn8wnREqyj0TlgTBsZC6XX6fyRTq	5	2	\N
69	2015-09-15 01:32:23.934	\N	2015-09-15 01:32:59.758	\N	1	\N	2	t	Capture du 2015-03-02 221505.png	0	QUbCJndj82y5iFRI0oTZLLfBWp0H0iNamUm88xK629cqfebrOwDJTKzvS1k3tL0FA2JTXJJUQvOh4sb8SAA40xxTYP21LAmwFRFy	G2wc8lnruZKxC0a682E9u4WUy1zHl6Kl5ZQ93qZSKKniSiY4glky1RYeZ48QSpKjRUv69YoCUmntF58h66a2E2WFYYxod5J6BYCK	5	2	\N
70	2015-09-15 01:32:29.296	\N	2015-09-15 01:32:59.765	\N	1	\N	3	t	Capture du 2015-09-10 131601.png	0	Pv0Hr1sErvDGYAOzqENxDDxnR0XjHowTugXn158wn3l95ESQtuc6ckTt2K2rhHsgY7hbxfTchebtR1a5W37ETDy6dSMvU8A50Lho	7OryCEttm3r4Nk0VxKbvUyE6DF4zfTkvoBHDr3K0JCN3UWrnM0X0ShhTgOvvshMpYNC3lOm0v0TtClubyBryyr2DVyHBOwLCRfNz	5	2	\N
71	2015-09-15 01:35:09.188	\N	2015-09-15 01:35:09.188	\N	0	\N	0	t	Capture du 2015-03-02 221252.png	0	B0bNeovtdfTRmlz6RsvtzJVPxJtOrnH77vhtVFtsATk4rCl2lcu4Yu0ZdAR53CNxbCtqvE2Osbz9KX5hC112yQG70KM68qin8noP	dgnN8IcceoL5ESpyhYNcaNCb3BFSfvt3jCrMeE9G4UofirMVxkm5UrLPnml9cVGUC9KAs3qEQOkXH5cfzCuK40aqzztio1DPl7iI	5	\N	\N
\.


--
-- Name: storedfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('storedfile_id_seq', 71, true);


--
-- Data for Name: translation; Type: TABLE DATA; Schema: public; Owner: play
--

COPY translation (id, creationdate, creationuser, lastupdate, lastupdateuser, version) FROM stdin;
1	2015-09-11 22:11:48.107	\N	2015-09-11 22:11:48.107	\N	0
2	2015-09-11 22:11:48.158	\N	2015-09-11 22:11:48.158	\N	0
3	2015-09-11 22:11:48.174	\N	2015-09-11 22:11:48.174	\N	0
4	2015-09-11 22:11:48.189	\N	2015-09-11 22:11:48.189	\N	0
5	2015-09-11 22:11:48.203	\N	2015-09-11 22:11:48.203	\N	0
6	2015-09-11 22:11:48.217	\N	2015-09-11 22:11:48.217	\N	0
7	2015-09-11 22:11:48.235	\N	2015-09-11 22:11:48.235	\N	0
8	2015-09-11 22:11:48.247	\N	2015-09-11 22:11:48.247	\N	0
9	2015-09-11 22:11:48.259	\N	2015-09-11 22:11:48.259	\N	0
10	2015-09-11 22:11:48.271	\N	2015-09-11 22:11:48.271	\N	0
11	2015-09-11 22:11:48.283	\N	2015-09-11 22:11:48.283	\N	0
12	2015-09-11 22:11:48.295	\N	2015-09-11 22:11:48.295	\N	0
13	2015-09-11 22:11:48.308	\N	2015-09-11 22:11:48.308	\N	0
14	2015-09-11 22:11:48.32	\N	2015-09-11 22:11:48.32	\N	0
15	2015-09-11 22:11:48.331	\N	2015-09-11 22:11:48.331	\N	0
16	2015-09-11 22:11:48.344	\N	2015-09-11 22:11:48.344	\N	0
17	2015-09-11 22:11:48.36	\N	2015-09-11 22:11:48.36	\N	0
18	2015-09-11 22:11:48.372	\N	2015-09-11 22:11:48.372	\N	0
19	2015-09-11 22:11:48.384	\N	2015-09-11 22:11:48.384	\N	0
20	2015-09-11 22:11:48.395	\N	2015-09-11 22:11:48.395	\N	0
21	2015-09-11 22:11:48.976	\N	2015-09-11 22:11:48.976	\N	0
22	2015-09-11 22:11:48.985	\N	2015-09-11 22:11:48.985	\N	0
23	2015-09-11 22:11:48.992	\N	2015-09-11 22:11:48.992	\N	0
24	2015-09-11 22:11:49	\N	2015-09-11 22:11:49	\N	0
25	2015-09-11 22:11:49.008	\N	2015-09-11 22:11:49.008	\N	0
26	2015-09-11 22:11:49.016	\N	2015-09-11 22:11:49.016	\N	0
27	2015-09-11 22:11:49.024	\N	2015-09-11 22:11:49.024	\N	0
28	2015-09-11 22:11:49.031	\N	2015-09-11 22:11:49.031	\N	0
29	2015-09-11 22:11:49.039	\N	2015-09-11 22:11:49.039	\N	0
30	2015-09-11 22:11:49.047	\N	2015-09-11 22:11:49.047	\N	0
31	2015-09-11 22:11:49.055	\N	2015-09-11 22:11:49.055	\N	0
32	2015-09-11 22:11:49.062	\N	2015-09-11 22:11:49.062	\N	0
33	2015-09-11 22:11:49.068	\N	2015-09-11 22:11:49.068	\N	0
34	2015-09-11 22:11:49.076	\N	2015-09-11 22:11:49.076	\N	0
35	2015-09-11 22:11:49.083	\N	2015-09-11 22:11:49.083	\N	0
36	2015-09-11 22:11:49.09	\N	2015-09-11 22:11:49.09	\N	0
37	2015-09-11 22:11:49.097	\N	2015-09-11 22:11:49.097	\N	0
38	2015-09-11 22:11:49.104	\N	2015-09-11 22:11:49.104	\N	0
39	2015-09-11 22:11:49.111	\N	2015-09-11 22:11:49.111	\N	0
40	2015-09-11 22:11:49.118	\N	2015-09-11 22:11:49.118	\N	0
41	2015-09-11 22:11:49.125	\N	2015-09-11 22:11:49.125	\N	0
42	2015-09-11 22:11:49.134	\N	2015-09-11 22:11:49.134	\N	0
43	2015-09-11 22:11:49.141	\N	2015-09-11 22:11:49.141	\N	0
44	2015-09-11 22:11:49.148	\N	2015-09-11 22:11:49.148	\N	0
45	2015-09-11 22:11:49.155	\N	2015-09-11 22:11:49.155	\N	0
46	2015-09-11 22:11:49.162	\N	2015-09-11 22:11:49.162	\N	0
47	2015-09-11 22:11:49.17	\N	2015-09-11 22:11:49.17	\N	0
48	2015-09-11 22:11:49.178	\N	2015-09-11 22:11:49.178	\N	0
49	2015-09-11 22:11:49.184	\N	2015-09-11 22:11:49.184	\N	0
50	2015-09-11 22:11:49.19	\N	2015-09-11 22:11:49.19	\N	0
51	2015-09-11 22:11:49.197	\N	2015-09-11 22:11:49.197	\N	0
52	2015-09-11 22:11:49.204	\N	2015-09-11 22:11:49.204	\N	0
53	2015-09-11 22:11:49.21	\N	2015-09-11 22:11:49.21	\N	0
54	2015-09-11 22:11:49.216	\N	2015-09-11 22:11:49.216	\N	0
55	2015-09-11 22:11:49.222	\N	2015-09-11 22:11:49.222	\N	0
56	2015-09-11 22:11:49.228	\N	2015-09-11 22:11:49.228	\N	0
57	2015-09-11 22:11:49.233	\N	2015-09-11 22:11:49.233	\N	0
58	2015-09-11 22:11:49.239	\N	2015-09-11 22:11:49.239	\N	0
59	2015-09-11 22:11:49.245	\N	2015-09-11 22:11:49.245	\N	0
60	2015-09-11 22:11:49.25	\N	2015-09-11 22:11:49.25	\N	0
61	2015-09-11 22:11:49.255	\N	2015-09-11 22:11:49.255	\N	0
62	2015-09-11 22:11:49.261	\N	2015-09-11 22:11:49.261	\N	0
63	2015-09-11 22:11:49.267	\N	2015-09-11 22:11:49.267	\N	0
64	2015-09-11 22:11:49.272	\N	2015-09-11 22:11:49.272	\N	0
65	2015-09-11 22:11:49.284	\N	2015-09-11 22:11:49.284	\N	0
66	2015-09-11 22:11:49.291	\N	2015-09-11 22:11:49.291	\N	0
67	2015-09-11 22:11:49.298	\N	2015-09-11 22:11:49.298	\N	0
68	2015-09-11 22:11:49.304	\N	2015-09-11 22:11:49.304	\N	0
69	2015-09-11 22:11:49.31	\N	2015-09-11 22:11:49.31	\N	0
70	2015-09-11 22:11:49.316	\N	2015-09-11 22:11:49.316	\N	0
71	2015-09-11 22:11:49.323	\N	2015-09-11 22:11:49.323	\N	0
72	2015-09-11 22:11:49.329	\N	2015-09-11 22:11:49.329	\N	0
73	2015-09-11 22:11:49.335	\N	2015-09-11 22:11:49.335	\N	0
74	2015-09-11 22:11:49.342	\N	2015-09-11 22:11:49.342	\N	0
75	2015-09-11 22:11:49.348	\N	2015-09-11 22:11:49.348	\N	0
76	2015-09-11 22:11:49.355	\N	2015-09-11 22:11:49.355	\N	0
77	2015-09-11 22:11:49.362	\N	2015-09-11 22:11:49.362	\N	0
78	2015-09-11 22:11:49.369	\N	2015-09-11 22:11:49.369	\N	0
79	2015-09-11 22:11:49.376	\N	2015-09-11 22:11:49.376	\N	0
80	2015-09-11 22:11:49.383	\N	2015-09-11 22:11:49.383	\N	0
81	2015-09-11 22:11:49.39	\N	2015-09-11 22:11:49.39	\N	0
82	2015-09-11 22:11:49.396	\N	2015-09-11 22:11:49.396	\N	0
83	2015-09-11 22:11:49.402	\N	2015-09-11 22:11:49.402	\N	0
84	2015-09-11 22:11:49.407	\N	2015-09-11 22:11:49.407	\N	0
85	2015-09-11 22:11:49.413	\N	2015-09-11 22:11:49.413	\N	0
86	2015-09-11 22:11:49.42	\N	2015-09-11 22:11:49.42	\N	0
87	2015-09-11 22:11:49.426	\N	2015-09-11 22:11:49.426	\N	0
88	2015-09-11 22:11:49.432	\N	2015-09-11 22:11:49.432	\N	0
89	2015-09-11 22:11:49.437	\N	2015-09-11 22:11:49.437	\N	0
90	2015-09-11 22:11:49.442	\N	2015-09-11 22:11:49.442	\N	0
91	2015-09-11 22:11:49.448	\N	2015-09-11 22:11:49.448	\N	0
92	2015-09-11 22:11:49.453	\N	2015-09-11 22:11:49.453	\N	0
93	2015-09-11 22:11:49.458	\N	2015-09-11 22:11:49.458	\N	0
94	2015-09-11 22:11:49.463	\N	2015-09-11 22:11:49.463	\N	0
95	2015-09-11 22:11:49.468	\N	2015-09-11 22:11:49.469	\N	0
96	2015-09-11 22:11:49.474	\N	2015-09-11 22:11:49.474	\N	0
97	2015-09-11 22:11:49.479	\N	2015-09-11 22:11:49.479	\N	0
98	2015-09-11 22:11:49.485	\N	2015-09-11 22:11:49.485	\N	0
99	2015-09-11 22:11:49.491	\N	2015-09-11 22:11:49.491	\N	0
100	2015-09-11 22:11:49.497	\N	2015-09-11 22:11:49.502	\N	0
101	2015-09-11 22:11:49.509	\N	2015-09-11 22:11:49.509	\N	0
102	2015-09-11 22:11:49.515	\N	2015-09-11 22:11:49.515	\N	0
103	2015-09-11 22:11:49.521	\N	2015-09-11 22:11:49.521	\N	0
104	2015-09-11 22:11:49.527	\N	2015-09-11 22:11:49.527	\N	0
105	2015-09-11 22:11:49.532	\N	2015-09-11 22:11:49.532	\N	0
106	2015-09-11 22:11:49.538	\N	2015-09-11 22:11:49.538	\N	0
107	2015-09-11 22:11:49.544	\N	2015-09-11 22:11:49.544	\N	0
108	2015-09-11 22:11:49.549	\N	2015-09-11 22:11:49.549	\N	0
109	2015-09-11 22:11:49.556	\N	2015-09-11 22:11:49.556	\N	0
110	2015-09-11 22:11:49.561	\N	2015-09-11 22:11:49.561	\N	0
111	2015-09-11 22:11:49.568	\N	2015-09-11 22:11:49.568	\N	0
112	2015-09-11 22:11:49.574	\N	2015-09-11 22:11:49.574	\N	0
113	2015-09-11 22:11:49.581	\N	2015-09-11 22:11:49.581	\N	0
114	2015-09-11 22:11:49.587	\N	2015-09-11 22:11:49.587	\N	0
115	2015-09-11 22:11:49.593	\N	2015-09-11 22:11:49.593	\N	0
116	2015-09-11 22:11:49.599	\N	2015-09-11 22:11:49.599	\N	0
117	2015-09-11 22:11:49.608	\N	2015-09-11 22:11:49.608	\N	0
118	2015-09-11 22:11:49.615	\N	2015-09-11 22:11:49.615	\N	0
119	2015-09-11 22:11:49.621	\N	2015-09-11 22:11:49.621	\N	0
120	2015-09-11 22:11:49.627	\N	2015-09-11 22:11:49.627	\N	0
121	2015-09-11 22:11:49.633	\N	2015-09-11 22:11:49.633	\N	0
122	2015-09-11 22:11:49.638	\N	2015-09-11 22:11:49.638	\N	0
123	2015-09-11 22:11:49.644	\N	2015-09-11 22:11:49.644	\N	0
124	2015-09-11 22:11:49.652	\N	2015-09-11 22:11:49.652	\N	0
125	2015-09-11 22:11:49.662	\N	2015-09-11 22:11:49.662	\N	0
126	2015-09-11 22:11:49.667	\N	2015-09-11 22:11:49.667	\N	0
127	2015-09-11 22:11:49.672	\N	2015-09-11 22:11:49.672	\N	0
128	2015-09-11 22:11:49.677	\N	2015-09-11 22:11:49.677	\N	0
129	2015-09-11 22:11:49.682	\N	2015-09-11 22:11:49.682	\N	0
130	2015-09-11 22:11:49.687	\N	2015-09-11 22:11:49.687	\N	0
131	2015-09-11 22:11:49.692	\N	2015-09-11 22:11:49.692	\N	0
132	2015-09-11 22:11:49.698	\N	2015-09-11 22:11:49.698	\N	0
133	2015-09-11 22:11:49.703	\N	2015-09-11 22:11:49.703	\N	0
134	2015-09-11 22:11:49.709	\N	2015-09-11 22:11:49.709	\N	0
135	2015-09-11 22:11:49.716	\N	2015-09-11 22:11:49.716	\N	0
136	2015-09-11 22:11:49.721	\N	2015-09-11 22:11:49.721	\N	0
137	2015-09-11 22:11:49.728	\N	2015-09-11 22:11:49.728	\N	0
138	2015-09-11 22:11:49.734	\N	2015-09-11 22:11:49.734	\N	0
139	2015-09-11 22:11:49.739	\N	2015-09-11 22:11:49.739	\N	0
140	2015-09-11 22:11:49.743	\N	2015-09-11 22:11:49.743	\N	0
141	2015-09-11 22:11:49.748	\N	2015-09-11 22:11:49.748	\N	0
142	2015-09-11 22:11:49.753	\N	2015-09-11 22:11:49.753	\N	0
143	2015-09-11 22:11:49.757	\N	2015-09-11 22:11:49.757	\N	0
144	2015-09-11 22:11:49.763	\N	2015-09-11 22:11:49.763	\N	0
145	2015-09-11 22:11:49.771	\N	2015-09-11 22:11:49.771	\N	0
146	2015-09-11 22:11:49.778	\N	2015-09-11 22:11:49.778	\N	0
147	2015-09-11 22:11:49.784	\N	2015-09-11 22:11:49.784	\N	0
148	2015-09-11 22:11:49.788	\N	2015-09-11 22:11:49.788	\N	0
149	2015-09-11 22:11:49.793	\N	2015-09-11 22:11:49.793	\N	0
150	2015-09-11 22:11:49.798	\N	2015-09-11 22:11:49.798	\N	0
151	2015-09-11 22:11:49.802	\N	2015-09-11 22:11:49.802	\N	0
152	2015-09-11 22:11:49.807	\N	2015-09-11 22:11:49.807	\N	0
153	2015-09-11 22:11:49.812	\N	2015-09-11 22:11:49.812	\N	0
154	2015-09-11 22:11:49.816	\N	2015-09-11 22:11:49.816	\N	0
155	2015-09-11 22:11:49.822	\N	2015-09-11 22:11:49.822	\N	0
156	2015-09-11 22:11:49.828	\N	2015-09-11 22:11:49.828	\N	0
157	2015-09-11 22:11:49.833	\N	2015-09-11 22:11:49.833	\N	0
158	2015-09-11 22:11:49.838	\N	2015-09-11 22:11:49.838	\N	0
159	2015-09-11 22:11:49.843	\N	2015-09-11 22:11:49.843	\N	0
160	2015-09-11 22:11:49.848	\N	2015-09-11 22:11:49.848	\N	0
161	2015-09-11 22:11:49.853	\N	2015-09-11 22:11:49.853	\N	0
162	2015-09-11 22:11:49.862	\N	2015-09-11 22:11:49.862	\N	0
163	2015-09-11 22:11:49.868	\N	2015-09-11 22:11:49.868	\N	0
164	2015-09-11 22:11:49.875	\N	2015-09-11 22:11:49.875	\N	0
165	2015-09-11 22:11:49.88	\N	2015-09-11 22:11:49.88	\N	0
166	2015-09-11 22:11:49.885	\N	2015-09-11 22:11:49.885	\N	0
167	2015-09-11 22:11:49.889	\N	2015-09-11 22:11:49.889	\N	0
168	2015-09-11 22:11:49.894	\N	2015-09-11 22:11:49.894	\N	0
169	2015-09-11 22:11:49.898	\N	2015-09-11 22:11:49.898	\N	0
170	2015-09-11 22:11:49.903	\N	2015-09-11 22:11:49.903	\N	0
171	2015-09-11 22:11:49.907	\N	2015-09-11 22:11:49.907	\N	0
172	2015-09-11 22:11:49.911	\N	2015-09-11 22:11:49.911	\N	0
173	2015-09-11 22:11:49.916	\N	2015-09-11 22:11:49.916	\N	0
174	2015-09-11 22:11:49.92	\N	2015-09-11 22:11:49.92	\N	0
175	2015-09-11 22:11:49.924	\N	2015-09-11 22:11:49.924	\N	0
176	2015-09-11 22:11:49.929	\N	2015-09-11 22:11:49.929	\N	0
177	2015-09-11 22:11:49.933	\N	2015-09-11 22:11:49.933	\N	0
178	2015-09-11 22:11:49.937	\N	2015-09-11 22:11:49.937	\N	0
179	2015-09-11 22:11:49.94	\N	2015-09-11 22:11:49.94	\N	0
180	2015-09-11 22:11:49.944	\N	2015-09-11 22:11:49.944	\N	0
181	2015-09-11 22:11:49.949	\N	2015-09-11 22:11:49.949	\N	0
182	2015-09-11 22:11:49.952	\N	2015-09-11 22:11:49.952	\N	0
183	2015-09-11 22:11:49.958	\N	2015-09-11 22:11:49.958	\N	0
184	2015-09-11 22:11:49.963	\N	2015-09-11 22:11:49.963	\N	0
185	2015-09-11 22:11:49.973	\N	2015-09-11 22:11:49.973	\N	0
186	2015-09-11 22:11:49.978	\N	2015-09-11 22:11:49.978	\N	0
187	2015-09-11 22:11:49.983	\N	2015-09-11 22:11:49.983	\N	0
188	2015-09-11 22:11:49.987	\N	2015-09-11 22:11:49.987	\N	0
189	2015-09-11 22:11:49.991	\N	2015-09-11 22:11:49.991	\N	0
190	2015-09-11 22:11:49.995	\N	2015-09-11 22:11:49.995	\N	0
191	2015-09-11 22:11:50	\N	2015-09-11 22:11:50	\N	0
192	2015-09-11 22:11:50.004	\N	2015-09-11 22:11:50.004	\N	0
193	2015-09-11 22:11:50.009	\N	2015-09-11 22:11:50.009	\N	0
194	2015-09-11 22:11:50.013	\N	2015-09-11 22:11:50.013	\N	0
195	2015-09-11 22:11:50.017	\N	2015-09-11 22:11:50.017	\N	0
196	2015-09-11 22:11:50.022	\N	2015-09-11 22:11:50.022	\N	0
197	2015-09-11 22:11:50.026	\N	2015-09-11 22:11:50.026	\N	0
198	2015-09-11 22:11:50.031	\N	2015-09-11 22:11:50.031	\N	0
199	2015-09-11 22:11:50.037	\N	2015-09-11 22:11:50.037	\N	0
\.


--
-- Name: translation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('translation_id_seq', 199, true);


--
-- Data for Name: translationvalue; Type: TABLE DATA; Schema: public; Owner: play
--

COPY translationvalue (id, creationdate, creationuser, lastupdate, lastupdateuser, version, content, lang, searchablecontent, translation_id) FROM stdin;
1	2015-09-11 22:11:48.131	\N	2015-09-11 22:11:48.131	\N	0	J'ai faim!	fr	j'ai faim!	1
2	2015-09-11 22:11:48.135	\N	2015-09-11 22:11:48.135	\N	0	I'm hungry!	en	i'm hungry!	1
3	2015-09-11 22:11:48.161	\N	2015-09-11 22:11:48.161	\N	0	C'est l'heure de l'apéro!	fr	c'est l'heure de l'apero!	2
4	2015-09-11 22:11:48.165	\N	2015-09-11 22:11:48.165	\N	0	Apero time!	en	apero time!	2
5	2015-09-11 22:11:48.177	\N	2015-09-11 22:11:48.177	\N	0	Ce soir… On danse!	fr	ce soir on danse!	3
6	2015-09-11 22:11:48.181	\N	2015-09-11 22:11:48.181	\N	0	I wanna dance tonight!	en	i wanna dance tonight!	3
7	2015-09-11 22:11:48.192	\N	2015-09-11 22:11:48.192	\N	0	Cinéma ou théâtre?	fr	cinema ou theatre?	4
8	2015-09-11 22:11:48.196	\N	2015-09-11 22:11:48.196	\N	0	Cinema or theatre?	en	cinema or theatre?	4
9	2015-09-11 22:11:48.207	\N	2015-09-11 22:11:48.207	\N	0	Mes grosses courses à petits prix.	fr	mes grosses courses a petits prix.	5
10	2015-09-11 22:11:48.21	\N	2015-09-11 22:11:48.21	\N	0	My big purchases at low prices.	en	my big purchases at low prices.	5
11	2015-09-11 22:11:48.22	\N	2015-09-11 22:11:48.22	\N	0	Un cadeau… Juste pour moi!	fr	un cadeau juste pour moi!	6
12	2015-09-11 22:11:48.227	\N	2015-09-11 22:11:48.227	\N	0	A gift… Only for me!	en	a gift only for me!	6
13	2015-09-11 22:11:48.237	\N	2015-09-11 22:11:48.238	\N	0	Je n'ai rien à me mettre!	fr	je n'ai rien a me mettre!	7
14	2015-09-11 22:11:48.241	\N	2015-09-11 22:11:48.241	\N	0	I have nothing to wear!	en	i have nothing to wear!	7
15	2015-09-11 22:11:48.25	\N	2015-09-11 22:11:48.25	\N	0	Qu'on est bien chez soi.	fr	qu'on est bien chez soi.	8
16	2015-09-11 22:11:48.253	\N	2015-09-11 22:11:48.253	\N	0	Home sweet home.	en	home sweet home.	8
17	2015-09-11 22:11:48.262	\N	2015-09-11 22:11:48.262	\N	0	Il est temps de se relaxer!	fr	il est temps de se relaxer!	9
18	2015-09-11 22:11:48.265	\N	2015-09-11 22:11:48.265	\N	0	It's time to relax!	en	it's time to relax!	9
19	2015-09-11 22:11:48.274	\N	2015-09-11 22:11:48.274	\N	0	Aujourd'hui, je transpire!	fr	aujourd'hui, je transpire!	10
20	2015-09-11 22:11:48.277	\N	2015-09-11 22:11:48.277	\N	0	I wanna sweat today!	en	i wanna sweat today!	10
21	2015-09-11 22:11:48.285	\N	2015-09-11 22:11:48.285	\N	0	J'aime mes animaux.	fr	j'aime mes animaux.	11
22	2015-09-11 22:11:48.289	\N	2015-09-11 22:11:48.289	\N	0	I love my pets.	en	i love my pets.	11
23	2015-09-11 22:11:48.298	\N	2015-09-11 22:11:48.298	\N	0	NYC, Bankgok ou Ostende?	fr	nyc, bankgok ou ostende?	12
24	2015-09-11 22:11:48.301	\N	2015-09-11 22:11:48.301	\N	0	NYC, Bankgok or Ostende?	en	nyc, bankgok or ostende?	12
25	2015-09-11 22:11:48.31	\N	2015-09-11 22:11:48.31	\N	0	Je veux un lit!	fr	je veux un lit!	13
26	2015-09-11 22:11:48.313	\N	2015-09-11 22:11:48.313	\N	0	I want a bed!	en	i want a bed!	13
27	2015-09-11 22:11:48.322	\N	2015-09-11 22:11:48.322	\N	0	Mon enfant mérite le meilleur!	fr	mon enfant merite le meilleur!	14
28	2015-09-11 22:11:48.325	\N	2015-09-11 22:11:48.325	\N	0	My child deserves the best!	en	my child deserves the best!	14
29	2015-09-11 22:11:48.334	\N	2015-09-11 22:11:48.334	\N	0	Je bricole moi-même!	fr	je bricole moi-meme!	15
30	2015-09-11 22:11:48.337	\N	2015-09-11 22:11:48.337	\N	0	Do it myself!	en	do it myself!	15
31	2015-09-11 22:11:48.347	\N	2015-09-11 22:11:48.348	\N	0	Je pourrais mourir pour un livre.	fr	je pourrais mourir pour un livre.	16
32	2015-09-11 22:11:48.354	\N	2015-09-11 22:11:48.354	\N	0	I could die for a book.	en	i could die for a book.	16
33	2015-09-11 22:11:48.363	\N	2015-09-11 22:11:48.363	\N	0	Mon jardin est un paradis!	fr	mon jardin est un paradis!	17
34	2015-09-11 22:11:48.366	\N	2015-09-11 22:11:48.366	\N	0	My garden is a paradise.	en	my garden is a paradise.	17
35	2015-09-11 22:11:48.375	\N	2015-09-11 22:11:48.375	\N	0	La musique n'est jamais assez forte!	fr	la musique n'est jamais assez forte!	18
36	2015-09-11 22:11:48.378	\N	2015-09-11 22:11:48.378	\N	0	The music is never loud enough.	en	the music is never loud enough.	18
37	2015-09-11 22:11:48.386	\N	2015-09-11 22:11:48.386	\N	0	Comme un geek!	fr	comme un geek!	19
38	2015-09-11 22:11:48.389	\N	2015-09-11 22:11:48.389	\N	0	Like a geek!	en	like a geek!	19
39	2015-09-11 22:11:48.397	\N	2015-09-11 22:11:48.397	\N	0	Qui veut jouer avec moi?	fr	qui veut jouer avec moi?	20
40	2015-09-11 22:11:48.4	\N	2015-09-11 22:11:48.4	\N	0	Who wanna play with me?	en	who wanna play with me?	20
41	2015-09-11 22:11:48.979	\N	2015-09-11 22:11:48.979	\N	0	Horeca	fr	horeca	21
42	2015-09-11 22:11:48.987	\N	2015-09-11 22:11:48.987	\N	0	Hôtel	fr	hotel	22
43	2015-09-11 22:11:48.995	\N	2015-09-11 22:11:48.995	\N	0	Auberge de jeunesse	fr	auberge de jeunesse	23
44	2015-09-11 22:11:49.003	\N	2015-09-11 22:11:49.003	\N	0	Camping	fr	camping	24
45	2015-09-11 22:11:49.01	\N	2015-09-11 22:11:49.01	\N	0	B&B	fr	b&b	25
46	2015-09-11 22:11:49.018	\N	2015-09-11 22:11:49.018	\N	0	Hôtel	fr	hotel	26
47	2015-09-11 22:11:49.026	\N	2015-09-11 22:11:49.026	\N	0	Restaurant	fr	restaurant	27
48	2015-09-11 22:11:49.034	\N	2015-09-11 22:11:49.034	\N	0	Fast Food	fr	fast food	28
49	2015-09-11 22:11:49.042	\N	2015-09-11 22:11:49.042	\N	0	Asiatique	fr	asiatique	29
50	2015-09-11 22:11:49.05	\N	2015-09-11 22:11:49.05	\N	0	Européen	fr	europeen	30
51	2015-09-11 22:11:49.057	\N	2015-09-11 22:11:49.057	\N	0	Africain	fr	africain	31
52	2015-09-11 22:11:49.064	\N	2015-09-11 22:11:49.064	\N	0	Américain	fr	americain	32
53	2015-09-11 22:11:49.07	\N	2015-09-11 22:11:49.07	\N	0	Belge	fr	belge	33
54	2015-09-11 22:11:49.078	\N	2015-09-11 22:11:49.078	\N	0	Brunch & Sweet	fr	brunch & sweet	34
55	2015-09-11 22:11:49.085	\N	2015-09-11 22:11:49.085	\N	0	Gastronomique/Bistronomie	fr	gastronomique/bistronomie	35
56	2015-09-11 22:11:49.092	\N	2015-09-11 22:11:49.092	\N	0	Café	fr	cafe	36
57	2015-09-11 22:11:49.099	\N	2015-09-11 22:11:49.099	\N	0	Bières	fr	bieres	37
58	2015-09-11 22:11:49.106	\N	2015-09-11 22:11:49.106	\N	0	Vins	fr	vins	38
59	2015-09-11 22:11:49.113	\N	2015-09-11 22:11:49.113	\N	0	Champagne	fr	champagne	39
60	2015-09-11 22:11:49.12	\N	2015-09-11 22:11:49.12	\N	0	Cocktails	fr	cocktails	40
61	2015-09-11 22:11:49.127	\N	2015-09-11 22:11:49.127	\N	0	Jus & Smoothies	fr	jus & smoothies	41
62	2015-09-11 22:11:49.136	\N	2015-09-11 22:11:49.136	\N	0	Traiteur	fr	traiteur	42
63	2015-09-11 22:11:49.143	\N	2015-09-11 22:11:49.143	\N	0	Asiatique	fr	asiatique	43
64	2015-09-11 22:11:49.15	\N	2015-09-11 22:11:49.15	\N	0	Européen	fr	europeen	44
65	2015-09-11 22:11:49.157	\N	2015-09-11 22:11:49.157	\N	0	Africain	fr	africain	45
66	2015-09-11 22:11:49.164	\N	2015-09-11 22:11:49.164	\N	0	Américain	fr	americain	46
67	2015-09-11 22:11:49.172	\N	2015-09-11 22:11:49.172	\N	0	Belge	fr	belge	47
68	2015-09-11 22:11:49.179	\N	2015-09-11 22:11:49.179	\N	0	Gastronomique	fr	gastronomique	48
69	2015-09-11 22:11:49.186	\N	2015-09-11 22:11:49.186	\N	0	Magasins	fr	magasins	49
70	2015-09-11 22:11:49.192	\N	2015-09-11 22:11:49.192	\N	0	Alimentation	fr	alimentation	50
71	2015-09-11 22:11:49.199	\N	2015-09-11 22:11:49.199	\N	0	Supermarché	fr	supermarche	51
72	2015-09-11 22:11:49.206	\N	2015-09-11 22:11:49.206	\N	0	Boucherie & Charcuterie	fr	boucherie & charcuterie	52
73	2015-09-11 22:11:49.212	\N	2015-09-11 22:11:49.212	\N	0	Poissonerie	fr	poissonerie	53
74	2015-09-11 22:11:49.218	\N	2015-09-11 22:11:49.218	\N	0	Boulangerie & Patisserie	fr	boulangerie & patisserie	54
75	2015-09-11 22:11:49.224	\N	2015-09-11 22:11:49.224	\N	0	Fromagerie	fr	fromagerie	55
76	2015-09-11 22:11:49.229	\N	2015-09-11 22:11:49.229	\N	0	Bières & Vins	fr	bieres & vins	56
77	2015-09-11 22:11:49.235	\N	2015-09-11 22:11:49.235	\N	0	Herbes & Epices	fr	herbes & epices	57
78	2015-09-11 22:11:49.241	\N	2015-09-11 22:11:49.241	\N	0	Confiseries & Chocolat	fr	confiseries & chocolat	58
79	2015-09-11 22:11:49.247	\N	2015-09-11 22:11:49.247	\N	0	Loisirs	fr	loisirs	59
80	2015-09-11 22:11:49.252	\N	2015-09-11 22:11:49.252	\N	0	Sport & Aventure	fr	sport & aventure	60
81	2015-09-11 22:11:49.257	\N	2015-09-11 22:11:49.257	\N	0	Maison & Décoration	fr	maison & decoration	61
82	2015-09-11 22:11:49.263	\N	2015-09-11 22:11:49.263	\N	0	Jardin & Fleurs	fr	jardin & fleurs	62
83	2015-09-11 22:11:49.268	\N	2015-09-11 22:11:49.268	\N	0	Jeux & Jouets	fr	jeux & jouets	63
84	2015-09-11 22:11:49.275	\N	2015-09-11 22:11:49.275	\N	0	Multimédia & Informatique	fr	multimedia & informatique	64
85	2015-09-11 22:11:49.287	\N	2015-09-11 22:11:49.287	\N	0	Animaux	fr	animaux	65
86	2015-09-11 22:11:49.293	\N	2015-09-11 22:11:49.293	\N	0	Voyages	fr	voyages	66
87	2015-09-11 22:11:49.3	\N	2015-09-11 22:11:49.3	\N	0	Livres & Journaux	fr	livres & journaux	67
88	2015-09-11 22:11:49.306	\N	2015-09-11 22:11:49.306	\N	0	Mode	fr	mode	68
89	2015-09-11 22:11:49.312	\N	2015-09-11 22:11:49.312	\N	0	Vêtements Enfants	fr	vetements enfants	69
90	2015-09-11 22:11:49.318	\N	2015-09-11 22:11:49.318	\N	0	Vêtements Hommes	fr	vetements hommes	70
91	2015-09-11 22:11:49.324	\N	2015-09-11 22:11:49.325	\N	0	Vêtements Femmes	fr	vetements femmes	71
92	2015-09-11 22:11:49.331	\N	2015-09-11 22:11:49.331	\N	0	Chaussures	fr	chaussures	72
93	2015-09-11 22:11:49.337	\N	2015-09-11 22:11:49.337	\N	0	Bijoux & Montres	fr	bijoux & montres	73
94	2015-09-11 22:11:49.343	\N	2015-09-11 22:11:49.343	\N	0	Parfums & Cosmétique	fr	parfums & cosmetique	74
95	2015-09-11 22:11:49.35	\N	2015-09-11 22:11:49.35	\N	0	Lingerie	fr	lingerie	75
96	2015-09-11 22:11:49.357	\N	2015-09-11 22:11:49.357	\N	0	Lunettes	fr	lunettes	76
97	2015-09-11 22:11:49.364	\N	2015-09-11 22:11:49.364	\N	0	Utile	fr	utile	77
98	2015-09-11 22:11:49.371	\N	2015-09-11 22:11:49.371	\N	0	Electroménager	fr	electromenager	78
99	2015-09-11 22:11:49.378	\N	2015-09-11 22:11:49.378	\N	0	Bricolage	fr	bricolage	79
100	2015-09-11 22:11:49.385	\N	2015-09-11 22:11:49.385	\N	0	Papeterie	fr	papeterie	80
101	2015-09-11 22:11:49.392	\N	2015-09-11 22:11:49.392	\N	0	Voiture	fr	voiture	81
102	2015-09-11 22:11:49.398	\N	2015-09-11 22:11:49.398	\N	0	Droguerie	fr	droguerie	82
103	2015-09-11 22:11:49.403	\N	2015-09-11 22:11:49.403	\N	0	Vélo	fr	velo	83
104	2015-09-11 22:11:49.409	\N	2015-09-11 22:11:49.409	\N	0	Beauté & Bien Être	fr	beaute & bien etre	84
105	2015-09-11 22:11:49.416	\N	2015-09-11 22:11:49.416	\N	0	Soins	fr	soins	85
106	2015-09-11 22:11:49.422	\N	2015-09-11 22:11:49.422	\N	0	Coiffure	fr	coiffure	86
107	2015-09-11 22:11:49.427	\N	2015-09-11 22:11:49.427	\N	0	Esthétique	fr	esthetique	87
108	2015-09-11 22:11:49.433	\N	2015-09-11 22:11:49.433	\N	0	Manicure & Pédicure	fr	manicure & pedicure	88
109	2015-09-11 22:11:49.439	\N	2015-09-11 22:11:49.439	\N	0	Massage	fr	massage	89
110	2015-09-11 22:11:49.444	\N	2015-09-11 22:11:49.444	\N	0	Tatouage & Piercing	fr	tatouage & piercing	90
111	2015-09-11 22:11:49.449	\N	2015-09-11 22:11:49.449	\N	0	Toilettage	fr	toilettage	91
112	2015-09-11 22:11:49.454	\N	2015-09-11 22:11:49.454	\N	0	Etablissement	fr	etablissement	92
113	2015-09-11 22:11:49.459	\N	2015-09-11 22:11:49.459	\N	0	Sauna & Hammam	fr	sauna & hammam	93
114	2015-09-11 22:11:49.464	\N	2015-09-11 22:11:49.464	\N	0	Solarium	fr	solarium	94
115	2015-09-11 22:11:49.47	\N	2015-09-11 22:11:49.47	\N	0	Santé	fr	sante	95
116	2015-09-11 22:11:49.475	\N	2015-09-11 22:11:49.475	\N	0	Médecine Conventionnelle	fr	medecine conventionnelle	96
117	2015-09-11 22:11:49.481	\N	2015-09-11 22:11:49.481	\N	0	Médecine Générale	fr	medecine generale	97
118	2015-09-11 22:11:49.487	\N	2015-09-11 22:11:49.487	\N	0	Ophtalmologie	fr	ophtalmologie	98
119	2015-09-11 22:11:49.493	\N	2015-09-11 22:11:49.493	\N	0	ORL	fr	orl	99
120	2015-09-11 22:11:49.504	\N	2015-09-11 22:11:49.504	\N	0	Gynécologie	fr	gynecologie	100
121	2015-09-11 22:11:49.511	\N	2015-09-11 22:11:49.511	\N	0	Dentisterie	fr	dentisterie	101
122	2015-09-11 22:11:49.517	\N	2015-09-11 22:11:49.517	\N	0	Kinésithérapie	fr	kinesitherapie	102
123	2015-09-11 22:11:49.523	\N	2015-09-11 22:11:49.523	\N	0	Dermatologie	fr	dermatologie	103
124	2015-09-11 22:11:49.528	\N	2015-09-11 22:11:49.528	\N	0	Psychologie	fr	psychologie	104
125	2015-09-11 22:11:49.534	\N	2015-09-11 22:11:49.534	\N	0	Médecine Non-Conventionnelle	fr	medecine non-conventionnelle	105
126	2015-09-11 22:11:49.54	\N	2015-09-11 22:11:49.54	\N	0	Acupuncture	fr	acupuncture	106
127	2015-09-11 22:11:49.546	\N	2015-09-11 22:11:49.546	\N	0	Ostéopatie	fr	osteopatie	107
128	2015-09-11 22:11:49.551	\N	2015-09-11 22:11:49.551	\N	0	Homéopathie	fr	homeopathie	108
129	2015-09-11 22:11:49.557	\N	2015-09-11 22:11:49.557	\N	0	Hypnose	fr	hypnose	109
130	2015-09-11 22:11:49.563	\N	2015-09-11 22:11:49.563	\N	0	Naturopathie	fr	naturopathie	110
131	2015-09-11 22:11:49.57	\N	2015-09-11 22:11:49.57	\N	0	Autres	fr	autres	111
132	2015-09-11 22:11:49.576	\N	2015-09-11 22:11:49.576	\N	0	Pharmacie	fr	pharmacie	112
133	2015-09-11 22:11:49.583	\N	2015-09-11 22:11:49.583	\N	0	Hôpitaux	fr	hopitaux	113
134	2015-09-11 22:11:49.588	\N	2015-09-11 22:11:49.588	\N	0	Centres Médicaux	fr	centres medicaux	114
135	2015-09-11 22:11:49.595	\N	2015-09-11 22:11:49.595	\N	0	Vétérinaire	fr	veterinaire	115
136	2015-09-11 22:11:49.601	\N	2015-09-11 22:11:49.601	\N	0	Services de proximité	fr	services de proximite	116
137	2015-09-11 22:11:49.609	\N	2015-09-11 22:11:49.609	\N	0	Création & Réparation	fr	creation & reparation	117
138	2015-09-11 22:11:49.617	\N	2015-09-11 22:11:49.617	\N	0	Cordonnerie & Serrurrerie	fr	cordonnerie & serrurrerie	118
139	2015-09-11 22:11:49.623	\N	2015-09-11 22:11:49.623	\N	0	Couture & Retouches	fr	couture & retouches	119
140	2015-09-11 22:11:49.629	\N	2015-09-11 22:11:49.629	\N	0	Informatique	fr	informatique	120
141	2015-09-11 22:11:49.634	\N	2015-09-11 22:11:49.634	\N	0	Smartphones & Tablettes	fr	smartphones & tablettes	121
142	2015-09-11 22:11:49.64	\N	2015-09-11 22:11:49.64	\N	0	Plombier	fr	plombier	122
143	2015-09-11 22:11:49.645	\N	2015-09-11 22:11:49.645	\N	0	Electricien	fr	electricien	123
144	2015-09-11 22:11:49.654	\N	2015-09-11 22:11:49.654	\N	0	Jardinier	fr	jardinier	124
145	2015-09-11 22:11:49.664	\N	2015-09-11 22:11:49.664	\N	0	Finances & Droit	fr	finances & droit	125
146	2015-09-11 22:11:49.668	\N	2015-09-11 22:11:49.668	\N	0	Banque	fr	banque	126
147	2015-09-11 22:11:49.673	\N	2015-09-11 22:11:49.673	\N	0	Mistercash	fr	mistercash	127
148	2015-09-11 22:11:49.678	\N	2015-09-11 22:11:49.678	\N	0	Assurances	fr	assurances	128
149	2015-09-11 22:11:49.683	\N	2015-09-11 22:11:49.683	\N	0	Avocat	fr	avocat	129
150	2015-09-11 22:11:49.688	\N	2015-09-11 22:11:49.688	\N	0	Notaire	fr	notaire	130
151	2015-09-11 22:11:49.694	\N	2015-09-11 22:11:49.694	\N	0	Comptable	fr	comptable	131
152	2015-09-11 22:11:49.699	\N	2015-09-11 22:11:49.699	\N	0	Voiture	fr	voiture	132
153	2015-09-11 22:11:49.705	\N	2015-09-11 22:11:49.705	\N	0	Garage	fr	garage	133
154	2015-09-11 22:11:49.711	\N	2015-09-11 22:11:49.711	\N	0	Station Essence	fr	station essence	134
155	2015-09-11 22:11:49.717	\N	2015-09-11 22:11:49.717	\N	0	Carwash	fr	carwash	135
156	2015-09-11 22:11:49.723	\N	2015-09-11 22:11:49.723	\N	0	Parking	fr	parking	136
157	2015-09-11 22:11:49.73	\N	2015-09-11 22:11:49.73	\N	0	Pare-brise	fr	pare-brise	137
158	2015-09-11 22:11:49.735	\N	2015-09-11 22:11:49.735	\N	0	Pneus	fr	pneus	138
159	2015-09-11 22:11:49.74	\N	2015-09-11 22:11:49.74	\N	0	Contrôle Technique	fr	controle technique	139
160	2015-09-11 22:11:49.745	\N	2015-09-11 22:11:49.745	\N	0	Autres	fr	autres	140
161	2015-09-11 22:11:49.749	\N	2015-09-11 22:11:49.749	\N	0	Imprimerie	fr	imprimerie	141
162	2015-09-11 22:11:49.754	\N	2015-09-11 22:11:49.754	\N	0	Garderie & Crèche	fr	garderie & creche	142
163	2015-09-11 22:11:49.759	\N	2015-09-11 22:11:49.759	\N	0	Agence Immobilière	fr	agence immobiliere	143
164	2015-09-11 22:11:49.767	\N	2015-09-11 22:11:49.767	\N	0	Téléphonie & Internet	fr	telephonie & internet	144
165	2015-09-11 22:11:49.773	\N	2015-09-11 22:11:49.773	\N	0	Centre de Repassage	fr	centre de repassage	145
166	2015-09-11 22:11:49.78	\N	2015-09-11 22:11:49.78	\N	0	Etudes & Formations	fr	etudes & formations	146
167	2015-09-11 22:11:49.785	\N	2015-09-11 22:11:49.785	\N	0	Détente	fr	detente	147
168	2015-09-11 22:11:49.79	\N	2015-09-11 22:11:49.79	\N	0	Culture	fr	culture	148
169	2015-09-11 22:11:49.794	\N	2015-09-11 22:11:49.794	\N	0	Théâtre	fr	theatre	149
170	2015-09-11 22:11:49.799	\N	2015-09-11 22:11:49.799	\N	0	Opéra	fr	opera	150
171	2015-09-11 22:11:49.804	\N	2015-09-11 22:11:49.804	\N	0	Concert	fr	concert	151
172	2015-09-11 22:11:49.808	\N	2015-09-11 22:11:49.808	\N	0	Cirque	fr	cirque	152
173	2015-09-11 22:11:49.813	\N	2015-09-11 22:11:49.813	\N	0	Musée	fr	musee	153
174	2015-09-11 22:11:49.818	\N	2015-09-11 22:11:49.818	\N	0	Cinéma	fr	cinema	154
175	2015-09-11 22:11:49.824	\N	2015-09-11 22:11:49.824	\N	0	Galerie	fr	galerie	155
176	2015-09-11 22:11:49.83	\N	2015-09-11 22:11:49.83	\N	0	Zoo & Aquarium	fr	zoo & aquarium	156
177	2015-09-11 22:11:49.835	\N	2015-09-11 22:11:49.835	\N	0	Soirées	fr	soirees	157
178	2015-09-11 22:11:49.84	\N	2015-09-11 22:11:49.84	\N	0	Discothèque	fr	discotheque	158
179	2015-09-11 22:11:49.845	\N	2015-09-11 22:11:49.845	\N	0	Karaoké	fr	karaoke	159
180	2015-09-11 22:11:49.85	\N	2015-09-11 22:11:49.85	\N	0	Bar Lounge	fr	bar lounge	160
181	2015-09-11 22:11:49.855	\N	2015-09-11 22:11:49.855	\N	0	Bowling	fr	bowling	161
182	2015-09-11 22:11:49.864	\N	2015-09-11 22:11:49.864	\N	0	Café-Théâtre	fr	cafe-theatre	162
183	2015-09-11 22:11:49.87	\N	2015-09-11 22:11:49.87	\N	0	Bar Holebi	fr	bar holebi	163
184	2015-09-11 22:11:49.876	\N	2015-09-11 22:11:49.876	\N	0	Sport	fr	sport	164
185	2015-09-11 22:11:49.881	\N	2015-09-11 22:11:49.881	\N	0	Tennis	fr	tennis	165
186	2015-09-11 22:11:49.886	\N	2015-09-11 22:11:49.886	\N	0	Badminton & Squash	fr	badminton & squash	166
187	2015-09-11 22:11:49.891	\N	2015-09-11 22:11:49.891	\N	0	Escalade	fr	escalade	167
188	2015-09-11 22:11:49.895	\N	2015-09-11 22:11:49.895	\N	0	Piscine	fr	piscine	168
189	2015-09-11 22:11:49.9	\N	2015-09-11 22:11:49.9	\N	0	Fitness & Musculation	fr	fitness & musculation	169
190	2015-09-11 22:11:49.904	\N	2015-09-11 22:11:49.904	\N	0	Karting	fr	karting	170
191	2015-09-11 22:11:49.908	\N	2015-09-11 22:11:49.908	\N	0	Danse & Yoga	fr	danse & yoga	171
192	2015-09-11 22:11:49.913	\N	2015-09-11 22:11:49.913	\N	0	Golf	fr	golf	172
193	2015-09-11 22:11:49.917	\N	2015-09-11 22:11:49.917	\N	0	Autres	fr	autres	173
194	2015-09-11 22:11:49.921	\N	2015-09-11 22:11:49.921	\N	0	Casino	fr	casino	174
195	2015-09-11 22:11:49.926	\N	2015-09-11 22:11:49.926	\N	0	Jeux de Société	fr	jeux de societe	175
196	2015-09-11 22:11:49.93	\N	2015-09-11 22:11:49.93	\N	0	Jeux Vidéo	fr	jeux video	176
197	2015-09-11 22:11:49.934	\N	2015-09-11 22:11:49.934	\N	0	Jeux d'Enfants	fr	jeux d'enfants	177
198	2015-09-11 22:11:49.938	\N	2015-09-11 22:11:49.938	\N	0	Administrations Publiques	fr	administrations publiques	178
199	2015-09-11 22:11:49.941	\N	2015-09-11 22:11:49.941	\N	0	Services Pratiques	fr	services pratiques	179
200	2015-09-11 22:11:49.946	\N	2015-09-11 22:11:49.946	\N	0	Poste	fr	poste	180
201	2015-09-11 22:11:49.95	\N	2015-09-11 22:11:49.95	\N	0	Police	fr	police	181
202	2015-09-11 22:11:49.954	\N	2015-09-11 22:11:49.954	\N	0	Pompiers	fr	pompiers	182
203	2015-09-11 22:11:49.959	\N	2015-09-11 22:11:49.959	\N	0	Bibliothèque	fr	bibliotheque	183
204	2015-09-11 22:11:49.969	\N	2015-09-11 22:11:49.969	\N	0	Communal	fr	communal	184
205	2015-09-11 22:11:49.975	\N	2015-09-11 22:11:49.975	\N	0	Etat Civil & Population	fr	etat civil & population	185
206	2015-09-11 22:11:49.979	\N	2015-09-11 22:11:49.979	\N	0	Energie	fr	energie	186
207	2015-09-11 22:11:49.984	\N	2015-09-11 22:11:49.984	\N	0	Emploi	fr	emploi	187
208	2015-09-11 22:11:49.988	\N	2015-09-11 22:11:49.988	\N	0	Urbanisme	fr	urbanisme	188
209	2015-09-11 22:11:49.992	\N	2015-09-11 22:11:49.992	\N	0	CPAS	fr	cpas	189
210	2015-09-11 22:11:49.997	\N	2015-09-11 22:11:49.997	\N	0	Office du Tourisme	fr	office du tourisme	190
211	2015-09-11 22:11:50.001	\N	2015-09-11 22:11:50.001	\N	0	Fédéral & International	fr	federal & international	191
212	2015-09-11 22:11:50.006	\N	2015-09-11 22:11:50.006	\N	0	Economie	fr	economie	192
213	2015-09-11 22:11:50.01	\N	2015-09-11 22:11:50.01	\N	0	Emploi	fr	emploi	193
214	2015-09-11 22:11:50.014	\N	2015-09-11 22:11:50.014	\N	0	Justice	fr	justice	194
215	2015-09-11 22:11:50.019	\N	2015-09-11 22:11:50.019	\N	0	Mobilité	fr	mobilite	195
216	2015-09-11 22:11:50.023	\N	2015-09-11 22:11:50.023	\N	0	Impôts	fr	impots	196
217	2015-09-11 22:11:50.027	\N	2015-09-11 22:11:50.027	\N	0	Logement	fr	logement	197
218	2015-09-11 22:11:50.032	\N	2015-09-11 22:11:50.032	\N	0	Santé	fr	sante	198
219	2015-09-11 22:11:50.039	\N	2015-09-11 22:11:50.039	\N	0	Ambassade	fr	ambassade	199
\.


--
-- Name: translationvalue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('translationvalue_id_seq', 219, true);


--
-- Name: abstractpublication_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY abstractpublication
    ADD CONSTRAINT abstractpublication_pkey PRIMARY KEY (id);


--
-- Name: account_customerinterest_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY account_customerinterest
    ADD CONSTRAINT account_customerinterest_pkey PRIMARY KEY (account_id, customerinterests_id);


--
-- Name: account_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: address_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- Name: business_category_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY business_category
    ADD CONSTRAINT business_category_pkey PRIMARY KEY (category, business);


--
-- Name: business_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY business
    ADD CONSTRAINT business_pkey PRIMARY KEY (id);


--
-- Name: businesscategory_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY businesscategory
    ADD CONSTRAINT businesscategory_pkey PRIMARY KEY (id);


--
-- Name: businessschedule_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY businessschedule
    ADD CONSTRAINT businessschedule_pkey PRIMARY KEY (id);


--
-- Name: businessschedulepart_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY businessschedulepart
    ADD CONSTRAINT businessschedulepart_pkey PRIMARY KEY (id);


--
-- Name: categoryinterestlink_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY categoryinterestlink
    ADD CONSTRAINT categoryinterestlink_pkey PRIMARY KEY (id);


--
-- Name: customerinterest_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY customerinterest
    ADD CONSTRAINT customerinterest_pkey PRIMARY KEY (id);


--
-- Name: facebookcredential_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY facebookcredential
    ADD CONSTRAINT facebookcredential_pkey PRIMARY KEY (id);


--
-- Name: followlink_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY followlink
    ADD CONSTRAINT followlink_pkey PRIMARY KEY (id);


--
-- Name: logincredential_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY logincredential
    ADD CONSTRAINT logincredential_pkey PRIMARY KEY (id);


--
-- Name: session_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: storedfile_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY storedfile
    ADD CONSTRAINT storedfile_pkey PRIMARY KEY (id);


--
-- Name: translation_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY translation
    ADD CONSTRAINT translation_pkey PRIMARY KEY (id);


--
-- Name: translationvalue_pkey; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY translationvalue
    ADD CONSTRAINT translationvalue_pkey PRIMARY KEY (id);


--
-- Name: uk_3neepbdd5qhvjoo3go8lpjad6; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY customerinterest
    ADD CONSTRAINT uk_3neepbdd5qhvjoo3go8lpjad6 UNIQUE (name);


--
-- Name: uk_cs5bnaggwuluahrdh8mbs1rpe; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY account
    ADD CONSTRAINT uk_cs5bnaggwuluahrdh8mbs1rpe UNIQUE (email);


--
-- Name: uk_jvavqp5xskd23ovcgxn2rp982; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY business
    ADD CONSTRAINT uk_jvavqp5xskd23ovcgxn2rp982 UNIQUE (account_id);


--
-- Name: uk_lb4s0fxvqona00ffc0w0ft9sq; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY logincredential
    ADD CONSTRAINT uk_lb4s0fxvqona00ffc0w0ft9sq UNIQUE (account_id);


--
-- Name: uk_mskwv9nr8fd3pb70tlpex5oiu; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY facebookcredential
    ADD CONSTRAINT uk_mskwv9nr8fd3pb70tlpex5oiu UNIQUE (userid);


--
-- Name: uk_qkb0sibhqb59gyrpb94gsjt8j; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY businesscategory
    ADD CONSTRAINT uk_qkb0sibhqb59gyrpb94gsjt8j UNIQUE (name);


--
-- Name: uk_qwghpx5s01gxmpfoh05umhsxf; Type: CONSTRAINT; Schema: public; Owner: play; Tablespace: 
--

ALTER TABLE ONLY facebookcredential
    ADD CONSTRAINT uk_qwghpx5s01gxmpfoh05umhsxf UNIQUE (account_id);


--
-- Name: fk_10na602yh2ycnfpw4nr1bd0du; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY session
    ADD CONSTRAINT fk_10na602yh2ycnfpw4nr1bd0du FOREIGN KEY (account_id) REFERENCES account(id);


--
-- Name: fk_256k0qjaoo8bcmdyxg7je2634; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY categoryinterestlink
    ADD CONSTRAINT fk_256k0qjaoo8bcmdyxg7je2634 FOREIGN KEY (customerinterest_id) REFERENCES customerinterest(id);


--
-- Name: fk_38b64ywr72ld53masw4vvl58b; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY businessschedule
    ADD CONSTRAINT fk_38b64ywr72ld53masw4vvl58b FOREIGN KEY (business_id) REFERENCES business(id);


--
-- Name: fk_4chinspisy27q2e9unwqdmat1; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY followlink
    ADD CONSTRAINT fk_4chinspisy27q2e9unwqdmat1 FOREIGN KEY (business_id) REFERENCES business(id);


--
-- Name: fk_5whd67hrgsopca98cytmb8li1; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY storedfile
    ADD CONSTRAINT fk_5whd67hrgsopca98cytmb8li1 FOREIGN KEY (businessgallerypicture_id) REFERENCES business(id);


--
-- Name: fk_7rad1s0ji1q3ed2pnnn4g8oq3; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY account_customerinterest
    ADD CONSTRAINT fk_7rad1s0ji1q3ed2pnnn4g8oq3 FOREIGN KEY (customerinterests_id) REFERENCES customerinterest(id);


--
-- Name: fk_8x7x7d45e1jxta3xkpsau0mqx; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY business
    ADD CONSTRAINT fk_8x7x7d45e1jxta3xkpsau0mqx FOREIGN KEY (landscape_id) REFERENCES storedfile(id);


--
-- Name: fk_94pwj0kfgpwlkp3iws47p4h0d; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY business_category
    ADD CONSTRAINT fk_94pwj0kfgpwlkp3iws47p4h0d FOREIGN KEY (business) REFERENCES business(id);


--
-- Name: fk_b3u7dhuspbk1cxg9m4102mpiw; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY account_customerinterest
    ADD CONSTRAINT fk_b3u7dhuspbk1cxg9m4102mpiw FOREIGN KEY (account_id) REFERENCES account(id);


--
-- Name: fk_bis0ix8p4cagdiu4wna6ghfcg; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY storedfile
    ADD CONSTRAINT fk_bis0ix8p4cagdiu4wna6ghfcg FOREIGN KEY (publication_id) REFERENCES abstractpublication(id);


--
-- Name: fk_dbvajw108i0m9pdxaxno0jr5e; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY businesscategory
    ADD CONSTRAINT fk_dbvajw108i0m9pdxaxno0jr5e FOREIGN KEY (translationname_id) REFERENCES translation(id);


--
-- Name: fk_dg4435wwm356vbnwi3m6gh8m9; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY storedfile
    ADD CONSTRAINT fk_dg4435wwm356vbnwi3m6gh8m9 FOREIGN KEY (account_id) REFERENCES account(id);


--
-- Name: fk_fqkdggoknadoc01i9a2ac07r3; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY businessschedulepart
    ADD CONSTRAINT fk_fqkdggoknadoc01i9a2ac07r3 FOREIGN KEY (businessschedule_id) REFERENCES businessschedule(id);


--
-- Name: fk_geqnp79hkk4j9v4mq19kpp7w7; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY abstractpublication
    ADD CONSTRAINT fk_geqnp79hkk4j9v4mq19kpp7w7 FOREIGN KEY (business_id) REFERENCES business(id);


--
-- Name: fk_hkc0jqlfcippaislqsib4wo2w; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY translationvalue
    ADD CONSTRAINT fk_hkc0jqlfcippaislqsib4wo2w FOREIGN KEY (translation_id) REFERENCES translation(id);


--
-- Name: fk_js778xt80celdcwp5qyf0s24l; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY business_category
    ADD CONSTRAINT fk_js778xt80celdcwp5qyf0s24l FOREIGN KEY (category) REFERENCES businesscategory(id);


--
-- Name: fk_jvavqp5xskd23ovcgxn2rp982; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY business
    ADD CONSTRAINT fk_jvavqp5xskd23ovcgxn2rp982 FOREIGN KEY (account_id) REFERENCES account(id);


--
-- Name: fk_l4fapl05tpfuhchcur8ffw8eq; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY business
    ADD CONSTRAINT fk_l4fapl05tpfuhchcur8ffw8eq FOREIGN KEY (illustration_id) REFERENCES storedfile(id);


--
-- Name: fk_lb4s0fxvqona00ffc0w0ft9sq; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY logincredential
    ADD CONSTRAINT fk_lb4s0fxvqona00ffc0w0ft9sq FOREIGN KEY (account_id) REFERENCES account(id);


--
-- Name: fk_ml7vua0s0tmeghhrilhekh2ah; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY categoryinterestlink
    ADD CONSTRAINT fk_ml7vua0s0tmeghhrilhekh2ah FOREIGN KEY (businesscategory_id) REFERENCES businesscategory(id);


--
-- Name: fk_mpe4dnpn9qglc7svlaaccaxyp; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY followlink
    ADD CONSTRAINT fk_mpe4dnpn9qglc7svlaaccaxyp FOREIGN KEY (account_id) REFERENCES account(id);


--
-- Name: fk_o96qg5v5hndsr60e01r0fyd9h; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY customerinterest
    ADD CONSTRAINT fk_o96qg5v5hndsr60e01r0fyd9h FOREIGN KEY (translationname_id) REFERENCES translation(id);


--
-- Name: fk_o9wkdpo1g3tpmi89hh7fmin4s; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY businesscategory
    ADD CONSTRAINT fk_o9wkdpo1g3tpmi89hh7fmin4s FOREIGN KEY (parent_id) REFERENCES businesscategory(id);


--
-- Name: fk_or5dbsbtme3w24c24kla8y8ci; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY account
    ADD CONSTRAINT fk_or5dbsbtme3w24c24kla8y8ci FOREIGN KEY (selectedaddress_id) REFERENCES address(id);


--
-- Name: fk_pk5ah14oqgqhc1jeaoq1llhmd; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY abstractpublication
    ADD CONSTRAINT fk_pk5ah14oqgqhc1jeaoq1llhmd FOREIGN KEY (interest_id) REFERENCES customerinterest(id);


--
-- Name: fk_qt0bj0617muanuync9plh35ul; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY business
    ADD CONSTRAINT fk_qt0bj0617muanuync9plh35ul FOREIGN KEY (address_id) REFERENCES address(id);


--
-- Name: fk_qwghpx5s01gxmpfoh05umhsxf; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY facebookcredential
    ADD CONSTRAINT fk_qwghpx5s01gxmpfoh05umhsxf FOREIGN KEY (account_id) REFERENCES account(id);


--
-- Name: fk_s34qxwjkunlxds94x3m28j0xg; Type: FK CONSTRAINT; Schema: public; Owner: play
--

ALTER TABLE ONLY address
    ADD CONSTRAINT fk_s34qxwjkunlxds94x3m28j0xg FOREIGN KEY (account_id) REFERENCES account(id);


--
-- PostgreSQL database dump complete
--

