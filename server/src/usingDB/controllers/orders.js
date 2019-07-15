import uuidv4 from 'uuid/v4';
import db from '../models/carsqueries';
import orderResponse from '../models/orders';


const Orders = {
    // Create a purchase order
    async create(req, res) {
        const { car_id, user_id, status, quantity, price_offered } = req.body;
        const id = uuidv4();
        const created_on = new Date();
        const createOrderquery = `INSERT INTO
            Orders(id, buyer, car_id, created_on, price, price_offered, quantity, status)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            returning *`;
        const orderExistQuery = `SELECT * FROM Orders WHERE car_id=$1 AND buyer=$2`;
        const updateOrderQuery = `UPDATE Orders SET quantity=$1 WHERE car_id=$2 AND buyer=$3 returning *`;

        try {
            const { rows } = await db.getCarById([car_id]);
            if (!rows[0]) return res.status(404).json('The car with the given ID was not found');
            const orderExist = await db.query(orderExistQuery, [car_id, user_id]);
            if (orderExist.rows[0]) {
                const newQuantity = parseInt(orderExist.rows[0].quantity) + parseInt(quantity);;
                await db.query(updateOrderQuery, [newQuantity, car_id, user_id]);
            } else {
                const orderValues = [
                    id,
                    user_id,
                    car_id,
                    created_on,
                    rows[0].price,
                    parseFloat(price_offered),
                    parseInt(quantity),
                    status
                ];
                await db.query(createOrderquery, orderValues);
            }
            const orderResult = await db.query(orderExistQuery, [car_id, user_id]);
            const order = orderResult.rows[0];
            const response = orderResponse.create(order);
            res.status(200).json(response);
        } catch (error) {
            return res.status(400).json(error.message);
        }
    },

    // Update the price of a purchase order
    async updateOrder(req, res) {
        const { id } = req.params;
        const { price } = req.body;
        const getOrderByIdquery = 'SELECT * FROM Orders WHERE id = $1';
        const updateOrderQuery = `UPDATE Orders SET price=$1 WHERE id=$2 returning *`;   
        
        try {
            // look up the order
            const { rows } = await db.query(getOrderByIdquery, [id]);

            // If not existing, return 404 (user not found)
            if (!rows[0]) return res.status(404).send('The order with the given ID was not found');
            const old_price_offered = rows[0].price;

            if (rows[0].status === 'pending') {
                // Update details 
                await db.query(updateOrderQuery, [price, id]);
            }

            const response = orderResponse.updateOrder(rows[0], old_price_offered, price);
            res.status(200).json(response);
        } catch (error) {
            return res.status(400).json(error.message);
        }
        
    }
};


export default Orders;