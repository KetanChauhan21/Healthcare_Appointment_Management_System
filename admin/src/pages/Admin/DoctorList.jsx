import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../Context/AdminContext';

const DoctorList = () => {
  const { doctors, aToken, getallDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getallDoctors();
    }
  }, [aToken]);

  return (
    <div className="p-6 bg-gray-100 h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">All Doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 object-cover rounded-full mb-4 border-4 border-blue-200"
            />
            <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
            <p className="text-sm text-gray-500">{item.speciality}</p>
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.available}
                onChange={() => changeAvailability(item._id)}
                readOnly
                className="h-5 w-5 text-green-600 cursor-pointer accent-green-500"
              />
              <span className="text-sm text-gray-700">
                {item.available ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
