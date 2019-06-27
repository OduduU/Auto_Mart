// src/usingDB/controllers/users.js
import uuidv4 from 'uuid/v4';
import db from '../models/usersqueries';
import getToken from './../../../services/token';
import bcrypt from 'bcryptjs';


const Users = {
    async create(req, res) {
        const {email, password, first_name, last_name, address, is_admin} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const id = uuidv4();
        const token = getToken({id});

        const values = [
            id,
            token,
            email,
            first_name,
            last_name,
            hashPassword,
            address,
            is_admin            
        ];

        try {
            const usersWithEmail = await db.getUserByEmail([req.body.email]);
            const result = usersWithEmail.rows;
            if (result.length === 0) {
                await db.createUser(values);
                return res.status(201).json({
                    status: 201,
                    data: {
                        token,
                        id,
                        first_name,
                        last_name,
                        email,
                        address,
                        is_admin
                    }
                });
            } else {
                return res.status(404).json('User Already Exist');
            }
        } catch(error) {
            return res.status(400).send(error.message);
        }
    }
}

export default Users;