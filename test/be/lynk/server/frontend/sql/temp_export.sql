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
Promotion	1	2015-08-28 01:17:46.166	\N	2015-08-28 01:17:46.166	\N	0		2015-08-28 03:17:46.166	tartes aux fraises	2015-08-27 01:17:46.166	Tartes aux fraises	1	0.66666666666666663	12	8		1	\N
BusinessNotification	2	2015-08-28 01:17:47.494	\N	2015-08-28 01:17:47.494	\N	0		2015-08-28 07:17:47.494	voici notre derniere creation pour l'anniversaire d'enzo!	2015-08-27 01:17:47.494	Voici notre dernière création pour l'anniversaire d'Enzo!	\N	\N	\N	\N	\N	1	\N
BusinessNotification	3	2015-08-28 01:17:49.692	\N	2015-08-28 01:17:49.692	\N	0		2015-08-29 01:17:49.692	n'oubliez pas de feter papa ce dimanche nous, on est prets!	2015-08-27 01:17:49.692	N'oubliez pas de fêter Papa ce dimanche… Nous, on est prêts!	\N	\N	\N	\N	\N	1	\N
BusinessNotification	4	2015-08-28 01:17:51.002	\N	2015-08-28 01:17:51.002	\N	0		2015-08-30 01:17:51.002	bienvenue a l'expo "miel dans tous ses etats" au centre culturel!	2015-08-27 01:17:51.002	Bienvenue à l'expo "Miel dans tous ses états" au Centre Culturel!	\N	\N	\N	\N	\N	1	\N
BusinessNotification	5	2015-08-28 01:17:52.191	\N	2015-08-28 01:17:52.191	\N	0		2015-08-29 00:17:52.191	saviez-vous que tout les fruits que nous utilisons sont bio et locaux?	2015-08-27 01:17:52.191	Saviez-vous que tout les fruits que nous utilisons sont bio et locaux?	\N	\N	\N	\N	\N	1	\N
BusinessNotification	6	2015-08-28 01:17:53.559	\N	2015-08-28 01:17:53.559	\N	0		2015-08-29 20:17:53.558	nous serons exceptionellement fermes ce weekend!	2015-08-27 01:17:53.559	Nous serons exceptionellement fermés ce weekend!	\N	\N	\N	\N	\N	1	\N
Promotion	7	2015-08-28 01:17:53.569	\N	2015-08-28 01:17:53.569	\N	0		2015-08-29 00:17:53.569	pots de miel 300ml	2015-08-27 01:17:53.569	Pots de miel 300ml	\N	0.100000000000000006	\N	\N		1	\N
Promotion	8	2015-08-28 01:17:53.573	\N	2015-08-28 01:17:53.573	\N	0		2015-08-28 07:17:53.573	2 + 1 couque gratuite	2015-08-27 01:17:53.573	2 + 1 couque gratuite	\N	\N	\N	\N		1	\N
BusinessNotification	9	2015-08-28 01:17:53.581	\N	2015-08-28 01:17:53.581	\N	0		2015-08-28 06:17:53.581	bientot la saison des barbecues preparez-vous!  :)	2015-08-27 01:17:53.581	Bientôt la saison des barbecues… Préparez-vous!  :)	\N	\N	\N	\N	\N	2	\N
BusinessNotification	10	2015-08-28 01:17:55.432	\N	2015-08-28 01:17:55.432	\N	0		2015-08-29 00:17:55.432	je vous presente mr marc, mon fournisseur de buf de qualite du brabant wallon!	2015-08-27 01:17:55.432	Je vous présente Mr Marc, mon fournisseur de bœuf de qualité du Brabant Wallon!	\N	\N	\N	\N	\N	2	\N
BusinessNotification	11	2015-08-28 01:17:56.627	\N	2015-08-28 01:17:56.627	\N	0		2015-08-30 18:17:56.627	faites mariner vos viandes des la veille au soir pour un meilleur gout!	2015-08-27 01:17:56.627	Faites mariner vos viandes dès la veille au soir pour un meilleur goût!	\N	\N	\N	\N	\N	2	\N
BusinessNotification	12	2015-08-28 01:17:57.986	\N	2015-08-28 01:17:57.986	\N	0		2015-08-31 16:17:57.986	nouveau boudin blanc maison a decouvrir!	2015-08-27 01:17:57.986	Nouveau boudin blanc maison à découvrir!	\N	\N	\N	\N	\N	2	\N
BusinessNotification	13	2015-08-28 01:17:59.495	\N	2015-08-28 01:17:59.495	\N	0		2015-08-28 04:17:59.495	l'equipe au complet en plein travail!	2015-08-27 01:17:59.495	L'équipe au complet en plein travail!	\N	\N	\N	\N	\N	2	\N
Promotion	14	2015-08-28 01:18:01.131	\N	2015-08-28 01:18:01.131	\N	0		2015-08-28 05:18:01.131	brochettes de poulet	2015-08-27 01:18:01.131	Brochettes de poulet	\N	0.149999999999999994	\N	\N		2	\N
Promotion	15	2015-08-28 01:18:05.74	\N	2015-08-28 01:18:05.74	\N	0		2015-08-29 00:18:05.74	sauce banzai	2015-08-27 01:18:05.74	Sauce Banzaï	\N	0.200000000000000011	\N	\N		2	\N
Promotion	16	2015-08-28 01:18:07.105	\N	2015-08-28 01:18:07.105	\N	0		2015-08-31 05:18:07.105	roti de porc	2015-08-27 01:18:07.105	Roti de porc	0.25	0.100000000000000006	15	6	kg	2	\N
Promotion	17	2015-08-28 01:18:08.985	\N	2015-08-28 01:18:08.985	\N	0		2015-08-28 04:18:08.985	pate au poivre vert	2015-08-27 01:18:08.985	Pâté au poivre vert	\N	0.149999999999999994	25	2	kg	2	\N
BusinessNotification	18	2015-08-28 01:18:15.87	\N	2015-08-28 01:18:15.87	\N	0		2015-08-28 06:18:15.87	venez nous retrouvez tous les mardis des 18h00 pour l'aquagym!	2015-08-27 01:18:15.87	Venez nous retrouvez tous les mardis dès 18h00 pour l'aquagym!	\N	\N	\N	\N	\N	3	\N
BusinessNotification	19	2015-08-28 01:18:22.077	\N	2015-08-28 01:18:22.077	\N	0		2015-08-28 10:18:22.077	les 6iemes primaire de saint michel sont venus nous dire bonjour!	2015-08-27 01:18:22.077	Les 6ièmes primaire de Saint Michel sont venus nous dire bonjour!	\N	\N	\N	\N	\N	3	\N
BusinessNotification	20	2015-08-28 01:18:23.965	\N	2015-08-28 01:18:23.965	\N	0		2015-08-29 20:18:23.965	fiers de notre athlete national!	2015-08-27 01:18:23.965	Fiers de notre athlète national!	\N	\N	\N	\N	\N	3	\N
BusinessNotification	21	2015-08-28 01:18:25.318	\N	2015-08-28 01:18:25.318	\N	0		2015-08-31 05:18:25.318	il fait chaud dehors, il fait juste bon dedans 28c sous l'eau!	2015-08-27 01:18:25.318	Il fait chaud dehors, il fait juste bon dedans… 28°C sous l'eau!	\N	\N	\N	\N	\N	3	\N
BusinessNotification	22	2015-08-28 01:18:26.756	\N	2015-08-28 01:18:26.756	\N	0		2015-08-28 04:18:26.756	toutes les 2 heures, les sols de nos cabines sont nettoyes a fond!	2015-08-27 01:18:26.756	Toutes les 2 heures, les sols de nos cabines sont nettoyés à fond!	\N	\N	\N	\N	\N	3	\N
Promotion	23	2015-08-28 01:18:27.917	\N	2015-08-28 01:18:27.917	\N	0		2015-08-28 10:18:27.917	entree adulte "soiree"	2015-08-27 01:18:27.917	Entrée adulte "Soirée"	\N	0.300000000000000044	\N	\N		3	\N
Promotion	24	2015-08-28 01:18:27.939	\N	2015-08-28 01:18:27.939	\N	0		2015-08-30 18:18:27.939	bonnets 'speedo'	2015-08-27 01:18:27.939	Bonnets 'Speedo'	\N	0.5	\N	\N		3	\N
BusinessNotification	25	2015-08-28 01:18:27.955	\N	2015-08-28 01:18:27.955	\N	0		2015-08-28 10:18:27.955	nous proposons aujourd'hui en lunch du jour une salade de gesiers aux pommes.	2015-08-27 01:18:27.955	Nous proposons aujourd'hui en lunch du jour une salade de gésiers aux pommes.	\N	\N	\N	\N	\N	4	\N
BusinessNotification	26	2015-08-28 01:18:28.958	\N	2015-08-28 01:18:28.958	\N	0		2015-08-29 20:18:28.958	bienvenue a michel notre nouveau cuisinier!	2015-08-27 01:18:28.958	Bienvenue à Michel notre nouveau cuisinier!	\N	\N	\N	\N	\N	4	\N
BusinessNotification	27	2015-08-28 01:18:29.942	\N	2015-08-28 01:18:29.942	\N	0		2015-08-28 08:18:29.942	7h00, deja l'heure pour nous d'aller vous chercher de bons produits!	2015-08-27 01:18:29.942	7h00, déjà l'heure pour nous d'aller vous chercher de bons produits!	\N	\N	\N	\N	\N	4	\N
BusinessNotification	28	2015-08-28 01:18:31.235	\N	2015-08-28 01:18:31.235	\N	0		2015-09-01 03:18:31.235	n'oubliez pas reservez votre table si vous venez en groupe!	2015-08-27 01:18:31.235	N'oubliez pas réservez votre table si vous venez en groupe!	\N	\N	\N	\N	\N	4	\N
BusinessNotification	29	2015-08-28 01:18:31.278	\N	2015-08-28 01:18:31.278	\N	0		2015-08-28 06:18:31.278	happy hour ce jeudi soir sur les cocktails de 18 a 19h!	2015-08-27 01:18:31.278	Happy Hour ce jeudi soir sur les cocktails de 18 à 19h!	\N	\N	\N	\N	\N	4	\N
Promotion	30	2015-08-28 01:18:32.103	\N	2015-08-28 01:18:32.103	\N	0		2015-08-30 18:18:32.103	2 couverts	2015-08-27 01:18:32.103	2 couverts	1	0.100000000000000006	\N	10		4	\N
Promotion	31	2015-08-28 01:18:32.105	\N	2015-08-28 01:18:32.105	\N	0		2015-08-31 05:18:32.105	steaks de saumon	2015-08-27 01:18:32.105	Steaks de saumon	1	\N	18	8		4	\N
BusinessNotification	32	2015-08-28 01:18:32.108	\N	2015-08-28 01:18:32.108	\N	0		2015-08-28 04:18:32.108	vous revez d'un combishort pour l'ete? ils vous attendent!	2015-08-27 01:18:32.108	Vous rêvez d'un combishort pour l'été? Ils vous attendent!	\N	\N	\N	\N	\N	5	\N
BusinessNotification	33	2015-08-28 01:18:33.21	\N	2015-08-28 01:18:33.21	\N	0		2015-08-28 06:18:33.21	le jeans est partout... depechez vous de regarnir votre garde-robe!	2015-08-27 01:18:33.21	Le jeans est partout... Dépêchez vous de regarnir votre garde-robe!	\N	\N	\N	\N	\N	5	\N
BusinessNotification	34	2015-08-28 01:18:34.119	\N	2015-08-28 01:18:34.119	\N	0		2015-08-28 10:18:34.119	retouches gratuites sur vos robes de soiree jusqu'aux soldes!	2015-08-27 01:18:34.119	Retouches gratuites sur vos robes de soirée jusqu'aux soldes!	\N	\N	\N	\N	\N	5	\N
BusinessNotification	35	2015-08-28 01:18:35.024	\N	2015-08-28 01:18:35.024	\N	0		2015-08-29 20:18:35.023	seance relooking chez via moda ce vendredi soir. inscriptions ouvertes!	2015-08-27 01:18:35.024	Séance relooking chez Via Moda ce vendredi soir. Inscriptions ouvertes!	\N	\N	\N	\N	\N	5	\N
BusinessNotification	36	2015-08-28 01:18:35.822	\N	2015-08-28 01:18:35.822	\N	0		2015-08-31 05:18:35.822	que pensez-vous du nouvel arrivage?..	2015-08-27 01:18:35.822	Que pensez-vous du nouvel arrivage?..	\N	\N	\N	\N	\N	5	\N
Promotion	37	2015-08-28 01:18:37.179	\N	2015-08-28 01:18:37.179	\N	0		2015-08-28 04:18:37.179	chapeaux de mariage	2015-08-27 01:18:37.179	Chapeaux de mariage	\N	0.149999999999999994	\N	\N		5	\N
Promotion	38	2015-08-28 01:18:38.042	\N	2015-08-28 01:18:38.042	\N	0		2015-08-28 10:18:38.042	bottes daim bouvy	2015-08-27 01:18:38.042	Bottes daim BOUVY	\N	0.200000000000000011	\N	\N		5	\N
Promotion	39	2015-08-28 01:18:39.127	\N	2015-08-28 01:18:39.127	\N	0		2015-08-28 04:18:39.127	vestes cuir chanel	2015-08-27 01:18:39.127	Vestes cuir CHANEL	1	0.300000000000000044	399	5		5	\N
BusinessNotification	40	2015-08-28 01:18:40.622	\N	2015-08-28 01:18:40.622	\N	0		2015-08-31 16:18:40.622	tous nos produits sont sans ammoniac pour limiter l'aggression de votre peau!	2015-08-27 01:18:40.622	Tous nos produits sont sans ammoniac pour limiter l'aggression de votre peau!	\N	\N	\N	\N	\N	6	\N
BusinessNotification	41	2015-08-28 01:18:41.401	\N	2015-08-28 01:18:41.401	\N	0		2015-08-28 10:18:41.401	avez-vous deja essayer le nouveau soin loreal?	2015-08-27 01:18:41.401	Avez-vous déjà essayer le nouveau soin LOREAL?	\N	\N	\N	\N	\N	6	\N
BusinessNotification	42	2015-08-28 01:18:42.22	\N	2015-08-28 01:18:42.22	\N	0		2015-08-29 20:18:42.22	votre coiffeuse elise sera en conge du 10 au 22 juillet.	2015-08-27 01:18:42.22	Votre coiffeuse Elise sera en congé du 10 au 22 juillet.	\N	\N	\N	\N	\N	6	\N
BusinessNotification	43	2015-08-28 01:18:43.106	\N	2015-08-28 01:18:43.106	\N	0		2015-08-28 08:18:43.106	n'oubliez pas de proteger egalement vos cheveux du soleil!	2015-08-27 01:18:43.106	N'oubliez pas de protéger également vos cheveux du soleil!	\N	\N	\N	\N	\N	6	\N
BusinessNotification	44	2015-08-28 01:18:43.903	\N	2015-08-28 01:18:43.903	\N	0		2015-09-01 03:18:43.903	et si vous tentiez un peu plus de cuivre dans vos cheveux?!	2015-08-27 01:18:43.903	Et si vous tentiez un peu plus de cuivre dans vos cheveux?!	\N	\N	\N	\N	\N	6	\N
Promotion	45	2015-08-28 01:18:45.159	\N	2015-08-28 01:18:45.159	\N	0		2015-08-28 06:18:45.159	brushing (tous les lundis)	2015-08-27 01:18:45.159	Brushing (tous les lundis)	\N	0.149999999999999994	\N	\N		6	\N
Promotion	46	2015-08-28 01:18:45.167	\N	2015-08-28 01:18:45.167	\N	0		2015-08-29 00:18:45.167	lumino contrast (l'oreal)	2015-08-27 01:18:45.167	Lumino Contrast (L'Oréal)	1	0.200000000000000011	19	35		6	\N
BusinessNotification	47	2015-08-28 01:18:46.613	\N	2015-08-28 01:18:46.613	\N	0		2015-08-31 05:18:46.613	braderie ce weekend sur la chaussee nouvelle!	2015-08-27 01:18:46.613	Braderie ce weekend sur la chaussée Nouvelle!	\N	\N	\N	\N	\N	7	\N
BusinessNotification	48	2015-08-28 01:18:46.621	\N	2015-08-28 01:18:46.621	\N	0		2015-08-28 04:18:46.62	arnaud ducruet passe par le cc d'auderghem! 	2015-08-27 01:18:46.621	Arnaud Ducruet passe par le CC d'Auderghem! 	\N	\N	\N	\N	\N	7	\N
BusinessNotification	49	2015-08-28 01:18:47.662	\N	2015-08-28 01:18:47.662	\N	0		2015-08-28 06:18:47.662	travaux de voirie place verte tout le mois de juillet.	2015-08-27 01:18:47.662	Travaux de voirie Place Verte tout le mois de Juillet.	\N	\N	\N	\N	\N	7	\N
BusinessNotification	50	2015-08-28 01:18:48.601	\N	2015-08-28 01:18:48.601	\N	0		2015-08-28 10:18:48.601	ouverture nocture du service population les jeudis soirs.	2015-08-27 01:18:48.601	Ouverture nocture du service population les jeudis soirs.	\N	\N	\N	\N	\N	7	\N
BusinessNotification	51	2015-08-28 01:18:49.463	\N	2015-08-28 01:18:49.463	\N	0		2015-08-29 20:18:49.463	enquete publique dans le quartier des peupliers.	2015-08-27 01:18:49.463	Enquête publique dans le quartier des Peupliers.	\N	\N	\N	\N	\N	7	\N
BusinessNotification	52	2015-08-28 01:18:50.587	\N	2015-08-28 01:18:50.587	\N	0		2015-08-30 18:18:50.587	nouvel arrivage juste pour de votre terrasse!	2015-08-27 01:18:50.587	Nouvel arrivage juste pour de votre terrasse!	\N	\N	\N	\N	\N	8	\N
BusinessNotification	53	2015-08-28 01:18:52.248	\N	2015-08-28 01:18:52.248	\N	0		2015-08-31 16:18:52.248	et si ajoutiez un peu de home-made dans votre deco?	2015-08-27 01:18:52.248	Et si ajoutiez un peu de Home-Made dans votre déco?	\N	\N	\N	\N	\N	8	\N
BusinessNotification	54	2015-08-28 01:18:53.401	\N	2015-08-28 01:18:53.401	\N	0		2015-08-28 10:18:53.401	des bougies aux milles senteurs!	2015-08-27 01:18:53.401	Des bougies aux milles senteurs!	\N	\N	\N	\N	\N	8	\N
BusinessNotification	55	2015-08-28 01:18:54.248	\N	2015-08-28 01:18:54.248	\N	0		2015-08-29 20:18:54.248	nous vous proposons des stages de bricolage pour vos enfants!	2015-08-27 01:18:54.248	Nous vous proposons des stages de bricolage pour vos enfants!	\N	\N	\N	\N	\N	8	\N
BusinessNotification	56	2015-08-28 01:18:55.288	\N	2015-08-28 01:18:55.288	\N	0		2015-08-28 08:18:55.288	des idees depuis nos vacances!	2015-08-27 01:18:55.288	Des idées depuis nos vacances!	\N	\N	\N	\N	\N	8	\N
Promotion	57	2015-08-28 01:18:56.127	\N	2015-08-28 01:18:56.127	\N	0		2015-09-01 03:18:56.127	serviettes rococo	2015-08-27 01:18:56.127	Serviettes ROCOCO	\N	\N	\N	\N		8	\N
Promotion	58	2015-08-28 01:18:57.154	\N	2015-08-28 01:18:57.154	\N	0		2015-08-28 06:18:57.154	fauteuils chill	2015-08-27 01:18:57.154	Fauteuils CHILL	\N	0.100000000000000006	\N	\N		8	\N
Promotion	59	2015-08-28 01:18:58.298	\N	2015-08-28 01:18:58.298	\N	0		2015-08-30 09:18:58.298	tables 4 personnes gardenor	2015-08-27 01:18:58.298	Tables 4 personnes GARDENOR	\N	\N	\N	\N		8	\N
BusinessNotification	60	2015-08-28 01:18:59.103	\N	2015-08-28 01:18:59.103	\N	0		2015-08-30 18:18:59.103	et voici notre cocktail de l'ete a gouter de toute urgence!	2015-08-27 01:18:59.103	Et voici notre cocktail de l'été… A goûter de toute urgence!	\N	\N	\N	\N	\N	9	\N
BusinessNotification	61	2015-08-28 01:18:59.116	\N	2015-08-28 01:18:59.116	\N	0		2015-08-31 05:18:59.116	soiree speciale latino ce vendredi!	2015-08-27 01:18:59.116	Soirée spéciale Latino ce vendredi!	\N	\N	\N	\N	\N	9	\N
BusinessNotification	62	2015-08-28 01:19:00.195	\N	2015-08-28 01:19:00.195	\N	0		2015-08-28 04:19:00.195	la terrasse est ouverte pour le weekend!	2015-08-27 01:19:00.195	La terrasse est ouverte pour le weekend!	\N	\N	\N	\N	\N	9	\N
BusinessNotification	63	2015-08-28 01:19:01.236	\N	2015-08-28 01:19:01.236	\N	0		2015-08-28 06:19:01.236	la delta nouvelle biere au clover!	2015-08-27 01:19:01.236	La Delta… Nouvelle bière au Clover!	\N	\N	\N	\N	\N	9	\N
BusinessNotification	64	2015-08-28 01:19:02.335	\N	2015-08-28 01:19:02.335	\N	0		2015-08-28 10:19:02.335	projection du match ce soir des 20h00!	2015-08-27 01:19:02.335	Projection du match ce soir dès 20h00!	\N	\N	\N	\N	\N	9	\N
Promotion	65	2015-08-28 01:19:03.421	\N	2015-08-28 01:19:03.421	\N	0		2015-08-29 20:19:03.421	10 + 1 biere gratuite durant toute la coupe du monde!	2015-08-27 01:19:03.421	10 + 1 bière gratuite durant toute la coupe du monde!	\N	\N	\N	\N		9	\N
Promotion	66	2015-08-28 01:19:03.425	\N	2015-08-28 01:19:03.425	\N	0		2015-08-31 05:19:03.425	mojito fraises	2015-08-27 01:19:03.425	Mojito Fraises	\N	0.200000000000000011	\N	\N		9	\N
BusinessNotification	67	2015-08-28 01:19:03.436	\N	2015-08-28 01:19:03.436	\N	0		2015-08-28 04:19:03.436	c'est la saison des mangues. rendez-vous au rayon fruits et legumes!	2015-08-27 01:19:03.436	C'est la saison des mangues. Rendez-vous au rayon fruits et légumes!	\N	\N	\N	\N	\N	10	\N
BusinessNotification	68	2015-08-28 01:19:04.201	\N	2015-08-28 01:19:04.201	\N	0		2015-08-30 18:19:04.201	alex, notre responsable 'bien-etre', vous conseille parmi nos cremes solaires.	2015-08-27 01:19:04.201	Alex, notre responsable 'Bien-Être', vous conseille parmi nos crêmes solaires.	\N	\N	\N	\N	\N	10	\N
BusinessNotification	69	2015-08-28 01:19:05.33	\N	2015-08-28 01:19:05.33	\N	0		2015-08-31 16:19:05.33	pensez au self-scan pour gagner du temps!	2015-08-27 01:19:05.33	Pensez au self-scan pour gagner du temps!	\N	\N	\N	\N	\N	10	\N
BusinessNotification	70	2015-08-28 01:19:06.057	\N	2015-08-28 01:19:06.057	\N	0		2015-08-28 10:19:06.057	les scouts de saint dominique financent leur voyage a nos caisses!	2015-08-27 01:19:06.057	Les scouts de Saint Dominique financent leur voyage à nos caisses!	\N	\N	\N	\N	\N	10	\N
BusinessNotification	71	2015-08-28 01:19:06.068	\N	2015-08-28 01:19:06.068	\N	0		2015-08-29 20:19:06.068	la delta est egalement disposnible dans votre delhaize!	2015-08-27 01:19:06.068	La Delta est également disposnible dans votre Delhaize!	\N	\N	\N	\N	\N	10	\N
Promotion	72	2015-08-28 01:19:07.184	\N	2015-08-28 01:19:07.184	\N	0		2015-08-28 08:19:07.184	decoration 'paques'	2015-08-27 01:19:07.184	Décoration 'Pâques'	\N	0.149999999999999994	\N	\N		10	\N
Promotion	73	2015-08-28 01:19:07.196	\N	2015-08-28 01:19:07.196	\N	0		2015-09-01 03:19:07.196	poulets rotis	2015-08-27 01:19:07.196	Poulets rôtis	\N	0.200000000000000011	\N	\N		10	\N
Promotion	74	2015-08-28 01:19:08.205	\N	2015-08-28 01:19:08.205	\N	0		2015-08-28 06:19:08.205	sauce devos lemmens	2015-08-27 01:19:08.205	Sauce DEVOS LEMMENS	\N	0.100000000000000006	\N	\N		10	\N
Promotion	75	2015-08-28 01:19:08.215	\N	2015-08-28 01:19:08.215	\N	0		2015-08-28 08:19:08.215	tables ping-pong jeanmi	2015-08-27 01:19:08.215	Tables Ping-Pong JEANMI	1	0.100000000000000006	179	3		10	\N
Promotion	76	2015-08-28 01:19:09.611	\N	2015-08-28 01:19:09.611	\N	0		2015-08-30 09:19:09.611	velo enfants eddi	2015-08-27 01:19:09.611	Vélo Enfants EDDI	1	0.149999999999999994	85	5		10	\N
\.


