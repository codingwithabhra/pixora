import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { deleteAlbumById, fetchAlbums } from "../albumSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "./GalleryAlbum.css";

import "swiper/css";
import "swiper/css/navigation";

const GalleryAlbum = () => {
  const dispatch = useDispatch();

  const { albums } = useSelector((state) => state.albums);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const handleDeleteAlbum = async (id, name) => {
    const result = await dispatch(deleteAlbumById(id));

    if (deleteAlbumById.fulfilled.match(result)) {
      toast.success(`Album "${name}" deleted successfully`);
    } else {
      toast.error(result.error.message || "Failed to delete album");
    }
  };

  return (
    <div className="mt-3">
      <h2 className="text-secondary fw-bold">Albums</h2>
      <div className="albums mt-4">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {albums.map((album) => (
            <SwiperSlide key={album._id}>
              <Link
                key={album._id}
                to={`/albums/${album._id}`}
                className="text-decoration-none d-block"
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
                    <div className="cardHeader d-flex justify-content-between">
                      <div>
                        <h5>{album.name}</h5>

                        <p>{album.description}</p>
                      </div>

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
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default GalleryAlbum;
