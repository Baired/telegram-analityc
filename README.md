# telegram-analityc

## Postgres
```sql
CREATE TABLE IF NOT EXISTS public.click_api
(
    id integer NOT NULL DEFAULT nextval('click_api_id_seq'::regclass),
    ip text COLLATE pg_catalog."default" NOT NULL,
    tag text COLLATE pg_catalog."default" NOT NULL,
    domain text COLLATE pg_catalog."default" NOT NULL,
    event text COLLATE pg_catalog."default" NOT NULL,
    send integer NOT NULL DEFAULT 0,
    "timestamp" timestamp with time zone DEFAULT now(),
    CONSTRAINT "click-api_pkey" PRIMARY KEY (id)
)

```