--
-- Name: abstractpublication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('abstractpublication_id_seq', 76, true);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: play
--

COPY account (dtype, id, creationdate, creationuser, lastupdate, lastupdateuser, version, authenticationkey, email, firstname, gender, lang, lastname, role, sendnotificationbydefault, type, selectedaddress_id) FROM stdin;
Account	1	\N	\N	\N	\N	0	\N	florian.jeanmart@gmail.com	Florian	MALE	fr	Jeanmart	SUPERADMIN	t	CUSTOMER	\N
Account	2	\N	\N	\N	\N	0	\N	gil.knops@krings-law.be	Florian	MALE	fr	Jeanmart	SUPERADMIN	t	CUSTOMER	\N
Account	3	\N	\N	\N	\N	0	\N	greg.malcause@gmail.com	Florian	MALE	fr	Jeanmart	SUPERADMIN	t	CUSTOMER	\N
BusinessAccount	4	2015-08-28 01:17:14.708	\N	2015-08-28 01:17:14.708	\N	0	bu4xM0xMRzS4NWxjDWUhty2+SgCwHuzqXFyqr7ZFncrQFGGJeEkZbuHVCOsk6rVI	pain@business.com	L'amie du pain	MALE	fr	L'amie du pain	BUSINESS	t	BUSINESS	\N
BusinessAccount	5	2015-08-28 01:17:17.671	\N	2015-08-28 01:17:17.671	\N	0	8l8VcKT8gX+X0swfO968QMbXf+f2pWoj4/M0pwjkyz5zbseoybqRpHnlQSZBU/sD	boucherie@business.com	La Bouche Rit	MALE	fr	La Bouche Rit	BUSINESS	t	BUSINESS	\N
BusinessAccount	6	2015-08-28 01:17:20.199	\N	2015-08-28 01:17:20.199	\N	0	QH+EUdB0BDAxfhtEooMDZUI8SG86VbCuikis0Bfm5ahCz1HfSSS8ke10Mwk2szTv	piscine@business.com	Piscine 'Ibiza'	MALE	fr	Piscine 'Ibiza'	BUSINESS	t	BUSINESS	\N
BusinessAccount	7	2015-08-28 01:17:22.445	\N	2015-08-28 01:17:22.445	\N	0	2X2sYpYduyGqmnWP7xBGTyH9m5nvXc7woHjki6pTBfHtbQ6g7yS6xN18DgmFOOvQ	villa@business.com	Villa Lorraine	MALE	fr	Villa Lorraine	BUSINESS	t	BUSINESS	\N
BusinessAccount	8	2015-08-28 01:17:32.259	\N	2015-08-28 01:17:32.259	\N	0	vTyDzUtqctY8PswVIzeCmNsniU/CFto4cvkbEx2BoCBvj+y5+69F+ul0xK1h0yIX	mode@business.com	Via Moda	MALE	fr	Via Moda	BUSINESS	t	BUSINESS	\N
BusinessAccount	9	2015-08-28 01:17:34.348	\N	2015-08-28 01:17:34.348	\N	0	s91gtV1LQY5nIgvlieupVAmsJPAICp9OVRcSRmy/ZyU7poJ2cEKRea6Z5YESMDq4	coiffeur@business.com	Tif & Tondu	MALE	fr	Tif & Tondu	BUSINESS	t	BUSINESS	\N
BusinessAccount	10	2015-08-28 01:17:36.747	\N	2015-08-28 01:17:36.747	\N	0	VA1yeFKc9/Fub8nYNRUCQyimYHbpgiWXk9s7BCloh1vOsTxSEJbDRkzVh1GqcMgs	commune@business.com	Commune de Schaerbeek	MALE	fr	Commune de Schaerbeek	BUSINESS	t	BUSINESS	\N
BusinessAccount	11	2015-08-28 01:17:39.26	\N	2015-08-28 01:17:39.26	\N	0	byjS8u0dOVTZuaXWEtSNHaQw4rlgisgVNosW7N5pBVHdxwaccEmPyZVmMAiq6pwm	traiteur@business.com	La Couleur des Anges	MALE	fr	La Couleur des Anges	BUSINESS	t	BUSINESS	\N
BusinessAccount	12	2015-08-28 01:17:41.483	\N	2015-08-28 01:17:41.483	\N	0	5khn2NaVVCe9NLFrDBCZf3gCWsua0n9LRSqg5MkYRuEwGDYkNUX1HuyZjt4kLG3J	bar@business.com	Clover Bar	MALE	fr	Clover Bar	BUSINESS	t	BUSINESS	\N
BusinessAccount	13	2015-08-28 01:17:43.84	\N	2015-08-28 01:17:43.84	\N	0	XBtElEECCT6lqMCgvcS+KAhb0zcegjIGUnHxWSdTgVn63PHZzXSUDQ7Dn7YqlvYC	delhaize@business.com	Delhaize 'Hermann-Debroux'	MALE	fr	Delhaize 'Hermann-Debroux'	BUSINESS	t	BUSINESS	\N
\.


--
-- Data for Name: account_customerinterest; Type: TABLE DATA; Schema: public; Owner: play
--

COPY account_customerinterest (account_id, customerinterests_id) FROM stdin;
\.


--
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('account_id_seq', 13, true);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: play
--

COPY address (id, creationdate, creationuser, lastupdate, lastupdateuser, version, city, country, name, posx, posy, street, zip, account_id) FROM stdin;
1	2015-08-28 01:17:14.827	\N	2015-08-28 01:17:14.827	\N	0	Woluwé-Saint-Pierre	Belgique	\N	50.8357006000000027	4.43974159999999962	Rue au bois 12	1150	\N
2	2015-08-28 01:17:17.781	\N	2015-08-28 01:17:17.781	\N	0	Auderghem	Belgique	\N	50.8126350000000002	4.42786819999999981	Boulevard du Souverain 63	1060	\N
3	2015-08-28 01:17:20.305	\N	2015-08-28 01:17:20.305	\N	0	Auderghem	Belgique	\N	50.8375835999999879	4.36245329999999942	Chaussée de Wavre 6	1060	\N
4	2015-08-28 01:17:22.556	\N	2015-08-28 01:17:22.556	\N	0	Woluwé-Saint-Pierre	Belgique	\N	50.8313901999999871	4.44419339999999963	Avenue du Hockey 21	1150	\N
5	2015-08-28 01:17:32.365	\N	2015-08-28 01:17:32.365	\N	0	Woluwé-Saint-Pierre	Belgique	\N	50.8408567000000033	4.46333229999999936	Rue de l'Eglise 86	1150	\N
6	2015-08-28 01:17:34.471	\N	2015-08-28 01:17:34.471	\N	0	Auderghem	Belgique	\N	50.8036032999999989	4.44229839999999943	Avenue Schaller 105	1060	\N
7	2015-08-28 01:17:36.888	\N	2015-08-28 01:17:36.888	\N	0	Schaerbeek	Belgique	\N	50.8583907000000011	4.38551890000000011	Avnue Jan Stobbaerts 18	1030	\N
8	2015-08-28 01:17:39.394	\N	2015-08-28 01:17:39.394	\N	0	Schaerbeek	Belgique	\N	50.8639721000000122	4.39005249999999858	Avenue des Jacinthes 50	1030	\N
9	2015-08-28 01:17:41.592	\N	2015-08-28 01:17:41.592	\N	0	Schaerbeek	Belgique	\N	50.8630333999999991	4.3900819999999996	Rue des Mimosas 70	1030	\N
10	2015-08-28 01:17:43.948	\N	2015-08-28 01:17:43.948	\N	0	Auderghem	Belgique	\N	50.8041204000000022	4.42539090000000002	Boulevard du Souverain 68	1060	\N
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('address_id_seq', 10, true);


--
-- Data for Name: business; Type: TABLE DATA; Schema: public; Owner: play
--

COPY business (id, creationdate, creationuser, lastupdate, lastupdateuser, version, askpublicationdate, businessstatus, description, email, name, phone, searchablename, deliverylink, ecommercelink, facebooklink, instagramlink, opinionlink, reservationlink, twitterlink, website, account_id, address_id, illustration_id, landscape_id) FROM stdin;
1	2015-08-28 01:17:14.708	\N	2015-08-28 01:17:17.783	\N	1	\N	PUBLISHED	L'Amie du Pain, boulangerie artisanale depuis 1972, vous  propose une large gamme de pains bio et cuits sur pierre.\nVenez également découvrir notre rayon de produits sans gluten, mais pas sans goût!	pain@business.com	L'amie du pain	+32 123 45 66	l'amie du pain	\N	\N	\N	\N	\N	\N	\N	\N	4	1	2	1
2	2015-08-28 01:17:17.67	\N	2015-08-28 01:17:20.308	\N	1	\N	PUBLISHED	Une boucherie où vous trouverez des viandes découpées sur place dans des viandes de qualité.\nTous les jours, les bouchers vous préparent de savoureuses viandes marinées que vous pouvez réserver également via le site internet.	boucherie@business.com	La Bouche Rit	+32 123 45 67	la bouche rit	\N	\N	\N	\N	\N	\N	\N	\N	5	2	4	3
3	2015-08-28 01:17:20.199	\N	2015-08-28 01:17:22.559	\N	1	\N	PUBLISHED	Notre piscine vous accueille tous les jours de la semaine dans ses installations toutes neuves et son eau toujours à 28°C!	piscine@business.com	Piscine 'Ibiza'	+32 123 45 68	piscine 'ibiza'	\N	\N	\N	\N	\N	\N	\N	\N	6	3	6	5
4	2015-08-28 01:17:22.445	\N	2015-08-28 01:17:32.368	\N	1	\N	PUBLISHED	Perdue au milieu du Parc de la Woluwe, la Villa Lorraine dispose d'une grande terrasse ensoleillée où il fait bon se retrouver entre amis après le boulot.\nRéservez également votre table pour un dîner aux chandelles ou entre collègues et laisser vous suprendre par notre chef étoilé!	villa@business.com	Villa Lorraine	+32 123 45 69	villa lorraine	\N	\N	\N	\N	\N	\N	\N	\N	7	4	8	7
5	2015-08-28 01:17:32.259	\N	2015-08-28 01:17:34.475	\N	1	\N	PUBLISHED	Venez passer la porte du paradis des robes et des chapeaux.\nUn choix vaste et des conseils personnalisés pour toutes les envies et tous les genres!	mode@business.com	Via Moda	+32 123 45 70	via moda	\N	\N	\N	\N	\N	\N	\N	\N	8	5	10	9
6	2015-08-28 01:17:34.348	\N	2015-08-28 01:17:36.89	\N	1	\N	PUBLISHED	Chez Tif & Tondu, nous voulons créer les conditions pour que vous expérimentiez un traitement personnalisé, de qualité et où le temps n’est pas compté. Nous mettons tout en œuvre pour que votre passage chez nous soit un vrai moment de détente et de plaisir.	coiffeur@business.com	Tif & Tondu	+32 123 45 71	tif & tondu	\N	\N	\N	\N	\N	\N	\N	\N	9	6	12	11
7	2015-08-28 01:17:36.747	\N	2015-08-28 01:17:39.398	\N	1	\N	PUBLISHED	Schaerbeek est l'une des 19 communes bilingues de la Région de Bruxelles-Capitale en Belgique.\nSchaerbeek est composée de nombreux quartiers souvent très populaires et cosmopolites. Elle compte quelques sites remarquables comme le parc Josaphat, l'hôtel communal construit en 1887 par Jules-Jacques Van Ysendijck, l'église royale Sainte-Marie, les Halles, la Maison des Arts, ainsi que de nombreuses maisons art nouveau et art déco particulièrement bien préservées (exemple : la Maison Autrique).	commune@business.com	Commune de Schaerbeek	+32 123 45 72	commune de schaerbeek	\N	\N	\N	\N	\N	\N	\N	\N	10	7	14	13
8	2015-08-28 01:17:39.26	\N	2015-08-28 01:17:41.594	\N	1	\N	PUBLISHED	La Couleur des Anges est un magasin qui mêle passion et maison. Venez dénicher l'objet qui finira d'habiller votre salon, terasse ou même salle-de-bain!	traiteur@business.com	La Couleur des Anges	+32 123 45 73	la couleur des anges	\N	\N	\N	\N	\N	\N	\N	\N	11	8	16	15
9	2015-08-28 01:17:41.483	\N	2015-08-28 01:17:43.951	\N	1	\N	PUBLISHED	Situé dans l'artère commerciale de l'avenue Roland à Woluwé-Saint-Lambert, le Clover Bar  vous accueille pour déguster une de ses 50 bières spéciales à la carte. Si le houblon ne vous tente pas, vous succomberez aux charmes de nos cocktails maison!	bar@business.com	Clover Bar	+32 123 45 74	clover bar	\N	\N	\N	\N	\N	\N	\N	\N	12	9	18	17
10	2015-08-28 01:17:43.84	\N	2015-08-28 01:17:46.163	\N	1	\N	PUBLISHED	Le Delhaize 'Hermann-Debroux' est situé au croisement du boulevard du souverain et du viaduc. 500 places de parking et 15 caisses vous attendent pour faciliter vos courses de tous les jours!	delhaize@business.com	Delhaize 'Hermann-Debroux'	+32 123 45 75	delhaize 'hermann-debroux'	\N	\N	\N	\N	\N	\N	\N	\N	13	10	20	19
\.


--
-- Data for Name: business_category; Type: TABLE DATA; Schema: public; Owner: play
--

COPY business_category (business, category) FROM stdin;
1	34
2	32
3	148
5	51
6	66
8	24
9	20
10	31
\.


--
-- Name: business_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('business_id_seq', 10, true);


--
-- Data for Name: businesscategory; Type: TABLE DATA; Schema: public; Owner: play
--

COPY businesscategory (id, creationdate, creationuser, lastupdate, lastupdateuser, version, name, orderindex, parent_id, translationname_id) FROM stdin;
1	2015-08-28 01:16:44.455	\N	2015-08-28 01:16:44.455	\N	0	horeca	1	\N	21
2	2015-08-28 01:16:44.461	\N	2015-08-28 01:16:44.461	\N	0	hotel	2	1	22
3	2015-08-28 01:16:44.466	\N	2015-08-28 01:16:44.466	\N	0	auberge_de_jeunesse	3	2	23
4	2015-08-28 01:16:44.471	\N	2015-08-28 01:16:44.471	\N	0	camping	4	2	24
5	2015-08-28 01:16:44.475	\N	2015-08-28 01:16:44.475	\N	0	bb	5	2	25
6	2015-08-28 01:16:44.48	\N	2015-08-28 01:16:44.48	\N	0	horeca_hotel	6	2	26
7	2015-08-28 01:16:44.485	\N	2015-08-28 01:16:44.485	\N	0	restaurant	7	1	27
8	2015-08-28 01:16:44.49	\N	2015-08-28 01:16:44.49	\N	0	restaurant__fast_food	8	7	28
9	2015-08-28 01:16:44.494	\N	2015-08-28 01:16:44.494	\N	0	restaurant__asiatique	9	7	29
10	2015-08-28 01:16:44.499	\N	2015-08-28 01:16:44.499	\N	0	restaurant__europeen	10	7	30
11	2015-08-28 01:16:44.503	\N	2015-08-28 01:16:44.503	\N	0	restaurant__africain	11	7	31
12	2015-08-28 01:16:44.509	\N	2015-08-28 01:16:44.509	\N	0	restaurant__americain	12	7	32
13	2015-08-28 01:16:44.513	\N	2015-08-28 01:16:44.513	\N	0	restaurant__belge	13	7	33
14	2015-08-28 01:16:44.517	\N	2015-08-28 01:16:44.517	\N	0	restaurant__brunch__sweet	14	7	34
15	2015-08-28 01:16:44.522	\N	2015-08-28 01:16:44.522	\N	0	restaurant__gastronomiquebistronomie	15	7	35
16	2015-08-28 01:16:44.525	\N	2015-08-28 01:16:44.525	\N	0	cafe	16	1	36
17	2015-08-28 01:16:44.53	\N	2015-08-28 01:16:44.53	\N	0	bieres	17	16	37
18	2015-08-28 01:16:44.535	\N	2015-08-28 01:16:44.535	\N	0	vins	18	16	38
19	2015-08-28 01:16:44.539	\N	2015-08-28 01:16:44.539	\N	0	champagne	19	16	39
20	2015-08-28 01:16:44.544	\N	2015-08-28 01:16:44.544	\N	0	cocktails	20	16	40
21	2015-08-28 01:16:44.548	\N	2015-08-28 01:16:44.548	\N	0	jus__smoothies	21	16	41
22	2015-08-28 01:16:44.553	\N	2015-08-28 01:16:44.553	\N	0	traiteur	22	1	42
23	2015-08-28 01:16:44.556	\N	2015-08-28 01:16:44.556	\N	0	asiatique	23	22	43
24	2015-08-28 01:16:44.561	\N	2015-08-28 01:16:44.561	\N	0	europeen	24	22	44
25	2015-08-28 01:16:44.565	\N	2015-08-28 01:16:44.565	\N	0	africain	25	22	45
26	2015-08-28 01:16:44.569	\N	2015-08-28 01:16:44.569	\N	0	americain	26	22	46
27	2015-08-28 01:16:44.573	\N	2015-08-28 01:16:44.573	\N	0	belge	27	22	47
28	2015-08-28 01:16:44.577	\N	2015-08-28 01:16:44.577	\N	0	gastronomique	28	22	48
29	2015-08-28 01:16:44.581	\N	2015-08-28 01:16:44.581	\N	0	magasins	29	\N	49
30	2015-08-28 01:16:44.585	\N	2015-08-28 01:16:44.585	\N	0	alimentation	30	29	50
31	2015-08-28 01:16:44.59	\N	2015-08-28 01:16:44.59	\N	0	supermarche	31	30	51
32	2015-08-28 01:16:44.594	\N	2015-08-28 01:16:44.594	\N	0	boucherie__charcuterie	32	30	52
33	2015-08-28 01:16:44.597	\N	2015-08-28 01:16:44.597	\N	0	poissonerie	33	30	53
34	2015-08-28 01:16:44.605	\N	2015-08-28 01:16:44.605	\N	0	boulangerie__patisserie	34	30	54
35	2015-08-28 01:16:44.613	\N	2015-08-28 01:16:44.613	\N	0	fromagerie	35	30	55
36	2015-08-28 01:16:44.62	\N	2015-08-28 01:16:44.62	\N	0	bieres__vins	36	30	56
37	2015-08-28 01:16:44.624	\N	2015-08-28 01:16:44.624	\N	0	herbes__epices	37	30	57
38	2015-08-28 01:16:44.629	\N	2015-08-28 01:16:44.629	\N	0	confiseries__chocolat	38	30	58
39	2015-08-28 01:16:44.633	\N	2015-08-28 01:16:44.633	\N	0	loisirs	39	29	59
40	2015-08-28 01:16:44.636	\N	2015-08-28 01:16:44.636	\N	0	sport__aventure	40	39	60
41	2015-08-28 01:16:44.638	\N	2015-08-28 01:16:44.638	\N	0	maison__decoration	41	39	61
42	2015-08-28 01:16:44.641	\N	2015-08-28 01:16:44.641	\N	0	jardin__fleurs	42	39	62
43	2015-08-28 01:16:44.644	\N	2015-08-28 01:16:44.645	\N	0	jeux__jouets	43	39	63
44	2015-08-28 01:16:44.649	\N	2015-08-28 01:16:44.649	\N	0	multimedia__informatique	44	39	64
45	2015-08-28 01:16:44.653	\N	2015-08-28 01:16:44.653	\N	0	animaux	45	39	65
46	2015-08-28 01:16:44.657	\N	2015-08-28 01:16:44.657	\N	0	voyages	46	39	66
47	2015-08-28 01:16:44.661	\N	2015-08-28 01:16:44.661	\N	0	livres__journaux	47	39	67
48	2015-08-28 01:16:44.665	\N	2015-08-28 01:16:44.665	\N	0	mode	48	29	68
49	2015-08-28 01:16:44.67	\N	2015-08-28 01:16:44.67	\N	0	vetements_enfants	49	48	69
50	2015-08-28 01:16:44.674	\N	2015-08-28 01:16:44.674	\N	0	vetements_hommes	50	48	70
51	2015-08-28 01:16:44.678	\N	2015-08-28 01:16:44.678	\N	0	vetements_femmes	51	48	71
52	2015-08-28 01:16:44.681	\N	2015-08-28 01:16:44.681	\N	0	chaussures	52	48	72
53	2015-08-28 01:16:44.685	\N	2015-08-28 01:16:44.685	\N	0	bijoux__montres	53	48	73
54	2015-08-28 01:16:44.688	\N	2015-08-28 01:16:44.688	\N	0	parfums__cosmetique	54	48	74
55	2015-08-28 01:16:44.692	\N	2015-08-28 01:16:44.692	\N	0	lingerie	55	48	75
56	2015-08-28 01:16:44.695	\N	2015-08-28 01:16:44.695	\N	0	lunettes	56	48	76
57	2015-08-28 01:16:44.698	\N	2015-08-28 01:16:44.698	\N	0	utiles	57	29	77
58	2015-08-28 01:16:44.702	\N	2015-08-28 01:16:44.702	\N	0	electromenager	58	57	78
59	2015-08-28 01:16:44.706	\N	2015-08-28 01:16:44.706	\N	0	bricolage	59	57	79
60	2015-08-28 01:16:44.711	\N	2015-08-28 01:16:44.711	\N	0	papeterie	60	57	80
61	2015-08-28 01:16:44.713	\N	2015-08-28 01:16:44.713	\N	0	magasin_voiture	61	57	81
62	2015-08-28 01:16:44.716	\N	2015-08-28 01:16:44.716	\N	0	droguerie	62	57	82
63	2015-08-28 01:16:44.72	\N	2015-08-28 01:16:44.72	\N	0	velo	63	57	83
64	2015-08-28 01:16:44.724	\N	2015-08-28 01:16:44.724	\N	0	beaute__bien_etre	64	\N	84
65	2015-08-28 01:16:44.728	\N	2015-08-28 01:16:44.728	\N	0	soins	65	64	85
66	2015-08-28 01:16:44.733	\N	2015-08-28 01:16:44.733	\N	0	coiffure	66	65	86
67	2015-08-28 01:16:44.737	\N	2015-08-28 01:16:44.737	\N	0	esthetique	67	65	87
68	2015-08-28 01:16:44.741	\N	2015-08-28 01:16:44.741	\N	0	manicure__pedicure	68	65	88
69	2015-08-28 01:16:44.745	\N	2015-08-28 01:16:44.745	\N	0	massage	69	65	89
70	2015-08-28 01:16:44.749	\N	2015-08-28 01:16:44.749	\N	0	tatouage__piercing	70	65	90
71	2015-08-28 01:16:44.752	\N	2015-08-28 01:16:44.752	\N	0	toilettage	71	65	91
72	2015-08-28 01:16:44.755	\N	2015-08-28 01:16:44.755	\N	0	etablissement	72	64	92
73	2015-08-28 01:16:44.758	\N	2015-08-28 01:16:44.758	\N	0	sauna__hammam	73	72	93
74	2015-08-28 01:16:44.761	\N	2015-08-28 01:16:44.761	\N	0	solarium	74	72	94
75	2015-08-28 01:16:44.764	\N	2015-08-28 01:16:44.764	\N	0	sante	75	\N	95
76	2015-08-28 01:16:44.767	\N	2015-08-28 01:16:44.767	\N	0	medecine_conventionnelle	76	75	96
77	2015-08-28 01:16:44.769	\N	2015-08-28 01:16:44.769	\N	0	medecine_generale	77	76	97
78	2015-08-28 01:16:44.772	\N	2015-08-28 01:16:44.772	\N	0	ophtalmologie	78	76	98
79	2015-08-28 01:16:44.775	\N	2015-08-28 01:16:44.775	\N	0	orl	79	76	99
80	2015-08-28 01:16:44.777	\N	2015-08-28 01:16:44.777	\N	0	gynecologie	80	76	100
81	2015-08-28 01:16:44.78	\N	2015-08-28 01:16:44.78	\N	0	dentisterie	81	76	101
82	2015-08-28 01:16:44.783	\N	2015-08-28 01:16:44.783	\N	0	kinesitherapie	82	76	102
83	2015-08-28 01:16:44.785	\N	2015-08-28 01:16:44.785	\N	0	dermatologie	83	76	103
84	2015-08-28 01:16:44.787	\N	2015-08-28 01:16:44.787	\N	0	psychologie	84	76	104
85	2015-08-28 01:16:44.79	\N	2015-08-28 01:16:44.79	\N	0	medecine_non_conventionnelle	85	75	105
86	2015-08-28 01:16:44.792	\N	2015-08-28 01:16:44.792	\N	0	acupuncture	86	85	106
87	2015-08-28 01:16:44.795	\N	2015-08-28 01:16:44.795	\N	0	osteopatie	87	85	107
88	2015-08-28 01:16:44.8	\N	2015-08-28 01:16:44.8	\N	0	homeopathie	88	85	108
89	2015-08-28 01:16:44.804	\N	2015-08-28 01:16:44.804	\N	0	hypnose	89	85	109
90	2015-08-28 01:16:44.808	\N	2015-08-28 01:16:44.808	\N	0	naturopathie	90	85	110
91	2015-08-28 01:16:44.811	\N	2015-08-28 01:16:44.811	\N	0	sante_autres	91	75	111
92	2015-08-28 01:16:44.814	\N	2015-08-28 01:16:44.814	\N	0	pharmacie	92	91	112
93	2015-08-28 01:16:44.817	\N	2015-08-28 01:16:44.817	\N	0	hopitaux	93	91	113
94	2015-08-28 01:16:44.82	\N	2015-08-28 01:16:44.82	\N	0	centres_medicaux	94	91	114
95	2015-08-28 01:16:44.824	\N	2015-08-28 01:16:44.824	\N	0	veterinaire	95	91	115
96	2015-08-28 01:16:44.827	\N	2015-08-28 01:16:44.827	\N	0	services_de_proximite	96	\N	116
97	2015-08-28 01:16:44.83	\N	2015-08-28 01:16:44.83	\N	0	creation__reparation	97	96	117
98	2015-08-28 01:16:44.833	\N	2015-08-28 01:16:44.833	\N	0	cordonnerie__serrurrerie	98	97	118
99	2015-08-28 01:16:44.836	\N	2015-08-28 01:16:44.836	\N	0	couture__retouches	99	97	119
100	2015-08-28 01:16:44.839	\N	2015-08-28 01:16:44.839	\N	0	informatique	100	97	120
101	2015-08-28 01:16:44.842	\N	2015-08-28 01:16:44.842	\N	0	smartphones__tablettes	101	97	121
102	2015-08-28 01:16:44.845	\N	2015-08-28 01:16:44.845	\N	0	plombier	102	97	122
103	2015-08-28 01:16:44.847	\N	2015-08-28 01:16:44.847	\N	0	electricien	103	97	123
104	2015-08-28 01:16:44.85	\N	2015-08-28 01:16:44.85	\N	0	jardinier	104	97	124
105	2015-08-28 01:16:44.853	\N	2015-08-28 01:16:44.853	\N	0	finances__droit	105	96	125
106	2015-08-28 01:16:44.856	\N	2015-08-28 01:16:44.856	\N	0	banque	106	105	126
107	2015-08-28 01:16:44.859	\N	2015-08-28 01:16:44.859	\N	0	mistercash	107	105	127
108	2015-08-28 01:16:44.862	\N	2015-08-28 01:16:44.862	\N	0	assurances	108	105	128
109	2015-08-28 01:16:44.865	\N	2015-08-28 01:16:44.865	\N	0	avocat	109	105	129
110	2015-08-28 01:16:44.876	\N	2015-08-28 01:16:44.876	\N	0	notaire	110	105	130
111	2015-08-28 01:16:44.881	\N	2015-08-28 01:16:44.881	\N	0	comptable	111	105	131
112	2015-08-28 01:16:44.885	\N	2015-08-28 01:16:44.885	\N	0	voiture	112	96	132
113	2015-08-28 01:16:44.889	\N	2015-08-28 01:16:44.889	\N	0	garage	113	112	133
114	2015-08-28 01:16:44.893	\N	2015-08-28 01:16:44.893	\N	0	station_essence	114	112	134
115	2015-08-28 01:16:44.896	\N	2015-08-28 01:16:44.896	\N	0	carwash	115	112	135
116	2015-08-28 01:16:44.901	\N	2015-08-28 01:16:44.901	\N	0	parking	116	112	136
117	2015-08-28 01:16:44.905	\N	2015-08-28 01:16:44.906	\N	0	pare_brise	117	112	137
118	2015-08-28 01:16:44.909	\N	2015-08-28 01:16:44.909	\N	0	pneus	118	112	138
119	2015-08-28 01:16:44.913	\N	2015-08-28 01:16:44.913	\N	0	controle_technique	119	112	139
120	2015-08-28 01:16:44.916	\N	2015-08-28 01:16:44.916	\N	0	service_autres	120	96	140
121	2015-08-28 01:16:44.92	\N	2015-08-28 01:16:44.92	\N	0	imprimerie	121	120	141
122	2015-08-28 01:16:44.924	\N	2015-08-28 01:16:44.924	\N	0	garderie__creche	122	120	142
123	2015-08-28 01:16:44.927	\N	2015-08-28 01:16:44.927	\N	0	agence_immobiliere	123	120	143
124	2015-08-28 01:16:44.93	\N	2015-08-28 01:16:44.93	\N	0	telephonie__internet	124	120	144
125	2015-08-28 01:16:44.934	\N	2015-08-28 01:16:44.934	\N	0	centre_de_repassage	125	120	145
126	2015-08-28 01:16:44.937	\N	2015-08-28 01:16:44.937	\N	0	etudes__formations	126	120	146
127	2015-08-28 01:16:44.94	\N	2015-08-28 01:16:44.94	\N	0	detente	127	\N	147
128	2015-08-28 01:16:44.944	\N	2015-08-28 01:16:44.944	\N	0	culture	128	127	148
129	2015-08-28 01:16:44.947	\N	2015-08-28 01:16:44.947	\N	0	theatre	129	128	149
130	2015-08-28 01:16:44.951	\N	2015-08-28 01:16:44.951	\N	0	opera	130	128	150
131	2015-08-28 01:16:44.954	\N	2015-08-28 01:16:44.954	\N	0	concert	131	128	151
132	2015-08-28 01:16:44.957	\N	2015-08-28 01:16:44.957	\N	0	cirque	132	128	152
133	2015-08-28 01:16:44.961	\N	2015-08-28 01:16:44.961	\N	0	musee	133	128	153
134	2015-08-28 01:16:44.963	\N	2015-08-28 01:16:44.963	\N	0	cinema	134	128	154
135	2015-08-28 01:16:44.966	\N	2015-08-28 01:16:44.966	\N	0	galerie	135	128	155
136	2015-08-28 01:16:44.97	\N	2015-08-28 01:16:44.97	\N	0	zoo__aquarium	136	128	156
137	2015-08-28 01:16:44.972	\N	2015-08-28 01:16:44.972	\N	0	soirees	137	127	157
138	2015-08-28 01:16:44.974	\N	2015-08-28 01:16:44.974	\N	0	discotheque	138	137	158
139	2015-08-28 01:16:44.976	\N	2015-08-28 01:16:44.976	\N	0	karaoke	139	137	159
140	2015-08-28 01:16:44.978	\N	2015-08-28 01:16:44.978	\N	0	bar_lounge	140	137	160
141	2015-08-28 01:16:44.98	\N	2015-08-28 01:16:44.98	\N	0	bowling	141	137	161
142	2015-08-28 01:16:44.981	\N	2015-08-28 01:16:44.981	\N	0	cafe_theatre	142	137	162
143	2015-08-28 01:16:44.983	\N	2015-08-28 01:16:44.983	\N	0	bar_holebi	143	137	163
144	2015-08-28 01:16:44.986	\N	2015-08-28 01:16:44.986	\N	0	sport	144	127	164
145	2015-08-28 01:16:44.989	\N	2015-08-28 01:16:44.989	\N	0	tennis	145	144	165
146	2015-08-28 01:16:44.991	\N	2015-08-28 01:16:44.991	\N	0	badminton__squash	146	144	166
147	2015-08-28 01:16:44.995	\N	2015-08-28 01:16:44.995	\N	0	escalade	147	144	167
148	2015-08-28 01:16:44.997	\N	2015-08-28 01:16:44.997	\N	0	piscine	148	144	168
149	2015-08-28 01:16:44.999	\N	2015-08-28 01:16:44.999	\N	0	fitness__musculation	149	144	169
150	2015-08-28 01:16:45.002	\N	2015-08-28 01:16:45.002	\N	0	karting	150	144	170
151	2015-08-28 01:16:45.004	\N	2015-08-28 01:16:45.004	\N	0	danse__yoga	151	144	171
152	2015-08-28 01:16:45.007	\N	2015-08-28 01:16:45.007	\N	0	golf	152	144	172
153	2015-08-28 01:16:45.01	\N	2015-08-28 01:16:45.01	\N	0	detente_autres	153	127	173
154	2015-08-28 01:16:45.013	\N	2015-08-28 01:16:45.013	\N	0	casino	154	153	174
155	2015-08-28 01:16:45.016	\N	2015-08-28 01:16:45.016	\N	0	jeux_de_societe	155	153	175
156	2015-08-28 01:16:45.019	\N	2015-08-28 01:16:45.019	\N	0	jeux_video	156	153	176
157	2015-08-28 01:16:45.02	\N	2015-08-28 01:16:45.02	\N	0	jeux_denfants	157	153	177
158	2015-08-28 01:16:45.023	\N	2015-08-28 01:16:45.023	\N	0	administrations_publiques	158	\N	178
159	2015-08-28 01:16:45.025	\N	2015-08-28 01:16:45.025	\N	0	services_pratiques	159	158	179
160	2015-08-28 01:16:45.027	\N	2015-08-28 01:16:45.027	\N	0	poste	160	159	180
161	2015-08-28 01:16:45.029	\N	2015-08-28 01:16:45.029	\N	0	police	161	159	181
162	2015-08-28 01:16:45.031	\N	2015-08-28 01:16:45.031	\N	0	pompiers	162	159	182
163	2015-08-28 01:16:45.033	\N	2015-08-28 01:16:45.033	\N	0	bibliotheque	163	159	183
164	2015-08-28 01:16:45.036	\N	2015-08-28 01:16:45.036	\N	0	communal	164	158	184
165	2015-08-28 01:16:45.037	\N	2015-08-28 01:16:45.037	\N	0	etat_civil__population	165	164	185
166	2015-08-28 01:16:45.039	\N	2015-08-28 01:16:45.039	\N	0	energie	166	164	186
167	2015-08-28 01:16:45.041	\N	2015-08-28 01:16:45.041	\N	0	emploi_communal	167	164	187
168	2015-08-28 01:16:45.043	\N	2015-08-28 01:16:45.043	\N	0	urbanisme	168	164	188
169	2015-08-28 01:16:45.045	\N	2015-08-28 01:16:45.045	\N	0	cpas	169	164	189
170	2015-08-28 01:16:45.046	\N	2015-08-28 01:16:45.046	\N	0	office_du_tourisme	170	164	190
171	2015-08-28 01:16:45.048	\N	2015-08-28 01:16:45.048	\N	0	federal__international	171	158	191
172	2015-08-28 01:16:45.05	\N	2015-08-28 01:16:45.05	\N	0	economie	172	171	192
173	2015-08-28 01:16:45.052	\N	2015-08-28 01:16:45.052	\N	0	emploi	173	171	193
174	2015-08-28 01:16:45.054	\N	2015-08-28 01:16:45.054	\N	0	justice	174	171	194
175	2015-08-28 01:16:45.056	\N	2015-08-28 01:16:45.056	\N	0	mobilite	175	171	195
176	2015-08-28 01:16:45.058	\N	2015-08-28 01:16:45.058	\N	0	impots	176	171	196
177	2015-08-28 01:16:45.06	\N	2015-08-28 01:16:45.06	\N	0	logement	177	171	197
178	2015-08-28 01:16:45.062	\N	2015-08-28 01:16:45.062	\N	0	administration_sante	178	171	198
179	2015-08-28 01:16:45.064	\N	2015-08-28 01:16:45.064	\N	0	ambassade	179	171	199
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
1	2015-08-28 01:16:45.066	\N	2015-08-28 01:16:45.066	\N	0	1	3	13
2	2015-08-28 01:16:45.067	\N	2015-08-28 01:16:45.067	\N	0	1	4	13
3	2015-08-28 01:16:45.068	\N	2015-08-28 01:16:45.068	\N	0	2	5	1
4	2015-08-28 01:16:45.069	\N	2015-08-28 01:16:45.069	\N	0	1	5	13
5	2015-08-28 01:16:45.069	\N	2015-08-28 01:16:45.069	\N	0	2	6	1
6	2015-08-28 01:16:45.07	\N	2015-08-28 01:16:45.07	\N	0	2	6	2
7	2015-08-28 01:16:45.071	\N	2015-08-28 01:16:45.071	\N	0	1	6	13
8	2015-08-28 01:16:45.071	\N	2015-08-28 01:16:45.071	\N	0	1	8	1
9	2015-08-28 01:16:45.072	\N	2015-08-28 01:16:45.072	\N	0	1	9	1
10	2015-08-28 01:16:45.072	\N	2015-08-28 01:16:45.072	\N	0	2	9	2
11	2015-08-28 01:16:45.073	\N	2015-08-28 01:16:45.073	\N	0	2	9	3
12	2015-08-28 01:16:45.074	\N	2015-08-28 01:16:45.074	\N	0	1	10	1
13	2015-08-28 01:16:45.075	\N	2015-08-28 01:16:45.075	\N	0	2	10	2
14	2015-08-28 01:16:45.075	\N	2015-08-28 01:16:45.075	\N	0	2	10	3
15	2015-08-28 01:16:45.076	\N	2015-08-28 01:16:45.076	\N	0	1	11	1
16	2015-08-28 01:16:45.077	\N	2015-08-28 01:16:45.077	\N	0	2	11	2
17	2015-08-28 01:16:45.077	\N	2015-08-28 01:16:45.077	\N	0	2	11	3
18	2015-08-28 01:16:45.078	\N	2015-08-28 01:16:45.078	\N	0	1	12	1
19	2015-08-28 01:16:45.079	\N	2015-08-28 01:16:45.079	\N	0	2	12	2
20	2015-08-28 01:16:45.08	\N	2015-08-28 01:16:45.08	\N	0	2	12	3
21	2015-08-28 01:16:45.08	\N	2015-08-28 01:16:45.08	\N	0	1	13	1
22	2015-08-28 01:16:45.081	\N	2015-08-28 01:16:45.081	\N	0	2	13	2
23	2015-08-28 01:16:45.082	\N	2015-08-28 01:16:45.082	\N	0	2	13	3
24	2015-08-28 01:16:45.083	\N	2015-08-28 01:16:45.083	\N	0	1	14	1
25	2015-08-28 01:16:45.085	\N	2015-08-28 01:16:45.085	\N	0	2	14	2
26	2015-08-28 01:16:45.086	\N	2015-08-28 01:16:45.086	\N	0	2	14	3
27	2015-08-28 01:16:45.086	\N	2015-08-28 01:16:45.086	\N	0	1	15	1
28	2015-08-28 01:16:45.087	\N	2015-08-28 01:16:45.087	\N	0	2	15	2
29	2015-08-28 01:16:45.088	\N	2015-08-28 01:16:45.088	\N	0	2	15	3
30	2015-08-28 01:16:45.089	\N	2015-08-28 01:16:45.089	\N	0	2	17	1
31	2015-08-28 01:16:45.089	\N	2015-08-28 01:16:45.089	\N	0	1	17	2
32	2015-08-28 01:16:45.09	\N	2015-08-28 01:16:45.09	\N	0	2	17	3
33	2015-08-28 01:16:45.091	\N	2015-08-28 01:16:45.091	\N	0	2	18	1
34	2015-08-28 01:16:45.091	\N	2015-08-28 01:16:45.091	\N	0	1	18	2
35	2015-08-28 01:16:45.092	\N	2015-08-28 01:16:45.092	\N	0	2	18	3
36	2015-08-28 01:16:45.092	\N	2015-08-28 01:16:45.092	\N	0	2	19	1
37	2015-08-28 01:16:45.093	\N	2015-08-28 01:16:45.093	\N	0	1	19	2
38	2015-08-28 01:16:45.093	\N	2015-08-28 01:16:45.093	\N	0	2	19	3
39	2015-08-28 01:16:45.094	\N	2015-08-28 01:16:45.094	\N	0	2	20	1
40	2015-08-28 01:16:45.095	\N	2015-08-28 01:16:45.095	\N	0	1	20	2
41	2015-08-28 01:16:45.095	\N	2015-08-28 01:16:45.095	\N	0	2	20	3
42	2015-08-28 01:16:45.096	\N	2015-08-28 01:16:45.096	\N	0	2	21	1
43	2015-08-28 01:16:45.097	\N	2015-08-28 01:16:45.097	\N	0	1	21	2
44	2015-08-28 01:16:45.098	\N	2015-08-28 01:16:45.098	\N	0	2	21	3
45	2015-08-28 01:16:45.098	\N	2015-08-28 01:16:45.098	\N	0	1	23	1
46	2015-08-28 01:16:45.099	\N	2015-08-28 01:16:45.099	\N	0	1	24	1
47	2015-08-28 01:16:45.1	\N	2015-08-28 01:16:45.1	\N	0	1	25	1
48	2015-08-28 01:16:45.101	\N	2015-08-28 01:16:45.101	\N	0	1	26	1
49	2015-08-28 01:16:45.102	\N	2015-08-28 01:16:45.102	\N	0	1	27	1
50	2015-08-28 01:16:45.103	\N	2015-08-28 01:16:45.103	\N	0	1	28	1
51	2015-08-28 01:16:45.103	\N	2015-08-28 01:16:45.103	\N	0	1	31	5
52	2015-08-28 01:16:45.105	\N	2015-08-28 01:16:45.105	\N	0	2	31	6
53	2015-08-28 01:16:45.106	\N	2015-08-28 01:16:45.106	\N	0	2	31	7
54	2015-08-28 01:16:45.107	\N	2015-08-28 01:16:45.107	\N	0	2	31	8
55	2015-08-28 01:16:45.108	\N	2015-08-28 01:16:45.108	\N	0	2	31	11
56	2015-08-28 01:16:45.108	\N	2015-08-28 01:16:45.108	\N	0	1	32	1
57	2015-08-28 01:16:45.109	\N	2015-08-28 01:16:45.109	\N	0	2	32	11
58	2015-08-28 01:16:45.11	\N	2015-08-28 01:16:45.11	\N	0	1	33	1
59	2015-08-28 01:16:45.111	\N	2015-08-28 01:16:45.111	\N	0	2	33	11
60	2015-08-28 01:16:45.112	\N	2015-08-28 01:16:45.112	\N	0	1	34	1
61	2015-08-28 01:16:45.113	\N	2015-08-28 01:16:45.113	\N	0	1	35	1
62	2015-08-28 01:16:45.114	\N	2015-08-28 01:16:45.114	\N	0	1	36	1
63	2015-08-28 01:16:45.115	\N	2015-08-28 01:16:45.115	\N	0	2	36	6
64	2015-08-28 01:16:45.115	\N	2015-08-28 01:16:45.115	\N	0	1	37	1
65	2015-08-28 01:16:45.116	\N	2015-08-28 01:16:45.116	\N	0	1	38	1
66	2015-08-28 01:16:45.117	\N	2015-08-28 01:16:45.117	\N	0	2	38	6
67	2015-08-28 01:16:45.117	\N	2015-08-28 01:16:45.117	\N	0	2	40	6
68	2015-08-28 01:16:45.118	\N	2015-08-28 01:16:45.118	\N	0	2	40	7
69	2015-08-28 01:16:45.118	\N	2015-08-28 01:16:45.118	\N	0	1	40	10
70	2015-08-28 01:16:45.119	\N	2015-08-28 01:16:45.119	\N	0	2	40	12
71	2015-08-28 01:16:45.119	\N	2015-08-28 01:16:45.119	\N	0	2	41	6
72	2015-08-28 01:16:45.12	\N	2015-08-28 01:16:45.12	\N	0	1	41	8
73	2015-08-28 01:16:45.12	\N	2015-08-28 01:16:45.12	\N	0	1	42	8
74	2015-08-28 01:16:45.121	\N	2015-08-28 01:16:45.121	\N	0	2	43	6
75	2015-08-28 01:16:45.121	\N	2015-08-28 01:16:45.121	\N	0	1	43	14
76	2015-08-28 01:16:45.122	\N	2015-08-28 01:16:45.122	\N	0	1	44	6
77	2015-08-28 01:16:45.123	\N	2015-08-28 01:16:45.123	\N	0	1	45	11
78	2015-08-28 01:16:45.123	\N	2015-08-28 01:16:45.123	\N	0	1	46	12
79	2015-08-28 01:16:45.124	\N	2015-08-28 01:16:45.124	\N	0	1	47	6
80	2015-08-28 01:16:45.125	\N	2015-08-28 01:16:45.125	\N	0	2	49	7
81	2015-08-28 01:16:45.126	\N	2015-08-28 01:16:45.126	\N	0	1	49	14
82	2015-08-28 01:16:45.127	\N	2015-08-28 01:16:45.127	\N	0	1	50	7
83	2015-08-28 01:16:45.127	\N	2015-08-28 01:16:45.127	\N	0	1	51	7
84	2015-08-28 01:16:45.128	\N	2015-08-28 01:16:45.128	\N	0	1	52	7
85	2015-08-28 01:16:45.128	\N	2015-08-28 01:16:45.128	\N	0	2	52	10
86	2015-08-28 01:16:45.129	\N	2015-08-28 01:16:45.129	\N	0	2	52	12
87	2015-08-28 01:16:45.129	\N	2015-08-28 01:16:45.129	\N	0	2	52	14
88	2015-08-28 01:16:45.13	\N	2015-08-28 01:16:45.13	\N	0	1	53	6
89	2015-08-28 01:16:45.13	\N	2015-08-28 01:16:45.13	\N	0	2	53	14
90	2015-08-28 01:16:45.131	\N	2015-08-28 01:16:45.131	\N	0	1	54	6
91	2015-08-28 01:16:45.131	\N	2015-08-28 01:16:45.131	\N	0	2	54	14
92	2015-08-28 01:16:45.132	\N	2015-08-28 01:16:45.132	\N	0	1	55	7
93	2015-08-28 01:16:45.132	\N	2015-08-28 01:16:45.132	\N	0	1	56	6
94	2015-08-28 01:16:45.133	\N	2015-08-28 01:16:45.133	\N	0	2	56	14
95	2015-08-28 01:16:45.133	\N	2015-08-28 01:16:45.133	\N	0	2	59	8
96	2015-08-28 01:16:45.134	\N	2015-08-28 01:16:45.134	\N	0	1	59	15
97	2015-08-28 01:16:45.135	\N	2015-08-28 01:16:45.135	\N	0	1	61	6
98	2015-08-28 01:16:45.135	\N	2015-08-28 01:16:45.135	\N	0	1	66	9
99	2015-08-28 01:16:45.136	\N	2015-08-28 01:16:45.136	\N	0	2	66	14
100	2015-08-28 01:16:45.136	\N	2015-08-28 01:16:45.136	\N	0	1	67	9
101	2015-08-28 01:16:45.137	\N	2015-08-28 01:16:45.137	\N	0	1	68	9
102	2015-08-28 01:16:45.137	\N	2015-08-28 01:16:45.137	\N	0	1	69	9
103	2015-08-28 01:16:45.138	\N	2015-08-28 01:16:45.138	\N	0	1	71	11
104	2015-08-28 01:16:45.139	\N	2015-08-28 01:16:45.139	\N	0	1	73	9
105	2015-08-28 01:16:45.139	\N	2015-08-28 01:16:45.139	\N	0	1	74	9
106	2015-08-28 01:16:45.14	\N	2015-08-28 01:16:45.14	\N	0	1	90	9
107	2015-08-28 01:16:45.14	\N	2015-08-28 01:16:45.14	\N	0	1	95	11
108	2015-08-28 01:16:45.141	\N	2015-08-28 01:16:45.141	\N	0	2	129	1
109	2015-08-28 01:16:45.141	\N	2015-08-28 01:16:45.141	\N	0	2	129	2
110	2015-08-28 01:16:45.142	\N	2015-08-28 01:16:45.142	\N	0	1	129	4
111	2015-08-28 01:16:45.142	\N	2015-08-28 01:16:45.142	\N	0	2	129	14
112	2015-08-28 01:16:45.143	\N	2015-08-28 01:16:45.143	\N	0	2	130	1
113	2015-08-28 01:16:45.144	\N	2015-08-28 01:16:45.144	\N	0	2	130	2
114	2015-08-28 01:16:45.144	\N	2015-08-28 01:16:45.144	\N	0	1	130	4
115	2015-08-28 01:16:45.145	\N	2015-08-28 01:16:45.145	\N	0	2	130	14
116	2015-08-28 01:16:45.146	\N	2015-08-28 01:16:45.146	\N	0	2	131	1
117	2015-08-28 01:16:45.146	\N	2015-08-28 01:16:45.146	\N	0	2	131	2
118	2015-08-28 01:16:45.147	\N	2015-08-28 01:16:45.147	\N	0	1	131	4
119	2015-08-28 01:16:45.148	\N	2015-08-28 01:16:45.148	\N	0	2	131	14
120	2015-08-28 01:16:45.149	\N	2015-08-28 01:16:45.149	\N	0	1	132	4
121	2015-08-28 01:16:45.149	\N	2015-08-28 01:16:45.149	\N	0	2	132	14
122	2015-08-28 01:16:45.15	\N	2015-08-28 01:16:45.15	\N	0	2	133	1
123	2015-08-28 01:16:45.151	\N	2015-08-28 01:16:45.151	\N	0	2	133	2
124	2015-08-28 01:16:45.152	\N	2015-08-28 01:16:45.152	\N	0	1	133	4
125	2015-08-28 01:16:45.152	\N	2015-08-28 01:16:45.152	\N	0	2	133	14
126	2015-08-28 01:16:45.153	\N	2015-08-28 01:16:45.153	\N	0	1	134	4
127	2015-08-28 01:16:45.154	\N	2015-08-28 01:16:45.154	\N	0	2	134	14
128	2015-08-28 01:16:45.154	\N	2015-08-28 01:16:45.154	\N	0	1	135	4
129	2015-08-28 01:16:45.155	\N	2015-08-28 01:16:45.155	\N	0	1	136	4
130	2015-08-28 01:16:45.156	\N	2015-08-28 01:16:45.156	\N	0	2	136	14
131	2015-08-28 01:16:45.157	\N	2015-08-28 01:16:45.157	\N	0	2	138	2
132	2015-08-28 01:16:45.158	\N	2015-08-28 01:16:45.158	\N	0	1	138	3
133	2015-08-28 01:16:45.159	\N	2015-08-28 01:16:45.159	\N	0	2	139	1
134	2015-08-28 01:16:45.16	\N	2015-08-28 01:16:45.16	\N	0	2	139	2
135	2015-08-28 01:16:45.161	\N	2015-08-28 01:16:45.161	\N	0	1	139	3
136	2015-08-28 01:16:45.162	\N	2015-08-28 01:16:45.162	\N	0	2	140	1
137	2015-08-28 01:16:45.163	\N	2015-08-28 01:16:45.163	\N	0	2	140	2
138	2015-08-28 01:16:45.164	\N	2015-08-28 01:16:45.164	\N	0	1	140	3
139	2015-08-28 01:16:45.165	\N	2015-08-28 01:16:45.165	\N	0	2	141	1
140	2015-08-28 01:16:45.166	\N	2015-08-28 01:16:45.166	\N	0	2	141	2
141	2015-08-28 01:16:45.167	\N	2015-08-28 01:16:45.167	\N	0	1	141	3
142	2015-08-28 01:16:45.168	\N	2015-08-28 01:16:45.168	\N	0	2	141	14
143	2015-08-28 01:16:45.169	\N	2015-08-28 01:16:45.169	\N	0	2	142	1
144	2015-08-28 01:16:45.17	\N	2015-08-28 01:16:45.17	\N	0	2	142	2
145	2015-08-28 01:16:45.171	\N	2015-08-28 01:16:45.171	\N	0	1	142	3
146	2015-08-28 01:16:45.172	\N	2015-08-28 01:16:45.172	\N	0	2	142	14
147	2015-08-28 01:16:45.173	\N	2015-08-28 01:16:45.173	\N	0	2	143	1
148	2015-08-28 01:16:45.178	\N	2015-08-28 01:16:45.178	\N	0	2	143	2
149	2015-08-28 01:16:45.18	\N	2015-08-28 01:16:45.18	\N	0	1	143	3
150	2015-08-28 01:16:45.181	\N	2015-08-28 01:16:45.181	\N	0	1	145	10
151	2015-08-28 01:16:45.182	\N	2015-08-28 01:16:45.182	\N	0	1	146	10
152	2015-08-28 01:16:45.183	\N	2015-08-28 01:16:45.183	\N	0	1	147	10
153	2015-08-28 01:16:45.185	\N	2015-08-28 01:16:45.185	\N	0	1	148	10
154	2015-08-28 01:16:45.185	\N	2015-08-28 01:16:45.185	\N	0	1	149	10
155	2015-08-28 01:16:45.187	\N	2015-08-28 01:16:45.187	\N	0	1	150	10
156	2015-08-28 01:16:45.188	\N	2015-08-28 01:16:45.188	\N	0	1	151	10
157	2015-08-28 01:16:45.189	\N	2015-08-28 01:16:45.189	\N	0	1	152	10
158	2015-08-28 01:16:45.19	\N	2015-08-28 01:16:45.19	\N	0	2	154	1
159	2015-08-28 01:16:45.191	\N	2015-08-28 01:16:45.191	\N	0	2	154	2
160	2015-08-28 01:16:45.192	\N	2015-08-28 01:16:45.192	\N	0	1	154	3
161	2015-08-28 01:16:45.192	\N	2015-08-28 01:16:45.192	\N	0	2	155	3
162	2015-08-28 01:16:45.193	\N	2015-08-28 01:16:45.193	\N	0	1	155	4
163	2015-08-28 01:16:45.194	\N	2015-08-28 01:16:45.194	\N	0	2	155	14
164	2015-08-28 01:16:45.195	\N	2015-08-28 01:16:45.195	\N	0	2	156	3
165	2015-08-28 01:16:45.196	\N	2015-08-28 01:16:45.196	\N	0	1	156	4
166	2015-08-28 01:16:45.197	\N	2015-08-28 01:16:45.197	\N	0	2	156	14
167	2015-08-28 01:16:45.198	\N	2015-08-28 01:16:45.198	\N	0	1	157	14
\.


