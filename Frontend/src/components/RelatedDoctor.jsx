import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctor = ({ Specialty, docId }) => {
    const { doctors } = useContext(AppContext);
    const [relDoc, setRelDoc] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (doctors.length > 0 && Specialty) {
            const doctorsData = doctors.filter((doc) => doc.speciality === Specialty && doc._id !== docId);
            setRelDoc(doctorsData);
        }
        // console.log('this is related doctors')
    }, [doctors, Specialty, docId]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full px-6">
            {relDoc.slice(0, 5).map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md 
                   transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                    <img
                        className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full mb-4"
                        src={item.image}
                        alt={item.name}
                    />
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            <p className="text-sm font-medium text-green-600">Available</p>
                        </div>
                        <p className="text-lg font-semibold text-gray-700">{item.name}</p>
                        <p className="text-gray-500 text-sm">{item.speciality}</p>
                    </div>
                    <button
                        onClick={() => navigate(`/appointment/${item._id}`)}
                        className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-full 
                               text-sm cursor-pointer font-medium transition-all duration-300 hover:bg-blue-600"
                    >
                        Select
                    </button>
                </div>
            ))}
        </div>
    );
};

export default RelatedDoctor;
