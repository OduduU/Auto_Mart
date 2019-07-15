import uuidv4 from 'uuid/v4';
import db from '../models/carsqueries';
import flagResponse from '../models/flags';


const Report = {

    // Create a flag
    // flag/report a posted AD as fraudulent.
    async create(req, res) {
        const {car_id, reason, description} = req.body;
        const id = uuidv4();
        const created_on = new Date();
        const createFlagquery = `INSERT INTO
            Flags(id, car_id, reason, description, created_on)
            VALUES($1, $2, $3, $4, $5)
            returning *`;
        const flagValues = [
            id,
            car_id,
            reason,
            description,
            created_on
        ];

        try {
            const flagResult = await db.query(createFlagquery, flagValues);
            const flag = flagResult.rows[0];
            const response = flagResponse.create(flag);
            res.status(200).json(response);
        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}


export default Report;