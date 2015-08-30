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
Promotion	1	2015-08-29 19:06:58.919	\N	2015-08-29 19:06:58.919	\N	0		2015-08-29 21:06:58.919	tartes aux fraises	2015-08-28 19:06:58.919	Tartes aux fraises	1	0.66666666666666663	12	8		1	\N
BusinessNotification	2	2015-08-29 19:07:11.622	\N	2015-08-29 19:07:11.622	\N	0		2015-08-30 01:07:11.622	voici notre derniere creation pour l'anniversaire d'enzo!	2015-08-28 19:07:11.622	Voici notre dernière création pour l'anniversaire d'Enzo!	\N	\N	\N	\N	\N	1	\N
BusinessNotification	3	2015-08-29 19:07:22.672	\N	2015-08-29 19:07:22.672	\N	0		2015-08-30 19:07:22.672	n'oubliez pas de feter papa ce dimanche nous, on est prets!	2015-08-28 19:07:22.672	N'oubliez pas de fêter Papa ce dimanche… Nous, on est prêts!	\N	\N	\N	\N	\N	1	\N
BusinessNotification	4	2015-08-29 19:07:28.556	\N	2015-08-29 19:07:28.556	\N	0		2015-08-31 19:07:28.556	bienvenue a l'expo "miel dans tous ses etats" au centre culturel!	2015-08-28 19:07:28.556	Bienvenue à l'expo "Miel dans tous ses états" au Centre Culturel!	\N	\N	\N	\N	\N	1	\N
BusinessNotification	5	2015-08-29 19:07:32.701	\N	2015-08-29 19:07:32.701	\N	0		2015-08-30 18:07:32.701	saviez-vous que tout les fruits que nous utilisons sont bio et locaux?	2015-08-28 19:07:32.701	Saviez-vous que tout les fruits que nous utilisons sont bio et locaux?	\N	\N	\N	\N	\N	1	\N
BusinessNotification	6	2015-08-29 19:07:35.957	\N	2015-08-29 19:07:35.957	\N	0		2015-08-31 14:07:35.957	nous serons exceptionellement fermes ce weekend!	2015-08-28 19:07:35.957	Nous serons exceptionellement fermés ce weekend!	\N	\N	\N	\N	\N	1	\N
Promotion	7	2015-08-29 19:07:35.963	\N	2015-08-29 19:07:35.963	\N	0		2015-08-30 18:07:35.963	pots de miel 300ml	2015-08-28 19:07:35.963	Pots de miel 300ml	\N	0.100000000000000006	\N	\N		1	\N
Promotion	8	2015-08-29 19:07:35.966	\N	2015-08-29 19:07:35.966	\N	0		2015-08-30 01:07:35.966	2 + 1 couque gratuite	2015-08-28 19:07:35.966	2 + 1 couque gratuite	\N	\N	\N	\N		1	\N
BusinessNotification	9	2015-08-29 19:07:35.971	\N	2015-08-29 19:07:35.971	\N	0		2015-08-30 00:07:35.971	bientot la saison des barbecues preparez-vous!  :)	2015-08-28 19:07:35.971	Bientôt la saison des barbecues… Préparez-vous!  :)	\N	\N	\N	\N	\N	2	\N
BusinessNotification	10	2015-08-29 19:07:41.112	\N	2015-08-29 19:07:41.112	\N	0		2015-08-30 18:07:41.112	je vous presente mr marc, mon fournisseur de buf de qualite du brabant wallon!	2015-08-28 19:07:41.112	Je vous présente Mr Marc, mon fournisseur de bœuf de qualité du Brabant Wallon!	\N	\N	\N	\N	\N	2	\N
BusinessNotification	11	2015-08-29 19:07:46.109	\N	2015-08-29 19:07:46.109	\N	0		2015-09-01 12:07:46.109	faites mariner vos viandes des la veille au soir pour un meilleur gout!	2015-08-28 19:07:46.109	Faites mariner vos viandes dès la veille au soir pour un meilleur goût!	\N	\N	\N	\N	\N	2	\N
BusinessNotification	12	2015-08-29 19:07:52.779	\N	2015-08-29 19:07:52.779	\N	0		2015-09-02 10:07:52.779	nouveau boudin blanc maison a decouvrir!	2015-08-28 19:07:52.779	Nouveau boudin blanc maison à découvrir!	\N	\N	\N	\N	\N	2	\N
BusinessNotification	13	2015-08-29 19:07:56.826	\N	2015-08-29 19:07:56.826	\N	0		2015-08-29 22:07:56.826	l'equipe au complet en plein travail!	2015-08-28 19:07:56.826	L'équipe au complet en plein travail!	\N	\N	\N	\N	\N	2	\N
Promotion	14	2015-08-29 19:08:03.35	\N	2015-08-29 19:08:03.35	\N	0		2015-08-29 23:08:03.35	brochettes de poulet	2015-08-28 19:08:03.35	Brochettes de poulet	\N	0.149999999999999994	\N	\N		2	\N
Promotion	15	2015-08-29 19:08:12.974	\N	2015-08-29 19:08:12.974	\N	0		2015-08-30 18:08:12.973	sauce banzai	2015-08-28 19:08:12.973	Sauce Banzaï	\N	0.200000000000000011	\N	\N		2	\N
Promotion	16	2015-08-29 19:08:16.832	\N	2015-08-29 19:08:16.832	\N	0		2015-09-01 23:08:16.832	roti de porc	2015-08-28 19:08:16.832	Roti de porc	0.25	0.100000000000000006	15	6	kg	2	\N
Promotion	17	2015-08-29 19:08:18.556	\N	2015-08-29 19:08:18.556	\N	0		2015-08-29 22:08:18.555	pate au poivre vert	2015-08-28 19:08:18.555	Pâté au poivre vert	\N	0.149999999999999994	25	2	kg	2	\N
BusinessNotification	18	2015-08-29 19:08:20.524	\N	2015-08-29 19:08:20.524	\N	0		2015-08-30 00:08:20.524	venez nous retrouvez tous les mardis des 18h00 pour l'aquagym!	2015-08-28 19:08:20.524	Venez nous retrouvez tous les mardis dès 18h00 pour l'aquagym!	\N	\N	\N	\N	\N	3	\N
BusinessNotification	19	2015-08-29 19:08:23.579	\N	2015-08-29 19:08:23.579	\N	0		2015-08-30 04:08:23.578	les 6iemes primaire de saint michel sont venus nous dire bonjour!	2015-08-28 19:08:23.578	Les 6ièmes primaire de Saint Michel sont venus nous dire bonjour!	\N	\N	\N	\N	\N	3	\N
BusinessNotification	20	2015-08-29 19:08:26.015	\N	2015-08-29 19:08:26.015	\N	0		2015-08-31 14:08:26.015	fiers de notre athlete national!	2015-08-28 19:08:26.015	Fiers de notre athlète national!	\N	\N	\N	\N	\N	3	\N
BusinessNotification	21	2015-08-29 19:08:28.228	\N	2015-08-29 19:08:28.228	\N	0		2015-09-01 23:08:28.228	il fait chaud dehors, il fait juste bon dedans 28c sous l'eau!	2015-08-28 19:08:28.228	Il fait chaud dehors, il fait juste bon dedans… 28°C sous l'eau!	\N	\N	\N	\N	\N	3	\N
BusinessNotification	22	2015-08-29 19:08:30.318	\N	2015-08-29 19:08:30.318	\N	0		2015-08-29 22:08:30.318	toutes les 2 heures, les sols de nos cabines sont nettoyes a fond!	2015-08-28 19:08:30.318	Toutes les 2 heures, les sols de nos cabines sont nettoyés à fond!	\N	\N	\N	\N	\N	3	\N
Promotion	23	2015-08-29 19:08:32.046	\N	2015-08-29 19:08:32.046	\N	0		2015-08-30 04:08:32.046	entree adulte "soiree"	2015-08-28 19:08:32.046	Entrée adulte "Soirée"	\N	0.300000000000000044	\N	\N		3	\N
Promotion	24	2015-08-29 19:08:32.053	\N	2015-08-29 19:08:32.053	\N	0		2015-09-01 12:08:32.053	bonnets 'speedo'	2015-08-28 19:08:32.053	Bonnets 'Speedo'	\N	0.5	\N	\N		3	\N
BusinessNotification	25	2015-08-29 19:08:32.062	\N	2015-08-29 19:08:32.062	\N	0		2015-08-30 04:08:32.062	nous proposons aujourd'hui en lunch du jour une salade de gesiers aux pommes.	2015-08-28 19:08:32.062	Nous proposons aujourd'hui en lunch du jour une salade de gésiers aux pommes.	\N	\N	\N	\N	\N	4	\N
BusinessNotification	26	2015-08-29 19:08:33.411	\N	2015-08-29 19:08:33.411	\N	0		2015-08-31 14:08:33.411	bienvenue a michel notre nouveau cuisinier!	2015-08-28 19:08:33.411	Bienvenue à Michel notre nouveau cuisinier!	\N	\N	\N	\N	\N	4	\N
BusinessNotification	27	2015-08-29 19:08:35.411	\N	2015-08-29 19:08:35.411	\N	0		2015-08-30 02:08:35.411	7h00, deja l'heure pour nous d'aller vous chercher de bons produits!	2015-08-28 19:08:35.411	7h00, déjà l'heure pour nous d'aller vous chercher de bons produits!	\N	\N	\N	\N	\N	4	\N
BusinessNotification	28	2015-08-29 19:08:41.499	\N	2015-08-29 19:08:41.499	\N	0		2015-09-02 21:08:41.499	n'oubliez pas reservez votre table si vous venez en groupe!	2015-08-28 19:08:41.499	N'oubliez pas réservez votre table si vous venez en groupe!	\N	\N	\N	\N	\N	4	\N
BusinessNotification	29	2015-08-29 19:08:41.513	\N	2015-08-29 19:08:41.513	\N	0		2015-08-30 00:08:41.513	happy hour ce jeudi soir sur les cocktails de 18 a 19h!	2015-08-28 19:08:41.513	Happy Hour ce jeudi soir sur les cocktails de 18 à 19h!	\N	\N	\N	\N	\N	4	\N
Promotion	30	2015-08-29 19:08:45.391	\N	2015-08-29 19:08:45.391	\N	0		2015-09-01 12:08:45.391	2 couverts	2015-08-28 19:08:45.391	2 couverts	1	0.100000000000000006	\N	10		4	\N
Promotion	31	2015-08-29 19:08:45.394	\N	2015-08-29 19:08:45.394	\N	0		2015-09-01 23:08:45.394	steaks de saumon	2015-08-28 19:08:45.394	Steaks de saumon	1	\N	18	8		4	\N
BusinessNotification	32	2015-08-29 19:08:45.396	\N	2015-08-29 19:08:45.396	\N	0		2015-08-29 22:08:45.396	vous revez d'un combishort pour l'ete? ils vous attendent!	2015-08-28 19:08:45.396	Vous rêvez d'un combishort pour l'été? Ils vous attendent!	\N	\N	\N	\N	\N	5	\N
BusinessNotification	33	2015-08-29 19:08:47.343	\N	2015-08-29 19:08:47.343	\N	0		2015-08-30 00:08:47.343	le jeans est partout... depechez vous de regarnir votre garde-robe!	2015-08-28 19:08:47.343	Le jeans est partout... Dépêchez vous de regarnir votre garde-robe!	\N	\N	\N	\N	\N	5	\N
BusinessNotification	34	2015-08-29 19:08:48.896	\N	2015-08-29 19:08:48.896	\N	0		2015-08-30 04:08:48.896	retouches gratuites sur vos robes de soiree jusqu'aux soldes!	2015-08-28 19:08:48.896	Retouches gratuites sur vos robes de soirée jusqu'aux soldes!	\N	\N	\N	\N	\N	5	\N
BusinessNotification	35	2015-08-29 19:08:52.182	\N	2015-08-29 19:08:52.182	\N	0		2015-08-31 14:08:52.182	seance relooking chez via moda ce vendredi soir. inscriptions ouvertes!	2015-08-28 19:08:52.182	Séance relooking chez Via Moda ce vendredi soir. Inscriptions ouvertes!	\N	\N	\N	\N	\N	5	\N
BusinessNotification	36	2015-08-29 19:08:53.881	\N	2015-08-29 19:08:53.881	\N	0		2015-09-01 23:08:53.881	que pensez-vous du nouvel arrivage?..	2015-08-28 19:08:53.881	Que pensez-vous du nouvel arrivage?..	\N	\N	\N	\N	\N	5	\N
Promotion	37	2015-08-29 19:08:59.029	\N	2015-08-29 19:08:59.029	\N	0		2015-08-29 22:08:59.029	chapeaux de mariage	2015-08-28 19:08:59.029	Chapeaux de mariage	\N	0.149999999999999994	\N	\N		5	\N
Promotion	38	2015-08-29 19:09:02.699	\N	2015-08-29 19:09:02.699	\N	0		2015-08-30 04:09:02.699	bottes daim bouvy	2015-08-28 19:09:02.699	Bottes daim BOUVY	\N	0.200000000000000011	\N	\N		5	\N
Promotion	39	2015-08-29 19:09:04.495	\N	2015-08-29 19:09:04.495	\N	0		2015-08-29 22:09:04.495	vestes cuir chanel	2015-08-28 19:09:04.495	Vestes cuir CHANEL	1	0.300000000000000044	399	5		5	\N
BusinessNotification	40	2015-08-29 19:09:06.193	\N	2015-08-29 19:09:06.193	\N	0		2015-09-02 10:09:06.193	tous nos produits sont sans ammoniac pour limiter l'aggression de votre peau!	2015-08-28 19:09:06.193	Tous nos produits sont sans ammoniac pour limiter l'aggression de votre peau!	\N	\N	\N	\N	\N	6	\N
BusinessNotification	41	2015-08-29 19:09:08.252	\N	2015-08-29 19:09:08.252	\N	0		2015-08-30 04:09:08.252	avez-vous deja essayer le nouveau soin loreal?	2015-08-28 19:09:08.252	Avez-vous déjà essayer le nouveau soin LOREAL?	\N	\N	\N	\N	\N	6	\N
BusinessNotification	42	2015-08-29 19:09:10.787	\N	2015-08-29 19:09:10.787	\N	0		2015-08-31 14:09:10.786	votre coiffeuse elise sera en conge du 10 au 22 juillet.	2015-08-28 19:09:10.787	Votre coiffeuse Elise sera en congé du 10 au 22 juillet.	\N	\N	\N	\N	\N	6	\N
BusinessNotification	43	2015-08-29 19:09:13.259	\N	2015-08-29 19:09:13.259	\N	0		2015-08-30 02:09:13.258	n'oubliez pas de proteger egalement vos cheveux du soleil!	2015-08-28 19:09:13.258	N'oubliez pas de protéger également vos cheveux du soleil!	\N	\N	\N	\N	\N	6	\N
BusinessNotification	44	2015-08-29 19:09:17.145	\N	2015-08-29 19:09:17.145	\N	0		2015-09-02 21:09:17.144	et si vous tentiez un peu plus de cuivre dans vos cheveux?!	2015-08-28 19:09:17.144	Et si vous tentiez un peu plus de cuivre dans vos cheveux?!	\N	\N	\N	\N	\N	6	\N
Promotion	45	2015-08-29 19:09:21.951	\N	2015-08-29 19:09:21.951	\N	0		2015-08-30 00:09:21.951	brushing (tous les lundis)	2015-08-28 19:09:21.951	Brushing (tous les lundis)	\N	0.149999999999999994	\N	\N		6	\N
Promotion	46	2015-08-29 19:09:21.962	\N	2015-08-29 19:09:21.962	\N	0		2015-08-30 18:09:21.962	lumino contrast (l'oreal)	2015-08-28 19:09:21.962	Lumino Contrast (L'Oréal)	1	0.200000000000000011	19	35		6	\N
BusinessNotification	47	2015-08-29 19:09:23.457	\N	2015-08-29 19:09:23.457	\N	0		2015-09-01 23:09:23.457	braderie ce weekend sur la chaussee nouvelle!	2015-08-28 19:09:23.457	Braderie ce weekend sur la chaussée Nouvelle!	\N	\N	\N	\N	\N	7	\N
BusinessNotification	48	2015-08-29 19:09:23.464	\N	2015-08-29 19:09:23.464	\N	0		2015-08-29 22:09:23.464	arnaud ducruet passe par le cc d'auderghem! 	2015-08-28 19:09:23.464	Arnaud Ducruet passe par le CC d'Auderghem! 	\N	\N	\N	\N	\N	7	\N
BusinessNotification	49	2015-08-29 19:09:25.243	\N	2015-08-29 19:09:25.243	\N	0		2015-08-30 00:09:25.243	travaux de voirie place verte tout le mois de juillet.	2015-08-28 19:09:25.243	Travaux de voirie Place Verte tout le mois de Juillet.	\N	\N	\N	\N	\N	7	\N
BusinessNotification	50	2015-08-29 19:09:27.24	\N	2015-08-29 19:09:27.24	\N	0		2015-08-30 04:09:27.239	ouverture nocture du service population les jeudis soirs.	2015-08-28 19:09:27.239	Ouverture nocture du service population les jeudis soirs.	\N	\N	\N	\N	\N	7	\N
BusinessNotification	51	2015-08-29 19:09:29.028	\N	2015-08-29 19:09:29.028	\N	0		2015-08-31 14:09:29.028	enquete publique dans le quartier des peupliers.	2015-08-28 19:09:29.028	Enquête publique dans le quartier des Peupliers.	\N	\N	\N	\N	\N	7	\N
BusinessNotification	52	2015-08-29 19:09:32	\N	2015-08-29 19:09:32	\N	0		2015-09-01 12:09:32	nouvel arrivage juste pour de votre terrasse!	2015-08-28 19:09:32	Nouvel arrivage juste pour de votre terrasse!	\N	\N	\N	\N	\N	8	\N
BusinessNotification	53	2015-08-29 19:09:34.437	\N	2015-08-29 19:09:34.437	\N	0		2015-09-02 10:09:34.437	et si ajoutiez un peu de home-made dans votre deco?	2015-08-28 19:09:34.437	Et si ajoutiez un peu de Home-Made dans votre déco?	\N	\N	\N	\N	\N	8	\N
BusinessNotification	54	2015-08-29 19:09:36.749	\N	2015-08-29 19:09:36.749	\N	0		2015-08-30 04:09:36.749	des bougies aux milles senteurs!	2015-08-28 19:09:36.749	Des bougies aux milles senteurs!	\N	\N	\N	\N	\N	8	\N
BusinessNotification	55	2015-08-29 19:09:38.551	\N	2015-08-29 19:09:38.551	\N	0		2015-08-31 14:09:38.551	nous vous proposons des stages de bricolage pour vos enfants!	2015-08-28 19:09:38.551	Nous vous proposons des stages de bricolage pour vos enfants!	\N	\N	\N	\N	\N	8	\N
BusinessNotification	56	2015-08-29 19:09:41.102	\N	2015-08-29 19:09:41.102	\N	0		2015-08-30 02:09:41.102	des idees depuis nos vacances!	2015-08-28 19:09:41.102	Des idées depuis nos vacances!	\N	\N	\N	\N	\N	8	\N
Promotion	57	2015-08-29 19:09:42.552	\N	2015-08-29 19:09:42.552	\N	0		2015-09-02 21:09:42.552	serviettes rococo	2015-08-28 19:09:42.552	Serviettes ROCOCO	\N	\N	\N	\N		8	\N
Promotion	58	2015-08-29 19:09:43.75	\N	2015-08-29 19:09:43.75	\N	0		2015-08-30 00:09:43.75	fauteuils chill	2015-08-28 19:09:43.75	Fauteuils CHILL	\N	0.100000000000000006	\N	\N		8	\N
Promotion	59	2015-08-29 19:09:44.7	\N	2015-08-29 19:09:44.7	\N	0		2015-09-01 03:09:44.7	tables 4 personnes gardenor	2015-08-28 19:09:44.7	Tables 4 personnes GARDENOR	\N	\N	\N	\N		8	\N
BusinessNotification	60	2015-08-29 19:09:45.578	\N	2015-08-29 19:09:45.578	\N	0		2015-09-01 12:09:45.578	et voici notre cocktail de l'ete a gouter de toute urgence!	2015-08-28 19:09:45.578	Et voici notre cocktail de l'été… A goûter de toute urgence!	\N	\N	\N	\N	\N	9	\N
BusinessNotification	61	2015-08-29 19:09:45.585	\N	2015-08-29 19:09:45.585	\N	0		2015-09-01 23:09:45.585	soiree speciale latino ce vendredi!	2015-08-28 19:09:45.585	Soirée spéciale Latino ce vendredi!	\N	\N	\N	\N	\N	9	\N
BusinessNotification	62	2015-08-29 19:09:48.479	\N	2015-08-29 19:09:48.479	\N	0		2015-08-29 22:09:48.479	la terrasse est ouverte pour le weekend!	2015-08-28 19:09:48.479	La terrasse est ouverte pour le weekend!	\N	\N	\N	\N	\N	9	\N
BusinessNotification	63	2015-08-29 19:09:49.927	\N	2015-08-29 19:09:49.927	\N	0		2015-08-30 00:09:49.927	la delta nouvelle biere au clover!	2015-08-28 19:09:49.927	La Delta… Nouvelle bière au Clover!	\N	\N	\N	\N	\N	9	\N
BusinessNotification	64	2015-08-29 19:09:50.625	\N	2015-08-29 19:09:50.625	\N	0		2015-08-30 04:09:50.625	projection du match ce soir des 20h00!	2015-08-28 19:09:50.625	Projection du match ce soir dès 20h00!	\N	\N	\N	\N	\N	9	\N
Promotion	65	2015-08-29 19:09:51.548	\N	2015-08-29 19:09:51.548	\N	0		2015-08-31 14:09:51.548	10 + 1 biere gratuite durant toute la coupe du monde!	2015-08-28 19:09:51.548	10 + 1 bière gratuite durant toute la coupe du monde!	\N	\N	\N	\N		9	\N
Promotion	66	2015-08-29 19:09:51.553	\N	2015-08-29 19:09:51.553	\N	0		2015-09-01 23:09:51.553	mojito fraises	2015-08-28 19:09:51.553	Mojito Fraises	\N	0.200000000000000011	\N	\N		9	\N
BusinessNotification	67	2015-08-29 19:09:51.561	\N	2015-08-29 19:09:51.561	\N	0		2015-08-29 22:09:51.561	c'est la saison des mangues. rendez-vous au rayon fruits et legumes!	2015-08-28 19:09:51.561	C'est la saison des mangues. Rendez-vous au rayon fruits et légumes!	\N	\N	\N	\N	\N	10	\N
BusinessNotification	68	2015-08-29 19:09:52.308	\N	2015-08-29 19:09:52.308	\N	0		2015-09-01 12:09:52.308	alex, notre responsable 'bien-etre', vous conseille parmi nos cremes solaires.	2015-08-28 19:09:52.308	Alex, notre responsable 'Bien-Être', vous conseille parmi nos crêmes solaires.	\N	\N	\N	\N	\N	10	\N
BusinessNotification	69	2015-08-29 19:09:53.482	\N	2015-08-29 19:09:53.482	\N	0		2015-09-02 10:09:53.482	pensez au self-scan pour gagner du temps!	2015-08-28 19:09:53.482	Pensez au self-scan pour gagner du temps!	\N	\N	\N	\N	\N	10	\N
BusinessNotification	70	2015-08-29 19:09:54.696	\N	2015-08-29 19:09:54.696	\N	0		2015-08-30 04:09:54.696	les scouts de saint dominique financent leur voyage a nos caisses!	2015-08-28 19:09:54.696	Les scouts de Saint Dominique financent leur voyage à nos caisses!	\N	\N	\N	\N	\N	10	\N
BusinessNotification	71	2015-08-29 19:09:54.713	\N	2015-08-29 19:09:54.713	\N	0		2015-08-31 14:09:54.713	la delta est egalement disposnible dans votre delhaize!	2015-08-28 19:09:54.713	La Delta est également disposnible dans votre Delhaize!	\N	\N	\N	\N	\N	10	\N
Promotion	72	2015-08-29 19:10:00.024	\N	2015-08-29 19:10:00.024	\N	0		2015-08-30 02:10:00.024	decoration 'paques'	2015-08-28 19:10:00.024	Décoration 'Pâques'	\N	0.149999999999999994	\N	\N		10	\N
Promotion	73	2015-08-29 19:10:00.032	\N	2015-08-29 19:10:00.032	\N	0		2015-09-02 21:10:00.032	poulets rotis	2015-08-28 19:10:00.032	Poulets rôtis	\N	0.200000000000000011	\N	\N		10	\N
Promotion	74	2015-08-29 19:10:01.287	\N	2015-08-29 19:10:01.287	\N	0		2015-08-30 00:10:01.287	sauce devos lemmens	2015-08-28 19:10:01.287	Sauce DEVOS LEMMENS	\N	0.100000000000000006	\N	\N		10	\N
Promotion	75	2015-08-29 19:10:01.301	\N	2015-08-29 19:10:01.301	\N	0		2015-08-30 02:10:01.301	tables ping-pong jeanmi	2015-08-28 19:10:01.301	Tables Ping-Pong JEANMI	1	0.100000000000000006	179	3		10	\N
Promotion	76	2015-08-29 19:10:02.37	\N	2015-08-29 19:10:02.37	\N	0		2015-09-01 03:10:02.37	velo enfants eddi	2015-08-28 19:10:02.37	Vélo Enfants EDDI	1	0.149999999999999994	85	5		10	\N
\.


