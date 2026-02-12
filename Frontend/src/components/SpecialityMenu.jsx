import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
    return (
        <div className="flex flex-col items-center gap-6 py-16 text-gray-800 bg-gray-50" id="speciality">
            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600">Find by Speciality</h1>
            <p className="text-center text-gray-600 md:text-lg max-w-2xl">
                Browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
            </p>

            {/* Speciality Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-8">
                {specialityData.map((item, index) => (
                    <Link onClick={() => scrollTo(0, 0)} to={`/alldoctor/${item.speciality}`} key={index}>
                        <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md 
                           transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-blue-100">
                            <img
                                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full mb-4 
                           transition-transform duration-300 hover:rotate-6 hover:scale-110"
                                src={item.image}
                                alt="Speciality"
                            />
                            <h2 className="text-lg md:text-xl font-semibold text-gray-700 transition-colors duration-300 hover:text-blue-600">
                                {item.speciality}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SpecialityMenu;
