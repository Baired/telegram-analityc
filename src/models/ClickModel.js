const { Pool } = require('pg');
const Database = require('./../database/connection');
const db = new Database();

// Click model class definition
class Click {
    async add (ip, tag, domain, event, send) {
        const query = 'INSERT INTO click_api (ip, tag, domain, event, send) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const result = await db.query(query, [ip, tag, domain, event, send]);

        return result;
    }

    async get (ip, domain) {
        const query = 'SELECT * FROM click_api WHERE ip = $1 AND domain = $2';
        const result = await db.query(query, [ip, domain]);

        return result;
    }

    async update (id, data) {
        const { ip, tag, domain, event, send } = data;

        const query = 'UPDATE click_api SET ip = $1, tag = $2, domain = $3, event = $4, send = $5 WHERE id = $6 RETURNING *';
        const result = await db.query(query, [ip, tag, domain, event, send, id]);

        return result;
    }

    async find(column, value) {
        const query = `SELECT * FROM click_api WHERE ${column} = $1`;
        const result = await db.query(query, [value]);
        
        return result;
    }

    async countAllClicks(domain) {
        const query = 'SELECT COUNT(*) FROM click_api WHERE domain = $1';
        const result = await db.query(query, [domain]);
    
        return result[0].count;
    }
    
    async countDailyClicks(domain) {
        const query = 'SELECT COUNT(*) FROM click_api WHERE domain = $1 AND timestamp >= CURRENT_DATE';
        const result = await db.query(query, [domain]);
    
        return result[0].count;
    }
    
      
      
}


module.exports = { Click }