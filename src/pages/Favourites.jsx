import React from "react";
import SideNav from "../components/Sidebar/SideNav";
import Favouritepics from "../components/favourites/Favouritepics";
import MobileHeader from "../components/Sidebar/MobileHeader";

const Favourites = () => {
  return (
    <>
    <MobileHeader />
    
    <main className="d-flex">
      <div className="leftSide d-none d-lg-block">
        <SideNav />
      </div>
      <div className="rightSide p-4" style={{ flex: "1" }}>
        <div className="container-fluid">
          <Favouritepics />
        </div>
      </div>
    </main>
    </>
  );
};

export default Favourites;