--
-- Name: abstractpublication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('abstractpublication_id_seq', 76, true);


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: play
--

COPY account (dtype, id, creationdate, creationuser, lastupdate, lastupdateuser, version, authenticationkey, email, firstname, gender, lang, lastname, role, sendnotificationbydefault, type, selectedaddress_id) FROM stdin;
Account	2	\N	\N	\N	\N	0	\N	gil.knops@krings-law.be	Florian	MALE	fr	Jeanmart	SUPERADMIN	t	CUSTOMER	\N
Account	3	\N	\N	\N	\N	0	\N	greg.malcause@gmail.com	Florian	MALE	fr	Jeanmart	SUPERADMIN	t	CUSTOMER	\N
Account	1	\N	\N	2015-08-29 12:22:27.917	\N	1	Pqa/yVTMpUG8ghqIv+o1Sz2/h+roGIMCqAffk2C2biRyw1xL+EzWZwFn7wRkhGg6	florian.jeanmart@gmail.com	Florian	MALE	fr	Jeanmartbb	SUPERADMIN	t	CUSTOMER	\N
BusinessAccount	4	2015-08-29 19:05:46.242	\N	2015-08-29 19:05:46.242	\N	0	zb0TO5mHZvuOctsw2uW5QkwPYsLJzgCJIKfbeSjUchPIUzgpYlrWvaeVBN9v9/NX	pain@business.com	L'amie du pain	MALE	fr	L'amie du pain	BUSINESS	t	BUSINESS	\N
BusinessAccount	5	2015-08-29 19:05:51.259	\N	2015-08-29 19:05:51.259	\N	0	GvJmHyv+8bJKdQtMTX/DNBFlcgQYTMG7Z8uvSbK8oSZFGseTIx87fSEvB+AX81nw	boucherie@business.com	La Bouche Rit	MALE	fr	La Bouche Rit	BUSINESS	t	BUSINESS	\N
BusinessAccount	6	2015-08-29 19:05:54.384	\N	2015-08-29 19:05:54.384	\N	0	SdZOEYaCBPotZNnu6KC8VSW4T4w6P0J4K0n5SmYUS1xXpJvFrHtAIH+P9/TpJzmX	piscine@business.com	Piscine 'Ibiza'	MALE	fr	Piscine 'Ibiza'	BUSINESS	t	BUSINESS	\N
BusinessAccount	7	2015-08-29 19:05:57.564	\N	2015-08-29 19:05:57.564	\N	0	S37DxM6gZYQ29xPyeoRFQsSjYuuSadkI/HC5XMZYL4Ez9ezvkfc8ZqndJTplnFJc	villa@business.com	Villa Lorraine	MALE	fr	Villa Lorraine	BUSINESS	t	BUSINESS	\N
BusinessAccount	8	2015-08-29 19:06:24.258	\N	2015-08-29 19:06:24.258	\N	0	n6S2IRdp3NfHbl7HH+w+fO679jFIM7KjrJ8dmg8vm2s34AxrGFh2UjC2Vrg0WtBG	mode@business.com	Via Moda	MALE	fr	Via Moda	BUSINESS	t	BUSINESS	\N
BusinessAccount	9	2015-08-29 19:06:27.165	\N	2015-08-29 19:06:27.165	\N	0	GOZTWAfnG63eU9sf5wxU8IupyRH8htITVmD/4O72KHUU8NVQIByT/QZBVC/shan+	coiffeur@business.com	Tif & Tondu	MALE	fr	Tif & Tondu	BUSINESS	t	BUSINESS	\N
BusinessAccount	10	2015-08-29 19:06:37.05	\N	2015-08-29 19:06:37.05	\N	0	23Gsz62xkQthD5fJFad/+xe3+YRqwpQPMmV60oUGmWilBnSTjnUyVfxDzFPtzTXm	commune@business.com	Commune de Schaerbeek	MALE	fr	Commune de Schaerbeek	BUSINESS	t	BUSINESS	\N
BusinessAccount	11	2015-08-29 19:06:45.523	\N	2015-08-29 19:06:45.523	\N	0	VaHQdf2MUDHBhl+B72n/NuENjL37UlwHGkVp/SBY3Lpof5GP/o7ahV4+wKWEkoyf	traiteur@business.com	La Couleur des Anges	MALE	fr	La Couleur des Anges	BUSINESS	t	BUSINESS	\N
BusinessAccount	12	2015-08-29 19:06:50.933	\N	2015-08-29 19:06:50.933	\N	0	BYiemE2jjm40algALOhBO2i63UtFHbzGBOBv5jnLZhMMy6s2aZfjCt5bb3EsKGJl	bar@business.com	Clover Bar	MALE	fr	Clover Bar	BUSINESS	t	BUSINESS	\N
BusinessAccount	13	2015-08-29 19:06:54.642	\N	2015-08-29 19:06:54.642	\N	0	HHE3j4vIYzpDFd8S/a+1Bghbb8rl9uLNAqP03NRcW8Fa3u7jMMUs1jxal1f+44WR	delhaize@business.com	Delhaize 'Hermann-Debroux'	MALE	fr	Delhaize 'Hermann-Debroux'	BUSINESS	t	BUSINESS	\N
\.


--
-- Data for Name: account_customerinterest; Type: TABLE DATA; Schema: public; Owner: play
--

COPY account_customerinterest (account_id, customerinterests_id) FROM stdin;
\.


--
-- Name: account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('account_id_seq', 14, true);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: play
--

COPY address (id, creationdate, creationuser, lastupdate, lastupdateuser, version, city, country, name, posx, posy, street, zip, account_id) FROM stdin;
1	2015-08-29 19:05:46.496	\N	2015-08-29 19:05:46.496	\N	0	Woluwé-Saint-Pierre	Belgique	\N	50.8357006000000027	4.43974159999999962	Rue au bois 12	1150	\N
2	2015-08-29 19:05:51.451	\N	2015-08-29 19:05:51.451	\N	0	Auderghem	Belgique	\N	50.8126350000000002	4.42786819999999981	Boulevard du Souverain 63	1060	\N
3	2015-08-29 19:05:54.488	\N	2015-08-29 19:05:54.488	\N	0	Auderghem	Belgique	\N	50.8375835999999879	4.36245329999999942	Chaussée de Wavre 6	1060	\N
4	2015-08-29 19:05:57.67	\N	2015-08-29 19:05:57.67	\N	0	Woluwé-Saint-Pierre	Belgique	\N	50.8313901999999871	4.44419339999999963	Avenue du Hockey 21	1150	\N
5	2015-08-29 19:06:24.366	\N	2015-08-29 19:06:24.366	\N	0	Woluwé-Saint-Pierre	Belgique	\N	50.8408567000000033	4.46333229999999936	Rue de l'Eglise 86	1150	\N
6	2015-08-29 19:06:27.27	\N	2015-08-29 19:06:27.27	\N	0	Auderghem	Belgique	\N	50.8036032999999989	4.44229839999999943	Avenue Schaller 105	1060	\N
7	2015-08-29 19:06:37.166	\N	2015-08-29 19:06:37.166	\N	0	Schaerbeek	Belgique	\N	50.8583907000000011	4.38551890000000011	Avnue Jan Stobbaerts 18	1030	\N
8	2015-08-29 19:06:45.638	\N	2015-08-29 19:06:45.638	\N	0	Schaerbeek	Belgique	\N	50.8639721000000122	4.39005249999999858	Avenue des Jacinthes 50	1030	\N
9	2015-08-29 19:06:51.04	\N	2015-08-29 19:06:51.04	\N	0	Schaerbeek	Belgique	\N	50.8630333999999991	4.3900819999999996	Rue des Mimosas 70	1030	\N
10	2015-08-29 19:06:54.751	\N	2015-08-29 19:06:54.751	\N	0	Auderghem	Belgique	\N	50.8041204000000022	4.42539090000000002	Boulevard du Souverain 68	1060	\N
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('address_id_seq', 10, true);


--
-- Data for Name: business; Type: TABLE DATA; Schema: public; Owner: play
--

COPY business (id, creationdate, creationuser, lastupdate, lastupdateuser, version, askpublicationdate, businessstatus, description, email, name, phone, searchablename, deliverylink, ecommercelink, facebooklink, instagramlink, opinionlink, reservationlink, twitterlink, website, account_id, address_id, illustration_id, landscape_id) FROM stdin;
1	2015-08-29 19:05:46.242	\N	2015-08-29 19:05:51.453	\N	1	\N	PUBLISHED	L'Amie du Pain, boulangerie artisanale depuis 1972, vous  propose une large gamme de pains bio et cuits sur pierre.\nVenez également découvrir notre rayon de produits sans gluten, mais pas sans goût!	pain@business.com	L'amie du pain	+32 123 45 66	l'amie du pain	\N	\N	\N	\N	\N	\N	\N	\N	4	1	2	1
3	2015-08-29 19:05:54.384	\N	2015-08-29 19:05:57.672	\N	1	\N	PUBLISHED	Notre piscine vous accueille tous les jours de la semaine dans ses installations toutes neuves et son eau toujours à 28°C!	piscine@business.com	Piscine 'Ibiza'	+32 123 45 68	piscine 'ibiza'	\N	\N	\N	\N	\N	\N	\N	\N	6	3	6	5
4	2015-08-29 19:05:57.564	\N	2015-08-29 19:06:24.368	\N	1	\N	PUBLISHED	Perdue au milieu du Parc de la Woluwe, la Villa Lorraine dispose d'une grande terrasse ensoleillée où il fait bon se retrouver entre amis après le boulot.\nRéservez également votre table pour un dîner aux chandelles ou entre collègues et laisser vous suprendre par notre chef étoilé!	villa@business.com	Villa Lorraine	+32 123 45 69	villa lorraine	\N	\N	\N	\N	\N	\N	\N	\N	7	4	8	7
5	2015-08-29 19:06:24.258	\N	2015-08-29 19:06:27.271	\N	1	\N	PUBLISHED	Venez passer la porte du paradis des robes et des chapeaux.\nUn choix vaste et des conseils personnalisés pour toutes les envies et tous les genres!	mode@business.com	Via Moda	+32 123 45 70	via moda	\N	\N	\N	\N	\N	\N	\N	\N	8	5	10	9
6	2015-08-29 19:06:27.165	\N	2015-08-29 19:06:37.168	\N	1	\N	PUBLISHED	Chez Tif & Tondu, nous voulons créer les conditions pour que vous expérimentiez un traitement personnalisé, de qualité et où le temps n’est pas compté. Nous mettons tout en œuvre pour que votre passage chez nous soit un vrai moment de détente et de plaisir.	coiffeur@business.com	Tif & Tondu	+32 123 45 71	tif & tondu	\N	\N	\N	\N	\N	\N	\N	\N	9	6	12	11
7	2015-08-29 19:06:37.05	\N	2015-08-29 19:06:45.639	\N	1	\N	PUBLISHED	Schaerbeek est l'une des 19 communes bilingues de la Région de Bruxelles-Capitale en Belgique.\nSchaerbeek est composée de nombreux quartiers souvent très populaires et cosmopolites. Elle compte quelques sites remarquables comme le parc Josaphat, l'hôtel communal construit en 1887 par Jules-Jacques Van Ysendijck, l'église royale Sainte-Marie, les Halles, la Maison des Arts, ainsi que de nombreuses maisons art nouveau et art déco particulièrement bien préservées (exemple : la Maison Autrique).	commune@business.com	Commune de Schaerbeek	+32 123 45 72	commune de schaerbeek	\N	\N	\N	\N	\N	\N	\N	\N	10	7	14	13
8	2015-08-29 19:06:45.523	\N	2015-08-29 19:06:51.042	\N	1	\N	PUBLISHED	La Couleur des Anges est un magasin qui mêle passion et maison. Venez dénicher l'objet qui finira d'habiller votre salon, terasse ou même salle-de-bain!	traiteur@business.com	La Couleur des Anges	+32 123 45 73	la couleur des anges	\N	\N	\N	\N	\N	\N	\N	\N	11	8	16	15
9	2015-08-29 19:06:50.933	\N	2015-08-29 19:06:54.756	\N	1	\N	PUBLISHED	Situé dans l'artère commerciale de l'avenue Roland à Woluwé-Saint-Lambert, le Clover Bar  vous accueille pour déguster une de ses 50 bières spéciales à la carte. Si le houblon ne vous tente pas, vous succomberez aux charmes de nos cocktails maison!	bar@business.com	Clover Bar	+32 123 45 74	clover bar	\N	\N	\N	\N	\N	\N	\N	\N	12	9	18	17
10	2015-08-29 19:06:54.642	\N	2015-08-29 19:06:58.916	\N	1	\N	PUBLISHED	Le Delhaize 'Hermann-Debroux' est situé au croisement du boulevard du souverain et du viaduc. 500 places de parking et 15 caisses vous attendent pour faciliter vos courses de tous les jours!	delhaize@business.com	Delhaize 'Hermann-Debroux'	+32 123 45 75	delhaize 'hermann-debroux'	\N	\N	\N	\N	\N	\N	\N	\N	13	10	20	19
2	2015-08-29 19:05:51.259	\N	2015-08-29 19:53:04.766	\N	3	2015-08-29 19:52:51.135	NOT_PUBLISHED	Une boucherie où vous trouverez des viandes découpées sur place dans des viandes de qualité.\nTous les jours, les bouchers vous préparent de savoureuses viandes marinées que vous pouvez réserver également via le site internet.	boucherie@business.com	La Bouche Rit	+32 123 45 67	la bouche rit	\N	\N	\N	\N	\N	\N	\N	\N	5	2	4	3
\.


--
-- Data for Name: business_category; Type: TABLE DATA; Schema: public; Owner: play
--

COPY business_category (business, category) FROM stdin;
1	34
3	148
5	51
6	66
8	24
9	20
10	31
2	174
2	179
\.


--
-- Name: business_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('business_id_seq', 10, true);


--
-- Data for Name: businesscategory; Type: TABLE DATA; Schema: public; Owner: play
--

