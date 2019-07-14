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
    },

    // Mark a posted car Ad as sold
    async markAsSold(req, res) {
        const updateCarQuery = `UPDATE Cars
            SET status=$1 WHERE id=$2 returning *`;
        try {
            const {rows} = await db.getCarById([req.params.id]);
            if (!rows[0]) {
                return res.status(404).json('The car with the given ID was not found');
            }
            if (rows[0].status === 'available') {
                const values = [
                    req.body.status,
                    req.params.id
                ];
                const updatedCar = await db.query(updateCarQuery, values);
                const payload = updatedCar.rows[0];
                return res.status(200).json({
                    status: 200,
                    data: {
                        id: payload.id,
                        email: payload.email,
                        created_on: payload.created_on,
                        manufacturer: payload.manufacturer,
                        status: payload.status,
                        model: payload.model,
                        price: payload.price,
                        state: payload.state,
                    }
                });
            } else {
                return res.status(400).json('Çar already sold');
            }
        } catch (error) {
            return res.status(400).json(error.message);
        }
    },

    // Update the price of a car
    async updatePrice(req, res) {
        const updateCarQuery = `UPDATE Cars
            SET price=$1 WHERE id=$2 returning *`;
        try {
            const {rows} = await db.getCarById([req.params.id]);
            if (!rows[0]) {
                return res.status(404).json('The car with the given ID was not found');
            }
            
            const values = [
                req.body.price,
                req.params.id
            ];
            const updatedCar = await db.query(updateCarQuery, values);
            const payload = updatedCar.rows[0];
            return res.status(200).json({
                status: 200,
                data: {
                    id: payload.id,
                    email: payload.email,
                    created_on: payload.created_on,
                    manufacturer: payload.manufacturer,
                    status: payload.status,
                    model: payload.model,
                    price: payload.price,
                    state: payload.state,
                }
            });
            
        } catch (error) {
            return res.status(400).json(error.message);
        }
    },

    // View a specific car
    async viewSpecific(req, res) {
        try {
            const {rows} = await db.getCarById([req.params.id]);
            if (!rows[0]) {
                return res.status(404).json('The car with the given ID was not found');
            }
            const payload = rows[0];
            return res.status(200).json({
                status: 200,
                data: {
                    id: payload.id,
                    email: payload.email,
                    created_on: payload.created_on,
                    manufacturer: payload.manufacturer,
                    status: payload.status,
                    model: payload.model,
                    price: payload.price,
                    state: payload.state,
                }
            });
            
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
}

export default Cars;