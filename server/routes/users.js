import express from 'express';
import User from './../src/controllers/users';
const router = express.Router();


// Login endpoint
router.post('/auth/signin', User.login);

// Signup endpoint
router.post('/auth/signup', User.create);

// Get the user profile for their homepage
router.get('/:id', User.userProfile);

// Get all users
router.get('/', User.allUsers);

// Delete a user using id
router.delete('/:id', User.deleteUser);

// Update user details 
router.put('/:id', User.updateUser);



module.exports = router;