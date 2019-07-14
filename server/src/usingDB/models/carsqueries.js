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
    createCarAd(params){
        const query = `INSERT INTO
            Cars(id, email, created_on, manufacturer, model, price, body_type, owner, state, status, car_img_url)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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

    getCarById(params) {
        const query = 'SELECT * FROM Cars WHERE id = $1';
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

    query(text, params) {
        return new Promise((resolve, reject) => {
            pool.query(text, params)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }
}