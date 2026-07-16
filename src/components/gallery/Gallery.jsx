import React from "react";
// import { ImFolderUpload } from "react-icons/im";
// import { MdDelete } from "react-icons/md";
// import { useRef, useState, useEffect } from "react";
// import axios from "axios";
import "./Gallery.css";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAlbums, createAlbums, deleteAlbumById } from "./albumSlice";
import GalleryAlbum from "./galleryalbum/GalleryAlbum";

const Gallery = () => {
  // const [showModal, setShowModal] = useState(false);

  // const [albumName, setAlbumName] = useState("");
  // const [albumDescription, setAlbumDescription] = useState("");

  // const dispatch = useDispatch();

  // const { albums, status } = useSelector((state) => state.albums);

  // useEffect(() => {
  //   dispatch(fetchAlbums());
  // }, [dispatch]);

  // const createAlbum = async () => {
  //   const result = await dispatch(
  //     createAlbums({
  //       name: albumName,
  //       description: albumDescription,
  //     }),
  //   );
  //   if (createAlbums.fulfilled.match(result)) {
  //     toast.success(`Album "${albumName}" created successfully`);
  //     setAlbumName("");
  //     setAlbumDescription("");
  //     setShowModal(false);
  //   } else {
  //     toast.error(result.error.message || "Failed to create album");
  //   }
  // };

  // const handleDeleteAlbum = async (id, name) => {
  //   const result = await dispatch(deleteAlbumById(id));

  //   if (deleteAlbumById.fulfilled.match(result)) {
  //     toast.success(`Album "${name}" deleted successfully`);
  //   } else {
  //     toast.error(result.error.message || "Failed to delete album");
  //   }
  // };

  return (
    <div className="gallery">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="text-white fw-bold mt-2">Gallery</h1>

        {/* <button className="btn btn-light" onClick={() => setShowModal(true)}>
          <span className="mx-2">
            <ImFolderUpload size={20} />
          </span>
          <span className="mx-2">Create Album</span>
        </button> */}
      </div>
      <hr style={{ color: "white", height: "1px" }} />

      {/* SHOW MODAL */}
      {/* {showModal && (
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
      )} */}

      {/* CONTENT */}
      <GalleryAlbum />
    </div>
  );
};

export default Gallery;
