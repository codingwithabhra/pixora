import React from "react";
import SideNav from "../components/Sidebar/SideNav";
import Sharedalbums from "../components/sharedalbums/Sharedalbums";
import MobileHeader from "../components/Sidebar/MobileHeader";

const SharedAlbums = () => {
  return (
    <>
      <MobileHeader />

      <main className="d-flex">
        <div className="leftSide d-none d-lg-block">
          <SideNav />
        </div>
        <div className="rightSide p-4" style={{ flex: "1" }}>
          <div className="container-fluid">
            <Sharedalbums />
          </div>
        </div>
      </main>
    </>
  );
};

export default SharedAlbums;