COPY businesscategory (id, creationdate, creationuser, lastupdate, lastupdateuser, version, name, orderindex, parent_id, translationname_id) FROM stdin;
1	2015-08-29 09:23:24.022	\N	2015-08-29 09:23:24.022	\N	0	horeca	1	\N	21
2	2015-08-29 09:23:24.034	\N	2015-08-29 09:23:24.034	\N	0	hotel	2	1	22
3	2015-08-29 09:23:24.044	\N	2015-08-29 09:23:24.044	\N	0	auberge_de_jeunesse	3	2	23
4	2015-08-29 09:23:24.053	\N	2015-08-29 09:23:24.053	\N	0	camping	4	2	24
5	2015-08-29 09:23:24.063	\N	2015-08-29 09:23:24.063	\N	0	bb	5	2	25
6	2015-08-29 09:23:24.073	\N	2015-08-29 09:23:24.073	\N	0	horeca_hotel	6	2	26
7	2015-08-29 09:23:24.082	\N	2015-08-29 09:23:24.082	\N	0	restaurant	7	1	27
8	2015-08-29 09:23:24.091	\N	2015-08-29 09:23:24.091	\N	0	restaurant__fast_food	8	7	28
9	2015-08-29 09:23:24.1	\N	2015-08-29 09:23:24.101	\N	0	restaurant__asiatique	9	7	29
10	2015-08-29 09:23:24.11	\N	2015-08-29 09:23:24.11	\N	0	restaurant__europeen	10	7	30
11	2015-08-29 09:23:24.118	\N	2015-08-29 09:23:24.118	\N	0	restaurant__africain	11	7	31
12	2015-08-29 09:23:24.126	\N	2015-08-29 09:23:24.127	\N	0	restaurant__americain	12	7	32
13	2015-08-29 09:23:24.142	\N	2015-08-29 09:23:24.143	\N	0	restaurant__belge	13	7	33
14	2015-08-29 09:23:24.158	\N	2015-08-29 09:23:24.158	\N	0	restaurant__brunch__sweet	14	7	34
15	2015-08-29 09:23:24.17	\N	2015-08-29 09:23:24.17	\N	0	restaurant__gastronomiquebistronomie	15	7	35
16	2015-08-29 09:23:24.181	\N	2015-08-29 09:23:24.182	\N	0	cafe	16	1	36
17	2015-08-29 09:23:24.192	\N	2015-08-29 09:23:24.192	\N	0	bieres	17	16	37
18	2015-08-29 09:23:24.202	\N	2015-08-29 09:23:24.202	\N	0	vins	18	16	38
19	2015-08-29 09:23:24.214	\N	2015-08-29 09:23:24.214	\N	0	champagne	19	16	39
20	2015-08-29 09:23:24.227	\N	2015-08-29 09:23:24.227	\N	0	cocktails	20	16	40
21	2015-08-29 09:23:24.244	\N	2015-08-29 09:23:24.245	\N	0	jus__smoothies	21	16	41
22	2015-08-29 09:23:24.255	\N	2015-08-29 09:23:24.255	\N	0	traiteur	22	1	42
23	2015-08-29 09:23:24.267	\N	2015-08-29 09:23:24.267	\N	0	asiatique	23	22	43
24	2015-08-29 09:23:24.303	\N	2015-08-29 09:23:24.303	\N	0	europeen	24	22	44
25	2015-08-29 09:23:24.31	\N	2015-08-29 09:23:24.31	\N	0	africain	25	22	45
26	2015-08-29 09:23:24.326	\N	2015-08-29 09:23:24.326	\N	0	americain	26	22	46
27	2015-08-29 09:23:24.337	\N	2015-08-29 09:23:24.337	\N	0	belge	27	22	47
28	2015-08-29 09:23:24.356	\N	2015-08-29 09:23:24.356	\N	0	gastronomique	28	22	48
29	2015-08-29 09:23:24.361	\N	2015-08-29 09:23:24.361	\N	0	magasins	29	\N	49
30	2015-08-29 09:23:24.366	\N	2015-08-29 09:23:24.366	\N	0	alimentation	30	29	50
31	2015-08-29 09:23:24.376	\N	2015-08-29 09:23:24.376	\N	0	supermarche	31	30	51
32	2015-08-29 09:23:24.387	\N	2015-08-29 09:23:24.387	\N	0	boucherie__charcuterie	32	30	52
33	2015-08-29 09:23:24.398	\N	2015-08-29 09:23:24.398	\N	0	poissonerie	33	30	53
34	2015-08-29 09:23:24.411	\N	2015-08-29 09:23:24.411	\N	0	boulangerie__patisserie	34	30	54
35	2015-08-29 09:23:24.43	\N	2015-08-29 09:23:24.43	\N	0	fromagerie	35	30	55
36	2015-08-29 09:23:24.454	\N	2015-08-29 09:23:24.455	\N	0	bieres__vins	36	30	56
37	2015-08-29 09:23:24.464	\N	2015-08-29 09:23:24.464	\N	0	herbes__epices	37	30	57
38	2015-08-29 09:23:24.476	\N	2015-08-29 09:23:24.476	\N	0	confiseries__chocolat	38	30	58
39	2015-08-29 09:23:24.487	\N	2015-08-29 09:23:24.487	\N	0	loisirs	39	29	59
40	2015-08-29 09:23:24.496	\N	2015-08-29 09:23:24.496	\N	0	sport__aventure	40	39	60
41	2015-08-29 09:23:24.503	\N	2015-08-29 09:23:24.503	\N	0	maison__decoration	41	39	61
42	2015-08-29 09:23:24.518	\N	2015-08-29 09:23:24.518	\N	0	jardin__fleurs	42	39	62
43	2015-08-29 09:23:24.522	\N	2015-08-29 09:23:24.522	\N	0	jeux__jouets	43	39	63
44	2015-08-29 09:23:24.527	\N	2015-08-29 09:23:24.527	\N	0	multimedia__informatique	44	39	64
45	2015-08-29 09:23:24.532	\N	2015-08-29 09:23:24.532	\N	0	animaux	45	39	65
46	2015-08-29 09:23:24.537	\N	2015-08-29 09:23:24.537	\N	0	voyages	46	39	66
47	2015-08-29 09:23:24.541	\N	2015-08-29 09:23:24.541	\N	0	livres__journaux	47	39	67
48	2015-08-29 09:23:24.554	\N	2015-08-29 09:23:24.554	\N	0	mode	48	29	68
49	2015-08-29 09:23:24.578	\N	2015-08-29 09:23:24.578	\N	0	vetements_enfants	49	48	69
50	2015-08-29 09:23:24.589	\N	2015-08-29 09:23:24.589	\N	0	vetements_hommes	50	48	70
51	2015-08-29 09:23:24.596	\N	2015-08-29 09:23:24.596	\N	0	vetements_femmes	51	48	71
52	2015-08-29 09:23:24.603	\N	2015-08-29 09:23:24.603	\N	0	chaussures	52	48	72
53	2015-08-29 09:23:24.612	\N	2015-08-29 09:23:24.612	\N	0	bijoux__montres	53	48	73
54	2015-08-29 09:23:24.623	\N	2015-08-29 09:23:24.623	\N	0	parfums__cosmetique	54	48	74
55	2015-08-29 09:23:24.633	\N	2015-08-29 09:23:24.633	\N	0	lingerie	55	48	75
56	2015-08-29 09:23:24.64	\N	2015-08-29 09:23:24.64	\N	0	lunettes	56	48	76
57	2015-08-29 09:23:24.646	\N	2015-08-29 09:23:24.647	\N	0	utiles	57	29	77
58	2015-08-29 09:23:24.651	\N	2015-08-29 09:23:24.651	\N	0	electromenager	58	57	78
59	2015-08-29 09:23:24.658	\N	2015-08-29 09:23:24.658	\N	0	bricolage	59	57	79
60	2015-08-29 09:23:24.662	\N	2015-08-29 09:23:24.662	\N	0	papeterie	60	57	80
61	2015-08-29 09:23:24.666	\N	2015-08-29 09:23:24.666	\N	0	magasin_voiture	61	57	81
62	2015-08-29 09:23:24.671	\N	2015-08-29 09:23:24.671	\N	0	droguerie	62	57	82
63	2015-08-29 09:23:24.678	\N	2015-08-29 09:23:24.678	\N	0	velo	63	57	83
64	2015-08-29 09:23:24.683	\N	2015-08-29 09:23:24.683	\N	0	beaute__bien_etre	64	\N	84
65	2015-08-29 09:23:24.686	\N	2015-08-29 09:23:24.686	\N	0	soins	65	64	85
66	2015-08-29 09:23:24.703	\N	2015-08-29 09:23:24.703	\N	0	coiffure	66	65	86
67	2015-08-29 09:23:24.714	\N	2015-08-29 09:23:24.714	\N	0	esthetique	67	65	87
68	2015-08-29 09:23:24.727	\N	2015-08-29 09:23:24.727	\N	0	manicure__pedicure	68	65	88
69	2015-08-29 09:23:24.735	\N	2015-08-29 09:23:24.735	\N	0	massage	69	65	89
70	2015-08-29 09:23:24.742	\N	2015-08-29 09:23:24.742	\N	0	tatouage__piercing	70	65	90
71	2015-08-29 09:23:24.753	\N	2015-08-29 09:23:24.753	\N	0	toilettage	71	65	91
72	2015-08-29 09:23:24.758	\N	2015-08-29 09:23:24.758	\N	0	etablissement	72	64	92
73	2015-08-29 09:23:24.765	\N	2015-08-29 09:23:24.765	\N	0	sauna__hammam	73	72	93
74	2015-08-29 09:23:24.773	\N	2015-08-29 09:23:24.773	\N	0	solarium	74	72	94
75	2015-08-29 09:23:24.78	\N	2015-08-29 09:23:24.78	\N	0	sante	75	\N	95
76	2015-08-29 09:23:24.792	\N	2015-08-29 09:23:24.792	\N	0	medecine_conventionnelle	76	75	96
77	2015-08-29 09:23:24.796	\N	2015-08-29 09:23:24.796	\N	0	medecine_generale	77	76	97
78	2015-08-29 09:23:24.802	\N	2015-08-29 09:23:24.802	\N	0	ophtalmologie	78	76	98
79	2015-08-29 09:23:24.81	\N	2015-08-29 09:23:24.81	\N	0	orl	79	76	99
80	2015-08-29 09:23:24.817	\N	2015-08-29 09:23:24.817	\N	0	gynecologie	80	76	100
81	2015-08-29 09:23:24.826	\N	2015-08-29 09:23:24.826	\N	0	dentisterie	81	76	101
82	2015-08-29 09:23:24.833	\N	2015-08-29 09:23:24.833	\N	0	kinesitherapie	82	76	102
83	2015-08-29 09:23:24.839	\N	2015-08-29 09:23:24.839	\N	0	dermatologie	83	76	103
84	2015-08-29 09:23:24.846	\N	2015-08-29 09:23:24.846	\N	0	psychologie	84	76	104
85	2015-08-29 09:23:24.857	\N	2015-08-29 09:23:24.857	\N	0	medecine_non_conventionnelle	85	75	105
86	2015-08-29 09:23:24.86	\N	2015-08-29 09:23:24.86	\N	0	acupuncture	86	85	106
87	2015-08-29 09:23:24.867	\N	2015-08-29 09:23:24.867	\N	0	osteopatie	87	85	107
88	2015-08-29 09:23:24.877	\N	2015-08-29 09:23:24.877	\N	0	homeopathie	88	85	108
89	2015-08-29 09:23:24.885	\N	2015-08-29 09:23:24.885	\N	0	hypnose	89	85	109
90	2015-08-29 09:23:24.892	\N	2015-08-29 09:23:24.892	\N	0	naturopathie	90	85	110
91	2015-08-29 09:23:24.902	\N	2015-08-29 09:23:24.902	\N	0	sante_autres	91	75	111
92	2015-08-29 09:23:24.906	\N	2015-08-29 09:23:24.906	\N	0	pharmacie	92	91	112
93	2015-08-29 09:23:24.912	\N	2015-08-29 09:23:24.912	\N	0	hopitaux	93	91	113
94	2015-08-29 09:23:24.918	\N	2015-08-29 09:23:24.918	\N	0	centres_medicaux	94	91	114
95	2015-08-29 09:23:24.927	\N	2015-08-29 09:23:24.927	\N	0	veterinaire	95	91	115
96	2015-08-29 09:23:24.932	\N	2015-08-29 09:23:24.932	\N	0	services_de_proximite	96	\N	116
97	2015-08-29 09:23:24.936	\N	2015-08-29 09:23:24.936	\N	0	creation__reparation	97	96	117
98	2015-08-29 09:23:24.944	\N	2015-08-29 09:23:24.944	\N	0	cordonnerie__serrurrerie	98	97	118
99	2015-08-29 09:23:24.954	\N	2015-08-29 09:23:24.954	\N	0	couture__retouches	99	97	119
100	2015-08-29 09:23:24.96	\N	2015-08-29 09:23:24.96	\N	0	informatique	100	97	120
101	2015-08-29 09:23:24.965	\N	2015-08-29 09:23:24.965	\N	0	smartphones__tablettes	101	97	121
102	2015-08-29 09:23:24.975	\N	2015-08-29 09:23:24.975	\N	0	plombier	102	97	122
103	2015-08-29 09:23:24.984	\N	2015-08-29 09:23:24.984	\N	0	electricien	103	97	123
104	2015-08-29 09:23:24.996	\N	2015-08-29 09:23:24.996	\N	0	jardinier	104	97	124
105	2015-08-29 09:23:24.999	\N	2015-08-29 09:23:24.999	\N	0	finances__droit	105	96	125
106	2015-08-29 09:23:25.002	\N	2015-08-29 09:23:25.002	\N	0	banque	106	105	126
107	2015-08-29 09:23:25.006	\N	2015-08-29 09:23:25.006	\N	0	mistercash	107	105	127
108	2015-08-29 09:23:25.01	\N	2015-08-29 09:23:25.01	\N	0	assurances	108	105	128
109	2015-08-29 09:23:25.016	\N	2015-08-29 09:23:25.016	\N	0	avocat	109	105	129
110	2015-08-29 09:23:25.029	\N	2015-08-29 09:23:25.029	\N	0	notaire	110	105	130
111	2015-08-29 09:23:25.036	\N	2015-08-29 09:23:25.036	\N	0	comptable	111	105	131
112	2015-08-29 09:23:25.045	\N	2015-08-29 09:23:25.045	\N	0	voiture	112	96	132
113	2015-08-29 09:23:25.048	\N	2015-08-29 09:23:25.048	\N	0	garage	113	112	133
114	2015-08-29 09:23:25.056	\N	2015-08-29 09:23:25.056	\N	0	station_essence	114	112	134
115	2015-08-29 09:23:25.059	\N	2015-08-29 09:23:25.059	\N	0	carwash	115	112	135
116	2015-08-29 09:23:25.069	\N	2015-08-29 09:23:25.069	\N	0	parking	116	112	136
117	2015-08-29 09:23:25.077	\N	2015-08-29 09:23:25.077	\N	0	pare_brise	117	112	137
118	2015-08-29 09:23:25.08	\N	2015-08-29 09:23:25.08	\N	0	pneus	118	112	138
119	2015-08-29 09:23:25.088	\N	2015-08-29 09:23:25.088	\N	0	controle_technique	119	112	139
120	2015-08-29 09:23:25.092	\N	2015-08-29 09:23:25.092	\N	0	service_autres	120	96	140
121	2015-08-29 09:23:25.099	\N	2015-08-29 09:23:25.099	\N	0	imprimerie	121	120	141
122	2015-08-29 09:23:25.107	\N	2015-08-29 09:23:25.107	\N	0	garderie__creche	122	120	142
123	2015-08-29 09:23:25.112	\N	2015-08-29 09:23:25.112	\N	0	agence_immobiliere	123	120	143
124	2015-08-29 09:23:25.12	\N	2015-08-29 09:23:25.12	\N	0	telephonie__internet	124	120	144
125	2015-08-29 09:23:25.128	\N	2015-08-29 09:23:25.128	\N	0	centre_de_repassage	125	120	145
126	2015-08-29 09:23:25.131	\N	2015-08-29 09:23:25.131	\N	0	etudes__formations	126	120	146
127	2015-08-29 09:23:25.139	\N	2015-08-29 09:23:25.139	\N	0	detente	127	\N	147
128	2015-08-29 09:23:25.148	\N	2015-08-29 09:23:25.148	\N	0	culture	128	127	148
129	2015-08-29 09:23:25.154	\N	2015-08-29 09:23:25.154	\N	0	theatre	129	128	149
130	2015-08-29 09:23:25.159	\N	2015-08-29 09:23:25.159	\N	0	opera	130	128	150
131	2015-08-29 09:23:25.169	\N	2015-08-29 09:23:25.169	\N	0	concert	131	128	151
132	2015-08-29 09:23:25.172	\N	2015-08-29 09:23:25.172	\N	0	cirque	132	128	152
133	2015-08-29 09:23:25.18	\N	2015-08-29 09:23:25.18	\N	0	musee	133	128	153
134	2015-08-29 09:23:25.184	\N	2015-08-29 09:23:25.184	\N	0	cinema	134	128	154
135	2015-08-29 09:23:25.191	\N	2015-08-29 09:23:25.191	\N	0	galerie	135	128	155
136	2015-08-29 09:23:25.198	\N	2015-08-29 09:23:25.198	\N	0	zoo__aquarium	136	128	156
137	2015-08-29 09:23:25.202	\N	2015-08-29 09:23:25.202	\N	0	soirees	137	127	157
138	2015-08-29 09:23:25.209	\N	2015-08-29 09:23:25.209	\N	0	discotheque	138	137	158
139	2015-08-29 09:23:25.213	\N	2015-08-29 09:23:25.213	\N	0	karaoke	139	137	159
140	2015-08-29 09:23:25.216	\N	2015-08-29 09:23:25.216	\N	0	bar_lounge	140	137	160
141	2015-08-29 09:23:25.221	\N	2015-08-29 09:23:25.221	\N	0	bowling	141	137	161
142	2015-08-29 09:23:25.227	\N	2015-08-29 09:23:25.227	\N	0	cafe_theatre	142	137	162
143	2015-08-29 09:23:25.232	\N	2015-08-29 09:23:25.232	\N	0	bar_holebi	143	137	163
144	2015-08-29 09:23:25.24	\N	2015-08-29 09:23:25.24	\N	0	sport	144	127	164
145	2015-08-29 09:23:25.243	\N	2015-08-29 09:23:25.243	\N	0	tennis	145	144	165
146	2015-08-29 09:23:25.252	\N	2015-08-29 09:23:25.252	\N	0	badminton__squash	146	144	166
147	2015-08-29 09:23:25.256	\N	2015-08-29 09:23:25.256	\N	0	escalade	147	144	167
148	2015-08-29 09:23:25.262	\N	2015-08-29 09:23:25.262	\N	0	piscine	148	144	168
149	2015-08-29 09:23:25.268	\N	2015-08-29 09:23:25.268	\N	0	fitness__musculation	149	144	169
150	2015-08-29 09:23:25.272	\N	2015-08-29 09:23:25.272	\N	0	karting	150	144	170
151	2015-08-29 09:23:25.281	\N	2015-08-29 09:23:25.281	\N	0	danse__yoga	151	144	171
152	2015-08-29 09:23:25.294	\N	2015-08-29 09:23:25.294	\N	0	golf	152	144	172
153	2015-08-29 09:23:25.31	\N	2015-08-29 09:23:25.31	\N	0	detente_autres	153	127	173
154	2015-08-29 09:23:25.314	\N	2015-08-29 09:23:25.314	\N	0	casino	154	153	174
155	2015-08-29 09:23:25.321	\N	2015-08-29 09:23:25.321	\N	0	jeux_de_societe	155	153	175
156	2015-08-29 09:23:25.333	\N	2015-08-29 09:23:25.333	\N	0	jeux_video	156	153	176
157	2015-08-29 09:23:25.342	\N	2015-08-29 09:23:25.342	\N	0	jeux_denfants	157	153	177
158	2015-08-29 09:23:25.35	\N	2015-08-29 09:23:25.35	\N	0	administrations_publiques	158	\N	178
159	2015-08-29 09:23:25.363	\N	2015-08-29 09:23:25.363	\N	0	services_pratiques	159	158	179
160	2015-08-29 09:23:25.37	\N	2015-08-29 09:23:25.37	\N	0	poste	160	159	180
161	2015-08-29 09:23:25.375	\N	2015-08-29 09:23:25.375	\N	0	police	161	159	181
162	2015-08-29 09:23:25.384	\N	2015-08-29 09:23:25.384	\N	0	pompiers	162	159	182
163	2015-08-29 09:23:25.388	\N	2015-08-29 09:23:25.388	\N	0	bibliotheque	163	159	183
164	2015-08-29 09:23:25.393	\N	2015-08-29 09:23:25.393	\N	0	communal	164	158	184
165	2015-08-29 09:23:25.405	\N	2015-08-29 09:23:25.405	\N	0	etat_civil__population	165	164	185
166	2015-08-29 09:23:25.408	\N	2015-08-29 09:23:25.408	\N	0	energie	166	164	186
167	2015-08-29 09:23:25.412	\N	2015-08-29 09:23:25.412	\N	0	emploi_communal	167	164	187
168	2015-08-29 09:23:25.419	\N	2015-08-29 09:23:25.419	\N	0	urbanisme	168	164	188
169	2015-08-29 09:23:25.425	\N	2015-08-29 09:23:25.425	\N	0	cpas	169	164	189
170	2015-08-29 09:23:25.432	\N	2015-08-29 09:23:25.432	\N	0	office_du_tourisme	170	164	190
171	2015-08-29 09:23:25.435	\N	2015-08-29 09:23:25.435	\N	0	federal__international	171	158	191
172	2015-08-29 09:23:25.445	\N	2015-08-29 09:23:25.445	\N	0	economie	172	171	192
173	2015-08-29 09:23:25.449	\N	2015-08-29 09:23:25.449	\N	0	emploi	173	171	193
174	2015-08-29 09:23:25.454	\N	2015-08-29 09:23:25.454	\N	0	justice	174	171	194
175	2015-08-29 09:23:25.466	\N	2015-08-29 09:23:25.466	\N	0	mobilite	175	171	195
176	2015-08-29 09:23:25.469	\N	2015-08-29 09:23:25.469	\N	0	impots	176	171	196
177	2015-08-29 09:23:25.473	\N	2015-08-29 09:23:25.473	\N	0	logement	177	171	197
178	2015-08-29 09:23:25.483	\N	2015-08-29 09:23:25.483	\N	0	administration_sante	178	171	198
179	2015-08-29 09:23:25.487	\N	2015-08-29 09:23:25.487	\N	0	ambassade	179	171	199
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
1	2015-08-29 09:23:25.494	\N	2015-08-29 09:23:25.494	\N	0	1	3	13
2	2015-08-29 09:23:25.496	\N	2015-08-29 09:23:25.496	\N	0	1	4	13
3	2015-08-29 09:23:25.497	\N	2015-08-29 09:23:25.497	\N	0	2	5	1
4	2015-08-29 09:23:25.502	\N	2015-08-29 09:23:25.502	\N	0	1	5	13
5	2015-08-29 09:23:25.503	\N	2015-08-29 09:23:25.503	\N	0	2	6	1
6	2015-08-29 09:23:25.504	\N	2015-08-29 09:23:25.504	\N	0	2	6	2
7	2015-08-29 09:23:25.506	\N	2015-08-29 09:23:25.506	\N	0	1	6	13
8	2015-08-29 09:23:25.507	\N	2015-08-29 09:23:25.507	\N	0	1	8	1
9	2015-08-29 09:23:25.514	\N	2015-08-29 09:23:25.514	\N	0	1	9	1
10	2015-08-29 09:23:25.516	\N	2015-08-29 09:23:25.516	\N	0	2	9	2
11	2015-08-29 09:23:25.518	\N	2015-08-29 09:23:25.518	\N	0	2	9	3
12	2015-08-29 09:23:25.522	\N	2015-08-29 09:23:25.522	\N	0	1	10	1
13	2015-08-29 09:23:25.523	\N	2015-08-29 09:23:25.523	\N	0	2	10	2
14	2015-08-29 09:23:25.524	\N	2015-08-29 09:23:25.524	\N	0	2	10	3
15	2015-08-29 09:23:25.525	\N	2015-08-29 09:23:25.525	\N	0	1	11	1
16	2015-08-29 09:23:25.535	\N	2015-08-29 09:23:25.535	\N	0	2	11	2
17	2015-08-29 09:23:25.536	\N	2015-08-29 09:23:25.536	\N	0	2	11	3
18	2015-08-29 09:23:25.537	\N	2015-08-29 09:23:25.537	\N	0	1	12	1
19	2015-08-29 09:23:25.538	\N	2015-08-29 09:23:25.538	\N	0	2	12	2
20	2015-08-29 09:23:25.539	\N	2015-08-29 09:23:25.539	\N	0	2	12	3
21	2015-08-29 09:23:25.54	\N	2015-08-29 09:23:25.54	\N	0	1	13	1
22	2015-08-29 09:23:25.541	\N	2015-08-29 09:23:25.541	\N	0	2	13	2
23	2015-08-29 09:23:25.542	\N	2015-08-29 09:23:25.542	\N	0	2	13	3
24	2015-08-29 09:23:25.543	\N	2015-08-29 09:23:25.543	\N	0	1	14	1
25	2015-08-29 09:23:25.544	\N	2015-08-29 09:23:25.544	\N	0	2	14	2
26	2015-08-29 09:23:25.544	\N	2015-08-29 09:23:25.544	\N	0	2	14	3
27	2015-08-29 09:23:25.546	\N	2015-08-29 09:23:25.546	\N	0	1	15	1
28	2015-08-29 09:23:25.547	\N	2015-08-29 09:23:25.547	\N	0	2	15	2
29	2015-08-29 09:23:25.55	\N	2015-08-29 09:23:25.55	\N	0	2	15	3
30	2015-08-29 09:23:25.555	\N	2015-08-29 09:23:25.555	\N	0	2	17	1
31	2015-08-29 09:23:25.556	\N	2015-08-29 09:23:25.556	\N	0	1	17	2
32	2015-08-29 09:23:25.557	\N	2015-08-29 09:23:25.557	\N	0	2	17	3
33	2015-08-29 09:23:25.558	\N	2015-08-29 09:23:25.558	\N	0	2	18	1
34	2015-08-29 09:23:25.559	\N	2015-08-29 09:23:25.559	\N	0	1	18	2
35	2015-08-29 09:23:25.562	\N	2015-08-29 09:23:25.562	\N	0	2	18	3
36	2015-08-29 09:23:25.563	\N	2015-08-29 09:23:25.563	\N	0	2	19	1
37	2015-08-29 09:23:25.564	\N	2015-08-29 09:23:25.564	\N	0	1	19	2
38	2015-08-29 09:23:25.567	\N	2015-08-29 09:23:25.567	\N	0	2	19	3
39	2015-08-29 09:23:25.572	\N	2015-08-29 09:23:25.572	\N	0	2	20	1
40	2015-08-29 09:23:25.587	\N	2015-08-29 09:23:25.587	\N	0	1	20	2
41	2015-08-29 09:23:25.591	\N	2015-08-29 09:23:25.591	\N	0	2	20	3
42	2015-08-29 09:23:25.593	\N	2015-08-29 09:23:25.593	\N	0	2	21	1
43	2015-08-29 09:23:25.599	\N	2015-08-29 09:23:25.599	\N	0	1	21	2
44	2015-08-29 09:23:25.603	\N	2015-08-29 09:23:25.603	\N	0	2	21	3
45	2015-08-29 09:23:25.604	\N	2015-08-29 09:23:25.604	\N	0	1	23	1
46	2015-08-29 09:23:25.605	\N	2015-08-29 09:23:25.605	\N	0	1	24	1
47	2015-08-29 09:23:25.606	\N	2015-08-29 09:23:25.606	\N	0	1	25	1
48	2015-08-29 09:23:25.607	\N	2015-08-29 09:23:25.607	\N	0	1	26	1
49	2015-08-29 09:23:25.608	\N	2015-08-29 09:23:25.608	\N	0	1	27	1
50	2015-08-29 09:23:25.61	\N	2015-08-29 09:23:25.61	\N	0	1	28	1
51	2015-08-29 09:23:25.611	\N	2015-08-29 09:23:25.611	\N	0	1	31	5
52	2015-08-29 09:23:25.612	\N	2015-08-29 09:23:25.646	\N	0	2	31	6
53	2015-08-29 09:23:25.659	\N	2015-08-29 09:23:25.659	\N	0	2	31	7
54	2015-08-29 09:23:25.66	\N	2015-08-29 09:23:25.66	\N	0	2	31	8
55	2015-08-29 09:23:25.666	\N	2015-08-29 09:23:25.666	\N	0	2	31	11
56	2015-08-29 09:23:25.668	\N	2015-08-29 09:23:25.668	\N	0	1	32	1
57	2015-08-29 09:23:25.67	\N	2015-08-29 09:23:25.67	\N	0	2	32	11
58	2015-08-29 09:23:25.673	\N	2015-08-29 09:23:25.673	\N	0	1	33	1
59	2015-08-29 09:23:25.674	\N	2015-08-29 09:23:25.674	\N	0	2	33	11
60	2015-08-29 09:23:25.676	\N	2015-08-29 09:23:25.676	\N	0	1	34	1
61	2015-08-29 09:23:25.682	\N	2015-08-29 09:23:25.682	\N	0	1	35	1
62	2015-08-29 09:23:25.684	\N	2015-08-29 09:23:25.684	\N	0	1	36	1
63	2015-08-29 09:23:25.686	\N	2015-08-29 09:23:25.686	\N	0	2	36	6
64	2015-08-29 09:23:25.687	\N	2015-08-29 09:23:25.687	\N	0	1	37	1
65	2015-08-29 09:23:25.688	\N	2015-08-29 09:23:25.688	\N	0	1	38	1
66	2015-08-29 09:23:25.689	\N	2015-08-29 09:23:25.689	\N	0	2	38	6
67	2015-08-29 09:23:25.693	\N	2015-08-29 09:23:25.693	\N	0	2	40	6
68	2015-08-29 09:23:25.695	\N	2015-08-29 09:23:25.695	\N	0	2	40	7
69	2015-08-29 09:23:25.696	\N	2015-08-29 09:23:25.696	\N	0	1	40	10
70	2015-08-29 09:23:25.697	\N	2015-08-29 09:23:25.697	\N	0	2	40	12
71	2015-08-29 09:23:25.7	\N	2015-08-29 09:23:25.7	\N	0	2	41	6
72	2015-08-29 09:23:25.701	\N	2015-08-29 09:23:25.701	\N	0	1	41	8
73	2015-08-29 09:23:25.706	\N	2015-08-29 09:23:25.706	\N	0	1	42	8
74	2015-08-29 09:23:25.707	\N	2015-08-29 09:23:25.707	\N	0	2	43	6
75	2015-08-29 09:23:25.708	\N	2015-08-29 09:23:25.708	\N	0	1	43	14
76	2015-08-29 09:23:25.709	\N	2015-08-29 09:23:25.709	\N	0	1	44	6
77	2015-08-29 09:23:25.71	\N	2015-08-29 09:23:25.71	\N	0	1	45	11
78	2015-08-29 09:23:25.711	\N	2015-08-29 09:23:25.711	\N	0	1	46	12
79	2015-08-29 09:23:25.715	\N	2015-08-29 09:23:25.715	\N	0	1	47	6
80	2015-08-29 09:23:25.716	\N	2015-08-29 09:23:25.716	\N	0	2	49	7
81	2015-08-29 09:23:25.717	\N	2015-08-29 09:23:25.717	\N	0	1	49	14
82	2015-08-29 09:23:25.719	\N	2015-08-29 09:23:25.719	\N	0	1	50	7
83	2015-08-29 09:23:25.728	\N	2015-08-29 09:23:25.728	\N	0	1	51	7
84	2015-08-29 09:23:25.729	\N	2015-08-29 09:23:25.729	\N	0	1	52	7
85	2015-08-29 09:23:25.73	\N	2015-08-29 09:23:25.73	\N	0	2	52	10
86	2015-08-29 09:23:25.731	\N	2015-08-29 09:23:25.731	\N	0	2	52	12
87	2015-08-29 09:23:25.732	\N	2015-08-29 09:23:25.732	\N	0	2	52	14
88	2015-08-29 09:23:25.733	\N	2015-08-29 09:23:25.733	\N	0	1	53	6
89	2015-08-29 09:23:25.734	\N	2015-08-29 09:23:25.734	\N	0	2	53	14
90	2015-08-29 09:23:25.736	\N	2015-08-29 09:23:25.736	\N	0	1	54	6
91	2015-08-29 09:23:25.737	\N	2015-08-29 09:23:25.737	\N	0	2	54	14
92	2015-08-29 09:23:25.738	\N	2015-08-29 09:23:25.738	\N	0	1	55	7
93	2015-08-29 09:23:25.739	\N	2015-08-29 09:23:25.739	\N	0	1	56	6
94	2015-08-29 09:23:25.74	\N	2015-08-29 09:23:25.74	\N	0	2	56	14
95	2015-08-29 09:23:25.741	\N	2015-08-29 09:23:25.741	\N	0	2	59	8
96	2015-08-29 09:23:25.742	\N	2015-08-29 09:23:25.742	\N	0	1	59	15
97	2015-08-29 09:23:25.744	\N	2015-08-29 09:23:25.744	\N	0	1	61	6
98	2015-08-29 09:23:25.745	\N	2015-08-29 09:23:25.745	\N	0	1	66	9
99	2015-08-29 09:23:25.746	\N	2015-08-29 09:23:25.746	\N	0	2	66	14
100	2015-08-29 09:23:25.747	\N	2015-08-29 09:23:25.747	\N	0	1	67	9
101	2015-08-29 09:23:25.748	\N	2015-08-29 09:23:25.748	\N	0	1	68	9
102	2015-08-29 09:23:25.749	\N	2015-08-29 09:23:25.749	\N	0	1	69	9
103	2015-08-29 09:23:25.751	\N	2015-08-29 09:23:25.751	\N	0	1	71	11
104	2015-08-29 09:23:25.752	\N	2015-08-29 09:23:25.752	\N	0	1	73	9
105	2015-08-29 09:23:25.753	\N	2015-08-29 09:23:25.753	\N	0	1	74	9
106	2015-08-29 09:23:25.754	\N	2015-08-29 09:23:25.754	\N	0	1	90	9
107	2015-08-29 09:23:25.755	\N	2015-08-29 09:23:25.755	\N	0	1	95	11
108	2015-08-29 09:23:25.756	\N	2015-08-29 09:23:25.756	\N	0	2	129	1
109	2015-08-29 09:23:25.757	\N	2015-08-29 09:23:25.757	\N	0	2	129	2
110	2015-08-29 09:23:25.758	\N	2015-08-29 09:23:25.759	\N	0	1	129	4
111	2015-08-29 09:23:25.76	\N	2015-08-29 09:23:25.76	\N	0	2	129	14
112	2015-08-29 09:23:25.762	\N	2015-08-29 09:23:25.762	\N	0	2	130	1
113	2015-08-29 09:23:25.763	\N	2015-08-29 09:23:25.763	\N	0	2	130	2
114	2015-08-29 09:23:25.764	\N	2015-08-29 09:23:25.764	\N	0	1	130	4
115	2015-08-29 09:23:25.766	\N	2015-08-29 09:23:25.766	\N	0	2	130	14
116	2015-08-29 09:23:25.767	\N	2015-08-29 09:23:25.767	\N	0	2	131	1
117	2015-08-29 09:23:25.769	\N	2015-08-29 09:23:25.769	\N	0	2	131	2
118	2015-08-29 09:23:25.78	\N	2015-08-29 09:23:25.78	\N	0	1	131	4
119	2015-08-29 09:23:25.781	\N	2015-08-29 09:23:25.781	\N	0	2	131	14
120	2015-08-29 09:23:25.782	\N	2015-08-29 09:23:25.782	\N	0	1	132	4
121	2015-08-29 09:23:25.783	\N	2015-08-29 09:23:25.783	\N	0	2	132	14
122	2015-08-29 09:23:25.784	\N	2015-08-29 09:23:25.784	\N	0	2	133	1
123	2015-08-29 09:23:25.785	\N	2015-08-29 09:23:25.785	\N	0	2	133	2
124	2015-08-29 09:23:25.786	\N	2015-08-29 09:23:25.786	\N	0	1	133	4
125	2015-08-29 09:23:25.787	\N	2015-08-29 09:23:25.787	\N	0	2	133	14
126	2015-08-29 09:23:25.789	\N	2015-08-29 09:23:25.789	\N	0	1	134	4
127	2015-08-29 09:23:25.79	\N	2015-08-29 09:23:25.79	\N	0	2	134	14
128	2015-08-29 09:23:25.791	\N	2015-08-29 09:23:25.791	\N	0	1	135	4
129	2015-08-29 09:23:25.792	\N	2015-08-29 09:23:25.792	\N	0	1	136	4
130	2015-08-29 09:23:25.793	\N	2015-08-29 09:23:25.793	\N	0	2	136	14
131	2015-08-29 09:23:25.794	\N	2015-08-29 09:23:25.794	\N	0	2	138	2
132	2015-08-29 09:23:25.795	\N	2015-08-29 09:23:25.795	\N	0	1	138	3
133	2015-08-29 09:23:25.796	\N	2015-08-29 09:23:25.796	\N	0	2	139	1
134	2015-08-29 09:23:25.797	\N	2015-08-29 09:23:25.797	\N	0	2	139	2
135	2015-08-29 09:23:25.798	\N	2015-08-29 09:23:25.798	\N	0	1	139	3
136	2015-08-29 09:23:25.799	\N	2015-08-29 09:23:25.799	\N	0	2	140	1
137	2015-08-29 09:23:25.8	\N	2015-08-29 09:23:25.8	\N	0	2	140	2
138	2015-08-29 09:23:25.8	\N	2015-08-29 09:23:25.8	\N	0	1	140	3
139	2015-08-29 09:23:25.801	\N	2015-08-29 09:23:25.801	\N	0	2	141	1
140	2015-08-29 09:23:25.802	\N	2015-08-29 09:23:25.802	\N	0	2	141	2
141	2015-08-29 09:23:25.803	\N	2015-08-29 09:23:25.803	\N	0	1	141	3
142	2015-08-29 09:23:25.804	\N	2015-08-29 09:23:25.804	\N	0	2	141	14
143	2015-08-29 09:23:25.805	\N	2015-08-29 09:23:25.805	\N	0	2	142	1
144	2015-08-29 09:23:25.806	\N	2015-08-29 09:23:25.806	\N	0	2	142	2
145	2015-08-29 09:23:25.807	\N	2015-08-29 09:23:25.807	\N	0	1	142	3
146	2015-08-29 09:23:25.808	\N	2015-08-29 09:23:25.808	\N	0	2	142	14
147	2015-08-29 09:23:25.809	\N	2015-08-29 09:23:25.809	\N	0	2	143	1
148	2015-08-29 09:23:25.81	\N	2015-08-29 09:23:25.81	\N	0	2	143	2
149	2015-08-29 09:23:25.811	\N	2015-08-29 09:23:25.811	\N	0	1	143	3
150	2015-08-29 09:23:25.812	\N	2015-08-29 09:23:25.812	\N	0	1	145	10
151	2015-08-29 09:23:25.813	\N	2015-08-29 09:23:25.813	\N	0	1	146	10
152	2015-08-29 09:23:25.814	\N	2015-08-29 09:23:25.814	\N	0	1	147	10
153	2015-08-29 09:23:25.815	\N	2015-08-29 09:23:25.815	\N	0	1	148	10
154	2015-08-29 09:23:25.817	\N	2015-08-29 09:23:25.817	\N	0	1	149	10
155	2015-08-29 09:23:25.818	\N	2015-08-29 09:23:25.818	\N	0	1	150	10
156	2015-08-29 09:23:25.819	\N	2015-08-29 09:23:25.819	\N	0	1	151	10
157	2015-08-29 09:23:25.82	\N	2015-08-29 09:23:25.82	\N	0	1	152	10
158	2015-08-29 09:23:25.821	\N	2015-08-29 09:23:25.821	\N	0	2	154	1
159	2015-08-29 09:23:25.823	\N	2015-08-29 09:23:25.823	\N	0	2	154	2
160	2015-08-29 09:23:25.825	\N	2015-08-29 09:23:25.825	\N	0	1	154	3
161	2015-08-29 09:23:25.826	\N	2015-08-29 09:23:25.826	\N	0	2	155	3
162	2015-08-29 09:23:25.827	\N	2015-08-29 09:23:25.827	\N	0	1	155	4
163	2015-08-29 09:23:25.828	\N	2015-08-29 09:23:25.828	\N	0	2	155	14
164	2015-08-29 09:23:25.828	\N	2015-08-29 09:23:25.828	\N	0	2	156	3
165	2015-08-29 09:23:25.829	\N	2015-08-29 09:23:25.829	\N	0	1	156	4
166	2015-08-29 09:23:25.83	\N	2015-08-29 09:23:25.83	\N	0	2	156	14
167	2015-08-29 09:23:25.831	\N	2015-08-29 09:23:25.831	\N	0	1	157	14
\.


