import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Navbar />
      <div className='mx-3 pt-36 sm:mx-[6%]'>
        <Outlet />
      </div>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default App