import express from 'express';
import Order from './../src/controllers/orders';
const router = express.Router();


// Create a purchase order
router.post('/', Order.create);

// Update the price of a purchase order
router.patch('/:id/price', Order.updateOrder);



module.exports = router;