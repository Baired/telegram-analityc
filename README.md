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
This is an example of a request to record a new visitor.
```
https://your-domain.com/api/write?ip=1.1.1.1&tag=your-tag&domain=https://google.com/&event=click
```

### JS example
```javascript
(async () => {

    const ip = await get("https://start.ws.watch/api/myip");
    const domain = window.location.href;

    get("https://start.ws.watch/api/write", 
    {
        ip: ip.result,
        tag: "your tag",
        domain: domain,
        event: "click"
    }
    ).catch((error) => console.error(error));

    function get(url, params = {}) {
        let query = "";

        for (let key in params) {
            if (query !== "") {
                query += "&";
            }

            query += key + "=" + encodeURIComponent(params[key]);
        }

        if (query !== "") {
            url += "?" + query;
        }

        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response) => response.json());
    }
})();
```

