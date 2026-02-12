import React, { use, useContext, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctor = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState([]);
  const [showFilter, setshowFilter] = useState(false);
  const pRefs = useRef([]);

  const { doctors, getdoctordata } = useContext(AppContext);

  const filterApply = () => {
    if (speciality) {
      setFilter(doctors.filter((doctor) => doctor.speciality === speciality));
    } else {
      setFilter(doctors);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  useEffect(() => {
    filterApply();
  }, [doctors, speciality]);

  const handleClick = (index, spec) => {
    pRefs.current.forEach((p, i) => {
      if (p) p.classList.remove('bg-indigo-300', 'text-black');
    });

    if (pRefs.current[index]) {
      pRefs.current[index].classList.add('bg-indigo-300', 'text-black');
    }

    speciality === spec ? navigate('/alldoctor') : navigate(`/alldoctor/${spec}`);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="md:col-span-1 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Specialties</h2>
            <div className="space-y-3">
              <button className={`p-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'text-black bg-blue-500' : null}`} onClick={() => setshowFilter(prev => !prev)}>Filters</button>
              <p ref={(el) => (pRefs.current[0] = el)} onClick={() => handleClick(0, '')} className={`bg-blue-100 px-4 py-2 ${showFilter ? 'flex' : 'hidden sm:flex'} w-full rounded-md text-center justify-center text-gray-600 hover:bg-blue-200 cursor-pointer transition`}>
                All
              </p>
              {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec, index) => (
                <>
                  <div className={`${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    <p ref={(el) => (pRefs.current[index + 1] = el)} key={index} onClick={() => handleClick(index + 1, spec)} className="bg-blue-100 px-4 py-2 w-full rounded-md text-center text-gray-600 hover:bg-blue-200 cursor-pointer transition">
                      {spec}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filter.map((item) => (
              <div key={item._id} className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <img className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-full mb-4" src={item.image} alt={item.name} />
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <p className="text-sm font-medium text-green-600">Available</p>
                  </div>
                  <p className="text-lg font-semibold text-gray-700">{item.name}</p>
                  <p className="text-gray-500 text-sm">{item.speciality}</p>
                </div>
                <button onClick={() => navigate(`/appointment/${item._id}`)} className="mt-4 bg-blue-500 text-white px-5 py-2 rounded-full text-sm cursor-pointer font-medium transition-all duration-300 hover:bg-blue-600">
                  Appoitment
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor;
