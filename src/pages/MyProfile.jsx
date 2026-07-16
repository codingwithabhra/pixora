import React from 'react'
import SideNav from '../components/Sidebar/SideNav'
import Myprofile from '../components/myprofile/Myprofile'

const MyProfile = () => {
  return (
    <main className="d-flex">
      <div className="leftSide d-none d-lg-block">
        <SideNav />
      </div>
      <div className="rightSide p-4" style={{ flex: "1" }}>
        <div className="container-fluid">
          <Myprofile />
        </div>
      </div>
    </main>
  )
}

export default MyProfile
