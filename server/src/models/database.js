const database = {
    Users: [
        {
            id: 1,
            email: 'bullion.relson@gmail.com',
            first_name: 'Bullion',
            last_name: 'Umoeka',
            password: '$2y$10$zlB1Hfbabl.7IbIZGQWA8uDm1cz0ddyVoEmDgO1YcfO7BAlGuMMw6',
            address: 'Ajah',
            is_admin: true
        }
    ],

    Cars: [
        {
            id: 1,
            owner: 1,
            created_on: new Date(),
            state: 'New',
            email: 'bullion.relson@gmail.com',
            status: 'available',
            price: 12.6,
            manufacturer: 'Benz',
            model: 'E350',
            body_type: 'Sport'
        }
    ],

    Orders: [
        {
            id: 1,
            buyer: 1,
            car_id: 1,
            price: 12.6,
            status: 'pending',
            quantity: 1,
            created_on: new Date()
        }
    ],

    Flags: [
        {
            id: 1,
            car_id: 1,
            created_on: new Date(),
            reason: 'Exhorbitant Price',
            description: 'The car too cost'
        }
    ],

    autoIncrement(entity) {
        let result;
        if (entity.length === 0) {
            result = 1;
        } else {
            result = entity[entity.length - 1].id + 1;
        }
        return result;
    },
  
    getUserByEmail(email) {
        let result = false;
            this.Users.forEach(user => {
                if (user.email === email) {
                    result = user;
                }
            })
        return result;
    },

    getUserById(id) {
        let result = false;
            this.Users.forEach(user => {
                if (user.id === parseInt(id)) {
                    result = user;
                }
            })
        return result;
    },

    getCarByEmail(email) {
        let result = [];
            this.Cars.forEach(car => {
                if (car.email === email) {
                    result.push(car);
                }
            })
        return result;
    },

    getCarById(id) {
        let result = false;
            this.Cars.forEach(car => {
                if (car.id === parseInt(id)) {
                    result = car;
                }
            })
        return result;
    },

    getOrderById(id) {
        let result = false;
            this.Orders.forEach(order => {
                if (order.id === parseInt(id)) {
                    result = order;
                }
            })
        return result;
    },

    thisOrderExist(car_id, user_id) {
        let result = false;
            this.Orders.forEach(order => {
                if (order.buyer === parseInt(user_id) && order.car_id === parseInt(car_id)) {
                    result = order;
                }
            })
        return result;
    },

    getFlagById(id) {
        let result = false;
            this.Flags.forEach(flag => {
                if (flag.id === parseInt(id)) {
                    result = flag;
                }
            })
        return result;
    }
}

export default database;