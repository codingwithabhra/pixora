import React from 'react'
import SideNav from '../components/Sidebar/SideNav'
import Imagedetails from '../components/imagedetails/Imagedetails'

const ImageDetails = () => {
  return (
    <main className="d-flex">
      <div className="leftSide d-none d-lg-block">
        <SideNav />
      </div>
      <div className="rightSide p-4" style={{ flex: "1" }}>
        <div className="container-fluid">
          <Imagedetails />
        </div>
      </div>
    </main>
  )
}

export default ImageDetails
