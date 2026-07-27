import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signin.css";

const GoogleLogIn = () => {
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
    <div className="google py-2 d-block m-auto">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => console.log("Login Failed")}
        className="button"
      />
    </div>
  );
};

export default GoogleLogIn;
