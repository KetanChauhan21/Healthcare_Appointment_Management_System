import mongoose from 'mongoose'
import 'dotenv/config'

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/DoctorGuider`)
            .then(() => console.log('MongoDB Connected successful!!!... '))
            .catch((err) => console.log("error during connected to database", err));
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


export default connectDB;