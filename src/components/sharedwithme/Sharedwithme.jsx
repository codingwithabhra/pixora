import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSharedWithMeAlbums } from "../gallery/albumSlice";

const Sharedwithme = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSharedWithMeAlbums());
  }, [dispatch]);

  const { sharedWithMeAlbums } = useSelector((state) => state.albums);

  return (
    <div className="sharedWithMe">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="text-white fw-bold mt-2">Shared With Me</h1>
      </div>
      <hr style={{ color: "white", height: "1px" }} />

      {sharedWithMeAlbums.length === 0 ? (
        <div className="text-center mt-5 text-secondary">No shared albums</div>
      ) : (
        <div className="row">
          {sharedWithMeAlbums.map((album) => (
            <div className="col-md-6 mb-4" key={album._id}>
              <div className="card album-card">
                <div className="card-body">
                  <h5>{album.name}</h5>

                  <p>{album.description}</p>

                  <p>
                    <strong>Owner:</strong> {album.ownerId.name}
                  </p>

                  {/* Preview Images */}
                  <div className="d-flex">
                    {album.previewImages.map((img, index) => (
                      <img
                        key={index}
                        src={img.filePath}
                        alt=""
                        width="55"
                        height="55"
                        className="rounded me-2"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                    ))}

                    {album.totalImages > album.previewImages.length && (
                      <div
                        className="d-flex justify-content-center align-items-center rounded bg-secondary text-white"
                        style={{
                          width: 55,
                          height: 55,
                        }}
                      >
                        +{album.totalImages - album.previewImages.length}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sharedwithme;
