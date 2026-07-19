import React from "react";
import SideNav from "../components/Sidebar/SideNav";
import Gallery from "../components/gallery/Gallery";
import MobileHeader from "../components/Sidebar/MobileHeader";

const Home = () => {
  return (
    <>
      <MobileHeader />
      <main className="d-flex">
        <div className="leftSide d-none d-lg-block h-100" style={{minHeight:"100%"}}>
          <SideNav />
        </div>
        <div className="rightSide py-4" style={{ flex: "1" }}>
          <div className="container-fluid">
            <Gallery />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
