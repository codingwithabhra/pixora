import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import "./ImageSlider.css";

// import required modules
import { EffectCube, Pagination } from "swiper/modules";

const ImageSlider = () => {
  return (
    <>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="/cubeimage3.jpg" alt="image 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/cubeimage2.jpg" alt="image 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/cubeimage1.jpg" alt="image 3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="/cubeimage4.jpg" alt="image 4" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default ImageSlider;
