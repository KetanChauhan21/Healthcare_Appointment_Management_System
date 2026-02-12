import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {
  const { doctors, backendurl, token, getdoctordata } = useContext(AppContext)
  const usertoken = token
  const [appointment, setAppointment] = useState([])
  const navigate = useNavigate()

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const convertingdate = (data) => {
    const dateArray = data?.split('_') || []
    return `${dateArray[0] || ''} ${months[+dateArray[1] || 0]} ${dateArray[2] || ''}`
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendurl}/api/user/appointment`, {
        headers: { usertoken },
      })
      if (data.success) {
        setAppointment(data.appointments.reverse())
      } else {
        console.log("error message:", data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { usertoken } }
      )
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getdoctordata()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    if (!import.meta.env.VITE_RAZORPAY_KEY_ID) return alert('Razorpay key is not defined')
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(
            `${backendurl}/api/user/verify-razorpay`,
            { razorpay_order_id: response.razorpay_order_id },
            { headers: { usertoken } }
          )
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointment')
          }
        } catch (error) {
          console.error(error)
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.on("payment.failed", function (response) {
      console.error("Payment Failed", response.error)
      toast.error("Payment failed. Please try again.")
    })

    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendurl}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { usertoken } }
      )
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className="max-w-6xl mx-auto px-4">
      <p className="pb-3 mt-12 font-medium text-zinc-600 border-b text-lg">
        {appointment.length <= 0 ? "No Appointments" : "My Appointments"}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {appointment.filter((item) => item.cancelled === false).map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center md:items-start text-center md:text-left border border-gray-200">
            <img
              src={item.docData.image}
              alt={item.docData.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <div className="mt-4">
              <p className="text-lg font-semibold text-gray-800 break-words">{item.docData.name}</p>
              <p className="text-sm text-gray-600 break-words">{item.docData.speciality}</p>
              <p className="text-gray-600 font-medium mt-2">Address:</p>
              <p className="text-sm text-gray-500">{item.docData.address.line1}</p>
              <p className="text-sm text-gray-500">{item.docData.address.line2}</p>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-semibold text-blue-500">Date & Time:</span> {convertingdate(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-4 w-full justify-center md:justify-start">
              {!item.cancelled && item.payment && (
                <button className='flex-1 min-w-[120px] py-2 border border-green-400 rounded-xl text-green-500 hover:bg-green-50 transition'>
                  Paid
                </button>
              )}
              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => appointmentRazorpay(item._id)}
                  className="flex-1 min-w-[120px] bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition"
                >
                  Pay Online
                </button>
              )}
              {!item.cancelled && !item.payment && (
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="flex-1 min-w-[120px] bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && (
                <button className='flex-1 min-w-[120px] py-2 border border-red-400 rounded-xl text-red-500 hover:bg-red-50 transition'>
                  Appointment Cancelled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
