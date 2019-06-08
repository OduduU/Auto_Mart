import database from './database';


const carDb = {    
    // adds new car to the database & generate response,   
    create(car) {        
        let response = {
            status: 200,
            data: {
                id: car.id,
                created_on: car.created_on,
                manufacturer: car.manufacturer,
                bodyType: car.body_type,
                email: car.email,
                price: car.price,
                owner: car.owner,
                model: car.model,
                status: car.status,
                state: car.state
            }
        }
        return response;
    },

    // Mark a posted car Ad as sold
    markAsSold(car) {
        let response = {
            status: 200,
            data: {
                id: car.id,
                email: car.email,
                created_on: car.created_on,
                manufacturer: car.manufacturer,
                status: car.status,
                model: car.model,
                price: car.price,
                state: car.state
            }
        }
        return response;
    },

    // Update the price of a car
    updatePrice(car) {
        let response = {
            status: 200,
            data: {
                id: car.id,
                email: car.email,
                created_on: car.created_on,
                manufacturer: car.manufacturer,
                status: car.status,
                model: car.model,
                price: car.price,
                state: car.state
            }
        }
        return response;
    },

    // View a specific car
    viewSpecific(car) {
        let response = {
            status: 200,
            data: {
                id: car.id,
                created_on: car.created_on,
                manufacturer: car.manufacturer,
                status: car.status,
                model: car.model,
                price: car.price,
                state: car.state,
                owner: car.owner,
                body_type: car.body_type
            }
        }
        return response;
    }
}

export default carDb;