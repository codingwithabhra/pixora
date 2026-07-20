import React, { useEffect } from "react";
import "./GalleryCards.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMyPhotos } from "../../albumdetails/imageSlice";

const GalleryAllPhotos = () => {
  const dispatch = useDispatch();

  const { images } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(fetchAllMyPhotos());
  }, [dispatch]);

  return (
    <div className="gallery-grid-item">
      <Link to="/photos" className="text-decoration-none">
        <div className="gallery-card">
          <h5 className="gallery-title fs-5">
            All
            <span>({images.length})</span>
          </h5>
          <div className="preview-grid">
            {images.length === 0 ? (
              <p className="text-white text-center mt-5">No photo</p>
            ) : (
              images.slice(0, 4).map((image) => (
                <Link
                  key={image._id}
                  className="preview-item text-decoration-none"
                  to="/allphotos"
                >
                  <img src={image.filePath} alt="" />
                </Link>
              ))
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GalleryAllPhotos;
