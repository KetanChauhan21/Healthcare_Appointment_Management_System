import express from 'express'
import { registerUser, loginUser, getProfile, updateUserprofile, bookAppointment, listAppointment, cancelAppointment, paymentrazorpay, verifyRazorpay } from '../Controller/usercontroller.js'
import authUser from '../middleware/authUser.js'
import upload from '../middleware/multer.js'


const userRouter = express.Router()


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

// get the user data
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateUserprofile)

userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointment', authUser, listAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)
userRouter.post('/payment-razorpay', authUser, paymentrazorpay)
userRouter.post('/verify-razorpay', authUser, verifyRazorpay)


export default userRouter 