--
-- Name: categoryinterestlink_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('categoryinterestlink_id_seq', 167, true);


--
-- Data for Name: customerinterest; Type: TABLE DATA; Schema: public; Owner: play
--

COPY customerinterest (id, creationdate, creationuser, lastupdate, lastupdateuser, version, iconname, name, orderindex, translationname_id) FROM stdin;
1	2015-08-29 09:23:22.71	\N	2015-08-29 09:23:22.71	\N	0	eat.png	manger	1	1
2	2015-08-29 09:23:22.799	\N	2015-08-29 09:23:22.799	\N	0	drink.png	prendre_un_verre	2	2
3	2015-08-29 09:23:22.812	\N	2015-08-29 09:23:22.812	\N	0	going_out.png	sortir	3	3
4	2015-08-29 09:23:22.823	\N	2015-08-29 09:23:22.823	\N	0	culture.png	me_cultiver	4	4
5	2015-08-29 09:23:22.831	\N	2015-08-29 09:23:22.831	\N	0	supermarket.png	faire_des_courses	5	5
6	2015-08-29 09:23:22.891	\N	2015-08-29 09:23:22.891	\N	0	shopping.png	faire_du_shopping_plaisir	6	6
7	2015-08-29 09:23:22.909	\N	2015-08-29 09:23:22.909	\N	0	clothe.png	mhabiller	7	7
8	2015-08-29 09:23:22.919	\N	2015-08-29 09:23:22.919	\N	0	decor.png	decorer_ma_maison	8	8
9	2015-08-29 09:23:22.944	\N	2015-08-29 09:23:22.944	\N	0	welness.png	prendre_soin_de_moi	9	9
10	2015-08-29 09:23:22.96	\N	2015-08-29 09:23:22.96	\N	0	sport.png	faire_du_sport	10	10
11	2015-08-29 09:23:22.977	\N	2015-08-29 09:23:22.977	\N	0	pets.png	prendre_soin_de_mes_animaux	11	11
12	2015-08-29 09:23:22.994	\N	2015-08-29 09:23:22.994	\N	0	travel.png	voyager	12	12
13	2015-08-29 09:23:23.001	\N	2015-08-29 09:23:23.001	\N	0	sleep.png	se_loger	13	13
14	2015-08-29 09:23:23.017	\N	2015-08-29 09:23:23.017	\N	0	kids.png	soccuper_denfants	14	14
15	2015-08-29 09:23:23.03	\N	2015-08-29 09:23:23.031	\N	0	doityourself.png	bricoler	15	15
16	2015-08-29 09:23:23.039	\N	2015-08-29 09:23:23.039	\N	0	read.png	lire	16	16
17	2015-08-29 09:23:23.044	\N	2015-08-29 09:23:23.044	\N	0	garden.png	jardiner	17	17
18	2015-08-29 09:23:23.064	\N	2015-08-29 09:23:23.064	\N	0	music.png	ecouter_de_la_musique	18	18
19	2015-08-29 09:23:23.074	\N	2015-08-29 09:23:23.074	\N	0	technology.png	etre_high_tech	19	19
20	2015-08-29 09:23:23.085	\N	2015-08-29 09:23:23.085	\N	0	play.png	jouer	20	20
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
4	2015-08-29 19:05:46.382	\N	2015-08-29 19:05:46.382	\N	0	f	IhSQIm4g0zV1cG6zW2d7OipmxcZ6WMX1IZd5KLMASZNeYxHF20ABGEhV0MKDi85Y	4
5	2015-08-29 19:05:51.362	\N	2015-08-29 19:05:51.362	\N	0	f	jxatFd0CwPnso5zHRS3iho3VV9opcVLCxBbuARLrFjm6UCcjWxzIVpkxCDPQX+6U	5
6	2015-08-29 19:05:54.436	\N	2015-08-29 19:05:54.436	\N	0	f	2KUSf536mw08rui1NwLeEaD5JmtWGnFkvFWUlOslYOz7WVewt2dI9keoR8tv3IGM	6
7	2015-08-29 19:05:57.618	\N	2015-08-29 19:05:57.618	\N	0	f	RUiKhhD/ygDUFLSZ/1gAc4Elcq1vJm7CbuYh3oewi2e6wI347s6lIoqr2JvJmTXG	7
8	2015-08-29 19:06:24.313	\N	2015-08-29 19:06:24.313	\N	0	f	IOq9PrZLrutg7BRWYfxxvAeloAu/As09T3gBARAnBu2NMoDd8/l89WM5xheliS6U	8
9	2015-08-29 19:06:27.218	\N	2015-08-29 19:06:27.218	\N	0	f	boo3xQCxv/z8FdKqy6jBm7aJ1CJ+4JdBMYRoQqw0Zg7+sKHX4Hks1DD3DhRdIPTC	9
10	2015-08-29 19:06:37.113	\N	2015-08-29 19:06:37.113	\N	0	f	8Ms6kEtI9rRQd7HhzfkAaL9rQEtan3+THYUDmQUEz+z+9Qb5/bT9AoebzJrLQV0h	10
11	2015-08-29 19:06:45.585	\N	2015-08-29 19:06:45.585	\N	0	f	AG2EfFGD3US6RgP73LT/9iLvsVSQq5VJViIImPCJtUrVDb5t/I9w7CsAXaWMkCD6	11
12	2015-08-29 19:06:50.989	\N	2015-08-29 19:06:50.989	\N	0	f	pv7in8SroWAVT8KEYu+o5UI7ff4g67qn6hoX6USQxaL4Nsbk2iTxVZHhz6CH/SpH	12
13	2015-08-29 19:06:54.699	\N	2015-08-29 19:06:54.699	\N	0	f	fB2psb5Y6meK0tj93LcRPebEu2LD3RawPR5a9e3Mbq3GUubMJRsf+KD1B0YNn5rS	13
\.


--
-- Name: logincredential_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('logincredential_id_seq', 13, true);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: play
--

COPY session (id, creationdate, creationuser, lastupdate, lastupdateuser, version, connectiondate, source, account_id) FROM stdin;
1	2015-08-29 12:21:59.315	\N	2015-08-29 12:21:59.315	\N	0	2015-08-29 12:21:59.314	ANDROID	1
2	2015-08-29 19:10:22.578	\N	2015-08-29 19:10:22.578	\N	0	2015-08-29 19:10:22.578	ANDROID	5
\.


--
-- Name: session_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('session_id_seq', 2, true);


--
-- Data for Name: storedfile; Type: TABLE DATA; Schema: public; Owner: play
--

