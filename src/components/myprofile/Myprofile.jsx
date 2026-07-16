import React from 'react'
import ProfileCard from './ProfileCard'

const Myprofile = () => {
  return (
    <div>
      <h1 className="text-white text-center fw-bold mt-4">My Profile</h1>

      <div className='d-flex justify-content-center align-items-center mt-5'>
        <ProfileCard />
      </div>
    </div>
  )
}

export default Myprofile