--
-- Name: categoryinterestlink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('categoryinterestlink_id_seq', 167, true);


--
-- Data for Name: customerinterest; Type: TABLE DATA; Schema: public; Owner: play
--

COPY customerinterest (id, creationdate, creationuser, lastupdate, lastupdateuser, version, iconname, name, orderindex, translationname_id) FROM stdin;
1	2015-08-28 01:16:43.748	\N	2015-08-28 01:16:43.755	\N	0	eat.png	manger	1	1
2	2015-08-28 01:16:43.842	\N	2015-08-28 01:16:43.842	\N	0	drink.png	prendre_un_verre	2	2
3	2015-08-28 01:16:43.848	\N	2015-08-28 01:16:43.848	\N	0	going_out.png	sortir	3	3
4	2015-08-28 01:16:43.856	\N	2015-08-28 01:16:43.857	\N	0	culture.png	me_cultiver	4	4
5	2015-08-28 01:16:43.863	\N	2015-08-28 01:16:43.863	\N	0	supermarket.png	faire_des_courses	5	5
6	2015-08-28 01:16:43.871	\N	2015-08-28 01:16:43.871	\N	0	shopping.png	faire_du_shopping_plaisir	6	6
7	2015-08-28 01:16:43.878	\N	2015-08-28 01:16:43.878	\N	0	clothe.png	mhabiller	7	7
8	2015-08-28 01:16:43.904	\N	2015-08-28 01:16:43.905	\N	0	decor.png	decorer_ma_maison	8	8
9	2015-08-28 01:16:43.917	\N	2015-08-28 01:16:43.917	\N	0	welness.png	prendre_soin_de_moi	9	9
10	2015-08-28 01:16:43.925	\N	2015-08-28 01:16:43.925	\N	0	sport.png	faire_du_sport	10	10
11	2015-08-28 01:16:43.931	\N	2015-08-28 01:16:43.931	\N	0	pets.png	prendre_soin_de_mes_animaux	11	11
12	2015-08-28 01:16:43.936	\N	2015-08-28 01:16:43.936	\N	0	travel.png	voyager	12	12
13	2015-08-28 01:16:43.941	\N	2015-08-28 01:16:43.941	\N	0	sleep.png	se_loger	13	13
14	2015-08-28 01:16:43.948	\N	2015-08-28 01:16:43.948	\N	0	kids.png	soccuper_denfants	14	14
15	2015-08-28 01:16:43.954	\N	2015-08-28 01:16:43.954	\N	0	doityourself.png	bricoler	15	15
16	2015-08-28 01:16:43.959	\N	2015-08-28 01:16:43.959	\N	0	read.png	lire	16	16
17	2015-08-28 01:16:43.965	\N	2015-08-28 01:16:43.965	\N	0	garden.png	jardiner	17	17
18	2015-08-28 01:16:43.971	\N	2015-08-28 01:16:43.971	\N	0	music.png	ecouter_de_la_musique	18	18
19	2015-08-28 01:16:43.977	\N	2015-08-28 01:16:43.977	\N	0	technology.png	etre_high_tech	19	19
20	2015-08-28 01:16:43.982	\N	2015-08-28 01:16:43.982	\N	0	play.png	jouer	20	20
\.


--
-- Name: customerinterest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('customerinterest_id_seq', 20, true);


--
-- Data for Name: facebookcredential; Type: TABLE DATA; Schema: public; Owner: play
--

COPY facebookcredential (id, creationdate, creationuser, lastupdate, lastupdateuser, version, userid, account_id) FROM stdin;
\.


--
-- Name: facebookcredential_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('facebookcredential_id_seq', 1, false);


--
-- Data for Name: followlink; Type: TABLE DATA; Schema: public; Owner: play
--

COPY followlink (id, creationdate, creationuser, lastupdate, lastupdateuser, version, notification, account_id, business_id) FROM stdin;
\.


--
-- Name: followlink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('followlink_id_seq', 1, false);


--
-- Data for Name: logincredential; Type: TABLE DATA; Schema: public; Owner: play
--

COPY logincredential (id, creationdate, creationuser, lastupdate, lastupdateuser, version, keepsessionopen, password, account_id) FROM stdin;
1	\N	\N	\N	\N	0	f	ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R	3
2	\N	\N	\N	\N	0	f	ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R	2
3	\N	\N	\N	\N	0	f	ZTwjcqnsuvynn57kRu3LMsDX0yIIsa1jiqR2mRnJJ2aJY6TDTLTT2z6mcN5pU+0R	1
4	2015-08-28 01:17:14.772	\N	2015-08-28 01:17:14.772	\N	0	f	X3wsCt/POjm9JHsZhRVk0/fpxEGxAngroojNw3rElz/KnSwJB2VmHF3aoNkO3XdU	4
5	2015-08-28 01:17:17.724	\N	2015-08-28 01:17:17.724	\N	0	f	PghPJwd6/SifgVfaVFTfZUdHblK5QP8rkpl741HRoV9W/M41Y24nlgw3Hlx16B+1	5
6	2015-08-28 01:17:20.253	\N	2015-08-28 01:17:20.253	\N	0	f	ay03cZlhQhh/l/uagUD8eKgmxPqNPYqDVCIfwOFuXOIK+9jzZLwp6fkbSPRK7Vl7	6
7	2015-08-28 01:17:22.504	\N	2015-08-28 01:17:22.504	\N	0	f	3VIoQVBMnF82YDK+bmqkr9tiZwHWEmtz8KcX9qWQJVvY/8HQ8c5E3GoFVkCkY7DW	7
8	2015-08-28 01:17:32.313	\N	2015-08-28 01:17:32.313	\N	0	f	yL3mjvZhEgkwCWIYmK+Qrtpy+ifgcKVBXBPzzyp5uwhibySj7jCetJ4gdADBGwpJ	8
9	2015-08-28 01:17:34.402	\N	2015-08-28 01:17:34.402	\N	0	f	s/4zlc0iKvzzPXv9gsB3Ongiia0yXGPQxSb4C9UnreUK41EHvU33jG4miEbqHIRX	9
10	2015-08-28 01:17:36.808	\N	2015-08-28 01:17:36.808	\N	0	f	ls+hPtB9+z0M4Mgf3T2bxMlpArdUAOkANn5+cFhZHwsfzENZQMKMrXfOx0OiedQM	10
11	2015-08-28 01:17:39.312	\N	2015-08-28 01:17:39.312	\N	0	f	FFTtHQQp9PBoApAv2U9N7nqAI7YGsiAIT5R+0xO5be0pZH2Tu06m6pWf+38lP8Tw	11
12	2015-08-28 01:17:41.539	\N	2015-08-28 01:17:41.539	\N	0	f	13ISoQM8E68Dq4S0wjCPVtAil4QGOH4aGLj5BXIilD/QMrRy9/UTu7HUFj0/A4FG	12
13	2015-08-28 01:17:43.893	\N	2015-08-28 01:17:43.893	\N	0	f	8z6mtri0UDxGnh+8PdE3LyMzxrVxdXN7VxDZFUVlxIPDr0pCXIwX4BLEFi59TIaT	13
\.


--
-- Name: logincredential_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('logincredential_id_seq', 13, true);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: play
--

COPY session (id, creationdate, creationuser, lastupdate, lastupdateuser, version, connectiondate, source, account_id) FROM stdin;
\.


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('session_id_seq', 1, false);


--
-- Data for Name: storedfile; Type: TABLE DATA; Schema: public; Owner: play
--

