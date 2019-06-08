import express from 'express';
import User from './src/controllers/users';
import logger from 'morgan';
import bodyParser from 'body-parser';

// Set up the express app
const app = express();
const port = parseInt(process.env.PORT, 10) || 5000;

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Login endpoint
app.post('/api/v1/signin', User.login);

// Start the express server
app.listen(port, () => console.log(`server running on port ${port}`));
