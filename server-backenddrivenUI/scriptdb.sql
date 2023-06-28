-- Database: interactions

-- DROP DATABASE IF EXISTS interactions;

CREATE DATABASE interactions
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Spain.1252'
    LC_CTYPE = 'Spanish_Spain.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;
	
-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    userid character varying(50) COLLATE pg_catalog."default" NOT NULL,
    username character varying(50) COLLATE pg_catalog."default" NOT NULL,    
    role character varying(50) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (userid)
    CONSTRAINT unique_username UNIQUE (username)

)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;	
	
CREATE SEQUENCE IF NOT EXISTS interactions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Table: public.interactions

-- DROP TABLE IF EXISTS public.interactions;

CREATE TABLE IF NOT EXISTS public.interactions
(
    id integer NOT NULL DEFAULT nextval('interactions_id_seq'::regclass),
    user_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "timestamp" timestamp without time zone NOT NULL,
    epoch_time bigint NOT NULL,
    element_id character varying(50) COLLATE pg_catalog."default" NOT NULL,
    related_data character varying(5000) COLLATE pg_catalog."default" NOT NULL,

    CONSTRAINT interactions_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.interactions
    OWNER to postgres;