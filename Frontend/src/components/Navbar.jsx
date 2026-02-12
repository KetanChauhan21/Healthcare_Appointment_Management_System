import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
    const navigate = useNavigate();
    const [showmenu, setShowmenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const { token, setToken, userData } = useContext(AppContext)

    const logOut = () => {
        setToken(false);
        localStorage.removeItem('token');
    }

    const handledropdown = () => {
        setShowDropdown(!showDropdown);

        setTimeout(() => {
            setShowDropdown(false);
        }, 3000);
    };

    return (
        <>
            <div className="flex items-center fixed justify-between text-base py-4 px-6 md:px-12 lg:px-20 border-b border-gray-300 shadow-md bg-white top-0 left-0 w-full z-50">
                <img
                    onClick={() => setShowmenu(true)}
                    src={assets.menu_icon}
                    className="w-6 cursor-pointer md:hidden"
                    alt="Menu"
                />

                {/* Logo */}
                <img
                    className="w-24 h-24 cursor-pointer hover:scale-110 transition-transform duration-300 hidden md:block"
                    src={assets.logo}
                    onClick={() => { navigate("/"); scrollTo(0, 0) }}
                    alt="Logo"
                />

                {/* Desktop Navigation */}
                <ul className="hidden md:flex gap-8 items-center font-medium text-gray-700">
                    {[
                        { name: "Home", path: "/" },
                        { name: "All Doctors", path: "/alldoctor" },
                        { name: "About", path: "/about" },
                        { name: "Contact", path: "/contact" }
                    ].map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) => `relative py-1 transition duration-300 ${isActive ? "text-blue-600" : "hover:text-blue-600"}`}
                        >
                            {item.name}
                            <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 hover:w-full"></span>
                        </NavLink>
                    ))}
                </ul>

                {/* Profile & Login Section */}
                <div className="flex items-center gap-6">
                    {token && userData ? (
                        <div className="relative cursor-pointer">
                            {/* Profile Image */}
                            <div className="flex items-center gap-2">
                                <img className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-lg" src={userData.image} alt="Profile" />
                                <img
                                    className={`w-4 transition-transform duration-300 ${showDropdown ? "rotate-180" : ""}`}
                                    src={assets.dropdown_icon}
                                    alt="Dropdown"
                                    onClick={handledropdown}
                                />
                            </div>

                            {/* Dropdown Menu (Toggle Visibility) */}
                            {showDropdown && (
                                <div className="absolute top-14 right-0 bg-white shadow-lg rounded-lg w-48 py-2 text-gray-700 z-50 border border-gray-200">
                                    <button onClick={() => { navigate("/my-profile"); scrollTo(0, 0) }} className="px-4 py-3 hover:bg-gray-100 hover:text-blue-600 cursor-pointer transition rounded-t-lg">My Profile</button>
                                    <button onClick={() => { navigate("/my-appointment"); scrollTo(0, 0) }} className="px-4 py-3 hover:bg-gray-100 hover:text-blue-600 cursor-pointer transition">My Appointment</button>
                                    <button onClick={logOut} className="px-4 py-3 text-red-500 hover:bg-red-100 cursor-pointer transition rounded-b-lg">Logout</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => { navigate("/login"); scrollTo(0, 0) }}
                            className="bg-blue-500 text-white px-6 py-2 cursor-pointer rounded-full shadow-lg hover:bg-blue-600 transition duration-300 block md:block"
                        >
                            Create Account
                        </button>
                    )}

                    {/* Mobile Menu */}
                    <div className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-lg transition-transform duration-300 z-50 ${showmenu ? "translate-x-0" : "-translate-x-full"}`}>
                        {/* Mobile Menu Header */}
                        <div className="flex justify-between items-center p-5 border-b">
                            <img
                                onClick={() => setShowmenu(false)}
                                src={assets.cross_icon}
                                className="w-6 cursor-pointer"
                                alt="Close"
                            />
                        </div>

                        {/* Mobile Navigation Links */}
                        <ul className="flex flex-col mt-4 text-gray-700">
                            {[
                                { name: "Home", path: "/" },
                                { name: "All Doctors", path: "/alldoctor" },
                                { name: "About", path: "/about" },
                                { name: "Contact", path: "/contact" }
                            ].map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={item.path}
                                    className={({ isActive }) => `block px-6 py-3 text-lg font-medium transition ${isActive ? "text-blue-600" : "hover:bg-gray-100"}`}
                                    onClick={() => { setShowmenu(false); scrollTo(0, 0) }}
                                >
                                    <p>{item.name}</p>
                                </NavLink>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