COPY storedfile (id, creationdate, creationuser, lastupdate, lastupdateuser, version, comment, fileorder, isimage, originalname, size, storedname, storednameoriginalsize, account_id, businessgallerypicture_id, publication_id) FROM stdin;
1	2015-08-29 19:05:49.69	\N	2015-08-29 19:05:49.69	\N	0	\N	0	t	S1.jpg	0	88FC4htwADSnMoy8TsGk7bRTf8ON8rADT9Ex6AZcta4Mwif1uujO8dtBjZzOZY5377RuR0wCtNHWR4BtPWRkXmWcrteOiIcOzQnE	tayDFZvMnU3BJLSSpgvNLY6NwSfd1YZVJKQfpg1bTMPMArDP4JduPeEQxad0Lp6Z93NehBvxdug0MfIaSdQFMqT0Qdhn8OgVwUoI	4	\N	\N
2	2015-08-29 19:05:50.771	\N	2015-08-29 19:05:50.771	\N	0	\N	0	t	L1.bmp	0	aaKebrAsRTw1JlLTRNjj9gOfxidkSSK3gLGYPeqqsKDdatmFOTt3NJaBjSHJHMXk5gmCwEi3sgkARAN6S0qWSXufYxt9pJMPnMR4	B8MitPJyXXzmJTeAmZ3HGDwxXB0EG59tk83xglYXPdU3dg8MhIyrTfeBzG76Md69VBQxbBPFbOzdUbNQGritZkWccCCpMcX7LtFB	4	\N	\N
3	2015-08-29 19:05:52.647	\N	2015-08-29 19:05:52.647	\N	0	\N	0	t	S2.jpg	0	UDxo7Roed8hyGgMMzKaVN4HCLqit0oggvkXNUUrW0aTdf2C0I8j5epC0uVSsVYMstO8zwKnlPno6Ey8agCRexx8w5d3xdlPvWmWJ	d1hzcTTgLkvVjPc7sbe0QeDlt39JxZwIFSDZo6dgNwS4Lw0BnwPbcMwykxn238SeKQi0Ad2gdew3CBWAur1LNVqwIUpxib26v4kC	5	\N	\N
4	2015-08-29 19:05:53.84	\N	2015-08-29 19:05:53.84	\N	0	\N	0	t	L2.jpg	0	4Gzt1nmOrCyhmztqME3aIsWVb8y3zLMCVTaju8ZbcPJFavFtVfjti30rUK3YgyMBYdNxqYl9lXKGCBBJaHnllUyPbBB2Gn07GT3P	8BDDnvRmsRoJSmiDfy4VbbUI3f11vkYyU3tygSkoNXbLPgemCgCp5FLZoaUboMMcgdL5YLZen3wK6Fm5taisckPtrNbTikQKZAhB	5	\N	\N
5	2015-08-29 19:05:55.755	\N	2015-08-29 19:05:55.755	\N	0	\N	0	t	S3.jpg	0	qsiBzrf8yJUmNpY3vr8iDETEGLU1gZVSkvSauaFap9S91b2azI2FHnaE0McSSZmIOpBxUR3eQQlA8U9mZXra993N6A0watPtV9QM	FwBj1BYcnEfG9aCTBTg9lt616Z01RiGpNbWtr5IV2lHrdWItx5CCjSytJcdLvqSIu2Z9bLFXRiI07UbRQlC8i4yMZdnzsNgbvQAI	6	\N	\N
6	2015-08-29 19:05:56.947	\N	2015-08-29 19:05:56.947	\N	0	\N	0	t	L3.jpg	0	iWuwxauT1RTJ1eotAa9M5DUV5N9ur3TJFX1x0GMroQ3vDlfwX733RPEvzFHgcfpWzsuqGsavQ4UUfbG9xbQtRSKZLTqVJIh3tpVK	OZ3Xb1oFqCZJPH8VjFMFOhru5vV9OPHnOn5u0YG6gRA9C4g1C0KJdBOy4rRiDL2oeG7e1lKZyxivtZhdMTr5cmo2iBAqxN4jVmEw	6	\N	\N
7	2015-08-29 19:06:17.002	\N	2015-08-29 19:06:17.002	\N	0	\N	0	t	S4.png	0	S7ZC0NB8Rj2M9rpP8og9bLHzI3yq689qLJNa2tU6U0MwTJ1wkTTlSbUopHjMzDC9flhblrb4i9EOqWGPD2EHOnmaVG6fvM33Foii	QvIzqpaS8Tqf3ufGqlpj5ukO25CEzZzlBHjOSYEs2mppn21MAeTyUSkStrfHa7maIGR07kalrRDDfcRlQoyQXi6aPI668LzDtvcv	7	\N	\N
8	2015-08-29 19:06:23.791	\N	2015-08-29 19:06:23.791	\N	0	\N	0	t	L4.jpg	0	uo2eF4XI30MBvXlj0QYEj2Z20KrPcYkzTPJvVPT4q0ybTiEHShHynpOH9OS9DgNWvfuLXRqZogubWPUdhTZt0z94iOEZsdmrCI3i	ZnXhKM4ZYg8oque0jUYLHNCOkIkc9uy2l5AXLGOJz5qCvZc7vA3e13drITdrB5pUO314sIyv6HaWYOdvCL1NE8jtbQOOogmUa219	7	\N	\N
9	2015-08-29 19:06:25.121	\N	2015-08-29 19:06:25.121	\N	0	\N	0	t	S5.jpg	0	6fxOXHxkNDHUVStGEvMhbZW7VCCyGQaDbTBPHzgtuK1KNhAqpqDX3gvPUeajXFuijyYz7WdrnTvl8dMdEKz686JfGIF70eJzhgZC	ffFkeHBlbNqzWy2kTMX4xE2rlner9r6iogaC8tblB9hjbQL8SkTTsmXfACQ8re0oazkBZ2vX2tkPvhiwpeI40xqHDjuegfnJB48k	8	\N	\N
10	2015-08-29 19:06:26.556	\N	2015-08-29 19:06:26.556	\N	0	\N	0	t	L5.png	0	z47PuRBxWAbzctqLeza4nSUt18TGWI6T659zG0UFFBxn5LqzQxVYLTViIj3Ug1v6xNeomBe1chY3EDkGJi2CiqCDnCcD6Iast8YV	VqZrTLdjeaeMn5iT4cgxdzNrSynDrCzlSTq53rHOsswqYxWkBS1FWUq2qxAqBbzZpcXzNBRLn4lKa2hWueekI9HtGXADxt1wruSN	8	\N	\N
11	2015-08-29 19:06:28.828	\N	2015-08-29 19:06:28.828	\N	0	\N	0	t	S6.jpg	0	yCGxKshLrtCmkSYwafqWi3ONigappTDdDjPLwNVAMFyjOoQugNlqtZlCQePkVH8ELdpcp3YoGgGPQ1XklqmKOU8KLDyrj5V9SEpn	62TAYzGHtQqMstYu1vBdsjc0x7EiSUtPybHlzdPDrLs10HER3Fj3MDM5N8r1PqUzk0zkOo5RPgNOU7299E4FzuC7X2QeVIIwAccM	9	\N	\N
12	2015-08-29 19:06:33.606	\N	2015-08-29 19:06:33.606	\N	0	\N	0	t	L6.jpg	0	Knh9wQqqQ6bA8B4L3TDkLhSLz64CBeWKk6eKP4RHypw68SZhVr7YItoTWRhYIbBx3q24XoSuktzz2D5eLOmEAwkjEqrDPxwmMmyV	rdJliotlUgh320TYQkoIWugacq8J49YFsseFaOXDYziy56h5KMbZfe7NThXALUghywCJeCu0isM5Wr0IIjgPtDVFPYcAg9bnkSMF	9	\N	\N
13	2015-08-29 19:06:39.899	\N	2015-08-29 19:06:39.899	\N	0	\N	0	t	S7.jpg	0	lAtGA4605V0jKdJf4HC0D04EfvtPF2wpeRMU0xv6CMqbLHUsU4WWkW5wj4ZvOR7mbefLfY2aouKph2zX4GHM9O0rGjZrAvu498iG	bYqNcj9TNl1pafDEQ82q8G61RYFYIl3OSRVNcUOoyQvOXbPP0ITyD4gFXnZpAeDp41bCBXa9qIKvr4OpZWnnHh18gRfQqbct9Eot	10	\N	\N
14	2015-08-29 19:06:44.955	\N	2015-08-29 19:06:44.955	\N	0	\N	0	t	L7.jpg	0	vbOMsoJubLkYqoE8CfdRiCynL0SWWg0sEELoBlrIqv3IRcOnAvcyaVByDaG3G9hwbDgvVrVd51QfXIVEMCKDKrWcvkyVQc7Dhe4S	IVpF7g92eni1GHe8umK6FCBJwMBConXjdc020yy5GE3TkmSFyFhrMBfPIujmfp42ODDnI1lzbN7O0WohfDRqUEFuRD7Tfd4xU0wK	10	\N	\N
15	2015-08-29 19:06:47.788	\N	2015-08-29 19:06:47.788	\N	0	\N	0	t	S8.jpg	0	WXS3Qe2aJCelZxBrSYUOeREoc8kAbxUytLCC8RvcwFSBHkvYGSOOq52kUUHteHVGE38Y5EDLbWq9Qwi6VLLxvtpKkTIsXwygahUC	chtYpT5Sucat5SAuHJmduLlSKIq1XqKnwrzGIK3PUHSAtJgbJRYu0f0F2ptiEoQJQTOhMB0VVLkofZdzOsqThADOznEc3C0JAtf7	11	\N	\N
16	2015-08-29 19:06:49.947	\N	2015-08-29 19:06:49.947	\N	0	\N	0	t	L8.jpg	0	52igOvJevUHrmhNOWmDU7iVO36DTm1YiiYfrN5QaCWuhWP05aW2yPyGXWrJpyCT3BeOkTQi3Ctr6lsGJA0BO2yqAvKsSM2ZZfdEG	ywAlYAlpfFlEDImKyu8SAQXdCpSesHByEOlu0iCgGyMlablFSaAHBKia4KHiz3gIzDaMqTjX8cu21UeAEnkdzOWQVIVZB61CwVMa	11	\N	\N
17	2015-08-29 19:06:52.159	\N	2015-08-29 19:06:52.159	\N	0	\N	0	t	S9.jpg	0	SlSMr0grIASImQTCVdVCfUUXOkKX2i0PeTEARSS1UtZFA2p9JQedAzWUQeq1olwUknNLlxe3S7HWMPSumqOfgRBFYn3QFF7fDiWh	F0ODAjF3oQyF73hFp0XNd2lUBHRKM4HkFiajTmQlLPXQC0hwcUZKsuQsH3AEl2IgIomdLcs4iH1D4M94ix1s2cFhOoi0Baqmu6MJ	12	\N	\N
18	2015-08-29 19:06:54.244	\N	2015-08-29 19:06:54.244	\N	0	\N	0	t	L9.png	0	6IeyRK49qU696hWiYaM9Yt067ONFS7c7SnfD69Rjmzu0kJ15v0ECz2KAJc6JzO9JIyLQfsordSa2uoBsifvwf8olLaa4C0XFLgbq	2lZsv9szC7vVoHfvthuGX33l70xPVeRhbkmRF03IW7lcha6oL2YcyRTm6jhcEcwr6F53Sf4ps1lrrvOVHR9CxCJW8GTSRogrFnr5	12	\N	\N
19	2015-08-29 19:06:55.594	\N	2015-08-29 19:06:55.594	\N	0	\N	0	t	S10.jpg	0	7vVpcBBWYXgARfA6IGcMfdOtY8lub3FWOoKkltkJSw8uKxcinw3BaHhIyU41LmcnW46xcamvnA3yiV7MpvdBC6dY1K0xfbqRycWS	jC1pu45kNwdVJ31iTuJTOEc6vW5rRSEZLLPNtjaMPhpS0KFzZRjSo8z5ezzdgj9CAu2CYltGSlWB1MXlT2qLxRbpVIzTYYuX03Dg	13	\N	\N
20	2015-08-29 19:06:57.485	\N	2015-08-29 19:06:57.485	\N	0	\N	0	t	L10.jpg	0	1figfwnslfmyD9K3Co5FTIK6Px2c7KWZXhSP7GKS7IAAgvaxwQBtQ94PpKqZZYjAviPSYWyNLJQCDBitppl1uAHS4QGL4hIs4zvo	CZcUggHmmxLHFtmAHLiu1OJZFHoueZhUuuC7f4oGNGoRA1DgJc2jlDI2B2REmuZQLy7pnfEo7rSPyJGys8Vo1Wi9uKN7JCs0nYPa	13	\N	\N
21	2015-08-29 19:07:06.41	\N	2015-08-29 19:07:11.627	\N	1	\N	0	t	1.jpg	0	CYRREbnghB93DuiE9pcngoiUUAqbbPpg9EG35Qi4YlUAC3wdLE5x9Xv1P1ZJV7B8NE9br8yiiT3cFmF86eIaLuS74VgVQ4mHeUzv	FwnH39AUz3yIWUioQUeS5MFtqRtggIAqiICNrSl3mcl1ohu5lNlQWVin62WmkS00PDbWScSPmVx9UCWx6r2CBRssNtKiEY9dzEFf	4	\N	1
22	2015-08-29 19:07:16.875	\N	2015-08-29 19:07:22.674	\N	1	\N	0	t	2.jpg	0	STY2WJo4ZAlNCw83eRkRcQZqC2d1j1GQQmEh1jTjDAV3eEYytgEvWHoUEN7Eq05xU3U14fIsFCEAKRJaewbtc8faPV83W64oeXYp	8q7ppC5cfMKJKWM2geuyyOiEvaxCwMHgConqhs2epKZIKYp5hEzkrVUlumhHUuiE3XOoXHT2bl28eIQVHHOsSZEMgyytGOUaBVqr	4	\N	2
23	2015-08-29 19:07:24.99	\N	2015-08-29 19:07:28.558	\N	1	\N	0	t	3.jpg	0	Rkz7IaJnmkqU0q21o9C09ucJ3zC9RVzqR0G9bd5w3lGhqoySUg6qt0GbTwRoaTM1H7u4lX8IbtyAPqD6uFIjaH2He9m5WEhzo9or	4WFrs5e5fnXW9vAxzBcBl5nNPjHOAmtZUTqtDHeA1y9srZomoWSpWtlS4H1Neq2SYfHE8krBBWQKTkhajWqQVihZUXzlCynlPgi7	4	\N	3
24	2015-08-29 19:07:31.605	\N	2015-08-29 19:07:32.704	\N	1	\N	0	t	4.jpg	0	nS0CYMn7W8IOP64l41ZX1KQGXyhK6ThfF72BvSz002G8vqRG6djF4axZ5JmeqrdkAu2G4WLW5gY4aWJDmxW69tWXBPaXhwVvcOv4	UOU8LdtxO9gVtV5WYhScrfVVCWmRBoQEhM3VpzXkmprKZXgMG2hMmbuv61GRDAM3LYIz2dO3fNnBEjfczzYiUiGHaD8HHsEz6zSH	4	\N	4
25	2015-08-29 19:07:33.885	\N	2015-08-29 19:07:35.973	\N	1	\N	0	t	5.jpg	0	hkKeGYEx8pBIdi7xgVJ4ex3UQ5VV0d8bOzEegtT1NbnGf7vwf11IoBXczfHCMNvhkCkuNZmS8hV3pfdNGi0Fx3860vx2Z38LD06Q	zYCEplw4q6ht1T7L8wLhbXo5lbov3kMBR8jixozuhRWW8ElupsCDdzqfOYiJM5A9Ts3x7forqBV4CHyMHfamqzA1oz6SJ9JGVxjf	4	\N	5
26	2015-08-29 19:07:38.396	\N	2015-08-29 19:07:41.114	\N	1	\N	0	t	11.jpg	0	A2mfLWSPDv8xJhA9fMQxxMBAXccK0wo777LE2m0cBfEd6V6QAXehjgvvDcMrwSuhC5b7s2JCkMbwetU1ghMEd6NWs1H2fjmmlgjn	fj47lMOwloiP36oCuBsc5d4XHB4Rx8dBrfEXmD4M7FetLesMacYY0tWP72JNyGOPB6fyCaMsoNqQvHI8aFa1qOrLx7BPsAqvRgZL	5	\N	9
27	2015-08-29 19:07:43.631	\N	2015-08-29 19:07:46.115	\N	1	\N	0	t	12.jpg	0	bil9R13MRccEooJC7kmPIfqPWTuwGE7hHrptB5w7JSwldadUha2Zqnql7d6Fh6IcfzOrTSsTjClMIgEBtmiXPM5TTZZThd0VPUjd	CnPzJBQfsdmK8jJa6jQhx4CQnMk1eweDLdTxMYfkf29BFNlqXahxWrFFiGj7E83XS1JlzM0A2lv1C1AICzynXHgo6KHWC5ENy0KE	5	\N	10
28	2015-08-29 19:07:49.343	\N	2015-08-29 19:07:52.784	\N	1	\N	0	t	13.jpg	0	Ei9GhpnnXshQq5B8Ns8gFi4iyzfJ0N3CzQv75wGp4NiKYiRIaaKkfbWii9sW6A3XksttfSiOroG4s65djt7xxMzVBxt81dK81ex8	k1GwcSI2alu6HBnRJmqR7upzfsjwkqFUKq8InQF3Zn7BvFZLTTkJvMlkpumQoVrifMssL5zJ4S5HvzxIbNi8LOQGME8rH61NLZ1h	5	\N	11
29	2015-08-29 19:07:54.902	\N	2015-08-29 19:07:56.831	\N	1	\N	0	t	14.jpg	0	LZByn6FHeNTwckS7o6RBUjFc7mtSFbaj5Vw2tO5ZrvHo5oJ40myHGHgQyHUivro7CdGIxVIxF2LevFbsTGkuxz6Z9MpOzVcrltAX	L5ovl8a5nbpQl2CkFY7evsQWrdyoYN1ZOZaYI6XKjY7kV0SAq8voxBFtZ2O32miZFiBzUPtFuUHp2EbKT108dRULgKpRvifqX3S9	5	\N	12
30	2015-08-29 19:07:59.491	\N	2015-08-29 19:08:03.352	\N	1	\N	0	t	15.jpg	0	1vLaqmp0fHWYCMkb7bjwzCsN1S3Rac9rPgwrop43gZUh1rt52W6ZLcDdOAJ8cbD0nX4WuWCOgA6GG9D0aBzz1tSPqsp6LZu3mTv9	SmLwVUBfsEPeAt9jOIqeG3MfvtnlVsUaqXdgpr2QsCgAm5Mq5HjuYIgQiHaLDmDnTN03arLDDMs6lGwgQUZ1rYsuv5q2FXidSCwS	5	\N	13
31	2015-08-29 19:08:08.217	\N	2015-08-29 19:08:12.977	\N	1	\N	0	t	16.jpg	0	qiD4sAIQwbUr65TVi0IWTIgpzufybHrkegxWpKN9UwZaJTA0jFeOljH75aJOTNMXfXffJH7Gmn5HygIRCVUl9lBl8K8tWiIIAdFA	BK2fXF38owUOTUwpX0FHkHwWvojFMxp8nI8nbKJqqo8C7CiFA7JAbImvdXWl0rDc1qm0tQhS9lBFOesspDj41EnuFV8lCAxyA0lm	5	\N	14
32	2015-08-29 19:08:16.153	\N	2015-08-29 19:08:16.835	\N	1	\N	0	t	17.JPG	0	erv8cY7Msy1Ea6G9xhnHLIlM3oyUpKG3bFurm3iZP3WWb36CYQcEcvKz0nyIYJFQYWxWpsxYiOpfe1ovPjfAWR9CuuC8sXjymwxu	vub0NksFJd4V2D53F5XsQWdhMjepBupteC5dScE5vGNAiwCODYRvWWuvtfSgna1UF5hXbcHhuWPZ08jnCixBfxUVsbQYg10ixQRb	5	\N	15
33	2015-08-29 19:08:17.892	\N	2015-08-29 19:08:18.561	\N	1	\N	0	t	19.jpg	0	kyMif5ZNVSlDFymTMVCzeTf5Sa9U4jVMcUvB4wbOIct1BcZOqeYeXYmXq3r0vCz03VUTXWvekJsdiMvZeaEJ6d9sqxEtrOJ0HWOS	xnpITSMCGQ1cyV57xRqAO8isOMdRKLpIVfpjQdRUJaxwoQcFaVSGuOxslavqnxAcksjrdSewJkQzhaEshDWd41jvETD0p09LF4TK	5	\N	16
34	2015-08-29 19:08:19.341	\N	2015-08-29 19:08:20.526	\N	1	\N	0	t	20.JPG	0	HHontdCwyaLSpSidU2oiyk8Y54wnAJC3Rz9VtGyhCAE0m2f2bCfNNAplOuOehLlkbjPgh1iopMn4ARwDqTfmW95312nzEEYMHel3	d6ZMmfw52mgf6JoxnVkINdjflfym67gXmb9QMAWG5vrbyGZ9XPK7G0zQyk016iIywtY61OMIthfacoiEL8BsboG8AtkKSMzNTWol	5	\N	17
35	2015-08-29 19:08:21.785	\N	2015-08-29 19:08:23.581	\N	1	\N	0	t	21.jpg	0	7L04PhTxpwAoBtIBILAMuaEnc1RwXYZObhvb3UmhV1xFZ1sxPkzo9TLWYd8L4rrtHT2Pwat1vkluByO17mLBEEbL6JbfQdr5B7By	qVSuuFM7ehwyzCNRuxevFkraUV9AmuFrA0dQvF9PZ6QB7KYpZSrr1suJ6mcrV8mD0I7FgFNnEpPkpNVzRTDZO41KuTVdPFkNOMnX	6	\N	18
36	2015-08-29 19:08:25.087	\N	2015-08-29 19:08:26.017	\N	1	\N	0	t	22.jpg	0	zWTFV138bpMZ2MK2tAGD0SCBbkox688ou4cp0Zgh4T82xQBOu14LOvIGwAMorlj9HPe82geRZCsGYoYordvlQ3ZejbaZ8UAtStDn	KKkf4NkBdOROGSQQadUY7PjW1m1wcKB7cu8OO8iApqHoNE3iXIT71LNCzqcfTL5ECDB2kikDzBEBsXl0I6Uk7rQXg9gUR5uTTfEr	6	\N	19
37	2015-08-29 19:08:27.41	\N	2015-08-29 19:08:28.233	\N	1	\N	0	t	23.jpg	0	I80zTPFDiAoY2qyft1TZpzfpxMBXk2K1G5Zekte5ZoaKmFQqBQWhStCxvH23JtAq1Zv8TPOhIPoLzwFJi90nxPyhTUypEKEkELC6	SB0AfGJyTKQ2uDW2eOOdDZxIyJFqNIwuip4IdruFpu16sbrPRahcQecQ5PGPLElJuMWjLIljSRAX5mg0XpypApFsltaovgcfozCd	6	\N	20
38	2015-08-29 19:08:29.35	\N	2015-08-29 19:08:30.323	\N	1	\N	0	t	24.jpg	0	UQ6965BC9e2JqgZBD87jXWMRWHvzf3El9Gyr6G81xLVwmbGUkG3PxkPZutPmotS0L26CMbL7oehsgcjeeQoD8002gwJae17ody5f	a0Y1iMKuxAO5elh5pQY2vFwXldy4A2qj07XU0sN6iH4kAn0pMjS9a3HuxqrWD3PUYtdjQAaByjDhx3vnTC5u1JqWKJKnJdFicCIZ	6	\N	21
39	2015-08-29 19:08:31.185	\N	2015-08-29 19:08:32.063	\N	1	\N	0	t	25.jpg	0	KtvmkMKlm1D2oS0xTJ35fIrm1U0xarcMnlGOCHDfQuXaCRwx19vwVGBOIXQvoltAHVacE2kZJA8COCOzikEcjMDKlqpiF7IFVK0M	at1J2ML8CpxzVFekt9EBmRczgZUwvYsStle2kT5tTIky5O3qPznlpQ31hGQ9oy2O16Aoa7dLUx2dJHY0kbSaxYALKHcMDMbL66Mm	6	\N	22
40	2015-08-29 19:08:32.682	\N	2015-08-29 19:08:33.413	\N	1	\N	0	t	31.jpg	0	R8DeIQasvecTaxhPS0YBOQjMfJMz2WPVJExsXUAWdnczpb4o5cMUNCEbjFvRwjYC5U6Pw8pbE7dBYYHwQLB5DfDIRsikcORUYX1l	kdEDj9d467fuLUwJCLp2WfrUBpxomy7NfFc7WmwCNg400c6TBImXuNc4Pskl9rB8grH1OfTp2yhCIGUwLgGsodFP0I8xefLls8I2	7	\N	25
41	2015-08-29 19:08:34.337	\N	2015-08-29 19:08:35.415	\N	1	\N	0	t	32.jpg	0	3wBEHGgUrpaq4OWUaB3VsiIkzO0Z8jSnb0zPW6HDNC3vAkKuruZFlcQHCBG6HAyFcwNSg9mThJTh6BG0oJyPwxjAwdS2QFlDHatn	scadp2kPzvMzyOEtg3vPNf8DTexjjR0rrccaOftMd7FevHGquosjDs5aINJBmIjIOGd9jXERnx40NGgJIX4xr25JN8aygVz8dP9s	7	\N	26
42	2015-08-29 19:08:37.437	\N	2015-08-29 19:08:41.504	\N	1	\N	0	t	33.jpg	0	GekZokjmZ91fKZHSZl8jKA7fJ7pFIq5pjSzEYA3P4iHzYKrWUiP6Z9zhJPXve4GSqUD6Pua0EzDrmmWh3ECwEjfwCb5yNaqvHipM	mPZN0hizDsKpVMnPREiCBxDaepYLODOk5XoJkXyPOZC1b7vfMsniQLWYP03Sup9LjKwIhy6rEG0kakMHrDV8cUZOlVOM0IyfENDZ	7	\N	27
43	2015-08-29 19:08:42.774	\N	2015-08-29 19:08:45.398	\N	1	\N	0	t	35.jpg	0	8DLglvlgOWrc1fwmJmLxT69H6GtyKWDik8IUgLmzRyWnJvFuFaK6TIycGVzYXbHiiMJMnSCvpEgdoAanj2mNaXJyIiLH5E2aWP8K	hYjkf4OW2swSvsySySuyWseTb9btWoVWofVbEtKPqDovHbOZQMT1ALP2E4fRH6Re50nfbO8chanZQDSCcMeuuvhQvFaHzb0uedVD	7	\N	29
44	2015-08-29 19:08:46.83	\N	2015-08-29 19:08:47.349	\N	1	\N	0	t	41.jpg	0	mWreH7GAVqOQFKd0joUvPRUxjXAeWGGGhMDmJEp6xHpoZfM9SuNyjyujJRTBMiMhFKdKxQOHZPB6GWcAc3hde8nhkPKrQ130Phx1	YHSSnu2HdevYHMV0wbg15fdDlF8fU8F6JH8hJwwyW9nZRM24Sy54bwwe4oZz4Igqeoivclpyb2GE20XjwY3Koa2vmeCmtapDaadl	8	\N	32
45	2015-08-29 19:08:48.102	\N	2015-08-29 19:08:48.9	\N	1	\N	0	t	42.jpg	0	uWhlbOwMaEzBGw1qVnYNXS3qUNXh2Y01wmbT1zFJPzt7B4Fd9Hv9pRE1M4DkLNno7ZZyhjQhuW6UvSuBgFrp0HfqR8VR6NVKEguf	8BQNdaZBPbn5f6XKF2YBQVGQBCmNtGaVKhegud18Elzh0GvzfEtYbpNbJlXrkLKoaxvbFJDE8EyYBiFcb15gAtkSBVDudi4SwLyH	8	\N	33
46	2015-08-29 19:08:50.905	\N	2015-08-29 19:08:52.187	\N	1	\N	0	t	43.jpg	0	4TbxYehwhVXxjW6wLl5F1vlW34sVyWd2ejlmMZgXqBiKlJF3s3AgQWYO6EBPs1CdCCkXrBx0fOjuDsO5wQezPwcQE84F3wSGoOn3	FZYwh1MsAhTfLbpmleEHEHs4y7dSnF0TexTviVAwy1kb94fgrrMLApqEIj2FR6oF0kKk4VNn2Sj69E8L7lXKqXJkUe82ZI7azEX6	8	\N	34
47	2015-08-29 19:08:53.341	\N	2015-08-29 19:08:53.885	\N	1	\N	0	t	44.jpeg	0	GAyGnv5oCl18COghGwQdaUcHglDmENtfWmZHk5VUZJa8A45ivLc7wFq3SC2R0RUyoFddDq7AQM62JjoZzITHlgIzyw48Wy57WByZ	koV0lWbpsPahw4wqtxoZeL4BEt4QTiQakYnyghBNl4yB3sFzWV4qp1bmQ7BINtg5nQl0bC9dEthBRX7ydAu7r7JmEHhlKYbhAQEC	8	\N	35
48	2015-08-29 19:08:55.128	\N	2015-08-29 19:08:59.033	\N	1	\N	0	t	45.jpg	0	um6P3Qn8S926MmxTi71ARfQtSIEbiKMI1yjopdh9uvSpl0fvNsQS4aGfqa0bSsHFB0rFB1I3GnDgByoRAyvdGFsuKQZuGQBQymZo	RFNwwFRfjvNOv6kRb1I7Rb8yVB38MxswO2msxoWSs3kBWlAXhaeB2HTfOvjHTCE406cpbh49PL3GxCMAkrMjH3lVCgyKRGuKYgjx	8	\N	36
49	2015-08-29 19:09:01.075	\N	2015-08-29 19:09:02.702	\N	1	\N	0	t	46.jpg	0	TL8czjsdTnfpmKAc9qY2inaZSke0lCLm9TBvLNveg6G2TRq3ayULxANfzMG2sKPhe5QOU23yQA7F0LLgEpVqQjk70XVBcd9Cqy94	XBKK78ciqXxpyGsl6BH7lG3U6s7m8q2qrIXYvDhkQxXeB4AFyaDUgDs6ASCpqSGg7pTuoggWZmFNC2yHmuLTcaXuEhSgM0TM9qii	8	\N	37
50	2015-08-29 19:09:04.013	\N	2015-08-29 19:09:04.496	\N	1	\N	0	t	47.jpg	0	pqWJHh3elJsqssLG9DmMD16H2PrPaN9y1vwXM47ZPb8mVjghem5atuX1GiSfAVM47ZTUWbkDmJ4fCgmkcT9k98T1z02todJL64Iv	ZtNNpSFHOEZJWgbU5JMAuROONiTEtwPVrKBLtRUpMNzCT8xQ8rURolCtxAkWthi0pslJYDF44WOB6Ntm2SZJGWlAaQ6FsJTE4syR	8	\N	38
51	2015-08-29 19:09:05.86	\N	2015-08-29 19:09:06.194	\N	1	\N	0	t	49.jpg	0	9mYlQy5yXGXvaYlsarGTiKwSDX4GZmMUUDBQfB7qFLoDLA988k9U8kKRfXzEAzKRxGl1fu8RdsvzRWXGszk3pCRrJ9dK3bk4oztD	RfdgSZZNVeE6t32rF2U0GtcjugEAtBaBRijGDMQffeyOoWEbNyeOc5KHaWu74cmCSUk9UaPWi3fNgEu3CaHHkDwgtasKZdqVxOwI	8	\N	39
52	2015-08-29 19:09:06.709	\N	2015-08-29 19:09:08.256	\N	1	\N	0	t	51.jpg	0	C90QVrSgyNOl0X9keVkE8KBHVVGGtWM8xVopySHxA0ABmHmcR3G6JKG1PS06uRKauJ743i5CxMVz5qqpLBB8PENfdn4uvctHGJN3	dSFFDVEgVCz2r18Wl4LYrIbZeW5u0DC6VywRWgEsWowx5Cbhjl9xbdV5dHXhfj96pAksKEuxZoc3J4Oing3k55vSykqXCeKyqULa	9	\N	40
53	2015-08-29 19:09:09.942	\N	2015-08-29 19:09:10.789	\N	1	\N	0	t	52.jpg	0	oAT0F1w9wiug5uQiHUvnCvS35LL2FjeAZnStfsjGAkdKoMe4of3qBOTlaRbBo2Ch0AEY2mZZyoWjoBK3XMuuVW7DQgumAThotWXX	Vw7evavQ3VBvPOiSeAl0DwINlKBgpa26xX2v7WFVHLbW6svEXwZjMe1J2kOG4vzo2hAlGownqTfNAjQ8QWcqCuptphCVRWizJymo	9	\N	41
54	2015-08-29 19:09:11.96	\N	2015-08-29 19:09:13.26	\N	1	\N	0	t	53.jpg	0	nqb3qvhYmrXMfxoaxzDNXoZXU1zu3t4Rb2pOEKZqQNJtTSvmfu3Dk5skqVsSCycDyE8v4023LkJLDSkzD7zkaV57TKqtsLxTq2kW	GqgxVu81BH4vsVx7rK6hIkEyulSt2tyghERSv9hYqIdxNyIK0NM9L7s5McYaCkgW11bVaASWQdYgcqQDdFfHBpAt8e5UcMMc3NMW	9	\N	42
55	2015-08-29 19:09:14.105	\N	2015-08-29 19:09:17.148	\N	1	\N	0	t	54.jpg	0	oO7k4jfHrJ50GkxwIlb4aZm6hhOXc6l3hjtoOBCkiW4zOx3zh6Rxmzdex0LOdQryigq5N4xQ2KK0AkkfR5Aomqi5rxqsewP3EHqu	hZlCOqCAx7BIL7Cluk2To7WeV33RZMDDXzbgRskgmcLoddodDg9yJ9SikLnE9qG0ljf3eYBw52uyyPihA5DZLyfhdxbJirmNEU1A	9	\N	43
56	2015-08-29 19:09:20.912	\N	2015-08-29 19:09:21.965	\N	1	\N	0	t	55.jpg	0	M2lUCTPFFTkxWjfhJtpVIDlJniicAe9NJ6XOdkkyE7Kguv5LnosKa3vuKA2IL2edEeHNHO1cfskaj0wlVKLqfdydI7cegybLNNr9	dOK72HAMLikEaPQx76cS95dVg1NehpjQ8KkW6KiRSvqi9Dze4HEduj06c6H1lVpxE7z5LgzJMyhBY2XGkwqRmigBadxE2a8hotg6	9	\N	44
57	2015-08-29 19:09:22.894	\N	2015-08-29 19:09:23.46	\N	1	\N	0	t	59.jpg	0	0Rv326xYZWcMLfjE4FNjEBQGFbSJd7TyWbTnnw39oYgidarQAgNIwFyQY5hBrDCj4zJxqr2DSKzASaUq9fqa9z7CbE6yV2KiaBgA	0D6AHpdBAO3Y8lpotQMORrfEWmVcGABdlqhkLiZV2F5MuP0Z49RkAm9rWiHaAHQA9yivw1ueMyIuyzA2pACzUy3T9xPAKjZX4ckh	9	\N	46
58	2015-08-29 19:09:24.111	\N	2015-08-29 19:09:25.245	\N	1	\N	0	t	62.jpg	0	tRyJhnM7nZ8ZNzRcpAN0aDSvmMR9Si6s9lAMpcARXGcLVOg78WNcOGk9jje3BNXVQeYm3jcchQRXUsRgsofJvejxSQyVEdwoGjyn	Mn7PuBCGLDkx7KHks0m9ZanAoZdsAwx8DZ1IEgQLSPfqbKcpuKYjIk10F91lg0Vm96klkTFiNqVznulpWizPWHbDDZtASWmgIahO	10	\N	48
59	2015-08-29 19:09:26.479	\N	2015-08-29 19:09:27.241	\N	1	\N	0	t	63.jpeg	0	YParyFxgJ4XuvIwx8UQ9YhQZLYlL0OTWQKHlwXMoQmETvDSY6TthQQk8pkveXMlAmhddCG5K6kwZa05yxgzqr4mr3FzkKb6lgDsh	JDLYuWXicGoMzGXothLy9JfygKQ99i2HSDe4CKrkJ4TYECGEbFjJwANT3YPVc1UqzH9QDV3BesLCDO6eDZao7YEvdfALnIjBiKQ8	10	\N	49
60	2015-08-29 19:09:28.122	\N	2015-08-29 19:09:29.03	\N	1	\N	0	t	64.jpg	0	atyiNPDtCPK5FUubR3j2BhLlkk5cwW0xlLlvpeanYfF9yuvml3XtJg6xCDJs2fBzWQrgmEnabRz5hgRRjGCuWbFPHb0ESM2okvSd	BsddDvstTceX8ckSRNJXMOZqPzcZT81m0LvvnzBVQk4NauVW4mRI5rmvpG7XBPjqxLMZPBfTnNwkbgQYGBI2kxsPlMUJrkWWb0cX	10	\N	50
61	2015-08-29 19:09:30.904	\N	2015-08-29 19:09:32.003	\N	1	\N	0	t	65.jpg	0	FcoERDQFxaADmi294RqECmiwNlIxRqEsUAPUlnyfPInl6zZvgJkOYwmR9llgkTk7b36dltltzUrznAYzpVc35As1d3YgFEShjxfU	2TkZlpf5vFs56F3DmkROeRbdYXwefmhmSryJIhc9LlJtnIUaq2eclTix5bSrjSYXWIOUpK37SLjuUN0FEHfZXqi0THEatRhaz6ID	10	\N	51
62	2015-08-29 19:09:33.579	\N	2015-08-29 19:09:34.44	\N	1	\N	0	t	71.jpg	0	Ca6BWl5KuJ8mMOzyEYiL02B6zIpPqCQdavYFRvHeRD1yf4M48L878EsyWyPdIFpYVbtyQq8tJAjjjdzZHobAXN1ZCvubBG35luUo	Nzcs0HqlHfzqN7Sy7UWD1Ywvy4GlYtR7vhpMzG5B0at5rQuj9HYFYuQ55LjpiRUOo3NApAnhk5HyGZ5TRN6s2TcFFjlixasmicPG	11	\N	52
63	2015-08-29 19:09:35.516	\N	2015-08-29 19:09:36.755	\N	1	\N	0	t	72.jpg	0	DYSZUYAUncff57T2zRXFDKE3XRYKjPJnBWvMqP9rOVCQFnZxmWB4TzRNyHmDwp1v0qfbA08ULY884r99hfqbC05bXUHJQdC7rvqz	WiwRjn2ZOcvwtzIuY6mhabjmIaXL3pcEgjmfM33egf3HQnMs2EpwnBOJbpDXQRtzWIoWiW6b8UGmpxvGCOobxemjd0lvrFRONAdb	11	\N	53
64	2015-08-29 19:09:37.769	\N	2015-08-29 19:09:38.553	\N	1	\N	0	t	73.jpg	0	MSkAFJA5j4AP1lJ2GBM2isch3ZRc8ae1knKP4yJMiN2Kl3MMz0K4vE9VoJeq5uBNdwC5XIn3WO4gkHOUSGJVaFGK0zfj9tv8G7SP	q4t7yBgHG6wGbFP7CEi3NX6nmvbtzE7JVWusG9XQpe49QfBMouuBcnHpuAUgHU07sbdABQonuyNEqpIYsVJhuyfR21ntENAuXrxa	11	\N	54
65	2015-08-29 19:09:38.984	\N	2015-08-29 19:09:41.104	\N	1	\N	0	t	74.JPG	0	BEMPCLQEop5GU09RYN5vlbBt50qUQ1rSd3TKNe5UdxSfFmf3IEUsCue7svPtBl00mh8tnstvFcI4IZ1RkFt8IvKUkmUSDejnr2Qi	JtsArssYV1oT9UqkDPrWZVplrexMLKUO4nUojZFdDBVYIBIhEdd3R1GARHFNfWKCo2TOWT2AahLxb3O0B7WX1TjgFUrIbeKx26NV	11	\N	55
66	2015-08-29 19:09:42.126	\N	2015-08-29 19:09:42.554	\N	1	\N	0	t	75.jpg	0	gxnz8atoLadylKHmKX8H5WnNw5Lt71KUnipFksutomCC3qcDIhrLlnMB5kYcGc9iYl3ZpcVIbQFFzL8uErI07nrmF2vca0t7SEr4	3enNXtHI8k6td9ifHgINtCNobOW4gcW2ZpJqIoRmfaBcyUr3RGtxbg4Sshvk0vNmrhGW53yAqKNzCQhPdJeg9Xsknrx4VbF2MSiY	11	\N	56
67	2015-08-29 19:09:43.165	\N	2015-08-29 19:09:43.752	\N	1	\N	0	t	76.jpg	0	NZ4HOHI4HZZvUrwFJuJuNANVu9kZfUKuCa0Adpsd4bNgOsrQLEc7DWtGAB7bUJ9olOlmTyIsojDCpXQziMi1Mp9fYiAFuqEUeyd3	8rGgjny7vtaDVkrcmYcMCYF1FFWOJbAZHLUIr58TIKi2FnUEmRG4Zca6U9BdvIQ8rwKxiV8eWz4eFUNa0cHleSvxyiHUSdJcRuak	11	\N	57
68	2015-08-29 19:09:44.267	\N	2015-08-29 19:09:44.702	\N	1	\N	0	t	77.jpg	0	kXugdb9nlD9h2G3jbkEdhbdsf1GTBmta3YovlIo2ndi833A2iA9c2ZoG2VIH8O7nDHhp6JLoEbcxxPGjzuQQOgyeQieJvUs9g926	sL8LGZlvFRySEnVTIkS0d5g9Wz4j1N8dsfQ4SPN5GWvPz2dCoXVv52K4poywPSY2WDsIpHv7ilgYOVAPBcO0Uitg6Wuz3VJF3xpc	11	\N	58
69	2015-08-29 19:09:45.266	\N	2015-08-29 19:09:45.58	\N	1	\N	0	t	79.jpg	0	g13UBWbkahHOxEaoKwxDL1uLbQxrR6YzpH1Ogji2e2AKATQH8IuiLIdMR5tN3gsdf5Ks2N6FrdRIbt0T5Sn8MQHue2Bhv7YYEEzC	phGV0u6dGCCO7x1LncIYxUzVdjA1AQ0SjSCLpPe9y9E4ktKWlHIktfnEgvXcy6a2ELxQg4moR0fci4QR2WFkVOQCB8WCLgM2X73J	11	\N	59
70	2015-08-29 19:09:47.402	\N	2015-08-29 19:09:48.481	\N	1	\N	0	t	82.jpg	0	wrkXsnkOPNHAIVwmKUYpPob3ZOucVZnNbwdWK95ilPi4OZ4s2dfILAZeJ3Y5hoz1FLbJEmRwCQDR7mvyFMsKtavzg2ejGMNgNI3Z	5hlQUo1Wz6caR3txUtuovvyNwGqcQFxsqEN9Pnyqfr57iQ91JMaDEhbKZegv6RRQPQe4eW8JN2XP5NRCg6zpXbXso1T56u8EuDyv	12	\N	61
71	2015-08-29 19:09:49.273	\N	2015-08-29 19:09:49.931	\N	1	\N	0	t	83.jpg	0	t88RA6S39NRV3vrPf0Gmrj75hYFBVA9nNMVr0zXyUGcWMJB2ZknQcS44JEoxO6uEQXaWsDjaIY17g9JE0fzTDLGVMlVJWZF26NkD	hfOBnEnzC1oIqHuiTduI40247EWAi4UIcbPZSzh5CtpSQVOuGjfWUtk2kBKcQzwQ7nk4xSdCfIAchC2o9OPfFuFVPSjAYNU6WqTC	12	\N	62
72	2015-08-29 19:09:50.318	\N	2015-08-29 19:09:50.628	\N	1	\N	0	t	84.jpg	0	e0jLQYxMK5YPfSewUEP1uSV3GMqyi0y9WPEeuB5dcjP5N7yYtHcflR0Tr7uus3AmjI88ntKSDVyru98N5S2RXWeMTtQVfuj2iYo3	L2TZxFeZ0Mm8ofVeBg48cpXL55mWMVI43SqPph6YCJj6MOQh5URk6xRrVH5oeYKwuH5IyngBTqdLXcjpm3OGGmiEbUm6hqnlTSzS	12	\N	63
73	2015-08-29 19:09:51.145	\N	2015-08-29 19:09:51.563	\N	1	\N	0	t	85.jpg	0	JZWBWJOC3fGn0CytZZdgPnIQKNdc9fSLGlfNYUQZOa6GuSbRYErDCbMahluqKJXzIKsviahCC13FkAzrg8FzhBsaBadCkVsSReET	PNJY2hIP0eAaQk1PVRU66ylu9igqu1gqGD5oc5SHdUR8vkQ3y37i06pyu6ngJ1ceD16QZia8yjF9oMBRbYvQwxcH6Ln3PZmi935y	12	\N	64
74	2015-08-29 19:09:51.908	\N	2015-08-29 19:09:52.312	\N	1	\N	0	t	91.jpg	0	XSgnuagyz0w5lZ4GImuqYeaC4tYQZFE5zlwSm6Te7rqIgiaNnoRpzbC6AyQAnSyM4nN1iycd0QFGPYRh2peeSsoUKadkAP12dUWk	RL7721tzw3IiqIKV7K4cflgu0GVVM5CV1SRClrnxULhCGSidW3G2ajroJg4wCzafn0J5NbxOm6RZtRfigtOtCSd9KjSkpeNZwitE	13	\N	67
75	2015-08-29 19:09:52.889	\N	2015-08-29 19:09:53.487	\N	1	\N	0	t	92.jpg	0	H26y5g75iuGWSWReNnOVYOKJLB0naUBJ522wzS1Udu5meTQxgE87JjYb6Z56EbpSOS87X0Ocu83xA7HGC1pKmPO93eaDpg89j0WU	aSRRfmnLWHyYSIfi6wx8CnMQ1tE63BfiaMZC1zxODyFEEME3uIWUr9KEAxg9YHOJJfKOqcA8vkwnRU77TzQzE28fOTQbmjO2GrTw	13	\N	68
76	2015-08-29 19:09:54.206	\N	2015-08-29 19:09:54.702	\N	1	\N	0	t	93.jpg	0	g1Zwxw7hlIW6lIQjAhdxqSNNEUSuG5tdAkX1JP7oozbGyhAjxgMViVImUzhiuGj7C28UlEnm8TnaDkyNVnUtEUgtLv26cVSGGGze	dBFBOg26pWyRyQNS1STA5LQdOYlkTExMb4c7OYAL450NifTEYvhR5r0Acu0qzmrE1qRvn8zgls7MEvDgDojarFdxB9132YtqqXy6	13	\N	69
77	2015-08-29 19:09:59.501	\N	2015-08-29 19:10:00.026	\N	1	\N	0	t	95.jpg	0	MaY8hLKjuvGGe42vyTTCW6ffNIEs98bvr3D3EacBq4NuyV4JlmP8GqfGRTDq4LLV7b0JZhkOsKCAW1kpa2dwm6xi7hwQY2r6WtH0	htZ0YkA163BGJAeYVkCsWXzpv34JZPeSYQeN7H9u3jcU8Ngi38PJK3baWKelOx2j8SSwTLsxkK1pg91lsoChX4AXocgr55LGG4Tv	13	\N	71
78	2015-08-29 19:10:00.723	\N	2015-08-29 19:10:01.295	\N	1	\N	0	t	97.jpg	0	hdwRwlAnJ9QIRqXRm07cq3pEYGnk9KDvnnVTBz92AIa1wlC6e7pcqCkx6AVHYMX71ChOkKAMgmcPU43WvfmD9qJXvqz60B67xcl2	w79tsyQLuhyntGA1qxAUSwj1TBpcuwZHjVTfHbcy7jd9iu6OYppJTLrrFvOWVb3tidbjJyMxb70YwGcy5Aveot21ap5QoIJuHBLj	13	\N	73
79	2015-08-29 19:10:01.796	\N	2015-08-29 19:10:02.376	\N	1	\N	0	t	99.jpg	0	wcxNk9ie9urXQwwEwioUFqSuCMHblK4I5lXSl3Ep3JkBGukY3Exwnl1Y636LnBI2nCDz833dUEkUSwVJMbjG2acV9nYyENgAm1uZ	1w6PitFAT1EXDvhPnOE8vDKtKQnkQ9rGaMLD0psa6BEzRs0wvl9bdtJkmmFclLzt5YCn0Lu2CYk5tVkDlLj4ZjUH9R5fFEByfxMw	13	\N	75
80	2015-08-29 19:10:03.046	\N	2015-08-29 19:10:03.48	\N	1	\N	0	t	100.jpg	0	Q0OQP0FJ2sMZYfybNVnUYAoVz51oNMK3ibw6cAVSDSADgQPMciREqSbt3R9pYuHlTHcf2EnzN98wLQKeHO1f1a2gLW1K5d3pfmu8	04nhksPhQlkqIb8568k8IvPoblDlMmsIkNCSyaK1CFuxi3W9HySu1NCh6CQGDGJCkAEOMgBTIxo5lvBKPcT7Gu6tAYtKI2XaPMyZ	13	\N	76
\.


