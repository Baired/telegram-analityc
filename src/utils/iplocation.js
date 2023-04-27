const axios = require('axios');

async function iplocation(ip) {
    const query = await axios.get(`https://api.iplocation.net/?ip=${ip}`);
    
    return query.data;
}

module.exports = { iplocation }