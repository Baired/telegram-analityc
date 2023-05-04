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

    const ip = await get("https://your-domain.com/api/myip");
    const domain = window.location.href;

    get("https://your-domain.com/api/write", 
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
<br><br>
## General steps to connect your Node.js application to a domain on Ubuntu with Nginx:
- Install Nginx if it is not already installed on your Ubuntu server using the following command: ``` sudo apt-get install nginx ```
- Create a new server block configuration file in the __/etc/nginx/sites-available/__ directory. For example, if your domain is __example.com__, create a file called __example.com__: <code>sudo nano /etc/nginx/sites-available/example.com</code>
- Add the following server block configuration to the file, making sure to replace the placeholders with your actual domain name and port number: 
```cnf
server {
    listen 80;
    server_name example.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
``` 
- This configuration will listen on port 80 and forward requests to your Node.js application running on port 3000. It also enables WebSocket connections.
- Create a symbolic link to enable the new server block configuration: <code>sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/</code>
- Test the Nginx configuration for syntax errors: <code>sudo nginx -t</code>
- If there are no errors, reload Nginx to apply the new configuration: <code>sudo systemctl reload nginx</code>
- Finally, update your domain's DNS records to point to the IP address of your Ubuntu server.
