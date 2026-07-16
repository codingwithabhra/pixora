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
        users: [selectedUser],
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

  return (
    <div>
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="text-white fw-bold mt-2">Shared Albums</h1>

        <button className="btn btn-light" onClick={() => setShowModal(true)}>
          <span className="mx-2">
            <IoShareSocialOutline size={23} />
          </span>
          <span className="mx-2">Share With</span>
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

      {sharedAlbums.length === 0 ? (
        <div className="text-center text-secondary mt-5">
          <h5>No album found</h5>
        </div>
      ) : (
        <div className="row">
          {sharedAlbums?.map((album) => (
            <div className="col-md-6 mb-4" key={album._id}>
              <div className="card album-card">
                <div className="card-body">
                  <h5>{album.name}</h5>

                  <p>{album.description}</p>

                  <p>
                    <strong>Shared With :</strong>
                  </p>

                  <ul>
                    {album.sharedUsers.map((user) => (
                      <li key={user._id}>
                        {user.name} ({user.email})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sharedalbums;
