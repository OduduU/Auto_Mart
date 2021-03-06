import dataB from './../models/database';
import orderDb from './../models/orders';
// import authenticateUser from './../../auth'
// const bcrypt = require('bcryptjs');




const Order = {
    // Create a purchase order   
    create(req, res) {
        const {car_id, user_id, status, quantity, price_offered} = req.body;
        let auto_id = dataB.autoIncrement(dataB.Orders);
        let car =  dataB.getCarById(car_id);
        let order;

        // If car_id not existing, return 404 (car not found)
        if (car === false) return res.status(404).send('The car with the given ID was not found');

        if(dataB.thisOrderExist(car_id, user_id)) {
            let index = dataB.Orders.indexOf(dataB.thisOrderExist(car_id, user_id))
            let current_quantity = dataB.Orders[index].quantity;
            dataB.Orders[index].quantity = parseInt(current_quantity) + parseInt(quantity);
        }
        else{
            dataB.Orders.push({
                id: auto_id,
                buyer: parseInt(user_id),
                car_id: parseInt(car_id),
                created_on: new Date(),
                price: car.price,
                price_offered: parseFloat(price_offered),
                quantity: parseInt(quantity),
                status: status,
            });
        }
        order = dataB.thisOrderExist(car_id, user_id);

        let response = orderDb.create(order);
        res.status(200).json(response);
    },

    // Update the price of a purchase order
    updateOrder(req, res) {
        const { id } = req.params;
        const { price } = req.body;
        let orders = dataB.Orders;
        
        
        // look up the order
        let order = dataB.getOrderById(id);
        let old_price_offered = order.price;

        // If not existing, return 404 (user not found)
        if (order === false) return res.status(404).send('The order with the given ID was not found');

        let index = orders.indexOf(order);

        if (order.status === 'pending') {
            // Update details 
            orders[index].price = price;
        }

        let response = orderDb.updateOrder(order, old_price_offered, price);
        res.status(200).json(response);
    }
};

export default Order;