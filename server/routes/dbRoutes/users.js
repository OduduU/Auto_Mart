import express from 'express';
import User from './../../src/usingDB/controllers/users';
const router = express.Router();


// Login endpoint
// router.post('/auth/signin', function(req, res){
//     User.login
// });

// Signup endpoint
router.post('/auth/signup', User.create);

// Get the user profile for their homepage
// router.get('/:id', function(req, res){
//     User.userProfile
// });

// Get all users
// router.get('/', function(req, res){
//     User.allUsers
// });

// Delete a user using id
// router.delete('/:id', function(req, res){
//     User.deleteUser
// });

// Update user details 
// router.put('/:id', function(req, res){
//     User.updateUser
// });



module.exports = router;