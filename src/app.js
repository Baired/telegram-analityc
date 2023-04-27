const express = require('express');

const config = require('../config.json');

const bot = require('./bot');

const app = express();
const port = config.express.port;

app.use(require('./router/api'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
