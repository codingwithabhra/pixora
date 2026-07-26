import React from "react";
import "./FeatureList.css";

import { FaCloudUploadAlt } from "react-icons/fa";
import { BiSolidPhotoAlbum } from "react-icons/bi";
import { IoMdShare } from "react-icons/io";
import { FaCommentDots } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { FreeMode, Pagination, Navigation } from "swiper/modules";

const FeatureList = () => {
  return (
    <div className="featureList">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        freeMode={true}
        // pagination={{
        //   clickable: true,
        // }}
        navigation={true}
        modules={[FreeMode, Pagination, Navigation]}
        breakpoints={{
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          576: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          992: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="uploadPhoto d-flex flex-column justify-content-center align-items-center">
            <img src="/uploadphoto.jpg" alt="upload photo" />

            <div className="uploadTitle">
              <p className="feature-button">
                Upload Photo
                <FaCloudUploadAlt size={17} className="ms-1" />
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="organizeAlbum d-flex flex-column justify-content-center align-items-center">
            <img src="/createalbum.jpg" alt="create album" />

            <p className="feature-button">
              Create Album
              <BiSolidPhotoAlbum size={17} className="ms-1" />
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="shareAlbums d-flex flex-column justify-content-center align-items-center">
            <img src="/sharealbum.jpg" alt="share album" />
            <p className="feature-button">
              Share Album
              <IoMdShare size={17} className="ms-1" />
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="addCmnts d-flex flex-column justify-content-center align-items-center">
            <img src="/addcomment.jpg" alt="add comment" />
            <p className="feature-button">
              Add Comment
              <FaCommentDots size={17} className="ms-1" />
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="chooseFvrts d-flex flex-column justify-content-center align-items-center">
            <img src="/choosefavourite.jpg" alt=" choose favourite" />
            <p className="feature-button">
              Choose Favourite
              <MdFavorite size={17} className="ms-1" />
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="editDescription d-flex flex-column justify-content-center align-items-center">
            <img src="/editdescription.jpg" alt="edit description" />
            <p className="feature-button">
              Edit Description
              <BiSolidEditAlt size={17} className="ms-1" />
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FeatureList;
