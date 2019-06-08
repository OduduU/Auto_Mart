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
    }
}

export default carDb;