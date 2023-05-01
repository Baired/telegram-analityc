# telegram-analityc
This is a simple bot for displaying information about visitors to your website(s).
<br>

## Config
```json
{
    "telegram": {
        "token": "", -> Enter your bot's token
        "chatId": 10000000, -> Please specify the chat or group ID for message output.

        "message": {
            "click": [
                {
                  "start": [
                    "🌐",
                    " ┠ IP: <code>{ip}</code>",
                    " ┠ Tag: <code>{tag}</code>",
                    " ┠ Domain: <a href='{url}'>{domain}</a>",
                    " ┗ Country: <code>{country}</code>"
                  ]
                },
            
                {
                  "end": [
                    "📈",
                    " ┠ Clicks all time: <code>{clicks_all}</code>",
                    " ┗ Clicks per 24h: <code>{clicks_day}</code>"
                  ]
                }
            ]
        }
    },

    "express": {
        "port": 3002 -> Port for the website with API
    },

    "database": {
        "psql": { -> And enter your database credentials
            "host": "localhost",
            "port": 5432,
            "database": "",
            "user": "",
            "password": ""
        }
    }
}
```

## Postgres
Table required for bot operation
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

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.click_api
    OWNER to postgres;
```

<br>

## Request
```
http://127.0.0.1:3002/api/write?ip=1.1.1.1&tag=skinbaron&domain=https://google.com/&event=click
```

<code>write</code> -> Is a type of creating a new visitor record.<br>
<code>ip</code> -> <br>
<code>tag</code> -> <br>
<code>domain</code> -> <br>
<code>event</code> -> <br>
<br>
<этот текст отформатирован символами звездочки>

