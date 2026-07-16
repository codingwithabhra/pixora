import React from 'react'
import Allphotos from '../components/Allphotos/Allphotos'
import SideNav from '../components/Sidebar/SideNav'

const AllPhotos = () => {
  return (
    <main className="d-flex">
      <div className="leftSide d-none d-lg-block">
        <SideNav />
      </div>
      <div className="rightSide p-4" style={{ flex: "1" }}>
        <div className="container-fluid">
          <Allphotos />
        </div>
      </div>
    </main>
  )
}

export default AllPhotos
