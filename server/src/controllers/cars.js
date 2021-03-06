import dataB from './../models/database';
import carDb from './../models/cars';
// import authenticateUser from './../../auth'
// const bcrypt = require('bcryptjs');


const Car = {
    // adds new car to the database,   
    create(req, res) {
        const {email, bodyType, manufacturer, model, price, state, status} = req.body;
        let auto_id = dataB.autoIncrement(dataB.Cars);
        let user = dataB.getUserByEmail(email);
        let car;

        dataB.Cars.push({
            id: auto_id,
            email: email,
            created_on: new Date(),
            manufacturer: manufacturer,
            model: model,
            price: price,
            body_type: bodyType,
            owner: user.id,
            state: state,
            status: status
        })

        car = dataB.getCarById(auto_id);

        let response = carDb.create(car);
        res.status(200).json(response);
    
    },

    // Mark a posted car Ad as sold
    markAsSold(req, res) {
        const { id } = req.params;
        let cars = dataB.Cars;
            
        // look up the car
        let car = dataB.getCarById(id);

        // If not existing, return 404 (user not found)
        if (car === false) return res.status(404).send('The car with the given ID was not found');

        let index = cars.indexOf(car);

        if (car.status === 'available') {
            // Update details 
            cars[index].status = 'sold';
        } else {
            return res.status(400).json('Çar already sold');
        }

        let response = carDb.markAsSold(car);
        res.status(200).json(response);
    },

    // Update the price of a car
    updatePrice(req, res) {
        const { id } = req.params;
        const { price } = req.body;
        let cars = dataB.Cars;
        
        
        // look up the car
        let car = dataB.getCarById(id);


        // If not existing, return 404 (user not found)
        if (car === false) return res.status(404).json('The car with the given ID was not found');

        let index = cars.indexOf(car);


        // Update details 
        cars[index].price = price;

        let response = carDb.updatePrice(car);
        res.status(200).json(response);
    },

    // View a specific car
    viewSpecific(req, res) {
        const { id } = req.params;
        let car = dataB.getCarById(id);
        
        if(car === false) {
            return res.status(404).json('The car with the given ID was not found');
        }

        let response = carDb.viewSpecific(car);
        res.status(200).json(response);
    },

    // View car controller
    getCarQueries(req, res) {
        const queries = Object.keys(req.query);

        if(queries.includes('status') && (queries.length === 1)) {
            // View all unsold cars
            Car.allUnsold(req, res);

        } else if (queries.includes('status') && queries.includes('min_price') && queries.includes('max_price') && (queries.length === 3)) {
            //User can view all unsold cars within a price range
            Car.unsoldWithinPrice(req, res);

        } else if (queries.includes('status') && queries.includes('state') && (queries.length === 2)) {
            //View all new/old available unsold cars
            Car.specificMake(req, res);

        } else if (queries.includes('status') && queries.includes('manufacturer') && (queries.length === 2)) {
            //View all used available unsold cars (manufacturer)
            Car.specificManufacturer(req, res);

        } else if (queries.includes('body_type') && (queries.length === 1)) {
            //View all cars of a specific body type
            Car.specificBody(req, res);

        }else {
            // Get all car ads
            Car.getAllCars(req, res);
        }
    },

    // View all unsold cars
    allUnsold(req, res) {
        let status = req.query.status;
        let available_cars = [];
        let response;

        dataB.Cars.forEach(car => {
            if (car.status === status){
                available_cars.push(car);
            }
        })

        response = carDb.allUnsold(available_cars);
        res.status(200).json(response);
    },

    //User can view all unsold cars within a price range
    unsoldWithinPrice(req, res) {
        // let status = req.query.status;
        let min_price = req.query.min_price;
        let max_price = req.query.max_price;
        let available_cars = [];
        let response;

        dataB.Cars.forEach(car => {
            if ((car.price >= parseFloat(min_price)) && (car.price <= parseFloat(max_price))){
                available_cars.push(car);
            }
        })

        response = carDb.allUnsold(available_cars);
        res.status(200).json(response);
    },

    // Delete a specific car ad using id
    deleteSpecificCar(req, res) {
        const { id } = req.params;
        // Look up the car
        let car = dataB.getCarById(id);

        // If not existing, return 404 (user not found)
        if (car === false) return res.status(404).send('The car with the given ID was not found');

        // delete
        carDb.deleteSpecificCar(car);

        // Return the same car
        res.status(200).send('Car Ad successfully deleted');

    },

    // Get all car ads
    getAllCars(req, res) {
        let allCars = [];
        let response;
        dataB.Cars.forEach(car => {
            allCars.push(car);
        });

        response = carDb.allUnsold(allCars);
        res.status(200).json(response);
    },

    //View all unsold cars of a specific make (manufacturer).
    specificMake(req, res) {
        let status = req.query;
        let available_cars = [];
        let response;

        dataB.Cars.forEach(car => {
            if ((car.state === status.state)){
                available_cars.push(car);
            }
        });

        response = carDb.allUnsold(available_cars)
        res.status(200).json(response);
    },

    //View all used available unsold cars (manufacturer)
    specificManufacturer(req, res) {
        let status = req.query;
        let available_cars = [];
        let response;

        dataB.Cars.forEach(car => {
            if ((car.manufacturer === status.manufacturer)){
                available_cars.push(car);
            }
        });

        response = carDb.allUnsold(available_cars);
        res.status(200).json(response);
    },

    //View all cars of a specific body type
    specificBody(req, res) {
        let status = req.query.body_type;
        let available_cars = [];
        let response;

        dataB.Cars.forEach(car => {
            if (car.body_type === status){
                available_cars.push(car);
            }
        });

        response = carDb.allUnsold(available_cars);
        res.status(200).json(response);
    }
};

export default Car;