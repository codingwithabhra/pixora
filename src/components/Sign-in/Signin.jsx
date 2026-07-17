import React from "react";
import "./signin.css";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post("https://pixora-backend-smoky.vercel.app/auth/google", 
        {
           id_token: credentialResponse.credential,
        }
    );

      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signinBg d-flex align-items-center justify-content-center">
      <div
        className="card overflow-hidden m-4"
        style={{ maxWidth: "900px", width: "100%" }}
      >
        <div className="row">
          <div className="img col-md-8">
            <img src="/signinBg.jpg" alt="image" className="w-100 h-100" />
          </div>
          <div className="content col-md-4 my-2 px-3 d-flex justify-content-center align-items-center flex-column">
            <img
              src="/pixora-icon.png"
              alt="Pixora"
              style={{ maxWidth: "10rem" }}
              className="d-block m-auto"
            />
            <div className="google p-4 w-100">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.log("Login Failed")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
