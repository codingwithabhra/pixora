import React from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import MobileSideNav from "./MobileSideNav";
import { Link } from "react-router-dom";

const MobileHeader = () => {
  return (
    <>
    <nav className="navbar navbar-dark bg-dark d-lg-none px-1">
      <Link className="d-flex align-items-center text-decoration-none" to="/home">
        <img src="/sideNavLogo.png" width="55" alt="" className="me-2" />

        <h5 className="text-white mb-0">Pixora</h5>
      </Link>

      <button
        className="btn btn-outline-light"
        data-bs-toggle="offcanvas"
        data-bs-target="#mobileSidebar"
      >
        <HiOutlineMenuAlt3 size={24} />
      </button>
    </nav>

    <MobileSideNav />
    </>
  );
};

export default MobileHeader;
