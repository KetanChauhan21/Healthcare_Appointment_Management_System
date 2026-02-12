import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl px-6 md:px-10 lg:px-20 py-12 text-white shadow-lg">
      {/* Left Side Content */}
      <div className="flex flex-col justify-center md:w-1/2 space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold leading-snug">
          Book an Appointment <br /> With Trusted Doctors
        </h1>
        <div className="flex items-center space-x-4 bg-white/20 px-4 py-3 rounded-lg backdrop-blur-md">
          <img className="w-12 h-12 rounded-full" src={assets.group_profiles} alt="Profiles" />
          <p className="text-sm md:text-base">
            Browse our extensive list of trusted doctors and <br />
            schedule your appointment hassle-free.
          </p>
        </div>
        <NavLink
          to=""
          onClick={(e) => {
            e.preventDefault();
            const section = document.getElementById("speciality");
            if (section) {
              section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="flex items-center bg-white text-blue-600 px-6 py-3 
             rounded-full shadow-lg font-medium hover:bg-gray-100 
             transition duration-300 ease-in-out transform hover:scale-105"
        >
          Book Appointment
          <img className="ml-2 w-5 h-5" src={assets.arrow_icon} alt="Arrow" />
        </NavLink>
      </div>

      {/* Right Side Image */}
      <div className="md:w-1/2 flex justify-center">
        <img
          className="max-w-xs md:max-w-md lg:max-w-lg h-auto drop-shadow-xl"
          src={assets.header_img}
          alt="Doctor"
        />
      </div>
    </div>
  );
};

export default Header;
