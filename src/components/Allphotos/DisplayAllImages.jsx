import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllMyPhotos } from "../albumdetails/imageSlice";
import { Link } from "react-router-dom";
import "./Allphotos.css";

const DisplayAllImages = ({ images }) => {
  // const dispatch = useDispatch();

  // const { images, status } = useSelector((state) => state.images);

  // useEffect(() => {
  //   dispatch(fetchAllMyPhotos());
  // }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="text-center mt-5">
        <h5 className="text-white">Loading photos...</h5>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center mt-5">
        <h5 className="text-white">No photos uploaded yet.</h5>
      </div>
    );
  }

  return (
    <div className="displayAllimages">
      <div className="row pt-3">
        {images.map((image) => (
          <div className="col-lg-3 col-md-4 col-sm-4 col-4 mb-4" key={image._id}>
            <Link
              to={`/albums/${image.albumId._id}/images/${image._id}`}
              className="text-decoration-none"
            >
              <div className="card h-100 shadow-sm image">
                <img
                  src={image.filePath}
                  alt={image.name}
                  className="card-img-top"
                  style={{
                    aspectRatio: "1/1",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body content">
                  <h6>{image.name}</h6>
                  <p className="text-white mb-1">
                    <span className="fw-bold">Album :</span> {image.albumId?.name}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayAllImages;
