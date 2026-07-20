import React from "react";
import "./GalleryCards.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSharedWithMeAlbums } from "../albumSlice";
import { useEffect } from "react";

const GallerySharedWithMe = () => {
  const dispatch = useDispatch();

  const { sharedWithMeAlbums } = useSelector((state) => state.albums);

  useEffect(() => {
    dispatch(fetchSharedWithMeAlbums());
  }, [dispatch]);

  return (
    <div className="gallery-grid-item">
      <Link to="/shared-with-me" className="text-decoration-none">
        <div className="gallery-card">
          <h5 className="gallery-title fs-5">
            Shared
            <span>({sharedWithMeAlbums.length})</span>
          </h5>
          <div className="preview-grid">
            {sharedWithMeAlbums.length > 0 ? (
              sharedWithMeAlbums.slice(0, 4).map((album) => (
                <div key={album._id} className="preview-item">
                  <img
                    src={album.previewImages?.[0]?.filePath || "/folder.png"}
                    alt={album.name}
                  />
                  <p>{album.name}</p>
                </div>
              ))
            ) : (
              <p className="text-white text-center mt-5">No Albums</p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GallerySharedWithMe;
