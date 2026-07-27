import React from "react";
import "../signin.css";

const TopContent = () => {

  return (
      <div className="tagline">
        <div className="logo">
          <img src="/pixora-icon.png" alt="" style={{ maxWidth: "6rem" }} />
        </div>
        <div className="taglineText">
          <h1>
            Store Every Moment, <br />
            <span>Share Every Story</span>
          </h1>
          <p className="text-white">
            Safely store, organize, and share your photos in one beautiful place. Relive your memories anytime, anywhere.
          </p>
        </div>
      </div>
  );
};

export default TopContent;
