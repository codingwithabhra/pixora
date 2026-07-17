import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchImageById,
  updateImageById,
  deleteImage,
  addComment,
  deleteComment,
} from "../albumdetails/imageSlice";
import { fetchAlbumById } from "../gallery/albumSlice";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import "./Imagedetails.css";
import ImageContent from "./ImageContent";
import CommentSection from "./CommentSection";

const Imagedetails = () => {
  const { albumId, imageId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbumById(albumId));
    dispatch(fetchImageById({ albumId, imageId }));
  }, [dispatch, albumId, imageId]);

  const { selectedAlbum } = useSelector((state) => state.albums);

  // console.log("Image id --", imageId);
  // console.log("Album id --", albumId);
  // console.log("selected Image --", selectedImage);

  return (
    <div className="imageDetails">
      <div className="backButton mt-3">
        <Link className="btn btn-primary d-none d-sm-inline" to={`/albums/${selectedAlbum?._id}`}>
            <MdOutlineKeyboardBackspace size={25} />
          <span className="ms-2 d-none d-sm-inline">Back to album</span>
        </Link>
      </div>

      <div className="photos-scroll mt-4">
        <ImageContent />

        <CommentSection albumId={albumId} imageId={imageId} />
      </div>
    </div>
  );
};

export default Imagedetails;