COPY storedfile (id, creationdate, creationuser, lastupdate, lastupdateuser, version, comment, fileorder, isimage, originalname, size, storedname, storednameoriginalsize, account_id, businessgallerypicture_id, publication_id) FROM stdin;
1	2015-08-28 01:17:16.344	\N	2015-08-28 01:17:16.344	\N	0	\N	0	t	S1.jpg	0	lRLkHBQzeMEmLQikD1sTh42Nkog2tlYOU4M4dgJGdOTZPIxFChK7doxcao5KFgef92UxjuvZay1WOijSJ1AaWOi4k4OmBxfgtex5	qXP41RguQgPpBSXoe9yNsRs8qvSTSsQwkZaWVv9h92EaMYFaTrSzBRWINoHnHNBbQQpYfoVxTKLg8rGbYVKm4SkyzX4aqrMCjGvb	4	\N	\N
2	2015-08-28 01:17:17.279	\N	2015-08-28 01:17:17.279	\N	0	\N	0	t	L1.bmp	0	EHXYQ6UYghbdCE56BuVGpGbfJO0GrQtwfQV6yTowx6iRfIvXsKRlb3lYCvldefs98HWnjXXm5Oq9N6S2yQHBU2vipCMayKKfpTlr	jKZyUKRYOovkhQXWPXm4HlNvxf7VDUf5Z5kOW0f3NMiSFuJbNyCvXZBcV0edzqA5YCLnxRExvrs0YKf3Zm4sQStWUdChFFPp936t	4	\N	\N
3	2015-08-28 01:17:18.643	\N	2015-08-28 01:17:18.643	\N	0	\N	0	t	S2.jpg	0	P70bunEAMuHVbNPV6pP1BECVSgmfAPzcdYlKdQbo8pmc8NNpGRfkE0oIyaS7hiUb5cEyCSPddNq8MbNR0IDSuetdM2LZBj3dl0HN	8xM3jN1sCJe30iVVdDrfcPBQroMyQVMgaSFvRVlbTTc8VigNgLOubn9gt7ogvUrIvUdC0C4LB47BwBHiJ9wZV53CKrm9D7LOp8x3	5	\N	\N
4	2015-08-28 01:17:19.696	\N	2015-08-28 01:17:19.696	\N	0	\N	0	t	L2.jpg	0	d7b2PJ3dCOPtTD3AsLaRhHbI4ESn1YDifupamKnH2SaJ48IWce9mrFrXJANnqwDRdZjlqIY4S3PG3OEjeb6q16xIGLhVBNVPskFf	3cEbfvcK6AHOcaS9MZGoKONydEScdM6SHOaYFRAAVOMJAxvbnv9lai2dGwwIpBO3QHd0BZMoRSnaKAnOUGxnoumGtPzW7ozd54In	5	\N	\N
5	2015-08-28 01:17:20.866	\N	2015-08-28 01:17:20.866	\N	0	\N	0	t	S3.jpg	0	AkriLbAJIDTK6W28j5qD5XC7ruAQzCLH821apWO7pvnwFMHKUuTkMtBGB64ES3txaXCxBpHv6YVhXDKVSvnfEtW8mzxdcKBhKTV9	OYAiSQbQaemtBVsxq2Hwvmro5DEqYklRWGlVNkihN8gai0AATYwmHy5WevkQlsDuskcrJAhA4U7fkyXwgi8dFtCLs24yJ3AxZKQh	6	\N	\N
6	2015-08-28 01:17:21.828	\N	2015-08-28 01:17:21.828	\N	0	\N	0	t	L3.jpg	0	QgvXxU0cRJNF2MqxTKCjIeRFsmGipoeeu91zYtP7emLTLxSndMVn7Y3nWoxqpnhoGMPYcccJUQz8VYbHVQzSgzw7agyGn9yORNFe	jnebGPAUHh1Fi6Xyf4k5SP8iActDfcXh5g8co1U8cuOQbjvVZCmZcXRVBAVpJ56cAQeY9CJIdFPC7pMBh3jFyrTXkq2LuYaEMTYR	6	\N	\N
7	2015-08-28 01:17:26.357	\N	2015-08-28 01:17:26.357	\N	0	\N	0	t	S4.png	0	5vwoFQougabIbvDoFXZLocxuW6bTeaeuSR8MfJA5BYSWZKGfF4LNbPBPfB6uJPwgi3pZYcE82gE7yTAeGn9NQgp7dwxL4pVmlY4I	gv5qZUjzNBLDLLe7GwWwJlUkLVm3uIrDeQu3F1oqh9czNO02O0UvSRpBUAOXlWNOG9WXSrgs0lLXXyG5UJuhkq8e3u9KNJ83ONlc	7	\N	\N
8	2015-08-28 01:17:30.51	\N	2015-08-28 01:17:30.51	\N	0	\N	0	t	L4.jpg	0	eCQp8AHiRjhNbIfBYV1Gb85gMuZPKlCnSu0okWrw2YWZHgo1t0700yuC2qI8b1qNj0ZqTQwZvJgbq7WYECmYXcxl2Q6xKQgYNWfg	ziNFosIiNRDEsFZX7pFwy71jzuYlGmZTjAEBnu4ymVncQ0f6YPJkUA4Z1OwyNWM075PThzhkTiuu1lTiaqRoOCl6TRV6TZlPuyMv	7	\N	\N
9	2015-08-28 01:17:32.893	\N	2015-08-28 01:17:32.893	\N	0	\N	0	t	S5.jpg	0	wPSVCF78nSAIePYBaULnzHrA9TCoGsAK8vl0oM2uvEGt2oQNsJbpP4yXWkSpzzGOJMqlel5Sgkt0oy3yJMg3VMElqgdxkMXoaWOf	W4mq3nToFEJvsltARPKXFrCzxAR4wLHdN0ulp8zjRu3YsFIqG88zwO2twLHEPz79QMh8DARoFvaakNgStBNXfxF918h0EN8ymN6s	8	\N	\N
10	2015-08-28 01:17:33.824	\N	2015-08-28 01:17:33.824	\N	0	\N	0	t	L5.png	0	RgCyrT8VrO67VCWToGsdno4qsULljpWpidAPXy2I5FvmES1MVpXJw0CXYM5iItnl6h03kg0QjxAfvF9cOnDbtB2pamViijHbpjNq	HYsvyICZ6WUqSA7IpDZPgpqtIhCka3adV1cESbp0wKJepguNVhL7MtQCNdeimYSaHJR594CVeAb2D35mhODop054smSPgyFoyqGt	8	\N	\N
11	2015-08-28 01:17:35.209	\N	2015-08-28 01:17:35.209	\N	0	\N	0	t	S6.jpg	0	XPmvBSIC1k3JpQu1Z0u6nTUpKTJ0c8EwCivmXmlaYzZOgHwzswb0hg6aetIxY9Gts0DvItgchMbTpn0PIuMMTwsWGrezAUnspaS0	YeggX12KuaHYACwangpUHxfPEPFYWyn2wRHcxzeVhYLURov5XW65hbHMQgyhgxXBKwZ3Vd6Cplds5ikI5W5ku3tsFy7YXyZkGZmT	9	\N	\N
12	2015-08-28 01:17:36.174	\N	2015-08-28 01:17:36.174	\N	0	\N	0	t	L6.jpg	0	YKe0ImkIujhwiYrBsRZsir6CQwauW0h78OpJctx7dL2mRpujbl4nVWkXj0reMJ3j4FuoPaQ148Ryy3frPerlNb8kD1hR09OJbG0G	sZwPWk3HUyTJEj4duy9bNEUFEOcgNQt2d88Qblbq9WzG5bcDamWecLHbSqjDXMMsfVSlcEBztM55Qm0S3tr2egwoimAaa0DlowBn	9	\N	\N
13	2015-08-28 01:17:37.62	\N	2015-08-28 01:17:37.62	\N	0	\N	0	t	S7.jpg	0	JcDegX1Zv3H53Ln8EjSeM6xLxL4VQdTvqOTQA765XM717qW3txIuk9SqOTtqZMYmA1zkVxf8ooUADolW5HNTxsdvGwggZh6neexH	nP7KoPSyYLZQMTMDmNTe7DG2v9ynelZ4nUOlKeGKhSEEJeHVuMusXBm5qxnVVSmTkxlyUr0zxklyWtQEFgrZZ5UtDgaDsGW8Gb6i	10	\N	\N
14	2015-08-28 01:17:38.732	\N	2015-08-28 01:17:38.732	\N	0	\N	0	t	L7.jpg	0	fSZWJ71sUhKSENqWsKcUauvS00PrIibLEzKrPcHGHfj3h6akYUMUKaOxz8jmZarZu8ZdmQBxnyQICRkmgY4CzuWxhGxvTsRtgUiU	6969XGYAkpTFdQrwTkLApIgS8L169HitNg3UPEyPxyRSszgAX19Q3E5VEiBmYhRGlWuDjfzrP1bLA4SQqqIDStLtHGlnsXORfLJ5	10	\N	\N
15	2015-08-28 01:17:40.095	\N	2015-08-28 01:17:40.095	\N	0	\N	0	t	S8.jpg	0	e5h2NpINFp50Np7yzYlcFyuoIhxnn8YHRpxnqgC87EDXsSkGXXX6WGenGSJaWliLfHUKhUPXsnOMeA13ZIomnFLSaHA2Csom6n9j	R1hHnuhcYgCBStAXOWLv1WnyJ9Kr6DSvUwbi0U1s21XdxOviQZChdf4jhKKiq8E9oE0OdIO65Pk3fP0ezcVO36kn7c6RenNdez8B	11	\N	\N
16	2015-08-28 01:17:41.01	\N	2015-08-28 01:17:41.01	\N	0	\N	0	t	L8.jpg	0	2jltOt8VxEA85vdCACvMPfbv4Qnv29S0ZXkWmA7EH25oAvGzCucqKZ4EiHIAfT5Cprq4tyT6uHKJhjKP7jNLUfhYQVZqFPcJi1fj	wymPwANobwXyXt6gEFlrulMk4zJBm2iiO2sKaKAB9hkIjnLMh27rgX2rZ4kq57qxTq1d1wpaCXVLx7JDI2b4VXhAMxF2MLvcAtfP	11	\N	\N
17	2015-08-28 01:17:42.309	\N	2015-08-28 01:17:42.309	\N	0	\N	0	t	S9.jpg	0	8axEtKlRs2lZHJQ8LRRvmegd47dMFZBiRWMdVNWkYPyNAeqpA1AcsQjBo3DBaiA4Jo1Vx2aeVb86ZdpYeJJpkIMZUbyQcn2KNzOm	oZDy7sWf16cSD4GDO7pIufOLqJGnz3jMDL7MctKE3RQ6RON65tD3t5EPrEEL9sCAgpFA8uG9HwlE8JyCIaR0yjH7VQ7V6dEs8bJd	12	\N	\N
18	2015-08-28 01:17:43.35	\N	2015-08-28 01:17:43.35	\N	0	\N	0	t	L9.png	0	21J2uCZg9GsFznpaA7KswTALvnzmLKzlwxIpgYlBbPk5pslyXpQLFq5o1Bow0YePhPlP3MUr9UzlhTSRjioWOXntbIy91m59hDdM	8FD70IJi6TbB13gT2dO6wbZhNvOR2306d7hrf00Gg1qrh2RrgM0tJLIkP3f2GDTRO07rETgB7t4jbtNyyaPOWbvLfAB7rc4WYOiu	12	\N	\N
19	2015-08-28 01:17:44.546	\N	2015-08-28 01:17:44.546	\N	0	\N	0	t	S10.jpg	0	N7oou58hhhMsE8zSNfDn93KrukSMAtMSWsZN43oyWdl3DpyUOYCRsrCPIFWTa1TqJOZgDgvVWeYdc3Fhl2w6CZWYC3MM2rqk6RHL	nJxNyQBQ2TvMLK71hlcwQyLW7ZsGvpnnJq3eAb57s0oVFs2KDKvTZY64wXWYeeoRhCG8FguVVnrQOLkh8xIdyPSiCx8rSn9PIi1q	13	\N	\N
20	2015-08-28 01:17:45.389	\N	2015-08-28 01:17:45.389	\N	0	\N	0	t	L10.jpg	0	7kkHicIVDRGX3gTXL0ndxVz2oXhMmIHGuXc1cTZUaiBzw1nqXiO9jdUtZKlrdGeCfOCOJvcmhcl3NlaakVsoAfEKXoqWsSk90tC4	UdE9Z8yVmwCCVLwJJV6FpMN8cTBekiJjIHvYnmvhcJy5ONCyNYnJpGh8QBxjG19K8yjranzh38h0Ykrh5QDXAfccT0U5gT4WD0dT	13	\N	\N
21	2015-08-28 01:17:46.76	\N	2015-08-28 01:17:47.499	\N	1	\N	0	t	1.jpg	0	yAYsTTNsWjvyAJ4qgHhGA5cRxMaBdhrDFAUn8Pl3Da65Pt3ZMmB8RE9s5dRKztPRPCUblajKpI1WefRVOMMRCdIi9d9HkOqdx36f	98rJux8ptzmT76CSejP9gg9Yw09vaok2fVrAkN6Z3Kc3gWjQlg0FTcDxB3X6x7sQ16jZy54WSuHGNNAh3XwmmUqV4nZ0prTrxEnA	4	\N	1
22	2015-08-28 01:17:48.693	\N	2015-08-28 01:17:49.697	\N	1	\N	0	t	2.jpg	0	KTNolYdgzyawIIRuFaMyXX4mUd8z0H3qQPpIM18ZV7KL4xAvmloH0xJF94gROTga3ufaVo7P9f2qf8JxG9TgrSrqmbnikXFiGdJX	WTtDkUFsZrKzyR0iC05L5F9ma7PIQK9KIb3Ary9QfxuKHu5tQfbaVgnnakcIStksMHwPgyKMCkgn6xzYE2LnlKC75OUtRbgRTbJQ	4	\N	2
23	2015-08-28 01:17:50.433	\N	2015-08-28 01:17:51.004	\N	1	\N	0	t	3.jpg	0	ITZY3nh3Dvs5QmJVLxKPZiLGmyyTHVTIfYSuv5Gv3FaSCVWmGx6xTT8bFHvfXXUVOBdMYLmBbuUoeE5OhVexaXjr3o96rdRkIKqA	0KOeza34agnyjVE9moL0ivKqpMffStNtQMWIxagNDoOr6a64FSrVHnPJpzbHN9ax2QVZVaPTxNLZB7A1EonAnmn7QdFgaEWpE5OE	4	\N	3
24	2015-08-28 01:17:51.657	\N	2015-08-28 01:17:52.194	\N	1	\N	0	t	4.jpg	0	P2JgZD87hFd1QJahrEHQRpAc7lKgzno8SwD19GvLsCMLR5epxTkrlpgtnQ9O5G31YOaMRDn1FRGQs3B98qPE4VZMnvwqoiLFmfDk	9H4VyctDBDXx45NH9zgsjG8r1fdtbfNJpXVIDrqFw14kwHBtScKtBg1btuvIB5QecW8LTqtZoGTXfvDzKxTl0Gy7myI5vLj4eC8r	4	\N	4
25	2015-08-28 01:17:52.769	\N	2015-08-28 01:17:53.584	\N	1	\N	0	t	5.jpg	0	MwTBwIASnKkLqyHbRW4517xHrl4Nsi2Wb1s4uf9BLId7Di5LdugkCx9RgYwrlSW8kX7s5IYhviYaenZRyYTbfz7tEQIUInqGYk3E	a7c1LFKbuo9gxryfPQa8X7VD9G8HJzjXKDgCW6Sfy9iWwectSOOAeyY5mQvshi4q1f7JCTR47lpeoDgXQgTEEC0kWmgwyDTKerRa	4	\N	5
26	2015-08-28 01:17:54.134	\N	2015-08-28 01:17:55.436	\N	1	\N	0	t	11.jpg	0	pRx8dmobBYKqneBXQKzuRGjzE3x5xIo1132kODsnT1JIOoO87gjM2MsknpKDnce4thAwh67GQDI9t7N0ziShweeBdrQZdmDSWtbW	BZ7a2bpTI81vz1SRGtreZqrjnOwUBOWIi1Vzwxg0qF8zg6tPJzg8QSlX9kV4PTozpUnxtpM0MYeANIfbnagmZsJwZHtKQRmOA4Vd	5	\N	9
27	2015-08-28 01:17:56.045	\N	2015-08-28 01:17:56.631	\N	1	\N	0	t	12.jpg	0	80SO59PsMjmsgC1gRRDRlEALXb4qcR1hk0hGrXgytdwiw3J4zmETYwJNkWt3XaCYsgVkCcpmVcZ9oXZM3Xve8rMUItOh9XhjbZIe	Y8wXbCY6ygVvDzgoHYSU0015hc3rJTkKkKVdRl6yuG1bs6X8sCx5688tx0lsfJ5zO3FeQep7Vz1ZyEl54uXSqFfFucJdJpFL2EE6	5	\N	10
28	2015-08-28 01:17:57.293	\N	2015-08-28 01:17:57.989	\N	1	\N	0	t	13.jpg	0	vkMsIhdJ6UeshGaWfodLh2fR5NtLYYxvdzWhdjHazv6RPXWgkZrB1w1rltGe0mEkQOYr4bcN5WTvFi5Srj28C0ozdOjLhv7RdQNz	pyNs2aDhrMK8nhdIDj9WQUAJz9CiobNhHiMrMIXCZCRPpraGMpjxUkrIi5jxOPkATGlavJFj38z4it9Nqatp0LK8qzYyatVisqjS	5	\N	11
29	2015-08-28 01:17:58.806	\N	2015-08-28 01:17:59.5	\N	1	\N	0	t	14.jpg	0	7GaNexbuelockWMozIv1fTIVCq7ISlo8fwf6zimcAjMXkxhLTC2dpN8z1dybyww4H8CO0UarP5e3OWIdzoUvYfP115JGQxVAMGjk	99vkJyirDU5osjM9v0WNJGkEQ3FaL01t2Q5J8cNbYFGsBG8bhvkMHcW1BDnVSv8iD3HOtqOGcpvqMnOxDE4VmaCzfsAijrK3Div5	5	\N	12
30	2015-08-28 01:18:00.226	\N	2015-08-28 01:18:01.133	\N	1	\N	0	t	15.jpg	0	4AUDQEpuCal0RTDwPYNS3pDGiFcj39BHAkjL5ByMPNugJXDNpefg6JgZ07HvZHSoX0a6Dk35BFOTYgdS1yhwmbQSfJ9LivIrXSHG	hQ5W4x9Hg5u7rWlJ4Gdpbzjb0OgZsoPRcRJ5vK1gx9jqR8QqFwmPqg30VHySM1Y6SKvDreaYA7LGrZES5dnLisQxYT0fbLmAZGH6	5	\N	13
31	2015-08-28 01:18:02.712	\N	2015-08-28 01:18:05.743	\N	1	\N	0	t	16.jpg	0	id5uniVTCUMpZ2hkb5GR4oT2d1QdjnMevl0iKy3iiFmkULibhwJGxZ7TZU4GnqSIgR4HUDTh7csIVnd6CjBAqJ7RJl4DkWVbq3B2	SUGM1E3b2Oa6r9gWkj5a5Yv59UMcZWc1t53YLfQ8xrxExF4AlRdtYa6jo74kSvhTYAlxbYwMbdqNHFAIaAAC0OR4XegibqJf02AV	5	\N	14
32	2015-08-28 01:18:06.441	\N	2015-08-28 01:18:07.109	\N	1	\N	0	t	17.JPG	0	9EdyzjEYUs6NepNSQsOtnY1ubL6MCFLFFOANfIlRhJmxELC8qCsAh6yPf7FQxUwb4SWAKyurpgeWCykvioGmRmWm7QW5WShMUmPN	wk08V9XHOVGOwlXi2UwvTUJaa1zJ17A2kfZcSNTZzhScFn9FfcS5RXKR8kRz5eMXimsLAcbGndnDP3Fk1gOzAU3B55uocMVuTuUj	5	\N	15
33	2015-08-28 01:18:08.045	\N	2015-08-28 01:18:08.988	\N	1	\N	0	t	19.jpg	0	5tsoM05dYgYywWjKrmorHdAixyCLEdsZBDLwNxODtt3Y26kTzVK48ESk5jDAiNbEMZ9vT8RaNhoDp0YlK8SkJuqCxTvqymNdxEex	DL6fu4dZ111VoDUbjHZGjMiRhuLjdCru68PRvb8oDgs6mrraXFySiV7dyStSD9D4Ec2o61aUvtcQEF40rsd4SWEDvLfViu5K6wG3	5	\N	16
34	2015-08-28 01:18:10.779	\N	2015-08-28 01:18:15.874	\N	1	\N	0	t	20.JPG	0	YpMbm9f70MXsNmKorm2BnTnr9WRjQq1eSAYvs6W2TZrG3SjbOqsAxBORRGJQNvokCYDs3ePOwMta39BjdzHBmN8iHBlBHQpVJy2P	QRv6jisn5kdoG2npATX6UK62ljdh1KpqMNoR3aOemwqRlDOIdY04Iku6DCcCpU0aeeYna4Y7W34XfgIwQGRfrsXcqxs4EAemPPbG	5	\N	17
35	2015-08-28 01:18:20.05	\N	2015-08-28 01:18:22.079	\N	1	\N	0	t	21.jpg	0	7E1k9vohnGXIFpajn5aFQ3R1nNou22sZbunTyQxomQKIJKdNxZD3azxHNp4jp4EyEkYYoRA0xMUkREhgdnKzFFKdJH3vEt6yRtZc	QDuR99QQIhkE15NopPH3yP1l2BaeCeewzd0VUqWrkS9tQfi7yvhOk2mcC0tG4TRzJQ013eW8mYL74D43ZmKPvn67rhSETQIMUg57	6	\N	18
36	2015-08-28 01:18:23.368	\N	2015-08-28 01:18:23.971	\N	1	\N	0	t	22.jpg	0	ale8b3PfENWXE9EoZrZuDHbmXXT0vrsS8j3ztJDDKFtELfJUJIH6B52bLADRQ8gHRlTy9ExNpYcPQDwUSEXHOIjgRXgWzJR4qZv0	10PlEYyfbS4yfhK6PYEwlbfB0ozgn61Q20pKn37NvwGBkij3pyYld33Fz6tZ5sGjrd1jMerMEaLbyjRqGKoIY88XQoYm0513vlR8	6	\N	19
37	2015-08-28 01:18:24.864	\N	2015-08-28 01:18:25.324	\N	1	\N	0	t	23.jpg	0	a8wSvtfbhiyYgwgUgLzBLhCbZX3eVNDNQ4JfVZKezImZZE8KzY54qX1n8uch8l5bsogHCGUuQh5CLOKURuhC8XqkSrVCqWPJitZi	mGX6r1mp8Up0TZ5xhxHyEebGic91p2X1ONFSL82J4FoqXRitI7hDKSVvoJyYJdoYYRFL91HuMg1XQcnGYqSWdBkfHd6ZqQ1aIGT1	6	\N	20
38	2015-08-28 01:18:26.27	\N	2015-08-28 01:18:26.759	\N	1	\N	0	t	24.jpg	0	bjckOuSvK5oQ4rZKCaSnYY1CtTvIUkOYdhSOvC82HV5WrMCuw3NBE0f6Y6sjQ6JGD1xMkmt52Y3xUVqpMpM8hBIf4aKNd5LoD9Rh	sMyabsCctQruwpiHOfbnrdaNi8i9bTd0YxWY1tWuACKfBySHn9XzWUt1d2nVEcYB8naVxLXrmTgKheSWJ3kVyCgH0GCcIyUufqFW	6	\N	21
39	2015-08-28 01:18:27.354	\N	2015-08-28 01:18:27.959	\N	1	\N	0	t	25.jpg	0	CWqawjaq0lje8MElTmrXTCfRPf1u79fjXOlxGGdljYiYn1ghzpyiH2VWkB20wctw2aQKuVdzOq53B1WMkLzEodqd39zDSif5YA7V	r9qFI7JReGNtzPJ5Bki8TwnYIArgnQ3mR2nxry2xnRAgZzmHcGMCKKCMJ7pXrkcBamHE9ZUo9Td99LR9HKvZbWiJwmjNMHHCYfIO	6	\N	22
40	2015-08-28 01:18:28.446	\N	2015-08-28 01:18:28.962	\N	1	\N	0	t	31.jpg	0	9A1r23HfoHQhgVzQo6LqJuxU1LM17HTXrnwrwLfhXdJX8GFi3LcIN5anEivQJfVQU2nHBauvnmJG4jHwW47K8s0fLByGTP1zuDuB	vdz58P1utMwyAGF2SKipEsJwB2NbIEFwusW6a7gOwuFr1VhwhYNp5SQvfYSs86QkfuP2kwLpcCGO03POfxjJYogAUx25tgVw8Y5c	7	\N	25
41	2015-08-28 01:18:29.427	\N	2015-08-28 01:18:29.947	\N	1	\N	0	t	32.jpg	0	imikW2PLsJrGmTtP0Y5m0RFvinSIF0QYUYHiaeo6WgrYro3DWRZULmqpv0E457ublhXlzJCVN83UH3S9VQbqccAIgorfQ7CcES7T	J8wQpLwdCk5xfkt3ItVTj3jNLhna6jGETPCNG8b0mfmU8JMWS64dpIWj5j2X9ZCNOmBzIiTZk2j0NaZ5Ucg9OrOm70U2gRMdLmDb	7	\N	26
42	2015-08-28 01:18:30.602	\N	2015-08-28 01:18:31.24	\N	1	\N	0	t	33.jpg	0	x9aRnWOAZL1SfWf18RjIx7OYN0ynDU5ii6KitvaJwqhjMuuvE78jtfG9sXmHBwS7WuhLYadCyrygVpzUJUyxEYm9fwPCQg3bui7T	UOGkq5KILvZcKNX7pPIGRNiuaXQUgfCQATiNBBfnOysIFJF0EjdATbhRYhGgkunuvUkiADkpnYkMrDdonxamCoVXlTWaog6iEWff	7	\N	27
43	2015-08-28 01:18:31.701	\N	2015-08-28 01:18:32.11	\N	1	\N	0	t	35.jpg	0	jrV8SGp0Pbi4Y0QqRqF0N4fzCt24eSbkEkpag51p9d4ypOGEUb8XpovyBqkhTFfAut8ZaYjISHaX5lm28cYQpgSd3nMFEgXRjkOp	Ty8H8LmbK4CO1dbriUh20M4XBqSSK3rJEcDsHRf1utAPN9hfPTx5Xg2JmjgWE8NLTpMkun3eF8wohZiF2JOE2cWHsdyUrUas9nOL	7	\N	29
44	2015-08-28 01:18:32.713	\N	2015-08-28 01:18:33.212	\N	1	\N	0	t	41.jpg	0	RsKFm7jpkX7w2NCwBoDBz8UT19AeSCdDtNRpRoaqvcfOqSl9sOtaJmNfQzwteXRaVAzmmsSJ4sufcDqJvXyz2vnBO4DabMM7Jniv	PEnx4b8kBBMCBDg4yUC6Mov49jKfAzc2btQSxzoKEg3f0s6QUiKbqj0jPenjM17KGJKbBKFeODwA1o8ei9ZonVZGHDlT7hPaVgTl	8	\N	32
45	2015-08-28 01:18:33.692	\N	2015-08-28 01:18:34.121	\N	1	\N	0	t	42.jpg	0	38w3X6sz6iToQpd69spedhF72vgc9cI9EyW25dFvvCmlcRwNN0qwQjDYo4aqXZ8NcHHNAOXQeHZriy2DWyvEvlTxmMP6LGQpS7t1	NKvaKylq8WS0w3XGebqKQ9x2K2bnBIzN40NRDVIEiDbmSdwsbnGAd0pWZZL5TlF9275qIuP4JfMiU9pEOf9qsknS4LDPW8KJx0X7	8	\N	33
46	2015-08-28 01:18:34.586	\N	2015-08-28 01:18:35.029	\N	1	\N	0	t	43.jpg	0	RM6WYspQgjltvPXRrNWFCM75Hz7L1HcEuzdzEItLAR4GsekD3sG6VGNd5CMzNyGnLYL5UWEHfWUIdx52N3bxNQ8N1tHveJQDRvPv	Y4p1ID5jYoyPPGyAJEG4vTniq6d78XqD0y9lo1c8PA2kWpuqu6jAn0wNGA3X5XNQLQLc6AuE6NN0OEut76FStLIBCWQuG49QLBeI	8	\N	34
47	2015-08-28 01:18:35.399	\N	2015-08-28 01:18:35.824	\N	1	\N	0	t	44.jpeg	0	tQ37Uowm1x0OpXu7gsADt5IzkWsvDyWHD3WCxtaXKaz74s14xMtiJI1XST5OLPitAjkuOfLNJPGMFM3lMOKLHe1VEF7dJk5bIs4d	eYerpMPuQwLUEsHLtSuUdbOj2femw21OiZOb5m0HsVzRQYlunNNEm6P1ObQMUjEQLSd1TlEHoOTxUJhlSHnECDeRQfH3U8H9UZzA	8	\N	35
48	2015-08-28 01:18:36.377	\N	2015-08-28 01:18:37.183	\N	1	\N	0	t	45.jpg	0	U4g3ny2rfjxEcVKMXwy4JGiN91v6oxFk6Hi5PidIeBwkHIZnrAKFqAl2BIiWTgmUkAqs9HDhz1azYedvSoY6AV6yS42qT4D5IjoH	rnY6f5ueZM8JmdQDObdAqAa6OecNwdyQmqUBbT6XgdF1rs76k0aW9wBpOROlP9RcZeEDVxs5t3cYcGbQWMdk8D9y2UR7y7oEz9LQ	8	\N	36
49	2015-08-28 01:18:37.631	\N	2015-08-28 01:18:38.045	\N	1	\N	0	t	46.jpg	0	KvjbfjCq1Q7FvIN0pHS6ngq2YdHc273iDFLvCgRJzk6s8wSzaVewNrg5CSdQs8xS4BuSOII0YzjWfvCs0XUPXKxwopYFdVLkSziA	HRpgFUee1k2dtvIlkzhhUcHS9t8JSnqnlKWXHRMqo8ka2qiP1nkYHXncKO9llYlYBGs4abUGEtnJ88US6op5W9Q5SCFQFYY58pNc	8	\N	37
50	2015-08-28 01:18:38.701	\N	2015-08-28 01:18:39.131	\N	1	\N	0	t	47.jpg	0	ggCYZhGnB1MY1Z48trB3LhrwbXKRE0tfEYckAyWiKwj82btsjt7vM8PKxLd2WBmppwMqey8LymDszuCkv2hVmIaW13tT64vLFfJ5	5MoQzhNKXiQIdbEedoM2qy0H6ARlj7ZmSg3E5IoD1tQjbiqgGvVm6DsSWSktd7Z609yMX8hnHKmld0fH0VidVmUBUuh3PzIBnAg2	8	\N	38
51	2015-08-28 01:18:40.229	\N	2015-08-28 01:18:40.624	\N	1	\N	0	t	49.jpg	0	hKXHnobLBvQYueYRVd04L3SeTn25K0uMfsUA0qzAvo6e07AzZWU8llgE6fvDtMR8wzx4mahPW0HHIKtDXGpKuiJtim2mhgzExlZI	Nxjj87ROHajcgEwjIZvYPsuYyfUL0YXYvICXAYDD22JtrhMIlrk1VC861KpfSmWKyPNioxTNXls8Oxx8VrffKtD28wE1SWiZbX2s	8	\N	39
52	2015-08-28 01:18:41.021	\N	2015-08-28 01:18:41.404	\N	1	\N	0	t	51.jpg	0	01Vxzd4EvBclzdgdmzW5BTziSZ2zGC4C5xz4HoSdDOZhBcs8zQdPgbD9eZGPn3tG5yr8qpSFLhqA4ZBtTWCPa4WDAVXQHBigwkWD	ojFrPsOBDdvj7UuMvbf3XdNhIqTeb05FuA0UYC8aG9iXllmxy5yvkxGB3wOUwB9g1AOv0vPvHoEYjWonF4FjAtgCTKeadl6rxGzQ	9	\N	40
53	2015-08-28 01:18:41.821	\N	2015-08-28 01:18:42.228	\N	1	\N	0	t	52.jpg	0	uXkaF2xwApNHco5lY7NZO6TvTIVvxneogkmr8u0IMkw2masHg4TrfJ2rYlaqKHZQtKG8u7VCMAxVcs0fNTdCnodyuXdRdKbopMB9	MD8DubGMv5Xe30DbYx9WQiY2PHQnGyYvxJWHB4JYHWD38WIaEXVUj85vyahrOm63A50UAcmpdwCJ7PF6kmnjJOpgvTmmQgb2WsQW	9	\N	41
54	2015-08-28 01:18:42.657	\N	2015-08-28 01:18:43.108	\N	1	\N	0	t	53.jpg	0	dQgoJY3QctS4p0HP5ZmEiOtUkw2LvaYRFbshcpqgPsvpQKcK29QSSri4gRxYSf0b3e1HNX3CWEgTIGs81SpbRp2Nc6SL2ODZRFYO	j4w3meEukhwMgPGtMwIT2KAL46HJhJ7mJspW5Pdhqey4zQxgFoAWDmheTgvoBial66TX01m9tqRfBxYDWvlhhK0lrYIP6xdRJm3S	9	\N	42
55	2015-08-28 01:18:43.581	\N	2015-08-28 01:18:43.906	\N	1	\N	0	t	54.jpg	0	8kcpywkz1Dbk5E1YtsYV7JmTZdgxFVWo8Pdtv6jJnQk20MlBJ9GGlexAQDZ2p2uf4AqyH2vUvMDZOpXeHe8Ioun7lv1PnLh2JcLi	PulYGSXeOzKGZStSNzJkla4dr8df2T0toUUb4aDiZ8TaJ2lhU6jtwICMm5V3aM55w2Ez477syuoXlxsYitfxwnoKvnCNQyvtebOj	9	\N	43
56	2015-08-28 01:18:44.611	\N	2015-08-28 01:18:45.169	\N	1	\N	0	t	55.jpg	0	FxcSdoLQXqddFC9TaR3OAd7t3YdCMmOfFu3ryFJhmcmeTofMTiQlDgR1HuLlYuCPcRLxEznLLUnzsx5hMrWeMZUJbsKDJdO4zvi3	HWe2SaLKrp1FiEMGNSKgH9uIe71mrv6eJlGB8So4wpTQHM5t4pxWjJJCKcX969LOWbzzl80ZzqekNQaZcaaTP7K2K4auvPL9hD1v	9	\N	44
57	2015-08-28 01:18:45.957	\N	2015-08-28 01:18:46.615	\N	1	\N	0	t	59.jpg	0	wQ2hGxgoPJceEY6rtqAww2nggEWOVQk3WkPsxcNI6Yyg1PLyJrJN3RJYcLMA0bzFhA8Goq2JUrEvJvEJ5IcOYETCu01sbU1C83oG	PkhUYmsobTNWEdbPqK96RynwuBNhqCGkWtkwRrTiUKEK17S9TDZg9tnO9SNBlJr2VG6EywgbjZjlV1PJSJ7fv8nH7c4GhG09g9hQ	9	\N	46
58	2015-08-28 01:18:47.142	\N	2015-08-28 01:18:47.666	\N	1	\N	0	t	62.jpg	0	9RxF6jMt7CcaNkoI7eGxfTVntd3FQ9S3tvFoGxD1g6B30ykRSOAoU9n9MFk0JZAZYxffcCmt9Pk7M4Sx4uXGwzQDJ1Nc8FIqgHdF	FOPjNZm7MryRIILsK0x68q2GNgyO5maUbFtdWcdFNGpOMxlYlyrYQxWC45hnzgdDCXkhWjQHD9x7T2JxsdJIErWiBjHOYZeVlkj1	10	\N	48
59	2015-08-28 01:18:48.213	\N	2015-08-28 01:18:48.603	\N	1	\N	0	t	63.jpeg	0	xKjT2YBI7CQbDPm8KDwwVOXAo3awv1bo4Vw2KqYr6ZdIQ6z8w40ylx3QSB3K5v4FayO9gFuRefZQTKvPfVJpmQwmTvXkEiQn3moN	HGhoGBICggEAUDN8MNyXpjcFcJaDUGGmzw9FrBdvKyprmyUgBL28gWmhLCy9s9P4mIFEE8oCPmtCNHZrMDHlbS7upcBcQ68Bi7Wf	10	\N	49
60	2015-08-28 01:18:49.058	\N	2015-08-28 01:18:49.466	\N	1	\N	0	t	64.jpg	0	YIaBgoMzZyD2GigY462Z6ntj7iV7Ilhvowvsnx9xSxNcg2UUotQ1xEswLrWyYbyn2yjKjmrQJTnG46mzNjVUCQPaPC96EJZ0C8U5	MLAds7rHOQHZiJE82c8EnottpG46ifySRoYbVgTEmFBqkbMoG5XkfM5zLvWzzJ0XJm9VtO0ZNtIVG62yLcWFf4p9xSID6bZvGg1F	10	\N	50
61	2015-08-28 01:18:50.119	\N	2015-08-28 01:18:50.589	\N	1	\N	0	t	65.jpg	0	X6lK3UIk23VSkB9uFv7pBmPD5jaTiN1xKHdNp2AzyIAf52Dwncw3SRivhtprJy9qwSff9ORBDP9ue9E67DHIz5N10rfsrD71DWBc	IcIvalw9Pt4gC54orez5AmtVQsEwS9s2kJk1JFYHC3yTwkRBy27yo90F7ZuBgt3GBgvrC9zmyhuBINzDP9ft26zclDNmrB9pXERG	10	\N	51
62	2015-08-28 01:18:51.384	\N	2015-08-28 01:18:52.254	\N	1	\N	0	t	71.jpg	0	5ZszBPK77OFqt7jiCl614gXQrduyKjCNzlUdNbh1bbI0q2IZykcdADNAWv6Vs2hRqUNCrqRccKuoMgBEL0InLlEV2vwdqkOfdDOa	IfvRJZH3gs6EvuZJp9TuvOajWHGaFBcWG36n5gHecprqkqV7Y9tnUZ8xA4e7BqQHUpbOwXQQaHAFUj8MMirF5GInIsejOaksk0gq	11	\N	52
63	2015-08-28 01:18:52.821	\N	2015-08-28 01:18:53.404	\N	1	\N	0	t	72.jpg	0	wmidgOfqcaoOmc0FcXNwOVOD5KPlCUNygRk3k0Gr4HXDvLshybda4TsUKHY4S3MhZTc4YepLKAjCWqRRKcnirXoL3PQA4S3cCKV5	qjpbaQIlid0Oz3LPfa2HoReSYZjQr4nem3ZRPhRnJCFnYlftizyKET3k0NwOsOW0MkP8F5UkIUIIQq5nX6zKl80kB884IMKV9m5H	11	\N	53
64	2015-08-28 01:18:53.807	\N	2015-08-28 01:18:54.25	\N	1	\N	0	t	73.jpg	0	SmSzjPlaJdfonyG211FMvhUDmV2hrm9BGdVKPYY279StiZd183OA4zrDSQ599HsMUliGZEXjfXiQo2qzh9o47CLdNCi7Zk01axxK	hOh9a18rp9RtF5xHMtSRKeykVjRfNM33YfRl1zmcuLyJ6Sly3x5FuDCymuMKlXOtsYMkcl0VHVeuVoKOPRZEy9iho62AIyc3uLj9	11	\N	54
65	2015-08-28 01:18:54.779	\N	2015-08-28 01:18:55.29	\N	1	\N	0	t	74.JPG	0	7Qtk8jj1KfpX0Arn3TNmgg1sBFZtkllrux1mV9tqvOEEdoQ6m24TJ2kcxfM5vPqIaQrLsDwMOxeTuxhn51WF7Z10ZjXFRAEpTch7	kwjMqdliBJoJDaEbIHAEniktIVPxMmLcgF6rQoe6qMOCmAKQnX6P3udcAnfKignWNnKkhnmZJJKqdkh70skEgkyDVEKPdtc2S3zX	11	\N	55
66	2015-08-28 01:18:55.749	\N	2015-08-28 01:18:56.129	\N	1	\N	0	t	75.jpg	0	WwqbW8IvOINOrfS7RoVx1QCYlMNa6cjF1000gkvcCCqGxOb0NywAwrMxxWzdI7AL7xLSYvgEJ847HnY7ErENEmUIr94Pixg5qaRd	cAp0beZFikmwrAfDJ3q1I3vqUMGkoP7NmHMWAazKsfcY00r5KlmPEjf9a0CArRDUq81e5TKicsRY0EP00aCRDcoWX5QD0lEuWrW8	11	\N	56
67	2015-08-28 01:18:56.727	\N	2015-08-28 01:18:57.156	\N	1	\N	0	t	76.jpg	0	D3Y6l5DBJT4J9OwvqNRryWcopK9hiuPktEuhxm6sQs2zim52OAX5pAwRLKpb6mBDdLJSa6nMAT0OQnHlMcTFc2A8AqHvMTwxjxIR	DpHtBF4KdWp2EkNVnZStbX2EKQUoz2SMcqLkq3UYapxD9ANLxhUKI8cgvj98hAL59DhD2Ul02BAjGx4ApBunJ0xehnlNLPANa85D	11	\N	57
68	2015-08-28 01:18:57.642	\N	2015-08-28 01:18:58.3	\N	1	\N	0	t	77.jpg	0	XXAhB14oN9LqQxdv8uknLa1UWzQgjvICPdqjzkE2ojJl1yp9hnU9XhFzx6fRfeHytvBXAKf8YDgXnF3W1KjBlVWxAcOd2zqguBn9	maK4pqkQpoiYGsmFziTJPmUex7OWVxyNQdOXMXwgauwhGfed2iDYKuH2VnU6NbojarunaAoLqh9lGy1X6bm3s3BxK5w3MuQqjyqt	11	\N	58
69	2015-08-28 01:18:58.763	\N	2015-08-28 01:18:59.107	\N	1	\N	0	t	79.jpg	0	yrRsPyvVw1Omim3ItMgjdca01vIu6dA3iNrYFb2b069QeLvQ5I6zzrprsSdESDxNqKrf3YcJbehIBHLhEglbJt0O7HOOXukGIiEn	H7wH3afu6fczEmYgJ6ay9rIYpqqeI1oVTBLq8KnOsbiRYxa2jOdUKcdwYuFlCHDBTzH713Yv1kisgB1hyG1PWgblsagWn5uLHczo	11	\N	59
70	2015-08-28 01:18:59.695	\N	2015-08-28 01:19:00.198	\N	1	\N	0	t	82.jpg	0	DtafbczKupylVknZR6Aej4CCE6xBCcrCYjax24QNs4eIji2DlBpqVdL4z7yiYMvoaeIDHqQPbNZRmiWIHf4Wnl0KAYYhFdp1OFK5	pnl6dKfyR8TiQy1l0Wla23xBKiEirC1Gr9KzqR3sRcDjDYO3QoWzn044X2640iUlJ9C674YHyKtx0ff9uWRIw8Ym23bP1Rkaxyc9	12	\N	61
71	2015-08-28 01:19:00.699	\N	2015-08-28 01:19:01.239	\N	1	\N	0	t	83.jpg	0	ofZd4uLX71Ds04F7vfQzvW9YGoHcWHbrpGlwr7iSwaFyosnYCy7ZAo8qtKQIs7P59FGnhFogHftEpW6SZ2f6InZ39xM63hwzoSaV	rBc8vqI47gbBOZ2ZHnovPHZf27mUFjXV5dbYIHwogkla7vqzgWB4vLRt5IsGnVRvPC8fpyDcFC1N94HZ7YUFeLkJwgUdZBHiRuj7	12	\N	62
72	2015-08-28 01:19:01.89	\N	2015-08-28 01:19:02.342	\N	1	\N	0	t	84.jpg	0	adSeToCqrToc8FT0tEOrnyZmX5sLDwmovbW1t3cQY5espLo1Pb0Mw6RcuYPYQiukY8f1wAPLW5lIkFt6QXfeaYwaABkuwS6nTk4K	pCtsMIsukPx8b4qkFlIywiBpJVVQV9u6OZEDIcqDQ1rvwl1zRJh9EibqwAB7LOHD0630O1PgpbXNYhjt7uI3RPgmUjG6romNqhOG	12	\N	63
73	2015-08-28 01:19:02.867	\N	2015-08-28 01:19:03.438	\N	1	\N	0	t	85.jpg	0	VbmnWBEG1KHKy66pJysXY3Ha4idHflI4VGIpzpStLQDFfab3vjrGUOs2a49orIHH2UKQ6iqipZnQlC8bq1SmtsHxCLbUkpu9asGI	egfXpttLWkr5VDvJzI23ghLAi6rW8xoWVricyqrDlR4lAPyfRwEPNQAO3A6BkyzEhRnxF3NUO5pm7sBzCkvUSvo6Mq24go5kUhZj	12	\N	64
74	2015-08-28 01:19:03.837	\N	2015-08-28 01:19:04.204	\N	1	\N	0	t	91.jpg	0	ByKTtgQL4zPCelb5AemKCXpQ1I1berUf7MzSDH3Q78tPTsQZauMouFzW9X78IJPNPqw542ZM0U0NvKNmXd8Kw0kEFnOb0mCQm0qQ	vvnTdGC5nwA2QkVeQW82oYFxcHbCkmGeRvHUjKC073ODdawiLlr8koJiz86ULsdWOLnn8kWtOkWRII4A5qSoY13Yh3RWGMidI5a6	13	\N	67
75	2015-08-28 01:19:04.836	\N	2015-08-28 01:19:05.334	\N	1	\N	0	t	92.jpg	0	muJDkeMF5PLbAYPryFM0yvG7QHFoSWEKY5b8YbljZkYkUr5B0YTet5j0Gx8SO9FAPBQHRykDJd4IZDySFTP29WM9R0XhIPfqiuwe	HOjfjNu9Mtk5CHq9AAn06D6XFqptOVfcznLhuKy6xhJSy2YEp9HZ7ecYVETPbTrAccvAFuafLH4ACdTlQvT6wPEnJ1ErSRZuNbsk	13	\N	68
76	2015-08-28 01:19:05.678	\N	2015-08-28 01:19:06.061	\N	1	\N	0	t	93.jpg	0	b99ZiKNQiDwwhexEfyv4XxQMbJ3PKieVbc3r89HXysM8x9kgGpQfUxH1BcZ6k97KnY8q7l45bp5SIP2Jy21xFEdVXHwPpAhqTK9p	JBdMoJVsqXJmW0PbBe6saEn9EHTuMYvModfoaQokaxmfxgVkfDOvZtJIdCwsu0qDwfRiBME8gGGBy8WTQhmBK0WfKH59YR5ejLnE	13	\N	69
77	2015-08-28 01:19:06.739	\N	2015-08-28 01:19:07.19	\N	1	\N	0	t	95.jpg	0	u8T5DFhHwCGG6njgbDLedLhQDTidOT4tlyUTVIc6VlGmbM3l0Fui0vbzMvKAL0Fi2xIfuYYuiy41nHn5oklwzyJ6RB4JVi5KQITM	JEPnpIETj3bNEiW2ljEWZAr3erqin4nuGye3PELYEPjWg9jMvHA1RX9Ptm4mt2U78n9KUSqvrfGmchIxJE2tJwo2AedHxfFREsmL	13	\N	71
78	2015-08-28 01:19:07.735	\N	2015-08-28 01:19:08.208	\N	1	\N	0	t	97.jpg	0	CJOqfstMIogJfoP7NNm6adSETrHCIDuSI7cxIQqlOHZwOLApEMuWmxqrqYhPeasrQVS8JdlrOev2B3vuq7nxxMb4z1gC9kZDVyKe	GB5sHlZkDFhuMv3L706knpg6CUWOXCqpJvU9AWO2zZeTFdYoFhGoSkK2586TYKVOf0La14lFjy5eJTNUFMco9d5xUpDHPFggl89m	13	\N	73
79	2015-08-28 01:19:08.577	\N	2015-08-28 01:19:09.615	\N	1	\N	0	t	99.jpg	0	gOqnkGYXFd2EVbjwaoLOvMBo6h2byXhubadHSKORNDMXVPIitU846lVmoyVkDvgYPE0gDrrItK7uRIchcF8flQEzJv1v5OeyCd1u	canNFiy7gjKEm2xvT0r0Y7WqWXKN2V0Wo9SFsUysS6lzvgEmwc1b2AOU0r8p88Axrkeost7bwTMV4p4tDlfQhgqbX3mwmtkgRSEp	13	\N	75
80	2015-08-28 01:19:10.211	\N	2015-08-28 01:19:10.686	\N	1	\N	0	t	100.jpg	0	jODCH1dIousruUAs9R8xpiJUYOTgJbcb7zkSKw2YCTUQxs3JTDxCEOlSDehjUb4cjiY3TWXci3Dl35FgXinq6ewvdogvzSe3po4A	VyBkPJ9nV22ZDYGC1gxzaQnZC3WUAiyJD0l0kV9fVJRrdBGw97pEhVDcQmemevdlVBLCnbBvRhsdsabKnh2EtGCumdn9hvRTrMOi	13	\N	76
\.


