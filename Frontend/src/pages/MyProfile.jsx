import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from '../assets/assets'
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import imageCompression from 'browser-image-compression';

const MyProfile = () => {
  const { userData, setuserdata, backendurl, token, loaduserprofiledata } = useContext(AppContext)


  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const usertoken = token;

  const updateUserProfileData = async () => {
     try {
      const formdata = new FormData();
      formdata.append('name', userData.name);
      formdata.append('phone', userData.phone);
      formdata.append('address', JSON.stringify(userData.address));
      formdata.append('gender', userData.gender);
      formdata.append('email', userData.email);
      formdata.append('dob', userData.dob);
      image && formdata.append('image', image)

      const { data } = await axios.post(`${backendurl}/api/user/update-profile`, formdata, { headers: { usertoken } });
      if (data.success) {
        toast.success(data.message);
        await loaduserprofiledata();
        setIsEdit(false)
        setImage(false)
      }
      else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(file, options);
      setImage(compressedFile);
    } catch (error) {
      toast.error("Image compression failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setuserdata((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  return userData && (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gray-100 p-6">
      {/* Profile Section */}
      <ToastContainer />
      <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <div className="flex flex-col items-center text-center">
          {isEdit ? <label>
            <div className="inline-block relative cursor-pointer">
              <img className="w-56 rounded opacity-95" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img
                className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-1 shadow-md"
                src={assets.upload_icon}
                alt="Upload Icon"
              />
            </div>
            <input onChange={handleImageUpload} type="file" id="image" />
          </label> : <img className="w-36 rounded" src={userData.image} />}
          <div className="mt-4">
            {isEdit ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-xl font-semibold text-gray-800">
                {userData.name}
              </p>
            )}
          </div>
        </div>

        <hr className="my-4" />

        <div className="text-left">
          <p className="text-lg font-semibold text-gray-700">
            Contact Information
          </p>
          <div className="mt-2 space-y-2">
            <div className="text-gray-600">
              <span className="font-medium">Email:</span>
              {isEdit ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="ml-2">{userData.email}</span>
              )}
            </div>
            <div className="text-gray-600">
              <span className="font-medium">Phone:</span>
              {isEdit ? (
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="ml-2">{userData.phone}</span>
              )}
            </div>
            <div className="text-gray-600">
              <span className="font-medium">Address:</span>
              {isEdit ? (
                <>
                  <input
                    type="text"
                    name="line1"
                    value={userData.address.line1}
                    onChange={handleAddressChange}
                    className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="line2"
                    value={userData.address.line2}
                    onChange={handleAddressChange}
                    className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                </>
              ) : (
                <div>
                  <span className="ml-2">{userData.address.line1}</span>
                  <span className="ml-2">{userData.address.line2}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div>
          <span className="text-xl font-semibold text-gray-700">Basic Information</span>
          <div className="mt-2 space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Gender:</span>
              {isEdit ? (
                <select
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                  className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <span className="ml-2">{userData.gender}</span>
              )}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Date of Birth:</span>
              {isEdit ? (
                <input
                  type="date"
                  name="dob"
                  value={userData.dob}
                  onChange={handleChange}
                  className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span className="ml-2">{userData.dob}</span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          {
            isEdit ? (
              <button
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={updateUserProfileData}
              >
                Save Information
              </button>
            ) : (
              <button
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
                onClick={() => setIsEdit(true)}
              >
                Edit
              </button>
            )
          }
        </div>

      </div>

      <div className="w-full lg:w-2/3 bg-white p-6 mt-6 lg:mt-0 lg:ml-6 rounded-lg shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-600">Hello!</h2>
        <p className="text-lg leading-relaxed mt-2 text-gray-700">
          I'm <span className="text-blue-600 font-bold">{userData.name}</span>, a passionate and dedicated individual who thrives on continuous learning and innovation.
          With a strong interest in technology and problem-solving, I am always looking for ways to improve and create meaningful solutions.
          I believe in the power of persistence, creativity, and collaboration to drive success. My goal is to leverage my skills to make a positive impact,
          whether through coding, design, or leadership. I am excited about new challenges, eager to learn, and always striving for excellence in everything I do.
        </p>
      </div>
    </div >
  );
};

export default MyProfile;
