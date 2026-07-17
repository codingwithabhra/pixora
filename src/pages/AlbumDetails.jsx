import React from 'react'
import Albumdetails from '../components/albumdetails/Albumdetails'
import SideNav from '../components/Sidebar/SideNav'
import MobileHeader from '../components/Sidebar/MobileHeader'

const AlbumDetails = () => {
  return (
    <>
    <MobileHeader />
    
    <main className="d-flex">
      <div className="leftSide d-none d-lg-block">
        <SideNav />
      </div>
      <div className="rightSide p-4" style={{ flex: "1" }}>
        <div className="container-fluid">
          <Albumdetails />
        </div>
      </div>
    </main>
    </>
  )
}

export default AlbumDetails
