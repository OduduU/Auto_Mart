// src/usingDB/controllers/users.js
import uuidv4 from 'uuid/v4';
import db from '../models/carsqueries';
import CarDb from './../../models/cars';
import usersDb from '../models/usersqueries'


const Cars = {
    // add new user to postgresql
    async create(req, res) {
        const {email, bodyType, manufacturer, model, price, state, status} = req.body;
        try {
            const carImageUrl = req.file.url;
            const usersWithEmail = await usersDb.getUserByEmail([email]);
            const user = usersWithEmail.rows[0];
            const date = new Date();
            console.log(date);
            const id = uuidv4();


            const values = [
                id,
                email,
                date,
                manufacturer,
                model,
                price,
                bodyType,
                user.id,
                state,
                status,
                carImageUrl       
            ];


            
            const { rows } = await db.createCarAd(values);
            const carData = rows[0];
            return res.status(201).json({
                status: 201,
                data: {
                    id: carData.id,
                    email,
                    date,
                    manufacturer,
                    bodyType,
                    price,
                    owner: user.id,
                    model,
                    state,
                    status,
                    carImageUrl
                }
            });
            
        } catch(error) {
            return res.status(400).send(error.message);
        }
    }
}

export default Cars;