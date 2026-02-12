import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedDoctor from "../components/RelatedDoctor";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";


const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencysymble, getdoctordata, backendurl, token } = useContext(AppContext);
  const daysofweeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigate = useNavigate();

  const usertoken = token

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);

  const bookappointment = async () => {
    if (!token) {
      toast.warn('Please login to book an appointment')
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/login')
      return;
    }
    try {
      const date = docSlots[selectedDayIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(backendurl + '/api/user/book-appointment', { docId, slotDate, slotTime: selectedSlot }, { headers: { usertoken } })
      if (data.success) {
        toast.success(data.message)
        getdoctordata()
        navigate('/my-appointment')
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDocInfo();
    console.log(docSlots)
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  const fetchDocInfo = async () => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setDocInfo(doctor);
    setLoading(false);
  };

  const getAvailableSlots = async () => {
    let slotsByDay = [];
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      let startTime = new Date(currentDate);
      if (today.getDate() === currentDate.getDate()) {
        startTime.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        startTime.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        startTime.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (startTime < endTime) {
        let formattedTime = startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime
        const isSlotAvailable = docInfo.slot_booked[slotDate] && docInfo.slot_booked[slotDate].includes(slotTime) ? false : true;

        if (isSlotAvailable) {
          timeSlots.push({ datetime: new Date(startTime), time: formattedTime });
        }

        startTime.setMinutes(startTime.getMinutes() + 30);
      }
      slotsByDay.push(timeSlots);
    }
    setDocSlots(slotsByDay);
  };
  // console.log(docSlots)

  if (loading) return <p className="text-center text-lg">Loading...</p>;

  return (
    docInfo && (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <ToastContainer />
        {/* Doctor Information Section */}
        <div className="w-full max-w-5xl bg-white p-8 rounded-xl shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="md:w-1/3 flex justify-center">
              <img
                className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-blue-500 shadow-md"
                src={docInfo.image}
                alt={docInfo.name}
              />
            </div>
            <div className="md:w-2/3 space-y-4 text-center md:text-left">
              <p className="text-3xl font-bold text-gray-800 flex items-center gap-2 justify-center md:justify-start">
                {docInfo.name}
                <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-600">
                <p className="bg-gray-200 px-5 py-2 rounded-full font-medium text-lg">
                  {docInfo.degree} - {docInfo.speciality}
                </p>
                <button className="px-5 py-2 bg-green-500 text-white rounded-full text-lg font-medium shadow-lg">
                  {docInfo.experience} Years Experience
                </button>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
                <p className="flex items-center gap-2 font-medium text-gray-700 text-lg">
                  About <img className="w-5 h-5" src={assets.info_icon} alt="Info" />
                </p>
                <p className="text-gray-600 text-md leading-relaxed">{docInfo.about}</p>
              </div>
              <p className="text-lg font-semibold text-gray-700">
                Appointment fee: <span className="text-blue-600">
                  {docInfo.fees} {currencysymble}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Booking Slots (Days) Section */}
        <div className="w-full max-w-4xl mt-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Slots</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {docSlots?.length > 0 &&
              docSlots.map((items, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-lg cursor-pointer shadow-sm text-center font-medium ${selectedDayIndex === index
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                    }`}
                  onClick={() => setSelectedDayIndex(index)}
                >
                  <p className="text-lg  font-bold">
                    {daysofweeks[items[0].datetime.getDay()]}
                  </p>
                  <p className="text-gray-600">{items[0].datetime.getDate()}</p>
                </button>
              ))}
          </div>
        </div>

        {/* Available Time Slots Section */}
        <div className="w-full max-w-4xl mt-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Slots</h2>
          <div className="flex flex-wrap gap-4">
            {docSlots?.length > 0 &&
              docSlots[selectedDayIndex]?.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`px-4 py-2 rounded-lg shadow-sm cursor-pointer text-center font-medium border ${selectedSlot === slot.time
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {slot.time}
                </button>
              ))}
          </div>
        </div>

        <button onClick={bookappointment} className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-lg font-semibold px-16 py-3 rounded-full my-6 shadow-md transition-all duration-300">
          Book an Appointment
        </button>

        {/* listing related doctor  */}
        <div className="w-full max-w-4xl mt-12 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Doctors</h2>
          <RelatedDoctor docId={docId} Specialty={docInfo.speciality} />
        </div>

      </div>
    )
  );
};

export default Appointments;
