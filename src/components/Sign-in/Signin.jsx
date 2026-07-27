import React, { useState, useEffect } from "react";
import "./signin.css";
import ImageSlider from "./imageslider/ImageSlider";
import TopContent from "./Top-content/TopContent";
import FeatureList from "./FeatureList";
import GoogleLogIn from "./GoogleLogIn";



const Signin = () => {
  return (
    <div className="signinBg container-fluid">
      <div className="d-block m-auto" style={{ maxWidth: "1200px" }}>
        {/* HEADER */}
        <div className="header">
          <div className="topContent animate__animated animate__fadeInLeft">
            <TopContent />
          </div>

          <div className="imgSlider animate__animated animate__fadeInRightBig">
            <ImageSlider />
          </div>
        </div>

        {/* LOGIN */}
        <div className="logInBtn animate__animated animate__bounceIn">
          <GoogleLogIn />
        </div>

        {/* FEATURE LIST SECTION */}
        <div className="featureListWrapper animate__animated animate__slideInUp">
          <FeatureList />
        </div>
      </div>
    </div>
  );
};

export default Signin;
