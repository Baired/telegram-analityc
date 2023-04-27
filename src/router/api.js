const express = require('express');
const router = express.Router();

const { isIP } = require('./../utils/isIP');
const { isURL } = require('./../utils/isURL');

const { Click } = require('./../models/ClickModel');
const click = new Click();  

// API endpoint for recording clicks
router.get('/api/:type', async (req, res) => {

    const type = req.params.type;
    const ip = req.query.ip;
    const tag = req.query.tag;
    const domain = req.query.domain;
    const event = req.query.event;

    // Set response headers
    res.setHeader('Content-Type', 'application/json');
    res.status(200);

    // Check if IP address is specified
    if (!ip || ip == '') {
        return res.send(JSON.stringify({
            "status": "bad",
            "message": "IP not specified"
        }, null, 2))
    }

    // Check if IP address is valid
    if (!isIP(ip)) {
        return res.send(JSON.stringify({
            "status": "bad",
            "message": "Invalid IP"
        }, null, 2))
    }

    // Check if tag is specified
    if (!tag || tag == '') {
        return res.send(JSON.stringify({
            "status": "bad",
            "message": "Tag not specified"
        }, null, 2))
    }

    // Check if domain is specified
    if (!domain || domain == '') {
        return res.send(JSON.stringify({
            "status": "bad",
            "message": "Domain not specified"
        }, null, 2))
    }

    // Check if domain is a valid URL
    if (!isURL(domain)) {
        return res.send(JSON.stringify({
            "status": "bad",
            "message": "Invalid URL"
        }, null, 2))
    }

    // Check if event is specified
    if (!event || event == '') {
        return res.send(JSON.stringify({
            "status": "bad",
            "message": "Event not specified"
        }, null, 2))
    }

    if (type == 'write') {
        const findClient = await click.get(ip, domain);

        if (findClient.length > 0) {
            return res.send(JSON.stringify({
                "status": "bad",
                "message": "This is not a unique client"
            }, null, 2))
        }

        // Add click record to database
        click.add(ip, tag, domain, event, 0).then(data => {
            return res.send(JSON.stringify({
                "status": "ok",
                "message": data
            }, null, 2))   
        })
    }  
})

module.exports = router;