--
-- Name: storedfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('storedfile_id_seq', 80, true);


--
-- Data for Name: translation; Type: TABLE DATA; Schema: public; Owner: play
--

COPY translation (id, creationdate, creationuser, lastupdate, lastupdateuser, version) FROM stdin;
1	2015-08-28 01:16:43.782	\N	2015-08-28 01:16:43.782	\N	0
2	2015-08-28 01:16:43.842	\N	2015-08-28 01:16:43.842	\N	0
3	2015-08-28 01:16:43.848	\N	2015-08-28 01:16:43.848	\N	0
4	2015-08-28 01:16:43.857	\N	2015-08-28 01:16:43.857	\N	0
5	2015-08-28 01:16:43.863	\N	2015-08-28 01:16:43.863	\N	0
6	2015-08-28 01:16:43.871	\N	2015-08-28 01:16:43.871	\N	0
7	2015-08-28 01:16:43.878	\N	2015-08-28 01:16:43.878	\N	0
8	2015-08-28 01:16:43.905	\N	2015-08-28 01:16:43.905	\N	0
9	2015-08-28 01:16:43.918	\N	2015-08-28 01:16:43.918	\N	0
10	2015-08-28 01:16:43.925	\N	2015-08-28 01:16:43.925	\N	0
11	2015-08-28 01:16:43.931	\N	2015-08-28 01:16:43.931	\N	0
12	2015-08-28 01:16:43.936	\N	2015-08-28 01:16:43.936	\N	0
13	2015-08-28 01:16:43.941	\N	2015-08-28 01:16:43.942	\N	0
14	2015-08-28 01:16:43.948	\N	2015-08-28 01:16:43.948	\N	0
15	2015-08-28 01:16:43.954	\N	2015-08-28 01:16:43.954	\N	0
16	2015-08-28 01:16:43.959	\N	2015-08-28 01:16:43.959	\N	0
17	2015-08-28 01:16:43.965	\N	2015-08-28 01:16:43.965	\N	0
18	2015-08-28 01:16:43.972	\N	2015-08-28 01:16:43.972	\N	0
19	2015-08-28 01:16:43.977	\N	2015-08-28 01:16:43.977	\N	0
20	2015-08-28 01:16:43.982	\N	2015-08-28 01:16:43.982	\N	0
21	2015-08-28 01:16:44.455	\N	2015-08-28 01:16:44.455	\N	0
22	2015-08-28 01:16:44.461	\N	2015-08-28 01:16:44.461	\N	0
23	2015-08-28 01:16:44.466	\N	2015-08-28 01:16:44.466	\N	0
24	2015-08-28 01:16:44.471	\N	2015-08-28 01:16:44.471	\N	0
25	2015-08-28 01:16:44.475	\N	2015-08-28 01:16:44.475	\N	0
26	2015-08-28 01:16:44.48	\N	2015-08-28 01:16:44.48	\N	0
27	2015-08-28 01:16:44.485	\N	2015-08-28 01:16:44.485	\N	0
28	2015-08-28 01:16:44.49	\N	2015-08-28 01:16:44.49	\N	0
29	2015-08-28 01:16:44.494	\N	2015-08-28 01:16:44.494	\N	0
30	2015-08-28 01:16:44.499	\N	2015-08-28 01:16:44.499	\N	0
31	2015-08-28 01:16:44.504	\N	2015-08-28 01:16:44.504	\N	0
32	2015-08-28 01:16:44.509	\N	2015-08-28 01:16:44.509	\N	0
33	2015-08-28 01:16:44.513	\N	2015-08-28 01:16:44.513	\N	0
34	2015-08-28 01:16:44.517	\N	2015-08-28 01:16:44.517	\N	0
35	2015-08-28 01:16:44.522	\N	2015-08-28 01:16:44.522	\N	0
36	2015-08-28 01:16:44.526	\N	2015-08-28 01:16:44.526	\N	0
37	2015-08-28 01:16:44.53	\N	2015-08-28 01:16:44.53	\N	0
38	2015-08-28 01:16:44.535	\N	2015-08-28 01:16:44.535	\N	0
39	2015-08-28 01:16:44.539	\N	2015-08-28 01:16:44.539	\N	0
40	2015-08-28 01:16:44.544	\N	2015-08-28 01:16:44.544	\N	0
41	2015-08-28 01:16:44.548	\N	2015-08-28 01:16:44.548	\N	0
42	2015-08-28 01:16:44.553	\N	2015-08-28 01:16:44.553	\N	0
43	2015-08-28 01:16:44.556	\N	2015-08-28 01:16:44.556	\N	0
44	2015-08-28 01:16:44.561	\N	2015-08-28 01:16:44.561	\N	0
45	2015-08-28 01:16:44.565	\N	2015-08-28 01:16:44.565	\N	0
46	2015-08-28 01:16:44.57	\N	2015-08-28 01:16:44.57	\N	0
47	2015-08-28 01:16:44.573	\N	2015-08-28 01:16:44.573	\N	0
48	2015-08-28 01:16:44.577	\N	2015-08-28 01:16:44.577	\N	0
49	2015-08-28 01:16:44.581	\N	2015-08-28 01:16:44.581	\N	0
50	2015-08-28 01:16:44.585	\N	2015-08-28 01:16:44.585	\N	0
51	2015-08-28 01:16:44.59	\N	2015-08-28 01:16:44.59	\N	0
52	2015-08-28 01:16:44.594	\N	2015-08-28 01:16:44.594	\N	0
53	2015-08-28 01:16:44.598	\N	2015-08-28 01:16:44.598	\N	0
54	2015-08-28 01:16:44.605	\N	2015-08-28 01:16:44.605	\N	0
55	2015-08-28 01:16:44.613	\N	2015-08-28 01:16:44.613	\N	0
56	2015-08-28 01:16:44.621	\N	2015-08-28 01:16:44.621	\N	0
57	2015-08-28 01:16:44.625	\N	2015-08-28 01:16:44.625	\N	0
58	2015-08-28 01:16:44.629	\N	2015-08-28 01:16:44.629	\N	0
59	2015-08-28 01:16:44.633	\N	2015-08-28 01:16:44.633	\N	0
60	2015-08-28 01:16:44.636	\N	2015-08-28 01:16:44.636	\N	0
61	2015-08-28 01:16:44.638	\N	2015-08-28 01:16:44.638	\N	0
62	2015-08-28 01:16:44.641	\N	2015-08-28 01:16:44.641	\N	0
63	2015-08-28 01:16:44.645	\N	2015-08-28 01:16:44.645	\N	0
64	2015-08-28 01:16:44.649	\N	2015-08-28 01:16:44.649	\N	0
65	2015-08-28 01:16:44.653	\N	2015-08-28 01:16:44.653	\N	0
66	2015-08-28 01:16:44.657	\N	2015-08-28 01:16:44.657	\N	0
67	2015-08-28 01:16:44.661	\N	2015-08-28 01:16:44.661	\N	0
68	2015-08-28 01:16:44.666	\N	2015-08-28 01:16:44.666	\N	0
69	2015-08-28 01:16:44.67	\N	2015-08-28 01:16:44.67	\N	0
70	2015-08-28 01:16:44.674	\N	2015-08-28 01:16:44.674	\N	0
71	2015-08-28 01:16:44.678	\N	2015-08-28 01:16:44.678	\N	0
72	2015-08-28 01:16:44.681	\N	2015-08-28 01:16:44.681	\N	0
73	2015-08-28 01:16:44.685	\N	2015-08-28 01:16:44.685	\N	0
74	2015-08-28 01:16:44.688	\N	2015-08-28 01:16:44.688	\N	0
75	2015-08-28 01:16:44.692	\N	2015-08-28 01:16:44.692	\N	0
76	2015-08-28 01:16:44.695	\N	2015-08-28 01:16:44.695	\N	0
77	2015-08-28 01:16:44.698	\N	2015-08-28 01:16:44.698	\N	0
78	2015-08-28 01:16:44.702	\N	2015-08-28 01:16:44.702	\N	0
79	2015-08-28 01:16:44.706	\N	2015-08-28 01:16:44.706	\N	0
80	2015-08-28 01:16:44.711	\N	2015-08-28 01:16:44.711	\N	0
81	2015-08-28 01:16:44.714	\N	2015-08-28 01:16:44.714	\N	0
82	2015-08-28 01:16:44.716	\N	2015-08-28 01:16:44.716	\N	0
83	2015-08-28 01:16:44.72	\N	2015-08-28 01:16:44.72	\N	0
84	2015-08-28 01:16:44.724	\N	2015-08-28 01:16:44.724	\N	0
85	2015-08-28 01:16:44.728	\N	2015-08-28 01:16:44.728	\N	0
86	2015-08-28 01:16:44.733	\N	2015-08-28 01:16:44.733	\N	0
87	2015-08-28 01:16:44.738	\N	2015-08-28 01:16:44.738	\N	0
88	2015-08-28 01:16:44.741	\N	2015-08-28 01:16:44.741	\N	0
89	2015-08-28 01:16:44.745	\N	2015-08-28 01:16:44.745	\N	0
90	2015-08-28 01:16:44.749	\N	2015-08-28 01:16:44.749	\N	0
91	2015-08-28 01:16:44.752	\N	2015-08-28 01:16:44.752	\N	0
92	2015-08-28 01:16:44.755	\N	2015-08-28 01:16:44.755	\N	0
93	2015-08-28 01:16:44.758	\N	2015-08-28 01:16:44.758	\N	0
94	2015-08-28 01:16:44.761	\N	2015-08-28 01:16:44.761	\N	0
95	2015-08-28 01:16:44.764	\N	2015-08-28 01:16:44.764	\N	0
96	2015-08-28 01:16:44.767	\N	2015-08-28 01:16:44.767	\N	0
97	2015-08-28 01:16:44.769	\N	2015-08-28 01:16:44.769	\N	0
98	2015-08-28 01:16:44.772	\N	2015-08-28 01:16:44.772	\N	0
99	2015-08-28 01:16:44.775	\N	2015-08-28 01:16:44.775	\N	0
100	2015-08-28 01:16:44.777	\N	2015-08-28 01:16:44.777	\N	0
101	2015-08-28 01:16:44.78	\N	2015-08-28 01:16:44.78	\N	0
102	2015-08-28 01:16:44.783	\N	2015-08-28 01:16:44.783	\N	0
103	2015-08-28 01:16:44.785	\N	2015-08-28 01:16:44.785	\N	0
104	2015-08-28 01:16:44.787	\N	2015-08-28 01:16:44.787	\N	0
105	2015-08-28 01:16:44.79	\N	2015-08-28 01:16:44.79	\N	0
106	2015-08-28 01:16:44.792	\N	2015-08-28 01:16:44.792	\N	0
107	2015-08-28 01:16:44.796	\N	2015-08-28 01:16:44.796	\N	0
108	2015-08-28 01:16:44.8	\N	2015-08-28 01:16:44.8	\N	0
109	2015-08-28 01:16:44.804	\N	2015-08-28 01:16:44.804	\N	0
110	2015-08-28 01:16:44.808	\N	2015-08-28 01:16:44.808	\N	0
111	2015-08-28 01:16:44.811	\N	2015-08-28 01:16:44.811	\N	0
112	2015-08-28 01:16:44.814	\N	2015-08-28 01:16:44.814	\N	0
113	2015-08-28 01:16:44.817	\N	2015-08-28 01:16:44.817	\N	0
114	2015-08-28 01:16:44.82	\N	2015-08-28 01:16:44.82	\N	0
115	2015-08-28 01:16:44.824	\N	2015-08-28 01:16:44.824	\N	0
116	2015-08-28 01:16:44.827	\N	2015-08-28 01:16:44.827	\N	0
117	2015-08-28 01:16:44.83	\N	2015-08-28 01:16:44.83	\N	0
118	2015-08-28 01:16:44.833	\N	2015-08-28 01:16:44.833	\N	0
119	2015-08-28 01:16:44.836	\N	2015-08-28 01:16:44.836	\N	0
120	2015-08-28 01:16:44.839	\N	2015-08-28 01:16:44.839	\N	0
121	2015-08-28 01:16:44.842	\N	2015-08-28 01:16:44.842	\N	0
122	2015-08-28 01:16:44.845	\N	2015-08-28 01:16:44.845	\N	0
123	2015-08-28 01:16:44.847	\N	2015-08-28 01:16:44.847	\N	0
124	2015-08-28 01:16:44.85	\N	2015-08-28 01:16:44.85	\N	0
125	2015-08-28 01:16:44.853	\N	2015-08-28 01:16:44.853	\N	0
126	2015-08-28 01:16:44.856	\N	2015-08-28 01:16:44.856	\N	0
127	2015-08-28 01:16:44.859	\N	2015-08-28 01:16:44.859	\N	0
128	2015-08-28 01:16:44.862	\N	2015-08-28 01:16:44.862	\N	0
129	2015-08-28 01:16:44.865	\N	2015-08-28 01:16:44.865	\N	0
130	2015-08-28 01:16:44.876	\N	2015-08-28 01:16:44.876	\N	0
131	2015-08-28 01:16:44.881	\N	2015-08-28 01:16:44.881	\N	0
132	2015-08-28 01:16:44.885	\N	2015-08-28 01:16:44.885	\N	0
133	2015-08-28 01:16:44.889	\N	2015-08-28 01:16:44.889	\N	0
134	2015-08-28 01:16:44.893	\N	2015-08-28 01:16:44.893	\N	0
135	2015-08-28 01:16:44.896	\N	2015-08-28 01:16:44.896	\N	0
136	2015-08-28 01:16:44.901	\N	2015-08-28 01:16:44.901	\N	0
137	2015-08-28 01:16:44.906	\N	2015-08-28 01:16:44.906	\N	0
138	2015-08-28 01:16:44.909	\N	2015-08-28 01:16:44.909	\N	0
139	2015-08-28 01:16:44.913	\N	2015-08-28 01:16:44.913	\N	0
140	2015-08-28 01:16:44.916	\N	2015-08-28 01:16:44.916	\N	0
141	2015-08-28 01:16:44.92	\N	2015-08-28 01:16:44.92	\N	0
142	2015-08-28 01:16:44.924	\N	2015-08-28 01:16:44.924	\N	0
143	2015-08-28 01:16:44.927	\N	2015-08-28 01:16:44.927	\N	0
144	2015-08-28 01:16:44.93	\N	2015-08-28 01:16:44.93	\N	0
145	2015-08-28 01:16:44.934	\N	2015-08-28 01:16:44.934	\N	0
146	2015-08-28 01:16:44.937	\N	2015-08-28 01:16:44.937	\N	0
147	2015-08-28 01:16:44.94	\N	2015-08-28 01:16:44.94	\N	0
148	2015-08-28 01:16:44.944	\N	2015-08-28 01:16:44.944	\N	0
149	2015-08-28 01:16:44.947	\N	2015-08-28 01:16:44.947	\N	0
150	2015-08-28 01:16:44.951	\N	2015-08-28 01:16:44.951	\N	0
151	2015-08-28 01:16:44.954	\N	2015-08-28 01:16:44.954	\N	0
152	2015-08-28 01:16:44.957	\N	2015-08-28 01:16:44.957	\N	0
153	2015-08-28 01:16:44.961	\N	2015-08-28 01:16:44.961	\N	0
154	2015-08-28 01:16:44.964	\N	2015-08-28 01:16:44.964	\N	0
155	2015-08-28 01:16:44.967	\N	2015-08-28 01:16:44.967	\N	0
156	2015-08-28 01:16:44.97	\N	2015-08-28 01:16:44.97	\N	0
157	2015-08-28 01:16:44.972	\N	2015-08-28 01:16:44.972	\N	0
158	2015-08-28 01:16:44.974	\N	2015-08-28 01:16:44.974	\N	0
159	2015-08-28 01:16:44.976	\N	2015-08-28 01:16:44.976	\N	0
160	2015-08-28 01:16:44.978	\N	2015-08-28 01:16:44.978	\N	0
161	2015-08-28 01:16:44.98	\N	2015-08-28 01:16:44.98	\N	0
162	2015-08-28 01:16:44.981	\N	2015-08-28 01:16:44.981	\N	0
163	2015-08-28 01:16:44.984	\N	2015-08-28 01:16:44.984	\N	0
164	2015-08-28 01:16:44.986	\N	2015-08-28 01:16:44.986	\N	0
165	2015-08-28 01:16:44.989	\N	2015-08-28 01:16:44.989	\N	0
166	2015-08-28 01:16:44.991	\N	2015-08-28 01:16:44.991	\N	0
167	2015-08-28 01:16:44.995	\N	2015-08-28 01:16:44.995	\N	0
168	2015-08-28 01:16:44.997	\N	2015-08-28 01:16:44.997	\N	0
169	2015-08-28 01:16:44.999	\N	2015-08-28 01:16:44.999	\N	0
170	2015-08-28 01:16:45.002	\N	2015-08-28 01:16:45.002	\N	0
171	2015-08-28 01:16:45.005	\N	2015-08-28 01:16:45.005	\N	0
172	2015-08-28 01:16:45.007	\N	2015-08-28 01:16:45.007	\N	0
173	2015-08-28 01:16:45.01	\N	2015-08-28 01:16:45.01	\N	0
174	2015-08-28 01:16:45.013	\N	2015-08-28 01:16:45.013	\N	0
175	2015-08-28 01:16:45.016	\N	2015-08-28 01:16:45.016	\N	0
176	2015-08-28 01:16:45.019	\N	2015-08-28 01:16:45.019	\N	0
177	2015-08-28 01:16:45.021	\N	2015-08-28 01:16:45.021	\N	0
178	2015-08-28 01:16:45.023	\N	2015-08-28 01:16:45.023	\N	0
179	2015-08-28 01:16:45.025	\N	2015-08-28 01:16:45.025	\N	0
180	2015-08-28 01:16:45.027	\N	2015-08-28 01:16:45.027	\N	0
181	2015-08-28 01:16:45.029	\N	2015-08-28 01:16:45.029	\N	0
182	2015-08-28 01:16:45.031	\N	2015-08-28 01:16:45.031	\N	0
183	2015-08-28 01:16:45.033	\N	2015-08-28 01:16:45.033	\N	0
184	2015-08-28 01:16:45.036	\N	2015-08-28 01:16:45.036	\N	0
185	2015-08-28 01:16:45.038	\N	2015-08-28 01:16:45.038	\N	0
186	2015-08-28 01:16:45.039	\N	2015-08-28 01:16:45.039	\N	0
187	2015-08-28 01:16:45.041	\N	2015-08-28 01:16:45.041	\N	0
188	2015-08-28 01:16:45.043	\N	2015-08-28 01:16:45.043	\N	0
189	2015-08-28 01:16:45.045	\N	2015-08-28 01:16:45.045	\N	0
190	2015-08-28 01:16:45.046	\N	2015-08-28 01:16:45.046	\N	0
191	2015-08-28 01:16:45.048	\N	2015-08-28 01:16:45.048	\N	0
192	2015-08-28 01:16:45.05	\N	2015-08-28 01:16:45.05	\N	0
193	2015-08-28 01:16:45.052	\N	2015-08-28 01:16:45.052	\N	0
194	2015-08-28 01:16:45.054	\N	2015-08-28 01:16:45.054	\N	0
195	2015-08-28 01:16:45.056	\N	2015-08-28 01:16:45.056	\N	0
196	2015-08-28 01:16:45.058	\N	2015-08-28 01:16:45.058	\N	0
197	2015-08-28 01:16:45.06	\N	2015-08-28 01:16:45.06	\N	0
198	2015-08-28 01:16:45.062	\N	2015-08-28 01:16:45.062	\N	0
199	2015-08-28 01:16:45.064	\N	2015-08-28 01:16:45.064	\N	0
\.


