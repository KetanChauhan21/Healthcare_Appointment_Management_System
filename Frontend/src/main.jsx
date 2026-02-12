import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Doctor from './pages/Doctor.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import Contacts from './pages/Contacts.jsx'
import MyProfile from './pages/MyProfile.jsx'
import MyAppoitments from './pages/MyAppoitments.jsx'
import Appoitments from './pages/Appoitments.jsx'
import AppContextProvider from './context/AppContext.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='/alldoctor' element={<Doctor />} />
      <Route path='/alldoctor/:speciality' element={<Doctor />} />
      <Route path='/login' element={<Login />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contacts />} />
      <Route path='/my-profile' element={<MyProfile />} />
      <Route path='/my-appointment' element={<MyAppoitments />} />
      <Route path='/appointment/:docId' element={<Appoitments />} />
    </Route >
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>,
)
