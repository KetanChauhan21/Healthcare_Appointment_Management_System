import axios from "axios";
import { createContext, useState } from "react";
import { toast } from 'react-toastify'

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [doctors, setDoctors] = useState([])
    const [atoken, setAtoken] = useState(localStorage.getItem('admintoken') ? localStorage.getItem('admintoken') : '')
    const [appointments, setAppointments] = useState([])
    const backendurl = import.meta.env.VITE_BAKCEND_URL

    const getallDoctors = async () => {
        try {
            const { data } = await axios.post(backendurl + '/api/admin/all-doctors', {}, { headers: { atoken } })
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability = async (docID) => {
        try {
            const { data } = await axios.post(backendurl + '/api/admin/change-availabilty', { docID }, { headers: { atoken } })
            if (data.success) {
                toast.success(data.message)
                getallDoctors()
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAppointments = async () => {
        try {
            const { data } = await axios.post(backendurl + '/api/admin/all-appointments', { headers: { atoken } })
            if (data.success) {
                setAppointments(data.appointment)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        atoken, setAtoken,
        backendurl, doctors, getallDoctors, changeAvailability
        , getAppointments , appointments
    }
    return (
        <>
            <AdminContext.Provider value={value}>
                {props.children}
            </AdminContext.Provider>
        </>
    )
}

export default AdminContextProvider
