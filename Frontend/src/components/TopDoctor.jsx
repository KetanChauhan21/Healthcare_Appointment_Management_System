import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Topdoctor = () => {
    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);
    return (
        <div className="flex flex-col items-center gap-6 py-16 text-gray-800 bg-gray-50">
            {/* Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600">Top Doctors to Book</h1>
            <p className="text-center text-gray-600 md:text-lg max-w-2xl">
                Simply browse through our extensive list of trusted doctors.
            </p>

            {/* Doctor Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full px-6">
                {doctors.slice(0, 10).map((item, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md 
                       transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                        <img
                            className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full mb-4"
                            src={item.image}
                            alt={item.name}
                        />
                        <div className="text-center">
                            {/* Availability Status */}
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <p className="text-sm font-medium text-green-600">Available</p>
                            </div>
                            <p className="text-lg font-semibold text-gray-700">{item.name}</p>
                            <p className="text-gray-500 text-sm">{item.speciality}</p>
                        </div>
                        <button onClick={() => navigate(`/appointment/${item._id}`)} className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-full 
                               text-sm cursor-pointer font-medium transition-all duration-300 hover:bg-blue-600">
                            More
                        </button>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={() => { navigate('/alldoctor'); scrollTo(0, 0) }} className="mt-4 w-32 bg-indigo-500 text-white p-4 rounded-full 
                               text-sm cursor-pointer font-medium transition-all duration-300 hover:bg-indigo-300">
                    More Doctors..
                </button>
            </div>
        </div>
    );
};

export default Topdoctor;
