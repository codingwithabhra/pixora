import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { fetchFavouriteImages } from "../albumdetails/imageSlice";
import { Link } from "react-router-dom";
import "./Favourites.css";

const Favouritepics = () => {
  const dispatch = useDispatch();

  const { images, status } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(fetchFavouriteImages());
  }, [dispatch]);

  if (status === "loading") {
    return <h3 className="text-center text-white mt-5">Loading...</h3>;
  }

  return (
    <div className="favourites">
      <div className="header ">
        <h1 className="text-white fw-bold mt-2">Favourites</h1>
      </div>
      <hr style={{ color: "white", height: "1px" }} />

      {/* FAVOURITE IMAGES TO DISPLAY */}
      <div className="favouriteImages photos-scroll">
        <div className="row">
          {images.map((image) => (
            <div key={image._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Link
                to={`/albums/${image.albumId._id}/images/${image._id}`}
                className="text-decoration-none"
              >
                <div className="card h-100 image">
                  <img
                    src={image.filePath}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                    alt={image.name}
                  />

                  <div className="card-body content">
                    <h6>{image.name}</h6>

                    <small className="text-muted">
                      Album : {image.albumId.name}
                    </small>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favouritepics;
