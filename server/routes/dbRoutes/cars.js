import express from 'express';
import Car from './../../src/usingDB/controllers/cars';
import multer from 'multer';
import cloudinary from 'cloudinary';
import cloudinaryStorage from 'multer-storage-cloudinary';

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary, 
    folder: "carImages",allowedFormats: ["jpg", "png"], 
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

const upload = multer({ storage: storage});

// Create car ad endpoint
router.post('/', upload.single('carImage'), Car.create);


module.exports = router;