const { Pool } = require('pg');
const config = require('./../../config.json');

class Database {
    constructor() {
        this.pool = new Pool({
            host: config.database.psql.host,
            port: config.database.psql.port,
            database: config.database.psql.database,
            user: config.database.psql.user,
            password: config.database.psql.password
        });
          
    }

    async query(query, params) {
        const client = await this.pool.connect();
        try {
            const result = await client.query(query, params);
            return result.rows;
        } finally {
            client.release();
        }
    }
}

module.exports = Database;