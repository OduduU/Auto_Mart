import express from 'express';
import Car from './../src/controllers/cars';
const router = express.Router();


// Create car ad endpoint
router.post('/', Car.create);

// Mark a posted car Ad as sold
router.patch('/:id/status', Car.markAsSold);

// Update the price of a car
router.patch('/:id/price', Car.updatePrice);

// View a specific car
router.get('/:id', Car.viewSpecific);

// View all unsold cars
router.get('/', Car.getCarQueries);


// Delete a specific car ad using id
router.delete('/:id', Car.deleteSpecificCar);



module.exports = router;