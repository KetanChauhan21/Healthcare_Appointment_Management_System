import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AdminContext } from '../Context/AdminContext';

const Sidebar = () => {
    const { aToken } = useContext(AdminContext);

    const navLinkStyles = ({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-md transition-all duration-200 hover:bg-gray-100 ${isActive ? 'border-r-4 rounded-xs text-blue-600 font-semibold' : 'text-gray-700'
        }`;

    return (
        <>
            {aToken && (
                <div className="h-screen overflow-y-auto">
                    <ul>
                        <li>
                            <NavLink to="/admin-dashboard" className={navLinkStyles}>
                                <img src={assets.home_icon} alt="Dashboard" className="h-6 w-6" />
                                <p>Dashboard</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/all-appointment" className={navLinkStyles}>
                                <img src={assets.appointment_icon} alt="Appointment" className="h-6 w-6" />
                                <p>Appointment</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/all-doctor" className={navLinkStyles}>
                                <img src={assets.add_icon} alt="Add Doctor" className="h-6 w-6" />
                                <p>Add Doctor</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/doctor-list" className={navLinkStyles}>
                                <img src={assets.people_icon} alt="Doctor List" className="h-6 w-6" />
                                <p>Doctor List</p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Sidebar;
