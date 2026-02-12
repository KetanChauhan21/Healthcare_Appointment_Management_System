import React, { useEffect } from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import Topdoctor from '../components/TopDoctor'
import Banner from '../components/Banner'
import { ToastContainer } from 'react-toastify'

const Home = () => {
    return (
        <div>

            <Header />
            <SpecialityMenu />
            <Topdoctor />
            <Banner />
            <ToastContainer/>
        </div>
    )
}

export default Home
