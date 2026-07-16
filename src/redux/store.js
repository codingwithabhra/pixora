import { configureStore } from "@reduxjs/toolkit";
import { albumSlice } from "../components/gallery/albumSlice";
import { imageSlice } from "../components/albumdetails/imageSlice";
import { profileSlice } from "../components/myprofile/profileSlice";

export default configureStore({

    reducer: {
        albums: albumSlice.reducer,
        images:imageSlice.reducer,
        user: profileSlice.reducer,
    },

});