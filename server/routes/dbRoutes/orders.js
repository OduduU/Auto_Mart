import express from 'express';
import Order from './../../src/usingDB/controllers/orders';
const router = express.Router();

// Create a purchase order
router.post('/', Order.create);


module.exports = router;