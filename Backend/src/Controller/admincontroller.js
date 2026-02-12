import validator from "validator";
import bcrypt from "bcrypt";
import doctorModel from "../Models/doctor.model.js";
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import appointmentModel from "../Models/appointment.model.js";

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imagefile = req.file;

        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json(400).json({ success: false, message: "Please fill all the details" });
        }

        // validating email
        if (!validator.isEmail(email)) {
            return res.json(400).json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json(400).json({ success: false, message: "Password must be at least 8 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imagefile.path, {
            resource_type: "image",
        });

        const imageUrl = imageUpload.secure_url;

        const doctordata = {
            name,
            email,
            image: imageUrl,
            password: hashpassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        };

        const newDoctor = new doctorModel(doctordata);
        await newDoctor.save();

        return res.json({ success: true, message: "Doctor added successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// APi for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// APi to get all doctors
const getallDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password")
        const Doctorslength = doctors.length
        res.json({ success: true, totalNumber: Doctorslength, doctors })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

// API to get appointments list
const getAppointments = async (req, res) => {
    try {
        const appointment = await appointmentModel.find({});
        res.json({ success: true, appointment })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

export { addDoctor, loginAdmin, getallDoctors, getAppointments };
