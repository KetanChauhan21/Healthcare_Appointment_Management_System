import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../Context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

  const [docImg, setdocImg] = useState(false)
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [experience, setexperience] = useState('1 Year')
  const [fees, setfees] = useState('')
  const [about, setabout] = useState('')
  const [speciality, setspeciality] = useState('General physician')
  const [degree, setdegree] = useState('')
  const [address1, setaddress1] = useState('')
  const [address2, setaddress2] = useState('')
  const [loading, setLoading] = useState(false)

  const { backendurl, aToken } = useContext(AdminContext)

  const onSubmithandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!docImg) {
        return toast.error('Image not selected!!!')
      }

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))


      const { data } = await axios.post(backendurl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      console.log("Doctor Added succesfully!!!!")
      if (data.success) {
        toast.success(data.message)
        setdocImg(false)
        setname('')
        setemail('')
        setpassword('')
        setexperience('1 Year')
        setfees('')
        setabout('')
        setspeciality('')
        setdegree('')
        setaddress1('')
        setaddress2('')
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="h-screen w-full p-4">
        <form onSubmit={onSubmithandler} className="max-w-5xl mx-auto p-8">
          <div className="flex flex-col gap-8">
            {/* Upload Section */}
            <div className="flex items-center gap-6">
              <label htmlFor='doc-img' className="cursor-pointer">
                <img src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload Area" className="w-32 h-32 object-cover rounded-md border border-gray-300" />
              </label>
              <input onChange={(e) => setdocImg(e.target.files[0])} type="file" id='doc-img' className="hidden" />
              <p className="text-sm text-gray-600 text-center mt-2">Upload doctor<br />picture</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Section */}
              <div className="flex-1 space-y-4">
                <div>
                  <p className="font-semibold">Doctor Name</p>
                  <input onChange={(e) => setname(e.target.value)} value={name} type="text" placeholder='Name' required className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                </div>
                <div>
                  <p className="font-semibold">Doctor Email</p>
                  <input autoComplete='username' onChange={(e) => setemail(e.target.value)} value={email} type="email" placeholder='Email' required className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                </div>
                <div>
                  <p className="font-semibold">Doctor Password</p>
                  <input autoComplete='current-password' onChange={(e) => setpassword(e.target.value)} value={password} type="password" placeholder='Password' required className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                </div>
                <div>
                  <p className="font-semibold">Experience</p>
                  <select onChange={(e) => setexperience(e.target.value)} value={experience} required className="w-full border border-gray-300 rounded px-3 py-2 mt-1">
                    {[1, 2, 3, 4, 5, 7, 8, 9, 10].map(year => (
                      <option key={year} value={`${year} Year`}>{year} Year</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="font-semibold">Doctor Fees</p>
                  <input onChange={(e) => setfees(e.target.value)} value={fees} type="number" placeholder='Fees' required className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                </div>
              </div>

              {/* Right Section */}
              <div className="flex-1 space-y-4">
                <div>
                  <p className="font-semibold">Speciality</p>
                  <select onChange={(e) => setspeciality(e.target.value)} value={speciality} required className="w-full border border-gray-300 rounded px-3 py-2 mt-1">
                    {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <p className="font-semibold">Education</p>
                  <input onChange={(e) => setdegree(e.target.value)} value={degree} type="text" placeholder='Education' required className="w-full border border-gray-300 rounded px-3 py-2 mt-1" />
                </div>
                <div>
                  <p className="font-semibold">Address</p>
                  <input onChange={(e) => setaddress1(e.target.value)} value={address1} type="text" placeholder='Address1' required className="w-full border border-gray-300 rounded px-3 py-2 mt-1 mb-2" />
                  <input onChange={(e) => setaddress2(e.target.value)} value={address2} type="text" placeholder='Address2' required className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div>
              <p className="font-semibold">About Us</p>
              <textarea onChange={(e) => setabout(e.target.value)} value={about} placeholder='Write about doctor' rows={5} className="w-full border border-gray-300 rounded px-3 py-2 mt-1 resize-none" required></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold self-start"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Add Doctor'}
            </button>

          </div>
        </form>
      </div>
    </>
  )
}

export default AddDoctor
