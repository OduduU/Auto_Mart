import express from 'express';
import User from './src/controllers/users';
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

// Start the express server
app.listen(port, () => console.log(`server running on port ${port}`));
