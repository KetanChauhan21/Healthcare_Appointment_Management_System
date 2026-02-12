import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './Config/mongodb.js';
import connectCloudinary from './Config/cloudnery.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoutes.js';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();


// API Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);


// Test Route
app.get('/', (req, res) => {
    res.send('API working');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
