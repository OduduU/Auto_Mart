import express from 'express';
// import users from './routes/users';
import users from './routes/dbRoutes/users';
// import cars from './routes/cars';
import cars from './routes/dbRoutes/cars';
import orders from './routes/orders';
import flags from './routes/flags';
import bodyParser from 'body-parser';

// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

// Parse incoming requests data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/cars', cars);
app.use('/api/v1/users', users);
app.use('/api/v1/orders', orders);
app.use('/api/v1/flags', flags);


// Start the express server
app.listen(port, () => console.log(`server running on port ${port}`));
