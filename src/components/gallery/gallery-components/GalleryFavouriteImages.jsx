import React from "react";
import "./GalleryCards.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavouriteImages } from "../../albumdetails/imageSlice";
import { useEffect } from "react";

const GalleryFavouriteImages = () => {
  const dispatch = useDispatch();

  const { images } = useSelector((state) => state.images);
  //   console.log(images);

  const favImages = images.filter((img) => img.isFavourite !== false);
  // console.log(favImages);

  useEffect(() => {
    dispatch(fetchFavouriteImages());
  }, [dispatch]);

  return (
    <div className="gallery-grid-item">
      <Link to="/photos" className="text-decoration-none">
        <div className="gallery-card">
          <h5 className="gallery-title fs-5">
            Favourites
            <span>({images.length})</span>
          </h5>
          <div className="preview-grid">
            {favImages.slice(0, 4).map((image) => (
              <Link
                key={image._id}
                className="preview-item text-decoration-none"
                to="/favourites"
              >
                <img src={image.filePath} alt="" />
              </Link>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GalleryFavouriteImages;
