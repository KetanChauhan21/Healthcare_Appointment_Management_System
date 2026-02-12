import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currencysymble = '$';
    const [doctors, setDoctor] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || false);
    const backendurl = import.meta.env.VITE_BACKEND_URL;
    const [userData, setuserdata] = useState(false);

    const getdoctordata = async () => {
        try {
            const { data } = await axios.get(`${backendurl}/api/doctor/doctors/list`);
            if (data.success) {
                setDoctor(data.Doctors);
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
            // console.log(error.message);
        }
    }
    // console.log("token is: ",token) 
    const usertoken = token;
    const loaduserprofiledata = async () => {
        try {
            if (localStorage.getItem('token') === 'undefined') {
                return;
            }
            const { data } = await axios.get(`${backendurl}/api/user/get-profile`, { headers: { usertoken } });
            // console.log(data.UserData);
            setuserdata(data.UserData);
        } catch (error) {
            // console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getdoctordata();
    }, []);

    useEffect(() => {
        if (token) {
            loaduserprofiledata();
        } else {
            setuserdata(false);
        }
    }, [token]);
    const values = {
        doctors,
        currencysymble,
        backendurl,
        getdoctordata,
        token,
        setToken,
        userData,
        setuserdata,
        loaduserprofiledata,
    };

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider; // ✅ export the provider
