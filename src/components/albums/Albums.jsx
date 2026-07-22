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
  updateAlbumById,
} from "../gallery/albumSlice";
import { MdEdit } from "react-icons/md";
import { PiDotsThreeCircleVerticalLight } from "react-icons/pi";

const Albums = () => {
  const [showModal, setShowModal] = useState(false);

  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);

  const dispatch = useDispatch();

  const { albums, status } = useSelector((state) => state.albums);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  //to close three dot menu on clicking outside
  useEffect(() => {
    const closeMenu = () => {
      setOpenMenuId(null);
    };

    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, []);

  const openEditModal = (album) => {
    setSelectedAlbum(album);
    setEditDescription(album.description || "");
    setShowEditModal(true);
  };

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
      toast.error(result.payload || "Failed to create album");
    }
  };

  //delete album
  const handleDeleteAlbum = async (id, name) => {
    const result = await dispatch(deleteAlbumById(id));

    if (deleteAlbumById.fulfilled.match(result)) {
      toast.success(`Album "${name}" deleted successfully`);
    } else {
      toast.error(result.error.message || "Failed to delete album");
    }
  };

  //update album description
  const handleUpdateDescription = async () => {
    const result = await dispatch(
      updateAlbumById({
        id: selectedAlbum._id,
        updatedData: {
          description: editDescription,
        },
      }),
    );
    if (updateAlbumById.fulfilled.match(result)) {
      toast.success("Description updated");

      setShowEditModal(false);
      setSelectedAlbum(null);

      // await dispatch(updateAlbumById(id, updatedData));
      await dispatch(fetchAlbums());
    } else {
      toast.error("Failed to update description");
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
              <p className="text-white text-center mt-3 fs-4">
                No album found.
              </p>
            ) : (
              albums.map((album) => (
                <Link
                  key={album._id}
                  to={`/albums/${album._id}`}
                  className="col-lg-4 col-md-4 col-sm-6 col-12 mb-4 text-decoration-none"
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

                        {/* three dot menu */}
                        <div className="right position-relative">
                          <button
                            className="p-0 border-0 bg-transparent"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              setOpenMenuId(
                                openMenuId === album._id ? null : album._id,
                              );
                            }}
                          >
                            <PiDotsThreeCircleVerticalLight size={30} className="text-white"/>
                          </button>

                          {openMenuId === album._id && (
                            <div
                              className="album-menu"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <button
                                className="dropdown-item mb-0"
                                onClick={() => {
                                  openEditModal(album);
                                  setOpenMenuId(null);
                                }}
                              >
                                <span><MdEdit /></span> Edit Description
                              </button>

                              <button
                                className="dropdown-item text-danger mb-0"
                                onClick={() => {
                                  handleDeleteAlbum(album._id, album.name);
                                  setOpenMenuId(null);
                                }}
                              >
                                <MdDelete /> Delete Album
                              </button>
                            </div>
                          )}
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

      {/* MODAL FOR DESCRIPTION UPDATE */}
      {showEditModal && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Description</h5>
              </div>

              <div className="modal-body">
                <textarea
                  className="form-control"
                  rows="5"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleUpdateDescription}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Albums;
