import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './Context/AdminContext.jsx'
import DoctorContextProvider from './Context/DoctorContext.jsx'
import AppContextProvider from './Context/AppContext.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Dasbord from './pages/Admin/Dasbord.jsx'
import AllApoitment from './pages/Admin/AllApoitment.jsx'
import AddDoctor from './pages/Admin/AddDoctor.jsx'
import DoctorList from './pages/Admin/DoctorList.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />}>
      <Route path='/' element={<></>} />
      <Route path='/admin-dashboard' element={<Dasbord />} />
      <Route path='/all-appointment' element={<AllApoitment />} />
      <Route path='/all-doctor' element={<AddDoctor />} />
      <Route path='/doctor-list' element={<DoctorList />} />
    </Route >
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </StrictMode>,
)
