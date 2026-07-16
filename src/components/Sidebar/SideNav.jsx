import React from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";
import { LuLayoutDashboard } from "react-icons/lu";
import { HiOutlinePhoto } from "react-icons/hi2";
import { FaBook } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { RiFolderSharedLine } from "react-icons/ri";
import { RiUserShared2Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="sideNav p-4 h-100">
      {/* LOGO */}
      <div className="sidenavLogo">
        <img src="/sideNavLogo.png" alt="Logo" />
        <h2>Pixora</h2>
      </div>

      {/* FOR NAVIGATION LINKS */}
      <nav className="px-3">
        <ul>
          {/* HOME */}
          <li className="navLinks mb-3">
            <h5 className="mb-0">Home</h5>
            <ul>
              <li>
                <Link className="mb-0" to="/home">
                  <span>
                    <LuLayoutDashboard />
                  </span>
                  Gallery
                </Link>
              </li>
            </ul>
          </li>

          {/* LIBRARY */}
          <li className="navLinks mb-3">
            <h5 className="mb-0">Library</h5>
            <ul>
              <li>
                <Link to="/allphotos">
                  <span>
                    <HiOutlinePhoto />
                  </span>
                  All Photos
                </Link>
              </li>
              <li>
                <Link to="/albums">
                  <span>
                    <FaBook />
                  </span>
                  Albums
                </Link>
              </li>
              <li>
                <Link to="/favourites">
                  <span>
                    <FaRegStar />
                  </span>
                  Favourites
                </Link>
              </li>
            </ul>
          </li>

          {/* SHARED */}
          <li className="navLinks">
            <h5 className="mb-0">Sharing</h5>
            <ul>
              <li>
                <Link to="/sharedalbums">
                  <span>
                    <RiFolderSharedLine />
                  </span>
                  Shared Albums
                </Link>
              </li>
              <li>
                <Link to="/shared-with-me">
                  <span>
                    <RiUserShared2Line />
                  </span>
                  Shared with me
                </Link>
              </li>
            </ul>
          </li>

          <hr className="mt-5" style={{ height: "1.5px", color: "White" }} />

          {/* SETTINGS */}
          <li className="navLinks mb-3">
            <h5 className="mb-0">Settings</h5>
            <ul>
              <li>
                <Link className="mb-0" to="/my-profile">
                  <span>
                    <CgProfile />
                  </span>
                  My Profile
                </Link>
              </li>
              <li>
                <Link className="mb-0" onClick={handleLogout}>
                  <span>
                    <IoLogOutOutline />
                  </span>
                  Log Out
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNav;
