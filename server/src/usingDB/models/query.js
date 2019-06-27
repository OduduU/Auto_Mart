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
    query(text, params){
        return new Promise((resolve, reject) => {
            pool.query(text, params)
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