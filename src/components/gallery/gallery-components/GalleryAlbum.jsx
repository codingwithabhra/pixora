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
    <div className="col-6">
      <h5 className="gallery-title">
        Albums
        <span>({albums.length})</span>
      </h5>

      <Link to="/albums" className="text-decoration-none">
        <div className="gallery-card">
          <div className="preview-grid">
            {albums.slice(0, 4).map((album) => (
              <Link className="album-preview text-decoration-none" key={album._id} to="/albums">
                {album.previewImages.length > 0 ? (
                  <img src={album.previewImages[0].filePath} alt={album.name} />
                ) : (
                  <img src="/folder.png" alt="folder" />
                )}

                <p className="album-preview-name">{album.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GalleryAlbum;
