import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'

const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY
        });
    } catch (error) {
        console.log("error during the upload of the image to cloudinary: ", error);
    }
}

// console.log("the value is:", process.env.CLOUDINARY_NAME);

export default connectCloudinary