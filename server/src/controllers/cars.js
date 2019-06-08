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
        res.status(200).json(car);
    
    }
};

export default Car;