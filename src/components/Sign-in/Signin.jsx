import React, { useState, useEffect } from "react";
import "./signin.css";
import ImageSlider from "./imageslider/imageSlider";
import TopContent from "./Top-content/TopContent";
import FeatureList from "./FeatureList";



const Signin = () => {
  return (
    <div className="signinBg container-fluid">
      <div className="d-block m-auto" style={{ maxWidth: "1200px" }}>
        {/* HEADER */}
        <div className="header">
          <div className="topContent">
            <TopContent />
          </div>

          <div className="imgSlider">
            <ImageSlider />
          </div>
        </div>

        {/* FEATURE LIST SECTION */}
        <div>
          <FeatureList />
        </div>
      </div>
    </div>
  );
};

export default Signin;
