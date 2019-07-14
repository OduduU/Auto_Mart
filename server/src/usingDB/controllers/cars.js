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
    },

    // View car controller
    getCarQueries(req, res) {
        const queries = Object.keys(req.query);

        if(queries.includes('status') && (queries.length === 1)) {
            // View all unsold cars
            Cars.allUnsold(req, res);

        } //else if (queries.includes('status') && queries.includes('min_price') && queries.includes('max_price') && (queries.length === 3)) {
            //User can view all unsold cars within a price range
        //     Car.unsoldWithinPrice(req, res);

        // } else if (queries.includes('status') && queries.includes('state') && (queries.length === 2)) {
        //     //View all new/old available unsold cars
        //     Car.specificMake(req, res);

        // } else if (queries.includes('status') && queries.includes('manufacturer') && (queries.length === 2)) {
        //     //View all used available unsold cars (manufacturer)
        //     Car.specificManufacturer(req, res);

        // } else if (queries.includes('body_type') && (queries.length === 1)) {
        //     //View all cars of a specific body type
        //     Car.specificBody(req, res);

        // }else {
        //     // Get all car ads
        //     Car.getAllCars(req, res);
        // }
    },

    // View all unsold cars
    async allUnsold(req, res) {
        const getAllCars = `SELECT * FROM Cars`;
        const status = req.query.status;
        const available_cars = [];
        try {
            const { rows } = await db.query(getAllCars);
            rows.forEach(car => {
                if (car.status === status){
                    available_cars.push(car);
                }
            })
            
            if (available_cars.length === 0) {
                return res.status(400).json('No cars available');
            } else {
                res.status(200).json({
                    status: 200,
                    data: available_cars
                })
            }
        } catch (error) {
            return res.status(400).json(error.message);
        }
    }
}

export default Cars;