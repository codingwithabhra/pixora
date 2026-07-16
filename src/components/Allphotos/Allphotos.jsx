import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllMyPhotos, uploadImage, fetchAllImages } from "../albumdetails/imageSlice";
import { fetchAlbums } from "../gallery/albumSlice";
import { IoCloudUploadOutline } from "react-icons/io5";
import DisplayAllImages from "./DisplayAllImages";
import { toast } from "react-toastify";

const Allphotos = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [image, setImage] = useState(null);
  const [albumName, setAlbumName] = useState("");
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [tags, setTags] = useState("");
  const [person, setPerson] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
    dispatch(fetchAllMyPhotos());
  }, [dispatch]);

  const { images } = useSelector((state) => state.images);
  const { albums } = useSelector((state) => state.albums);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    if (!selectedAlbum) {
      toast.error("Please select an album");
      return;
    }

    const formData = new FormData();

    formData.append("image", image);
    formData.append("tags", tags);
    formData.append("person", person);
    formData.append("isFavourite", isFavourite);

    const result = await dispatch(
      uploadImage({
        albumId: selectedAlbum,
        formData,
      }),
    );

    dispatch(fetchAllImages());

    if (uploadImage.fulfilled.match(result)) {
      toast.success("Image uploaded successfully");

      setImage(null);
      setSelectedAlbum("");
      setTags("");
      setPerson("");
      setIsFavourite(false);

      dispatch(fetchAllMyPhotos());
      setShowUploadModal(false);
    } else {
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="allPhotos">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="text-white fw-bold mt-2">All Photos</h1>

        <button
          className="btn btn-light"
          onClick={() => setShowUploadModal(true)}
        >
          <span className="mx-2">
            <IoCloudUploadOutline size={25} />
          </span>
          <span className="mx-2">Upload Photo</span>
        </button>
      </div>
      <hr style={{ color: "white", height: "1px" }} />

      {/* SHOW MODAL */}
      {showUploadModal && (
        <div className="modal d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Upload Image</h5>
              </div>

              <div className="modal-body">
                <input
                  type="file"
                  className="form-control mb-3"
                  onChange={(e) => setImage(e.target.files[0])}
                  placeholder="Max size 10 MB"
                />
                <p className="text-secondary" style={{ fontSize: "12px" }}>
                  *Max size 10 MB*
                </p>

                <select
                  className="form-select mb-3"
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

                <input
                  className="form-control mb-3"
                  placeholder="Person"
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                />

                <input
                  className="form-control mb-3"
                  placeholder="Tags (comma separated)"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />

                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={isFavourite}
                    onChange={(e) => setIsFavourite(e.target.checked)}
                  />

                  <label className="form-check-label">Favourite</label>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>

                <button className="btn btn-primary" onClick={handleUpload}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="photos-scroll">
        <DisplayAllImages />
      </div>
    </div>
  );
};

export default Allphotos;
