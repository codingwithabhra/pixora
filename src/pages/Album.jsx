import React from "react";
import SideNav from "../components/Sidebar/SideNav";
import Albums from "../components/albums/Albums";
import MobileHeader from "../components/Sidebar/MobileHeader";

const Album = () => {
  return (
    <>
      <MobileHeader />
      
      <main className="d-flex">
        <div className="leftSide d-none d-lg-block">
          <SideNav />
        </div>
        <div className="rightSide p-4" style={{ flex: "1" }}>
          <div className="container-fluid">
            <Albums />
          </div>
        </div>
      </main>
    </>
  );
};

export default Album;
