import React from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSharedAlbums,
  fetchAlbums,
  shareAlbum,
  fetchUsers,
} from "../gallery/albumSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Sharedalbums = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    dispatch(fetchSharedAlbums());
    dispatch(fetchAlbums());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleShare = async () => {
    const result = await dispatch(
      shareAlbum({
        albumId: selectedAlbum,
        userIds: [selectedUser],
      }),
    );

    if (shareAlbum.fulfilled.match(result)) {
      toast.success("Album shared successfully");

      dispatch(fetchSharedAlbums());
      setEmail("");
      setSelectedAlbum("");
      setShowModal(false);
    } else {
      toast.error(result.error.message || "Failed to share album");
    }
  };

  const { albums, sharedAlbums, users } = useSelector((state) => state.albums);
  console.log("Shared album--", sharedAlbums);

  return (
    <div className="sharedAlbum">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="text-white fw-bold mt-2">Shared Albums</h1>

        <button className="btn btn-light" onClick={() => setShowModal(true)}>
          <IoShareSocialOutline size={23} />
          <span className="ms-2 d-none d-sm-inline">Share With</span>
        </button>
      </div>
      <hr style={{ color: "white", height: "1px" }} />

      {/* modal */}
      {showModal && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Share Album</h5>
              </div>

              <div className="modal-body">
                <select
                  className="form-select"
                  value={selectedAlbum}
                  onChange={(e) => setSelectedAlbum(e.target.value)}
                >
                  <option value="">Select Album</option>

                  {albums.map((album) => (
                    <option key={album._id} value={album._id}>
                      {album.name}
                    </option>
                  ))}
                </select>

                <select
                  className="form-select mt-3"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">Select User</option>

                  {users.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={handleShare}>
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="photos-scroll">
        <div className="albums col-12 mt-4">
          <div className="row">
            {sharedAlbums.length === 0 ? (
              <p className="text-white text-center mt-3 fs-4">
                No shared albums found.
              </p>
            ) : (
              sharedAlbums.map((album) => (
                <Link
                  key={album._id}
                  to={`/albums/${album._id}`}
                  className="col-md-6 mb-4 text-decoration-none"
                >
                  <div className="card album-card h-100">
                    {/* Preview Images */}
                    <div className="album-preview-row">
                      {album.previewImages && album.previewImages.length > 0 ? (
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

                    <div className="card-body">
                      <h5>{album.name}</h5>

                      <div className="text-white">
                        <span className="badge text-bg-success me-2">Shared with :{" "}</span>
                        {album.sharedUsers?.map((user) => user.name).join(", ")}
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

export default Sharedalbums;
