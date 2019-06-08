import database from './database';


const UserDb = {
    // user login
    login(user, token) {
        let response = {
            status: 200,
            data: {
                token: token,
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                address: user.address,
                is_admin: user.is_admin
            }
        }
        return response;
    },

    // adds new user to the database & generate response,   
    create(newUser) {
        database.Users.push(newUser)
        let response = {
            status: 200,
            data: {
                token: newUser.token,
                id: newUser.id,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                address: newUser.address,
                is_admin: newUser.is_admin
            }
        }
        return response;
    },
}

export default UserDb;