import React, { useEffect } from "react";
import "./GalleryCards.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from "../albumSlice";

const GalleryAlbum = () => {
  const dispatch = useDispatch();

  const { albums } = useSelector((state) => state.albums);
  console.log(albums);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  return (
    <div className="gallery-grid-item">
      <Link to="/albums" className="text-decoration-none">
        <div className="gallery-card">
          <h5 className="gallery-title fs-5">
            Albums
            <span>({albums.length})</span>
          </h5>
          <div className="preview-grid">
            {albums.length === 0 ? (
              <p className="text-white text-center mt-5">No album</p>
            ) : (
              albums.slice(0, 4).map((album) => (
                <Link
                  className="album-preview text-decoration-none"
                  key={album._id}
                  to="/albums"
                >
                  {album.previewImages.length > 0 ? (
                    <img
                      src={album.previewImages[0].filePath}
                      alt={album.name}
                    />
                  ) : (
                    <img src="/folder.png" alt="folder" />
                  )}

                  <p className="album-preview-name">{album.name}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GalleryAlbum;
