import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'

const AllApoitment = () => {
  const { atoken, getAppointments } = useContext(AdminContext)
  useEffect(() => {
    if (atoken) {
      getAppointments()
    }
  }, [atoken])
  return (
    <>
      <div>
        <p>all appointment</p>
        <div>
          <div>
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>fee</p>
            <p>Action</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllApoitment
