import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../Context/AdminContext';

const Navbar = () => {
    const { aToken, setAtoken } = useContext(AdminContext);
    const logOut = () => {
        aToken && setAtoken('')
        aToken && localStorage.removeItem('admintoken')
    }
    
    return (
        <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
            <div className="flex items-center gap-3">
                <img src={assets.admin_logo} alt="Admin Logo" className="h-10 w-auto" />
                <p className="text-xl items-center font-semibold text-gray-800 border-gray-400 pb-1 border rounded-full px-2">
                    {aToken ? 'Admin' : 'Doctor'}
                </p>
            </div>
            <button onClick={logOut} className="px-4 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition duration-300">
                LogOut
            </button>
        </div>
    );
};

export default Navbar;
