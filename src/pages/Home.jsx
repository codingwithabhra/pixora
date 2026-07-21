import React from "react";
import SideNav from "../components/Sidebar/SideNav";
import Gallery from "../components/gallery/Gallery";
import MobileHeader from "../components/Sidebar/MobileHeader";

const Home = () => {
  return (
    <>
      <MobileHeader />
      <main className="d-flex align-items-stretch">
        <div className="leftSide d-none d-lg-block">
          <SideNav />
        </div>
        <div className="rightSide flex-grow-1 py-4">
          <div className="container-fluid">
            <Gallery />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
