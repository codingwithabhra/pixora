import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../signin.css";

const TopContent = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "https://pixora-backend-self.vercel.app/auth/google",
        {
          id_token: credentialResponse.credential,
        },
      );

      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="tagline">
      <div className="logo">
        <img src="/pixora-icon.png" alt="" style={{maxWidth:"6rem"}} />
      </div>
      <div className="taglineText">
        <h1>
          Store Every Moment, <br />
          <span>Share Every Story</span>
        </h1>
        <div className="google py-2">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => console.log("Login Failed")}
            className="button"
          />
        </div>
      </div>
    </div>
  );
};

export default TopContent;
