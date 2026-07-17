import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlinePhoto } from "react-icons/hi2";
import { FaBook, FaRegStar } from "react-icons/fa";
import { RiFolderSharedLine, RiUserShared2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Offcanvas } from "bootstrap";

import "./MobileSideNav.css";

const MobileSideNav = () => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const closeOffcanvas = () => {
    const offcanvasEl = document.getElementById("mobileSidebar");

    if (offcanvasEl) {
      const bsOffcanvas =
        Offcanvas.getInstance(offcanvasEl) || new Offcanvas(offcanvasEl);

      bsOffcanvas.hide();
    }
  };

  return (
    <div className="offcanvas offcanvas-start mobileSidebar" id="mobileSidebar">
      <div className="offcanvas-header">
        <h2>Pixora</h2>

        <button
          className="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>

      <div className="offcanvas-body">
        {/* HOME */}

        <div className="menu-section">
          <button className="menu-title" onClick={() => toggleMenu("home")}>
            <span>Home</span>
            {/* <Link className="text-decoration-none text-white" to="/home">Home</Link> */}

            {openMenu === "home" ? (
              <MdKeyboardArrowDown />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </button>

          {openMenu === "home" && (
            <div className="submenu">
              <Link to="/home" onClick={closeOffcanvas}>
                <LuLayoutDashboard />
                Gallery
              </Link>
            </div>
          )}
        </div>

        {/* LIBRARY */}

        <div className="menu-section">
          <button className="menu-title" onClick={() => toggleMenu("library")}>
            <span>Library</span>

            {openMenu === "library" ? (
              <MdKeyboardArrowDown />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </button>

          {openMenu === "library" && (
            <div className="submenu">
              <Link to="/allphotos" onClick={closeOffcanvas}>
                <HiOutlinePhoto />
                All Photos
              </Link>

              <Link to="/albums" onClick={closeOffcanvas}>
                <FaBook />
                Albums
              </Link>

              <Link to="/favourites" onClick={closeOffcanvas}>
                <FaRegStar />
                Favourites
              </Link>
            </div>
          )}
        </div>

        {/* SHARING */}

        <div className="menu-section">
          <button className="menu-title" onClick={() => toggleMenu("sharing")}>
            <span>Sharing</span>

            {openMenu === "sharing" ? (
              <MdKeyboardArrowDown />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </button>

          {openMenu === "sharing" && (
            <div className="submenu">
              <Link to="/sharedalbums" onClick={closeOffcanvas}>
                <RiFolderSharedLine />
                Shared Albums
              </Link>

              <Link to="/shared-with-me" onClick={closeOffcanvas}>
                <RiUserShared2Line />
                Shared With Me
              </Link>
            </div>
          )}
        </div>

        {/* SETTINGS */}

        <div className="menu-section">
          <button className="menu-title" onClick={() => toggleMenu("settings")}>
            <span>Settings</span>

            {openMenu === "settings" ? (
              <MdKeyboardArrowDown />
            ) : (
              <MdKeyboardArrowRight />
            )}
          </button>

          {openMenu === "settings" && (
            <div className="submenu">
              <Link to="/my-profile" onClick={closeOffcanvas}>
                <CgProfile />
                My Profile
              </Link>

              <button className="logoutBtn" onClick={handleLogout}>
                <IoLogOutOutline />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileSideNav;
