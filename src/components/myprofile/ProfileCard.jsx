import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "./profileSlice";
import "./Profilecard.css";
import { useEffect } from "react";

const ProfileCard = () => {
  const dispatch = useDispatch();

  const { user, stats } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProfile());
  }, []);


  return (
    <div>
      <div className="profile-card glass">
        <img src={user?.profilePicture} className="profile-image" />

        <h2 className="text-white">{user?.name}</h2>

        <p className="text-white">{user?.email}</p>

        <div className="stats">
          <div>
            <h3 className="text-white">{stats?.myAlbums}</h3>

            <span className="text-white">Albums</span>
          </div>

          <div>
            <h3 className="text-white">{stats?.sharedAlbums}</h3>

            <span className="text-white">Shared</span>
          </div>

          <div>
            <h3 className="text-white">{stats?.totalPhotos}</h3>

            <span className="text-white">Photos</span>
          </div>

          <div>
            <h3 className="text-white">{stats?.favourites}</h3>

            <span className="text-white">Favourite</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
