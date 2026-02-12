import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <>
      {/* About Us Section */}
      <div className="container mx-auto px-6 py-12 border-4 border-blue-500 rounded-2xl shadow-xl bg-white">
        {/* Title */}
        <div className="text-center mb-8">
          <p className="text-3xl md:text-4xl font-bold text-gray-800">
            About <span className="text-blue-600">Us</span>
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Part - Image */}
          <div className="md:w-1/3">
            <img
              src={assets.about_image}
              alt="About us"
              className="w-full max-h-72 object-cover rounded-lg border-2 border-gray-300 shadow-md"
            />
          </div>

          {/* Right Part - Text Content */}
          <div className="md:w-2/3 space-y-6 text-gray-700">
            <p className="text-lg leading-relaxed">
              Welcome to <span className="font-semibold text-blue-600">MediCare</span>, your trusted platform for hassle-free doctor appointments.
              Our mission is to connect patients with experienced doctors seamlessly, ensuring timely healthcare access with ease.
            </p>

            <p className="text-lg leading-relaxed">
              We understand the importance of healthcare and how frustrating it can be to find the right doctor.
              With our platform, you can book appointments anytime, anywhere, without waiting in long queues.
              Whether you need a general consultation, a specialist visit, or online telemedicine services, we’ve got you covered.
            </p>

            {/* Vision Section */}
            <div>
              <p className="text-2xl font-bold text-blue-600">Our Vision</p>
              <p className="text-lg leading-relaxed">
                At <span className="font-semibold text-blue-600">MediCare</span>, we aim to revolutionize healthcare accessibility by providing 
                a user-friendly and efficient system that empowers both doctors and patients. Our vision is to create a world where medical assistance 
                is just a click away, ensuring better health outcomes for everyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container mx-auto px-6 py-12 mt-12 shadow-xl bg-white">
        {/* Title */}
        <div className="text-start mb-8">
          <p className="text-3xl md:text-4xl font-bold text-gray-800">
            Why <span className="text-green-600">Choose Us</span>
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <b className="text-xl text-green-600">Efficiency</b>
            <p className="text-lg text-gray-700 mt-2">
              Our smart scheduling system ensures that appointments are booked and managed efficiently,
              reducing waiting times and allowing patients to get medical help when they need it most.
            </p>
          </div>

          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <b className="text-xl text-green-600">Convenience</b>
            <p className="text-lg text-gray-700 mt-2">
              Book appointments anytime, from anywhere, without the need to visit a hospital in person.
              Our platform also offers reminders and telemedicine options for a seamless experience.
            </p>
          </div>

          <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <b className="text-xl text-green-600">Personalization</b>
            <p className="text-lg text-gray-700 mt-2">
              Get tailored healthcare recommendations based on your preferences and medical history.
              Our AI-driven system helps match you with the best doctors for your specific needs.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
