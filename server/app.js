import express from 'express';
import User from './src/controllers/users';
import Car from './src/controllers/cars';
import bodyParser from 'body-parser';

// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

// Parse incoming requests data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Login endpoint
app.post('/api/v1/signin', User.login);

// Signup endpoint
app.post('/api/v1/signup', User.create);

// Get the user profile for their homepage
app.get('/api/v1/users/:id', User.userProfile);

// Get all users
app.get('/api/v1/users', User.allUsers);

// Delete a user using id
app.delete('/api/v1/users/:id', User.deleteUser);

// Update user details 
app.put('/api/v1/users/:id', User.updateUser);


// Create car ad endpoint
app.post('/api/v1/car', Car.create);

// Mark a posted car Ad as sold
app.patch('/api/v1/car/:id/status', Car.markAsSold);

// Update the price of a car
app.patch('/api/v1/car/:id/price', Car.updatePrice);

// View a specific car
app.get('/api/v1/car/:id', Car.viewSpecific);

// View all unsold cars
app.get('/api/v1/car?status=available', Car.allUnsold);

//User can view all unsold cars within a price range
app.get('/api/v1/car?status=available&min_price=XXXValue&max_price=XXXValue', Car.unsoldWithinPrice);

// Delete a specific car ad using id
app.delete('/api/v1/car/:id', Car.deleteSpecificCar);

// Get all car ads
app.get('/api/v1/car', Car.getAllCars);

//View all new available unsold cars (manufacturer)
app.get('/api/v1/car?status=available&state=new', Car.specificMake);

//View all used available unsold cars (manufacturer)
app.get('/api/v1/car?status=available&state=used', Car.specificMake);

//View all used available unsold cars (manufacturer)
app.get('/api/v1/car?status=available&manufacturer=XXXValue', Car.specificManufacturer);

//View all cars of a specific body type
app.get('/api/v1/car?body_type=bodyType', Car.specificBody);

// Start the express server
app.listen(port, () => console.log(`server running on port ${port}`));
