import express from 'express'
import { addDoctor, getallDoctors, loginAdmin , getAppointments} from '../Controller/admincontroller.js'
import upload from '../middleware/multer.js'
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailablity } from '../Controller/doctorcontroller.js';

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors', authAdmin, getallDoctors);
adminRouter.post('/change-availabilty', authAdmin, changeAvailablity);
adminRouter.get('/all-appointments', authAdmin, getAppointments);

export default adminRouter;