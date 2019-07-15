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

const createUserTable = () => {
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

 * Create Car Table
 */

const createCarTable = () => {
    const queryText =`CREATE TABLE IF NOT EXISTS Cars(
        id UUID PRIMARY KEY,
        email VARCHAR(128) NOT NULL,
        created_on TIMESTAMP NOT NULL,
        manufacturer VARCHAR(128) NOT NULL,
        model VARCHAR(128) NOT NULL,
        price VARCHAR(128) NOT NULL,
        body_type VARCHAR(128) NOT NULL,
        owner UUID NOT NULL,
        state VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        car_img_url VARCHAR(128) NOT NULL
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

const dropCarTable = () => {
    const queryText = 'DROP TABLE IF EXISTS Cars';
    
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
const dropUserTable = () => {
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

const createOrderTable = () => {
    const queryText =`CREATE TABLE IF NOT EXISTS Orders(
        id UUID PRIMARY KEY,
        buyer VARCHAR(128) NOT NULL,
        car_id VARCHAR(128) NOT NULL,
        price VARCHAR(128) NOT NULL,
        price_offered VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL,
        quantity VARCHAR(128) NOT NULL,
        created_on TIMESTAMP NOT NULL
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

const dropOrderTable = () => {
    const queryText = 'DROP TABLE IF EXISTS Orders';
    
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

const createFlagTable = () => {
    const queryText =`CREATE TABLE IF NOT EXISTS Flags(
        id UUID PRIMARY KEY,
        car_id VARCHAR(128) NOT NULL,
        created_on TIMESTAMP NOT NULL,
        reason VARCHAR(128) NOT NULL,
        description VARCHAR(128) NOT NULL
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

const dropFlagTable = () => {
    const queryText = 'DROP TABLE IF EXISTS Flags';
    
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
    createUserTable,
    dropUserTable,
    createCarTable,
    dropCarTable,
    createOrderTable,
    dropOrderTable,
    createFlagTable,
    dropFlagTable
};
  
require('make-runnable');