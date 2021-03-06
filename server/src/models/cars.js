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
    },
    
    // View all unsold cars
    allUnsold(allCars) {
        let response;
        if(allCars.length === 0) {
            response = 'No cars available'
        } else {
            response = {
                status: 200,
                data: allCars
            }
        }
        
        return response;
    },

    //User can view all unsold cars within a price range
    unsoldWithinPrice(allCars) {
        let response = {
            status: 200,
            data: allCars
        }
        return response;
    },

    // Delete a specific car ad using id
    deleteSpecificCar(car) {
        // Delete
        let index = database.Cars.indexOf(car);
        database.Cars.splice(index, 1);
    },

    // Get all car ads
    getAllCars(allCars) {
        let response = {
            status: 200,
            data: allCars
        }
        return response;
    },

    //View all unsold cars of a specific make (manufacturer).
    specificMake(allCars) {
        let response = {
            status: 200,
            data: allCars
        }
        return response;
    },
}

export default carDb;