import React from "react";
import { ImFolderUpload } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./Albums.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAlbums,
  createAlbums,
  deleteAlbumById,
} from "../gallery/albumSlice";

const Albums = () => {
  const [showModal, setShowModal] = useState(false);

  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");

  const dispatch = useDispatch();

  const { albums, status } = useSelector((state) => state.albums);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const createAlbum = async () => {
    const result = await dispatch(
      createAlbums({
        name: albumName,
        description: albumDescription,
      }),
    );
    if (createAlbums.fulfilled.match(result)) {
      toast.success(`Album "${albumName}" created successfully`);
      setAlbumName("");
      setAlbumDescription("");
      setShowModal(false);
    } else {
      toast.error(result.error.message || "Failed to create album");
    }
  };

  const handleDeleteAlbum = async (id, name) => {
    const result = await dispatch(deleteAlbumById(id));

    if (deleteAlbumById.fulfilled.match(result)) {
      toast.success(`Album "${name}" deleted successfully`);
    } else {
      toast.error(result.error.message || "Failed to delete album");
    }
  };

  return (
    <div className="albums">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="text-white fw-bold mt-2">Albums</h1>

        <button className="btn btn-light" onClick={() => setShowModal(true)}>
          <ImFolderUpload size={20} />
          <span className="ms-2 d-none d-sm-inline">Create Album</span>
        </button>
      </div>
      <hr style={{ color: "white", height: "1px" }} />

      {/* SHOW MODAL */}
      {showModal && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Create Album</h5>
              </div>

              <div className="modal-body">
                <input
                  className="form-control mb-3"
                  placeholder="Album Name"
                  value={albumName}
                  onChange={(e) => setAlbumName(e.target.value)}
                />

                <textarea
                  className="form-control"
                  placeholder="Description"
                  value={albumDescription}
                  onChange={(e) => setAlbumDescription(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={createAlbum}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONTENT */}
      <div className="photos-scroll">
        <div className="albums col-12 mt-4 ">
          <div className="row">
            {albums.length === 0 ? (
              <p className="text-white text-center mt-3 fs-4">No album found.</p>
            ) : (
              albums.map((album) => (
                <Link
                  key={album._id}
                  to={`/albums/${album._id}`}
                  className="col-md-6 mb-4 text-decoration-none"
                >
                  <div className="card album-card h-100">
                    {/* Preview Images */}

                    <div className="album-preview-row">
                      {/* Preview Images */}
                      <div className="album-preview-row">
                        {album.previewImages &&
                        album.previewImages.length > 0 ? (
                          album.previewImages.map((img, index) => {
                            const isLast = index === 3 && album.totalImages > 4;

                            return (
                              <div className="preview-item" key={index}>
                                <img src={img.filePath} alt="" />

                                {isLast && (
                                  <div className="overlay">
                                    +{album.totalImages - 4}
                                  </div>
                                )}
                              </div>
                            );
                          })
                        ) : (
                          <div
                            className="no-images d-flex justify-content-center align-items-center"
                            style={{ height: "120px" }}
                          >
                            No Images Available
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      {/* card header */}
                      <div className="cardHeader d-flex justify-content-between">
                        <div className="left">
                          <h5>{album.name}</h5>
                          <p className="fw-regular">{album.description}</p>
                        </div>
                        <div className="right">
                          <button
                            className="btn btn-outline-danger"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteAlbum(album._id, album.name);
                            }}
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Albums;
