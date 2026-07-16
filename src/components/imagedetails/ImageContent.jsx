import React from "react";
import {
  fetchImageById,
  updateImageById,
  deleteImage,
  addComment,
  deleteComment,
} from "../albumdetails/imageSlice";
import { fetchAlbumById } from "../gallery/albumSlice";
import { useDispatch, useSelector } from "react-redux";
import "./Imagedetails.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";

const ImageContent = () => {
  const { albumId, imageId } = useParams();
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [person, setPerson] = useState("");
  const [tags, setTags] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);

  const { selectedImage } = useSelector((state) => state.images);
  const { selectedAlbum } = useSelector((state) => state.albums);

  useEffect(() => {
    if (selectedImage) {
      setName(selectedImage.name);
      setPerson(selectedImage.person);
      setTags(selectedImage.tags.join(", "));
      setIsFavourite(selectedImage.isFavourite);
    }
  }, [selectedImage]);

  const handleSave = async () => {
    const result = await dispatch(
      updateImageById({
        albumId,
        imageId,
        updatedData: {
          name,
          person,
          tags,
          isFavourite,
        },
      }),
    );

    if (updateImageById.fulfilled.match(result)) {
      setEditMode(false);
    }
  };

  return (
    <>
      {/* IMAGE CONTENT */}
      <div className="imgContent py-4 d-flex justify-content-center">
        {selectedImage && (
          <div
            className="card overflow-hidden mt-4"
            style={{ maxWidth: "1000px", width: "100%" }}
          >
            <div className="row g-0">
              {/* left part */}
              <div className="col-lg-7">
                <div className="image-preview position-relative">
                  <img
                    src={selectedImage?.filePath}
                    alt={selectedImage?.name}
                    className="w-100"
                  />

                  {/* Favourite Button */}
                  <button
                    className="favourite-btn"
                    onClick={() =>
                      dispatch(
                        updateImageById({
                          albumId,
                          imageId,
                          updatedData: {
                            name: selectedImage.name,
                            person: selectedImage.person,
                            tags: selectedImage.tags,
                            isFavourite: !selectedImage.isFavourite,
                          },
                        }),
                      )
                    }
                  >
                    {selectedImage.isFavourite ? (
                      <FaHeart size={28} />
                    ) : (
                      <FaRegHeart size={28} />
                    )}
                  </button>
                </div>
              </div>

              {/* right part */}
              <div className="col-lg-5 p-4 d-block m-auto">
                {editMode ? (
                  <input
                    className="form-control mb-3"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <h2 className="mb-3">{selectedImage.name}</h2>
                )}

                <p>
                  <strong>Album : </strong>
                  {selectedAlbum?.name}
                </p>

                <p>
                  <strong>Person : </strong>

                  {editMode ? (
                    <input
                      className="form-control mt-2"
                      value={person}
                      onChange={(e) => setPerson(e.target.value)}
                    />
                  ) : (
                    selectedImage.person || "Not specified"
                  )}
                </p>

                <p>
                  <strong>Size : </strong>
                  {(selectedImage.size / 1024).toFixed(2)} KB
                </p>

                <p>
                  <strong>Uploaded : </strong>
                  {new Date(selectedImage.createdAt).toLocaleDateString()}
                </p>

                <div>
                  <strong>Tags : </strong>

                  {editMode ? (
                    <input
                      className="form-control mt-2"
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  ) : (
                    <p className="mt-2">
                      {selectedImage.tags.map((tag) => (
                        <span className="badge bg-success me-2" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </p>
                  )}
                </div>

                <div className="buttons mt-3">
                  {editMode ? (
                    <button className="btn btn-success" onClick={handleSave}>
                      Save Changes
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => setEditMode(true)}
                    >
                      <MdEdit size={22} />
                    </button>
                  )}

                  {/* cancel button */}
                  {editMode && (
                    <button
                      className="btn btn-secondary ms-2"
                      onClick={() => {
                        setEditMode(false);
                        setName(selectedImage.name);
                        setPerson(selectedImage.person);
                        setTags(selectedImage.tags.join(", "));
                      }}
                    >
                      Cancel
                    </button>
                  )}

                  {/* delete button */}
                  <button
                    className="btn btn-outline-danger ms-2"
                    onClick={() =>
                      dispatch(
                        deleteImage({
                          albumId,
                          imageId,
                        }),
                      )
                    }
                  >
                    <MdDelete size={22} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageContent;
