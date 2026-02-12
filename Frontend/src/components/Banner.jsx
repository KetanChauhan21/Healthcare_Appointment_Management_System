import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";


const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col md:flex-row items-center justify-between 
                    bg-gradient-to-r from-blue-100 to-blue-300 
                    p-6 md:p-12 rounded-lg shadow-xl">
            {/* Left Section */}
            <div className="text-center md:text-left space-y-4 md:w-1/2">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-800">
                    Book Appointment
                </h1>
                <p className="text-lg text-gray-700">
                    With <span className="font-semibold text-indigo-600">100+</span> trusted Doctors
                </p>
                <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 
                          text-white font-semibold rounded-full shadow-lg 
                          transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-xl 
                          active:scale-95">
                    Create Account
                </button>
            </div>

            {/* Right Section */}
            <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
                <img
                    src={assets.appointment_img}
                    alt="Appointment"
                    className="w-full max-w-md md:max-w-lg rounded-lg shadow-md"
                />
            </div>
        </div>
    );
};

export default Banner;
