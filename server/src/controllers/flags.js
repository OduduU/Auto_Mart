import dataB from './../models/database';
import reportDb from './../models/flags';

// import authenticateUser from './../../auth'
// const bcrypt = require('bcryptjs');

const Report = {

    // Create a flag
    // flag/report a posted AD as fraudulent.
    create(req, res) {
        const {car_id, reason, description} = req.body;
        let auto_id = dataB.autoIncrement(dataB.Flags);
        let flag;  
        
        dataB.Flags.push({
            id: auto_id,
            car_id: car_id,
            reason: reason,
            description: description,
            created_on: new Date()
        });

        flag =  dataB.getFlagById(auto_id);

        let response = reportDb.create(flag);
        res.status(200).json(response);
    }

}


export default Report;