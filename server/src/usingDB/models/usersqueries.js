import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('i d dey connect ooo....');
});

export default {
    createUser(params){
        const query = `INSERT INTO
            Users(id, token, email, first_name, last_name, password, address, is_admin)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            returning *`;

        return new Promise((resolve, reject) => {
            pool.query(query, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
        })
    },

    getUserByEmail(params) {
        const query = 'SELECT * FROM Users WHERE email = $1';
        return new Promise((resolve, reject) => {
            pool.query(query, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
        })
    },

    getUserById(params) {
        const query = 'SELECT * FROM Users WHERE id = $1';
        return new Promise((resolve, reject) => {
            pool.query(query, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }
}