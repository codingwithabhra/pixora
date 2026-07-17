import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, deleteComment } from "../albumdetails/imageSlice";

const CommentSection = ({ albumId, imageId }) => {
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const { selectedImage } = useSelector((state) => state.images);

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    const result = await dispatch(
      addComment({
        albumId,
        imageId,
        comment,
      }),
    );

    if (addComment.fulfilled.match(result)) {
      setComment("");
    }
  };

  const comments = selectedImage?.comments || [];

  return (
    <div className="cmntSection image-details-card mt-4 shadow p-4 d-block m-auto">
      <div className="card-header">
        <h4 className="text-white">Comments</h4>
        <hr />
      </div>

      <div className="card-body">
        {/* Existing Comments */}

        {comments.length === 0 ? (
          <p className="text-secondary">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div className="d-flex justify-content-between flex-wrap mt-4">
              <div className="cmntDisplay d-flex align-items-center flex-wrap">
                <h6 className="fw-bold mb-0 text-white">
                  {comment.commentedBy.name} : {" "}
                </h6>
                <p className="mb-0 ms-1 text-white">{comment.text}</p>
              </div>

              <small className="mb-0 fw-light text-white">
                (
                {new Date(comment.createdAt).toLocaleString([], {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                )
              </small>
            </div>
          ))
        )}

        <hr />

        {/* Add Comment */}

        <textarea
          rows="3"
          className="form-control"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="btn btn-primary mt-3" onClick={handleAddComment}>
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
