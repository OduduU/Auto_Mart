const { Pool } = require('pg');
const dotenv = require('dotenv');


dotenv.config();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the db');
});

/**

 * Create Tables
 */

const createTables = () => {
    const queryText =`CREATE TABLE IF NOT EXISTS Users(
        id UUID PRIMARY KEY,
        token VARCHAR(1024) NOT NULL,
        email VARCHAR(128) NOT NULL,
        first_name VARCHAR(128) NOT NULL,
        last_name VARCHAR(128) NOT NULL,
        password VARCHAR(1024) NOT NULL,
        address VARCHAR(128) NOT NULL,
        is_admin BOOLEAN NOT NULL
    )`;

    pool.query(queryText)
    .then((res) => {
        console.log(res);
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    });

}



/**

 * Drop Tables

*/
const dropTables = () => {
    const queryText = 'DROP TABLE IF EXISTS Users';
    
    pool.query(queryText)
    .then((res) => {
        console.log(res);
        pool.end();
    })
    .catch((err) => {
        console.log(err);
        pool.end();
    });

}



pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});


module.exports = {
    createTables,
    dropTables
};

require('make-runnable');