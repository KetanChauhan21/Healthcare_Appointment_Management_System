import React, { useState, useContext, use } from 'react'
import { AppContext } from '../context/AppContext'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const navigate = useNavigate()

  const { backendurl, token, setToken } = useContext(AppContext)

  const onSubmitButton = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendurl + '/api/user/register', { name, email, password })
        if (!data) {
          toast.error(data.message)
        }
        if (data.success) {
          localStorage.setItem('token', data.token)
          // console.log(data)
          setToken(data.token)
          setEmail('')
          setPassword('')
          setName('')
          toast.success(data.message)
          setState('Login')
        } else {
          toast.error(data.message)
        }
      }
      else {
        const { data } = await axios.post(backendurl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.Token)
          setToken(data.Token)
          setEmail('')
          setPassword('')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }
    console.log("Login button clicked")
  }

  useEffect(() => {
    if (token) {
      toast.success("Login successful")
      navigate('/')
    }
  }, [token])

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 px-4">
      <ToastContainer />
      <form onSubmit={onSubmitButton} className="bg-white p-8 rounded-lg shadow-md w-96 border border-gray-200">
        <div className="text-center mb-6">
          <p className="text-2xl font-semibold text-gray-800">{state === 'Sign Up' ? 'Create Account' : "Login"}</p>
          <p className="text-gray-600">Please {state === 'Sign Up' ? 'Create Account' : "login"} to book Appointment</p>
        </div>
        <div className="space-y-4">
          {state === "Sign Up" && <div>
            <p className="text-gray-700 font-medium">Full Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>}
          <div>
            <p className="text-gray-700 font-medium">Email</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <p className="text-gray-700 font-medium">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='on'
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button type='submit' className="w-full mt-6 py-2 cursor-pointer bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
          {state === 'Sign Up' ? 'Create Account' : "Login"}
        </button>
        <div className="text-center mt-4 text-gray-700">
          {state === "Sign Up" ? (
            <p>Already have an account? <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => setState('Login')}>Login here</span></p>
          ) : (
            <p>Create an account? <span className="text-blue-500 cursor-pointer hover:underline" onClick={() => { setEmail(''), setPassword(''), setState('Sign Up') }}>Click here</span></p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login