import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-cyan-400 to-blue-500 pt-36 h-fit mt-9 text-black py-10 px-6 md:px-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Section */}
                <div className="space-y-4">
                    <img src={assets.logo} alt="Logo" className="w-32" />
                    <p className="text-sm text-black leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea eveniet mollitia minus omnis repudiandae fugiat veniam eligendi.
                    </p>
                </div>

                {/* Center Section */}
                <div className="space-y-4">
                    <p className="text-lg font-semibold text-black">COMPANY</p>
                    <ul className="space-y-2 text-black">
                        <li className="hover:text-indigo-500 cursor-pointer transition duration-300">HOME</li>
                        <li className="hover:text-indigo-500 cursor-pointer transition duration-300">ABOUT US</li>
                        <li className="hover:text-indigo-500 cursor-pointer transition duration-300">CONTACT US</li>
                        <li className="hover:text-indigo-500 cursor-pointer transition duration-300">PRIVACY POLICY</li>
                    </ul>
                </div>

                {/* Right Section */}
                <div className="space-y-4">
                    <p className="text-lg font-semibold text-black">GET IN TOUCH</p>
                    <ul className="space-y-2 text-black">
                        <li className="hover:text-indigo-500 cursor-pointer transition duration-300">+1-212-312-981</li>
                        <li onClick={() => window.location.href = "mailto:doctorguider@gmail.com"}  className="hover:text-indigo-500 cursor-pointer transition duration-300">doctorguider@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-10 text-center text-black text-sm">
                &copy; {new Date().getFullYear()} DoctorGuider. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