--
-- Name: translation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('translation_id_seq', 199, true);


--
-- Data for Name: translationvalue; Type: TABLE DATA; Schema: public; Owner: play
--

COPY translationvalue (id, creationdate, creationuser, lastupdate, lastupdateuser, version, content, lang, searchablecontent, translation_id) FROM stdin;
1	2015-08-28 01:16:43.827	\N	2015-08-28 01:16:43.827	\N	0	Manger	fr	manger	1
2	2015-08-28 01:16:43.844	\N	2015-08-28 01:16:43.844	\N	0	Prendre un verre	fr	prendre un verre	2
3	2015-08-28 01:16:43.85	\N	2015-08-28 01:16:43.85	\N	0	Sortir	fr	sortir	3
4	2015-08-28 01:16:43.858	\N	2015-08-28 01:16:43.858	\N	0	Me cultiver	fr	me cultiver	4
5	2015-08-28 01:16:43.865	\N	2015-08-28 01:16:43.865	\N	0	Faire des courses	fr	faire des courses	5
6	2015-08-28 01:16:43.874	\N	2015-08-28 01:16:43.874	\N	0	Faire du shopping "plaisir"	fr	faire du shopping "plaisir"	6
7	2015-08-28 01:16:43.88	\N	2015-08-28 01:16:43.88	\N	0	M'habiller	fr	m'habiller	7
8	2015-08-28 01:16:43.912	\N	2015-08-28 01:16:43.912	\N	0	Décorer ma maison	fr	decorer ma maison	8
9	2015-08-28 01:16:43.921	\N	2015-08-28 01:16:43.921	\N	0	Prendre soin de moi	fr	prendre soin de moi	9
10	2015-08-28 01:16:43.926	\N	2015-08-28 01:16:43.926	\N	0	Faire du sport	fr	faire du sport	10
11	2015-08-28 01:16:43.933	\N	2015-08-28 01:16:43.933	\N	0	Prendre soin de mes animaux	fr	prendre soin de mes animaux	11
12	2015-08-28 01:16:43.938	\N	2015-08-28 01:16:43.938	\N	0	Voyager	fr	voyager	12
13	2015-08-28 01:16:43.943	\N	2015-08-28 01:16:43.943	\N	0	Se loger	fr	se loger	13
14	2015-08-28 01:16:43.949	\N	2015-08-28 01:16:43.949	\N	0	S'occuper d'enfants	fr	s'occuper d'enfants	14
15	2015-08-28 01:16:43.955	\N	2015-08-28 01:16:43.955	\N	0	Bricoler	fr	bricoler	15
16	2015-08-28 01:16:43.961	\N	2015-08-28 01:16:43.962	\N	0	Lire	fr	lire	16
17	2015-08-28 01:16:43.967	\N	2015-08-28 01:16:43.967	\N	0	Jardiner	fr	jardiner	17
18	2015-08-28 01:16:43.973	\N	2015-08-28 01:16:43.973	\N	0	Ecouter de la musique	fr	ecouter de la musique	18
19	2015-08-28 01:16:43.978	\N	2015-08-28 01:16:43.978	\N	0	Etre high-tech	fr	etre high-tech	19
20	2015-08-28 01:16:43.983	\N	2015-08-28 01:16:43.983	\N	0	Jouer	fr	jouer	20
21	2015-08-28 01:16:44.457	\N	2015-08-28 01:16:44.457	\N	0	Horeca	fr	horeca	21
22	2015-08-28 01:16:44.462	\N	2015-08-28 01:16:44.463	\N	0	Hôtel	fr	hotel	22
23	2015-08-28 01:16:44.468	\N	2015-08-28 01:16:44.468	\N	0	Auberge de jeunesse	fr	auberge de jeunesse	23
24	2015-08-28 01:16:44.472	\N	2015-08-28 01:16:44.472	\N	0	Camping	fr	camping	24
25	2015-08-28 01:16:44.477	\N	2015-08-28 01:16:44.477	\N	0	B&B	fr	b&b	25
26	2015-08-28 01:16:44.482	\N	2015-08-28 01:16:44.482	\N	0	Hôtel	fr	hotel	26
27	2015-08-28 01:16:44.486	\N	2015-08-28 01:16:44.486	\N	0	Restaurant	fr	restaurant	27
28	2015-08-28 01:16:44.491	\N	2015-08-28 01:16:44.491	\N	0	Fast Food	fr	fast food	28
29	2015-08-28 01:16:44.496	\N	2015-08-28 01:16:44.496	\N	0	Asiatique	fr	asiatique	29
30	2015-08-28 01:16:44.501	\N	2015-08-28 01:16:44.501	\N	0	Européen	fr	europeen	30
31	2015-08-28 01:16:44.505	\N	2015-08-28 01:16:44.505	\N	0	Africain	fr	africain	31
32	2015-08-28 01:16:44.51	\N	2015-08-28 01:16:44.51	\N	0	Américain	fr	americain	32
33	2015-08-28 01:16:44.514	\N	2015-08-28 01:16:44.514	\N	0	Belge	fr	belge	33
34	2015-08-28 01:16:44.519	\N	2015-08-28 01:16:44.519	\N	0	Brunch & Sweet	fr	brunch & sweet	34
35	2015-08-28 01:16:44.523	\N	2015-08-28 01:16:44.523	\N	0	Gastronomique/Bistronomie	fr	gastronomique/bistronomie	35
36	2015-08-28 01:16:44.527	\N	2015-08-28 01:16:44.527	\N	0	Café	fr	cafe	36
37	2015-08-28 01:16:44.532	\N	2015-08-28 01:16:44.532	\N	0	Bières	fr	bieres	37
38	2015-08-28 01:16:44.536	\N	2015-08-28 01:16:44.536	\N	0	Vins	fr	vins	38
39	2015-08-28 01:16:44.541	\N	2015-08-28 01:16:44.541	\N	0	Champagne	fr	champagne	39
40	2015-08-28 01:16:44.545	\N	2015-08-28 01:16:44.545	\N	0	Cocktails	fr	cocktails	40
41	2015-08-28 01:16:44.55	\N	2015-08-28 01:16:44.55	\N	0	Jus & Smoothies	fr	jus & smoothies	41
42	2015-08-28 01:16:44.554	\N	2015-08-28 01:16:44.554	\N	0	Traiteur	fr	traiteur	42
43	2015-08-28 01:16:44.558	\N	2015-08-28 01:16:44.558	\N	0	Asiatique	fr	asiatique	43
44	2015-08-28 01:16:44.562	\N	2015-08-28 01:16:44.562	\N	0	Européen	fr	europeen	44
45	2015-08-28 01:16:44.566	\N	2015-08-28 01:16:44.566	\N	0	Africain	fr	africain	45
46	2015-08-28 01:16:44.571	\N	2015-08-28 01:16:44.571	\N	0	Américain	fr	americain	46
47	2015-08-28 01:16:44.574	\N	2015-08-28 01:16:44.574	\N	0	Belge	fr	belge	47
48	2015-08-28 01:16:44.579	\N	2015-08-28 01:16:44.579	\N	0	Gastronomique	fr	gastronomique	48
49	2015-08-28 01:16:44.583	\N	2015-08-28 01:16:44.583	\N	0	Magasins	fr	magasins	49
50	2015-08-28 01:16:44.586	\N	2015-08-28 01:16:44.586	\N	0	Alimentation	fr	alimentation	50
51	2015-08-28 01:16:44.591	\N	2015-08-28 01:16:44.591	\N	0	Supermarché	fr	supermarche	51
52	2015-08-28 01:16:44.595	\N	2015-08-28 01:16:44.595	\N	0	Boucherie & Charcuterie	fr	boucherie & charcuterie	52
53	2015-08-28 01:16:44.599	\N	2015-08-28 01:16:44.599	\N	0	Poissonerie	fr	poissonerie	53
54	2015-08-28 01:16:44.609	\N	2015-08-28 01:16:44.609	\N	0	Boulangerie & Patisserie	fr	boulangerie & patisserie	54
55	2015-08-28 01:16:44.615	\N	2015-08-28 01:16:44.615	\N	0	Fromagerie	fr	fromagerie	55
56	2015-08-28 01:16:44.622	\N	2015-08-28 01:16:44.622	\N	0	Bières & Vins	fr	bieres & vins	56
57	2015-08-28 01:16:44.626	\N	2015-08-28 01:16:44.626	\N	0	Herbes & Epices	fr	herbes & epices	57
58	2015-08-28 01:16:44.63	\N	2015-08-28 01:16:44.63	\N	0	Confiseries & Chocolat	fr	confiseries & chocolat	58
59	2015-08-28 01:16:44.634	\N	2015-08-28 01:16:44.634	\N	0	Loisirs	fr	loisirs	59
60	2015-08-28 01:16:44.636	\N	2015-08-28 01:16:44.636	\N	0	Sport & Aventure	fr	sport & aventure	60
61	2015-08-28 01:16:44.639	\N	2015-08-28 01:16:44.639	\N	0	Maison & Décoration	fr	maison & decoration	61
62	2015-08-28 01:16:44.642	\N	2015-08-28 01:16:44.642	\N	0	Jardin & Fleurs	fr	jardin & fleurs	62
63	2015-08-28 01:16:44.646	\N	2015-08-28 01:16:44.646	\N	0	Jeux & Jouets	fr	jeux & jouets	63
64	2015-08-28 01:16:44.65	\N	2015-08-28 01:16:44.65	\N	0	Multimédia & Informatique	fr	multimedia & informatique	64
65	2015-08-28 01:16:44.654	\N	2015-08-28 01:16:44.654	\N	0	Animaux	fr	animaux	65
66	2015-08-28 01:16:44.659	\N	2015-08-28 01:16:44.659	\N	0	Voyages	fr	voyages	66
67	2015-08-28 01:16:44.663	\N	2015-08-28 01:16:44.663	\N	0	Livres & Journaux	fr	livres & journaux	67
68	2015-08-28 01:16:44.667	\N	2015-08-28 01:16:44.667	\N	0	Mode	fr	mode	68
69	2015-08-28 01:16:44.671	\N	2015-08-28 01:16:44.671	\N	0	Vêtements Enfants	fr	vetements enfants	69
70	2015-08-28 01:16:44.675	\N	2015-08-28 01:16:44.675	\N	0	Vêtements Hommes	fr	vetements hommes	70
71	2015-08-28 01:16:44.679	\N	2015-08-28 01:16:44.679	\N	0	Vêtements Femmes	fr	vetements femmes	71
72	2015-08-28 01:16:44.682	\N	2015-08-28 01:16:44.682	\N	0	Chaussures	fr	chaussures	72
73	2015-08-28 01:16:44.686	\N	2015-08-28 01:16:44.686	\N	0	Bijoux & Montres	fr	bijoux & montres	73
74	2015-08-28 01:16:44.69	\N	2015-08-28 01:16:44.69	\N	0	Parfums & Cosmétique	fr	parfums & cosmetique	74
75	2015-08-28 01:16:44.693	\N	2015-08-28 01:16:44.693	\N	0	Lingerie	fr	lingerie	75
76	2015-08-28 01:16:44.696	\N	2015-08-28 01:16:44.696	\N	0	Lunettes	fr	lunettes	76
77	2015-08-28 01:16:44.699	\N	2015-08-28 01:16:44.699	\N	0	Utiles	fr	utiles	77
78	2015-08-28 01:16:44.704	\N	2015-08-28 01:16:44.704	\N	0	Electroménager	fr	electromenager	78
79	2015-08-28 01:16:44.708	\N	2015-08-28 01:16:44.708	\N	0	Bricolage	fr	bricolage	79
80	2015-08-28 01:16:44.712	\N	2015-08-28 01:16:44.712	\N	0	Papeterie	fr	papeterie	80
81	2015-08-28 01:16:44.714	\N	2015-08-28 01:16:44.714	\N	0	Voiture	fr	voiture	81
82	2015-08-28 01:16:44.717	\N	2015-08-28 01:16:44.717	\N	0	Droguerie	fr	droguerie	82
83	2015-08-28 01:16:44.721	\N	2015-08-28 01:16:44.721	\N	0	Vélo	fr	velo	83
84	2015-08-28 01:16:44.725	\N	2015-08-28 01:16:44.725	\N	0	Beauté & Bien Être	fr	beaute & bien etre	84
85	2015-08-28 01:16:44.73	\N	2015-08-28 01:16:44.73	\N	0	Soins	fr	soins	85
86	2015-08-28 01:16:44.735	\N	2015-08-28 01:16:44.735	\N	0	Coiffure	fr	coiffure	86
87	2015-08-28 01:16:44.738	\N	2015-08-28 01:16:44.738	\N	0	Esthétique	fr	esthetique	87
88	2015-08-28 01:16:44.742	\N	2015-08-28 01:16:44.742	\N	0	Manicure & Pédicure	fr	manicure & pedicure	88
89	2015-08-28 01:16:44.746	\N	2015-08-28 01:16:44.746	\N	0	Massage	fr	massage	89
90	2015-08-28 01:16:44.75	\N	2015-08-28 01:16:44.75	\N	0	Tatouage & Piercing	fr	tatouage & piercing	90
91	2015-08-28 01:16:44.753	\N	2015-08-28 01:16:44.753	\N	0	Toilettage	fr	toilettage	91
92	2015-08-28 01:16:44.756	\N	2015-08-28 01:16:44.756	\N	0	Etablissement	fr	etablissement	92
93	2015-08-28 01:16:44.759	\N	2015-08-28 01:16:44.759	\N	0	Sauna & Hammam	fr	sauna & hammam	93
94	2015-08-28 01:16:44.762	\N	2015-08-28 01:16:44.762	\N	0	Solarium	fr	solarium	94
95	2015-08-28 01:16:44.765	\N	2015-08-28 01:16:44.765	\N	0	Santé	fr	sante	95
96	2015-08-28 01:16:44.768	\N	2015-08-28 01:16:44.768	\N	0	Médecine Conventionnelle	fr	medecine conventionnelle	96
97	2015-08-28 01:16:44.77	\N	2015-08-28 01:16:44.77	\N	0	Médecine Générale	fr	medecine generale	97
98	2015-08-28 01:16:44.773	\N	2015-08-28 01:16:44.773	\N	0	Ophtalmologie	fr	ophtalmologie	98
99	2015-08-28 01:16:44.775	\N	2015-08-28 01:16:44.775	\N	0	ORL	fr	orl	99
100	2015-08-28 01:16:44.778	\N	2015-08-28 01:16:44.778	\N	0	Gynécologie	fr	gynecologie	100
101	2015-08-28 01:16:44.781	\N	2015-08-28 01:16:44.781	\N	0	Dentisterie	fr	dentisterie	101
102	2015-08-28 01:16:44.783	\N	2015-08-28 01:16:44.783	\N	0	Kinésithérapie	fr	kinesitherapie	102
103	2015-08-28 01:16:44.786	\N	2015-08-28 01:16:44.786	\N	0	Dermatologie	fr	dermatologie	103
104	2015-08-28 01:16:44.788	\N	2015-08-28 01:16:44.788	\N	0	Psychologie	fr	psychologie	104
105	2015-08-28 01:16:44.79	\N	2015-08-28 01:16:44.79	\N	0	Médecine Non-Conventionnelle	fr	medecine non-conventionnelle	105
106	2015-08-28 01:16:44.794	\N	2015-08-28 01:16:44.794	\N	0	Acupuncture	fr	acupuncture	106
107	2015-08-28 01:16:44.797	\N	2015-08-28 01:16:44.797	\N	0	Ostéopatie	fr	osteopatie	107
108	2015-08-28 01:16:44.801	\N	2015-08-28 01:16:44.801	\N	0	Homéopathie	fr	homeopathie	108
109	2015-08-28 01:16:44.805	\N	2015-08-28 01:16:44.805	\N	0	Hypnose	fr	hypnose	109
110	2015-08-28 01:16:44.809	\N	2015-08-28 01:16:44.809	\N	0	Naturopathie	fr	naturopathie	110
111	2015-08-28 01:16:44.812	\N	2015-08-28 01:16:44.812	\N	0	Autres	fr	autres	111
112	2015-08-28 01:16:44.815	\N	2015-08-28 01:16:44.815	\N	0	Pharmacie	fr	pharmacie	112
113	2015-08-28 01:16:44.818	\N	2015-08-28 01:16:44.818	\N	0	Hôpitaux	fr	hopitaux	113
114	2015-08-28 01:16:44.821	\N	2015-08-28 01:16:44.821	\N	0	Centres Médicaux	fr	centres medicaux	114
115	2015-08-28 01:16:44.825	\N	2015-08-28 01:16:44.825	\N	0	Vétérinaire	fr	veterinaire	115
116	2015-08-28 01:16:44.827	\N	2015-08-28 01:16:44.827	\N	0	Services de proximité	fr	services de proximite	116
117	2015-08-28 01:16:44.831	\N	2015-08-28 01:16:44.831	\N	0	Création & Réparation	fr	creation & reparation	117
118	2015-08-28 01:16:44.834	\N	2015-08-28 01:16:44.834	\N	0	Cordonnerie & Serrurrerie	fr	cordonnerie & serrurrerie	118
119	2015-08-28 01:16:44.837	\N	2015-08-28 01:16:44.837	\N	0	Couture & Retouches	fr	couture & retouches	119
120	2015-08-28 01:16:44.84	\N	2015-08-28 01:16:44.84	\N	0	Informatique	fr	informatique	120
121	2015-08-28 01:16:44.843	\N	2015-08-28 01:16:44.843	\N	0	Smartphones & Tablettes	fr	smartphones & tablettes	121
122	2015-08-28 01:16:44.846	\N	2015-08-28 01:16:44.846	\N	0	Plombier	fr	plombier	122
123	2015-08-28 01:16:44.848	\N	2015-08-28 01:16:44.848	\N	0	Electricien	fr	electricien	123
124	2015-08-28 01:16:44.851	\N	2015-08-28 01:16:44.851	\N	0	Jardinier	fr	jardinier	124
125	2015-08-28 01:16:44.854	\N	2015-08-28 01:16:44.854	\N	0	Finances & Droit	fr	finances & droit	125
126	2015-08-28 01:16:44.857	\N	2015-08-28 01:16:44.857	\N	0	Banque	fr	banque	126
127	2015-08-28 01:16:44.86	\N	2015-08-28 01:16:44.86	\N	0	Mistercash	fr	mistercash	127
128	2015-08-28 01:16:44.863	\N	2015-08-28 01:16:44.863	\N	0	Assurances	fr	assurances	128
129	2015-08-28 01:16:44.872	\N	2015-08-28 01:16:44.872	\N	0	Avocat	fr	avocat	129
130	2015-08-28 01:16:44.877	\N	2015-08-28 01:16:44.877	\N	0	Notaire	fr	notaire	130
131	2015-08-28 01:16:44.883	\N	2015-08-28 01:16:44.883	\N	0	Comptable	fr	comptable	131
132	2015-08-28 01:16:44.886	\N	2015-08-28 01:16:44.886	\N	0	Voiture	fr	voiture	132
133	2015-08-28 01:16:44.89	\N	2015-08-28 01:16:44.89	\N	0	Garage	fr	garage	133
134	2015-08-28 01:16:44.894	\N	2015-08-28 01:16:44.894	\N	0	Station Essence	fr	station essence	134
135	2015-08-28 01:16:44.897	\N	2015-08-28 01:16:44.897	\N	0	Carwash	fr	carwash	135
136	2015-08-28 01:16:44.903	\N	2015-08-28 01:16:44.903	\N	0	Parking	fr	parking	136
137	2015-08-28 01:16:44.907	\N	2015-08-28 01:16:44.907	\N	0	Pare-brise	fr	pare-brise	137
138	2015-08-28 01:16:44.91	\N	2015-08-28 01:16:44.91	\N	0	Pneus	fr	pneus	138
139	2015-08-28 01:16:44.914	\N	2015-08-28 01:16:44.914	\N	0	Contrôle Technique	fr	controle technique	139
140	2015-08-28 01:16:44.917	\N	2015-08-28 01:16:44.917	\N	0	Autres	fr	autres	140
141	2015-08-28 01:16:44.921	\N	2015-08-28 01:16:44.921	\N	0	Imprimerie	fr	imprimerie	141
142	2015-08-28 01:16:44.925	\N	2015-08-28 01:16:44.925	\N	0	Garderie & Crèche	fr	garderie & creche	142
143	2015-08-28 01:16:44.928	\N	2015-08-28 01:16:44.928	\N	0	Agence Immobilière	fr	agence immobiliere	143
144	2015-08-28 01:16:44.931	\N	2015-08-28 01:16:44.931	\N	0	Téléphonie & Internet	fr	telephonie & internet	144
145	2015-08-28 01:16:44.934	\N	2015-08-28 01:16:44.934	\N	0	Centre de Repassage	fr	centre de repassage	145
146	2015-08-28 01:16:44.938	\N	2015-08-28 01:16:44.938	\N	0	Etudes & Formations	fr	etudes & formations	146
147	2015-08-28 01:16:44.941	\N	2015-08-28 01:16:44.941	\N	0	Détente	fr	detente	147
148	2015-08-28 01:16:44.945	\N	2015-08-28 01:16:44.945	\N	0	Culture	fr	culture	148
149	2015-08-28 01:16:44.948	\N	2015-08-28 01:16:44.948	\N	0	Théâtre	fr	theatre	149
150	2015-08-28 01:16:44.952	\N	2015-08-28 01:16:44.952	\N	0	Opéra	fr	opera	150
151	2015-08-28 01:16:44.955	\N	2015-08-28 01:16:44.955	\N	0	Concert	fr	concert	151
152	2015-08-28 01:16:44.958	\N	2015-08-28 01:16:44.958	\N	0	Cirque	fr	cirque	152
153	2015-08-28 01:16:44.962	\N	2015-08-28 01:16:44.962	\N	0	Musée	fr	musee	153
154	2015-08-28 01:16:44.964	\N	2015-08-28 01:16:44.964	\N	0	Cinéma	fr	cinema	154
155	2015-08-28 01:16:44.967	\N	2015-08-28 01:16:44.967	\N	0	Galerie	fr	galerie	155
156	2015-08-28 01:16:44.971	\N	2015-08-28 01:16:44.971	\N	0	Zoo & Aquarium	fr	zoo & aquarium	156
157	2015-08-28 01:16:44.973	\N	2015-08-28 01:16:44.973	\N	0	Soirées	fr	soirees	157
158	2015-08-28 01:16:44.975	\N	2015-08-28 01:16:44.975	\N	0	Discothèque	fr	discotheque	158
159	2015-08-28 01:16:44.977	\N	2015-08-28 01:16:44.977	\N	0	Karaoké	fr	karaoke	159
160	2015-08-28 01:16:44.978	\N	2015-08-28 01:16:44.978	\N	0	Bar Lounge	fr	bar lounge	160
161	2015-08-28 01:16:44.98	\N	2015-08-28 01:16:44.98	\N	0	Bowling	fr	bowling	161
162	2015-08-28 01:16:44.982	\N	2015-08-28 01:16:44.982	\N	0	Café-Théâtre	fr	cafe-theatre	162
163	2015-08-28 01:16:44.984	\N	2015-08-28 01:16:44.984	\N	0	Bar Holebi	fr	bar holebi	163
164	2015-08-28 01:16:44.987	\N	2015-08-28 01:16:44.987	\N	0	Sport	fr	sport	164
165	2015-08-28 01:16:44.99	\N	2015-08-28 01:16:44.99	\N	0	Tennis	fr	tennis	165
166	2015-08-28 01:16:44.992	\N	2015-08-28 01:16:44.992	\N	0	Badminton & Squash	fr	badminton & squash	166
167	2015-08-28 01:16:44.995	\N	2015-08-28 01:16:44.995	\N	0	Escalade	fr	escalade	167
168	2015-08-28 01:16:44.997	\N	2015-08-28 01:16:44.997	\N	0	Piscine	fr	piscine	168
169	2015-08-28 01:16:45	\N	2015-08-28 01:16:45	\N	0	Fitness & Musculation	fr	fitness & musculation	169
170	2015-08-28 01:16:45.003	\N	2015-08-28 01:16:45.003	\N	0	Karting	fr	karting	170
171	2015-08-28 01:16:45.005	\N	2015-08-28 01:16:45.005	\N	0	Danse & Yoga	fr	danse & yoga	171
172	2015-08-28 01:16:45.008	\N	2015-08-28 01:16:45.008	\N	0	Golf	fr	golf	172
173	2015-08-28 01:16:45.011	\N	2015-08-28 01:16:45.011	\N	0	Autres	fr	autres	173
174	2015-08-28 01:16:45.014	\N	2015-08-28 01:16:45.014	\N	0	Casino	fr	casino	174
175	2015-08-28 01:16:45.017	\N	2015-08-28 01:16:45.017	\N	0	Jeux de Société	fr	jeux de societe	175
176	2015-08-28 01:16:45.019	\N	2015-08-28 01:16:45.019	\N	0	Jeux Vidéo	fr	jeux video	176
177	2015-08-28 01:16:45.021	\N	2015-08-28 01:16:45.021	\N	0	Jeux d'Enfants	fr	jeux d'enfants	177
178	2015-08-28 01:16:45.024	\N	2015-08-28 01:16:45.024	\N	0	Administrations Publiques	fr	administrations publiques	178
179	2015-08-28 01:16:45.025	\N	2015-08-28 01:16:45.025	\N	0	Services Pratiques	fr	services pratiques	179
180	2015-08-28 01:16:45.027	\N	2015-08-28 01:16:45.027	\N	0	Poste	fr	poste	180
181	2015-08-28 01:16:45.029	\N	2015-08-28 01:16:45.029	\N	0	Police	fr	police	181
182	2015-08-28 01:16:45.031	\N	2015-08-28 01:16:45.031	\N	0	Pompiers	fr	pompiers	182
183	2015-08-28 01:16:45.034	\N	2015-08-28 01:16:45.034	\N	0	Bibliothèque	fr	bibliotheque	183
184	2015-08-28 01:16:45.036	\N	2015-08-28 01:16:45.036	\N	0	Communal	fr	communal	184
185	2015-08-28 01:16:45.038	\N	2015-08-28 01:16:45.038	\N	0	Etat Civil & Population	fr	etat civil & population	185
186	2015-08-28 01:16:45.04	\N	2015-08-28 01:16:45.04	\N	0	Energie	fr	energie	186
187	2015-08-28 01:16:45.041	\N	2015-08-28 01:16:45.041	\N	0	Emploi	fr	emploi	187
188	2015-08-28 01:16:45.043	\N	2015-08-28 01:16:45.043	\N	0	Urbanisme	fr	urbanisme	188
189	2015-08-28 01:16:45.045	\N	2015-08-28 01:16:45.045	\N	0	CPAS	fr	cpas	189
190	2015-08-28 01:16:45.047	\N	2015-08-28 01:16:45.047	\N	0	Office du Tourisme	fr	office du tourisme	190
191	2015-08-28 01:16:45.049	\N	2015-08-28 01:16:45.049	\N	0	Fédéral & International	fr	federal & international	191
192	2015-08-28 01:16:45.05	\N	2015-08-28 01:16:45.05	\N	0	Economie	fr	economie	192
193	2015-08-28 01:16:45.052	\N	2015-08-28 01:16:45.052	\N	0	Emploi	fr	emploi	193
194	2015-08-28 01:16:45.055	\N	2015-08-28 01:16:45.055	\N	0	Justice	fr	justice	194
195	2015-08-28 01:16:45.057	\N	2015-08-28 01:16:45.057	\N	0	Mobilité	fr	mobilite	195
196	2015-08-28 01:16:45.059	\N	2015-08-28 01:16:45.059	\N	0	Impôts	fr	impots	196
197	2015-08-28 01:16:45.061	\N	2015-08-28 01:16:45.061	\N	0	Logement	fr	logement	197
198	2015-08-28 01:16:45.063	\N	2015-08-28 01:16:45.063	\N	0	Santé	fr	sante	198
199	2015-08-28 01:16:45.065	\N	2015-08-28 01:16:45.065	\N	0	Ambassade	fr	ambassade	199
\.


--
-- Name: translationvalue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('translationvalue_id_seq', 199, true);


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

