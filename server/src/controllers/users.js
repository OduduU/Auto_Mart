import dataB from './../models/database';
import UserDb from './../models/users';
import getToken from './../../services/token';
const bcrypt = require('bcryptjs');




const User = {
    // user login
    login(req, res) {
        const {email, password} = req.body;
        let user = dataB.getUserByEmail(email);
        if (user === false){
            return res.status(404).json('Email Does Not Exist, Please Sign Up');
        }

        if(bcrypt.compareSync(password, user.password)){
            let token = getToken({email});
            let response = UserDb.login(user, token);
            res.status(200).json(response);
        } else {
            res.status(400).json('Invalid Credentials');
        }
    },

    // adds new user to the database,   
    create(req, res) {
        const {email, first_name, last_name, password, address} = req.body;
        let salt = bcrypt.genSaltSync(10);
        let token = getToken({email});

        const newUser = {
            token: token,
            id: dataB.autoIncrement(dataB.Users),
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: bcrypt.hashSync(password, salt),
            address: address,
            is_admin: false
        }

        let user = dataB.getUserByEmail(email);

        if (user !== false) {
            return res.status(404).json('User Already Exist');
        } else {            
            let response = UserDb.create(newUser)
            res.status(200).json(response);
        }
    },

    // Get the user profile for their homepage
    userProfile(req, res) {
        const { id } = req.params;
        let user = dataB.getUserById(id);

        if(user === false) {
            return res.status(404).json('Invalid User ID');
        }

        let response = UserDb.userProfile(user);
        res.status(200).json(response);
    },

    // Get all users
    allUsers(req, res) {
        let response = UserDb.allUsers();
        res.status(200).json(dataB.Users);
    },

    // Delete a user using id
    deleteUser(req, res) {
        const {id} = req.params;

        // Look up the car
        let user = dataB.getUserById(id);

        // If not existing, return 404 (user not found)
        if (user === false) return res.status(404).json('The user with the given ID was not found');
        
        // Delete
        let index = dataB.Users.indexOf(user);
        dataB.Users.splice(index, 1);

        let response = UserDb.deleteUser(user); 

        res.status(200).json(response);
    },

    // Update user details
    updateUser(req, res) {
        const {id} = req.params;
        const {first_name, last_name, address} = req.body;
        let user = dataB.getUserById(id);

        // If not existing, return 404 (user not found)
        if (user === false) return res.status(404).send('The user with the given ID was not found');

        let response = UserDb.updateUser(user, first_name, last_name, address);

        // Return the updated user
        res.status(200).json(response);
    }
};

export default User;