--
-- Name: storedfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('storedfile_id_seq', 80, true);


--
-- Data for Name: translation; Type: TABLE DATA; Schema: public; Owner: play
--

COPY translation (id, creationdate, creationuser, lastupdate, lastupdateuser, version) FROM stdin;
1	2015-08-29 09:23:22.716	\N	2015-08-29 09:23:22.716	\N	0
2	2015-08-29 09:23:22.799	\N	2015-08-29 09:23:22.799	\N	0
3	2015-08-29 09:23:22.812	\N	2015-08-29 09:23:22.812	\N	0
4	2015-08-29 09:23:22.823	\N	2015-08-29 09:23:22.823	\N	0
5	2015-08-29 09:23:22.831	\N	2015-08-29 09:23:22.831	\N	0
6	2015-08-29 09:23:22.891	\N	2015-08-29 09:23:22.891	\N	0
7	2015-08-29 09:23:22.909	\N	2015-08-29 09:23:22.909	\N	0
8	2015-08-29 09:23:22.919	\N	2015-08-29 09:23:22.919	\N	0
9	2015-08-29 09:23:22.944	\N	2015-08-29 09:23:22.944	\N	0
10	2015-08-29 09:23:22.96	\N	2015-08-29 09:23:22.96	\N	0
11	2015-08-29 09:23:22.978	\N	2015-08-29 09:23:22.978	\N	0
12	2015-08-29 09:23:22.994	\N	2015-08-29 09:23:22.995	\N	0
13	2015-08-29 09:23:23.002	\N	2015-08-29 09:23:23.002	\N	0
14	2015-08-29 09:23:23.018	\N	2015-08-29 09:23:23.018	\N	0
15	2015-08-29 09:23:23.031	\N	2015-08-29 09:23:23.031	\N	0
16	2015-08-29 09:23:23.039	\N	2015-08-29 09:23:23.039	\N	0
17	2015-08-29 09:23:23.044	\N	2015-08-29 09:23:23.044	\N	0
18	2015-08-29 09:23:23.064	\N	2015-08-29 09:23:23.064	\N	0
19	2015-08-29 09:23:23.074	\N	2015-08-29 09:23:23.074	\N	0
20	2015-08-29 09:23:23.085	\N	2015-08-29 09:23:23.085	\N	0
21	2015-08-29 09:23:24.022	\N	2015-08-29 09:23:24.026	\N	0
22	2015-08-29 09:23:24.034	\N	2015-08-29 09:23:24.034	\N	0
23	2015-08-29 09:23:24.044	\N	2015-08-29 09:23:24.044	\N	0
24	2015-08-29 09:23:24.053	\N	2015-08-29 09:23:24.053	\N	0
25	2015-08-29 09:23:24.063	\N	2015-08-29 09:23:24.063	\N	0
26	2015-08-29 09:23:24.073	\N	2015-08-29 09:23:24.073	\N	0
27	2015-08-29 09:23:24.082	\N	2015-08-29 09:23:24.082	\N	0
28	2015-08-29 09:23:24.091	\N	2015-08-29 09:23:24.091	\N	0
29	2015-08-29 09:23:24.102	\N	2015-08-29 09:23:24.102	\N	0
30	2015-08-29 09:23:24.11	\N	2015-08-29 09:23:24.11	\N	0
31	2015-08-29 09:23:24.118	\N	2015-08-29 09:23:24.118	\N	0
32	2015-08-29 09:23:24.127	\N	2015-08-29 09:23:24.127	\N	0
33	2015-08-29 09:23:24.143	\N	2015-08-29 09:23:24.143	\N	0
34	2015-08-29 09:23:24.158	\N	2015-08-29 09:23:24.158	\N	0
35	2015-08-29 09:23:24.17	\N	2015-08-29 09:23:24.17	\N	0
36	2015-08-29 09:23:24.182	\N	2015-08-29 09:23:24.182	\N	0
37	2015-08-29 09:23:24.192	\N	2015-08-29 09:23:24.192	\N	0
38	2015-08-29 09:23:24.202	\N	2015-08-29 09:23:24.202	\N	0
39	2015-08-29 09:23:24.214	\N	2015-08-29 09:23:24.214	\N	0
40	2015-08-29 09:23:24.228	\N	2015-08-29 09:23:24.228	\N	0
41	2015-08-29 09:23:24.245	\N	2015-08-29 09:23:24.245	\N	0
42	2015-08-29 09:23:24.255	\N	2015-08-29 09:23:24.255	\N	0
43	2015-08-29 09:23:24.268	\N	2015-08-29 09:23:24.268	\N	0
44	2015-08-29 09:23:24.303	\N	2015-08-29 09:23:24.303	\N	0
45	2015-08-29 09:23:24.31	\N	2015-08-29 09:23:24.31	\N	0
46	2015-08-29 09:23:24.326	\N	2015-08-29 09:23:24.326	\N	0
47	2015-08-29 09:23:24.338	\N	2015-08-29 09:23:24.338	\N	0
48	2015-08-29 09:23:24.357	\N	2015-08-29 09:23:24.357	\N	0
49	2015-08-29 09:23:24.361	\N	2015-08-29 09:23:24.361	\N	0
50	2015-08-29 09:23:24.366	\N	2015-08-29 09:23:24.366	\N	0
51	2015-08-29 09:23:24.378	\N	2015-08-29 09:23:24.378	\N	0
52	2015-08-29 09:23:24.387	\N	2015-08-29 09:23:24.387	\N	0
53	2015-08-29 09:23:24.398	\N	2015-08-29 09:23:24.399	\N	0
54	2015-08-29 09:23:24.411	\N	2015-08-29 09:23:24.411	\N	0
55	2015-08-29 09:23:24.43	\N	2015-08-29 09:23:24.43	\N	0
56	2015-08-29 09:23:24.455	\N	2015-08-29 09:23:24.455	\N	0
57	2015-08-29 09:23:24.464	\N	2015-08-29 09:23:24.464	\N	0
58	2015-08-29 09:23:24.476	\N	2015-08-29 09:23:24.476	\N	0
59	2015-08-29 09:23:24.487	\N	2015-08-29 09:23:24.487	\N	0
60	2015-08-29 09:23:24.496	\N	2015-08-29 09:23:24.496	\N	0
61	2015-08-29 09:23:24.503	\N	2015-08-29 09:23:24.503	\N	0
62	2015-08-29 09:23:24.518	\N	2015-08-29 09:23:24.518	\N	0
63	2015-08-29 09:23:24.522	\N	2015-08-29 09:23:24.522	\N	0
64	2015-08-29 09:23:24.527	\N	2015-08-29 09:23:24.527	\N	0
65	2015-08-29 09:23:24.532	\N	2015-08-29 09:23:24.532	\N	0
66	2015-08-29 09:23:24.537	\N	2015-08-29 09:23:24.537	\N	0
67	2015-08-29 09:23:24.541	\N	2015-08-29 09:23:24.541	\N	0
68	2015-08-29 09:23:24.558	\N	2015-08-29 09:23:24.558	\N	0
69	2015-08-29 09:23:24.578	\N	2015-08-29 09:23:24.578	\N	0
70	2015-08-29 09:23:24.589	\N	2015-08-29 09:23:24.589	\N	0
71	2015-08-29 09:23:24.596	\N	2015-08-29 09:23:24.596	\N	0
72	2015-08-29 09:23:24.603	\N	2015-08-29 09:23:24.603	\N	0
73	2015-08-29 09:23:24.612	\N	2015-08-29 09:23:24.612	\N	0
74	2015-08-29 09:23:24.623	\N	2015-08-29 09:23:24.623	\N	0
75	2015-08-29 09:23:24.633	\N	2015-08-29 09:23:24.633	\N	0
76	2015-08-29 09:23:24.64	\N	2015-08-29 09:23:24.64	\N	0
77	2015-08-29 09:23:24.647	\N	2015-08-29 09:23:24.647	\N	0
78	2015-08-29 09:23:24.651	\N	2015-08-29 09:23:24.651	\N	0
79	2015-08-29 09:23:24.658	\N	2015-08-29 09:23:24.658	\N	0
80	2015-08-29 09:23:24.662	\N	2015-08-29 09:23:24.662	\N	0
81	2015-08-29 09:23:24.666	\N	2015-08-29 09:23:24.666	\N	0
82	2015-08-29 09:23:24.671	\N	2015-08-29 09:23:24.671	\N	0
83	2015-08-29 09:23:24.678	\N	2015-08-29 09:23:24.678	\N	0
84	2015-08-29 09:23:24.683	\N	2015-08-29 09:23:24.683	\N	0
85	2015-08-29 09:23:24.686	\N	2015-08-29 09:23:24.686	\N	0
86	2015-08-29 09:23:24.703	\N	2015-08-29 09:23:24.703	\N	0
87	2015-08-29 09:23:24.714	\N	2015-08-29 09:23:24.714	\N	0
88	2015-08-29 09:23:24.727	\N	2015-08-29 09:23:24.727	\N	0
89	2015-08-29 09:23:24.735	\N	2015-08-29 09:23:24.735	\N	0
90	2015-08-29 09:23:24.742	\N	2015-08-29 09:23:24.742	\N	0
91	2015-08-29 09:23:24.753	\N	2015-08-29 09:23:24.753	\N	0
92	2015-08-29 09:23:24.758	\N	2015-08-29 09:23:24.758	\N	0
93	2015-08-29 09:23:24.765	\N	2015-08-29 09:23:24.765	\N	0
94	2015-08-29 09:23:24.773	\N	2015-08-29 09:23:24.773	\N	0
95	2015-08-29 09:23:24.78	\N	2015-08-29 09:23:24.78	\N	0
96	2015-08-29 09:23:24.792	\N	2015-08-29 09:23:24.792	\N	0
97	2015-08-29 09:23:24.796	\N	2015-08-29 09:23:24.796	\N	0
98	2015-08-29 09:23:24.802	\N	2015-08-29 09:23:24.802	\N	0
99	2015-08-29 09:23:24.81	\N	2015-08-29 09:23:24.811	\N	0
100	2015-08-29 09:23:24.818	\N	2015-08-29 09:23:24.818	\N	0
101	2015-08-29 09:23:24.826	\N	2015-08-29 09:23:24.826	\N	0
102	2015-08-29 09:23:24.833	\N	2015-08-29 09:23:24.833	\N	0
103	2015-08-29 09:23:24.839	\N	2015-08-29 09:23:24.839	\N	0
104	2015-08-29 09:23:24.853	\N	2015-08-29 09:23:24.853	\N	0
105	2015-08-29 09:23:24.857	\N	2015-08-29 09:23:24.857	\N	0
106	2015-08-29 09:23:24.86	\N	2015-08-29 09:23:24.86	\N	0
107	2015-08-29 09:23:24.867	\N	2015-08-29 09:23:24.867	\N	0
108	2015-08-29 09:23:24.877	\N	2015-08-29 09:23:24.877	\N	0
109	2015-08-29 09:23:24.885	\N	2015-08-29 09:23:24.885	\N	0
110	2015-08-29 09:23:24.892	\N	2015-08-29 09:23:24.892	\N	0
111	2015-08-29 09:23:24.902	\N	2015-08-29 09:23:24.902	\N	0
112	2015-08-29 09:23:24.906	\N	2015-08-29 09:23:24.906	\N	0
113	2015-08-29 09:23:24.912	\N	2015-08-29 09:23:24.912	\N	0
114	2015-08-29 09:23:24.918	\N	2015-08-29 09:23:24.918	\N	0
115	2015-08-29 09:23:24.927	\N	2015-08-29 09:23:24.927	\N	0
116	2015-08-29 09:23:24.932	\N	2015-08-29 09:23:24.932	\N	0
117	2015-08-29 09:23:24.937	\N	2015-08-29 09:23:24.937	\N	0
118	2015-08-29 09:23:24.944	\N	2015-08-29 09:23:24.944	\N	0
119	2015-08-29 09:23:24.954	\N	2015-08-29 09:23:24.954	\N	0
120	2015-08-29 09:23:24.96	\N	2015-08-29 09:23:24.96	\N	0
121	2015-08-29 09:23:24.965	\N	2015-08-29 09:23:24.965	\N	0
122	2015-08-29 09:23:24.975	\N	2015-08-29 09:23:24.975	\N	0
123	2015-08-29 09:23:24.984	\N	2015-08-29 09:23:24.984	\N	0
124	2015-08-29 09:23:24.996	\N	2015-08-29 09:23:24.996	\N	0
125	2015-08-29 09:23:24.999	\N	2015-08-29 09:23:24.999	\N	0
126	2015-08-29 09:23:25.002	\N	2015-08-29 09:23:25.002	\N	0
127	2015-08-29 09:23:25.006	\N	2015-08-29 09:23:25.006	\N	0
128	2015-08-29 09:23:25.01	\N	2015-08-29 09:23:25.01	\N	0
129	2015-08-29 09:23:25.016	\N	2015-08-29 09:23:25.016	\N	0
130	2015-08-29 09:23:25.029	\N	2015-08-29 09:23:25.029	\N	0
131	2015-08-29 09:23:25.036	\N	2015-08-29 09:23:25.036	\N	0
132	2015-08-29 09:23:25.045	\N	2015-08-29 09:23:25.045	\N	0
133	2015-08-29 09:23:25.048	\N	2015-08-29 09:23:25.048	\N	0
134	2015-08-29 09:23:25.056	\N	2015-08-29 09:23:25.056	\N	0
135	2015-08-29 09:23:25.061	\N	2015-08-29 09:23:25.061	\N	0
136	2015-08-29 09:23:25.069	\N	2015-08-29 09:23:25.069	\N	0
137	2015-08-29 09:23:25.077	\N	2015-08-29 09:23:25.077	\N	0
138	2015-08-29 09:23:25.081	\N	2015-08-29 09:23:25.081	\N	0
139	2015-08-29 09:23:25.088	\N	2015-08-29 09:23:25.088	\N	0
140	2015-08-29 09:23:25.092	\N	2015-08-29 09:23:25.092	\N	0
141	2015-08-29 09:23:25.099	\N	2015-08-29 09:23:25.099	\N	0
142	2015-08-29 09:23:25.107	\N	2015-08-29 09:23:25.107	\N	0
143	2015-08-29 09:23:25.112	\N	2015-08-29 09:23:25.112	\N	0
144	2015-08-29 09:23:25.12	\N	2015-08-29 09:23:25.12	\N	0
145	2015-08-29 09:23:25.128	\N	2015-08-29 09:23:25.128	\N	0
146	2015-08-29 09:23:25.132	\N	2015-08-29 09:23:25.132	\N	0
147	2015-08-29 09:23:25.139	\N	2015-08-29 09:23:25.139	\N	0
148	2015-08-29 09:23:25.148	\N	2015-08-29 09:23:25.148	\N	0
149	2015-08-29 09:23:25.154	\N	2015-08-29 09:23:25.154	\N	0
150	2015-08-29 09:23:25.159	\N	2015-08-29 09:23:25.159	\N	0
151	2015-08-29 09:23:25.169	\N	2015-08-29 09:23:25.169	\N	0
152	2015-08-29 09:23:25.173	\N	2015-08-29 09:23:25.173	\N	0
153	2015-08-29 09:23:25.181	\N	2015-08-29 09:23:25.181	\N	0
154	2015-08-29 09:23:25.184	\N	2015-08-29 09:23:25.184	\N	0
155	2015-08-29 09:23:25.191	\N	2015-08-29 09:23:25.191	\N	0
156	2015-08-29 09:23:25.198	\N	2015-08-29 09:23:25.198	\N	0
157	2015-08-29 09:23:25.202	\N	2015-08-29 09:23:25.202	\N	0
158	2015-08-29 09:23:25.209	\N	2015-08-29 09:23:25.209	\N	0
159	2015-08-29 09:23:25.213	\N	2015-08-29 09:23:25.213	\N	0
160	2015-08-29 09:23:25.216	\N	2015-08-29 09:23:25.216	\N	0
161	2015-08-29 09:23:25.221	\N	2015-08-29 09:23:25.221	\N	0
162	2015-08-29 09:23:25.227	\N	2015-08-29 09:23:25.227	\N	0
163	2015-08-29 09:23:25.232	\N	2015-08-29 09:23:25.232	\N	0
164	2015-08-29 09:23:25.24	\N	2015-08-29 09:23:25.24	\N	0
165	2015-08-29 09:23:25.244	\N	2015-08-29 09:23:25.244	\N	0
166	2015-08-29 09:23:25.252	\N	2015-08-29 09:23:25.252	\N	0
167	2015-08-29 09:23:25.256	\N	2015-08-29 09:23:25.256	\N	0
168	2015-08-29 09:23:25.262	\N	2015-08-29 09:23:25.262	\N	0
169	2015-08-29 09:23:25.268	\N	2015-08-29 09:23:25.268	\N	0
170	2015-08-29 09:23:25.272	\N	2015-08-29 09:23:25.272	\N	0
171	2015-08-29 09:23:25.281	\N	2015-08-29 09:23:25.281	\N	0
172	2015-08-29 09:23:25.294	\N	2015-08-29 09:23:25.294	\N	0
173	2015-08-29 09:23:25.31	\N	2015-08-29 09:23:25.31	\N	0
174	2015-08-29 09:23:25.318	\N	2015-08-29 09:23:25.318	\N	0
175	2015-08-29 09:23:25.322	\N	2015-08-29 09:23:25.322	\N	0
176	2015-08-29 09:23:25.333	\N	2015-08-29 09:23:25.333	\N	0
177	2015-08-29 09:23:25.342	\N	2015-08-29 09:23:25.342	\N	0
178	2015-08-29 09:23:25.35	\N	2015-08-29 09:23:25.35	\N	0
179	2015-08-29 09:23:25.363	\N	2015-08-29 09:23:25.363	\N	0
180	2015-08-29 09:23:25.37	\N	2015-08-29 09:23:25.37	\N	0
181	2015-08-29 09:23:25.375	\N	2015-08-29 09:23:25.375	\N	0
182	2015-08-29 09:23:25.384	\N	2015-08-29 09:23:25.384	\N	0
183	2015-08-29 09:23:25.388	\N	2015-08-29 09:23:25.388	\N	0
184	2015-08-29 09:23:25.393	\N	2015-08-29 09:23:25.393	\N	0
185	2015-08-29 09:23:25.405	\N	2015-08-29 09:23:25.405	\N	0
186	2015-08-29 09:23:25.409	\N	2015-08-29 09:23:25.409	\N	0
187	2015-08-29 09:23:25.412	\N	2015-08-29 09:23:25.412	\N	0
188	2015-08-29 09:23:25.419	\N	2015-08-29 09:23:25.419	\N	0
189	2015-08-29 09:23:25.425	\N	2015-08-29 09:23:25.425	\N	0
190	2015-08-29 09:23:25.432	\N	2015-08-29 09:23:25.432	\N	0
191	2015-08-29 09:23:25.435	\N	2015-08-29 09:23:25.435	\N	0
192	2015-08-29 09:23:25.445	\N	2015-08-29 09:23:25.445	\N	0
193	2015-08-29 09:23:25.449	\N	2015-08-29 09:23:25.449	\N	0
194	2015-08-29 09:23:25.454	\N	2015-08-29 09:23:25.454	\N	0
195	2015-08-29 09:23:25.466	\N	2015-08-29 09:23:25.466	\N	0
196	2015-08-29 09:23:25.469	\N	2015-08-29 09:23:25.469	\N	0
197	2015-08-29 09:23:25.473	\N	2015-08-29 09:23:25.473	\N	0
198	2015-08-29 09:23:25.483	\N	2015-08-29 09:23:25.483	\N	0
199	2015-08-29 09:23:25.487	\N	2015-08-29 09:23:25.487	\N	0
\.


