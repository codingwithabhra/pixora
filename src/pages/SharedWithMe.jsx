import React from "react";
import SideNav from "../components/Sidebar/SideNav";
import Sharedwithme from "../components/sharedwithme/Sharedwithme";
import MobileHeader from "../components/Sidebar/MobileHeader";

const SharedWithMe = () => {
  return (
    <>
      <MobileHeader />

      <main className="d-flex">
        <div className="leftSide d-none d-lg-block">
          <SideNav />
        </div>
        <div className="rightSide p-4" style={{ flex: "1" }}>
          <div className="container-fluid">
            <Sharedwithme />
          </div>
        </div>
      </main>
    </>
  );
};

export default SharedWithMe;
