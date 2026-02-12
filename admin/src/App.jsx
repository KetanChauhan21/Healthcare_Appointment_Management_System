import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './Context/AdminContext';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { Outlet } from 'react-router-dom';
const App = () => {
  const { aToken } = useContext(AdminContext)
  return (
    <>
      {aToken ? (
        <div className='bg-[#f8f4f4]'>
          <Navbar />
          <div className='flex min-h-screen items-start'>
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-4">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Login />
      )}
      <ToastContainer />
    </>
  )
}

export default App
