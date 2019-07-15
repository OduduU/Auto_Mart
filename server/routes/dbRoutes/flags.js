import express from 'express';
import Flag from './../../src/usingDB/controllers/flags';
const router = express.Router();


// Create a flag
// flag/report a posted AD as fraudulent.
router.post('/', Flag.create);



module.exports = router;