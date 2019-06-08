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
    }
};

export default Car;