--
-- Name: translation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: play
--

SELECT pg_catalog.setval('translation_id_seq', 199, true);


--
-- Data for Name: translationvalue; Type: TABLE DATA; Schema: public; Owner: play
--

COPY translationvalue (id, creationdate, creationuser, lastupdate, lastupdateuser, version, content, lang, searchablecontent, translation_id) FROM stdin;
1	2015-08-29 09:23:22.772	\N	2015-08-29 09:23:22.772	\N	0	Manger	fr	manger	1
2	2015-08-29 09:23:22.808	\N	2015-08-29 09:23:22.808	\N	0	Prendre un verre	fr	prendre un verre	2
3	2015-08-29 09:23:22.813	\N	2015-08-29 09:23:22.813	\N	0	Sortir	fr	sortir	3
4	2015-08-29 09:23:22.825	\N	2015-08-29 09:23:22.825	\N	0	Me cultiver	fr	me cultiver	4
5	2015-08-29 09:23:22.833	\N	2015-08-29 09:23:22.833	\N	0	Faire des courses	fr	faire des courses	5
6	2015-08-29 09:23:22.898	\N	2015-08-29 09:23:22.898	\N	0	Faire du shopping "plaisir"	fr	faire du shopping "plaisir"	6
7	2015-08-29 09:23:22.911	\N	2015-08-29 09:23:22.911	\N	0	M'habiller	fr	m'habiller	7
8	2015-08-29 09:23:22.934	\N	2015-08-29 09:23:22.934	\N	0	Décorer ma maison	fr	decorer ma maison	8
9	2015-08-29 09:23:22.946	\N	2015-08-29 09:23:22.946	\N	0	Prendre soin de moi	fr	prendre soin de moi	9
10	2015-08-29 09:23:22.962	\N	2015-08-29 09:23:22.962	\N	0	Faire du sport	fr	faire du sport	10
11	2015-08-29 09:23:22.984	\N	2015-08-29 09:23:22.984	\N	0	Prendre soin de mes animaux	fr	prendre soin de mes animaux	11
12	2015-08-29 09:23:22.996	\N	2015-08-29 09:23:22.996	\N	0	Voyager	fr	voyager	12
13	2015-08-29 09:23:23.01	\N	2015-08-29 09:23:23.01	\N	0	Se loger	fr	se loger	13
14	2015-08-29 09:23:23.021	\N	2015-08-29 09:23:23.021	\N	0	S'occuper d'enfants	fr	s'occuper d'enfants	14
15	2015-08-29 09:23:23.035	\N	2015-08-29 09:23:23.035	\N	0	Bricoler	fr	bricoler	15
16	2015-08-29 09:23:23.04	\N	2015-08-29 09:23:23.04	\N	0	Lire	fr	lire	16
17	2015-08-29 09:23:23.046	\N	2015-08-29 09:23:23.046	\N	0	Jardiner	fr	jardiner	17
18	2015-08-29 09:23:23.066	\N	2015-08-29 09:23:23.066	\N	0	Ecouter de la musique	fr	ecouter de la musique	18
19	2015-08-29 09:23:23.078	\N	2015-08-29 09:23:23.078	\N	0	Etre high-tech	fr	etre high-tech	19
20	2015-08-29 09:23:23.086	\N	2015-08-29 09:23:23.086	\N	0	Jouer	fr	jouer	20
21	2015-08-29 09:23:24.028	\N	2015-08-29 09:23:24.028	\N	0	Horeca	fr	horeca	21
22	2015-08-29 09:23:24.038	\N	2015-08-29 09:23:24.038	\N	0	Hôtel	fr	hotel	22
23	2015-08-29 09:23:24.049	\N	2015-08-29 09:23:24.049	\N	0	Auberge de jeunesse	fr	auberge de jeunesse	23
24	2015-08-29 09:23:24.058	\N	2015-08-29 09:23:24.058	\N	0	Camping	fr	camping	24
25	2015-08-29 09:23:24.069	\N	2015-08-29 09:23:24.07	\N	0	B&B	fr	b&b	25
26	2015-08-29 09:23:24.078	\N	2015-08-29 09:23:24.079	\N	0	Hôtel	fr	hotel	26
27	2015-08-29 09:23:24.086	\N	2015-08-29 09:23:24.086	\N	0	Restaurant	fr	restaurant	27
28	2015-08-29 09:23:24.094	\N	2015-08-29 09:23:24.094	\N	0	Fast Food	fr	fast food	28
29	2015-08-29 09:23:24.103	\N	2015-08-29 09:23:24.103	\N	0	Asiatique	fr	asiatique	29
30	2015-08-29 09:23:24.112	\N	2015-08-29 09:23:24.112	\N	0	Européen	fr	europeen	30
31	2015-08-29 09:23:24.12	\N	2015-08-29 09:23:24.121	\N	0	Africain	fr	africain	31
32	2015-08-29 09:23:24.129	\N	2015-08-29 09:23:24.13	\N	0	Américain	fr	americain	32
33	2015-08-29 09:23:24.151	\N	2015-08-29 09:23:24.151	\N	0	Belge	fr	belge	33
34	2015-08-29 09:23:24.161	\N	2015-08-29 09:23:24.161	\N	0	Brunch & Sweet	fr	brunch & sweet	34
35	2015-08-29 09:23:24.178	\N	2015-08-29 09:23:24.178	\N	0	Gastronomique/Bistronomie	fr	gastronomique/bistronomie	35
36	2015-08-29 09:23:24.186	\N	2015-08-29 09:23:24.186	\N	0	Café	fr	cafe	36
37	2015-08-29 09:23:24.194	\N	2015-08-29 09:23:24.194	\N	0	Bières	fr	bieres	37
38	2015-08-29 09:23:24.206	\N	2015-08-29 09:23:24.206	\N	0	Vins	fr	vins	38
39	2015-08-29 09:23:24.222	\N	2015-08-29 09:23:24.222	\N	0	Champagne	fr	champagne	39
40	2015-08-29 09:23:24.232	\N	2015-08-29 09:23:24.232	\N	0	Cocktails	fr	cocktails	40
41	2015-08-29 09:23:24.251	\N	2015-08-29 09:23:24.251	\N	0	Jus & Smoothies	fr	jus & smoothies	41
42	2015-08-29 09:23:24.261	\N	2015-08-29 09:23:24.261	\N	0	Traiteur	fr	traiteur	42
43	2015-08-29 09:23:24.286	\N	2015-08-29 09:23:24.287	\N	0	Asiatique	fr	asiatique	43
44	2015-08-29 09:23:24.305	\N	2015-08-29 09:23:24.305	\N	0	Européen	fr	europeen	44
45	2015-08-29 09:23:24.315	\N	2015-08-29 09:23:24.315	\N	0	Africain	fr	africain	45
46	2015-08-29 09:23:24.328	\N	2015-08-29 09:23:24.328	\N	0	Américain	fr	americain	46
47	2015-08-29 09:23:24.342	\N	2015-08-29 09:23:24.342	\N	0	Belge	fr	belge	47
48	2015-08-29 09:23:24.358	\N	2015-08-29 09:23:24.358	\N	0	Gastronomique	fr	gastronomique	48
49	2015-08-29 09:23:24.363	\N	2015-08-29 09:23:24.363	\N	0	Magasins	fr	magasins	49
50	2015-08-29 09:23:24.367	\N	2015-08-29 09:23:24.367	\N	0	Alimentation	fr	alimentation	50
51	2015-08-29 09:23:24.38	\N	2015-08-29 09:23:24.38	\N	0	Supermarché	fr	supermarche	51
52	2015-08-29 09:23:24.394	\N	2015-08-29 09:23:24.394	\N	0	Boucherie & Charcuterie	fr	boucherie & charcuterie	52
53	2015-08-29 09:23:24.401	\N	2015-08-29 09:23:24.401	\N	0	Poissonerie	fr	poissonerie	53
54	2015-08-29 09:23:24.419	\N	2015-08-29 09:23:24.419	\N	0	Boulangerie & Patisserie	fr	boulangerie & patisserie	54
55	2015-08-29 09:23:24.435	\N	2015-08-29 09:23:24.435	\N	0	Fromagerie	fr	fromagerie	55
56	2015-08-29 09:23:24.458	\N	2015-08-29 09:23:24.458	\N	0	Bières & Vins	fr	bieres & vins	56
57	2015-08-29 09:23:24.468	\N	2015-08-29 09:23:24.468	\N	0	Herbes & Epices	fr	herbes & epices	57
58	2015-08-29 09:23:24.484	\N	2015-08-29 09:23:24.484	\N	0	Confiseries & Chocolat	fr	confiseries & chocolat	58
59	2015-08-29 09:23:24.489	\N	2015-08-29 09:23:24.489	\N	0	Loisirs	fr	loisirs	59
60	2015-08-29 09:23:24.497	\N	2015-08-29 09:23:24.497	\N	0	Sport & Aventure	fr	sport & aventure	60
61	2015-08-29 09:23:24.514	\N	2015-08-29 09:23:24.514	\N	0	Maison & Décoration	fr	maison & decoration	61
62	2015-08-29 09:23:24.519	\N	2015-08-29 09:23:24.52	\N	0	Jardin & Fleurs	fr	jardin & fleurs	62
63	2015-08-29 09:23:24.524	\N	2015-08-29 09:23:24.524	\N	0	Jeux & Jouets	fr	jeux & jouets	63
64	2015-08-29 09:23:24.528	\N	2015-08-29 09:23:24.528	\N	0	Multimédia & Informatique	fr	multimedia & informatique	64
65	2015-08-29 09:23:24.534	\N	2015-08-29 09:23:24.534	\N	0	Animaux	fr	animaux	65
66	2015-08-29 09:23:24.538	\N	2015-08-29 09:23:24.538	\N	0	Voyages	fr	voyages	66
67	2015-08-29 09:23:24.543	\N	2015-08-29 09:23:24.543	\N	0	Livres & Journaux	fr	livres & journaux	67
68	2015-08-29 09:23:24.559	\N	2015-08-29 09:23:24.56	\N	0	Mode	fr	mode	68
69	2015-08-29 09:23:24.586	\N	2015-08-29 09:23:24.586	\N	0	Vêtements Enfants	fr	vetements enfants	69
70	2015-08-29 09:23:24.59	\N	2015-08-29 09:23:24.59	\N	0	Vêtements Hommes	fr	vetements hommes	70
71	2015-08-29 09:23:24.598	\N	2015-08-29 09:23:24.598	\N	0	Vêtements Femmes	fr	vetements femmes	71
72	2015-08-29 09:23:24.607	\N	2015-08-29 09:23:24.607	\N	0	Chaussures	fr	chaussures	72
73	2015-08-29 09:23:24.614	\N	2015-08-29 09:23:24.614	\N	0	Bijoux & Montres	fr	bijoux & montres	73
74	2015-08-29 09:23:24.624	\N	2015-08-29 09:23:24.624	\N	0	Parfums & Cosmétique	fr	parfums & cosmetique	74
75	2015-08-29 09:23:24.635	\N	2015-08-29 09:23:24.635	\N	0	Lingerie	fr	lingerie	75
76	2015-08-29 09:23:24.642	\N	2015-08-29 09:23:24.642	\N	0	Lunettes	fr	lunettes	76
77	2015-08-29 09:23:24.648	\N	2015-08-29 09:23:24.648	\N	0	Utiles	fr	utiles	77
78	2015-08-29 09:23:24.652	\N	2015-08-29 09:23:24.652	\N	0	Electroménager	fr	electromenager	78
79	2015-08-29 09:23:24.659	\N	2015-08-29 09:23:24.659	\N	0	Bricolage	fr	bricolage	79
80	2015-08-29 09:23:24.663	\N	2015-08-29 09:23:24.663	\N	0	Papeterie	fr	papeterie	80
81	2015-08-29 09:23:24.667	\N	2015-08-29 09:23:24.667	\N	0	Voiture	fr	voiture	81
82	2015-08-29 09:23:24.672	\N	2015-08-29 09:23:24.672	\N	0	Droguerie	fr	droguerie	82
83	2015-08-29 09:23:24.68	\N	2015-08-29 09:23:24.68	\N	0	Vélo	fr	velo	83
84	2015-08-29 09:23:24.684	\N	2015-08-29 09:23:24.684	\N	0	Beauté & Bien Être	fr	beaute & bien etre	84
85	2015-08-29 09:23:24.687	\N	2015-08-29 09:23:24.687	\N	0	Soins	fr	soins	85
86	2015-08-29 09:23:24.705	\N	2015-08-29 09:23:24.705	\N	0	Coiffure	fr	coiffure	86
87	2015-08-29 09:23:24.717	\N	2015-08-29 09:23:24.717	\N	0	Esthétique	fr	esthetique	87
88	2015-08-29 09:23:24.731	\N	2015-08-29 09:23:24.731	\N	0	Manicure & Pédicure	fr	manicure & pedicure	88
89	2015-08-29 09:23:24.739	\N	2015-08-29 09:23:24.739	\N	0	Massage	fr	massage	89
90	2015-08-29 09:23:24.745	\N	2015-08-29 09:23:24.745	\N	0	Tatouage & Piercing	fr	tatouage & piercing	90
91	2015-08-29 09:23:24.754	\N	2015-08-29 09:23:24.754	\N	0	Toilettage	fr	toilettage	91
92	2015-08-29 09:23:24.759	\N	2015-08-29 09:23:24.759	\N	0	Etablissement	fr	etablissement	92
93	2015-08-29 09:23:24.767	\N	2015-08-29 09:23:24.767	\N	0	Sauna & Hammam	fr	sauna & hammam	93
94	2015-08-29 09:23:24.774	\N	2015-08-29 09:23:24.774	\N	0	Solarium	fr	solarium	94
95	2015-08-29 09:23:24.781	\N	2015-08-29 09:23:24.781	\N	0	Santé	fr	sante	95
96	2015-08-29 09:23:24.793	\N	2015-08-29 09:23:24.793	\N	0	Médecine Conventionnelle	fr	medecine conventionnelle	96
97	2015-08-29 09:23:24.797	\N	2015-08-29 09:23:24.797	\N	0	Médecine Générale	fr	medecine generale	97
98	2015-08-29 09:23:24.804	\N	2015-08-29 09:23:24.804	\N	0	Ophtalmologie	fr	ophtalmologie	98
99	2015-08-29 09:23:24.812	\N	2015-08-29 09:23:24.812	\N	0	ORL	fr	orl	99
100	2015-08-29 09:23:24.823	\N	2015-08-29 09:23:24.823	\N	0	Gynécologie	fr	gynecologie	100
101	2015-08-29 09:23:24.827	\N	2015-08-29 09:23:24.827	\N	0	Dentisterie	fr	dentisterie	101
102	2015-08-29 09:23:24.834	\N	2015-08-29 09:23:24.834	\N	0	Kinésithérapie	fr	kinesitherapie	102
103	2015-08-29 09:23:24.842	\N	2015-08-29 09:23:24.842	\N	0	Dermatologie	fr	dermatologie	103
104	2015-08-29 09:23:24.854	\N	2015-08-29 09:23:24.854	\N	0	Psychologie	fr	psychologie	104
105	2015-08-29 09:23:24.858	\N	2015-08-29 09:23:24.858	\N	0	Médecine Non-Conventionnelle	fr	medecine non-conventionnelle	105
106	2015-08-29 09:23:24.862	\N	2015-08-29 09:23:24.862	\N	0	Acupuncture	fr	acupuncture	106
107	2015-08-29 09:23:24.873	\N	2015-08-29 09:23:24.873	\N	0	Ostéopatie	fr	osteopatie	107
108	2015-08-29 09:23:24.878	\N	2015-08-29 09:23:24.878	\N	0	Homéopathie	fr	homeopathie	108
109	2015-08-29 09:23:24.886	\N	2015-08-29 09:23:24.886	\N	0	Hypnose	fr	hypnose	109
110	2015-08-29 09:23:24.893	\N	2015-08-29 09:23:24.893	\N	0	Naturopathie	fr	naturopathie	110
111	2015-08-29 09:23:24.903	\N	2015-08-29 09:23:24.903	\N	0	Autres	fr	autres	111
112	2015-08-29 09:23:24.907	\N	2015-08-29 09:23:24.907	\N	0	Pharmacie	fr	pharmacie	112
113	2015-08-29 09:23:24.914	\N	2015-08-29 09:23:24.914	\N	0	Hôpitaux	fr	hopitaux	113
114	2015-08-29 09:23:24.924	\N	2015-08-29 09:23:24.924	\N	0	Centres Médicaux	fr	centres medicaux	114
115	2015-08-29 09:23:24.929	\N	2015-08-29 09:23:24.929	\N	0	Vétérinaire	fr	veterinaire	115
116	2015-08-29 09:23:24.933	\N	2015-08-29 09:23:24.933	\N	0	Services de proximité	fr	services de proximite	116
117	2015-08-29 09:23:24.94	\N	2015-08-29 09:23:24.94	\N	0	Création & Réparation	fr	creation & reparation	117
118	2015-08-29 09:23:24.947	\N	2015-08-29 09:23:24.947	\N	0	Cordonnerie & Serrurrerie	fr	cordonnerie & serrurrerie	118
119	2015-08-29 09:23:24.958	\N	2015-08-29 09:23:24.958	\N	0	Couture & Retouches	fr	couture & retouches	119
120	2015-08-29 09:23:24.961	\N	2015-08-29 09:23:24.961	\N	0	Informatique	fr	informatique	120
121	2015-08-29 09:23:24.97	\N	2015-08-29 09:23:24.97	\N	0	Smartphones & Tablettes	fr	smartphones & tablettes	121
122	2015-08-29 09:23:24.98	\N	2015-08-29 09:23:24.98	\N	0	Plombier	fr	plombier	122
123	2015-08-29 09:23:24.988	\N	2015-08-29 09:23:24.988	\N	0	Electricien	fr	electricien	123
124	2015-08-29 09:23:24.996	\N	2015-08-29 09:23:24.996	\N	0	Jardinier	fr	jardinier	124
125	2015-08-29 09:23:25	\N	2015-08-29 09:23:25	\N	0	Finances & Droit	fr	finances & droit	125
126	2015-08-29 09:23:25.003	\N	2015-08-29 09:23:25.003	\N	0	Banque	fr	banque	126
127	2015-08-29 09:23:25.007	\N	2015-08-29 09:23:25.007	\N	0	Mistercash	fr	mistercash	127
128	2015-08-29 09:23:25.011	\N	2015-08-29 09:23:25.011	\N	0	Assurances	fr	assurances	128
129	2015-08-29 09:23:25.017	\N	2015-08-29 09:23:25.017	\N	0	Avocat	fr	avocat	129
130	2015-08-29 09:23:25.03	\N	2015-08-29 09:23:25.03	\N	0	Notaire	fr	notaire	130
131	2015-08-29 09:23:25.038	\N	2015-08-29 09:23:25.038	\N	0	Comptable	fr	comptable	131
132	2015-08-29 09:23:25.046	\N	2015-08-29 09:23:25.046	\N	0	Voiture	fr	voiture	132
133	2015-08-29 09:23:25.053	\N	2015-08-29 09:23:25.053	\N	0	Garage	fr	garage	133
134	2015-08-29 09:23:25.056	\N	2015-08-29 09:23:25.056	\N	0	Station Essence	fr	station essence	134
135	2015-08-29 09:23:25.066	\N	2015-08-29 09:23:25.066	\N	0	Carwash	fr	carwash	135
136	2015-08-29 09:23:25.07	\N	2015-08-29 09:23:25.07	\N	0	Parking	fr	parking	136
137	2015-08-29 09:23:25.078	\N	2015-08-29 09:23:25.078	\N	0	Pare-brise	fr	pare-brise	137
138	2015-08-29 09:23:25.081	\N	2015-08-29 09:23:25.081	\N	0	Pneus	fr	pneus	138
139	2015-08-29 09:23:25.089	\N	2015-08-29 09:23:25.089	\N	0	Contrôle Technique	fr	controle technique	139
140	2015-08-29 09:23:25.097	\N	2015-08-29 09:23:25.097	\N	0	Autres	fr	autres	140
141	2015-08-29 09:23:25.102	\N	2015-08-29 09:23:25.102	\N	0	Imprimerie	fr	imprimerie	141
142	2015-08-29 09:23:25.108	\N	2015-08-29 09:23:25.108	\N	0	Garderie & Crèche	fr	garderie & creche	142
143	2015-08-29 09:23:25.114	\N	2015-08-29 09:23:25.114	\N	0	Agence Immobilière	fr	agence immobiliere	143
144	2015-08-29 09:23:25.121	\N	2015-08-29 09:23:25.121	\N	0	Téléphonie & Internet	fr	telephonie & internet	144
145	2015-08-29 09:23:25.129	\N	2015-08-29 09:23:25.129	\N	0	Centre de Repassage	fr	centre de repassage	145
146	2015-08-29 09:23:25.134	\N	2015-08-29 09:23:25.134	\N	0	Etudes & Formations	fr	etudes & formations	146
147	2015-08-29 09:23:25.142	\N	2015-08-29 09:23:25.142	\N	0	Détente	fr	detente	147
148	2015-08-29 09:23:25.149	\N	2015-08-29 09:23:25.149	\N	0	Culture	fr	culture	148
149	2015-08-29 09:23:25.155	\N	2015-08-29 09:23:25.156	\N	0	Théâtre	fr	theatre	149
150	2015-08-29 09:23:25.166	\N	2015-08-29 09:23:25.166	\N	0	Opéra	fr	opera	150
151	2015-08-29 09:23:25.17	\N	2015-08-29 09:23:25.17	\N	0	Concert	fr	concert	151
152	2015-08-29 09:23:25.178	\N	2015-08-29 09:23:25.178	\N	0	Cirque	fr	cirque	152
153	2015-08-29 09:23:25.181	\N	2015-08-29 09:23:25.181	\N	0	Musée	fr	musee	153
154	2015-08-29 09:23:25.188	\N	2015-08-29 09:23:25.189	\N	0	Cinéma	fr	cinema	154
155	2015-08-29 09:23:25.192	\N	2015-08-29 09:23:25.192	\N	0	Galerie	fr	galerie	155
156	2015-08-29 09:23:25.199	\N	2015-08-29 09:23:25.199	\N	0	Zoo & Aquarium	fr	zoo & aquarium	156
157	2015-08-29 09:23:25.203	\N	2015-08-29 09:23:25.203	\N	0	Soirées	fr	soirees	157
158	2015-08-29 09:23:25.21	\N	2015-08-29 09:23:25.21	\N	0	Discothèque	fr	discotheque	158
159	2015-08-29 09:23:25.214	\N	2015-08-29 09:23:25.214	\N	0	Karaoké	fr	karaoke	159
160	2015-08-29 09:23:25.217	\N	2015-08-29 09:23:25.217	\N	0	Bar Lounge	fr	bar lounge	160
161	2015-08-29 09:23:25.222	\N	2015-08-29 09:23:25.222	\N	0	Bowling	fr	bowling	161
162	2015-08-29 09:23:25.228	\N	2015-08-29 09:23:25.228	\N	0	Café-Théâtre	fr	cafe-theatre	162
163	2015-08-29 09:23:25.238	\N	2015-08-29 09:23:25.238	\N	0	Bar Holebi	fr	bar holebi	163
164	2015-08-29 09:23:25.241	\N	2015-08-29 09:23:25.241	\N	0	Sport	fr	sport	164
165	2015-08-29 09:23:25.249	\N	2015-08-29 09:23:25.249	\N	0	Tennis	fr	tennis	165
166	2015-08-29 09:23:25.253	\N	2015-08-29 09:23:25.253	\N	0	Badminton & Squash	fr	badminton & squash	166
167	2015-08-29 09:23:25.26	\N	2015-08-29 09:23:25.26	\N	0	Escalade	fr	escalade	167
168	2015-08-29 09:23:25.263	\N	2015-08-29 09:23:25.263	\N	0	Piscine	fr	piscine	168
169	2015-08-29 09:23:25.27	\N	2015-08-29 09:23:25.27	\N	0	Fitness & Musculation	fr	fitness & musculation	169
170	2015-08-29 09:23:25.273	\N	2015-08-29 09:23:25.273	\N	0	Karting	fr	karting	170
171	2015-08-29 09:23:25.285	\N	2015-08-29 09:23:25.285	\N	0	Danse & Yoga	fr	danse & yoga	171
172	2015-08-29 09:23:25.298	\N	2015-08-29 09:23:25.298	\N	0	Golf	fr	golf	172
173	2015-08-29 09:23:25.311	\N	2015-08-29 09:23:25.311	\N	0	Autres	fr	autres	173
174	2015-08-29 09:23:25.319	\N	2015-08-29 09:23:25.319	\N	0	Casino	fr	casino	174
175	2015-08-29 09:23:25.322	\N	2015-08-29 09:23:25.322	\N	0	Jeux de Société	fr	jeux de societe	175
176	2015-08-29 09:23:25.334	\N	2015-08-29 09:23:25.334	\N	0	Jeux Vidéo	fr	jeux video	176
177	2015-08-29 09:23:25.347	\N	2015-08-29 09:23:25.347	\N	0	Jeux d'Enfants	fr	jeux d'enfants	177
178	2015-08-29 09:23:25.352	\N	2015-08-29 09:23:25.352	\N	0	Administrations Publiques	fr	administrations publiques	178
179	2015-08-29 09:23:25.364	\N	2015-08-29 09:23:25.364	\N	0	Services Pratiques	fr	services pratiques	179
180	2015-08-29 09:23:25.371	\N	2015-08-29 09:23:25.371	\N	0	Poste	fr	poste	180
181	2015-08-29 09:23:25.382	\N	2015-08-29 09:23:25.382	\N	0	Police	fr	police	181
182	2015-08-29 09:23:25.385	\N	2015-08-29 09:23:25.385	\N	0	Pompiers	fr	pompiers	182
183	2015-08-29 09:23:25.389	\N	2015-08-29 09:23:25.389	\N	0	Bibliothèque	fr	bibliotheque	183
184	2015-08-29 09:23:25.402	\N	2015-08-29 09:23:25.402	\N	0	Communal	fr	communal	184
185	2015-08-29 09:23:25.406	\N	2015-08-29 09:23:25.406	\N	0	Etat Civil & Population	fr	etat civil & population	185
186	2015-08-29 09:23:25.409	\N	2015-08-29 09:23:25.409	\N	0	Energie	fr	energie	186
187	2015-08-29 09:23:25.413	\N	2015-08-29 09:23:25.413	\N	0	Emploi	fr	emploi	187
188	2015-08-29 09:23:25.42	\N	2015-08-29 09:23:25.42	\N	0	Urbanisme	fr	urbanisme	188
189	2015-08-29 09:23:25.43	\N	2015-08-29 09:23:25.43	\N	0	CPAS	fr	cpas	189
190	2015-08-29 09:23:25.433	\N	2015-08-29 09:23:25.433	\N	0	Office du Tourisme	fr	office du tourisme	190
191	2015-08-29 09:23:25.442	\N	2015-08-29 09:23:25.442	\N	0	Fédéral & International	fr	federal & international	191
192	2015-08-29 09:23:25.446	\N	2015-08-29 09:23:25.446	\N	0	Economie	fr	economie	192
193	2015-08-29 09:23:25.45	\N	2015-08-29 09:23:25.45	\N	0	Emploi	fr	emploi	193
194	2015-08-29 09:23:25.463	\N	2015-08-29 09:23:25.463	\N	0	Justice	fr	justice	194
195	2015-08-29 09:23:25.467	\N	2015-08-29 09:23:25.467	\N	0	Mobilité	fr	mobilite	195
196	2015-08-29 09:23:25.47	\N	2015-08-29 09:23:25.47	\N	0	Impôts	fr	impots	196
197	2015-08-29 09:23:25.475	\N	2015-08-29 09:23:25.475	\N	0	Logement	fr	logement	197
198	2015-08-29 09:23:25.484	\N	2015-08-29 09:23:25.484	\N	0	Santé	fr	sante	198
199	2015-08-29 09:23:25.488	\N	2015-08-29 09:23:25.488	\N	0	Ambassade	fr	ambassade	199
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

