import dataB from './../models/database';
import UserDb from './../models/users';
import authenticateUser from './../../auth'
const bcrypt = require('bcryptjs');




const User = {
    // user login
    login(req, res) {
        const {email,password} = req.body;
        let user = dataB.getUserByEmail(email);
        if (user === false){
            return res.status(404).json('Email Does Not Exist, Please Sign Up');
        }

        if(bcrypt.compareSync(password, user.password)){
            let token = authenticateUser(user.email);
            let response = UserDb.login(user, token);
            res.status(200).json(response);
        } else {
            res.status(400).json('Invalid Credentials');
        }
    }
};

export default User;