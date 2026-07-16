import React from "react";
import { useParams } from "react-router-dom";
import { fetchAlbums, fetchAlbumById } from "../gallery/albumSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAllImages, uploadImage, deleteImage } from "./imageSlice";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from "react";
import { toast } from "react-toastify";
import "./Albumdetails.css";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Albumdetails = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState("");
  const [person, setPerson] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);

  const { albumId } = useParams();
  const dispatch = useDispatch();

  const { selectedAlbum } = useSelector((state) => state.albums);

  const { images } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(fetchAlbumById(albumId));

    dispatch(fetchAllImages(albumId));
  }, [dispatch, albumId]);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    const formData = new FormData();

    formData.append("image", image);
    formData.append("tags", tags);
    formData.append("person", person);
    formData.append("isFavourite", isFavourite);

    const result = await dispatch(
      uploadImage({
        albumId,
        formData,
      }),
    );

    if (uploadImage.fulfilled.match(result)) {
      toast.success("Image uploaded successfully");

      setImage(null);
      setTags("");
      setPerson("");
      setIsFavourite(false);

      setShowUploadModal(false);
    } else {
      toast.error("Image upload failed");
    }
  };

  return (
    <div className="albumdetails">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="text-white fw-bold mt-2">{selectedAlbum?.name}</h1>

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
      {/* <hr style={{ color: "white", height: "1px" }} /> */}

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

      {/* IMAGES DISPLAY */}
      <div className="photos-scroll">
        <div className="row mt-5">
          {images.map((img) => (
            <Link
              className="col-md-4 mb-4"
              key={img._id}
              to={`/albums/${selectedAlbum?._id}/images/${img._id}`}
            >
              <div className="card image">
                <img
                  src={img.filePath}
                  className="card-img-top"
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body content">
                  <div className="text">
                    <h6 className="title">{img.name}</h6>

                    <p className="name">{img.person}</p>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        dispatch(
                          deleteImage({
                            albumId,
                            imageId: img._id,
                          }),
                        )
                      }
                    >
                      <MdDelete size={25} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Albumdetails;
