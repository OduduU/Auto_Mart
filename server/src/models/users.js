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

    // Get the user profile for their homepage
    userProfile(user) {
        let response = {
            status: 200,
            data: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                address: user.address
            }
        }
        return response;
    },

    // Get all users
    allUsers() {
        let allUsers = [];
        let response;
        database.Users.forEach(user => {
            allUsers.push(user);
        });

        response = {
            status: 200,
            data: allUsers
        }
        return response;
    },

    // Delete a user using id
    deleteUser() {
        let response = 'User Successfully Deleted'
        return response;
    },

    // Update user details
    updateUser(user, first_name, last_name, address) {
        let users = database.Users;
        let index = users.indexOf(user);
        
        // Update details 
        users[index].first_name = first_name;
        users[index].last_name = last_name;
        users[index].address = address;

        let response = {
            status: 200,
            data: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                address: user.address
            }
        }
        return response;
    }
}

export default UserDb;