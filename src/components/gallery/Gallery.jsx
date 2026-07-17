import React from "react";
import "./Gallery.css";
import GalleryAlbum from "./gallery-components/GalleryAlbum";
import GalleryAllPhotos from "./gallery-components/GalleryAllPhotos";
import GalleryFavouriteImages from "./gallery-components/GalleryFavouriteImages";
import GallerySharedWithMe from "./gallery-components/GallerySharedWithMe";

const Gallery = () => {
  return (
    <div className="gallery">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="text-white fw-bold mt-2">Gallery</h1>
      </div>
      <hr style={{ color: "white", height: "1px" }} />

      {/* CONTENT */}
      <div className="row g-4 mt-1 photos-scroll">
        <GalleryAlbum />

        <GalleryAllPhotos />

        <GalleryFavouriteImages />

        <GallerySharedWithMe />
      </div>
    </div>
  );
};

export default Gallery;
