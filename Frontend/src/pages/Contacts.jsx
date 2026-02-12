import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for Toastify

const Contacts = () => {
  // Setting up state for form inputs
  const [data, setData] = useState({
    Name: '',
    Email: '',
    Message: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can process the form submission
    console.log('Form submitted with data:', data);

    // Displaying the success toast
    toast.success('Your message has been sent successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000, // Duration for the toast to disappear
    });

    // After submission, you can reset the form if needed
    setData({
      Name: '',
      Email: '',
      Message: '',
    });
  };

  return (
    <div className="container mx-auto px-6 py-12 bg-white shadow-lg rounded-2xl">
      {/* Page Title */}
      <div className="text-center text-3xl md:text-4xl font-bold text-gray-800">
        <p>
          Contact <span className="text-blue-600">Us</span>
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center gap-12 mt-10">
        {/* Left Section - Image */}
        <div className="md:w-1/2">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full max-h-80 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Right Section - Contact Information */}
        <div className="md:w-1/2 space-y-6 text-gray-700">
          {/* Office Details */}
          <div>
            <p className="text-2xl font-bold text-blue-600">Our Office</p>
            <p className="text-lg leading-relaxed mt-2">
              <span className="font-semibold">42K12L Wellness Station</span> <br />
              Suite 340, Washington, USA
            </p>
            <p className="text-lg mt-2">
              <span className="font-semibold">Tel:</span> (231) 2113 3223 <br />
              <span className="font-semibold">Email:</span> support@doctorguider.com
            </p>
          </div>

          {/* Careers Section */}
          <div>
            <p className="text-2xl font-bold text-blue-600">Careers at DoctorGuider</p>
            <p className="text-lg leading-relaxed mt-2">
              Looking to make an impact in the healthcare industry? Join our team and help
              revolutionize the way patients connect with doctors. Check out our latest job openings.
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="mt-12 text-center">
        <p className="text-2xl font-bold text-blue-600">Get in Touch</p>
        <p className="text-lg text-gray-700 mt-2">
          Have questions or need assistance? Fill out the form below, and we'll get back to you as soon as possible.
        </p>

        <div className="mt-6 max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="Name"
              placeholder="Your Name"
              value={data.Name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <input
              type="email"
              name="Email"
              placeholder="Your Email"
              value={data.Email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <textarea
              name="Message"
              rows="4"
              placeholder="Your Message"
              value={data.Message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
            <button
              type="submit"
              className="w-full px-6 py-3 cursor-pointer bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Contacts;
